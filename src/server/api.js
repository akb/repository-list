"use strict";

const express = require('express');

const auth         = require('./auth'),
      namespaces   = require('./namespaces'),
      repositories = require('./repositories'),
      random       = require('./random');

const api = express();


function latency() {
  return random.dice(
    environment.injectMinLatency,
    environment.injectMaxLatency
  );
}


api.get('/repositories', auth.authenticate, (request, response) => {
  const namespace = request.query.namespace,
        offset    = parseInt(request.query.offset) || 0,
        size      = parseInt(request.query.size)   || 10;

  let filtered;
  if (namespace) {
    filtered = repositories.filter((r) => r.namespace === namespace);
  } else {
    filtered = repositories;
  }

  setTimeout(() => {
    response.status(200).json({
      total: filtered.length,
      items: filtered.slice(offset, offset + size)
    });
  }, latency());
});


api.get('/namespaces', auth.authenticate, (request, response) => {
  setTimeout(() => {
    response.status(200).json(namespaces.sort());
  }, latency());
});


module.exports = api;
