const cacheName = "version-0.1";
const urlsToCache = [ "index.html", "offline.html"];



self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(cacheName)
        .then((cache)=>{
            console.log('open cache');
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>{
            return fetch(event.request)
            .catch(()=>caches.match('./offline.html'))
        })
    )

});

self.addEventListener('activate', (event)=>{
    const cacheWhiteList = [];
    cacheWhiteList.push(cacheName);

    event.waitUntil(
        caches.keys().then((cachenames)=>Promise.all(
            cachenames.map((cachename)=>{
                if(!cacheWhiteList.includes(cachename)){
                        return caches.delete(cachename);
                }
            })
        ))
    )
})