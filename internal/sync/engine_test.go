package sync

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/shoekstra/afashours/internal/afas"
	"github.com/shoekstra/afashours/internal/storage"
)

// stubSource is a test double for TimeSource.
type stubSource struct {
	entries []*TimeEntry
	err     error
}

func (s *stubSource) GetTimeEntries(_ context.Context, _, _ time.Time) ([]*TimeEntry, error) {
	return s.entries, s.err
}

// stubAFAS is a test double for AFASClient.
type stubAFAS struct {
	dayEntries map[string][]afas.WorkEntryResponse
	deleted    []afas.WorkEntryResponse
	inserted   []*afas.WorkEntry
	getDayErr  error
	deleteErr  error
	insertErr  error
}

func (s *stubAFAS) GetDayEntries(_ context.Context, _, date string) ([]afas.WorkEntryResponse, error) {
	if s.getDayErr != nil {
		return nil, s.getDayErr
	}
	return s.dayEntries[date], nil
}

func (s *stubAFAS) DeleteEntry(_ context.Context, entry afas.WorkEntryResponse) error {
	if s.deleteErr != nil {
		return s.deleteErr
	}
	s.deleted = append(s.deleted, entry)
	return nil
}

func (s *stubAFAS) InsertEntry(_ context.Context, entry *afas.WorkEntry) (string, error) {
	if s.insertErr != nil {
		return "", s.insertErr
	}
	s.inserted = append(s.inserted, entry)
	return "new-id", nil
}

var defaultProjects = map[string]storage.ProjectMapping{
	"My Project": {Code: "PROJ001", Type: "INTERNAL"},
}

func entry(projectName, start, stop string) *TimeEntry {
	s, _ := time.Parse(time.RFC3339, start)
	e, _ := time.Parse(time.RFC3339, stop)
	return &TimeEntry{ProjectName: projectName, Description: "work", Start: s, Stop: e}
}

func TestRun_Success(t *testing.T) {
	src := &stubSource{entries: []*TimeEntry{
		entry("My Project", "2026-03-10T09:00:00Z", "2026-03-10T10:00:00Z"),
		entry("My Project", "2026-03-10T11:00:00Z", "2026-03-10T12:00:00Z"),
	}}
	afasCl := &stubAFAS{}
	eng := NewEngine(afasCl)

	summary, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	})
	if err != nil {
		t.Fatalf("Run: %v", err)
	}
	if summary.EntriesFound != 2 {
		t.Errorf("EntriesFound = %d, want 2", summary.EntriesFound)
	}
	if summary.EntriesSynced != 2 {
		t.Errorf("EntriesSynced = %d, want 2", summary.EntriesSynced)
	}
	if summary.EntriesSkipped != 0 {
		t.Errorf("EntriesSkipped = %d, want 0", summary.EntriesSkipped)
	}
	if len(afasCl.inserted) != 2 {
		t.Errorf("inserted %d entries, want 2", len(afasCl.inserted))
	}
}

func TestRun_SkipsEntryWithNoProject(t *testing.T) {
	src := &stubSource{entries: []*TimeEntry{
		entry("", "2026-03-10T09:00:00Z", "2026-03-10T10:00:00Z"),
	}}
	afasCl := &stubAFAS{}
	eng := NewEngine(afasCl)

	summary, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	})
	if err != nil {
		t.Fatalf("Run: %v", err)
	}
	if summary.EntriesFound != 1 {
		t.Errorf("EntriesFound = %d, want 1", summary.EntriesFound)
	}
	if summary.EntriesSkipped != 1 {
		t.Errorf("EntriesSkipped = %d, want 1", summary.EntriesSkipped)
	}
	if summary.EntriesSynced != 0 {
		t.Errorf("EntriesSynced = %d, want 0", summary.EntriesSynced)
	}
	if len(afasCl.inserted) != 0 {
		t.Errorf("inserted %d entries, want 0", len(afasCl.inserted))
	}
}

func TestRun_SkipsUnmappedProject(t *testing.T) {
	src := &stubSource{entries: []*TimeEntry{
		entry("Unknown Project", "2026-03-10T09:00:00Z", "2026-03-10T10:00:00Z"),
	}}
	afasCl := &stubAFAS{}
	eng := NewEngine(afasCl)

	summary, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	})
	if err != nil {
		t.Fatalf("Run: %v", err)
	}
	if summary.EntriesSkipped != 1 {
		t.Errorf("EntriesSkipped = %d, want 1", summary.EntriesSkipped)
	}
	if len(afasCl.inserted) != 0 {
		t.Errorf("inserted %d entries, want 0", len(afasCl.inserted))
	}
}

func TestRun_DeletesExistingBeforeInsert(t *testing.T) {
	existing := afas.WorkEntryResponse{RecordNumber: 99, Period: "2026-03-10T00:00:00Z"}
	src := &stubSource{entries: []*TimeEntry{
		entry("My Project", "2026-03-10T09:00:00Z", "2026-03-10T10:00:00Z"),
	}}
	afasCl := &stubAFAS{
		dayEntries: map[string][]afas.WorkEntryResponse{
			"2026-03-10": {existing},
		},
	}
	eng := NewEngine(afasCl)

	if _, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	}); err != nil {
		t.Fatalf("Run: %v", err)
	}

	if len(afasCl.deleted) != 1 {
		t.Fatalf("deleted %d entries, want 1", len(afasCl.deleted))
	}
	if afasCl.deleted[0].RecordNumber != 99 {
		t.Errorf("deleted record %d, want 99", afasCl.deleted[0].RecordNumber)
	}
	if len(afasCl.inserted) != 1 {
		t.Errorf("inserted %d entries, want 1", len(afasCl.inserted))
	}
}

func TestRun_WorkEntryFields(t *testing.T) {
	src := &stubSource{entries: []*TimeEntry{
		{
			ProjectName: "My Project",
			Description: "standup",
			Start:       time.Date(2026, 3, 10, 9, 30, 0, 0, time.UTC),
			Stop:        time.Date(2026, 3, 10, 9, 45, 0, 0, time.UTC),
		},
	}}
	afasCl := &stubAFAS{}
	eng := NewEngine(afasCl)

	if _, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	}); err != nil {
		t.Fatalf("Run: %v", err)
	}

	if len(afasCl.inserted) != 1 {
		t.Fatalf("inserted %d entries, want 1", len(afasCl.inserted))
	}
	we := afasCl.inserted[0]
	if we.DateTime != "2026-03-10" {
		t.Errorf("DateTime = %q, want %q", we.DateTime, "2026-03-10")
	}
	if we.StartTime != "09:30:00" {
		t.Errorf("StartTime = %q, want %q", we.StartTime, "09:30:00")
	}
	if we.EndTime != "09:45:00" {
		t.Errorf("EndTime = %q, want %q", we.EndTime, "09:45:00")
	}
	if we.EmployeeNumber != "12345" {
		t.Errorf("EmployeeNumber = %q, want %q", we.EmployeeNumber, "12345")
	}
	if we.ProjectID != "PROJ001" {
		t.Errorf("ProjectID = %q, want %q", we.ProjectID, "PROJ001")
	}
	if we.ItemCode != "INTERNAL" {
		t.Errorf("ItemCode = %q, want %q", we.ItemCode, "INTERNAL")
	}
	if we.Description != "standup" {
		t.Errorf("Description = %q, want %q", we.Description, "standup")
	}
	if we.StID != "1" {
		t.Errorf("StID = %q, want %q", we.StID, "1")
	}
	if we.VaIt != "1" {
		t.Errorf("VaIt = %q, want %q", we.VaIt, "1")
	}
}

func TestRun_SkipsCrossMidnightEntry(t *testing.T) {
	src := &stubSource{entries: []*TimeEntry{
		entry("My Project", "2026-03-10T23:00:00Z", "2026-03-11T01:00:00Z"),
	}}
	afasCl := &stubAFAS{}
	eng := NewEngine(afasCl)

	summary, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	})
	if err != nil {
		t.Fatalf("Run: %v", err)
	}
	if summary.EntriesSkipped != 1 {
		t.Errorf("EntriesSkipped = %d, want 1", summary.EntriesSkipped)
	}
	if len(afasCl.inserted) != 0 {
		t.Errorf("inserted %d entries, want 0", len(afasCl.inserted))
	}
}

func TestRun_InvalidMonth(t *testing.T) {
	eng := NewEngine(&stubAFAS{})
	_, err := eng.Run(context.Background(), &stubSource{}, RunOptions{
		EmployeeNumber: "12345",
		Month:          "not-a-month",
		Projects:       defaultProjects,
	})
	if err == nil {
		t.Fatal("expected error for invalid month, got nil")
	}
}

func TestRun_TimeSourceError(t *testing.T) {
	src := &stubSource{err: errors.New("toggl unavailable")}
	eng := NewEngine(&stubAFAS{})
	_, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	})
	if err == nil {
		t.Fatal("expected error from time source, got nil")
	}
}

func TestRun_GetDayEntriesError(t *testing.T) {
	src := &stubSource{entries: []*TimeEntry{
		entry("My Project", "2026-03-10T09:00:00Z", "2026-03-10T10:00:00Z"),
	}}
	afasCl := &stubAFAS{getDayErr: errors.New("AFAS unreachable")}
	eng := NewEngine(afasCl)

	_, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	})
	if err == nil {
		t.Fatal("expected error from GetDayEntries, got nil")
	}
}

func TestRun_InsertError(t *testing.T) {
	src := &stubSource{entries: []*TimeEntry{
		entry("My Project", "2026-03-10T09:00:00Z", "2026-03-10T10:00:00Z"),
	}}
	afasCl := &stubAFAS{insertErr: errors.New("insert failed")}
	eng := NewEngine(afasCl)

	_, err := eng.Run(context.Background(), src, RunOptions{
		EmployeeNumber: "12345",
		Month:          "2026-03",
		Projects:       defaultProjects,
	})
	if err == nil {
		t.Fatal("expected error from InsertEntry, got nil")
	}
}

func TestMonthRange(t *testing.T) {
	tests := []struct {
		month     string
		wantStart string
		wantEnd   string
		wantErr   bool
	}{
		{"2026-03", "2026-03-01T00:00:00Z", "2026-04-01T00:00:00Z", false},
		{"2026-02", "2026-02-01T00:00:00Z", "2026-03-01T00:00:00Z", false},
		{"2024-02", "2024-02-01T00:00:00Z", "2024-03-01T00:00:00Z", false}, // leap year
		{"2026-12", "2026-12-01T00:00:00Z", "2027-01-01T00:00:00Z", false},
		{"bad", "", "", true},
		{"2026", "", "", true},
	}

	for _, tt := range tests {
		t.Run(tt.month, func(t *testing.T) {
			start, end, err := monthRange(tt.month)
			if (err != nil) != tt.wantErr {
				t.Fatalf("monthRange(%q) err = %v, wantErr %v", tt.month, err, tt.wantErr)
			}
			if tt.wantErr {
				return
			}
			if got := start.UTC().Format(time.RFC3339); got != tt.wantStart {
				t.Errorf("start = %q, want %q", got, tt.wantStart)
			}
			if got := end.UTC().Format(time.RFC3339); got != tt.wantEnd {
				t.Errorf("end = %q, want %q", got, tt.wantEnd)
			}
		})
	}
}
