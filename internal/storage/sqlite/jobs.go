package sqlite

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/shoekstra/afashours/internal/storage"
)

// CreateJob creates a new sync job record. It assigns a UUID and sets
// StartedAt to the current UTC time if not already set.
func (d *DB) CreateJob(ctx context.Context, job *storage.SyncJob) (*storage.SyncJob, error) {
	if job.ID == "" {
		job.ID = uuid.New().String()
	}
	if job.StartedAt.IsZero() {
		job.StartedAt = time.Now().UTC()
	}

	_, err := d.db.ExecContext(ctx,
		`INSERT INTO jobs (id, subject, status, month, started_at) VALUES (?, ?, ?, ?, ?)`,
		job.ID, job.Subject, string(job.Status), job.Month,
		job.StartedAt.Format(time.RFC3339),
	)
	if err != nil {
		return nil, fmt.Errorf("creating job: %w", err)
	}
	return job, nil
}

// GetJob returns the sync job with the given ID. Returns nil, nil if not found.
func (d *DB) GetJob(ctx context.Context, id string) (*storage.SyncJob, error) {
	var (
		startedAt   string
		status      string
		endedAt     sql.NullString
		summaryJSON sql.NullString
	)

	job := &storage.SyncJob{}
	err := d.db.QueryRowContext(ctx,
		`SELECT id, subject, status, month, started_at, ended_at, summary_json
		 FROM jobs WHERE id = ?`, id,
	).Scan(&job.ID, &job.Subject, &status, &job.Month, &startedAt, &endedAt, &summaryJSON)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("fetching job: %w", err)
	}

	job.Status = storage.JobStatus(status)

	job.StartedAt, err = time.Parse(time.RFC3339, startedAt)
	if err != nil {
		return nil, fmt.Errorf("parsing started_at: %w", err)
	}

	if endedAt.Valid {
		t, err := time.Parse(time.RFC3339, endedAt.String)
		if err != nil {
			return nil, fmt.Errorf("parsing ended_at: %w", err)
		}
		job.EndedAt = &t
	}

	if summaryJSON.Valid {
		job.Summary = &storage.JobSummary{}
		if err := json.Unmarshal([]byte(summaryJSON.String), job.Summary); err != nil {
			return nil, fmt.Errorf("decoding summary: %w", err)
		}
	}

	return job, nil
}

// UpdateJob updates the status, ended_at, and summary of an existing job.
func (d *DB) UpdateJob(ctx context.Context, job *storage.SyncJob) error {
	var endedAt *string
	if job.EndedAt != nil {
		s := job.EndedAt.UTC().Format(time.RFC3339)
		endedAt = &s
	}

	var summaryJSON *string
	if job.Summary != nil {
		b, err := json.Marshal(job.Summary)
		if err != nil {
			return fmt.Errorf("encoding summary: %w", err)
		}
		s := string(b)
		summaryJSON = &s
	}

	res, err := d.db.ExecContext(ctx,
		`UPDATE jobs SET status = ?, ended_at = ?, summary_json = ? WHERE id = ?`,
		string(job.Status), endedAt, summaryJSON, job.ID,
	)
	if err != nil {
		return fmt.Errorf("updating job: %w", err)
	}
	n, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("checking rows affected: %w", err)
	}
	if n == 0 {
		return fmt.Errorf("job %s not found", job.ID)
	}
	return nil
}
