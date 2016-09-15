(function () {
  'use strict';

  angular.module('fitToday.directives')
    .controller('MenuBarController', MenuBarController)
    .directive('menuBar', MenuBar);

  function MenuBar () {
    return {
      restrict: 'E',
      templateUrl: '/views/menuBar.html',
      controller: 'MenuBarController',
      controllerAs: 'vm'
    };
  }

  function MenuBarController ($rootScope, $mdDialog, $mdToast, $cookies, localStorageService, UserService) {
    var vm = this;

    vm.isLoggedIn = false;
    vm.userName = '';
    vm.documentElement = angular.element(document.body);

    vm.logOut = function (evt) {
      UserService.logOut(vm.logOutSuccess, vm.loggedResponse);
    };

    vm.logOutSuccess = function (error) {
      localStorageService.remove('localUser');

      vm.loggedOutResponse(error.data.msg);
    };

    vm.loggedResponse = function (response) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(response.msg)
          .hideDelay(3000)
      );

      vm.isLoggedIn = true;
      vm.userName = response.userName;
    };

    vm.loggedOutResponse = function (errorMsg) {
      if (errorMsg) {
        vm.errorResponse(errorMsg);

        vm.isLoggedIn = false;
        vm.userName = '';
      }
    };

    vm.openRegisterModal = function (evt) {
      $mdDialog.show({
        controller: 'registerController',
        controllerAs: 'vm',
        templateUrl: '/views/registerModal.html',
        parent: vm.documentElement,
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(vm.loggedResponse)
      .catch(vm.loggedOutResponse);
    };

    vm.openLoginModal = function (evt) {
      $mdDialog.show({
        controller: 'loginController',
        controllerAs: 'vm',
        templateUrl: '/views/loginModal.html',
        parent: vm.documentElement,
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(vm.loggedResponse)
      .catch(vm.loggedOutResponse);
    };

    vm.createMealResponse = function (response) {
      $rootScope.$broadcast('newMeal', response.meal);

      $mdToast.show(
        $mdToast.simple()
          .textContent(response.msg)
          .hideDelay(3000)
      );
    };

    vm.errorResponse = function (errorMsg) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(errorMsg)
          .hideDelay(3000)
      );
    };

    vm.openCreateMealModal = function (evt) {
      $mdDialog.show({
        controller: 'createMealController',
        controllerAs: 'vm',
        templateUrl: '/views/createMealModal.html',
        parent: vm.documentElement,
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(vm.createMealResponse)
      .catch(vm.errorResponse);
    };

    vm.verifyUserLoggedIn = function () {
      var localUser = $cookies.get('fittoday');

      if (localUser) {
        var userInfo = JSON.parse(atob(localUser.split('.')[1]));

        vm.isLoggedIn = true;
        vm.userName = userInfo.name;
      }
    };

    vm.verifyUserLoggedIn();

    vm.documentElement.ready(function () {
      //Wait everything to have set their listeners so we can broadcast.
      if (vm.isLoggedIn) {
        $rootScope.$broadcast('loggedIn');
      }
    });
  }
})();
