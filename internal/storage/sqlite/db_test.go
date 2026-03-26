package sqlite_test

import (
	"context"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/shoekstra/afashours/internal/storage"
	"github.com/shoekstra/afashours/internal/storage/sqlite"
)

func newTestDB(t *testing.T) *sqlite.DB {
	t.Helper()
	db, err := sqlite.NewDB(":memory:", "test-encryption-key")
	if err != nil {
		t.Fatalf("creating test DB: %v", err)
	}
	t.Cleanup(func() { db.Close() })
	return db
}

// — UserStorage —

func TestGetUserPreferences_NotFound(t *testing.T) {
	got, err := newTestDB(t).GetUserPreferences(context.Background(), "no-such-user")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != nil {
		t.Errorf("expected nil, got %+v", got)
	}
}

func TestUpsertAndGetUserPreferences(t *testing.T) {
	db := newTestDB(t)
	ctx := context.Background()
	subject := "okta|abc123"

	in := &storage.UserPreferences{
		TogglToken: "super-secret-token",
		Projects: map[string]storage.ProjectMapping{
			"My Project": {Code: "PROJ001", Type: "INTERNAL"},
		},
	}

	if err := db.UpsertUserPreferences(ctx, subject, in); err != nil {
		t.Fatalf("upsert: %v", err)
	}

	got, err := db.GetUserPreferences(ctx, subject)
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if got == nil {
		t.Fatal("expected preferences, got nil")
	}
	if got.TogglToken != in.TogglToken {
		t.Errorf("TogglToken: got %q, want %q", got.TogglToken, in.TogglToken)
	}
	if got.Projects["My Project"].Code != "PROJ001" {
		t.Errorf("Projects[My Project].Code: got %q, want %q", got.Projects["My Project"].Code, "PROJ001")
	}
	if got.Projects["My Project"].Type != "INTERNAL" {
		t.Errorf("Projects[My Project].Type: got %q, want %q", got.Projects["My Project"].Type, "INTERNAL")
	}
}

func TestUpsertUserPreferences_OverwritesExisting(t *testing.T) {
	db := newTestDB(t)
	ctx := context.Background()
	subject := "okta|abc123"

	if err := db.UpsertUserPreferences(ctx, subject, &storage.UserPreferences{TogglToken: "old-token"}); err != nil {
		t.Fatalf("first upsert: %v", err)
	}
	if err := db.UpsertUserPreferences(ctx, subject, &storage.UserPreferences{TogglToken: "new-token"}); err != nil {
		t.Fatalf("second upsert: %v", err)
	}

	got, err := db.GetUserPreferences(ctx, subject)
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if got == nil {
		t.Fatal("expected preferences, got nil")
	}
	if got.TogglToken != "new-token" {
		t.Errorf("TogglToken: got %q, want %q", got.TogglToken, "new-token")
	}
}

func TestUpsertUserPreferences_EmptyToken(t *testing.T) {
	db := newTestDB(t)
	ctx := context.Background()

	if err := db.UpsertUserPreferences(ctx, "okta|abc123", &storage.UserPreferences{}); err != nil {
		t.Fatalf("upsert with empty token: %v", err)
	}

	got, err := db.GetUserPreferences(ctx, "okta|abc123")
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if got == nil {
		t.Fatal("expected preferences, got nil")
	}
	if got.TogglToken != "" {
		t.Errorf("expected empty token, got %q", got.TogglToken)
	}
}

// — JobStorage —

func TestCreateAndGetJob(t *testing.T) {
	db := newTestDB(t)
	ctx := context.Background()

	in := &storage.SyncJob{
		Subject: "okta|abc123",
		Status:  storage.JobStatusPending,
		Month:   "2026-03",
	}

	created, err := db.CreateJob(ctx, in)
	if err != nil {
		t.Fatalf("create: %v", err)
	}
	parsed, err := uuid.Parse(created.ID)
	if err != nil {
		t.Errorf("expected valid UUID, got %q: %v", created.ID, err)
	} else if parsed.Version() != 4 {
		t.Errorf("expected UUID v4, got version %d", parsed.Version())
	}
	if created.StartedAt.IsZero() {
		t.Error("expected StartedAt to be set")
	}

	got, err := db.GetJob(ctx, created.ID)
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if got == nil {
		t.Fatal("expected job, got nil")
	}
	if got.Subject != in.Subject {
		t.Errorf("Subject: got %q, want %q", got.Subject, in.Subject)
	}
	if got.Status != storage.JobStatusPending {
		t.Errorf("Status: got %q, want %q", got.Status, storage.JobStatusPending)
	}
	if got.Month != "2026-03" {
		t.Errorf("Month: got %q, want %q", got.Month, "2026-03")
	}
	if got.EndedAt != nil {
		t.Errorf("expected nil EndedAt, got %v", got.EndedAt)
	}
	if got.Summary != nil {
		t.Errorf("expected nil Summary, got %+v", got.Summary)
	}
}

func TestGetJob_NotFound(t *testing.T) {
	got, err := newTestDB(t).GetJob(context.Background(), "does-not-exist")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != nil {
		t.Errorf("expected nil, got %+v", got)
	}
}

func TestUpdateJob_CompleteWithSummary(t *testing.T) {
	db := newTestDB(t)
	ctx := context.Background()

	created, err := db.CreateJob(ctx, &storage.SyncJob{
		Subject: "okta|abc123",
		Status:  storage.JobStatusRunning,
		Month:   "2026-03",
	})
	if err != nil {
		t.Fatalf("create: %v", err)
	}

	endedAt := time.Now().UTC().Truncate(time.Second)
	created.Status = storage.JobStatusComplete
	created.EndedAt = &endedAt
	created.Summary = &storage.JobSummary{
		EntriesFound:   10,
		EntriesSynced:  9,
		EntriesSkipped: 1,
	}

	if err := db.UpdateJob(ctx, created); err != nil {
		t.Fatalf("update: %v", err)
	}

	got, err := db.GetJob(ctx, created.ID)
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if got == nil {
		t.Fatal("expected job, got nil")
	}
	if got.Status != storage.JobStatusComplete {
		t.Errorf("Status: got %q, want %q", got.Status, storage.JobStatusComplete)
	}
	if got.EndedAt == nil {
		t.Fatal("expected EndedAt to be set")
	}
	if !got.EndedAt.Equal(endedAt) {
		t.Errorf("EndedAt: got %v, want %v", got.EndedAt, endedAt)
	}
	if got.Summary == nil {
		t.Fatal("expected Summary to be set")
	}
	if got.Summary.EntriesFound != 10 {
		t.Errorf("Summary.EntriesFound: got %d, want 10", got.Summary.EntriesFound)
	}
	if got.Summary.EntriesSynced != 9 {
		t.Errorf("Summary.EntriesSynced: got %d, want 9", got.Summary.EntriesSynced)
	}
	if got.Summary.EntriesSkipped != 1 {
		t.Errorf("Summary.EntriesSkipped: got %d, want 1", got.Summary.EntriesSkipped)
	}
}

func TestUpdateJob_Failed(t *testing.T) {
	db := newTestDB(t)
	ctx := context.Background()

	created, err := db.CreateJob(ctx, &storage.SyncJob{
		Subject: "okta|abc123",
		Status:  storage.JobStatusRunning,
		Month:   "2026-03",
	})
	if err != nil {
		t.Fatalf("create: %v", err)
	}

	endedAt := time.Now().UTC()
	created.Status = storage.JobStatusFailed
	created.EndedAt = &endedAt
	created.Summary = &storage.JobSummary{Error: "toggl API unreachable"}

	if err := db.UpdateJob(ctx, created); err != nil {
		t.Fatalf("update: %v", err)
	}

	got, err := db.GetJob(ctx, created.ID)
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if got == nil {
		t.Fatal("expected job, got nil")
	}
	if got.Status != storage.JobStatusFailed {
		t.Errorf("Status: got %q, want %q", got.Status, storage.JobStatusFailed)
	}
	if got.Summary.Error != "toggl API unreachable" {
		t.Errorf("Summary.Error: got %q, want %q", got.Summary.Error, "toggl API unreachable")
	}
}
