package config_test

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/shoekstra/afashours/internal/config"
)

func validConfig() *config.Config {
	return &config.Config{
		AfasAccount:    "123456",
		AfasToken:      "afas-token",
		EmployeeNumber: "42",
		Source:         config.SourceConfig{Type: "toggl", Token: "toggl-token"},
		Projects:       map[string]config.Project{"Work": {Code: "P1", Type: "T1"}},
	}
}

// --- Save / LoadFile round-trip ---

func TestSaveAndLoadFile_RoundTrip(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.yaml")
	ctx := context.Background()

	cfg := validConfig()
	if err := config.Save(ctx, cfg, path); err != nil {
		t.Fatalf("Save: %v", err)
	}

	got, err := config.LoadFile(ctx, path)
	if err != nil {
		t.Fatalf("LoadFile: %v", err)
	}
	if got.AfasAccount != cfg.AfasAccount {
		t.Errorf("AfasAccount = %q, want %q", got.AfasAccount, cfg.AfasAccount)
	}
	if got.Source.Token != cfg.Source.Token {
		t.Errorf("Source.Token = %q, want %q", got.Source.Token, cfg.Source.Token)
	}
	if got.Projects["Work"].Code != "P1" {
		t.Errorf("Projects[Work].Code = %q, want %q", got.Projects["Work"].Code, "P1")
	}
}

func TestSave_CreatesParentDirectory(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "nested", "deep", "config.yaml")
	if err := config.Save(context.Background(), validConfig(), path); err != nil {
		t.Fatalf("Save: %v", err)
	}
	if _, err := os.Stat(path); err != nil {
		t.Errorf("file not created: %v", err)
	}
}

func TestSave_FileMode(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.yaml")
	if err := config.Save(context.Background(), validConfig(), path); err != nil {
		t.Fatalf("Save: %v", err)
	}
	info, err := os.Stat(path)
	if err != nil {
		t.Fatalf("Stat: %v", err)
	}
	if info.Mode().Perm() != 0600 {
		t.Errorf("file mode = %o, want 0600", info.Mode().Perm())
	}
}

func TestSave_EnforcesFileModeOnExistingFile(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.yaml")
	// Create the file with broader permissions first.
	if err := os.WriteFile(path, []byte{}, 0644); err != nil {
		t.Fatalf("setup: %v", err)
	}
	if err := config.Save(context.Background(), validConfig(), path); err != nil {
		t.Fatalf("Save: %v", err)
	}
	info, err := os.Stat(path)
	if err != nil {
		t.Fatalf("Stat: %v", err)
	}
	if info.Mode().Perm() != 0600 {
		t.Errorf("file mode = %o, want 0600 after Save on existing file", info.Mode().Perm())
	}
}

func TestLoadFile_NotExist(t *testing.T) {
	path := filepath.Join(t.TempDir(), "config.yaml")
	_, err := config.LoadFile(context.Background(), path)
	if !errors.Is(err, os.ErrNotExist) {
		t.Fatalf("err = %v, want os.ErrNotExist", err)
	}
}

// --- Load applies env overrides, LoadFile does not ---

func TestLoad_EnvOverridesApplied(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.yaml")
	if err := config.Save(context.Background(), validConfig(), path); err != nil {
		t.Fatalf("Save: %v", err)
	}

	t.Setenv("AFAS_ACCOUNT", "env-account")
	t.Setenv("AFAS_TOKEN", "env-token")
	t.Setenv("TOGGL_TOKEN", "env-toggl")

	got, err := config.Load(context.Background(), path)
	if err != nil {
		t.Fatalf("Load: %v", err)
	}
	if got.AfasAccount != "env-account" {
		t.Errorf("AfasAccount = %q, want %q", got.AfasAccount, "env-account")
	}
	if got.AfasToken != "env-token" {
		t.Errorf("AfasToken = %q, want %q", got.AfasToken, "env-token")
	}
	if got.Source.Token != "env-toggl" {
		t.Errorf("Source.Token = %q, want %q", got.Source.Token, "env-toggl")
	}
}

func TestLoadFile_EnvOverridesNotApplied(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.yaml")
	cfg := validConfig()
	if err := config.Save(context.Background(), cfg, path); err != nil {
		t.Fatalf("Save: %v", err)
	}

	t.Setenv("AFAS_ACCOUNT", "env-account")
	t.Setenv("AFAS_TOKEN", "env-token")
	t.Setenv("TOGGL_TOKEN", "env-toggl")

	got, err := config.LoadFile(context.Background(), path)
	if err != nil {
		t.Fatalf("LoadFile: %v", err)
	}
	if got.AfasAccount != cfg.AfasAccount {
		t.Errorf("AfasAccount = %q, want file value %q", got.AfasAccount, cfg.AfasAccount)
	}
	if got.AfasToken != cfg.AfasToken {
		t.Errorf("AfasToken = %q, want file value %q", got.AfasToken, cfg.AfasToken)
	}
	if got.Source.Token != cfg.Source.Token {
		t.Errorf("Source.Token = %q, want file value %q", got.Source.Token, cfg.Source.Token)
	}
}

func TestLoad_WhitespaceOnlyEnvVarsIgnored(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "config.yaml")
	cfg := validConfig()
	if err := config.Save(context.Background(), cfg, path); err != nil {
		t.Fatalf("Save: %v", err)
	}

	t.Setenv("AFAS_ACCOUNT", "   ")
	t.Setenv("AFAS_TOKEN", "\t")
	t.Setenv("TOGGL_TOKEN", "  ")

	got, err := config.Load(context.Background(), path)
	if err != nil {
		t.Fatalf("Load: %v", err)
	}
	if got.AfasAccount != cfg.AfasAccount {
		t.Errorf("AfasAccount = %q, want file value %q (whitespace env should not override)", got.AfasAccount, cfg.AfasAccount)
	}
	if got.AfasToken != cfg.AfasToken {
		t.Errorf("AfasToken = %q, want file value %q (whitespace env should not override)", got.AfasToken, cfg.AfasToken)
	}
	if got.Source.Token != cfg.Source.Token {
		t.Errorf("Source.Token = %q, want file value %q (whitespace env should not override)", got.Source.Token, cfg.Source.Token)
	}
}

// --- ValidateForSync ---

func TestValidateForSync_Valid(t *testing.T) {
	if err := validConfig().ValidateForSync(); err != nil {
		t.Errorf("unexpected error: %v", err)
	}
}

func TestValidateForSync_MissingFields(t *testing.T) {
	tests := []struct {
		name   string
		mutate func(*config.Config)
		want   string
	}{
		{
			name:   "missing afas_account",
			mutate: func(c *config.Config) { c.AfasAccount = "" },
			want:   "afas_account",
		},
		{
			name:   "missing afas_token",
			mutate: func(c *config.Config) { c.AfasToken = "" },
			want:   "afas_token",
		},
		{
			name:   "missing employee_number",
			mutate: func(c *config.Config) { c.EmployeeNumber = "" },
			want:   "employee_number",
		},
		{
			name:   "missing source type",
			mutate: func(c *config.Config) { c.Source.Type = "" },
			want:   "source.type",
		},
		{
			name:   "missing source token",
			mutate: func(c *config.Config) { c.Source.Token = "" },
			want:   "source.token",
		},
		{
			name:   "no projects",
			mutate: func(c *config.Config) { c.Projects = nil },
			want:   "project mapping",
		},
		{
			name:   "project missing code",
			mutate: func(c *config.Config) { c.Projects["Work"] = config.Project{Type: "T1"} },
			want:   "missing a code",
		},
		{
			name:   "project missing type",
			mutate: func(c *config.Config) { c.Projects["Work"] = config.Project{Code: "P1"} },
			want:   "missing a type",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			cfg := validConfig()
			tc.mutate(cfg)
			err := cfg.ValidateForSync()
			if err == nil {
				t.Fatal("expected error, got nil")
			}
			if !strings.Contains(err.Error(), tc.want) {
				t.Errorf("error = %q, want it to contain %q", err.Error(), tc.want)
			}
		})
	}
}
