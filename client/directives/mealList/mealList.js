(function () {
  'use strict';

  angular.module('fitToday.directives')
    .controller('mealListController', MealListController)
    .directive('mealList', MealList);

  function MealList () {
    return {
      restrict: 'E',
      scope: {
        date: '=date',
        meals: '=meals'
      },
      templateUrl: '/views/mealList.html',
      controller: 'mealListController',
      controllerAs: 'vm'
    };
  }

  function MealListController ($scope) {
    var vm = this;

    vm.getTotalCalories = function () {
      let total = 0;
      $scope.meals.forEach(function (meal) {
        total += meal.calories;
      });

      return total;
    };
  };
})();
