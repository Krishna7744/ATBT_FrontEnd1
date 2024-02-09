"use strict"

var version = 2;
var isOnline = true;
var isLoggedIn = false;

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);
// self.addEventListener("fetch", onFetch);

main().catch(console.error);

async function main() {
    console.log(`service worker ${version} is starting....`);
    await sendMessage({ statusUpdateRequest: true });
}

function onInstall(evt) {
    console.log(`Service Worker (v${version}) installed`);
    self.skipWaiting();
}

async function sendMessage(msg) {
    var allClients = await clients.matchAll({ includeUncontrolled: true, });
    return Promise.all(
        allClients.map(function sendTo(client) {
            var chan = new MessageChannel();
            chan.port1.onmessage = onMessage;
            return client.postMessage(msg, [chan.port2]);
        })
    );
}

function onMessage({ data }) {
    console.log(data, "sw", Date.now())
    if ("statusUpdate" in data) {
        ({ isOnline, isLoggedIn } = data.statusUpdate);
        console.log(`Service Worker (v${version}) status update... isOnline:${isOnline}, isLoggedIn:${isLoggedIn}`);
    }
}

function onActivate(evt) {
    evt.waitUntil(handleActivation());
}

async function handleActivation() {
    // await clearCaches();
    // await cacheLoggedOutFiles(/*forceReload=*/true);
    await clients.claim();
    console.log(`Service Worker (v${version}) activated`);

    // spin off background caching of all past posts (over time)
    // cacheAllPosts(/*forceReload=*/true).catch(console.error);
}







// alt


// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open('my-cache').then((cache) => {
//             return cache.addAll(['/index.html', '/manifest.json', '/static/js/bundle.js']);
//         })
//     );
// });

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request);
//         })
//     );
// });

// self.addEventListener('activate', (event) => {
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.map((cacheName) => {
//                     if (cacheName !== 'my-cache') {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });
