package config

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"gopkg.in/yaml.v3"
)

// Config holds the local CLI configuration for afashours.
type Config struct {
	AfasAccount    string             `yaml:"afas_account"`
	AfasToken      string             `yaml:"afas_token"`
	EmployeeNumber string             `yaml:"employee_number"`
	Source         SourceConfig       `yaml:"source"`
	Projects       map[string]Project `yaml:"projects,omitempty"`
}

// SourceConfig identifies the time tracking source and its credentials.
type SourceConfig struct {
	Type  string `yaml:"type"`  // e.g. "toggl"
	Token string `yaml:"token"`
}

// Project maps a human-friendly label to an AFAS project code and type.
type Project struct {
	Code string `yaml:"code"`
	Type string `yaml:"type"`
}

// DefaultPath returns the default config file path: ~/.config/afashours/config.yaml.
func DefaultPath() (string, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("finding home directory: %w", err)
	}
	return filepath.Join(home, ".config", "afashours", "config.yaml"), nil
}

// Load reads and parses the config file at path. AFAS_ACCOUNT, AFAS_TOKEN, and
// TOGGL_TOKEN environment variables override the corresponding config file values
// at runtime but are never written back to disk.
func Load(_ context.Context, path string) (*Config, error) {
	cfg, err := loadFile(path)
	if err != nil {
		return nil, err
	}
	applyEnvOverrides(cfg)
	return cfg, nil
}

// LoadFile reads and parses the config file at path without applying any
// environment variable overrides. Use this when the result will be written back
// to disk (e.g. during init) to avoid persisting env-only secrets.
func LoadFile(_ context.Context, path string) (*Config, error) {
	return loadFile(path)
}

// loadFile is the shared file-read implementation used by Load and LoadFile.
func loadFile(path string) (*Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("reading config: %w", err)
	}
	var cfg Config
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("parsing config: %w", err)
	}
	return &cfg, nil
}

// applyEnvOverrides overlays AFAS_ACCOUNT, AFAS_TOKEN, and TOGGL_TOKEN
// environment variables onto cfg. Called at runtime only; never before Save.
func applyEnvOverrides(cfg *Config) {
	if v := strings.TrimSpace(os.Getenv("AFAS_ACCOUNT")); v != "" {
		cfg.AfasAccount = v
	}
	if v := strings.TrimSpace(os.Getenv("AFAS_TOKEN")); v != "" {
		cfg.AfasToken = v
	}
	if v := strings.TrimSpace(os.Getenv("TOGGL_TOKEN")); v != "" {
		cfg.Source.Token = v
	}
}

// Save writes cfg to path as YAML, creating parent directories as needed.
// The file is written with mode 0600 (owner read/write only).
func Save(_ context.Context, cfg *Config, path string) error {
	if err := os.MkdirAll(filepath.Dir(path), 0700); err != nil {
		return fmt.Errorf("creating config directory: %w", err)
	}
	data, err := yaml.Marshal(cfg)
	if err != nil {
		return fmt.Errorf("serialising config: %w", err)
	}
	if err := os.WriteFile(path, data, 0600); err != nil {
		return fmt.Errorf("writing config: %w", err)
	}
	return nil
}

// ValidateForSync returns an error if any field required to run a sync is missing.
func (c *Config) ValidateForSync() error {
	if c.AfasAccount == "" {
		return fmt.Errorf("afas_account is required (set in config file or AFAS_ACCOUNT env)")
	}
	if c.AfasToken == "" {
		return fmt.Errorf("afas_token is required (set in config file or AFAS_TOKEN env)")
	}
	if c.EmployeeNumber == "" {
		return fmt.Errorf("employee_number is required")
	}
	if c.Source.Type == "" {
		return fmt.Errorf("source.type is required")
	}
	if c.Source.Token == "" {
		return fmt.Errorf("source.token is required (set in config file or TOGGL_TOKEN env)")
	}
	if len(c.Projects) == 0 {
		return fmt.Errorf("at least one project mapping is required; run 'afashours init' to configure")
	}
	for label, p := range c.Projects {
		if p.Code == "" {
			return fmt.Errorf("project %q is missing a code", label)
		}
		if p.Type == "" {
			return fmt.Errorf("project %q is missing a type", label)
		}
	}
	return nil
}
