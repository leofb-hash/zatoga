var version = 2.0.2;

const staticZatoga = "zatoga-app-v2";
const assets = [
  "/",
  "/app/",
  "/media/style.css",
  "/media/app.js",
  "/media/icon.png",
  "/favicon.ico",
  "/app/games/doodle-jump/",
  "/app/games/doodle-jump/background.png",
  "/app/games/doodle-jump/border.png",
  "/app/games/doodle-jump/image.png",
  "/app/games/doodle-jump/main.js",
  "/app/games/doodle-jump/prefixfree.min.js",
  "/app/games/doodle-jump/style.css",
  "/app/games/2048.html",
  "/app/games/chrome-dino.html"
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