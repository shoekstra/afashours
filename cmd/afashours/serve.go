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

	addr := viper.GetString("listen_addr")

	srv := api.NewServer(db, validator)
	fmt.Fprintf(os.Stderr, "listening on %s\n", addr)
	return srv.Run(addr)
}
