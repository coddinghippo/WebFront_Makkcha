// import firebase scripts inside service worker js script

// Service Worker

// Cache name
const makchaCache = "cache_v1.0.1";

// Static assets to cache on install
const staticCache = [];

// SW install and cache static assets
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(makchaCache).then(cache => cache.addAll(staticCache))
  );
});

// SW Activate and cache cleanup
self.addEventListener("activate", e => {
  let cacheCleaned = caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== makchaCache) return caches.delete(key);
    });
  });
  e.waitUntil(cacheCleaned);
});

// SW fetch handler
self.addEventListener("fetch", e => {
  // Cache with Network Fallback
  let res = caches.match(e.request).then(res => {
    // Check cache has response
    if (res) return res;

    // Fallback to Network
    return fetch(e.request).then(fetchRes => {
      // Cache fetched response
      caches.open(makchaCache).then(cache => cache.put(e.request, fetchRes));

      // Return clone of fethced response
      return fetchRes.clone();
    });
  });

  // Respond
  e.respondWith(res);
});
