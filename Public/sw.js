// Service Worker v2 — lädt Bilder/Icons/Manifest immer frisch, kein Abfangen
const CACHE = "moresync-v2";

self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  // Alte Caches löschen, damit nichts Altes hängenbleibt
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);

  // Bilder, Icons, Manifest NIEMALS abfangen — immer frisch aus dem Netz
  if (
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith("manifest.json")
  ) {
    return; // Browser holt die Datei normal — Service Worker mischt sich nicht ein
  }

  // Für den Rest: erst Netz, bei Offline der Cache
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
