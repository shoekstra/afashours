package middleware

import (
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// CORS returns a middleware that allows cross-origin requests from the given
// origins. In development this should include the Vite dev server origin
// (e.g. http://localhost:5173). In production it should be the app's public
// URL. The list must never be empty; pass at least one explicit origin.
func CORS(allowedOrigins []string) gin.HandlerFunc {
	if len(allowedOrigins) == 0 {
		log.Fatal("CORS: allowedOrigins must not be empty")
	}
	return cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	})
}
