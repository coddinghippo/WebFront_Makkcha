// Service Worker

// Cache name
const makchaCache = "makcha_v_0_0_1";

// Static assets to cache on install
const staticCache = ["/"];

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    // code here
    // SW install and cache static assets
    window.addEventListener("install", e => {
      e.waitUntil(
        caches.open(makchaCache).then(cache => cache.addAll(staticCache))
      );
    });

    // SW Activate and cache cleanup
    window.addEventListener("activate", e => {
      let cacheCleaned = caches.keys().then(keys => {
        keys.forEach(key => {
          if (key !== makchaCache) return caches.delete(key);
        });
      });
      e.waitUntil(cacheCleaned);
    });

    // SW fetch handler
    window.addEventListener("fetch", e => {
      // Cache with Network Fallback
      let res = caches.match(e.request).then(res => {
        // Check cache has response
        if (res) return res;

        // Fallback to Network
        return fetch(e.request).then(fetchRes => {
          // Cache fetched response
          caches
            .open(makchaCache)
            .then(cache => cache.put(e.request, fetchRes));

          // Return clone of fethced response
          return fetchRes.clone();
        });
      });

      // Respond
      e.respondWith(res);
    });
  }
}
