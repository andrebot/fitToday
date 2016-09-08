'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('./logger');

class Auth {
  constructor() {}

  createToken(payload) {
    return jwt.sign(payload, config.SECRET, {issuer: config.ISSUER, expiresIn: config.TOKEN_EXPIRATION});
  }

  isValidToken(token) {
    try {
      jwt.verify(token, config.SECRET, {issuer: config.ISSUER, ignoreExpiration: false});

      return true;
    } catch (error) {
      logger.info('Auth: Token invalid.');
      logger.error(error);

      return false
    }
  }

  verifyRequestAuthentication(request, response, next) {
    
  }
}

module.exports = new Auth();
