package api_test

import (
	"context"
	"encoding/json"
	"net"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"syscall"
	"testing"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/shoekstra/afashours/internal/api"
	"github.com/shoekstra/afashours/internal/auth"
	"github.com/shoekstra/afashours/internal/storage"
)

func init() {
	gin.SetMode(gin.TestMode)
}

// stubStorage satisfies storage.Storage with no-op implementations.
type stubStorage struct{}

// GetUserPreferences always returns nil (no preferences stored).
func (s *stubStorage) GetUserPreferences(_ context.Context, _ string) (*storage.UserPreferences, error) {
	return nil, nil
}

// UpsertUserPreferences is a no-op.
func (s *stubStorage) UpsertUserPreferences(_ context.Context, _ string, _ *storage.UserPreferences) error {
	return nil
}

// CreateJob assigns a fixed ID and returns the job.
func (s *stubStorage) CreateJob(_ context.Context, job *storage.SyncJob) (*storage.SyncJob, error) {
	job.ID = "test-job"
	return job, nil
}

// GetJob always returns nil (no jobs stored).
func (s *stubStorage) GetJob(_ context.Context, _ string) (*storage.SyncJob, error) {
	return nil, nil
}

// UpdateJob is a no-op.
func (s *stubStorage) UpdateJob(_ context.Context, _ *storage.SyncJob) error { return nil }

// stubValidator accepts any non-empty token and returns fixed claims.
type stubValidator struct{}

// Validate returns fixed claims for any non-empty token, ErrInvalidToken otherwise.
func (v *stubValidator) Validate(token string) (*auth.Claims, error) {
	if token == "" {
		return nil, auth.ErrInvalidToken
	}
	return &auth.Claims{Subject: "sub123", EmployeeNumber: "42"}, nil
}

// newTestServer creates a Server wired with stub dependencies for use in tests.
func newTestServer() *api.Server {
	return api.NewServer(api.ServerConfig{
		DB:             &stubStorage{},
		Validator:      &stubValidator{},
		AfasAccount:    "acct",
		AfasToken:      "tok",
		OktaIssuer:     "https://example.okta.com/oauth2/default",
		OktaClientID:   "client123",
		AllowedOrigins: []string{"http://localhost:8080"},
	})
}

func TestServerRun_GracefulShutdown(t *testing.T) {
	// Grab a free port then release it so Run can bind it.
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("net.Listen: %v", err)
	}
	addr := ln.Addr().String()
	ln.Close()

	srv := newTestServer()
	errCh := make(chan error, 1)
	go func() { errCh <- srv.Run(addr) }()

	// Wait for the server to accept connections.
	deadline := time.Now().Add(2 * time.Second)
	for time.Now().Before(deadline) {
		resp, err := http.Get("http://" + addr + "/health") //nolint:noctx
		if err == nil {
			resp.Body.Close()
			break
		}
		time.Sleep(10 * time.Millisecond)
	}

	// Signal graceful shutdown.
	proc, err := os.FindProcess(os.Getpid())
	if err != nil {
		t.Fatalf("os.FindProcess: %v", err)
	}
	if err := proc.Signal(syscall.SIGTERM); err != nil {
		t.Fatalf("proc.Signal: %v", err)
	}

	select {
	case err := <-errCh:
		if err != nil {
			t.Errorf("Run returned error: %v", err)
		}
	case <-time.After(5 * time.Second):
		t.Error("Run did not return after SIGTERM")
	}
}

func TestServerRun_ListenError(t *testing.T) {
	// Hold a port so Run cannot bind it.
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("net.Listen: %v", err)
	}
	defer ln.Close()

	srv := newTestServer()
	if err := srv.Run(ln.Addr().String()); err == nil {
		t.Error("Run should return an error when the port is already in use")
	}
}

func TestServer(t *testing.T) {
	cases := []struct {
		name        string
		method      string
		path        string
		headers     map[string]string
		wantStatus  int
		check       func(t *testing.T, w *httptest.ResponseRecorder)
	}{
		{
			name:       "health returns 200",
			method:     http.MethodGet,
			path:       "/health",
			wantStatus: http.StatusOK,
		},
		{
			name:       "config returns okta params",
			method:     http.MethodGet,
			path:       "/api/v1/config",
			wantStatus: http.StatusOK,
			check: func(t *testing.T, w *httptest.ResponseRecorder) {
				var body map[string]string
				if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
					t.Fatalf("unmarshal: %v", err)
				}
				if body["okta_issuer"] != "https://example.okta.com/oauth2/default" {
					t.Errorf("okta_issuer = %q, want %q", body["okta_issuer"], "https://example.okta.com/oauth2/default")
				}
				if body["okta_client_id"] != "client123" {
					t.Errorf("okta_client_id = %q, want %q", body["okta_client_id"], "client123")
				}
			},
		},
		{
			name:   "CORS preflight from allowed origin",
			method: http.MethodOptions,
			path:   "/api/v1/config",
			headers: map[string]string{
				"Origin":                        "http://localhost:8080",
				"Access-Control-Request-Method": "GET",
			},
			wantStatus: http.StatusNoContent,
			check: func(t *testing.T, w *httptest.ResponseRecorder) {
				if got := w.Header().Get("Access-Control-Allow-Origin"); got != "http://localhost:8080" {
					t.Errorf("Access-Control-Allow-Origin = %q, want %q", got, "http://localhost:8080")
				}
			},
		},
		{
			name:   "CORS disallowed origin is rejected",
			method: http.MethodGet,
			path:   "/api/v1/config",
			headers: map[string]string{
				"Origin": "http://evil.example.com",
			},
			wantStatus: http.StatusForbidden,
			check: func(t *testing.T, w *httptest.ResponseRecorder) {
				if got := w.Header().Get("Access-Control-Allow-Origin"); got == "http://evil.example.com" {
					t.Error("disallowed origin was reflected in Access-Control-Allow-Origin")
				}
			},
		},
		{
			name:       "protected route without token returns 401",
			method:     http.MethodGet,
			path:       "/api/v1/user/me",
			wantStatus: http.StatusUnauthorized,
		},
		{
			name:   "protected route with valid token returns 200",
			method: http.MethodGet,
			path:   "/api/v1/user/me",
			headers: map[string]string{
				"Authorization": "Bearer valid-token",
			},
			wantStatus: http.StatusOK,
		},
		{
			name:       "unknown API path returns JSON 404",
			method:     http.MethodGet,
			path:       "/api/v1/does-not-exist",
			wantStatus: http.StatusNotFound,
			check: func(t *testing.T, w *httptest.ResponseRecorder) {
				var body map[string]string
				if err := json.Unmarshal(w.Body.Bytes(), &body); err != nil {
					t.Fatalf("unmarshal: %v", err)
				}
				if body["error"] == "" {
					t.Error("expected JSON error field, got none")
				}
			},
		},
		{
			name:       "unknown non-API path serves SPA index.html",
			method:     http.MethodGet,
			path:       "/some/deep/link",
			wantStatus: http.StatusOK,
			check: func(t *testing.T, w *httptest.ResponseRecorder) {
				ct := w.Header().Get("Content-Type")
				if !strings.HasPrefix(ct, "text/html") {
					t.Errorf("Content-Type = %q, want text/html", ct)
				}
			},
		},
		{
			name:       "missing asset path returns 404 not SPA",
			method:     http.MethodGet,
			path:       "/assets/missing.js",
			wantStatus: http.StatusNotFound,
		},
	}

	srv := newTestServer()

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			req, _ := http.NewRequest(tc.method, tc.path, nil)
			for k, v := range tc.headers {
				req.Header.Set(k, v)
			}
			srv.ServeHTTP(w, req)

			if w.Code != tc.wantStatus {
				t.Fatalf("status = %d, want %d", w.Code, tc.wantStatus)
			}
			if tc.check != nil {
				tc.check(t, w)
			}
		})
	}
}
