package main

import "github.com/spf13/cobra"

func rootCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "afashours",
		Short: "Sync time entries from external tools to AFAS",
	}
	return cmd
}
