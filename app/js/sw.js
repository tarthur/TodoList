var CACHE_NAME = 'app_serviceworker_v_1',
    cacheUrls = [
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
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(cacheUrls);
        })
    );
});

self.addEventListener('activate', function(event) {
    // активация
    console.log('activate', event);
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('app_serviceworker_v_1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});