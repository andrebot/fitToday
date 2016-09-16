'use strict';

const mongoose = require('mongoose');
const should = require('chai').should();
const MealDAO = require('../../../server/persistence/mealDAO');
const Meal = require('../../../server/models/meal');
const User = require('../../../server/models/user');
const config = require('../../../server/config');

describe('MealDAO', function () {
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
    this.userPayload = {
      name: 'dummy',
      email: 'dummy@gmail.com',
      password: 'test123'
    };

    this.mealPayload = {
      user: '',
      name: 'Meal123',
      description: 'Nothing much',
      calories: 2,
      when: Date.now()
    };

    mongoose.connection.db.dropDatabase((error, result) => {
      if (error) {
        return done(error);
      } else {

        let newUser = new User(this.userPayload);

        newUser.save().then((savedUser) => {
          this.user = savedUser;
          this.mealPayload.user = savedUser;

          done();
        }).catch(done);
      }
    });
  });

  after(function () {
    mongoose.disconnect();
  });

  it('should save a new Meal properly, with a new ID and default calories', function (done) {
    MealDAO.save(this.mealPayload).then((newMeal) => {
      should.exist(newMeal);
      should.exist(newMeal._id);

      done();
    }).catch(done);
  });

  it('should add a default date in the when attribute if none is provided', function (done) {
    delete this.mealPayload.when;

    MealDAO.save(this.mealPayload).then((newMeal) => {
      should.exist(newMeal);
      should.exist(newMeal._id);
      should.exist(newMeal.when);

      done();
    }).catch(done);
  });

  it('should throw an error if name, description, user or calories are incorrect', function (done) {
    delete this.mealPayload.name;

    //Name Missing
    MealDAO.save(this.mealPayload).then(function (newMeal) {
      done(new Error('Meal saved succesfully! This should not happen.'));
    }).catch((error) => {
      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.name);

      this.mealPayload.name = 'kei$ha';

      //wrong name
      return MealDAO.save(this.payload);
    }).then(function (newMeal) {
      done(new Error('Meal saved succesfully! This should not happen.'));
    }).catch((error) => {
      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.name);

      this.mealPayload.description = '(function () {process.exit();})()';

      //wrong description
      return MealDAO.save(this.mealPayload);
    }).then(function(newMeal) {
      done(new Error('Meal saved succesfully! This should not happen.'));
    }).catch((error) => {
      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.description);

      delete this.mealPayload.calories;

       //No calories
      return MealDAO.save(this.mealPayload);
    }).then(function (newMeal) {
      done(new Error('Meal saved succesfully! This should not happen.'));
    }).catch((error) => {
      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.calories);

      delete this.mealPayload.user;
      this.mealPayload.calories = 2;

       //No user
      return MealDAO.save(this.mealPayload);
    }).catch((error) => {
      error.name.should.be.equals('ValidationError');
      should.exist(error.errors.user);

      done();
    });
  });

  it('should list all meals from a User', function (done) {
    let newMeal = new Meal(this.mealPayload);

    newMeal.save().then((savedMeal) => {
      newMeal = new Meal(this.mealPayload);
      return newMeal.save();
    }).then((savedMeal) => {
      return MealDAO.listByUserId(this.user._id);
    }).then((meals) => {
        should.exist(meals);
        meals.should.be.an('array');
        meals.length.should.be.above(0);

        done();
    }).catch(done);
  });

  it('should find a Meal by id', function (done) {
    let newMeal = new Meal(this.mealPayload);

    newMeal.save().then((meal) => {
      return MealDAO.findById(meal._id)
    }).then((mealFindId) => {
      should.exist(mealFindId);
      mealFindId._id.equals(newMeal._id).should.be.true;

      done();
    }).catch(done);
  });

  it('should not find an Meal by an id which does not exists', function (done) {
    MealDAO.findById('123456789012345678901234').then((meal) => {
      should.not.exist(meal);

      done();
    }).catch(done);
  });

  it('should list all Meals', function (done) {
    let newMeal = new Meal(this.mealPayload);

    newMeal.save().then((meal) => {
      newMeal = new Meal(this.mealPayload);

      return newMeal.save();
    }).then(() => {
      MealDAO.listDocuments().then(function (mealList) {
        mealList.should.be.an('array');
        mealList.length.should.be.above(0);

        done();
      }).catch(done);
    }).catch(done);
  });

  it('should return an empty list in case we have no Meals', function (done) {
    MealDAO.listDocuments().then(function (mealList) {
      mealList.should.be.an('array');
      mealList.length.should.be.equals(0);

      done();
    }).catch(done);
  });

  it('should delete a meal if I\'m the owner of this meal', function (done) {
    let newMeal = new Meal(this.mealPayload);

    newMeal.save().then((savedMeal) => {
      return MealDAO.deleteDocument(savedMeal._id, this.user._id, 'user');
    }).then((deletedMeal) => {
      should.exist(deletedMeal);

      done();
    }).catch(done);
  });

  it('should not be able to delete a meal if I\'m not the owner of this meal', function (done) {
    let newMeal = new Meal(this.mealPayload);

    newMeal.save().then((savedMeal) => {
      return MealDAO.deleteDocument(savedMeal._id, 'asda876&Sd6asd', 'user');
    }).then((deletedMeal) => {
      done(new Error('Should not be here'));
    }).catch((error) => {
      error.should.be.an('error');

      done();
    });
  });

  it('should update a Meal if I give the right ID', function (done) {
    let newMeal = new Meal(this.mealPayload);

    newMeal.save().then((meal) => {
      let newAttribute = {
        name: 'Andre123'
      };

      MealDAO.update(newMeal._id, newAttribute).then((updatedMeal) => {
        should.exist(updatedMeal);
        updatedMeal.name.should.be.equals(newAttribute.name);

        done();
      }).catch(done);
    }).catch(done);
  });

});
