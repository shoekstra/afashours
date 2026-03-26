package toggl

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	togglapi "github.com/shoekstra/go-toggl"
)

const (
	workspacesJSON = `[{
		"id": 1, "name": "My Workspace", "organization_id": 10,
		"active_project_count": 1, "at": "2024-01-15T10:00:00Z",
		"premium": false, "business_ws": false, "default_currency": "USD",
		"only_admins_may_create_projects": false, "only_admins_may_create_tags": false,
		"only_admins_see_team_dashboard": false, "projects_billable_by_default": true,
		"projects_enforce_billable": false, "projects_private_by_default": true,
		"reports_collapse": true, "rounding": 0, "rounding_minutes": 0,
		"ical_enabled": false, "role": "admin", "permissions": ["read", "write"]
	}]`

	projectsJSON = `[{
		"id": 10, "name": "My Project", "workspace_id": 1,
		"active": true, "is_private": false, "color": "#06aaf5",
		"rate": 0, "fixed_fee": 0,
		"at": "2024-01-15T10:00:00Z", "created_at": "2024-01-15T10:00:00Z"
	}]`
)

func newTestSource(t *testing.T, handler http.Handler) *Source {
	t.Helper()
	srv := httptest.NewServer(handler)
	t.Cleanup(srv.Close)
	s, err := newSource("test-token", togglapi.WithBaseURL(srv.URL)) //nolint:staticcheck
	if err != nil {
		t.Fatalf("newSource: %v", err)
	}
	return s
}

func okHandler(t *testing.T, workspacesResp, projectsResp, entriesResp string) http.Handler {
	t.Helper()
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		switch r.URL.Path {
		case "/api/v9/me/workspaces":
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(workspacesResp)) //nolint:errcheck
		case "/api/v9/workspaces/1/projects":
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(projectsResp)) //nolint:errcheck
		case "/api/v9/me/time_entries":
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(entriesResp)) //nolint:errcheck
		default:
			t.Errorf("unexpected path: %s", r.URL.Path)
			w.WriteHeader(http.StatusNotFound)
		}
	})
}

func TestNewSource_EmptyToken(t *testing.T) {
	_, err := NewSource("")
	if err == nil {
		t.Fatal("expected error for empty token, got nil")
	}
}

func TestGetTimeEntries_Success(t *testing.T) {
	entriesJSON := `[{
		"id": 1, "description": "My Task", "project_id": 10,
		"workspace_id": 1, "user_id": 1, "billable": false,
		"tag_ids": [], "tags": [],
		"start": "2026-03-01T09:00:00Z", "stop": "2026-03-01T10:00:00Z",
		"duration": 3600, "created_with": "go-toggl", "at": "2026-03-01T10:00:00Z"
	}]`

	s := newTestSource(t, okHandler(t, workspacesJSON, projectsJSON, entriesJSON))

	start := time.Date(2026, 3, 1, 0, 0, 0, 0, time.UTC)
	end := time.Date(2026, 3, 31, 0, 0, 0, 0, time.UTC)
	entries, err := s.GetTimeEntries(context.Background(), start, end)
	if err != nil {
		t.Fatalf("GetTimeEntries: %v", err)
	}
	if len(entries) != 1 {
		t.Fatalf("got %d entries, want 1", len(entries))
	}

	e := entries[0]
	if e.ProjectName != "My Project" {
		t.Errorf("ProjectName = %q, want %q", e.ProjectName, "My Project")
	}
	if e.Description != "My Task" {
		t.Errorf("Description = %q, want %q", e.Description, "My Task")
	}
	wantStart := time.Date(2026, 3, 1, 9, 0, 0, 0, time.UTC)
	if !e.Start.Equal(wantStart) {
		t.Errorf("Start = %v, want %v", e.Start, wantStart)
	}
	wantStop := time.Date(2026, 3, 1, 10, 0, 0, 0, time.UTC)
	if !e.Stop.Equal(wantStop) {
		t.Errorf("Stop = %v, want %v", e.Stop, wantStop)
	}
}

func TestGetTimeEntries_SkipsRunningEntry(t *testing.T) {
	entriesJSON := `[
		{
			"id": 1, "description": "Done", "project_id": 10,
			"workspace_id": 1, "user_id": 1, "billable": false,
			"tag_ids": [], "tags": [],
			"start": "2026-03-01T09:00:00Z", "stop": "2026-03-01T10:00:00Z",
			"duration": 3600, "created_with": "go-toggl", "at": "2026-03-01T10:00:00Z"
		},
		{
			"id": 2, "description": "Running",
			"workspace_id": 1, "user_id": 1, "billable": false,
			"tag_ids": [], "tags": [],
			"start": "2026-03-01T11:00:00Z",
			"duration": -1, "created_with": "go-toggl", "at": "2026-03-01T11:00:00Z"
		}
	]`

	s := newTestSource(t, okHandler(t, workspacesJSON, projectsJSON, entriesJSON))

	entries, err := s.GetTimeEntries(context.Background(),
		time.Date(2026, 3, 1, 0, 0, 0, 0, time.UTC),
		time.Date(2026, 3, 31, 0, 0, 0, 0, time.UTC),
	)
	if err != nil {
		t.Fatalf("GetTimeEntries: %v", err)
	}
	if len(entries) != 1 {
		t.Errorf("got %d entries, want 1 (running entry should be skipped)", len(entries))
	}
}

func TestGetTimeEntries_NoProjectMapsToEmptyName(t *testing.T) {
	entriesJSON := `[{
		"id": 1, "description": "No project",
		"workspace_id": 1, "user_id": 1, "billable": false,
		"tag_ids": [], "tags": [],
		"start": "2026-03-01T09:00:00Z", "stop": "2026-03-01T10:00:00Z",
		"duration": 3600, "created_with": "go-toggl", "at": "2026-03-01T10:00:00Z"
	}]`

	s := newTestSource(t, okHandler(t, workspacesJSON, projectsJSON, entriesJSON))

	entries, err := s.GetTimeEntries(context.Background(),
		time.Date(2026, 3, 1, 0, 0, 0, 0, time.UTC),
		time.Date(2026, 3, 31, 0, 0, 0, 0, time.UTC),
	)
	if err != nil {
		t.Fatalf("GetTimeEntries: %v", err)
	}
	if len(entries) != 1 {
		t.Fatalf("got %d entries, want 1", len(entries))
	}
	if entries[0].ProjectName != "" {
		t.Errorf("ProjectName = %q, want empty", entries[0].ProjectName)
	}
}

func TestGetTimeEntries_DateRangeQueryParams(t *testing.T) {
	var gotStart, gotEnd string
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		switch r.URL.Path {
		case "/api/v9/me/workspaces":
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(workspacesJSON)) //nolint:errcheck
		case "/api/v9/workspaces/1/projects":
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(projectsJSON)) //nolint:errcheck
		case "/api/v9/me/time_entries":
			gotStart = r.URL.Query().Get("start_date")
			gotEnd = r.URL.Query().Get("end_date")
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(`[]`)) //nolint:errcheck
		default:
			t.Errorf("unexpected path: %s", r.URL.Path)
			w.WriteHeader(http.StatusNotFound)
		}
	})

	s := newTestSource(t, handler)
	if _, err := s.GetTimeEntries(context.Background(),
		time.Date(2026, 3, 1, 0, 0, 0, 0, time.UTC),
		time.Date(2026, 3, 31, 0, 0, 0, 0, time.UTC),
	); err != nil {
		t.Fatalf("GetTimeEntries: %v", err)
	}

	if gotStart != "2026-03-01T00:00:00Z" {
		t.Errorf("start_date = %q, want %q", gotStart, "2026-03-01T00:00:00Z")
	}
	if gotEnd != "2026-03-31T00:00:00Z" {
		t.Errorf("end_date = %q, want %q", gotEnd, "2026-03-31T00:00:00Z")
	}
}

func TestGetTimeEntries_NoWorkspaces(t *testing.T) {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`[]`)) //nolint:errcheck
	})

	s := newTestSource(t, handler)
	_, err := s.GetTimeEntries(context.Background(),
		time.Date(2026, 3, 1, 0, 0, 0, 0, time.UTC),
		time.Date(2026, 3, 31, 0, 0, 0, 0, time.UTC),
	)
	if err == nil {
		t.Fatal("expected error for no workspaces, got nil")
	}
}

func TestGetTimeEntries_MultipleWorkspaces(t *testing.T) {
	twoWorkspaces := `[
		{"id": 1, "name": "Workspace 1", "organization_id": 10, "active_project_count": 0, "at": "2024-01-15T10:00:00Z", "premium": false, "business_ws": false, "default_currency": "USD", "only_admins_may_create_projects": false, "only_admins_may_create_tags": false, "only_admins_see_team_dashboard": false, "projects_billable_by_default": true, "projects_enforce_billable": false, "projects_private_by_default": true, "reports_collapse": true, "rounding": 0, "rounding_minutes": 0, "ical_enabled": false, "role": "admin", "permissions": []},
		{"id": 2, "name": "Workspace 2", "organization_id": 10, "active_project_count": 0, "at": "2024-01-15T10:00:00Z", "premium": false, "business_ws": false, "default_currency": "USD", "only_admins_may_create_projects": false, "only_admins_may_create_tags": false, "only_admins_see_team_dashboard": false, "projects_billable_by_default": true, "projects_enforce_billable": false, "projects_private_by_default": true, "reports_collapse": true, "rounding": 0, "rounding_minutes": 0, "ical_enabled": false, "role": "admin", "permissions": []}
	]`

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(twoWorkspaces)) //nolint:errcheck
	})

	s := newTestSource(t, handler)
	_, err := s.GetTimeEntries(context.Background(),
		time.Date(2026, 3, 1, 0, 0, 0, 0, time.UTC),
		time.Date(2026, 3, 31, 0, 0, 0, 0, time.UTC),
	)
	if err == nil {
		t.Fatal("expected error for multiple workspaces, got nil")
	}
}
