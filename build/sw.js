// Service Worker

// Cache name
const makchaCache = "cache_v1.0.0";

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
    // Check valid SW
    const contentType = res.headers.get("content-type");
    if (
      res.status === 404 ||
      (contentType != null && contentType.indexOf("javascript") === -1)
    ) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl, config);
    }

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

self.addEventListener("push", function(event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Push Codelab";
  const options = {
    body: "Yay it works.",
    icon: "images/icon.png",
    badge: "images/badge.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
