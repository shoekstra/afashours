package auth

import (
	"testing"
)

func TestNewOktaValidator_RequiresIssuer(t *testing.T) {
	_, err := NewOktaValidator(Config{Audience: "api://default", ClientID: "client123"})
	if err == nil {
		t.Fatal("expected error for empty issuer, got nil")
	}
}

func TestNewOktaValidator_RequiresAudience(t *testing.T) {
	_, err := NewOktaValidator(Config{Issuer: "https://example.okta.com/oauth2/default", ClientID: "client123"})
	if err == nil {
		t.Fatal("expected error for empty audience, got nil")
	}
}

func TestNewOktaValidator_RequiresClientID(t *testing.T) {
	_, err := NewOktaValidator(Config{Issuer: "https://example.okta.com/oauth2/default", Audience: "api://default"})
	if err == nil {
		t.Fatal("expected error for empty clientID, got nil")
	}
}

func TestNewOktaValidator_ValidConfig(t *testing.T) {
	_, err := NewOktaValidator(Config{
		Issuer:   "https://example.okta.com/oauth2/default",
		Audience: "api://default",
		ClientID: "client123",
	})
	if err != nil {
		t.Fatalf("unexpected error for valid config: %v", err)
	}
}
