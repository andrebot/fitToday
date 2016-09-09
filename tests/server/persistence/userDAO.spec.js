'use strict';

const mongoose = require('mongoose');
const should = require('chai').should();
const UserDAO = require('../../../server/persistence/userDAO');
const config = require('../../../server/config/config');

describe('UserDAO', function () {
  mongoose.Promise = Promise;

  before(function (done) {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(config.DB.URL, function (error) {
        if (error) {
          return done(error);
        }

        return done();
      });
    }
  });

  beforeEach(function (done) {
    this.payload = {
      name: 'dummy',
      email: 'dummy@gmail.com',
      password: 'test123'
    };

    mongoose.connection.db.dropDatabase(function (error, result) {
      if (error) {
        return done(error);
      } else {
        return done();
      }
    });
  });

  after(function () {
    mongoose.disconnect();
  });

  it('should save a new user properly, with a new ID, encrypted password and default role as \'user\'', function (done) {
    UserDAO.save(this.payload).then((newUser) => {
      should.exist(newUser);
      should.exist(newUser._id);
      newUser.password.should.not.be.equals(this.payload.password);
      newUser.role.should.be.equals('user');

      done();
    }).catch(done);
  });

  it('should throw an error if email incorrect or if password or name is missing', function (done) {
    delete this.payload.name;

    //Name Missing
    UserDAO.save(this.payload).then(function (newUser) {
      done(new Error('User saved succesfully! This should not happen.'));
    }).catch((error) => {

      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.name);

      this.payload.name = 'test';
      delete this.payload.email;

      //Email missing
      return UserDAO.save(this.payload);
    }).then(function (newUser) {
      done(new Error('User saved succesfully! This should not happen.'));
    }).catch((error) => {
      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.email);

      this.payload.email = 'dummy@gmail.com';
      delete this.payload.password;

      //Password missing
      return UserDAO.save(this.payload);
    }).then(function(newUser) {
      done(new Error('User saved succesfully! This should not happen.'));
    }).catch((error) => {
      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.password);

      this.payload.password = 'test123';
      this.payload.email = '@g.';

       //Wrong password
      return UserDAO.save(this.payload);
    }).then(function (newUser) {
      done(new Error('User saved succesfully! This should not happen.'));
    }).catch(function (error) {
      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.email);

      done();
    });
  });

  it('should fetch a user with an email equals \'test@gmail.com\'', function (done) {
    UserDAO.save(this.payload).then((newUser) => {
      UserDAO.findByEmail(this.payload.email).then((user) => {
        should.exist(user);
        user.should.not.be.an('array');
        user.email.should.be.equals(this.payload.email);

        done();
      }).catch(done);
    }).catch(done);
  });

  it('should return \'undefined\' if no user is found with an email equals', function (done) {
    UserDAO.findByEmail(this.payload.email).then((user) => {
      should.not.exist(user);

      done();
    }).catch(done);
  });

});