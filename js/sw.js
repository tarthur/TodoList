var CACHE_NAME = 'Todo List Creator';
var urlsToCache = [
      '/',
      '/index.html',
      '/css/common.css',
      '/js/bundle.js',
      '/img/basket.svg',
      '/img/delete-button.2.svg',
      '/img/delete-button.svg',
      '/img/error.svg',
      '/img/ic_add_black_24px.svg',
      '/img/ic_close_black_24px.svg',
      '/img/plus-symbol.1.svg'
 
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