"use strict";

const express = require('express'),
      morgan  = require('morgan');

const namespaces   = require('./namespaces'),
      repositories = require('./repositories');


const server = express();

server.use(morgan('combined'));
server.use(express.static('public'));


server.get('/api/repositories', (request, response) => {
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
  }, 3000);
});


server.get('/api/namespaces', (request, response) => {
  setTimeout(() => {
    response.status(200).json(namespaces.sort());
  }, 1000);
});


server.listen(7812, () => console.log('server listening on port 7812'));
