'use strict';

const should = require('chai').should();
const jwt = require('jsonwebtoken');
const Auth = require('../../../server/helpers/auth');

describe('Auth', function () {
  it('should create a token with right info', function () {
    let token = Auth.createToken({email: 'test@gmail.com', name: 'john doe'});

    should.exist(token);
  });
});
