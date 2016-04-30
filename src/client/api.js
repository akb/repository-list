import lru from 'lru-cache';


export var api = {};


api.cache = lru({max:25, maxAge:5000});


api.get = (url) => {
  if (api.cache.has(url)) {
    return api.cache.get(url);
  }

  const request = new XMLHttpRequest();
  request.addEventListener('load', () => {
    api.cache.set(url, JSON.parse(request.responseText));
    global.redraw();
  });
  request.open('GET', url);
  request.send();
};


api.repositories = () => api.get('/api/repositories');
api.namespaces = () => api.get('/api/namespaces');
