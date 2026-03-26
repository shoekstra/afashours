package toggl

import (
	"context"
	"fmt"
	"time"

	togglapi "github.com/shoekstra/go-toggl"
	"github.com/shoekstra/afashours/internal/sync"
)

// Source implements sync.TimeSource using the Toggl Track API.
type Source struct {
	client *togglapi.Client
}

// NewSource creates a Toggl TimeSource authenticated with the given API token.
func NewSource(token string) (*Source, error) {
	return newSource(token)
}

func newSource(token string, opts ...togglapi.ClientOption) (*Source, error) {
	client, err := togglapi.NewClient(token, opts...)
	if err != nil {
		return nil, fmt.Errorf("creating toggl client: %w", err)
	}
	return &Source{client: client}, nil
}

// GetTimeEntries returns all completed time entries in the given date range.
// Entries that are still running (no stop time) are skipped.
func (s *Source) GetTimeEntries(ctx context.Context, start, end time.Time) ([]*sync.TimeEntry, error) {
	workspaceID, err := s.workspaceID(ctx)
	if err != nil {
		return nil, err
	}

	projectOpts := &togglapi.ListProjectsOptions{
		Active: togglapi.String("both"),
	}
	projects, _, err := s.client.Projects.ListProjects(ctx, workspaceID, projectOpts)
	if err != nil {
		return nil, fmt.Errorf("listing toggl projects: %w", err)
	}
	projectNames := make(map[int]string, len(projects))
	for _, p := range projects {
		projectNames[p.ID] = p.Name
	}

	opts := &togglapi.ListTimeEntriesOptions{
		StartDate: togglapi.String(start.Format(time.RFC3339)),
		EndDate:   togglapi.String(end.Format(time.RFC3339)),
	}
	raw, _, err := s.client.TimeEntries.ListTimeEntries(ctx, opts)
	if err != nil {
		return nil, fmt.Errorf("listing toggl time entries: %w", err)
	}

	entries := make([]*sync.TimeEntry, 0, len(raw))
	for _, e := range raw {
		if e.Stop == nil {
			continue
		}
		te := &sync.TimeEntry{
			Start: e.Start,
			Stop:  *e.Stop,
		}
		if e.Description != nil {
			te.Description = *e.Description
		}
		if e.ProjectID != nil {
			te.ProjectName = projectNames[*e.ProjectID]
		}
		entries = append(entries, te)
	}

	return entries, nil
}

// workspaceID returns the ID of the user's single workspace.
// Only single-workspace accounts are supported.
func (s *Source) workspaceID(ctx context.Context) (int, error) {
	ws, _, err := s.client.Workspaces.ListWorkspaces(ctx)
	if err != nil {
		return 0, fmt.Errorf("listing toggl workspaces: %w", err)
	}
	switch {
	case len(ws) == 0:
		return 0, fmt.Errorf("no toggl workspaces found")
	case len(ws) > 1:
		return 0, fmt.Errorf("multiple toggl workspaces are not supported")
	default:
		return ws[0].ID, nil
	}
}