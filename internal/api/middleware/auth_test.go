package middleware

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/shoekstra/afashours/internal/auth"
)

// stubValidator is a test double for auth.Validator.
type stubValidator struct {
	claims *auth.Claims
	err    error
}

func (s *stubValidator) Validate(_ string) (*auth.Claims, error) {
	return s.claims, s.err
}

func newTestRouter(v auth.Validator) *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(Auth(v))
	r.GET("/test", func(c *gin.Context) {
		claims, ok := ClaimsFromContext(c)
		if !ok {
			c.Status(http.StatusInternalServerError)
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"subject":        claims.Subject,
			"employeeNumber": claims.EmployeeNumber,
		})
	})
	return r
}

func TestAuth_MissingHeader(t *testing.T) {
	r := newTestRouter(&stubValidator{})
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/test", nil)
	r.ServeHTTP(w, req)
	if w.Code != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", w.Code, http.StatusUnauthorized)
	}
}

func TestAuth_NonBearerHeader(t *testing.T) {
	r := newTestRouter(&stubValidator{})
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set("Authorization", "Basic dXNlcjpwYXNz")
	r.ServeHTTP(w, req)
	if w.Code != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", w.Code, http.StatusUnauthorized)
	}
}

func TestAuth_EmptyToken(t *testing.T) {
	r := newTestRouter(&stubValidator{})
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set("Authorization", "Bearer ")
	r.ServeHTTP(w, req)
	if w.Code != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", w.Code, http.StatusUnauthorized)
	}
}

func TestAuth_InvalidToken(t *testing.T) {
	v := &stubValidator{err: errors.New("token expired")}
	r := newTestRouter(v)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set("Authorization", "Bearer bad.token.here")
	r.ServeHTTP(w, req)
	if w.Code != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", w.Code, http.StatusUnauthorized)
	}
}

func TestAuth_ValidToken_StoresClaimsInContext(t *testing.T) {
	v := &stubValidator{claims: &auth.Claims{Subject: "sub123", EmployeeNumber: "42"}}
	r := newTestRouter(v)
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/test", nil)
	req.Header.Set("Authorization", "Bearer valid.token.here")
	r.ServeHTTP(w, req)
	if w.Code != http.StatusOK {
		t.Errorf("status = %d, want %d", w.Code, http.StatusOK)
	}
	body := w.Body.String()
	if !strings.Contains(body, "sub123") {
		t.Errorf("response body %q does not contain subject", body)
	}
	if !strings.Contains(body, "42") {
		t.Errorf("response body %q does not contain employeeNumber", body)
	}
}
