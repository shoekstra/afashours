package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/shoekstra/afashours/internal/auth"
)

const claimsKey = "auth_claims"

// setClaimsInContext stores claims in the Gin context under claimsKey.
func setClaimsInContext(c *gin.Context, claims *auth.Claims) {
	c.Set(claimsKey, claims)
}

// SetClaimsForTest injects claims directly into the Gin context.
// It is intended for use in handler tests that need to bypass the Auth middleware.
func SetClaimsForTest(c *gin.Context, claims *auth.Claims) {
	c.Set(claimsKey, claims)
}

// ClaimsFromContext retrieves the validated Claims stored by the Auth
// middleware. Returns (nil, false) if no claims are present.
func ClaimsFromContext(c *gin.Context) (*auth.Claims, bool) {
	v, ok := c.Get(claimsKey)
	if !ok {
		return nil, false
	}
	claims, ok := v.(*auth.Claims)
	return claims, ok
}
