"use strict";

const faker      = require('faker'),
      random     = require('./random'),
      namespaces = require('./namespaces');


class Repository {
  constructor() {
    this.id = faker.random.uuid();

    this.namespace = random.sample(namespaces);

    this.name = faker.helpers.slugify([
      faker.hacker.adjective(),
      faker.hacker.noun()
    ].join('-'));

    this.isPrivate = random.flip();

    if (random.flip()) {
      this.description = faker.hacker.phrase();
    }
  }
}


const repositories = [];
for (let i = 0; i < random.dice(100, 500); i++) {
  repositories.push(new Repository());
}

module.exports = repositories;
