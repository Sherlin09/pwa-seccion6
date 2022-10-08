self.addEventListener('fetch', event => {

    const offlineResp = new Response(`
    
        Bienvenido a mi Página Web
        necesitas conexion a internet
    
    `);



    const resp = fetch(event.request)
        .catch(() => offlineResp);


    event.respondWith(resp);

});