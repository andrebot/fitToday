(function () {
  'use strict';

  angular.module('fitToday').controller('homeController', HomeController);

  function HomeController ($scope, MealService, $mdToast) {
    var vm = this;
    vm.dateMeals = {};

    $scope.$on('loggedIn', vm.handleLoggedIn);

    $scope.$on('newMeal', vm.handleAddMeal);

    $scope.$on('removeMeal', vm.removeMeal);

    vm.handleLoggedIn = function (evt) {
      MealService.listMyMeals(vm.listMealsSuccess, vm.listMealsError);
    };

    vm.handleAddMeal = function (evt, newMeal) {
      vm.addMeal(newMeal);
    };

    vm.removeMeal = function (evt, meal) {
      let meals = vm.dateMeals[meal.when].meals;

      meals.splice(meals.indexOf(meal), 1);
    };

    vm.addMeal = function (meal) {
      if (vm.dateMeals[meal.when]) {
        vm.dateMeals[meal.when].meals.push(meal);
      } else {
        vm.dateMeals[meal.when] = {
          meals: [meal]
        };
      }
    };

    vm.listMealsSuccess = function (meals) {
      meals.forEach(function(meal) {
        vm.addMeal(meal);
      });
    };

    vm.listMealsError = function (error) {
      $mdToast.show(
        $mdToast.simple()
            .textContent('Could not get your meals list. Try again later.')
            .hideDelay(3000)
      );
    };
  }
})();
