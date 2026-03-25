# afashours

Multi-user web application that syncs time entries from Toggl Track to AFAS using the Hours API. Users authenticate via Okta SSO.

## Prerequisites

### Okta

You need an Okta organisation to handle authentication. For development, sign up for a free Okta developer account:

1. Go to https://developer.okta.com/signup/
2. Choose the **"Best for Developers"** option (the Integrator Free Plan)
3. Once your org is provisioned, create an OIDC application for afashours

### AFAS

You need an AFAS account with an API token that has access to the Hours connector (`PtRealization`). Contact your AFAS administrator to obtain one.

### Toggl

Each user will need their own Toggl API token. Tokens can be found in the Toggl Track profile settings at https://track.toggl.com/profile.

## Getting started

> 🚧 Work in progress — setup instructions will be added as the project takes shape.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for design decisions, API routes, and directory structure.
