"use strict";

const express = require('express'),
      morgan  = require('morgan');

const namespaces   = require('./namespaces'),
      repositories = require('./repositories');


const server = express();

server.use(morgan('combined'));
server.use(express.static('public'));


server.get('/api/repositories', (request, response) => {
  const namespace = request.query.namespace;
  let filtered;
  if (namespace) {
    filtered = repositories.filter((r) => r.namespace === namespace);
  } else {
    filtered = repositories;
  }
  setTimeout(() => {
    response.status(200).json(filtered)
  }, 3000);
});


server.get('/api/namespaces', (request, response) => {
  setTimeout(() => {
    response.status(200).json(namespaces.sort());
  }, 2000);
});


server.listen(7812, () => console.log('server listening on port 7812'));
