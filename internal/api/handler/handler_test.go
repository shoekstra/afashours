package handler

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/shoekstra/afashours/internal/api/middleware"
	"github.com/shoekstra/afashours/internal/auth"
	"github.com/shoekstra/afashours/internal/storage"
)

func init() {
	gin.SetMode(gin.TestMode)
}

// stubStorage is a test double for storage.Storage.
type stubStorage struct {
	prefs     *storage.UserPreferences
	prefsErr  error
	upsertErr error
	job       *storage.SyncJob
	jobErr    error
	createErr error
	updateErr error
	created   *storage.SyncJob

	// recorded inputs for assertion in tests
	lastGetSubject    string
	lastUpsertSubject string
	lastGetJobID      string
}

func (s *stubStorage) GetUserPreferences(_ context.Context, subject string) (*storage.UserPreferences, error) {
	s.lastGetSubject = subject
	return s.prefs, s.prefsErr
}

func (s *stubStorage) UpsertUserPreferences(_ context.Context, subject string, prefs *storage.UserPreferences) error {
	s.lastUpsertSubject = subject
	s.prefs = prefs
	return s.upsertErr
}

func (s *stubStorage) CreateJob(_ context.Context, job *storage.SyncJob) (*storage.SyncJob, error) {
	if s.createErr != nil {
		return nil, s.createErr
	}
	job.ID = "test-job-id"
	s.created = job
	return job, nil
}

func (s *stubStorage) GetJob(_ context.Context, id string) (*storage.SyncJob, error) {
	s.lastGetJobID = id
	return s.job, s.jobErr
}

func (s *stubStorage) UpdateJob(_ context.Context, job *storage.SyncJob) error {
	s.job = job
	return s.updateErr
}

// injectClaims returns a Gin middleware that sets fixed claims in the context,
// simulating a validated JWT for handler tests.
func injectClaims(subject, employeeNumber string) gin.HandlerFunc {
	return func(c *gin.Context) {
		middleware.SetClaimsForTest(c, &auth.Claims{Subject: subject, EmployeeNumber: employeeNumber})
		c.Next()
	}
}

func newRouter(claims gin.HandlerFunc, routes func(r gin.IRouter)) *gin.Engine {
	r := gin.New()
	r.Use(claims)
	routes(r)
	return r
}

// --- Health ---

func TestHealth(t *testing.T) {
	h := NewHealthHandler()
	r := gin.New()
	r.GET("/health", h.Health)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/health", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("status = %d, want %d", w.Code, http.StatusOK)
	}
	if got := w.Body.String(); got != `{"status":"ok"}` {
		t.Errorf("body = %q, want %q", got, `{"status":"ok"}`)
	}
}

// --- GET /user/me ---

func TestGetMe(t *testing.T) {
	h := NewUserHandler(&stubStorage{})
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.GET("/user/me", h.GetMe)
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/user/me", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
	var resp getMeResponse
	if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if resp.Subject != "sub123" {
		t.Errorf("Subject = %q, want %q", resp.Subject, "sub123")
	}
	if resp.EmployeeNumber != "42" {
		t.Errorf("EmployeeNumber = %q, want %q", resp.EmployeeNumber, "42")
	}
}

// --- GET /user/me/preferences ---

func TestGetPreferences_NoneStored(t *testing.T) {
	db := &stubStorage{prefs: nil}
	h := NewUserHandler(db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.GET("/preferences", h.GetPreferences)
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/preferences", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
	var resp preferencesResponse
	if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if resp.HasTogglToken {
		t.Error("HasTogglToken = true, want false")
	}
	if db.lastGetSubject != "sub123" {
		t.Errorf("GetUserPreferences called with subject %q, want %q", db.lastGetSubject, "sub123")
	}
}

func TestGetPreferences_Found(t *testing.T) {
	db := &stubStorage{prefs: &storage.UserPreferences{
		TogglToken: "secret",
		Projects:   map[string]storage.ProjectMapping{"P": {Code: "C1", Type: "T1"}},
	}}
	h := NewUserHandler(db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.GET("/preferences", h.GetPreferences)
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/preferences", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
	var resp preferencesResponse
	if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if !resp.HasTogglToken {
		t.Error("HasTogglToken = false, want true")
	}
	if len(resp.Projects) != 1 {
		t.Errorf("len(Projects) = %d, want 1", len(resp.Projects))
	}
}

// --- PATCH /user/me/preferences ---

func TestPatchPreferences_TokenOnly(t *testing.T) {
	db := &stubStorage{prefs: &storage.UserPreferences{
		TogglToken: "old-token",
		Projects:   map[string]storage.ProjectMapping{"P": {Code: "C1", Type: "T1"}},
	}}
	h := NewUserHandler(db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.PATCH("/preferences", h.PatchPreferences)
	})

	body, _ := json.Marshal(map[string]string{"toggl_token": "new-token"})
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodPatch, "/preferences", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
	// Projects should be unchanged.
	if len(db.prefs.Projects) != 1 {
		t.Errorf("Projects changed unexpectedly: len = %d, want 1", len(db.prefs.Projects))
	}
	if db.prefs.TogglToken != "new-token" {
		t.Errorf("TogglToken = %q, want %q", db.prefs.TogglToken, "new-token")
	}
	// Response must not expose the token value.
	var raw map[string]any
	if err := json.Unmarshal(w.Body.Bytes(), &raw); err != nil {
		t.Fatalf("unmarshal response: %v", err)
	}
	if _, present := raw["toggl_token"]; present {
		t.Error("response body contains toggl_token, want it absent")
	}
	if db.lastUpsertSubject != "sub123" {
		t.Errorf("UpsertUserPreferences called with subject %q, want %q", db.lastUpsertSubject, "sub123")
	}
}

func TestPatchPreferences_ProjectsReplacedFully(t *testing.T) {
	db := &stubStorage{prefs: &storage.UserPreferences{
		TogglToken: "token",
		Projects: map[string]storage.ProjectMapping{
			"Old": {Code: "OLD", Type: "T"},
		},
	}}
	h := NewUserHandler(db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.PATCH("/preferences", h.PatchPreferences)
	})

	body, _ := json.Marshal(map[string]interface{}{
		"projects": map[string]storage.ProjectMapping{
			"New": {Code: "NEW", Type: "T"},
		},
	})
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodPatch, "/preferences", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
	if _, ok := db.prefs.Projects["Old"]; ok {
		t.Error("old project still present after full replace")
	}
	if _, ok := db.prefs.Projects["New"]; !ok {
		t.Error("new project not found after patch")
	}
	// Token should be unchanged.
	if db.prefs.TogglToken != "token" {
		t.Errorf("TogglToken changed unexpectedly to %q", db.prefs.TogglToken)
	}
	// Response must not expose the token value.
	var raw map[string]any
	if err := json.Unmarshal(w.Body.Bytes(), &raw); err != nil {
		t.Fatalf("unmarshal response: %v", err)
	}
	if _, present := raw["toggl_token"]; present {
		t.Error("response body contains toggl_token, want it absent")
	}
}

// --- POST /sync ---

func TestPostSync_CreatesJob(t *testing.T) {
	db := &stubStorage{}
	h := NewSyncHandler(context.Background(), db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.POST("/sync", h.PostSync)
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodPost, "/sync", nil)
	r.ServeHTTP(w, req)
	h.Wait()

	if w.Code != http.StatusAccepted {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusAccepted)
	}
	var resp map[string]string
	if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if resp["job_id"] == "" {
		t.Error("job_id is empty")
	}
}

func TestPostSync_InvalidMonth(t *testing.T) {
	db := &stubStorage{}
	h := NewSyncHandler(context.Background(), db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.POST("/sync", h.PostSync)
	})

	body, _ := json.Marshal(map[string]string{"month": "not-a-month"})
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodPost, "/sync", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)
	h.Wait()

	if w.Code != http.StatusBadRequest {
		t.Errorf("status = %d, want %d", w.Code, http.StatusBadRequest)
	}
	if db.created != nil {
		t.Error("job should not be created for invalid month")
	}
}

func TestPostSync_DefaultsToCurrentMonth(t *testing.T) {
	db := &stubStorage{}
	h := NewSyncHandler(context.Background(), db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.POST("/sync", h.PostSync)
	})

	wantMonth := time.Now().UTC().Format("2006-01")

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodPost, "/sync", nil)
	r.ServeHTTP(w, req)
	h.Wait()

	if w.Code != http.StatusAccepted {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusAccepted)
	}
	if db.created == nil {
		t.Fatal("CreateJob was not called")
	}
	if db.created.Month != wantMonth {
		t.Errorf("Month = %q, want %q", db.created.Month, wantMonth)
	}
}

// --- GET /sync/:jobID ---

func TestGetSync_NotFound(t *testing.T) {
	db := &stubStorage{job: nil}
	h := NewSyncHandler(context.Background(), db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.GET("/sync/:jobID", h.GetSync)
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/sync/nonexistent", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("status = %d, want %d", w.Code, http.StatusNotFound)
	}
}

func TestGetSync_WrongUser(t *testing.T) {
	db := &stubStorage{job: &storage.SyncJob{
		ID:      "job1",
		Subject: "other-user",
		Status:  storage.JobStatusComplete,
	}}
	h := NewSyncHandler(context.Background(), db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.GET("/sync/:jobID", h.GetSync)
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/sync/job1", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("status = %d, want %d (IDOR: other user's job should appear as not found)", w.Code, http.StatusNotFound)
	}
}

func TestGetSync_Found(t *testing.T) {
	now := time.Now().UTC()
	db := &stubStorage{job: &storage.SyncJob{
		ID:        "job1",
		Subject:   "sub123",
		Status:    storage.JobStatusComplete,
		Month:     "2026-03",
		StartedAt: now,
		EndedAt:   &now,
		Summary:   &storage.JobSummary{EntriesFound: 5, EntriesSynced: 4, EntriesSkipped: 1},
	}}
	h := NewSyncHandler(context.Background(), db)
	r := newRouter(injectClaims("sub123", "42"), func(r gin.IRouter) {
		r.GET("/sync/:jobID", h.GetSync)
	})

	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/sync/job1", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", w.Code, http.StatusOK)
	}
	var resp syncJobResponse
	if err := json.Unmarshal(w.Body.Bytes(), &resp); err != nil {
		t.Fatalf("unmarshal: %v", err)
	}
	if resp.ID != "job1" {
		t.Errorf("ID = %q, want %q", resp.ID, "job1")
	}
	if resp.Summary.EntriesFound != 5 {
		t.Errorf("EntriesFound = %d, want 5", resp.Summary.EntriesFound)
	}
	if db.lastGetJobID != "job1" {
		t.Errorf("GetJob called with ID %q, want %q", db.lastGetJobID, "job1")
	}
}
