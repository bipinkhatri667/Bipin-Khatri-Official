const CACHE_NAME = "bipin-pwa-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./portfolio-details.html",
  "./offline.html",
  "./assets/css/style.css",
  "./assets/js/main.js",
  "./assets/vendor/bootstrap/css/bootstrap.min.css",
  "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
  "./assets/img/favicon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", event => {

  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match("./offline.html"))
  );
});