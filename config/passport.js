const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const user = require('../models/user');

passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]',
}, (username, password, done) => {
  user.findOne({username})
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'Username or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));