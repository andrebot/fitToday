(function () {
  'use strict';

  angular.module('fitToday.directives').controller('editMealController', EditMealController);

  function EditMealController ($mdDialog, MealService, meal) {
    var vm = this;

    vm.newMeal = {
      name: meal.name,
      description: meal.description,
      calories: meal.calories,
      when: new Date(meal.when),
      _id: meal._id
    };

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.saveSuccess = function (savedMeal) {
      $mdDialog.hide(savedMeal);
    };

    vm.saveFail = function (error) {
      $mdDialog.cancel('There was an internal error. Please try again later.');
    };

    vm.save = function () {
      MealService.update(vm.newMeal, vm.saveSuccess, vm.saveFail);
    };
  }

})();
