const staticCacheName = 'mws-restaurant-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/css/styles.css',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(response){
      if (response){
        return response
      }
      else {
        return fetch(e.request)
        .then(function(response){
          const clonedResponse = response.clone();
          caches.open(staticCacheName).then(function(cahce){
            cache.put(e.request, response, clonedResponse );
          })
          return response
        })
        .catch(function(err){
          console.log(err);
        })
      }
    })
  );
});
