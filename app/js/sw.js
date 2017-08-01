var CACHE_NAME = 'Todo List Creator';
var urlsToCache = [
  '/',
  '/css/common.css',
  '/js/bundle.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});