(function () {
  'use strict';

  angular.module('fitToday.directives').directive('menuBar', MenuBar);

  function MenuBar () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '/views/menuBar.html',
      controller: MenuBarController,
      controllerAs: 'vm'
    };
  }

  function MenuBarController ($mdDialog, $mdToast) {
    var vm = this;
  
    vm.pinTo = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

    vm.openRegisterModal = function (evt) {
      
    }

    vm.openLoginModal = function (evt) {
      $mdDialog.show({
        controller: LoginController,
        controllerAs: 'vm',
        templateUrl: '/views/loginModal.html',
        parent: angular.element(document.body),
        targetEvent: evt,
        clickOutsideToClose: true,
        fullscreen: false
      }).then(function (isLoggedIn) {
        if (isLoggedIn) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('You\'ve succesfully Logged in!.')
              .position(vm.pinTo)
              .hideDelay(3000)
          );
        } else {
          $mdToast.show(
            $mdToast.simple()
              .textContent('There was an error logging in.')
              .position(vm.pinTo)
              .hideDelay(3000)
          );
        }
      }).catch(function () {
        
      });
    }
  }

  function LoginController ($mdDialog) {
    var vm = this;

    vm.login = {
      email: '',
      password: ''
    };

    vm.hide = function () {
      $mdDialog.cancel();
    };

    vm.logIn = function () {
      console.log(vm.login);
    }
  }
})();
