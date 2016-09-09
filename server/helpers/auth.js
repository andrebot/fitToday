'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('./logger');

class Auth {
  constructor() {}

  createToken(payload) {
    return jwt.sign(payload, config.SECRET, {issuer: config.ISSUER, expiresIn: config.TOKEN_EXPIRATION});
  }

  verifyRequestAuthentication(request, response, next) {
    const cookie = request.cookies[config.COOKIE_NAME];

    if (cookie) {
      try {
        request.token = jwt.verify(cookie, config.SECRET, {issuer: config.ISSUER, ignoreExpiration: false});

        next();
      } catch (error) {
        logger.info('Auth: Token invalid.');
        logger.error(error);

        response.sendStatus(401);
      }
    } else {
      logger.error('Auth: Missing cookie with token.');

      response.sendStatus(407);
    }
  }
}

module.exports = new Auth();
