package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// HealthHandler handles the public health check endpoint.
type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

// Health responds with 200 OK and a simple status body.
func (h *HealthHandler) Health(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
