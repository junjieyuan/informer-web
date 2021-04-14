if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('/service-worker.js');
}

//offline
// load script to populate offline page list
if (document.getElementById('cachedpagelist') && 'caches' in window) {
  var scr = document.createElement('script');
  scr.src = '/js/offlinepage.js';
  scr.async = 1;
  document.head.appendChild(scr);
}
