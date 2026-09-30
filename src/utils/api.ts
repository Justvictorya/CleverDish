// Thin authed fetch wrapper: registers this device with the backend once,
// caches the bearer token locally, and attaches it to protected API calls.
const TOKEN_KEY = 'cleverdish_auth_token';

let authRequest: Promise<string> | null = null;

async function fetchToken(userId: string): Promise<string> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to authenticate device.');
  }
  localStorage.setItem(TOKEN_KEY, data.token);
  return data.token;
}

export async function getAuthToken(userId: string): Promise<string> {
  const cached = localStorage.getItem(TOKEN_KEY);
  if (cached) return cached;

  if (!authRequest) {
    authRequest = fetchToken(userId).finally(() => {
      authRequest = null;
    });
  }
  return authRequest;
}

export async function apiFetch(
  userId: string,
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken(userId);
  const headers = new Headers(init.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  return fetch(path, { ...init, headers });
}