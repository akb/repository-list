"use strict";

const express  = require('express'),
      morgan   = require('morgan'),
      session  = require('express-session'),
      passport = require('passport');

const global = require('./global'),
      api    = require('./api'),
      auth   = require('./auth');


const server = express();

server.use(morgan('combined'));
server.use(session({
  secret            : environment.sessionSecret,
  resave            : false,
  saveUninitialized : false
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static(environment.staticPath));
server.use('/auth', auth);
server.use('/api', api);


server.listen(
  environment.listenPort, () =>
    console.log(`server listening on port ${environment.listenPort}`)
);
