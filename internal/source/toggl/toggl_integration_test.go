package toggl

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/shoekstra/afashours/internal/testutil"
	togglapi "github.com/shoekstra/go-toggl"
	"gopkg.in/dnaeon/go-vcr.v4/pkg/cassette"
)

// TestTogglSource_VCR_GetTimeEntries replays recorded HTTP interactions to verify
// that GetTimeEntries correctly fetches workspaces, projects, and time entries.
func TestTogglSource_VCR_GetTimeEntries(t *testing.T) {
	cases := []struct {
		name     string
		cassette string
		testFn   func(t *testing.T, s *Source)
	}{
		{
			name:     "GetTimeEntries_Oct2025",
			cassette: "toggl/time_entries_2025-10",
			testFn: func(t *testing.T, s *Source) {
				start := time.Date(2025, 10, 1, 0, 0, 0, 0, time.UTC)
				end := time.Date(2025, 10, 31, 0, 0, 0, 0, time.UTC)
				entries, err := s.GetTimeEntries(context.Background(), start, end)
				if err != nil {
					t.Fatalf("GetTimeEntries error: %v", err)
				}
				if len(entries) == 0 {
					t.Fatalf("expected non-empty time entries")
				}
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if _, err := os.Stat("testdata/cassettes/" + tc.cassette + ".yaml"); os.IsNotExist(err) && !testutil.ShouldRecord() {
				t.Skipf("cassette %s not found and RECORD_CASSETTES not set", tc.cassette)
			}

			r := testutil.NewRecorder(t, tc.cassette, func(i *cassette.Interaction) error { return nil })
			defer r.Stop()

			token := os.Getenv("TOGGL_TOKEN")
			if testutil.ShouldRecord() && token == "" {
				t.Skip("TOGGL_TOKEN must be set to record cassettes")
			}
			if token == "" {
				token = "replay-placeholder"
			}

			s, err := newSource(token, togglapi.WithHTTPClient(testutil.HTTPClient(r)))
			if err != nil {
				t.Fatalf("newSource error: %v", err)
			}
			tc.testFn(t, s)
		})
	}
}
