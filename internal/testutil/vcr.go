package testutil

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"gopkg.in/dnaeon/go-vcr.v4/pkg/cassette"
	"gopkg.in/dnaeon/go-vcr.v4/pkg/recorder"
)

// methodURLMatcher matches recorded interactions by HTTP method and URL only,
// ignoring headers, body, and protocol details. This is the standard behaviour
// for VCR-style test helpers.
func methodURLMatcher(r *http.Request, i cassette.Request) bool {
	return r.Method == i.Method && r.URL.String() == i.URL
}

// NewRecorder creates a go-vcr recorder for the given cassette. In replay mode
// (default) it replays stored interactions; set RECORD_CASSETTES=1 to record.
func NewRecorder(t *testing.T, cassetteName string, filter func(*cassette.Interaction) error) *recorder.Recorder {
	t.Helper()

	cassettePath := filepath.Join("testdata", "cassettes", cassetteName)

	mode := recorder.ModeReplayOnly
	if ShouldRecord() {
		t.Logf("Recording new cassette: %s", cassettePath)
		mode = recorder.ModeRecordOnly
	}

	opts := []recorder.Option{
		recorder.WithMode(mode),
		recorder.WithMatcher(methodURLMatcher),
		recorder.WithHook(func(i *cassette.Interaction) error {
			if i.Request.Headers != nil {
				i.Request.Headers.Del("Authorization")
				i.Request.Headers.Del("Cookie")
				i.Request.Headers.Del("X-Api-Key")
			}
			if i.Response.Headers != nil {
				i.Response.Headers.Del("Set-Cookie")
			}
			return nil
		}, recorder.BeforeSaveHook),
	}
	if filter != nil {
		opts = append(opts, recorder.WithHook(filter, recorder.BeforeSaveHook))
	}

	r, err := recorder.New(cassettePath, opts...)
	if err != nil {
		t.Fatalf("failed to create recorder: %v", err)
	}

	return r
}

// HTTPClient returns an *http.Client that uses the given recorder as transport.
func HTTPClient(r *recorder.Recorder) *http.Client {
	return &http.Client{Transport: r}
}

// WithDefaultTransport temporarily installs the recorder as http.DefaultTransport
// for the duration of fn, then restores the previous transport.
//
// WARNING: this mutates the package-global http.DefaultTransport and is NOT
// safe for use with t.Parallel(), concurrent subtests, or when multiple test
// packages run in parallel (e.g. go test ./...). Prefer passing the recorder
// directly via a transport option such as togglapi.WithHTTPClient(HTTPClient(r))
// when the client under test exposes one; only fall back to
// WithDefaultTransport for third-party clients that do not expose their
// http.Client.
func WithDefaultTransport(r *recorder.Recorder, fn func()) {
	prev := http.DefaultTransport
	http.DefaultTransport = r
	defer func() { http.DefaultTransport = prev }()
	fn()
}

// ShouldRecord returns true when RECORD_CASSETTES is set to 1, true, or yes.
func ShouldRecord() bool {
	s := strings.ToLower(os.Getenv("RECORD_CASSETTES"))
	return s == "1" || s == "true" || s == "yes"
}
