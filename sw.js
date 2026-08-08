/* Service Worker
   Grundsatz: Inhalte immer frisch aus dem Netz holen.
   Der Zwischenspeicher dient nur als Reserve, wenn kein Empfang da ist. */

const CACHE = 'mitterdorf-v2';
const SCHALE = ['./', './index.html', './daten.json', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SCHALE))
      .catch(() => {})            // fehlende Datei darf die Installation nicht verhindern
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

/* Netz zuerst, Zwischenspeicher als Reserve */
function netzZuerst(anfrage){
  return fetch(anfrage)
    .then(antwort => {
      const kopie = antwort.clone();
      caches.open(CACHE).then(c => c.put(anfrage, kopie)).catch(() => {});
      return antwort;
    })
    .catch(() => caches.match(anfrage).then(t => t || caches.match('./index.html')));
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  // Redaktionsoberflaeche nie zwischenspeichern
  if (url.pathname.endsWith('redaktion.html')) return;

  // Seitenaufrufe, HTML und Daten: immer zuerst das Netz fragen
  if (e.request.mode === 'navigate' ||
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('daten.json') ||
      url.pathname.endsWith('/')) {
    e.respondWith(netzZuerst(e.request));
    return;
  }

  // Symbole und unveraenderliche Dateien: Zwischenspeicher genuegt
  e.respondWith(
    caches.match(e.request).then(t => t || netzZuerst(e.request))
  );
});
