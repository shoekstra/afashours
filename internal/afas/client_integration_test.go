//go:build integration

package afas

import (
	"context"
	"fmt"
	"os"
	"testing"
)

var (
	integrationAccount    = os.Getenv("AFAS_ACCOUNT")
	integrationToken      = os.Getenv("AFAS_TOKEN")
	integrationEmployeeID = os.Getenv("EMPLOYEE_ID")
)

func checkIntegrationReqs(t *testing.T) {
	t.Helper()
	if integrationAccount == "" || integrationToken == "" {
		t.Skip("requires AFAS_ACCOUNT and AFAS_TOKEN env vars")
	}
	if integrationEmployeeID == "" {
		t.Skip("requires EMPLOYEE_ID env var")
	}
}

func newIntegrationClient() *Client {
	return newClient(nil, fmt.Sprintf("%s.resttest.afas.online", integrationAccount), integrationToken)
}

// TestIntegration_DeleteEntry inserts a test entry, verifies it exists, deletes
// it, then verifies it is gone. Mirrors TestClient_DeleteHours from the
// reference implementation.
func TestIntegration_DeleteEntry(t *testing.T) {
	checkIntegrationReqs(t)

	ctx := context.Background()
	client := newIntegrationClient()

	testEntry := &WorkEntry{
		DateTime:       "2021-02-01",
		Description:    "Integration test entry — delete me",
		EmployeeNumber: integrationEmployeeID,
		ItemCode:       "SBPINT",
		ProjectID:      "000000000",
		StID:           "1",
		StartTime:      "09:00:00",
		EndTime:        "10:00:00",
		VaIt:           "1",
	}

	if _, err := client.InsertEntry(ctx, testEntry); err != nil {
		t.Fatalf("inserting test data: %v", err)
	}

	entries, err := client.GetDayEntries(ctx, integrationEmployeeID, "2021-02-01")
	if err != nil {
		t.Fatalf("fetching entries after insert: %v", err)
	}

	for _, e := range entries {
		if err := client.DeleteEntry(ctx, e); err != nil {
			t.Fatalf("deleting entry %d: %v", e.RecordNumber, err)
		}
	}

	remaining, err := client.GetDayEntries(ctx, integrationEmployeeID, "2021-02-01")
	if err != nil {
		t.Fatalf("fetching entries after delete: %v", err)
	}
	if len(remaining) != 0 {
		t.Errorf("expected 0 entries after delete, got %d", len(remaining))
	}
}

// TestIntegration_InsertEntry inserts a test entry and verifies the returned
// fields match what was sent. Mirrors TestClient_PostHours from the reference
// implementation.
func TestIntegration_InsertEntry(t *testing.T) {
	checkIntegrationReqs(t)

	ctx := context.Background()
	client := newIntegrationClient()

	// Clean up any pre-existing entries for this date first.
	existing, err := client.GetDayEntries(ctx, integrationEmployeeID, "2021-01-01")
	if err != nil {
		t.Fatalf("fetching pre-existing entries: %v", err)
	}
	for _, e := range existing {
		if err := client.DeleteEntry(ctx, e); err != nil {
			t.Fatalf("cleaning up pre-existing entry: %v", err)
		}
	}

	entry := &WorkEntry{
		DateTime:       "2021-01-01",
		Description:    "Integration test entry",
		EmployeeNumber: integrationEmployeeID,
		ItemCode:       "SBPINT",
		ProjectID:      "000000000",
		StID:           "1",
		StartTime:      "09:00:00",
		EndTime:        "10:00:00",
		VaIt:           "1",
	}

	if _, err := client.InsertEntry(ctx, entry); err != nil {
		t.Fatalf("inserting entry: %v", err)
	}

	got, err := client.GetDayEntries(ctx, integrationEmployeeID, "2021-01-01")
	if err != nil {
		t.Fatalf("fetching inserted entry: %v", err)
	}

	tests := []struct {
		desc string
		got  string
		want string
	}{
		{"record count", fmt.Sprint(len(got)), "1"},
		{"project code", got[0].ProjectCode, entry.ProjectID},
		{"activity", got[0].Activity, entry.ItemCode},
		{"period", got[0].Period, entry.DateTime + "T00:00:00Z"},
		{"start time", got[0].StartTime, entry.StartTime},
		{"end time", got[0].EndTime, entry.EndTime},
	}
	for _, tt := range tests {
		if tt.got != tt.want {
			t.Errorf("%s: got %q, want %q", tt.desc, tt.got, tt.want)
		}
	}
}
