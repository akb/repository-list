import lru from 'lru-cache';


export const cache = lru({max:50, maxAge:60000});

function invalidate(url) {
  const divider = url.indexOf('?');
  let path = url;
  if (divider > -1) {
    path = url.slice(0, divider);
  }
  cache.forEach((value, key) => {
    if (key.match(path)) {
      cache.del(key);
    }
  });
}

const requests = {
  get: {},
  put: {}
};

export function get(path, query) {
  query = query || {};

  const url = path + api.query(query);
  if (api.cache.has(url)) {
    return api.cache.get(url);
  }

  if (requests.get[url]) return;

  const request = new XMLHttpRequest();
  requests.get[url] = request;

  request.addEventListener('load', (event) => {
    if (request.status === 200) {
      api.cache.set(url, JSON.parse(request.responseText));
      delete requests.get[url];
      global.redraw();
    } else if (request.status === 403) {
      window.location = '/auth/google';
    }
  });

  request.open('GET', url);
  request.send();
}

export function put(path, query, payload) {
  query = query || {};

  const url = path + api.query(query);

  if (requests.put[url]) return;

  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    requests.put[url] = request;

    request.addEventListener('load', () => {
      delete requests.put[url];
      invalidate(url);
      if (request.status < 300) {
        resolve(request);
      } else {
        reject(request);
      }
      global.redraw();
    });

    request.open('PUT', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(payload));
  });

  return promise;
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


export const namespaces = () => api.get('/api/namespaces');

export const repositories = (query) => api.get('/api/repositories', query);

repositories.upsert = (repository) => {
  const namespace = repository.namespace(),
        name      = repository.name();

  return api.put(`/api/repositories/${namespace}/${name}`, {}, repository)
    .then((val) => {
      invalidate('/api/repositories');
      return val;
    });
};
