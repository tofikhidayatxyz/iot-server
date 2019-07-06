'use strict';

const cacheName = 'static-cache-v1';


const files = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/css/style.css',
  '/js/app.js',
  '/images/favicon.png',
  '/images/icons/icon-72x72.png',
  '/images/icons/icon-96x96.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-384x384.png',
  '/images/icons/icon-512x512.png',
  '/fonts/vendor/line-awesome/line-awesome.eot' ,
  '/fonts/vendor/line-awesome/line-awesome.svg' ,
  '/fonts/vendor/line-awesome/line-awesome.ttf' ,
  '/fonts/vendor/line-awesome/line-awesome.woff' ,
  '/fonts/vendor/line-awesome/line-awesome.woff2',
];


self.addEventListener('install', (event) => {
  console.info('Event: Install');
  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      return cache.addAll(files)
      .then(() => {
        console.info('All files are cached');
        return self.skipWaiting();
      })
      .catch((error) =>  {
        console.error('Failed to cache', error);
      })
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('view/all') || event.request.url.includes('/create/save') || event.request.url.includes('/edit/update') || event.request.url.includes('/edit/switch') || event.request.url.includes('/view') || event.request.url.includes('/delete') ) return false;
  //console.info(event.request.url);
  var request = event.request;
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(request).then((response) => {
        var responseToCache = response.clone();
        caches.open(cacheName).then((cache) => {
            cache.put(request, responseToCache).catch((err) => {
              console.warn(request.url + ': ' + err.message);
            });
          });

        return response;
      });
    })
  );
});


self.addEventListener('activate', (event) => {
  console.info('Event: Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache); //Deleting the old cache (cache v1)
          }
        })
      );
    })
    .then(function () {
      console.info("Old caches are cleared!");
      return self.clients.claim(); 
    }) 
  );
});

self.addEventListener('push', (event) => {
  console.info('Event: Push');

  var title = 'Push notification demo';
  var body = {
    'body': 'click to return to application',
    'tag': 'demo',
    'icon': './images/icons/apple-touch-icon.png',
    'badge': './images/icons/apple-touch-icon.png',
    'actions': [
      { 'action': 'yes', 'title': 'I ♥ this app!'},
      { 'action': 'no', 'title': 'I don\'t like this app'}
    ]
  };

  event.waitUntil(self.registration.showNotification(title, body));
});




self.addEventListener('sync', (event) => {
  console.info('Event: Sync');

  if (event.tag === 'github' || event.tag === 'test-tag-from-devtools') {
    event.waitUntil(
      self.clients.matchAll().then((all) => {
        return all.map((client) => {
          return client.postMessage('online');
        })
      })
      .catch((error) => {
        console.error(error);
      })
    );
  }
});


self.addEventListener('notificationclick', (event) => {
  var url = 'https://iotremotehome.herokuapp.com';
  if (event.action === 'yes') {
    console.log('I ♥ this app!');
  }
  else if (event.action === 'no') {
    console.warn('I don\'t like this app');
  }

  event.notification.close(); 
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then((clients) => {
      for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
    .catch((error) => {
      console.error(error);
    })
  );
});