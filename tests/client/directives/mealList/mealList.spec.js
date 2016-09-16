'use strict';

describe('MenuList Directive', function () {

  beforeEach(module('fitToday.directives'));

  beforeEach(inject(function (_$controller_) {
    this.$controller = _$controller_;

    this.meals = [{
      calories: 10
    },{
      calories: 20
    }];
  }));

  describe('MenuList Controller', function () {
    beforeEach(function() {
      this.controller = this.$controller('mealListController', {$scope: {meals: this.meals}});
    });

    it('should sum up the calories values', function () {
      var total = this.controller.getTotalCalories();

      total.should.be.above(0);
    });
  });
});