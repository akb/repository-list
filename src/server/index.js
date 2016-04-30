"use strict";

const express = require('express'),
      morgan  = require('morgan');

const repositories = require('./repositories');

const server = express();

server.use(morgan('combined'));
server.use(express.static('public'));

server.get('/api/repositories', (request, response) => {
  response.status(200).json(repositories)
});

server.get('/api/namespaces', (request, response) => {
  var namespaces = {};
  repositories.forEach((r) => namespaces[r.namespace] = true);
  response.status(200).json(Object.keys(namespaces).sort());
});

server.listen(7812, () => console.log('server listening on port 7812'));
