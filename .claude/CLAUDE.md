# afashours

Multi-user web application that syncs time entries from external time tracking tools (Toggl Track first, others later) to AFAS using the Hours API. Users authenticate via Okta SSO.

## Architecture overview

See `ARCHITECTURE.md` for full design decisions and rationale.

## Tech stack

- **Binary**: Single Go binary (`afashours`) with subcommands — `serve`, `sync`, `init`
- **Backend**: Go + Gin
- **Frontend**: Vue 3 + `@okta/okta-vue`
- **Auth**: Okta OIDC, frontend-driven JWT flow; Go validates JWT via Okta JWKS endpoint
- **Storage**: SQLite (dev / small deploy) or PostgreSQL (production), switchable via storage interface
- **Time sources**: `TimeSource` interface; Toggl is the first implementation

## Git workflow

- Never commit directly to `main`; always create a branch first
- Branch naming: `<type>/<short-description>` (e.g. `feat/add-thing`, `fix/broken-thing`)
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, etc.
- Sign and GPG-sign all commits: `git commit -s -S`
- When squashing, use `git rebase -i`; the user will force-push the branch themselves afterwards
- After each commit, the user pushes and opens a PR — wait for CodeRabbit review findings before making further changes
- For CodeRabbit review fixes: amend the existing commit rather than adding new fix commits, unless explicitly asked otherwise

## Development commands

- `task serve` — start the API server locally
- `task build` — build the binary
- `task test` — run tests with race detector
- `task fmt` — format Go code
- `task vet` — run go vet
- `task web:dev` — start the Vue dev server
- `task web:build` — build the frontend for production

## Key design principles

- **`TimeSource` interface** — all time tracking providers implement this; sync logic must not be coupled to Toggl directly
- **`Storage` interface** — all storage operations go through this; no raw SQL outside `internal/storage/`
- **Employee number is Okta-owned** — read from JWT claims at request time, stored in DB for caching only, never user-editable, never exposed via API response
- **AFAS credentials are server secrets** — `AFAS_TOKEN` and `AFAS_ACCOUNT` come from environment variables; not stored in the DB, not accessible via API by regular users
- **Toggl tokens are user secrets** — stored encrypted (AES-256, key from env) in the DB
- **No login page** — unauthenticated users are immediately redirected to Okta; IdP-initiated SSO (Okta dashboard tile) must work seamlessly with no extra click
- **Admin role** — certain routes (e.g. `PATCH /api/v1/admin/config`) are protected by an Okta group claim; regular users cannot access them

## Code style

- Standard Go conventions; run `gofmt` before committing
- Follow service-oriented client patterns established in `github.com/shoekstra/go-toggl`
- Do not change API behaviour, flags, or output format unless explicitly requested
- Do not add features or refactor beyond what is asked
