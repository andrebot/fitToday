(function () {
  'use strict';

  angular.module('fitToday.directives')
    .controller('mealController', MealController)
    .directive('meal', Meal);

  function Meal () {
    return {
      restrict: 'E',
      scope: {
        meal: '=meal'
      },
      templateUrl: '/views/meal.html',
      controller: 'mealController',
      controllerAs: 'vm'
    };
  }

  function MealController ($rootScope, $scope, $mdDialog, $mdToast, MealService) {
    var vm = this;
    var defautMeal = {
      name: '',
      description: '',
      calories: 0,
      when: 0
    };

    vm.meal = $scope.meal;

    vm.getMealSuccess = function (meal) {
      vm.meal = meal;

      $mdToast.show(
        $mdToast.simple()
            .textContent('Meal was saved successfully.')
            .hideDelay(3000)
      );
    };

    vm.responseFail = function (error) {
      $mdToast.show(
        $mdToast.simple()
            .textContent(error.msg || 'There was an error on the server. Try again later.')
            .hideDelay(3000)
      );

      vm.meal = defautMeal;
    };

    vm.editSuccess = function (meal) {
      if (meal) {
        vm.meal = meal;

        $mdToast.show(
          $mdToast.simple()
              .textContent('Meal was saved successfully.')
              .hideDelay(3000)
        );
      }
    };

    vm.removeSuccess = function () {
      $rootScope.$broadcast('removeMeal', vm.meal);
    };

    vm.removeMeal = function () {
      vm.meal.$delete(vm.removeSuccess, vm.responseFail)
    };

    vm.editMeal = function (evt) {
      $mdDialog.show({
        controller: 'editMealController',
        controllerAs: 'vm',
        templateUrl: '/views/editMealModal.html',
        locals: {
          meal: vm.meal
        },
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(vm.editSuccess)
      .catch(vm.responseFail);
    };
  }
})();
