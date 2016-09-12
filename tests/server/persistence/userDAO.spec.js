'use strict';

const mongoose = require('mongoose');
const should = require('chai').should();
const UserDAO = require('../../../server/persistence/userDAO');
const User = require('../../../server/models/user');
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
    let newUser = new User(this.payload);

    newUser.save().then((newUser) => {
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

  it('should find an user by id', function (done) {
    let newUser = new User(this.payload);

    newUser.save().then((user) => {
      UserDAO.findById(user._id).then((userFindId) => {
        should.exist(userFindId);
        userFindId._id.equals(newUser._id).should.be.true;

        done();
      }).catch(done);
    }).catch(done);
  });

  it('should not find an user by an id which does not exists', function (done) {
    UserDAO.findById('123456789012345678901234').then((user) => {
      should.not.exist(user);

      done();
    }).catch(done);
  });

  it('should list all users', function (done) {
    let newUser = new User(this.payload);

    newUser.save().then((user) => {
      newUser = new User(this.payload);

      return newUser.save();
    }).then(() => {
      UserDAO.listDocuments().then(function (userList) {
        userList.should.be.an('array');
        userList.length.should.be.above(0);

        done();
      }).catch(done);
    }).catch(done);
  });

  it('should return an empty list in case we have no users', function (done) {
    UserDAO.listDocuments().then(function (userList) {
      userList.should.be.an('array');
      userList.length.should.be.equals(0);

      done();
    }).catch(done);
  });

  it('should delete an user', function (done) {
    let newUser = new User(this.payload);

    newUser.save().then((savedUser) => {
      return UserDAO.deleteDocument(savedUser._id);
    }).then((deletedUser) => {
      should.exist(deletedUser);

      done();
    }).catch(done);
  });

  xit('should update a user if I give the right ID', function (done) {
    let newUser = new User(this.payload);

    newUser.save().then((user) => {
      let newAttribute = {
        name: 'Andre123'
      };

      UserDAO.update(user._id, newAttribute.name).then((updatedUser) => {
        should.exist(updatedUser);
        updatedUser.name.should.be.equals(newAttribute.name);

        done();
      }).catch(done);
    }).catch(done);
  });

});
