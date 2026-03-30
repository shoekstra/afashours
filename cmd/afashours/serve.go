package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/shoekstra/afashours/internal/api"
	"github.com/shoekstra/afashours/internal/auth"
	"github.com/shoekstra/afashours/internal/storage/sqlite"
)

// serveCmd returns the cobra command for starting the API server.
func serveCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "serve",
		Short: "Start the API server",
		Args:  cobra.NoArgs,
		RunE:  runServe,
	}

	cmd.Flags().String("addr", ":8080", "Address to listen on")

	return cmd
}

// runServe is the RunE implementation for serveCmd. It validates required
// environment variables, opens the database, and starts the HTTP server.
func runServe(cmd *cobra.Command, _ []string) error {
	if err := viper.BindPFlag("listen_addr", cmd.Flags().Lookup("addr")); err != nil {
		return fmt.Errorf("binding addr flag: %w", err)
	}

	requiredEnv := []string{
		"AFAS_ACCOUNT",
		"AFAS_TOKEN",
		"OKTA_ISSUER",
		"OKTA_AUDIENCE",
		"OKTA_CLIENT_ID",
		"STORAGE_ENCRYPTION_KEY",
	}
	for _, key := range requiredEnv {
		if strings.TrimSpace(viper.GetString(key)) == "" {
			return fmt.Errorf("required environment variable %s is not set", key)
		}
	}

	dbPath := strings.TrimSpace(viper.GetString("SQLITE_PATH"))
	if dbPath == "" {
		dbPath = "afashours.db"
	}
	encryptionKey := strings.TrimSpace(viper.GetString("STORAGE_ENCRYPTION_KEY"))
	db, err := sqlite.NewDB(dbPath, encryptionKey)
	if err != nil {
		return fmt.Errorf("opening database: %w", err)
	}
	defer func() {
		if err := db.Close(); err != nil {
			fmt.Fprintf(os.Stderr, "closing database: %v\n", err)
		}
	}()

	validator, err := auth.NewOktaValidator(auth.Config{
		Issuer:   strings.TrimSpace(viper.GetString("OKTA_ISSUER")),
		Audience: strings.TrimSpace(viper.GetString("OKTA_AUDIENCE")),
		ClientID: strings.TrimSpace(viper.GetString("OKTA_CLIENT_ID")),
	})
	if err != nil {
		return fmt.Errorf("creating auth validator: %w", err)
	}

	// CORS_ALLOWED_ORIGINS is a comma-separated list of origins the browser is
	// permitted to make cross-origin requests from. In normal operation the
	// frontend is served by the same Go binary (same origin), so CORS is not
	// exercised. Set this when the frontend is served from a different domain,
	// e.g. a CDN in production.
	rawOrigins := strings.TrimSpace(viper.GetString("CORS_ALLOWED_ORIGINS"))
	if rawOrigins == "" {
		rawOrigins = "http://localhost:8080"
	}
	var allowedOrigins []string
	for _, o := range strings.Split(rawOrigins, ",") {
		if o = strings.TrimSpace(o); o != "" {
			allowedOrigins = append(allowedOrigins, o)
		}
	}

	addr := viper.GetString("listen_addr")
	srv := api.NewServer(api.ServerConfig{
		DB:             db,
		Validator:      validator,
		AfasAccount:    strings.TrimSpace(viper.GetString("AFAS_ACCOUNT")),
		AfasToken:      strings.TrimSpace(viper.GetString("AFAS_TOKEN")),
		OktaIssuer:     strings.TrimSpace(viper.GetString("OKTA_ISSUER")),
		OktaClientID:   strings.TrimSpace(viper.GetString("OKTA_CLIENT_ID")),
		AllowedOrigins: allowedOrigins,
	})
	fmt.Fprintf(os.Stderr, "listening on %s\n", addr)
	return srv.Run(addr)
}
