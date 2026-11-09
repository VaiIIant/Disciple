#!/usr/bin/env python3
"""Construit Mes Quêtes : app/ (version installable, hors ligne) et la page d'essai."""
import json, math, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ICI = Path(__file__).parent
css = (ICI / "src/style.css").read_text(encoding="utf-8")
js = (ICI / "src/contenu.js").read_text(encoding="utf-8") + "\n" + (ICI / "src/app.js").read_text(encoding="utf-8")
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' \
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600;700&display=swap">'
CORPS = '<main id="app" class="app"></main>\n<nav id="nav" class="nav" aria-label="Navigation principale"></nav>\n'
VERSION = "2.0.0"

def pwa():
    out = ICI / "app"
    out.mkdir(exist_ok=True)
    html = f"""<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Mes Quêtes</title>
<meta name="description" content="Quêtes quotidiennes façon jeu de rôle : apprendre, bouger, lire, prier… et monter de niveau.">
<meta name="theme-color" content="#12131C">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Quêtes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icone-192.png">
<link rel="apple-touch-icon" href="icone-180.png">
{FONTS}
<style>
{css}
:root {{ --sat: env(safe-area-inset-top, 0px); }}
</style>
</head>
<body>
{CORPS}<script>
{js}
</script>
</body>
</html>
"""
    (out / "index.html").write_text(html, encoding="utf-8")
    (out / "manifest.webmanifest").write_text(json.dumps({
        "name": "Mes Quêtes", "short_name": "Quêtes", "lang": "fr", "start_url": "./", "scope": "./", "display": "standalone",
        "orientation": "portrait", "background_color": "#12131C", "theme_color": "#12131C",
        "description": "Quêtes quotidiennes façon jeu de rôle.",
        "icons": [{"src": "icone-192.png", "sizes": "192x192", "type": "image/png"},
                  {"src": "icone-512.png", "sizes": "512x512", "type": "image/png"},
                  {"src": "icone-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]},
        ensure_ascii=False, indent=2), encoding="utf-8")
    (out / "sw.js").write_text(f"""// Mes Quêtes — fonctionnement hors connexion
const CACHE = "mesquetes-{VERSION}";
const FICHIERS = ["./", "index.html", "manifest.webmanifest", "icone-180.png", "icone-192.png", "icone-512.png"];
self.addEventListener("install", e => {{ e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting())); }});
self.addEventListener("activate", e => {{
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
}});
self.addEventListener("fetch", e => {{
  const r = e.request;
  if (r.method !== "GET") return;
  const url = new URL(r.url);
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {{
    e.respondWith(caches.open(CACHE).then(async c => {{
      const deja = await c.match(r);
      const reseau = fetch(r).then(rep => {{ c.put(r, rep.clone()); return rep; }}).catch(() => deja);
      return deja || reseau;
    }}));
    return;
  }}
  if (url.origin !== location.origin) return;
  if (r.mode === "navigate") {{
    // page : réseau d'abord (mises à jour), cache si hors ligne
    e.respondWith(fetch(r).then(rep => {{ caches.open(CACHE).then(c => c.put("index.html", rep.clone())); return rep; }})
      .catch(() => caches.match("index.html")));
    return;
  }}
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(rep => {{ caches.open(CACHE).then(c => c.put(r, rep.clone())); return rep; }})));
}});
""", encoding="utf-8")
    icones(out)
    return out

def icones(out):
    T = 1024
    img = Image.new("RGB", (T, T), (18, 19, 28))
    halo = Image.new("L", (T, T), 0)
    ImageDraw.Draw(halo).ellipse((T*0.12, T*0.08, T*0.88, T*0.84), fill=255)
    halo = halo.filter(ImageFilter.GaussianBlur(T * 0.12))
    img.paste(Image.new("RGB", (T, T), (52, 42, 86)), (0, 0), halo.point(lambda v: int(v * 0.85)))
    d = ImageDraw.Draw(img)
    # bouclier (même tracé que l'icône de l'app : M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z)
    s, ox, oy = T / 24 * 0.62, T * 0.5 - 12 * T / 24 * 0.62, T * 0.5 - 12.4 * T / 24 * 0.62
    def P(x, y): return (ox + x * s, oy + y * s)
    pts = [P(12, 3), P(4, 6), P(4, 12)]
    for i in range(1, 21):  # courbe gauche approximée
        t = i / 20
        x = (1-t)**3*4 + 3*(1-t)**2*t*4 + 3*(1-t)*t**2*7.5 + t**3*12
        y = (1-t)**3*12 + 3*(1-t)**2*t*17 + 3*(1-t)*t**2*20 + t**3*21
        pts.append(P(x, y))
    for i in range(1, 21):
        t = i / 20
        x = (1-t)**3*12 + 3*(1-t)**2*t*16.5 + 3*(1-t)*t**2*20 + t**3*20
        y = (1-t)**3*21 + 3*(1-t)**2*t*20 + 3*(1-t)*t**2*17 + t**3*12
        pts.append(P(x, y))
    pts += [P(20, 6), P(12, 3)]
    or_ = (227, 179, 76)
    d.polygon(pts, fill=(30, 31, 46))
    d.line(pts, fill=or_, width=int(T * 0.045), joint="curve")
    d.line([P(8.2, 12.2), P(11, 15), P(16, 9.4)], fill=or_, width=int(T * 0.055), joint="curve")
    for x, y in (P(8.2, 12.2), P(16, 9.4)):
        r = T * 0.0275
        d.ellipse((x - r, y - r, x + r, y + r), fill=or_)
    for taille, nom in ((512, "icone-512.png"), (192, "icone-192.png"), (180, "icone-180.png")):
        img.resize((taille, taille), Image.LANCZOS).save(out / nom, optimize=True)

def essai(chemin):
    page = f"""<title>Mes Quêtes</title>
<meta name="claude:viewport-fit-sides" content="cover">
{FONTS}
<style>
{css}
</style>
{CORPS}<script>
{js}
</script>
"""
    Path(chemin).write_text(page, encoding="utf-8")

if __name__ == "__main__":
    print("app :", pwa())
    if len(sys.argv) > 1:
        essai(sys.argv[1]); print("essai :", sys.argv[1])
