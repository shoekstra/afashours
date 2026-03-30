package main

import (
	"context"
	"fmt"
	"time"

	"github.com/spf13/cobra"

	"github.com/shoekstra/afashours/internal/afas"
	localconfig "github.com/shoekstra/afashours/internal/config"
	"github.com/shoekstra/afashours/internal/source/toggl"
	"github.com/shoekstra/afashours/internal/storage"
	isync "github.com/shoekstra/afashours/internal/sync"
)

func syncCmd() *cobra.Command {
	var (
		cfgFile string
		month   string
		dryRun  bool
	)

	cmd := &cobra.Command{
		Use:   "sync",
		Short: "Sync time entries to AFAS",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, _ []string) error {
			return runSync(cmd.Context(), cfgFile, month, dryRun)
		},
	}

	cmd.Flags().StringVarP(&cfgFile, "config", "c", "", "Config file (default: ~/.config/afashours/config.yaml)")
	cmd.Flags().StringVarP(&month, "month", "m", "", "Month to sync in YYYY-MM format (default: current month)")
	cmd.Flags().BoolVarP(&dryRun, "dry-run", "d", false, "Show what would be synced without making changes")

	return cmd
}

func runSync(ctx context.Context, cfgFile, month string, dryRun bool) error {
	path, err := resolveConfigPath(cfgFile)
	if err != nil {
		return fmt.Errorf("resolving config path: %w", err)
	}

	cfg, err := localconfig.Load(ctx, path)
	if err != nil {
		return fmt.Errorf("loading config: %w", err)
	}
	if err := cfg.ValidateForSync(); err != nil {
		return fmt.Errorf("invalid config: %w", err)
	}

	if month == "" {
		month = time.Now().Format("2006-01")
	} else if _, err := time.Parse("2006-01", month); err != nil {
		return fmt.Errorf("invalid month %q: expected YYYY-MM", month)
	}

	if cfg.Source.Type != "toggl" {
		return fmt.Errorf("unsupported source type %q", cfg.Source.Type)
	}
	source, err := toggl.NewSource(cfg.Source.Token)
	if err != nil {
		return fmt.Errorf("creating %s source: %w", cfg.Source.Type, err)
	}

	projects := make(map[string]storage.ProjectMapping, len(cfg.Projects))
	for name, p := range cfg.Projects {
		projects[name] = storage.ProjectMapping{Code: p.Code, Type: p.Type}
	}

	opts := isync.RunOptions{
		EmployeeNumber: cfg.EmployeeNumber,
		Month:          month,
		Projects:       projects,
	}

	var afasClient isync.AFASClient
	if dryRun {
		fmt.Printf("Dry run: syncing %s (no changes will be made)\n", month)
		afasClient = &dryRunAFASClient{}
	} else {
		fmt.Printf("Syncing %s to AFAS...\n", month)
		afasClient = afas.NewClient(cfg.AfasAccount, cfg.AfasToken)
	}

	engine := isync.NewEngine(afasClient)
	summary, err := engine.Run(ctx, source, opts)
	if err != nil {
		return fmt.Errorf("sync failed: %w", err)
	}

	fmt.Printf("Done: %d found, %d synced, %d skipped\n",
		summary.EntriesFound, summary.EntriesSynced, summary.EntriesSkipped)
	if summary.EntriesSkipped > 0 {
		fmt.Println("Note: skipped entries have no project set, an unmapped project, or span midnight.")
	}
	return nil
}

// dryRunAFASClient implements isync.AFASClient without making real API calls.
type dryRunAFASClient struct{}

// GetDayEntries returns empty results in dry-run mode. This means the sync
// engine will only show insertions; existing entries that would be replaced
// are not surfaced.
func (d *dryRunAFASClient) GetDayEntries(_ context.Context, _, date string) ([]afas.WorkEntryResponse, error) {
	fmt.Printf("  [dry-run] would fetch existing entries for %s\n", date)
	return nil, nil
}

func (d *dryRunAFASClient) DeleteEntry(_ context.Context, entry afas.WorkEntryResponse) error {
	fmt.Printf("  [dry-run] would delete entry %d (%s)\n", entry.RecordNumber, entry.Period)
	return nil
}

func (d *dryRunAFASClient) InsertEntry(_ context.Context, entry *afas.WorkEntry) (string, error) {
	fmt.Printf("  [dry-run] would insert: %s %s–%s  project=%s type=%s\n",
		entry.DateTime, entry.StartTime, entry.EndTime, entry.ProjectID, entry.ItemCode)
	return "dry-run", nil
}

// resolveConfigPath returns cfgFile if set, otherwise the default config path.
func resolveConfigPath(cfgFile string) (string, error) {
	if cfgFile != "" {
		return cfgFile, nil
	}
	return localconfig.DefaultPath()
}
