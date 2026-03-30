// API_BASE is the relative path prefix for all backend API calls. This works
// when the SPA and API are served from the same origin (the default: the Go
// binary serves both). For separate-origin deployments (e.g. SPA on a CDN),
// configure a reverse proxy to forward /api/* to the Go backend, or replace
// this with a full origin URL supplied via a build-time env var.
export const API_BASE = '/api/v1'

// apiFetch is a thin wrapper around fetch that injects the Okta access token.
// oktaAuth must be the OktaAuth instance from useAuth() in the calling component.
export async function apiFetch(oktaAuth, path, options = {}) {
  const token = await oktaAuth.getAccessToken()
  if (!token) {
    throw new Error('No access token — user not authenticated')
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  }
  // Only set Content-Type for requests that carry a body.
  if (options.body !== undefined) {
    headers['Content-Type'] = headers['Content-Type'] ?? 'application/json'
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `HTTP ${res.status}`)
  }
  return res
}
