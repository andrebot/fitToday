'use strict';

const should = require('chai').should();
const validator = require('../../../server/helpers/validator');

describe('Validator', function () {

  it('should have three regular expressions named email and name', function () {
    should.exist(validator.email);
    should.exist(validator.name);
    should.exist(validator.description);
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
  });

  it('should validate a correct name', function () {
    validator.isNameValid('André Botelho Almeida').should.be.true;
    validator.isNameValid('Andre Botelho Almeida').should.be.true;
    validator.isNameValid('Gabriel Gonçalves').should.be.true;
    validator.isNameValid('White-Heisenbergh').should.be.true;
  });

  it('should say an incorrect name is not correct', function () {
    validator.isNameValid('Kei$ha Addmas').should.be.false;
    validator.isNameValid('@ndre-Botelho').should.be.false;
    validator.isNameValid('C***, e mais').should.be.false;
    validator.isNameValid('Pronto. Sem mais nomes!').should.be.false;
  });

  it('should validate a correct description', function () {
    validator.isDescriptionValid('Deve aceitar tudo! Sem por nem tirar! Não tem descriminação.').should.be.true;
    validator.isDescriptionValid('Mandar-lhe-ei uma coisa. Esqueça, já se perdeu.').should.be.true;
    validator.isDescriptionValid('Eita!\nOlhe o que aconteceu!').should.be.true;
    validator.isDescriptionValid('Olhe (não diga)').should.be.true;
  });

  it('should say an incorrect description is not correct', function () {
    validator.isDescriptionValid('() => {process.exit()}').should.be.false;
  });
});
