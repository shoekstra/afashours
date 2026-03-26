package sync

import (
	"context"
	"fmt"
	"sort"
	"time"

	"github.com/shoekstra/afashours/internal/afas"
	"github.com/shoekstra/afashours/internal/storage"
)

// AFASClient defines the AFAS operations required by the sync engine.
// Defined here (consumer side) so the engine can be tested without the real client.
type AFASClient interface {
	GetDayEntries(ctx context.Context, employeeID, date string) ([]afas.WorkEntryResponse, error)
	DeleteEntry(ctx context.Context, entry afas.WorkEntryResponse) error
	InsertEntry(ctx context.Context, entry *afas.WorkEntry) (string, error)
}

// Engine orchestrates syncing time entries from a TimeSource to AFAS.
type Engine struct {
	afas AFASClient
}

// NewEngine creates an Engine using the provided AFAS client.
func NewEngine(afasClient AFASClient) *Engine {
	return &Engine{afas: afasClient}
}

// RunOptions holds the per-user parameters for a single sync run.
type RunOptions struct {
	EmployeeNumber string
	Month          string // YYYY-MM
	Projects       map[string]storage.ProjectMapping
}

// Run fetches time entries from source for the month in opts, maps them to
// AFAS entries via opts.Projects, and upserts them day by day (delete-then-insert).
// Entries with no project name or an unmapped project name are skipped.
// It returns a summary of the outcome.
func (eng *Engine) Run(ctx context.Context, source TimeSource, opts RunOptions) (*storage.JobSummary, error) {
	// Validate employee number before any AFAS operations.
	if opts.EmployeeNumber == "" {
		return nil, fmt.Errorf("employee number is required and cannot be empty")
	}

	start, end, err := monthRange(opts.Month)
	if err != nil {
		return nil, err
	}

	entries, err := source.GetTimeEntries(ctx, start, end)
	if err != nil {
		return nil, fmt.Errorf("fetching time entries: %w", err)
	}

	summary := &storage.JobSummary{EntriesFound: len(entries)}

	// Map entries to AFAS WorkEntries, grouping by date.
	byDate := make(map[string][]*afas.WorkEntry)
	for _, te := range entries {
		// Skip nil entries to prevent nil pointer dereference.
		if te == nil {
			continue
		}
		if te.ProjectName == "" {
			summary.EntriesSkipped++
			continue
		}
		mapping, ok := opts.Projects[te.ProjectName]
		if !ok {
			summary.EntriesSkipped++
			continue
		}
		// Skip entries that span midnight — AFAS expects start and end on the
		// same calendar day and would reject or miscalculate cross-day entries.
		date := te.Start.UTC().Format("2006-01-02")
		if te.Stop.UTC().Format("2006-01-02") != date {
			summary.EntriesSkipped++
			continue
		}
		byDate[date] = append(byDate[date], entryToWorkEntry(te, opts.EmployeeNumber, mapping))
	}

	// Process each day in chronological order.
	dates := make([]string, 0, len(byDate))
	for d := range byDate {
		dates = append(dates, d)
	}
	sort.Strings(dates)

	for _, date := range dates {
		// Delete any existing entries for this day before inserting new ones.
		// This is intentionally non-atomic: if deletions succeed but a subsequent
		// insert fails, the day's entries will be missing until the next sync run
		// corrects the state. The caller is expected to mark the job as failed so
		// the user can retry. A future improvement could snapshot and restore on
		// insert failure, but that requires verified AFAS field mappings.
		existing, err := eng.afas.GetDayEntries(ctx, opts.EmployeeNumber, date)
		if err != nil {
			return nil, fmt.Errorf("fetching existing AFAS entries for %s: %w", date, err)
		}
		for _, ex := range existing {
			if err := eng.afas.DeleteEntry(ctx, ex); err != nil {
				return nil, fmt.Errorf("deleting AFAS entry %d: %w", ex.RecordNumber, err)
			}
		}

		// Insert new entries sorted by start time.
		dayEntries := byDate[date]
		sort.Slice(dayEntries, func(i, j int) bool {
			return dayEntries[i].StartTime < dayEntries[j].StartTime
		})
		for _, we := range dayEntries {
			if _, err := eng.afas.InsertEntry(ctx, we); err != nil {
				return nil, fmt.Errorf("inserting AFAS entry: %w", err)
			}
			summary.EntriesSynced++
		}
	}

	return summary, nil
}

// monthRange returns start (00:00:00 on the 1st) and end (00:00:00 on the 1st
// of the following month, exclusive) of the given YYYY-MM month in UTC.
func monthRange(month string) (time.Time, time.Time, error) {
	t, err := time.Parse("2006-01", month)
	if err != nil {
		return time.Time{}, time.Time{}, fmt.Errorf("invalid month %q: expected YYYY-MM", month)
	}
	start := time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, time.UTC)
	end := start.AddDate(0, 1, 0) // exclusive: first instant of the next month
	return start, end, nil
}

// entryToWorkEntry maps a canonical TimeEntry to an AFAS WorkEntry.
func entryToWorkEntry(te *TimeEntry, employeeNumber string, mapping storage.ProjectMapping) *afas.WorkEntry {
	return &afas.WorkEntry{
		DateTime:       te.Start.UTC().Format("2006-01-02"),
		Description:    te.Description,
		EmployeeNumber: employeeNumber,
		ItemCode:       mapping.Type,
		ProjectID:      mapping.Code,
		StID:           "1", // status ID: 1 = active/normal entry
		StartTime:      te.Start.UTC().Format("15:04:05"),
		EndTime:        te.Stop.UTC().Format("15:04:05"),
		VaIt:           "1", // validation/approval flag: 1 = approved
	}
}