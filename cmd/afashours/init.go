package main

import (
	"context"
	"errors"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/manifoldco/promptui"
	"github.com/spf13/cobra"

	"github.com/shoekstra/afashours/internal/afas"
	localconfig "github.com/shoekstra/afashours/internal/config"
)

// initCmd returns the cobra command for initialising or updating the local config file.
func initCmd() *cobra.Command {
	var cfgFile string

	cmd := &cobra.Command{
		Use:   "init",
		Short: "Initialise or update the local config file",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, _ []string) error {
			return runInit(cmd.Context(), cfgFile)
		},
	}

	cmd.Flags().StringVarP(&cfgFile, "config", "c", "", "Config file to create or update (default: ~/.config/afashours/config.yaml)")

	return cmd
}

// runInit is the RunE implementation for initCmd. It walks the user through
// setting up or updating the local config file interactively.
func runInit(ctx context.Context, cfgFile string) error {
	path, err := resolveConfigPath(cfgFile)
	if err != nil {
		return err
	}

	cfg, err := localconfig.LoadFile(ctx, path)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			fmt.Println("No existing config found; creating a new one.")
			cfg = &localconfig.Config{}
		} else {
			return fmt.Errorf("loading config: %w", err)
		}
	} else {
		fmt.Printf("Updating config: %s\n", path)
	}

	fmt.Println()

	// --- AFAS ---
	afasAccount, err := promptString("AFAS instance number", cfg.AfasAccount, validateInt)
	if err != nil {
		return err
	}
	cfg.AfasAccount = afasAccount

	afasToken, err := promptMasked("AFAS API token", cfg.AfasToken != "")
	if err != nil {
		return err
	}
	afasToken = strings.TrimSpace(afasToken)
	if afasToken != "" {
		cfg.AfasToken = afasToken
	}
	// For runtime decisions (connecting to AFAS during init), fall back to the
	// env var when the user left the prompt blank and no token is in the file.
	// cfg.AfasToken is intentionally not updated from the env so it is not
	// persisted by Save.
	runtimeAfasToken := cfg.AfasToken
	if runtimeAfasToken == "" {
		runtimeAfasToken = strings.TrimSpace(os.Getenv("AFAS_TOKEN"))
	}

	empNum, err := promptString("Employee number", cfg.EmployeeNumber, validateInt)
	if err != nil {
		return err
	}
	cfg.EmployeeNumber = empNum

	fmt.Println()

	// --- Time tracking source ---
	sourceType, err := promptSelect("Time tracking source", []string{"toggl"}, cfg.Source.Type)
	if err != nil {
		return err
	}
	cfg.Source.Type = sourceType

	sourceToken, err := promptMasked(capitalize(sourceType)+" API token", cfg.Source.Token != "")
	if err != nil {
		return err
	}
	sourceToken = strings.TrimSpace(sourceToken)
	if sourceToken != "" {
		cfg.Source.Token = sourceToken
	}

	fmt.Println()

	// --- Projects ---
	if err := configureProjects(ctx, cfg, runtimeAfasToken); err != nil {
		return err
	}

	// --- Save ---
	fmt.Println()
	if err := localconfig.Save(ctx, cfg, path); err != nil {
		return fmt.Errorf("saving config: %w", err)
	}
	fmt.Printf("Config saved to %s\n", path)
	return nil
}

// configureProjects interactively adds or updates project mappings in cfg by
// fetching available projects and types from the AFAS API.
func configureProjects(ctx context.Context, cfg *localconfig.Config, afasToken string) error {
	if len(cfg.Projects) > 0 {
		fmt.Printf("Existing project mappings: %d\n", len(cfg.Projects))
		for label, p := range cfg.Projects {
			fmt.Printf("  %q → %s / %s\n", label, p.Code, p.Type)
		}
		fmt.Println()
	}

	add, err := promptConfirm("Add a project mapping from AFAS")
	if err != nil {
		return err
	}
	if !add {
		return nil
	}

	if cfg.AfasAccount == "" || afasToken == "" {
		fmt.Println("AFAS credentials not configured; skipping project setup.")
		return nil
	}

	fmt.Println("Connecting to AFAS...")
	ac := afas.NewClient(cfg.AfasAccount, afasToken)

	projects, err := ac.ListProjects(ctx)
	if err != nil {
		return fmt.Errorf("fetching AFAS projects: %w", err)
	}
	if len(projects) == 0 {
		fmt.Println("No projects found in AFAS.")
		return nil
	}
	fmt.Printf("Found %d projects\n", len(projects))

	projectTypes, err := ac.ListProjectTypes(ctx)
	if err != nil {
		return fmt.Errorf("fetching AFAS project types: %w", err)
	}
	if len(projectTypes) == 0 {
		fmt.Println("No project types found in AFAS.")
		return nil
	}
	fmt.Printf("Found %d project types\n\n", len(projectTypes))

	if cfg.Projects == nil {
		cfg.Projects = make(map[string]localconfig.Project)
	}

	for {
		p, err := selectProject(projects)
		if err != nil {
			return err
		}

		filtered := filterProjectTypes(projectTypes, p.Group)
		if len(filtered) == 0 {
			filtered = projectTypes
		}

		pt, err := selectProjectType(filtered)
		if err != nil {
			return err
		}

		label, err := promptString("Label for this mapping", p.Name, nil)
		if err != nil {
			return err
		}

		if existing, exists := cfg.Projects[label]; exists {
			overwrite, err := promptConfirm(fmt.Sprintf("Label %q already exists (%s / %s); overwrite", label, existing.Code, existing.Type))
			if err != nil {
				return err
			}
			if !overwrite {
				fmt.Printf("Skipped: %q unchanged\n\n", label)
				continue
			}
		}

		cfg.Projects[label] = localconfig.Project{Code: p.ID, Type: pt.ItemCode}
		fmt.Printf("Added: %q → %s / %s\n\n", label, p.ID, pt.ItemCode)

		another, err := promptConfirm("Add another project mapping")
		if err != nil {
			return err
		}
		if !another {
			break
		}
	}
	return nil
}

// promptString shows a text prompt with an optional default value and validator.
func promptString(label, defaultVal string, validate promptui.ValidateFunc) (string, error) {
	p := promptui.Prompt{
		Label:    label,
		Default:  defaultVal,
		Validate: validate,
	}
	result, err := p.Run()
	if err != nil {
		return "", wrapPromptErr(err)
	}
	return result, nil
}

// promptMasked shows a masked text prompt (for secrets). When alreadySet is
// true the label is annotated to indicate that a blank response keeps the
// existing value.
func promptMasked(label string, alreadySet bool) (string, error) {
	if alreadySet {
		label += " (leave blank to keep existing)"
	}
	p := promptui.Prompt{
		Label: label,
		Mask:  '*',
	}
	result, err := p.Run()
	if err != nil {
		return "", wrapPromptErr(err)
	}
	return result, nil
}

// promptSelect shows an interactive selection list, pre-positioning the cursor
// on the current value if it appears in items.
func promptSelect(label string, items []string, current string) (string, error) {
	cursorPos := 0
	for i, item := range items {
		if item == current {
			cursorPos = i
		}
	}
	p := promptui.Select{
		Label:     label,
		Items:     items,
		CursorPos: cursorPos,
	}
	_, result, err := p.Run()
	if err != nil {
		return "", wrapPromptErr(err)
	}
	return result, nil
}

// promptConfirm shows a yes/no confirmation prompt. Returns false without an
// error when the user answers no (promptui.ErrAbort).
func promptConfirm(label string) (bool, error) {
	p := promptui.Prompt{
		Label:     label,
		IsConfirm: true,
	}
	if _, err := p.Run(); err != nil {
		if errors.Is(err, promptui.ErrAbort) {
			return false, nil
		}
		return false, wrapPromptErr(err)
	}
	return true, nil
}

// selectProject presents a searchable list of AFAS projects and returns the
// one the user selects.
func selectProject(projects []afas.Project) (afas.Project, error) {
	templates := &promptui.SelectTemplates{
		Active:   `▶ {{ .Name | cyan | bold }} ({{ .ID }})`,
		Inactive: `  {{ .Name | cyan }} ({{ .ID }})`,
		Selected: `{{ "✔" | green }} Project: {{ .Name | bold }}`,
		Details: `
  ID:    {{ .ID }}
  Group: {{ .Group }}`,
	}
	searcher := func(input string, index int) bool {
		p := projects[index]
		return containsFold(p.Name, input) || containsFold(p.ID, input)
	}
	sel := promptui.Select{
		Label:             "Select AFAS project",
		Items:             projects,
		Templates:         templates,
		Searcher:          searcher,
		StartInSearchMode: true,
		Size:              10,
	}
	idx, _, err := sel.Run()
	if err != nil {
		return afas.Project{}, wrapPromptErr(err)
	}
	return projects[idx], nil
}

// selectProjectType presents a searchable list of AFAS project types and
// returns the one the user selects.
func selectProjectType(types []afas.ProjectType) (afas.ProjectType, error) {
	templates := &promptui.SelectTemplates{
		Active:   `▶ {{ .Description | cyan | bold }}`,
		Inactive: `  {{ .Description | cyan }}`,
		Selected: `{{ "✔" | green }} Type: {{ .Description | bold }}`,
		Details:  `  Item code: {{ .ItemCode }}`,
	}
	searcher := func(input string, index int) bool {
		return containsFold(types[index].Description, input)
	}
	sel := promptui.Select{
		Label:             "Select project type",
		Items:             types,
		Templates:         templates,
		Searcher:          searcher,
		StartInSearchMode: true,
		Size:              10,
	}
	idx, _, err := sel.Run()
	if err != nil {
		return afas.ProjectType{}, wrapPromptErr(err)
	}
	return types[idx], nil
}

// filterProjectTypes returns the subset of types whose IntegrationGroup matches
// group. Returns all types unchanged when group is empty.
func filterProjectTypes(types []afas.ProjectType, group string) []afas.ProjectType {
	if group == "" {
		return types
	}
	var result []afas.ProjectType
	for _, t := range types {
		if t.IntegrationGroup == group {
			result = append(result, t)
		}
	}
	return result
}

// validateInt is a promptui validator that rejects non-numeric and
// non-positive values.
func validateInt(s string) error {
	n, err := strconv.ParseInt(s, 10, 64)
	if err != nil {
		return fmt.Errorf("must be a number")
	}
	if n <= 0 {
		return fmt.Errorf("must be a positive number")
	}
	return nil
}

// containsFold reports whether substr appears within s, ignoring case.
func containsFold(s, substr string) bool {
	return strings.Contains(strings.ToLower(s), strings.ToLower(substr))
}

// capitalize returns s with its first Unicode letter uppercased.
func capitalize(s string) string {
	if s == "" {
		return s
	}
	r, size := utf8.DecodeRuneInString(s)
	return string(unicode.ToUpper(r)) + s[size:]
}

// wrapPromptErr normalises promptui errors: ErrInterrupt is wrapped with a
// user-friendly message; all other errors are returned as-is.
func wrapPromptErr(err error) error {
	if errors.Is(err, promptui.ErrInterrupt) {
		return fmt.Errorf("interrupted: %w", err)
	}
	return err
}
