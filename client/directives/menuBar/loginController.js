(function () {
  'use strict';

  angular.module('fitToday.directives').controller('loginController', LoginController);

  function LoginController ($mdDialog, UserService, localStorageService) {
    var vm = this;

    vm.login = {
      email: '',
      password: ''
    };

    vm.hide = function () {
      $mdDialog.cancel();
    };

    vm.loginSuccessful = function (userData) {
      localStorageService.remove('localUser');

      var storedInfo = localStorageService.set('localUser', JSON.stringify({
        email: userData.email,
        name: userData.name,
        role: userData.role,
        id: userData.user_id
      }));

      if (storedInfo) {
        $mdDialog.hide({
          userName: userData.name,
          msg: 'You were successfully logged in!'
        });
      } else {
        $mdDialog.cancel('Could not save data into your browser. Enable cookies or update your browser.');
      }
    }

    vm.loginFail = function (error) {
      $mdDialog.cancel('There was an internal error. Please try again later.');
    };

    vm.logIn = function () {
      UserService.logIn(vm.login, vm.loginSuccessful, vm.loginFail);
    };
  }
})();
