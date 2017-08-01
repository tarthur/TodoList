var CACHE_NAME = 'Todo List Creator';
var urlsToCache = [
      '/TodoList/',
      '/TodoList/index.html',
      '/TodoList/css/common.css',
      '/TodoList/js/bundle.js',
      '/TodoList/img/basket.svg',
      '/TodoList/img/delete-button.2.svg',
      '/TodoList/img/delete-button.svg',
      '/TodoList/img/error.svg',
      '/TodoList/img/ic_add_black_24px.svg',
      '/TodoList/img/ic_close_black_24px.svg',
      '/TodoList/img/plus-symbol.1.svg'
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