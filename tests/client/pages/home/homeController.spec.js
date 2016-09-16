'use strict';

describe('Home Page Controller', function () {

  beforeEach(module('fitToday'));

  beforeEach(inject(function (_$controller_, _MealService_, _$mdToast_) {
    this.$controller = _$controller_;
    this.mdToast = _$mdToast_;
    this.mealService = _MealService_;

    sinon.spy(this.mdToast, 'show');
    sinon.spy(this.mdToast, 'simple');
    sinon.spy(this.mealService, 'listMyMeals');

    this.scope = {
      $on: sinon.spy()
    };
  }));

  describe('Configuration', function () {
    beforeEach(function() {
      this.controller = this.$controller('homeController', {$scope: this.scope});
    });

    it('should hook up all the events on $scope', function () {
      this.scope.$on.should.have.been.calledThrice;
      this.scope.$on.should.have.been.calledWith('loggedIn');
      this.scope.$on.should.have.been.calledWith('newMeal');
      this.scope.$on.should.have.been.calledWith('removeMeal');

      should.exist(this.controller.dateMeals);
    });
  });

  describe('Actions', function () {
    beforeEach(function() {
      this.controller = this.$controller('homeController', {$scope: this.scope});
    });

    it('should toast an error message', function () {
      this.controller.listMealsError();

      this.mdToast.show.should.have.been.calledOnce;
      this.mdToast.simple.should.have.been.calledOnce;
    });

    it('should add all meals to the controller', function () {
      sinon.spy(this.controller, 'addMeal');

      this.controller.listMealsSuccess([{},{},{}]);

      this.controller.addMeal.should.have.been.calledThrice;
    });

    it('should add a meal as part of the meals of the day if that date already existed', function () {
      this.controller.dateMeals = {0: {meals: []}};

      this.controller.addMeal({when: 0});

      this.controller.dateMeals[0].meals.length.should.be.above(0);
    });

    it('should create a dateMeal if the meal\'ss date is not yet added to the controller', function () {
      should.not.exist(this.controller.dateMeals[0]);

      this.controller.addMeal({when: 0});

      this.controller.dateMeals[0].meals.length.should.be.above(0);
    });

    it('should remove a meal from the meals array if \'removeMeal\' triggers', function () {
      let meal1 = {
        name: 'name1',
        when: 0
      };

      let meal2 = {
        name: 'name2',
        when: 0
      };

      this.controller.dateMeals[0] = {
        meals: [meal1, meal2]
      };

      this.controller.dateMeals[0].meals.length.should.be.equal(2);

      this.controller.removeMeal(null, meal2);

      this.controller.dateMeals[0].meals.length.should.be.below(2);
      this.controller.dateMeals[0].meals[0].name.should.be.equal(meal1.name);
    });

    it('should call addMeal if the \'newMeal\' even triggers', function () {
      sinon.spy(this.controller, 'addMeal');

      this.controller.handleAddMeal(null, {});

      this.controller.addMeal.should.have.been.calledOnce;
    });

    it('should list all user\'s meals if the he logged in', function () {
      this.controller.handleLoggedIn(null);

      this.mealService.listMyMeals.should.have.been.calledOnce;
    });
  });
});
