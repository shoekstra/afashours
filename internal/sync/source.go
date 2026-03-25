package sync

import (
	"context"
	"time"
)

// TimeSource is the interface that time tracking providers must implement.
// The sync engine depends only on this interface; it has no knowledge of
// Toggl or any other specific provider.
type TimeSource interface {
	// GetTimeEntries returns all time entries in the given date range.
	GetTimeEntries(ctx context.Context, start, end time.Time) ([]*TimeEntry, error)
}

// TimeEntry is the canonical representation of a time entry as used by the
// sync engine, independent of any specific time tracking provider.
type TimeEntry struct {
	ProjectName string
	Start       time.Time
	Stop        time.Time
	Description string
}
