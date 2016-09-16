(function () {
  'use strict';

  angular.module('fitToday.directives').controller('createMealController', CreateMealController);

  function CreateMealController (MealService, $mdDialog) {
    var vm = this;

    vm.meal = {
      name: '',
      description: '',
      calories: 0,
      when: 0
    };

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.createSuccess = function (meal) {
      console.log('this is it', meal);
      $mdDialog.hide({meal: meal, msg: 'Meal created successfully'});
    };

    vm.createFail = function (error) {
      $mdDialog.cancel('There was an error creating meal.');
    };

    vm.create = function () {
      MealService.save(vm.meal, vm.createSuccess, vm.createFail);
    };
  }

})();
