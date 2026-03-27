package handler

import (
	"context"
	"log"
	"net/http"
	"runtime/debug"
	"sync"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/shoekstra/afashours/internal/api/middleware"
	"github.com/shoekstra/afashours/internal/storage"
)

// SyncHandler handles sync job endpoints.
type SyncHandler struct {
	db        storage.Storage
	workerCtx context.Context
	workerWg  sync.WaitGroup
}

// NewSyncHandler creates a SyncHandler. ctx is used as the parent context for
// all background workers; cancelling it signals them to stop DB operations and
// exit promptly (e.g. during server shutdown).
func NewSyncHandler(ctx context.Context, db storage.Storage) *SyncHandler {
	return &SyncHandler{db: db, workerCtx: ctx}
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

	// TODO: replace stub with real sync worker in a follow-up PR.
	// The worker runs in the background so the HTTP response is returned
	// immediately. workerCtx is cancelled on server shutdown so the worker
	// exits cleanly before db.Close() is called.
	h.workerWg.Add(1)
	go func() {
		defer h.workerWg.Done()
		defer func() {
			if r := recover(); r != nil {
				log.Printf("panic in sync worker for job %s: %v\n%s", created.ID, r, debug.Stack())
				now := time.Now().UTC()
				created.Status = storage.JobStatusFailed
				created.EndedAt = &now
				created.Summary = &storage.JobSummary{Error: "panic during sync worker"}
				updateCtx, updateCancel := context.WithTimeout(context.Background(), 5*time.Second)
				defer updateCancel()
				if err := h.db.UpdateJob(updateCtx, created); err != nil {
					log.Printf("failed to mark job %s as failed after panic: %v", created.ID, err)
				}
			}
		}()
		h.stubWorker(created)
	}()

	c.JSON(http.StatusAccepted, gin.H{"job_id": created.ID})
}

// stubWorker simulates a sync run until the real worker is implemented.
func (h *SyncHandler) stubWorker(job *storage.SyncJob) {
	select {
	case <-time.After(2 * time.Second):
	case <-h.workerCtx.Done():
		// Server is shutting down; mark the job as failed so it does not
		// remain in a pending state indefinitely.
		now := time.Now().UTC()
		job.Status = storage.JobStatusFailed
		job.EndedAt = &now
		job.Summary = &storage.JobSummary{Error: "sync cancelled: server shutting down"}
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		if err := h.db.UpdateJob(ctx, job); err != nil {
			log.Printf("failed to mark job %s as failed on shutdown: %v", job.ID, err)
		}
		return
	}

	now := time.Now().UTC()
	job.Status = storage.JobStatusComplete
	job.EndedAt = &now
	job.Summary = &storage.JobSummary{}

	// Use a fresh context: workerCtx may have been cancelled by the time the
	// timer fires (e.g. shutdown signal received during the 2-second wait).
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := h.db.UpdateJob(ctx, job); err != nil {
		log.Printf("failed to update job %s after stub worker completed: %v", job.ID, err)
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
