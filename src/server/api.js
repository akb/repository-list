"use strict";

const express    = require('express'),
      bodyParser = require('body-parser');

const auth         = require('./auth'),
      namespaces   = require('./namespaces'),
      repositories = require('./repositories'),
      random       = require('./random');

const api = express();

api.use(bodyParser.json());


api.use((request, response, done) => {
  const delay = random.dice(
    environment.injectMinLatency,
    environment.injectMaxLatency
  );
  setTimeout(done, delay);
});


api.get('/repositories', auth.authenticate, (request, response) => {
  const namespace = request.query.namespace,
        offset    = parseInt(request.query.offset) || 0,
        size      = parseInt(request.query.size)   || 10;

  let filtered;
  if (namespace) {
    filtered = repositories.forNamespace(namespace);
  } else {
    filtered = repositories.all();
  }

  response.status(200).json({
    total: filtered.length,
    items: filtered.slice(offset, offset + size)
  });
});


api.put('/repositories/:namespace/:name', auth.authenticate, (request, response) => {
  const repository = repositories
    .findOrCreate(request.namespace, request.name)
    .update(request.body);

  const validationErrors = repository.validate();

  if (validationErrors.length) {
    response.status(400).json(validationErrors);
  } else {
    const isUpdate = repositories.save(repository);
    if (isUpdate) {
      response.status(200);
    } else {
      response.status(201);
    }
    response.json(repository);
  }
});


api.get('/namespaces', auth.authenticate, (request, response) => {
  response.status(200).json(namespaces.sort());
});


module.exports = api;
