'use strict';

const should = require('chai').should();
const validator = require('../../../server/helpers/validator');

describe('Validator', function () {

  it('should have two regular expressions named email and name', function () {
    should.exist(validator.email);
    should.exist(validator.name);
  });

  it('should validate a correct email', function () {
    validator.isEmailValid('test@gmail.com').should.be.true;
    validator.isEmailValid('test@gmail.com.br').should.be.true;
    validator.isEmailValid('test123@gmail.co').should.be.true;
    validator.isEmailValid('test@gmail.uk').should.be.true;
  });

  it('should say an incorrect email is not correct', function () {
    validator.isEmailValid('test@gmailcom').should.be.false;
    validator.isEmailValid('testgmail.com').should.be.false;
    validator.isEmailValid('@gmail.com').should.be.false;
    validator.isEmailValid('test@.com').should.be.false;
  });

  it('should say an empty email is not correct', function () {
    validator.isEmailValid('').should.be.false;
    validator.isEmailValid().should.be.false;
    validator.isEmailValid(null).should.be.false;
  })
});
