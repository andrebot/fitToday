'use strict';

describe('MenuList Directive', function () {

  beforeEach(module('fitToday'));

  beforeEach(inject(function (_$controller_) {
    this.$controller = _$controller_;
  }));

  describe('MenuList Controller', function () {
    beforeEach(function() {
      this.controller = this.$controller('homeController', {$scope: {meals: this.meals}});
    });
  });
});