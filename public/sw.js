const cacheName = 'nmSW';
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/js/script.js',
                '/assets/manifest.json',
                '/img/abhilash.jpg',
                '/img/alejandro.jpg',
                '/img/andreas.jpg',
                '/img/anjani.jpg',
                '/img/annie.jpg',
                '/img/jeny.jpg',
                '/img/jon.jpg',
                '/img/kamala.jpg',
                '/img/marc.jpg',
                '/img/mike.jpg',
                '/img/nira-marc_hero-l.jpg',
                '/img/nira-marc_hero-m.jpg',
                '/img/nira-marc_hero-s.jpg',
                '/img/nira.jpg',
                '/img/joana.jpg',
                '/img/sneha.jpg',
                '/img/venue-1-l.jpg',
                '/img/venue-1-m.jpg',
                '/img/venue-1-s.jpg',
                '/img/venue-2-l.jpg',
                '/img/venue-2-m.jpg',
                '/img/venue-2-s.jpg',
                '/img/venue-3-l.jpg',
                '/img/venue-3-m.jpg',
                '/img/venue-3-s.jpg',
                '/img/venue-4-l.jpg',
                '/img/venue-4-m.jpg',
                '/img/venue-4-s.jpg',
                '/img/vicky.jpg',
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});