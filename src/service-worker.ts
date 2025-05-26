/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [
    ...build,
    ...files
];

// Installation du service worker : pré-cache les assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(ASSETS))
    );
});

// Activation : supprime les anciens caches et prend le contrôle immédiat des clients
self.addEventListener('activate', event => {
    event.waitUntil(
        (async () => {
            for (const key of await caches.keys()) {
                if (key !== CACHE) {
                    await caches.delete(key);
                }
            }
            await self.clients.claim();
        })()
    );
});

// Intercepte les requêtes réseau
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    const isAPIRequest = url.pathname.startsWith('/api/');

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE);

            // 1. Sert les fichiers statiques depuis le cache
            if (ASSETS.includes(url.pathname)) {
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) return cachedResponse;
            }

            // 2. Gestion des API (cache-first, update background)
            if (isAPIRequest) {
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                    // Met à jour le cache en arrière-plan si possible
                    fetch(event.request).then(response => {
                        if (response.ok) cache.put(event.request, response.clone());
                    }).catch(() => { });
                    return cachedResponse;
                }
                try {
                    const response = await fetch(event.request);
                    if (response.ok) cache.put(event.request, response.clone());
                    return response;
                } catch {
                    return new Response('Données non disponibles hors ligne', { status: 504 });
                }
            }

            // 3. Pour le reste : stratégie réseau puis cache
            try {
                const response = await fetch(event.request);
                if (response.ok) cache.put(event.request, response.clone());
                return response;
            } catch {
                const cachedResponse = await cache.match(event.request);
                return cachedResponse || new Response('Not found', { status: 404 });
            }
        })()
    );
});

// Permet la mise à jour immédiate du SW via postMessage
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Commande VitePWA pour générer une image :
// npx @vite-pwa/assets-generator --preset minimal static/logo.svg (adapter avec ton logo)