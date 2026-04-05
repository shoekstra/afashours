package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// ConfigHandler serves runtime configuration to the frontend.
type ConfigHandler struct {
	oktaIssuer   string
	oktaClientID string
}

// NewConfigHandler creates a ConfigHandler with the given Okta parameters.
func NewConfigHandler(oktaIssuer, oktaClientID string) *ConfigHandler {
	return &ConfigHandler{
		oktaIssuer:   oktaIssuer,
		oktaClientID: oktaClientID,
	}
}

// configResponse is the JSON shape for GET /api/v1/config.
type configResponse struct {
	OktaIssuer   string `json:"okta_issuer"`
	OktaClientID string `json:"okta_client_id"`
}

// GetConfig returns the runtime Okta configuration needed by the frontend
// to initialise the OIDC flow. This endpoint is public (no auth required).
func (h *ConfigHandler) GetConfig(c *gin.Context) {
	c.JSON(http.StatusOK, configResponse{
		OktaIssuer:   h.oktaIssuer,
		OktaClientID: h.oktaClientID,
	})
}
