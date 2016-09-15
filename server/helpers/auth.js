'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('./logger');

/**
 * Class to manage our AUTH features
 */
class Auth {

  /**
   * @constructor
   */
  constructor() {}

  /**
   * Create a JWT from a payload.
   *
   * @public
   * @param payload {Object} the information that will be used to create the token.
   * @returns {Object} JWT token generated
   */
  createToken(payload) {
    return jwt.sign(payload, config.SECRET, {issuer: config.ISSUER, expiresIn: config.TOKEN_EXPIRATION});
  }

  /**
   * Middleware which checks for the JWT token into the request cookies and verifies it
   *
   * @public
   * @param request {Object} express' request
   * @param response {Object} express' response
   * @param next {Function} express' callback to chain middlewares
   */
  verifyRequestAuthentication(request, response, next) {
    const cookie = request.cookies[config.COOKIE_NAME];

    if (cookie) {
      try {
        request.token = jwt.verify(cookie, config.SECRET, {issuer: config.ISSUER, ignoreExpiration: false});

        next();
      } catch (error) {
        logger.info('Auth: Token invalid.');
        logger.error(error);
        console.log(error);

        if (error.name === 'TokenExpiredError') {
          response.clearCookie(config.COOKIE_NAME);
        }

        response.sendStatus(401);
      }
    } else {
      logger.error('Auth: Missing cookie with token.');

      response.sendStatus(407);
    }
  }

  /**
   * Middleware which checks for the JWT token into the request cookies and verifies if the user
   * is an admin or not.
   *
   * @public
   * @param request {Object} express' request
   * @param response {Object} express' response
   * @param next {Function} express' callback to chain middlewares
   */
  verifyAdmin(request, response, next) {
    const cookie = request.cookies[config.COOKIE_NAME];

    if (cookie) {
      try {
        request.token = jwt.verify(cookie, config.SECRET, {issuer: config.ISSUER, ignoreExpiration: false});

        if (request.token.role === 'admin') {
          next();
        } else {
          logger.info('Auth: User not authorized to access this endpoint.');

          response.sendStatus(401);
        }
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
