# afashours

Multi-user web application that syncs time entries from Toggl Track to AFAS using the Hours API. Users authenticate via Okta SSO.

## Prerequisites

### Okta

You need an Okta organisation to handle authentication. For development, sign up for a free Okta developer account:

1. Go to https://developer.okta.com/signup/
2. Choose the **"Best for Developers"** option (the Integrator Free Plan)
3. Once your org is provisioned, create an OIDC application for afashours (type: Single-Page Application)
   - Sign-in redirect URI: `http://localhost:8080/login/callback` (add your production URL when deploying)
   - Sign-out redirect URI: `http://localhost:8080`
   - Allowed grant types: Authorization Code with PKCE

**Employee number claim (required)**

The backend reads an `employeeNumber` claim from every access token. You must configure this in Okta before any user can authenticate:

1. **Add the attribute to the user profile**: Admin Console → Directory → Profile Editor → User → Add Attribute
   - Data type: String, Variable name: `employeeNumber`, User permission: Read Only
   - Populate it for each user in Directory → People → (user) → Edit profile

2. **Add it as an access token claim**: Admin Console → Security → API → Authorization Servers → (your server) → Claims → Add Claim
   - Name: `employeeNumber`, Include in token type: Access Token, Value type: Expression, Value: `user.employeeNumber`

3. Verify using the Token Preview tab in the Authorization Server — the access token for a test user must include `"employeeNumber": "12345"`.

### AFAS

You need an AFAS account with an API token that has access to the Hours connector (`PtRealization`). Contact your AFAS administrator to obtain one.

### Toggl

Each user will need their own Toggl API token. Tokens can be found in the Toggl Track profile settings at https://track.toggl.com/profile.

## Getting started

### `afashours serve`

The `serve` subcommand starts the API server. All configuration is via environment variables.

**Required:**

| Variable | Description |
|---|---|
| `AFAS_ACCOUNT` | AFAS instance number (shared server secret) |
| `AFAS_TOKEN` | AFAS API token (shared server secret) |
| `OKTA_ISSUER` | Okta issuer URL (e.g. `https://your-org.okta.com/oauth2/default`) |
| `OKTA_AUDIENCE` | Expected JWT audience (e.g. `api://default`) |
| `OKTA_CLIENT_ID` | OIDC client ID for the afashours application |
| `STORAGE_ENCRYPTION_KEY` | At-rest encryption key for Toggl tokens (min 16 chars, use a high-entropy secret) |

**Optional:**

| Variable | Default | Description |
|---|---|---|
| `SQLITE_PATH` | `afashours.db` | Path to the SQLite database file |
| `CORS_ALLOWED_ORIGINS` | _(unset)_ | Comma-separated list of allowed CORS origins. Not needed in the default setup where the Go binary serves both the frontend and API from the same origin. Set this when the frontend is served from a separate domain (e.g. a CDN). Example: `CORS_ALLOWED_ORIGINS=https://app.example.com` |

Start the server:

```sh
afashours serve
# listens on :8080 by default; override with --addr
afashours serve --addr :9090
```

### `afashours init` and `afashours sync`

The `init` and `sync` subcommands use a local YAML config file (default: `~/.config/afashours/config.yaml`). Run `afashours init` to create or update it interactively.

**Config file:**

```yaml
afas_account: "123456"       # AFAS instance number
afas_token: "..."            # AFAS API token
employee_number: "42"        # Your AFAS employee number
source:
  type: toggl
  token: "..."               # Toggl Track API token
projects:
  My project:                # Label shown during sync
    code: PROJ001            # AFAS project code
    type: INTERNAL           # AFAS project type item code
```

**Environment variable overrides** (take precedence over the config file at runtime, never written to disk):

| Variable | Overrides |
|---|---|
| `AFAS_ACCOUNT` | `afas_account` |
| `AFAS_TOKEN` | `afas_token` |
| `TOGGL_TOKEN` | `source.token` |

Run a sync:

```sh
afashours sync                  # syncs the current month
afashours sync --month 2026-02  # syncs a specific month
afashours sync --dry-run        # shows what would be synced without making changes
```

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for design decisions, API routes, and directory structure.
