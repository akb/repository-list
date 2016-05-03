"use strict";

const express = require('express');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const users = {}; // TODO: should be a real database


const config = {
  clientID     : environment.googleClientID,
  clientSecret : environment.googleClientSecret,
  callbackURL  : environment.googleCallbackURL
};


class User {
  constructor(props) {
    this.token = props.token;
    this.profile = props.profile;
  }
}


passport.use(
  new GoogleStrategy(config, (token, refreshToken, profile, done) => {
    let user = users[profile.id];
    if (!user) {
      user = new User({token:token, profile:profile});
      users[profile.id] = user;
    }
    done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.profile.id);
});

passport.deserializeUser((id, done) => {
  const user = users[id];
  if (!user) {
    done({message:'user not found'}, null);
  } else {
    done(null, user);
  }
});

function authenticate(request, response, next) {
  if (request.isAuthenticated()) return next();
  response.status(403).json({message:'not authorized'});
}

const auth = express();

auth.get('/session', authenticate, (request, response) => response.json(request.user));

auth.delete('/session', (request, response) => {
  request.logout();
  respose.redirect('/login');
});

auth.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

auth.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

module.exports = auth;
module.exports.authenticate = authenticate;
