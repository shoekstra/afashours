package afas

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
)

// redirectTransport rewrites every request's host to the target server,
// preserving path and query. This lets us point the AFAS client (which
// constructs its own URLs) at an httptest.Server.
type redirectTransport struct {
	target string
}

func (t *redirectTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	u, _ := url.Parse(t.target)
	req2 := req.Clone(req.Context())
	req2.URL.Scheme = u.Scheme
	req2.URL.Host = u.Host
	return http.DefaultTransport.RoundTrip(req2)
}

func newTestClient(srv *httptest.Server) *Client {
	hc := &http.Client{Transport: &redirectTransport{target: srv.URL}}
	return newClient(hc, "testaccount.rest.afas.online", "testtoken")
}

func jsonResponse(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(v)
}

func TestGetDayEntries_FiltersToRequestedDate(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]interface{}{
			"skip": 0,
			"take": 9999,
			"rows": []map[string]interface{}{
				{
					"period":        "2021-01-01T00:00:00Z",
					"record_number": 1,
					"resource_id":   "12345",
					"start_time":    "09:00:00",
					"end_time":      "10:00:00",
					"project_code":  "PROJ001",
					"activity":      "INTERNAL",
				},
				{
					"period":        "2021-01-02T00:00:00Z", // different date — must be excluded
					"record_number": 2,
					"resource_id":   "12345",
					"start_time":    "11:00:00",
					"end_time":      "12:00:00",
					"project_code":  "PROJ002",
					"activity":      "EXTERNAL",
				},
			},
		})
	}))
	defer srv.Close()

	entries, err := newTestClient(srv).GetDayEntries(context.Background(), "12345", "2021-01-01")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(entries) != 1 {
		t.Fatalf("expected 1 entry, got %d", len(entries))
	}
	if entries[0].RecordNumber != 1 {
		t.Errorf("RecordNumber: got %d, want 1", entries[0].RecordNumber)
	}
	if entries[0].ProjectCode != "PROJ001" {
		t.Errorf("ProjectCode: got %q, want %q", entries[0].ProjectCode, "PROJ001")
	}
}

func TestGetDayEntries_EmptyRowsReturnsNil(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, map[string]interface{}{"skip": 0, "take": 9999, "rows": []interface{}{}})
	}))
	defer srv.Close()

	entries, err := newTestClient(srv).GetDayEntries(context.Background(), "12345", "2021-01-01")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(entries) != 0 {
		t.Errorf("expected 0 entries, got %d", len(entries))
	}
}

func TestGetDayEntries_SetsQueryParams(t *testing.T) {
	var gotURL *url.URL
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotURL = r.URL
		jsonResponse(w, map[string]interface{}{"rows": []interface{}{}})
	}))
	defer srv.Close()

	newTestClient(srv).GetDayEntries(context.Background(), "emp42", "2021-01-01")

	q := gotURL.Query()
	if q.Get("filterfieldids") != "resource_id" {
		t.Errorf("filterfieldids: got %q, want %q", q.Get("filterfieldids"), "resource_id")
	}
	if q.Get("filtervalues") != "emp42" {
		t.Errorf("filtervalues: got %q, want %q", q.Get("filtervalues"), "emp42")
	}
	if q.Get("orderbyfieldids") != "period" {
		t.Errorf("orderbyfieldids: got %q", q.Get("orderbyfieldids"))
	}
}

func TestDeleteEntry_SendsCorrectRequestBody(t *testing.T) {
	var gotBody []byte
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotBody, _ = io.ReadAll(r.Body)
		jsonResponse(w, map[string]interface{}{})
	}))
	defer srv.Close()

	entry := WorkEntryResponse{RecordNumber: 42, Period: "2021-01-15T00:00:00Z"}
	if err := newTestClient(srv).DeleteEntry(context.Background(), entry); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	var body workEntryRequest
	if err := json.Unmarshal(gotBody, &body); err != nil {
		t.Fatalf("parsing request body: %v", err)
	}
	fields := body.PtRealization.Element.Fields
	if len(fields) != 1 {
		t.Fatalf("expected 1 field, got %d", len(fields))
	}
	if fields[0].Action != "delete" {
		t.Errorf("Action: got %q, want %q", fields[0].Action, "delete")
	}
	if fields[0].ID != 42 {
		t.Errorf("ID: got %d, want 42", fields[0].ID)
	}
	if fields[0].DateTime != "2021-01-15T00:00:00Z" {
		t.Errorf("DateTime: got %q, want %q", fields[0].DateTime, "2021-01-15T00:00:00Z")
	}
}

func TestInsertEntry_SendsCorrectBodyAndReturnsID(t *testing.T) {
	var gotBody []byte
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotBody, _ = io.ReadAll(r.Body)
		jsonResponse(w, map[string]interface{}{
			"results": map[string]interface{}{
				"PtRealization": map[string]interface{}{
					"Id": "created-id-99",
				},
			},
		})
	}))
	defer srv.Close()

	entry := &WorkEntry{
		DateTime:       "2021-01-15",
		EmployeeNumber: "12345",
		ProjectID:      "PROJ001",
		ItemCode:       "INTERNAL",
		StartTime:      "09:00:00",
		EndTime:        "10:00:00",
		Description:    "Planning meeting",
		StID:           "1",
		VaIt:           "1",
	}

	id, err := newTestClient(srv).InsertEntry(context.Background(), entry)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if id != "created-id-99" {
		t.Errorf("ID: got %q, want %q", id, "created-id-99")
	}

	var body workEntryRequest
	if err := json.Unmarshal(gotBody, &body); err != nil {
		t.Fatalf("parsing request body: %v", err)
	}
	fields := body.PtRealization.Element.Fields
	if len(fields) != 1 {
		t.Fatalf("expected 1 field, got %d", len(fields))
	}
	if fields[0].Action != "insert" {
		t.Errorf("Action: got %q, want %q", fields[0].Action, "insert")
	}
	if fields[0].ProjectID != "PROJ001" {
		t.Errorf("ProjectID: got %q, want %q", fields[0].ProjectID, "PROJ001")
	}
	if fields[0].StartTime != "09:00:00" {
		t.Errorf("StartTime: got %q, want %q", fields[0].StartTime, "09:00:00")
	}
}

func TestAuthHeader_IsAfasTokenFormat(t *testing.T) {
	var gotAuth string
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		gotAuth = r.Header.Get("Authorization")
		jsonResponse(w, map[string]interface{}{"rows": []interface{}{}})
	}))
	defer srv.Close()

	newTestClient(srv).GetDayEntries(context.Background(), "12345", "2021-01-01")

	if !strings.HasPrefix(gotAuth, "AfasToken ") {
		t.Errorf("Authorization header: got %q, want AfasToken prefix", gotAuth)
	}
}
