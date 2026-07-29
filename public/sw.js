// Self-destructing service worker
// This replaces the old caching SW to ensure it stops serving stale files
// When the browser loads this updated sw.js, it will:
// 1. Delete all caches
// 2. Unregister itself
// 3. Force all clients to reload

self.addEventListener('install', function(event) {
    console.log('[SW] Self-destruct SW installed — clearing caches');
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('[SW] Self-destruct SW activated — purging all caches');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    console.log('[SW] Deleting cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(function() {
            // Unregister this service worker
            return self.registration.unregister();
        }).then(function() {
            console.log('[SW] Service worker unregistered');
            // Tell all clients to reload
            return self.clients.matchAll();
        }).then(function(clients) {
            clients.forEach(function(client) {
                client.postMessage({ type: 'SW_DESTROYED' });
            });
        })
    );
});

// Don't cache anything — pass all requests straight through
self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
});
