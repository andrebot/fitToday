'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('./logger');

class Auth {
  constructor() {}

  createToken(payload) {
    return jwt.sign(payload, config.SECRET, {issuer: config.ISSUER});
  }

  isValidToken(token) {
    try {
      jwt.verify(token, config.SECRET, {issuer: config.ISSUER});

      return true;
    } catch (error) {
      logger.info('Auth: Token invalid.');
      logger.error(error);

      return false
    }
  }
}

module.exports = new Auth();
