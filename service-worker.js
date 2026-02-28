const CACHE_NAME = 'everyone-generators-v1';
const urlsToCache = [
  './',
  './index.html',
  './404.html',
  './css/style.css',
  './js/utils.js',
  './js/i18n.js',
  './js/generators.js',
  './js/app.js',
  './locales/ru.json',
  './locales/en.json',
  './assets/favicon.ico',
  './assets/favicon.png',
  './assets/favicon.svg',
  './assets/icons/icon-72x72.png',
  './assets/icons/icon-96x96.png',
  './assets/icons/icon-128x128.png',
  './assets/icons/icon-144x144.png',
  './assets/icons/icon-152x152.png',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-384x384.png',
  './assets/icons/icon-512x512.png',
  './assets/Flag_of_Russia.svg',
  './assets/Flag_of_the_United_Kingdom.svg',
  './assets/socials/odysee.svg',
  './assets/socials/bluesky.svg',
  './assets/socials/tumblr.svg',
  './assets/socials/mastodon.svg',
  './assets/socials/tiktok.svg',
  './assets/socials/x.svg',
  './assets/socials/x-light.svg',
  './assets/socials/facebook.svg',
  './assets/socials/youtube.svg',
  './assets/socials/vk.svg',
  './assets/socials/instagram.svg',
  './assets/socials/telegram.svg',
  './assets/socials/rumble.svg'
];

// Установка сервис-воркера и кэширование ресурсов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование ресурсов');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Немедленная активация нового воркера
  );
});

// Активация: удаление старых кэшей и захват управления страницами
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => clients.claim()) // Немедленный контроль над всеми открытыми вкладками
  );
});

// Стратегия кэширования:
// - Для HTML-страниц (навигационных запросов) — сначала сеть, потом кэш (актуальный контент)
// - Для остальных ресурсов — сначала кэш, потом сеть (скорость и офлайн-доступ)
self.addEventListener('fetch', event => {
  // Если это запрос навигации (переход по ссылке, обновление страницы)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request) // Пытаемся загрузить с сервера
        .then(response => {
          // Если успешно, кэшируем новую версию страницы (опционально)
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request)) // Если сеть недоступна, берём из кэша
    );
    return;
  }

  // Для всех остальных запросов (CSS, JS, картинки и т.д.) — Cache First
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // из кэша
        }
        return fetch(event.request); // из сети
      })
  );
});
