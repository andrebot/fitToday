(function () {
  'use strict';

  angular.module('fitToday.directives')
    .controller('MenuBarController', MenuBarController)
    .directive('menuBar', MenuBar);

  function MenuBar () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/views/menuBar.html',
      controller: 'MenuBarController',
      controllerAs: 'vm'
    };
  }

  function MenuBarController ($mdDialog, $mdToast, localStorageService, UserService) {
    var vm = this;

    vm.isLoggedIn = false;
    vm.userName = '';

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
        $mdToast.show(
          $mdToast.simple()
            .textContent(errorMsg)
            .hideDelay(3000)
        );

        vm.isLoggedIn = false;
        vm.userName = '';
      }
    }

    vm.openRegisterModal = function (evt) {
      $mdDialog.show({
        controller: 'registerController',
        controllerAs: 'vm',
        templateUrl: '/views/registerModal.html',
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(vm.loggedResponse)
      .catch(vm.loggedOutResponse);
    }

    vm.openLoginModal = function (evt) {
      $mdDialog.show({
        controller: 'loginController',
        controllerAs: 'vm',
        templateUrl: '/views/loginModal.html',
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(vm.loggedResponse)
      .catch(vm.loggedOutResponse);
    }
  }
})();
