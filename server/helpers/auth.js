'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');

class Auth {
  constructor() {}

  createToken(payload) {
    return jwt.sign(payload, config.SECRET, {issuer: config.ISSUER});
  }
}

module.exports = new Auth();
