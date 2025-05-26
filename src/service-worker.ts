/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, version } from '$service-worker';

const CACHE = `cache-${version}`;

// Installation du service worker : mise en cache minimale
self.addEventListener('install', event => {
    // Mise en cache des ressources essentielles uniquement
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll([
                '/', // Page d'accueil
                ...build.filter(url => url.endsWith('.css') || url.endsWith('.js')) // Assets essentiels
            ]))
    );
});

// Activation : nettoyage des anciens caches
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

// Version super simplifiée de l'intercepteur de requêtes
self.addEventListener('fetch', event => {
    // Ignore complètement les requêtes d'API et de médias
    if (event.request.url.includes('/api/') || 
        event.request.url.includes('/uploads/')) {
        return; // Laisse le navigateur gérer normalement
    }
    
    // Pour les autres ressources, essaie le réseau puis le cache
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                // En cas d'échec réseau, on tente le cache
                return caches.match(event.request)
                    .then(cachedResponse => {
                        // Retourne la réponse du cache ou une réponse 404 standard
                        return cachedResponse || new Response('Not found', { status: 404 });
                    });
            })
    );
});

// Permet la mise à jour immédiate du SW via postMessage
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});