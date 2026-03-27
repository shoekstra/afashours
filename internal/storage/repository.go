package storage

import (
	"context"
	"time"
)

// Storage defines the storage interface. All database operations must go
// through this interface; no implementation details leak outside this package.
type Storage interface {
	UserStorage
	JobStorage
}

// UserStorage handles user preference storage.
type UserStorage interface {
	// GetUserPreferences returns the stored preferences for the given Okta subject ID.
	GetUserPreferences(ctx context.Context, subject string) (*UserPreferences, error)
	// UpsertUserPreferences creates or updates preferences for the given Okta subject ID.
	UpsertUserPreferences(ctx context.Context, subject string, prefs *UserPreferences) error
}

// JobStorage handles sync job tracking.
type JobStorage interface {
	// CreateJob creates a new sync job record and returns it.
	CreateJob(ctx context.Context, job *SyncJob) (*SyncJob, error)
	// GetJob returns the sync job with the given ID.
	GetJob(ctx context.Context, id string) (*SyncJob, error)
	// UpdateJob updates the status and result of an existing sync job.
	UpdateJob(ctx context.Context, job *SyncJob) error
}

// UserPreferences holds the mutable per-user configuration.
type UserPreferences struct {
	// TogglToken is the user's Toggl API token, stored encrypted.
	TogglToken string
	// Projects maps Toggl project names to AFAS project codes and types.
	Projects map[string]ProjectMapping
}

// ProjectMapping maps a Toggl project name to an AFAS project code and item type.
type ProjectMapping struct {
	// Code is the AFAS project code (e.g. "PROJ001").
	Code string
	// Type is the AFAS item code (e.g. "INTERNAL").
	Type string
}

// SyncJob represents an async sync operation.
type SyncJob struct {
	ID        string
	Subject   string // Okta subject ID of the user who initiated the job
	Status    JobStatus
	Month     string // YYYY-MM
	StartedAt time.Time
	EndedAt   *time.Time
	Summary   *JobSummary
}

// JobStatus represents the current state of a sync job.
type JobStatus string

// Possible values for JobStatus.
const (
	JobStatusPending  JobStatus = "pending"  // waiting to start
	JobStatusRunning  JobStatus = "running"  // actively syncing entries
	JobStatusComplete JobStatus = "complete" // finished successfully
	JobStatusFailed   JobStatus = "failed"   // encountered a fatal error
)

// JobSummary holds the result of a completed sync job.
type JobSummary struct {
	EntriesFound   int
	EntriesSynced  int
	EntriesSkipped int
	Error          string
}
