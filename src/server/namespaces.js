"use strict";

const faker  = require('faker'),
      random = require('./random');


function generate() {
  return faker.helpers.slugify([
    faker.company.catchPhraseAdjective(),
    faker.hacker.noun()
  ].join('-').toLowerCase());
}

const numNamespaces = random.dice(
  environment.generateMinNamespaces,
  environment.generateMaxNamespaces
), namespaces = [];

for (let i = 0; i < numNamespaces; i++) {
  namespaces.push(generate());
}

module.exports = namespaces;
