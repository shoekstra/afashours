package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/shoekstra/afashours/internal/auth"
)

// Auth returns a Gin middleware that validates the Bearer token in the
// Authorization header using the provided Validator. On success the parsed
// claims are stored in the context and the request continues. On failure the
// request is aborted with 401.
func Auth(v auth.Validator) gin.HandlerFunc {
	return func(c *gin.Context) {
		header := c.GetHeader("Authorization")
		if !strings.HasPrefix(header, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing or malformed Authorization header"})
			return
		}
		token := strings.TrimPrefix(header, "Bearer ")
		if strings.TrimSpace(token) == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}

		claims, err := v.Validate(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}

		setClaimsInContext(c, claims)
		c.Next()
	}
}
