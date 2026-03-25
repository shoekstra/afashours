# Architecture

## What it does

afashours syncs time entries from external time tracking tools to the AFAS Hours API. Users log time in a tool like Toggl Track, then afashours fetches those entries, maps them to AFAS projects, and posts them. The source is treated as truth: for each day being synced, any existing AFAS entries are deleted and replaced.

## Why a web app

The original tool (`go-afashours`) was a local CLI with a personal config file. Moving to a multi-user web app solves a specific AFAS RBAC problem: tokens in AFAS are not scoped — a token can submit hours for any employee number. The AFAS team therefore issues very few tokens. By centralising the AFAS token in a backend service and deriving the employee number from the authenticated user's Okta profile (which users cannot edit), multiple users can safely share a single AFAS token with no risk of impersonation.

## Binary design

A single binary (`afashours`) with subcommands, following the HashiCorp pattern:

| Subcommand | Description |
|---|---|
| `afashours serve` | Start the API server and serve the Vue frontend |
| `afashours sync` | One-shot local sync (reads local config file, no server required) |
| `afashours init` | Interactive local setup wizard (reads/writes local config file) |

`sync` and `init` preserve the original CLI experience for users who prefer it. `serve` is the new entry point for the web app.

## Authentication

- **Provider**: Okta, via OIDC
- **Flow**: Frontend-driven. Vue 3 handles the Okta redirect using `@okta/okta-vue`. After login, Vue holds a JWT access token and sends it as `Authorization: Bearer <token>` with every API request.
- **Backend**: Gin validates the JWT against Okta's JWKS endpoint (stateless, no sessions).
- **IdP-initiated SSO**: Clicking the app tile in the Okta dashboard immediately authenticates the user. There is no login page in the app — unauthenticated navigation guards immediately redirect to Okta.
- **Employee number**: Stored as a claim in the Okta user profile. Read from the JWT at request time by the backend. Users cannot see or edit it. It is merged into sync requests automatically.

## Storage

Storage is abstracted behind a `Storage` interface (`internal/storage/repository.go`). The concrete implementation is selected at startup via configuration.

| Backend | When to use |
|---|---|
| SQLite | Local development, small single-instance deploys |
| PostgreSQL | Production k8s or managed cloud deployments |

SQLite with [Litestream](https://litestream.io) (continuous replication to S3) is the recommended low-cost production option.

What is stored:
- **User preferences**: project mappings (Toggl project name → AFAS project code + type), Toggl API token (encrypted)
- **Employee number cache**: read from Okta on first login, cached for display; authoritative value always comes from the JWT
- **Sync job history**: job ID, status, start/end time, result summary

What is NOT stored:
- AFAS token or account number (environment variables only)
- Passwords or Okta credentials (Okta owns those)

## Secrets

| Secret | Where it lives |
|---|---|
| `AFAS_TOKEN` | Environment variable / deployment secret |
| `AFAS_ACCOUNT` | Environment variable / deployment secret |
| `OKTA_CLIENT_ID` | Environment variable |
| `OKTA_ISSUER` | Environment variable |
| `STORAGE_ENCRYPTION_KEY` | Environment variable (used to encrypt Toggl tokens in DB) |
| User Toggl token | DB, encrypted with `STORAGE_ENCRYPTION_KEY` |

## Time sources

Time tracking providers implement the `TimeSource` interface (`internal/sync/source.go`). The sync engine depends only on this interface. Toggl Track is the first implementation.

```go
type TimeSource interface {
    GetTimeEntries(ctx context.Context, start, end time.Time) ([]*TimeEntry, error)
}
```

Adding a new source (Harvest, Clockify, etc.) requires only a new implementation of this interface; the sync engine and API are unchanged.

## API

Base path: `/api/v1`

### Public (no auth)
| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/metrics` | Prometheus metrics |

### Authenticated (valid Okta JWT required)
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/user/me` | Current user profile from JWT claims (read-only) |
| `GET` | `/api/v1/user/me/preferences` | User's stored preferences |
| `PATCH` | `/api/v1/user/me/preferences` | Update preferences (project mappings, Toggl token) |
| `POST` | `/api/v1/sync` | Start a sync job → returns `{ "job_id": "..." }` |
| `GET` | `/api/v1/sync/{jobID}` | Poll job status and result |

### Admin (Okta admin group claim required)
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/v1/admin/config` | View server-level config (account number visible, token masked) |
| `PATCH` | `/api/v1/admin/config` | Update server-level config |

## Sync flow

1. User `POST /api/v1/sync` with optional `{ "month": "2026-03" }` (defaults to current month)
2. Server creates a job record, returns `{ "job_id": "abc123" }`
3. Worker goroutine starts:
   a. Fetch user preferences from DB
   b. Fetch time entries from `TimeSource` (e.g. Toggl) for the date range
   c. Validate entries against project mappings
   d. For each day with valid entries: delete existing AFAS entries, insert new ones
   e. Update job record with status + summary
4. User polls `GET /api/v1/sync/abc123` for status

Job state is stored in the DB (persists across restarts).

## Directory structure

```
afashours/
├── api/
│   └── openapi.yaml        # OpenAPI spec (source of truth for routes and schemas)
├── cmd/
│   └── afashours/          # Single binary entry point
│       └── main.go
├── internal/
│   ├── api/
│   │   ├── handler/        # Gin route handlers
│   │   └── middleware/     # JWT auth, logging, CORS, etc.
│   ├── auth/               # Okta JWT validation (JWKS fetch + claims parsing)
│   ├── sync/               # Sync engine + TimeSource interface
│   ├── source/
│   │   └── toggl/          # Toggl TimeSource implementation
│   ├── afas/               # AFAS client (ported from go-afashours)
│   └── storage/
│       ├── repository.go   # Storage interface
│       └── sqlite/         # SQLite implementation
├── web/                    # Vue 3 frontend
│   └── src/
├── .claude/
│   └── CLAUDE.md
├── .github/
│   └── workflows/
├── ARCHITECTURE.md
├── Taskfile.yaml
├── go.mod
└── .gitignore
```

## Deployment

Designed to be deployable anywhere:
- **Local**: `afashours serve` with SQLite
- **Docker**: single container, SQLite + Litestream for persistence
- **Fly.io**: recommended low-cost cloud option (~$5/month)
- **k8s**: swap SQLite for PostgreSQL via environment config
- **AWS**: Lambda is awkward for a persistent server; ECS Fargate + RDS Aurora Serverless is a better fit if AWS is required

## Observability

- `GET /health` — liveness/readiness check (unauthenticated)
- `GET /metrics` — Prometheus metrics endpoint
- Structured logging (JSON) via `slog` (stdlib, Go 1.21+)
- Key metrics to expose: sync job count, sync duration, AFAS API errors, active users

## References

- [okta-go-gin-vue-example](https://github.com/oktadev/okta-go-gin-vue-example) — reference implementation for Okta + Gin + Vue pattern
- [go-toggl](https://github.com/shoekstra/go-toggl) — Toggl v9 API client (used as the Toggl TimeSource)
- [go-afashours](https://github.com/shoekstra/go-afashours) — original CLI this project replaces
- [Litestream](https://litestream.io) — SQLite replication for production deploys
