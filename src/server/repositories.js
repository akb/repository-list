"use strict";

const faker        = require('faker'),
      uuid         = require('uuid'),
      validateUUID = require('uuid-validate'),
      random       = require('./random'),
      namespaces   = require('./namespaces');


function isSlug(string) {
  return !!/[A-Z0-9-_]+/i.exec(string);
}


class Repository {
  constructor(props) {
    props = props || {};
    this.id = props.id || uuid.v4();
    this.namespace = props.namespace;
    this.name = props.name;
    this.isPrivate = props.isPrivate;
    this.description = props.description || '';
  }

  validate() {
    const errors = [];
    if (!validateUUID(this.id)) {
      errors.push({
        key     : 'id',
        message : '"id" must be a valid Version 4 UUID'
      });
    }
    if (!this.namespace) {
      errors.push({
        key     : 'namespace',
        message : '"namespace" is a required value'
      });
    } else if (!isSlug(this.namespace)) {
      errors.push({
        key     : 'namespace',
        message : '"namespace" may only contain alphanumeric characters, "-", and "_"'
      });
    }

    if (!this.name) {
      errors.push({
        key     : 'name',
        message : '"name" is a required value'
      });
    } else if (!isSlug(this.name)) {
      errors.push({
        key     : 'name',
        message : '"name" may only contain alphanumeric characters, "-", and "_"'
      });
    }

    return errors;
  }

  update(obj) {
    return new Repository({
      namespace   : obj.namespace || this.namespace,
      name        : obj.name || this.name,
      isPrivate   : Object.hasOwnProperty(obj, 'isPrivate') ? obj.isPrivate : this.isPrivate,
      description : obj.description || this.description
    });
  }
}


function generate() {
  const props = {};
  props.namespace = random.sample(namespaces);

  props.name = faker.helpers.slugify([
    faker.hacker.adjective(),
    faker.hacker.noun()
  ].join('-'));

  props.isPrivate = random.flip();

  if (random.flip()) {
    props.description = faker.hacker.phrase();
  }

  return new Repository(props);
};


const repositories = {};
for (let i = 0; i < random.dice(100, 500); i++) {
  const repository = generate();
  repositories[repository.id] = repository;
}


function all() {
  const out = [];
  for (var uuid in repositories) {
    out.push(repositories[uuid]);
  }
  return out;
}


function forNamespace(namespace) {
  const out = [];
  for (var uuid in repositories) {
    const repository = repositories[uuid];
    if (repository.namespace === namespace) out.push(repository);
  }
  return out;
}


function find(namespace, name) {
  for (var uuid in repositories) {
    const repository = repositories[uuid];
    if (repository.namespace === namespace && repository.name === name) {
      return repository;
    }
  }
}


function findOrCreate(namespace, name) {
  return find(namespace, name) || new Repository();
}


function save(repository) {
  const isUpdate = !!repositories[repositories.id];
  repositories[repository.id] = repository;
  return isUpdate;
}


module.exports = {
  all          : all,
  find         : find,
  forNamespace : forNamespace,
  findOrCreate : findOrCreate,
  save         : save,
  Repository   : Repository
};
