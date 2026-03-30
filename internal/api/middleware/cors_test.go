package middleware

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func newCORSRouter(origins []string) *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(CORS(origins))
	r.GET("/test", func(c *gin.Context) { c.Status(http.StatusOK) })
	return r
}

func TestCORS(t *testing.T) {
	cases := []struct {
		name                string
		origin              string
		method              string
		requestMethod       string // non-empty sets Access-Control-Request-Method header
		expectedStatus      int
		expectedAllowOrigin string
	}{
		{
			name:                "allowed origin",
			origin:              "http://localhost:5173",
			method:              http.MethodGet,
			expectedStatus:      http.StatusOK,
			expectedAllowOrigin: "http://localhost:5173",
		},
		{
			name:           "disallowed origin",
			origin:         "http://evil.example.com",
			method:         http.MethodGet,
			expectedStatus: http.StatusForbidden,
		},
		{
			name:                "preflight from allowed origin",
			origin:              "http://localhost:5173",
			method:              http.MethodOptions,
			requestMethod:       http.MethodGet,
			expectedStatus:      http.StatusNoContent,
			expectedAllowOrigin: "http://localhost:5173",
		},
	}

	r := newCORSRouter([]string{"http://localhost:5173"})

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			req, _ := http.NewRequest(tc.method, "/test", nil)
			req.Header.Set("Origin", tc.origin)
			if tc.requestMethod != "" {
				req.Header.Set("Access-Control-Request-Method", tc.requestMethod)
			}
			r.ServeHTTP(w, req)

			if w.Code != tc.expectedStatus {
				t.Errorf("status = %d, want %d", w.Code, tc.expectedStatus)
			}
			if got := w.Header().Get("Access-Control-Allow-Origin"); got != tc.expectedAllowOrigin {
				t.Errorf("Access-Control-Allow-Origin = %q, want %q", got, tc.expectedAllowOrigin)
			}
		})
	}
}
