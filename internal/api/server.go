package api

import (
	"context"
	"errors"
	"io/fs"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"strings"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/shoekstra/afashours/internal/api/handler"
	"github.com/shoekstra/afashours/internal/api/middleware"
	"github.com/shoekstra/afashours/internal/api/static"
	"github.com/shoekstra/afashours/internal/auth"
	"github.com/shoekstra/afashours/internal/storage"
)

// ServerConfig holds the parameters needed to create a Server.
type ServerConfig struct {
	DB              storage.Storage
	Validator       auth.Validator
	AfasAccount     string
	AfasToken       string
	OktaIssuer      string
	OktaClientID    string
	AllowedOrigins  []string
}

// Server holds the HTTP server dependencies and router.
type Server struct {
	router       *gin.Engine
	syncHandler  *handler.SyncHandler
	workerCancel context.CancelFunc
}

// NewServer wires up the Gin router with all routes and middleware.
func NewServer(cfg ServerConfig) *Server {
	workerCtx, workerCancel := context.WithCancel(context.Background()) //nolint:gosec // G118: cancel is stored in Server.workerCancel and called in Run's defer

	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())
	r.Use(middleware.CORS(cfg.AllowedOrigins))

	// Public routes.
	r.GET("/health", handler.NewHealthHandler().Health)
	r.GET("/api/v1/config", handler.NewConfigHandler(cfg.OktaIssuer, cfg.OktaClientID).GetConfig)

	// Authenticated routes.
	userH := handler.NewUserHandler(cfg.DB)
	syncH := handler.NewSyncHandler(workerCtx, cfg.DB, cfg.AfasAccount, cfg.AfasToken)

	authed := r.Group("/api/v1")
	authed.Use(middleware.Auth(cfg.Validator))
	{
		authed.GET("/user/me", userH.GetMe)
		authed.GET("/user/me/preferences", userH.GetPreferences)
		authed.PATCH("/user/me/preferences", userH.PatchPreferences)
		authed.POST("/sync", syncH.PostSync)
		authed.GET("/sync/:jobID", syncH.GetSync)
	}

	// Serve the embedded Vue SPA for all non-API paths.
	// API paths that don't match a route return JSON 404.
	distFS, _ := fs.Sub(static.FS, "dist")
	fileServer := http.FileServer(http.FS(distFS))
	r.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path
		if strings.HasPrefix(path, "/api/") {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}

		// Only GET and HEAD can serve the SPA or static assets.
		if c.Request.Method != http.MethodGet && c.Request.Method != http.MethodHead {
			c.Status(http.StatusNotFound)
			return
		}

		// Prevent stale asset serving: since filenames are stable (no content
		// hash), browsers must always revalidate. http.FileServer sets ETags so
		// most responses will be 304 Not Modified after the first load.
		c.Header("Cache-Control", "no-cache")

		// Try to serve the exact file first.
		if _, err := distFS.Open(strings.TrimPrefix(path, "/")); err == nil {
			fileServer.ServeHTTP(c.Writer, c.Request)
			return
		}

		// If the path looks like a missing asset (has a file extension), return
		// 404 rather than silently serving index.html.
		if filepath.Ext(path) != "" {
			c.Status(http.StatusNotFound)
			return
		}

		// SPA fallback: all extension-free paths are Vue Router routes.
		// Serving "/" causes http.FileServer to return index.html directly;
		// serving "/index.html" triggers a redirect loop.
		c.Request.URL.Path = "/"
		fileServer.ServeHTTP(c.Writer, c.Request)
	})

	return &Server{
		router:       r,
		syncHandler:  syncH,
		workerCancel: workerCancel,
	}
}

// ServeHTTP implements http.Handler, allowing Server to be used directly in
// tests with httptest.NewRecorder without starting a real listener.
func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}

// Run starts the HTTP server on addr and blocks until SIGINT or SIGTERM is
// received, then performs a graceful shutdown:
//  1. Drain in-flight HTTP requests (30-second timeout).
//  2. Cancel background workers and wait for them to exit.
func (s *Server) Run(addr string) error {
	srv := &http.Server{
		Addr:              addr,
		Handler:           s.router,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	// Ensure workers are always cancelled and drained before Run returns,
	// regardless of which exit path is taken. This guarantees no DB operations
	// occur after the caller invokes db.Close().
	defer func() {
		s.workerCancel()
		s.syncHandler.Wait()
	}()

	errCh := make(chan error, 1)
	go func() {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- err
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	defer signal.Stop(quit) // always unregister on exit (e.g. ListenAndServe error)

	select {
	case err := <-errCh:
		return err
	case <-quit:
	}

	// Deregister the signal handler so a second Ctrl-C forces immediate exit.
	signal.Stop(quit)

	// Stop accepting new requests and drain in-flight HTTP requests.
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		// Shutdown timed out or otherwise failed; force-close all connections.
		_ = srv.Close()
		return err
	}
	return nil
}
