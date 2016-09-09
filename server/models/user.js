'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const Validator = require('../helpers/validator');
const Logger = require('../helpers/logger');
const Schema = mongoose.Schema;

const User = new Schema({
  name:     {type: String, required: true, match: Validator.name},
  email:    {type: String, required: true, match: Validator.email},
  role:     {type: String, required: true, default: 'user'},
  password: {type: String, required: true}
});

/**
 * Pre hook function to hash user's password. (from mongoose)
 * http://blog.mongodb.org/post/32866457221/password-authentication-with-mongoose-part-1
 */
User.pre('save', function (next) {

  // is it new or modified?
  if (!this.isModified('password')){
    Logger.debug('User Model: User was not modified neither is new.');
    return next();
  }

  Logger.debug('User Model: Generating salt for bcrypt.');
  bcrypt.genSalt(config.SALT_WORK_FACTOR, (genError, salt) => {
    if (genError) {
      Logger.error('User Model: Error while generating Salt with bcrypt.');
      Logger.error(genError);

      return next(error);
    }

    Logger.info(`User Model: Hashing ${this.name}'s password.`);
    bcrypt.hash(this.password, salt, (hashError, hash) => {
      if (hashError) {
        Logger.error('User Model: Error while hashing with bcrypt.');
        Logger.error(hashError);

        return next(hashError);
      }

      Logger.info(`User Model: ${this.name}'s password was hashed successfully.`);
      this.password = hash;

      next();
    });
  });
});

/**
 * Method to compare a hashed password with a simple string one.
 * http://blog.mongodb.org/post/32866457221/password-authentication-with-mongoose-part-1
 */
User.methods.comparePassword = function (password) {
  Logger.debug('User Model: Creating promise for comparePassword.');
  return new Promise((resolve, reject) => {

    Logger.debug('User Model: Using bcrypt to campare the password.');
    bcrypt.compare(password, this.password, (error, isMatch) => {
      if (error) {
        Logger.error('User Model: Error while comparing passwords.');
        Logger.error(error);

        reject(error);
      }

      Logger.info(`User Model: Passwords tested for ${this.name}.`);
      resolve(isMatch);
    })
  });
}

module.exports = mongoose.model('User', User);
