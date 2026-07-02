const CACHE_NAME = 'space-explorer-v1';
const PRECACHE_URLS = [
  './',
  'index.html',
  'manifest.json'
];

// Three.js and addons — loaded via importmap at runtime
const RUNTIME_IMPORTMAP_URLS = [
  'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js',
  'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/renderers/CSS2DRenderer.js',
  'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/renderers/CSS2DObject.js'
];

// Texture base URL — individual textures loaded dynamically
const TEX_BASE = 'https://cdn.jsdelivr.net/gh/jeromeetienne/threex.planets@master/images/';

const TEX_FILES = [
  'sunmap.jpg', 'mercurymap.jpg', 'mercurybump.jpg', 'venusmap.jpg', 'venusbump.jpg',
  'earthmap1k.jpg', 'earthbump1k.jpg', 'earthspec1k.jpg', 'earthcloudmap.jpg',
  'moonmap1k.jpg', 'moonbump1k.jpg', 'marsmap1k.jpg', 'marsbump1k.jpg',
  'jupitermap.jpg', 'saturnmap.jpg', 'saturnringcolor.jpg', 'saturnringpattern.gif',
  'uranusmap.jpg', 'uranusringcolour.jpg', 'uranusringtrans.gif',
  'neptunemap.jpg', 'plutomap1k.jpg', 'plutobump1k.jpg', 'galaxy_starfield.png'
];

const RUNTIME_TEXTURE_URLS = TEX_FILES.map(f => TEX_BASE + f);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // App shell must cache for install to succeed.
      return cache.addAll(PRECACHE_URLS).then(() => {
        // CDN assets are best-effort: a hiccup here must not abort install.
        return cache.addAll(RUNTIME_IMPORTMAP_URLS).catch(() => {});
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Cache-first for our own files
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request);
      })
    );
    return;
  }

  // For CDN resources (Three.js, textures): network-first with cache fallback
  if (url.origin === 'https://cdn.jsdelivr.net') {
    event.respondWith(
      fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Everything else: network
  event.respondWith(fetch(event.request));
});
