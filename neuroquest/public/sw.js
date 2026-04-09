const CACHE_NAME = 'neuroquest-v2';
const STATIC_ASSETS = [
  '/',
  '/home',
  '/map',
];

// On localhost (dev), immediately unregister this service worker
// so Next.js HMR works without stale bundle interference.
if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .then(() => self.registration.unregister())
    );
  });
} else {
  // Production: cache-first strategy with versioned cache
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
    );
    self.clients.claim();
  });

  self.addEventListener('fetch', (event) => {
    // Network first for API calls
    if (event.request.url.includes('/api/') || event.request.url.includes('supabase')) {
      return;
    }
    // Cache first for static assets
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok && event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
  });
}
