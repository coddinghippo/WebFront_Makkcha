// import firebase scripts inside service worker js script
importScripts("https://www.gstatic.com/firebasejs/5.7.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.7.2/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "5357966708"
});

const messaging = firebase.messaging();
// Service Worker

// Cache name
const makchaCache = "cache_v1.0.5";

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

self.addEventListener("notificationclick", event => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});

self.addEventListener("load", async () => {
  const registration = await navigator.serviceWorker.register("/sw.js", {
    updateViaCache: "none"
  });
  messaging.useServiceWorker(registration);
  messaging.onMessage(payload => {
    const title = payload.notification.title;
    const options = {
      body: payload.notification.body,
      icon: payload.notification.icon,
      actions: [
        {
          action: payload.fcmOptions.link,
          title: "Book Appointment"
        }
      ]
    };
    registration.showNotification(title, options);
  });
});

// self.addEventListener("push", event => {
//   console.log(loc);
//   e.waitUntil(loc);
// });
