'use strict';

const should = require('chai').should();
const jwt = require('jsonwebtoken');
const Auth = require('../../../server/helpers/auth');

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
});
