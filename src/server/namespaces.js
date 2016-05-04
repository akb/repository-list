"use strict";

const faker  = require('faker'),
      random = require('./random');


function generate() {
  return faker.helpers.slugify([
    faker.company.catchPhraseAdjective(),
    faker.hacker.noun()
  ].join('-').toLowerCase());
}

const namespaces = [];
for (let i = 0; i < random.dice(5, 15); i++) {
  namespaces.push(generate());
}

module.exports = namespaces;
