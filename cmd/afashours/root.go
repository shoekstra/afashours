package main

import (
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// rootCmd returns the root cobra command for the afashours binary.
func rootCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "afashours",
		Short: "Sync time entries from external tools to AFAS",
	}

	cobra.OnInitialize(func() {
		viper.AutomaticEnv()
	})

	cmd.AddCommand(serveCmd())
	cmd.AddCommand(syncCmd())
	cmd.AddCommand(initCmd())
	return cmd
}
