// CleverDish service worker — app-shell caching for PWA installability & offline resilience.
const SHELL = '/';
const STATIC_CACHE = 'cleverdish-shell-v1';
const ASSET_CACHE = 'cleverdish-assets-v1';

// Bumped whenever the caching strategy changes so old caches are dropped.
// v4 drops the v3 asset cache. It held the previous bundle, whose resolver only
// knew eight photographs, so returning users would have kept being served the
// old mapping and the five new soup photographs would never appear.
// v5 does the same for the rotation fix: the asset cache still holds the bundle
// that walked the pool past the researched soups, and serving it would keep a
// returning user's month on the old, narrower plan.
const CACHE_VERSION = 'v5';
const CURRENT_ASSET_CACHE = `${ASSET_CACHE}-${CACHE_VERSION}`;
const MAX_CACHED_ASSETS = 60;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll([SHELL])).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== STATIC_CACHE && k !== CURRENT_ASSET_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Keep the asset cache from growing without bound across deploys.
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  // Oldest first — Cache API preserves insertion order.
  const excess = keys.length - maxEntries;
  for (const key of keys.slice(0, excess)) {
    await cache.delete(key);
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never cache API or user data calls.
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/data/')) {
    return;
  }

  // App shell (document navigation): network-first, fall back to cached shell.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(SHELL, copy));
          return res;
        })
        .catch(() => caches.match(SHELL))
    );
    return;
  }

  // Static hashed assets: cache-first with background update.
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CURRENT_ASSET_CACHE).then(async (cache) => {
              await cache.put(event.request, copy);
              await trimCache(CURRENT_ASSET_CACHE, MAX_CACHED_ASSETS);
            });
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// ---------------- Meal-time reminders ----------------
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data ? event.data.text() : '' };
  }

  const title = payload.title || 'CleverDish';
  const options = {
    body: payload.body || 'Time to eat.',
    tag: payload.tag || 'cleverdish-reminder',
    icon: '/manifest-icon-192.png',
    badge: '/manifest-icon-192.png',
    renotify: false,
    requireInteraction: false,
    vibrate: [120, 60, 120],
    data: { url: payload.url || '/?tab=today' },
    actions: [
      { action: 'open', title: "View today's plate" },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;

  const target = new URL(event.notification.data?.url || '/?tab=today', self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Focus an existing tab so the user doesn't get a duplicate window.
      for (const client of clientList) {
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          client.navigate(target);
          return client.focus();
        }
      }
      return self.clients.openWindow(target);
    })
  );
});