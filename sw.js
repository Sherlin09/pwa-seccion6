//const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DYNAMIC_LIMIT = 50;



self.addEventListener('install', e => {


    const cacheProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js',
            ]);


        });

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));


    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));

});



self.addEventListener('fetch', e => {


    // Network Fallback
    const respuesta = caches.match(e.request)
        .then(res => {

            if (res) return res;

            // no esta el archivo
            console.log('No existe', e.request.url);

            return fetch(e.request).then(newResp => {

                caches.open(CACHE_DYNAMIC_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                    });

                return newResp.clone();
            });

        });


});