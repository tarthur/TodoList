self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('app_serviceworker_v_1').then(function(cache) {
              return cache.addAll([
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
          ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    // активация
    console.log('activate', event);
});


self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log('----->' + response)
      return response || fetch(e.request);
    })
  );
});