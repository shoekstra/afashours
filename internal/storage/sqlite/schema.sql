CREATE TABLE IF NOT EXISTS users (
    subject         TEXT PRIMARY KEY,
    toggl_token_enc TEXT,
    projects_json   TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS jobs (
    id           TEXT PRIMARY KEY,
    subject      TEXT NOT NULL,
    status       TEXT NOT NULL DEFAULT 'pending',
    month        TEXT NOT NULL,
    started_at   TEXT NOT NULL,
    ended_at     TEXT,
    summary_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_jobs_subject ON jobs (subject);
