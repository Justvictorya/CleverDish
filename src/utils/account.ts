import { storageKey } from './storage';

/**
 * One-tap accounts.
 *
 * CleverDish is local-first: the meal plan, logs and favourites live in the
 * browser. An account exists for exactly one reason — a real, verified email
 * so the founder can count sign-ups and tell early users when the app moves to
 * its permanent domain. There is no password and no form: the browser already
 * knows who the user is, they tap once, and Google hands back a verified email.
 *
 * Everything here degrades quietly. If `VITE_GOOGLE_CLIENT_ID` is not set (or
 * the Google script cannot load) the account UI simply does not render and the
 * app keeps working anonymously, exactly as before.
 */

export interface AccountUser {
  provider: 'google';
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

const ACCOUNT_KEY = storageKey('account');
const GIS_SRC = 'https://accounts.google.com/gsi/client';

/** Public OAuth client id. Safe to ship — it identifies the app, not a secret. */
export const GOOGLE_CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined)?.trim() || '';

/** True when one-tap sign-in has been configured for this build. */
export function accountAvailable(): boolean {
  return GOOGLE_CLIENT_ID.length > 0;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
  }
}

let scriptPromise: Promise<void> | null = null;

/** Load Google Identity Services once; resolves immediately on later calls. */
export function loadGoogleScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No browser'));
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GIS_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Google script failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Google script failed'));
    document.head.appendChild(script);
  }).catch((err) => {
    // Let a later attempt retry instead of caching the failure forever.
    scriptPromise = null;
    throw err;
  });

  return scriptPromise;
}

function decodeBase64Url(value: string): string {
  const b64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), '=');
  const bytes = Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** Read the fields we need out of a Google ID token (a signed JWT). */
export function decodeGoogleCredential(credential: string): AccountUser {
  const payload = credential.split('.')[1];
  if (!payload) throw new Error('Malformed Google credential');
  const claims = JSON.parse(decodeBase64Url(payload)) as {
    sub?: string;
    email?: string;
    email_verified?: boolean | string;
    name?: string;
    picture?: string;
  };

  if (!claims.sub || !claims.email) throw new Error('Google credential is missing an email');
  if (claims.email_verified === false || claims.email_verified === 'false') {
    throw new Error('Google email is not verified');
  }

  return {
    provider: 'google',
    sub: claims.sub,
    email: claims.email,
    name: claims.name || claims.email.split('@')[0],
    picture: claims.picture
  };
}

/** The signed-in account on this device, if any. */
export function getAccount(): AccountUser | null {
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AccountUser;
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

export function saveAccount(user: AccountUser): void {
  try {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(user));
  } catch {
    /* private mode / quota — the session still works, it just won't persist */
  }
}

export function clearAccount(): void {
  try {
    localStorage.removeItem(ACCOUNT_KEY);
  } catch {
    /* nothing to do */
  }
}

/**
 * Record the sign-up in the free Cloudflare D1 ledger (see functions/api/signup.ts).
 * Fire-and-forget: a missing backend must never block the user from entering.
 */
export function reportSignup(credential: string): void {
  try {
    void fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
      keepalive: true
    }).catch(() => { /* static preview, offline, or no function deployed */ });
  } catch {
    /* nothing to do */
  }
}

/** How many people have signed up, when the ledger is available. */
export async function fetchSignupCount(): Promise<number | null> {
  try {
    const res = await fetch('/api/signup');
    if (!res.ok) return null;
    const data = (await res.json()) as { count?: number };
    return typeof data.count === 'number' ? data.count : null;
  } catch {
    return null;
  }
}
