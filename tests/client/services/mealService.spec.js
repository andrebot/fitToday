'use strict';

describe('Services', function () {

  beforeEach(module('fitToday.services'));

  beforeEach(inject(function (_MealService_) {
    this.mealService = _MealService_;
  }));

  describe('Meal Service', function () {
    it('should have \'listMyMeals\' function', function () {
      should.exist(this.mealService.listMyMeals);
    });
  });
});
