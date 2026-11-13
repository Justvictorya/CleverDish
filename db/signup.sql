-- CleverDish sign-up ledger (Cloudflare D1).
-- One row per person who taps "Continue with Google".
--
-- Apply it once, after creating the database:
--   npx wrangler d1 execute cleverdish-signups --remote --file=db/signup.sql
--
-- `sub` is Google's stable account id, so signing in twice never double-counts.

CREATE TABLE IF NOT EXISTS signups (
  sub           TEXT PRIMARY KEY,
  email         TEXT NOT NULL,
  name          TEXT,
  provider      TEXT NOT NULL DEFAULT 'google',
  first_seen_at TEXT NOT NULL,
  last_seen_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_signups_email ON signups (email);
