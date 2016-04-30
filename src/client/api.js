import lru from 'lru-cache';


export var api = {};


api.cache = lru({max:25, maxAge:5000});


api.query = (obj) => {
  let keys = Object.keys(obj || {}).sort();
  if (!keys.length) return '';
  return '?' + keys
    .map((k) => obj[k] && `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&');
};


api.get = (path, query) => {
  let url = path + api.query(query);
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


api.repositories = (query) => api.get('/api/repositories', query);
api.namespaces = () => api.get('/api/namespaces');
