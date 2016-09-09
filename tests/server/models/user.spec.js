'use strict';

const mongoose = require('mongoose');
const should = require('chai').should();
const User = require('../../../server/models/user');
const config = require('../../../server/config/config');

describe('User Model', function () {
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

  it('should hash the user password when I save it', function (done) {
    const payload = {
      name: 'dummy',
      email: 'dummy@gmail.com',
      password: 'test123'
    };
    let user = new User(payload);

    user.save(function (error) {
      if (error) {
        done(error);
      }

      user.password.should.not.be.equals(payload.password);
      done();
    });
  });

  it('should set the default value \'user\' to a new User\'s role', function () {
    const payload = {
      name: 'dummy',
      email: 'dummy@gmail.com',
      password: 'test123'
    };
    let user = new User(payload);

    user.save(function (error) {
      if (error) {
        done(error);
      }

      user.role.should.be.equals('user');
      done();
    });
  });

});