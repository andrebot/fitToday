'use strict';

const should = require('chai').should();
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const Auth = require('../../../server/helpers/auth');
const config = require('../../../server/config');

describe('Auth', function () {

  beforeEach(function () {
    this.request = {
      cookies: {}
    };

    this.next = sinon.spy();

    this.response = {
      sendStatus: sinon.spy(),
      clearCookie: sinon.spy()
    };

  });

  it('should create a token with right info', function () {
    let token = Auth.createToken({email: 'test@gmail.com', name: 'john doe'});

    should.exist(token);
  });

  it('should verify the token as valid', function () {
    this.request.cookies[config.COOKIE_NAME] = Auth.createToken({email: 'test@gmail.com', name: 'john doe'});

    Auth.verifyRequestAuthentication(this.request, this.response, this.next);

    should.exist(this.request.token);
    this.next.calledOnce.should.be.true;
    this.response.sendStatus.called.should.be.false;
  });

  it('should verify an empty token as invalid and return 407', function () {
    this.request.cookies[config.COOKIE_NAME] = '';

    Auth.verifyRequestAuthentication(this.request, this.response, this.next);

    should.not.exist(this.request.token);
    this.response.sendStatus.calledOnce.should.be.true;
    this.response.sendStatus.calledWith(407).should.be.true;
  });

  it('should verify an undefined token as invalid and return 407', function () {
    Auth.verifyRequestAuthentication(this.request, this.response, this.next);

    should.not.exist(this.request.token);
    this.response.sendStatus.calledOnce.should.be.true;
    this.response.sendStatus.calledWith(407).should.be.true;
  });

  it('should verify a token 1440 secs old as invalid and return 401', function () {
    let payload = {email: 'test@gmail.com', name: 'john doe', iat: Math.floor(Date.now() / 1000) - 1441};
    this.request.cookies[config.COOKIE_NAME] = jwt.sign(payload, config.SECRET, {issuer: config.ISSUER, expiresIn: config.TOKEN_EXPIRATION});

    Auth.verifyRequestAuthentication(this.request, this.response, this.next);

    should.not.exist(this.request.token);
    this.response.sendStatus.calledOnce.should.be.true;
    this.response.sendStatus.calledWith(401).should.be.true;
    this.response.clearCookie.should.have.been.calledOnce;
    this.response.clearCookie.calledWith(config.COOKIE_NAME).should.be.true;
  });

  it('should verify the token as valid and accepts it as an admin', function () {
    this.request.cookies[config.COOKIE_NAME] = Auth.createToken({email: 'test@gmail.com', name: 'john doe', role: 'admin'});

    Auth.verifyAdmin(this.request, this.response, this.next);

    should.exist(this.request.token);
    this.next.calledOnce.should.be.true;
    this.response.sendStatus.called.should.be.false;
  });

  it('should verify the token as valid and not authorize an regular user', function () {
    this.request.cookies[config.COOKIE_NAME] = Auth.createToken({email: 'test@gmail.com', name: 'john doe', role: 'user'});

    Auth.verifyAdmin(this.request, this.response, this.next);

    should.exist(this.request.token);
    this.next.calledOnce.should.be.false;
    this.response.sendStatus.called.should.be.true;
  });

  it('should verify an empty token as invalid and return 407 for under verifying for admin', function () {
    this.request.cookies[config.COOKIE_NAME] = '';

    Auth.verifyAdmin(this.request, this.response, this.next);

    should.not.exist(this.request.token);
    this.response.sendStatus.calledOnce.should.be.true;
    this.response.sendStatus.calledWith(407).should.be.true;
  });
});
