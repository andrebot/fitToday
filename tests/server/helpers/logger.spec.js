'use strict';

const should = require('chai').should();
const Auth = require('../../../server/helpers/auth');

describe('Auth', function () {
  let auth;

  before(function () {
    auth = new Auth();
  });

  it('should create a token with right info', function () {
    let token = auth.createToken({});

    should.exist(token);
  });
});
