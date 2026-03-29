package afas

import (
	"context"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// --- ListProjects ---

func TestListProjects_ReturnsMappedFields(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]interface{}{
			"rows": []map[string]interface{}{
				{
					"project_id":    "P001",
					"project":       "My Project",
					"project_group": "GRP",
					"start_date":    "2026-01-01",
					"end_date":      "2026-12-31",
				},
			},
		})
	}))
	defer srv.Close()

	projects, err := newTestClient(srv).ListProjects(context.Background())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(projects) != 1 {
		t.Fatalf("len = %d, want 1", len(projects))
	}
	p := projects[0]
	if p.ID != "P001" {
		t.Errorf("ID = %q, want %q", p.ID, "P001")
	}
	if p.Name != "My Project" {
		t.Errorf("Name = %q, want %q", p.Name, "My Project")
	}
	if p.Group != "GRP" {
		t.Errorf("Group = %q, want %q", p.Group, "GRP")
	}
	if p.StartDate != "2026-01-01" {
		t.Errorf("StartDate = %q, want %q", p.StartDate, "2026-01-01")
	}
	if p.EndDate != "2026-12-31" {
		t.Errorf("EndDate = %q, want %q", p.EndDate, "2026-12-31")
	}
}

func TestListProjects_MultipleProjects(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]interface{}{
			"rows": []map[string]interface{}{
				{"project_id": "P001", "project": "Alpha"},
				{"project_id": "P002", "project": "Beta"},
				{"project_id": "P003", "project": "Gamma"},
			},
		})
	}))
	defer srv.Close()

	projects, err := newTestClient(srv).ListProjects(context.Background())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(projects) != 3 {
		t.Fatalf("len = %d, want 3", len(projects))
	}
}

func TestListProjects_EmptyRowsReturnsNil(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]interface{}{"rows": []interface{}{}})
	}))
	defer srv.Close()

	projects, err := newTestClient(srv).ListProjects(context.Background())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(projects) != 0 {
		t.Errorf("len = %d, want 0", len(projects))
	}
}

func TestListProjects_UsesCorrectConnector(t *testing.T) {
	var gotPath string
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotPath = r.URL.Path
		jsonResponse(w, map[string]interface{}{"rows": []interface{}{}})
	}))
	defer srv.Close()

	newTestClient(srv).ListProjects(context.Background())

	if !strings.Contains(gotPath, "_Hours_Projects") {
		t.Errorf("path = %q, want it to contain %q", gotPath, "_Hours_Projects")
	}
}

// --- ListProjectTypes ---

func TestListProjectTypes_ReturnsMappedFields(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]interface{}{
			"rows": []map[string]interface{}{
				{
					"description":       "Internal hours",
					"integration_group": "GRP",
					"item_code":         "INTERNAL",
				},
			},
		})
	}))
	defer srv.Close()

	types, err := newTestClient(srv).ListProjectTypes(context.Background())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(types) != 1 {
		t.Fatalf("len = %d, want 1", len(types))
	}
	pt := types[0]
	if pt.Description != "Internal hours" {
		t.Errorf("Description = %q, want %q", pt.Description, "Internal hours")
	}
	if pt.IntegrationGroup != "GRP" {
		t.Errorf("IntegrationGroup = %q, want %q", pt.IntegrationGroup, "GRP")
	}
	if pt.ItemCode != "INTERNAL" {
		t.Errorf("ItemCode = %q, want %q", pt.ItemCode, "INTERNAL")
	}
}

func TestListProjectTypes_MultipleTypes(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]interface{}{
			"rows": []map[string]interface{}{
				{"description": "Internal", "item_code": "INT"},
				{"description": "External", "item_code": "EXT"},
			},
		})
	}))
	defer srv.Close()

	types, err := newTestClient(srv).ListProjectTypes(context.Background())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(types) != 2 {
		t.Fatalf("len = %d, want 2", len(types))
	}
}

func TestListProjectTypes_EmptyRowsReturnsNil(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]interface{}{"rows": []interface{}{}})
	}))
	defer srv.Close()

	types, err := newTestClient(srv).ListProjectTypes(context.Background())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(types) != 0 {
		t.Errorf("len = %d, want 0", len(types))
	}
}

func TestListProjectTypes_UsesCorrectConnector(t *testing.T) {
	var gotPath string
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotPath = r.URL.Path
		jsonResponse(w, map[string]interface{}{"rows": []interface{}{}})
	}))
	defer srv.Close()

	newTestClient(srv).ListProjectTypes(context.Background())

	if !strings.Contains(gotPath, "_Hours_Types") {
		t.Errorf("path = %q, want it to contain %q", gotPath, "_Hours_Types")
	}
}
