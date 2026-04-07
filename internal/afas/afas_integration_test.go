package afas

import (
	"context"
	"os"
	"strings"
	"testing"

	"github.com/shoekstra/afashours/internal/testutil"
	"gopkg.in/dnaeon/go-vcr.v4/pkg/cassette"
)

// TestAFASClient_VCR_ReadOnly replays recorded HTTP interactions to verify that
// ListProjectTypes and ListProjects parse real AFAS responses correctly.
func TestAFASClient_VCR_ReadOnly(t *testing.T) {
	filter := func(i *cassette.Interaction) error {
		account := os.Getenv("AFAS_ACCOUNT")
		if account != "" {
			i.Request.Host = strings.ReplaceAll(i.Request.Host, account, "12345")
			i.Request.URL = strings.ReplaceAll(i.Request.URL, account, "12345")
		}
		return nil
	}

	cases := []struct {
		name     string
		cassette string
		testFn   func(t *testing.T, c *Client)
	}{
		{
			name:     "ListProjectTypes",
			cassette: "project_types",
			testFn: func(t *testing.T, c *Client) {
				types, err := c.ListProjectTypes(context.Background())
				if err != nil {
					t.Fatalf("ListProjectTypes error: %v", err)
				}
				if len(types) == 0 {
					t.Fatalf("expected non-empty project types")
				}
			},
		},
		{
			name:     "ListProjects",
			cassette: "projects",
			testFn: func(t *testing.T, c *Client) {
				projects, err := c.ListProjects(context.Background())
				if err != nil {
					t.Fatalf("ListProjects error: %v", err)
				}
				if len(projects) == 0 {
					t.Fatalf("expected non-empty projects")
				}
			},
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if _, err := os.Stat("testdata/cassettes/" + tc.cassette + ".yaml"); os.IsNotExist(err) && !testutil.ShouldRecord() {
				t.Skipf("cassette %s not found and RECORD_CASSETTES not set", tc.cassette)
			}

			r := testutil.NewRecorder(t, tc.cassette, filter)
			defer r.Stop()

			account := os.Getenv("AFAS_ACCOUNT")
			token := os.Getenv("AFAS_TOKEN")
			if testutil.ShouldRecord() && (account == "" || token == "") {
				t.Skip("AFAS_ACCOUNT and AFAS_TOKEN must be set to record cassettes")
			}

			host := "12345.rest.afas.online"
			if account != "" {
				host = account + ".rest.afas.online"
			}

			c := newClient(testutil.HTTPClient(r), host, token)
			tc.testFn(t, c)
		})
	}
}
