const CACHE_NAME = 'cache-1';



self.addEventListener('install', e => {


    const cacheProm = caches.open(CACHE_NAME)
        .then(cache => {

            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            ]);


        });


    e.waitUntil(cacheProm);

});



self.addEventListener('fetch', e => {


    // Network Fallback
    const respuesta = caches.match(e.request)
        .then(res => {

            if (res) return res;

            // no esta el archivo

            return fetch(e.request).then(newResp => {

                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                    });

                return newResp.clone();
            });

        });


});