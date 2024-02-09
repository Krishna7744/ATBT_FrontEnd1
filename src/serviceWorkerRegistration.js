// const updateViaCacheConfig = { updateViaCache: 'none' };

// const sendStatusUpdate = (worker) => {
//     // Your status update logic here
//     console.log('Service Worker Status:', worker ? worker.state : 'Not available');
// };

// const initServiceWorker = async () => {
//     try {
//         const registration = await navigator.serviceWorker.register('/sw.js', updateViaCacheConfig);
//         const worker = registration.installing || registration.waiting || registration.active;
//         sendStatusUpdate(worker);

//         navigator.serviceWorker.addEventListener('controllerchange', async () => {
//             const newWorker = navigator.serviceWorker.controller;
//             sendStatusUpdate(newWorker);
//         });

//         navigator.serviceWorker.addEventListener('message', onSWMessage, false);
//     } catch (error) {
//         console.error('Error during service worker registration:', error);
//     }
// };

// const onSWMessage = (event) => {
//     // Handle service worker messages here
//     console.log('Received message from service worker:', event.data);
// };



// const register = () => {
//     if ('serviceWorker' in navigator) {
//         initServiceWorker();
//     }
// };

// export { register };



// export function register() {
//     if ('serviceWorker' in navigator) {
//         window.addEventListener('load', () => {
//             navigator.serviceWorker.register('/service-worker.js')
//                 .then((registration) => {
//                     console.log('ServiceWorker registration successful:', registration);
//                 })
//                 .catch((error) => {
//                     console.log('ServiceWorker registration failed:', error);
//                 });
//         });
//     }
// }