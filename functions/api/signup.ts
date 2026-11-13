/**
 * Cloudflare Pages Function — the sign-up ledger.
 *
 * The app itself is a static bundle, so there is nowhere on disk to keep an
 * email. This endpoint takes the Google ID token from the one-tap button,
 * verifies it with Google, and upserts the verified email into D1. That is the
 * whole backend: one row per person, so "did 20 people show up?" has an answer.
 *
 * Bindings / variables (set in the Pages project):
 *   DB                 → D1 database (schema in db/signup.sql)
 *   GOOGLE_CLIENT_ID   → same public client id used by VITE_GOOGLE_CLIENT_ID
 *
 * With no binding it still answers 200 with `stored: false`; the frontend never
 * blocks on this, so a static-only preview keeps working.
 */

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  run(): Promise<{ success?: boolean }>;
  first<T = unknown>(): Promise<T | null>;
}

interface D1Like {
  prepare(query: string): D1Statement;
}

interface Env {
  DB?: D1Like;
  GOOGLE_CLIENT_ID?: string;
}

interface TokenInfo {
  aud?: string;
  sub?: string;
  email?: string;
  email_verified?: string | boolean;
  name?: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}

async function verifyGoogleToken(credential: string): Promise<TokenInfo | null> {
  try {
    const res = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
    );
    if (!res.ok) return null;
    return (await res.json()) as TokenInfo;
  } catch {
    return null;
  }
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  let credential = '';
  try {
    const body = (await request.json()) as { credential?: unknown };
    credential = typeof body.credential === 'string' ? body.credential : '';
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  if (!credential || credential.length > 4096) {
    return json({ ok: false, error: 'missing_credential' }, 400);
  }

  const claims = await verifyGoogleToken(credential);
  if (!claims?.sub || !claims.email) {
    return json({ ok: false, error: 'invalid_token' }, 401);
  }

  if (claims.email_verified === false || claims.email_verified === 'false') {
    return json({ ok: false, error: 'email_unverified' }, 401);
  }

  // When the audience is configured, reject tokens minted for another app.
  if (env.GOOGLE_CLIENT_ID && claims.aud !== env.GOOGLE_CLIENT_ID) {
    return json({ ok: false, error: 'wrong_audience' }, 401);
  }

  if (!env.DB) {
    // No ledger bound yet — accept quietly so the app still gets the user in.
    return json({ ok: true, stored: false });
  }

  const now = new Date().toISOString();
  try {
    await env.DB.prepare(
      `INSERT INTO signups (sub, email, name, provider, first_seen_at, last_seen_at)
       VALUES (?, ?, ?, 'google', ?, ?)
       ON CONFLICT(sub) DO UPDATE SET
         email = excluded.email,
         name = excluded.name,
         last_seen_at = excluded.last_seen_at`
    )
      .bind(claims.sub, claims.email, claims.name || '', now, now)
      .run();
  } catch (err) {
    // A missing table is a setup problem, not a user problem.
    console.error('[signup] insert failed', err);
    return json({ ok: true, stored: false });
  }

  return json({ ok: true, stored: true });
}

export async function onRequestGet(context: { env: Env }): Promise<Response> {
  const { env } = context;
  if (!env.DB) return json({ ok: true, count: null, stored: false });

  try {
    const row = await env.DB.prepare('SELECT COUNT(*) AS count FROM signups').first<{ count: number }>();
    return json({ ok: true, count: row?.count ?? 0, stored: true });
  } catch (err) {
    console.error('[signup] count failed', err);
    return json({ ok: true, count: null, stored: false });
  }
}
