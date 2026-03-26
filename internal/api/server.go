package api

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/shoekstra/afashours/internal/api/handler"
	"github.com/shoekstra/afashours/internal/api/middleware"
	"github.com/shoekstra/afashours/internal/auth"
	"github.com/shoekstra/afashours/internal/storage"
)

// Server holds the HTTP server dependencies and router.
type Server struct {
	router       *gin.Engine
	syncHandler  *handler.SyncHandler
	workerCancel context.CancelFunc
}

// NewServer wires up the Gin router with all routes and middleware.
func NewServer(db storage.Storage, validator auth.Validator) *Server {
	workerCtx, workerCancel := context.WithCancel(context.Background())

	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	// Public routes.
	h := handler.NewHealthHandler()
	r.GET("/health", h.Health)

	// Authenticated routes.
	userH := handler.NewUserHandler(db)
	syncH := handler.NewSyncHandler(db, workerCtx)

	authed := r.Group("/api/v1")
	authed.Use(middleware.Auth(validator))
	{
		authed.GET("/user/me", userH.GetMe)
		authed.GET("/user/me/preferences", userH.GetPreferences)
		authed.PATCH("/user/me/preferences", userH.PatchPreferences)
		authed.POST("/sync", syncH.PostSync)
		authed.GET("/sync/:jobID", syncH.GetSync)
	}

	return &Server{
		router:       r,
		syncHandler:  syncH,
		workerCancel: workerCancel,
	}
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
