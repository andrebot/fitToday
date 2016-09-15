(function () {
  'use strict';

  angular.module('fitToday.directives')
    .controller('mealController', MealController)
    .directive('meal', Meal);

  function Meal () {
    return {
      restrict: 'E',
      scope: {
        mealId: '=mealId'
      },
      templateUrl: '/views/meal.html',
      controller: 'mealController',
      controllerAs: 'vm'
    };
  }

  function MealController ($scope, $mdDialog, $mdToast, MealService) {
    var vm = this;
    var defautMeal = {
      name: '',
      description: '',
      calories: 0
    };

    vm.meal = defautMeal;

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

    vm.loadMeal = function () {
      MealService.get({_id: $scope.mealId}, vm.getMealSuccess, vm.responseFail);
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

    vm.removeSuccess = function (meal) {
      $scope.$destroy();
      angular.element(document.querySelector('#meal-' + $scope.mealId)).remove();
    };

    vm.removeMeal = function () {
      MealService.delete({_id: $scope.mealId}, vm.removeSuccess, vm.responseFail)
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

    vm.loadMeal();
  }
})();
