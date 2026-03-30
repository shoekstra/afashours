package handler

import (
	"context"
	"log"
	"net/http"
	"runtime/debug"
	"sync"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/shoekstra/afashours/internal/afas"
	"github.com/shoekstra/afashours/internal/api/middleware"
	"github.com/shoekstra/afashours/internal/source/toggl"
	"github.com/shoekstra/afashours/internal/storage"
	isync "github.com/shoekstra/afashours/internal/sync"
)

// SyncHandler handles sync job endpoints.
type SyncHandler struct {
	db          storage.Storage
	workerCtx   context.Context
	workerWg    sync.WaitGroup
	afasAccount string
	afasToken   string
}

// NewSyncHandler creates a SyncHandler. ctx is used as the parent context for
// all background workers; cancelling it signals them to stop and exit promptly
// (e.g. during server shutdown). afasAccount and afasToken are the shared
// server-side AFAS credentials used for all sync operations.
func NewSyncHandler(ctx context.Context, db storage.Storage, afasAccount, afasToken string) *SyncHandler {
	return &SyncHandler{
		db:          db,
		workerCtx:   ctx,
		afasAccount: afasAccount,
		afasToken:   afasToken,
	}
}

// Wait blocks until all background workers started by this handler have exited.
func (h *SyncHandler) Wait() {
	h.workerWg.Wait()
}

// postSyncRequest is the optional JSON body for POST /api/v1/sync.
type postSyncRequest struct {
	Month string `json:"month"` // YYYY-MM; defaults to current month if empty
}

// PostSync creates a sync job and starts it in the background.
func (h *SyncHandler) PostSync(c *gin.Context) {
	claims, ok := middleware.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "claims not found in context"})
		return
	}

	var req postSyncRequest
	if c.Request.Body != nil && c.Request.Body != http.NoBody {
		// Only attempt to decode when a body is actually present; an absent
		// body means "use defaults" and is not an error.
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	if req.Month == "" {
		req.Month = time.Now().UTC().Format("2006-01")
	} else if _, err := time.Parse("2006-01", req.Month); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid month format, expected YYYY-MM"})
		return
	}

	job := &storage.SyncJob{
		Subject:   claims.Subject,
		Status:    storage.JobStatusPending,
		Month:     req.Month,
		StartedAt: time.Now().UTC(),
	}
	created, err := h.db.CreateJob(c.Request.Context(), job)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create sync job"})
		return
	}

	// Capture per-request values before the goroutine; the Gin context must
	// not be accessed after the handler returns.
	subject := claims.Subject
	employeeNumber := claims.EmployeeNumber

	h.workerWg.Add(1)
	go func() {
		defer h.workerWg.Done()
		defer func() {
			if r := recover(); r != nil {
				log.Printf("panic in sync worker for job %s: %v\n%s", created.ID, r, debug.Stack())
				h.failJob(created, "internal error during sync")
			}
		}()
		h.runWorker(created, subject, employeeNumber)
	}()

	c.JSON(http.StatusAccepted, gin.H{"job_id": created.ID})
}

// runWorker executes the sync for the given job.
func (h *SyncHandler) runWorker(job *storage.SyncJob, subject, employeeNumber string) {
	// Mark job as running.
	job.Status = storage.JobStatusRunning
	if err := h.updateJob(job); err != nil {
		log.Printf("failed to mark job %s as running: %v", job.ID, err)
	}

	// Bail out immediately if the server is already shutting down.
	select {
	case <-h.workerCtx.Done():
		h.failJob(job, "sync cancelled: server shutting down")
		return
	default:
	}

	// Fetch user preferences (Toggl token + project mappings).
	prefs, err := h.db.GetUserPreferences(h.workerCtx, subject)
	if err != nil {
		if h.workerCtx.Err() != nil {
			h.failJob(job, "sync cancelled: server shutting down")
			return
		}
		log.Printf("failed to load preferences for job %s: %v", job.ID, err)
		h.failJob(job, "failed to load preferences")
		return
	}
	if prefs == nil || prefs.TogglToken == "" {
		h.failJob(job, "no Toggl token configured; add it via PATCH /api/v1/user/me/preferences")
		return
	}
	if len(prefs.Projects) == 0 {
		h.failJob(job, "no project mappings configured; add them via PATCH /api/v1/user/me/preferences")
		return
	}

	source, err := toggl.NewSource(prefs.TogglToken)
	if err != nil {
		log.Printf("failed to initialise Toggl source for job %s: %v", job.ID, err)
		h.failJob(job, "failed to initialise Toggl source")
		return
	}

	engine := isync.NewEngine(afas.NewClient(h.afasAccount, h.afasToken))
	summary, err := engine.Run(h.workerCtx, source, isync.RunOptions{
		EmployeeNumber: employeeNumber,
		Month:          job.Month,
		Projects:       prefs.Projects,
	})
	if err != nil {
		if h.workerCtx.Err() != nil {
			h.failJob(job, "sync cancelled: server shutting down")
			return
		}
		log.Printf("sync engine failed for job %s: %v", job.ID, err)
		h.failJob(job, "sync failed")
		return
	}

	if h.workerCtx.Err() != nil {
		h.failJob(job, "sync cancelled: server shutting down")
		return
	}

	now := time.Now().UTC()
	job.Status = storage.JobStatusComplete
	job.EndedAt = &now
	job.Summary = summary
	if err := h.updateJob(job); err != nil {
		log.Printf("failed to update job %s after completion: %v", job.ID, err)
	}
}

// updateJob writes job state to the database using a short-lived independent
// context so DB writes succeed even when workerCtx has been cancelled.
func (h *SyncHandler) updateJob(job *storage.SyncJob) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	return h.db.UpdateJob(ctx, job)
}

// failJob marks a job as failed with the given message and persists the state.
func (h *SyncHandler) failJob(job *storage.SyncJob, msg string) {
	now := time.Now().UTC()
	job.Status = storage.JobStatusFailed
	job.EndedAt = &now
	job.Summary = &storage.JobSummary{Error: msg}
	if err := h.updateJob(job); err != nil {
		log.Printf("failed to mark job %s as failed: %v", job.ID, err)
	}
}

// jobSummaryResponse is the JSON wire shape for a sync job summary.
// It is kept separate from storage.JobSummary so the HTTP contract is not
// coupled to the storage layer and can evolve independently.
type jobSummaryResponse struct {
	EntriesFound   int    `json:"entries_found"`
	EntriesSynced  int    `json:"entries_synced"`
	EntriesSkipped int    `json:"entries_skipped"`
	Error          string `json:"error,omitempty"`
}

// syncJobResponse is the JSON shape for GET /api/v1/sync/:jobID.
type syncJobResponse struct {
	ID        string              `json:"id"`
	Status    storage.JobStatus   `json:"status"`
	Month     string              `json:"month"`
	StartedAt time.Time           `json:"started_at"`
	EndedAt   *time.Time          `json:"ended_at"`
	Summary   *jobSummaryResponse `json:"summary"`
}

// GetSync returns the status and result of a sync job.
// Returns 404 if the job does not exist or belongs to a different user.
func (h *SyncHandler) GetSync(c *gin.Context) {
	claims, ok := middleware.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "claims not found in context"})
		return
	}

	jobID := c.Param("jobID")
	job, err := h.db.GetJob(c.Request.Context(), jobID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve job"})
		return
	}
	// Return 404 for both missing jobs and jobs belonging to other users to
	// avoid leaking the existence of other users' jobs.
	if job == nil || job.Subject != claims.Subject {
		c.JSON(http.StatusNotFound, gin.H{"error": "job not found"})
		return
	}

	var summary *jobSummaryResponse
	if job.Summary != nil {
		summary = &jobSummaryResponse{
			EntriesFound:   job.Summary.EntriesFound,
			EntriesSynced:  job.Summary.EntriesSynced,
			EntriesSkipped: job.Summary.EntriesSkipped,
			Error:          job.Summary.Error,
		}
	}
	c.JSON(http.StatusOK, syncJobResponse{
		ID:        job.ID,
		Status:    job.Status,
		Month:     job.Month,
		StartedAt: job.StartedAt,
		EndedAt:   job.EndedAt,
		Summary:   summary,
	})
}
