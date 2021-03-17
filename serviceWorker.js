var version = 2.1;

const staticClark = "clark-app-v2";
const assets = [
  "/",
  "/app.html",
  "/media/style.css",
  "/media/app.js",
  "/media/icon.png",
  "/favicon.ico",
  "/games/doodle-jump/",
  "/games/doodle-jump/background.png",
  "/games/doodle-jump/border.png",
  "/games/doodle-jump/image.png",
  "/games/doodle-jump/main.js",
  "/games/doodle-jump/prefixfree.min.js",
  "/games/doodle-jump/style.css",
  "/games/2048.html",
  "/games/chrome-dino.html"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticClark).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});