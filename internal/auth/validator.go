package auth

import (
	"fmt"
	"strings"

	jwtverifier "github.com/okta/okta-jwt-verifier-golang"
)

// Claims holds the JWT claims used by the application.
type Claims struct {
	Subject        string
	EmployeeNumber string
}

// Validator validates a raw Bearer token and returns parsed claims.
// The interface exists so middleware tests can inject a stub without
// needing a live Okta endpoint.
type Validator interface {
	Validate(token string) (*Claims, error)
}

// Config holds the parameters needed to validate Okta-issued JWTs.
type Config struct {
	Issuer   string // e.g. https://your-org.okta.com/oauth2/default
	Audience string // e.g. api://default
	ClientID string // Okta application client ID
}

// OktaValidator validates JWTs issued by Okta using OIDC discovery and JWKS.
type OktaValidator struct {
	verifier *jwtverifier.JwtVerifier
}

// NewOktaValidator creates an OktaValidator from cfg.
// Returns an error if any required field is empty.
func NewOktaValidator(cfg Config) (*OktaValidator, error) {
	issuer := strings.TrimSpace(cfg.Issuer)
	audience := strings.TrimSpace(cfg.Audience)
	clientID := strings.TrimSpace(cfg.ClientID)

	if issuer == "" {
		return nil, fmt.Errorf("auth: issuer must not be empty")
	}
	if audience == "" {
		return nil, fmt.Errorf("auth: audience must not be empty")
	}
	if clientID == "" {
		return nil, fmt.Errorf("auth: clientID must not be empty")
	}

	v := &jwtverifier.JwtVerifier{
		Issuer: issuer,
		ClaimsToValidate: map[string]string{
			"aud": audience,
			"cid": clientID,
		},
	}
	return &OktaValidator{verifier: v.New()}, nil
}

// Validate verifies the token's signature, expiry, issuer, audience, and
// client ID, then extracts the subject and employeeNumber claims.
func (v *OktaValidator) Validate(token string) (*Claims, error) {
	jwt, err := v.verifier.VerifyAccessToken(token)
	if err != nil {
		return nil, fmt.Errorf("invalid token: %w", err)
	}

	sub, _ := jwt.Claims["sub"].(string)
	if sub == "" {
		return nil, fmt.Errorf("token missing sub claim")
	}

	employeeNumber, _ := jwt.Claims["employeeNumber"].(string)
	if employeeNumber == "" {
		return nil, fmt.Errorf("token missing employeeNumber claim — ensure the Okta Authorization Server includes this profile attribute as an access token claim")
	}

	return &Claims{
		Subject:        sub,
		EmployeeNumber: employeeNumber,
	}, nil
}
