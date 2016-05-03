import lru from 'lru-cache';


export const cache = lru({max:25, maxAge:60000});

const requests = {};

export function get(path, query) {
  query = query || {};

  const url = path + api.query(query);
  if (api.cache.has(url)) {
    return api.cache.get(url);
  }

  if (requests[url]) return;

  const request = new XMLHttpRequest();
  requests[url] = request;

  request.addEventListener('load', (event) => {
    if (request.status === 200) {
      api.cache.set(url, JSON.parse(request.responseText));
      delete requests[url];
      global.redraw();
    } else if (request.status === 403) {
      window.location = '/auth/google';
    }
  });

  request.open('GET', url);
  request.send();
}


export function query(obj) {
  const keys = Object.keys(obj || {});
  if (!keys.length) return '';
  return '?' + keys
    .map((k) => {
      if (typeof obj[k] !== 'undefined') {
        return `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`;
      }
    })
    .sort()
    .join('&');
}


export const repositories = (query) => api.get('/api/repositories', query);
export const namespaces = () => api.get('/api/namespaces');
