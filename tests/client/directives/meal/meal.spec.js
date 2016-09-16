'use strict';

describe('Meal Directive', function () {

  beforeEach(module('fitToday.directives'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$mdDialog_, _$mdToast_, _MealService_) {
    this.$controller = _$controller_;
    this.mealService = _MealService_;
    this.mdToast = _$mdToast_;
    this.mdDialog = _$mdDialog_;
    this.rootScope = _$rootScope_;

    this.mealPayload = {
      name: 'test',
      description: 'test123',
      calories: 23012,
      when: Date.now(),
      $delete: sinon.spy()
    };

    sinon.spy(this.mealService, 'get');
    sinon.spy(this.mealService, 'delete');
    sinon.spy(this.mealService, 'save');
    sinon.spy(this.mdToast, 'show');
    sinon.spy(this.mdToast, 'simple');
    sinon.spy(this.mdDialog, 'show');
    sinon.spy(this.mdDialog, 'hide');
    sinon.spy(this.mdDialog, 'cancel');
    sinon.spy(this.rootScope, '$broadcast');
  }));

  describe('Meal Controller', function () {
    beforeEach(function() {
      this.scope = {
        meal: this.mealPayload
      };

      this.controller = this.$controller('mealController', {$scope: this.scope});
    });

    it('should initialize with a given meal', function () {
      should.exist(this.controller.meal);
      this.controller.meal.name.should.not.be.empty;
      this.controller.meal.description.should.not.be.empty;
      this.controller.meal.calories.should.be.above(0);
      this.controller.meal.when.should.be.above(0);
    });

    it('should set the controller meal and toast a msg of success', function () {
      this.controller.getMealSuccess(this.mealPayload);

      this.mdToast.show.should.have.been.calledOnce;
      this.mdToast.simple.should.have.been.calledOnce;
      this.controller.meal.name.should.not.be.empty;
      this.controller.meal.description.should.not.be.empty;
      this.controller.meal.calories.should.be.above(0);
      this.controller.meal.when.should.be.above(0);
    });

    it('should toast an error message at any response and clear meal', function () {
      this.controller.responseFail({
        msg: 'test error'
      });

      this.mdToast.show.should.have.been.calledOnce;
      this.mdToast.simple.should.have.been.calledOnce;
      this.controller.meal.name.should.be.empty;
      this.controller.meal.description.should.be.empty;
      this.controller.meal.calories.should.be.equal(0);
      this.controller.meal.when.should.be.equal(0);
    });

    it('should toast a message if we eddited the meal successfully and update meal', function () {
      this.controller.editSuccess({
        name: 'test',
        description: 'dummy',
        calories: 3
      });

      this.mdToast.show.should.have.been.calledOnce;
      this.mdToast.simple.should.have.been.calledOnce;
      this.controller.meal.name.should.not.be.empty;
      this.controller.meal.description.should.not.be.empty;
      this.controller.meal.calories.should.be.above(0);
    });

    it('should do nothing if we are just closing the edit modal', function () {
      this.controller.editSuccess();

      this.mdToast.show.should.have.not.been.called;
      this.mdToast.simple.should.have.not.been.called;
    });

    it('should broadcast a \'removeMeal\' event after successfully removed a meal', function () {
      this.controller.removeSuccess();

      this.rootScope.$broadcast.should.have.been.calledOnce;
      this.rootScope.$broadcast.should.have.been.calledWith('removeMeal');
    });

    it('should call the remove meal endpoint', function() {
      this.controller.removeMeal();

      this.controller.meal.$delete.should.have.been.calledOnce;
    });

    it('should open the edit meal modal', function () {
      this.controller.editMeal();

      this.mdDialog.show.should.have.been.calledOnce;
    });
  });

  describe('Edit Meal Controller', function () {
    beforeEach(function () {
      this.oldMeal = {
        name: 'test',
        description: 'description',
        calories: 12,
        when: Date.now(),
        _id: 'as123f'
      };

      this.controller = this.$controller('editMealController', {$scope: this.scope, meal: this.oldMeal});
    });

    it('should initialize its variables as empty', function () {
      this.controller.newMeal.name.should.be.empty;
      this.controller.newMeal.description.should.be.empty;
      this.controller.newMeal.calories.should.be.equal(0);
      this.controller.newMeal.when.should.be.equal(0);
      this.controller.newMeal._id.should.not.be.empty;

      this.controller.oldMeal.name.should.not.be.empty;
    });

    it('should close the window', function () {
      this.controller.hide();

      this.mdDialog.hide.should.have.be.calledOnce;
    });

    it('should update its meal model and close the window with the new data', function () {
      this.controller.saveSuccess(this.oldMeal);

      this.controller.newMeal.name.should.not.be.empty;
      this.controller.newMeal.description.should.not.be.empty;
      this.controller.newMeal._id.should.not.be.empty;
      this.controller.newMeal.calories.should.be.above(0);
      this.controller.newMeal.when.should.be.above(0);

      this.mdDialog.hide.should.have.been.calledWith(this.oldMeal);
    });

    it('should close the modal and send an error message', function() {
      this.controller.saveFail();

      this.mdDialog.cancel.should.have.been.calledOnce;
    });

    it('should call the save meal endpoint', function () {
      this.controller.save();

      this.mealService.save.should.have.been.calledOnce;
    });
  });
});
