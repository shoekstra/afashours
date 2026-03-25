package sqlite

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/shoekstra/afashours/internal/storage"
)

// GetUserPreferences returns the stored preferences for the given Okta subject
// ID. Returns nil, nil if no preferences have been saved yet.
func (d *DB) GetUserPreferences(ctx context.Context, subject string) (*storage.UserPreferences, error) {
	if strings.TrimSpace(subject) == "" {
		return nil, fmt.Errorf("subject must not be empty")
	}

	var tokenEnc sql.NullString
	var projectsJSON string

	err := d.db.QueryRowContext(ctx,
		`SELECT toggl_token_enc, projects_json FROM users WHERE subject = ?`,
		subject,
	).Scan(&tokenEnc, &projectsJSON)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("querying user preferences: %w", err)
	}

	token, err := d.decrypt(tokenEnc.String)
	if err != nil {
		return nil, fmt.Errorf("decrypting toggl token: %w", err)
	}

	var projects map[string]storage.ProjectMapping
	if err := json.Unmarshal([]byte(projectsJSON), &projects); err != nil {
		return nil, fmt.Errorf("decoding projects: %w", err)
	}

	return &storage.UserPreferences{
		TogglToken: token,
		Projects:   projects,
	}, nil
}

// UpsertUserPreferences creates or updates preferences for the given Okta
// subject ID. Only TogglToken and Projects are stored; the employee number is
// never written here (it is read from the JWT at request time).
func (d *DB) UpsertUserPreferences(ctx context.Context, subject string, prefs *storage.UserPreferences) error {
	if strings.TrimSpace(subject) == "" {
		return fmt.Errorf("subject must not be empty")
	}
	if prefs == nil {
		return fmt.Errorf("prefs must not be nil")
	}

	tokenEnc, err := d.encrypt(prefs.TogglToken)
	if err != nil {
		return fmt.Errorf("encrypting toggl token: %w", err)
	}

	projects := prefs.Projects
	if projects == nil {
		projects = make(map[string]storage.ProjectMapping)
	}

	projectsJSON, err := json.Marshal(projects)
	if err != nil {
		return fmt.Errorf("encoding projects: %w", err)
	}

	_, err = d.db.ExecContext(ctx, `
		INSERT INTO users (subject, toggl_token_enc, projects_json)
		VALUES (?, ?, ?)
		ON CONFLICT(subject) DO UPDATE SET
		    toggl_token_enc = excluded.toggl_token_enc,
		    projects_json   = excluded.projects_json`,
		subject, tokenEnc, string(projectsJSON),
	)
	if err != nil {
		return fmt.Errorf("upserting user preferences: %w", err)
	}
	return nil
}
