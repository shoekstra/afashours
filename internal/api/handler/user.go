package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/shoekstra/afashours/internal/api/middleware"
	"github.com/shoekstra/afashours/internal/storage"
)

// UserHandler handles user profile and preferences endpoints.
type UserHandler struct {
	db storage.Storage
}

func NewUserHandler(db storage.Storage) *UserHandler {
	return &UserHandler{db: db}
}

// getMeResponse is the JSON shape for GET /api/v1/user/me.
type getMeResponse struct {
	Subject        string `json:"subject"`
	EmployeeNumber string `json:"employee_number"`
}

// GetMe returns the current user's identity from the validated JWT claims.
func (h *UserHandler) GetMe(c *gin.Context) {
	claims, ok := middleware.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "claims not found in context"})
		return
	}
	c.JSON(http.StatusOK, getMeResponse{
		Subject:        claims.Subject,
		EmployeeNumber: claims.EmployeeNumber,
	})
}

// preferencesResponse is the JSON shape for preferences endpoints.
// The Toggl token is never returned; has_toggl_token indicates whether one is stored.
type preferencesResponse struct {
	HasTogglToken bool                              `json:"has_toggl_token"`
	Projects      map[string]storage.ProjectMapping `json:"projects"`
}

// GetPreferences returns the stored preferences for the current user.
// Returns an empty preferences object if none have been saved yet.
func (h *UserHandler) GetPreferences(c *gin.Context) {
	claims, ok := middleware.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "claims not found in context"})
		return
	}

	prefs, err := h.db.GetUserPreferences(c.Request.Context(), claims.Subject)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve preferences"})
		return
	}

	if prefs == nil {
		c.JSON(http.StatusOK, preferencesResponse{Projects: map[string]storage.ProjectMapping{}})
		return
	}

	projects := prefs.Projects
	if projects == nil {
		projects = map[string]storage.ProjectMapping{}
	}
	c.JSON(http.StatusOK, preferencesResponse{
		HasTogglToken: prefs.TogglToken != "",
		Projects:      projects,
	})
}

// patchPreferencesRequest is the JSON body for PATCH /api/v1/user/me/preferences.
// All fields are optional; omitted fields leave the stored value unchanged.
// If Projects is present the entire project map is replaced.
type patchPreferencesRequest struct {
	TogglToken *string                            `json:"toggl_token"`
	Projects   map[string]storage.ProjectMapping  `json:"projects"`
}

// PatchPreferences applies a partial update to the current user's preferences.
func (h *UserHandler) PatchPreferences(c *gin.Context) {
	claims, ok := middleware.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "claims not found in context"})
		return
	}

	var req patchPreferencesRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	// Load existing preferences so we only overwrite fields that were sent.
	existing, err := h.db.GetUserPreferences(c.Request.Context(), claims.Subject)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to retrieve preferences"})
		return
	}
	if existing == nil {
		existing = &storage.UserPreferences{Projects: map[string]storage.ProjectMapping{}}
	}

	if req.TogglToken != nil {
		existing.TogglToken = *req.TogglToken
	}
	if req.Projects != nil {
		existing.Projects = req.Projects
	}

	if err := h.db.UpsertUserPreferences(c.Request.Context(), claims.Subject, existing); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save preferences"})
		return
	}

	projects := existing.Projects
	if projects == nil {
		projects = map[string]storage.ProjectMapping{}
	}
	c.JSON(http.StatusOK, preferencesResponse{
		HasTogglToken: existing.TogglToken != "",
		Projects:      projects,
	})
}
