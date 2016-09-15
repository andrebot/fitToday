(function () {
  'use strict';

  angular.module('fitToday.directives').controller('editMealController', EditMealController);

  function EditMealController ($mdDialog, MealService, meal) {
    var vm = this;

    vm.newMeal = {
      name: '',
      description: '',
      calories: 0,
      when: 0,
      _id: meal._id
    };

    vm.oldMeal = meal;

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.saveSuccess = function (meal) {
      vm.newMeal = meal;
      $mdDialog.hide(vm.newMeal);
    };

    vm.saveFail = function (error) {
      $mdDialog.cancel('There was an internal error. Please try again later.');
    };

    vm.save = function () {
      MealService.save(vm.newMeal, vm.saveSuccess, vm.saveFail);
    };
  }

})();
