// Mes Quêtes — fonctionnement hors connexion
const CACHE = "mesquetes-2.0.0";
const FICHIERS = ["./", "index.html", "manifest.webmanifest", "icone-180.png", "icone-192.png", "icone-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const url = new URL(r.url);
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.open(CACHE).then(async c => {
      const deja = await c.match(r);
      const reseau = fetch(r).then(rep => { c.put(r, rep.clone()); return rep; }).catch(() => deja);
      return deja || reseau;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  if (r.mode === "navigate") {
    // page : réseau d'abord (mises à jour), cache si hors ligne
    e.respondWith(fetch(r).then(rep => { caches.open(CACHE).then(c => c.put("index.html", rep.clone())); return rep; })
      .catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(rep => { caches.open(CACHE).then(c => c.put(r, rep.clone())); return rep; })));
});
