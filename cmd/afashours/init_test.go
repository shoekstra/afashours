package main

import (
	"errors"
	"strings"
	"testing"

	"github.com/manifoldco/promptui"

	"github.com/shoekstra/afashours/internal/afas"
)

// --- filterProjectTypes ---

func TestFilterProjectTypes_EmptyGroupReturnsAll(t *testing.T) {
	types := []afas.ProjectType{
		{Description: "A", IntegrationGroup: "G1"},
		{Description: "B", IntegrationGroup: "G2"},
	}
	got := filterProjectTypes(types, "")
	if len(got) != 2 {
		t.Errorf("len = %d, want 2", len(got))
	}
}

func TestFilterProjectTypes_FiltersByIntegrationGroup(t *testing.T) {
	types := []afas.ProjectType{
		{Description: "A", IntegrationGroup: "G1"},
		{Description: "B", IntegrationGroup: "G2"},
		{Description: "C", IntegrationGroup: "G1"},
	}
	got := filterProjectTypes(types, "G1")
	if len(got) != 2 {
		t.Fatalf("len = %d, want 2", len(got))
	}
	for _, pt := range got {
		if pt.IntegrationGroup != "G1" {
			t.Errorf("IntegrationGroup = %q, want G1", pt.IntegrationGroup)
		}
	}
}

func TestFilterProjectTypes_NoMatchReturnsEmpty(t *testing.T) {
	types := []afas.ProjectType{
		{Description: "A", IntegrationGroup: "G1"},
	}
	got := filterProjectTypes(types, "G2")
	if len(got) != 0 {
		t.Errorf("len = %d, want 0", len(got))
	}
}

// --- capitalize ---

func TestCapitalize(t *testing.T) {
	tests := []struct {
		in   string
		want string
	}{
		{"toggl", "Toggl"},
		{"Toggl", "Toggl"},
		{"", ""},
		{"a", "A"},
		{"hello world", "Hello world"},
	}
	for _, tc := range tests {
		if got := capitalize(tc.in); got != tc.want {
			t.Errorf("capitalize(%q) = %q, want %q", tc.in, got, tc.want)
		}
	}
}

// --- containsFold ---

func TestContainsFold(t *testing.T) {
	tests := []struct {
		s      string
		substr string
		want   bool
	}{
		{"Hello World", "world", true},
		{"Hello World", "HELLO", true},
		{"Hello World", "xyz", false},
		{"", "", true},
		{"abc", "", true},
	}
	for _, tc := range tests {
		if got := containsFold(tc.s, tc.substr); got != tc.want {
			t.Errorf("containsFold(%q, %q) = %v, want %v", tc.s, tc.substr, got, tc.want)
		}
	}
}

// --- validateInt ---

func TestValidateInt(t *testing.T) {
	tests := []struct {
		input   string
		wantErr bool
	}{
		{"123456", false},
		{"1", false},
		{"0", true},
		{"-1", true},
		{"abc", true},
		{"", true},
		{"1.5", true},
	}
	for _, tc := range tests {
		err := validateInt(tc.input)
		if (err != nil) != tc.wantErr {
			t.Errorf("validateInt(%q): err = %v, wantErr = %v", tc.input, err, tc.wantErr)
		}
	}
}

// --- wrapPromptErr ---

func TestWrapPromptErr_InterruptWraps(t *testing.T) {
	err := wrapPromptErr(promptui.ErrInterrupt)
	if err == nil {
		t.Fatal("expected error, got nil")
	}
	if !strings.Contains(err.Error(), "interrupted") {
		t.Errorf("error = %q, want it to contain \"interrupted\"", err.Error())
	}
	if !errors.Is(err, promptui.ErrInterrupt) {
		t.Error("errors.Is(err, promptui.ErrInterrupt) = false, want true")
	}
}

func TestWrapPromptErr_OtherErrorPassesThrough(t *testing.T) {
	sentinel := errors.New("some other error")
	got := wrapPromptErr(sentinel)
	if got != sentinel {
		t.Errorf("got %v, want original sentinel error", got)
	}
}

// --- resolveConfigPath ---

func TestResolveConfigPath_ExplicitPath(t *testing.T) {
	got, err := resolveConfigPath("/tmp/my-config.yaml")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != "/tmp/my-config.yaml" {
		t.Errorf("got %q, want %q", got, "/tmp/my-config.yaml")
	}
}

func TestResolveConfigPath_DefaultPath(t *testing.T) {
	got, err := resolveConfigPath("")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !strings.HasSuffix(got, "afashours/config.yaml") {
		t.Errorf("got %q, want suffix %q", got, "afashours/config.yaml")
	}
}
