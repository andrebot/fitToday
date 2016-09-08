'use strict';

const should = require('chai').should();
const jwt = require('jsonwebtoken');
const Auth = require('../../../server/helpers/auth');
const config = require('../../../server/config/config');

describe('Auth', function () {
  it('should create a token with right info', function () {
    let token = Auth.createToken({email: 'test@gmail.com', name: 'john doe'});

    should.exist(token);
  });

  it('should verify the token as valid', function () {
    let token = Auth.createToken({email: 'test@gmail.com', name: 'john doe'});
    let verified = Auth.isValidToken(token);

    verified.should.be.true;
  });

  it('should verify an empty token as invalid', function () {
    let token = '';
    let verified = Auth.isValidToken(token);

    verified.should.be.false;
  });

  it('should verify an undefined token as invalid', function () {
    let token;
    let verified = Auth.isValidToken(token);

    verified.should.be.false;
  });

  it('should verify a token 1440 secs old as invalid', function () {
    let payload = {email: 'test@gmail.com', name: 'john doe', iat: Math.floor(Date.now() / 1000) - 1441};
    let token = jwt.sign(payload, config.SECRET, {issuer: config.ISSUER});
    let verified = Auth.isValidToken(token);

    verified.should.be.false;
  });
});
