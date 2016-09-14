(function () {
  'use strict';

  angular.module('fitToday.directives').controller('registerController', RegisterController);

  function RegisterController ($mdDialog, UserService, localStorageService) {
    var vm = this;

    vm.user = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    vm.hide = function () {
      $mdDialog.cancel();
    };

    vm.registerSuccess = function (userData) {
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
    };

    vm.registerFail = function (error) {
      $mdDialog.cancel('There was an internal error. Please try again later.');
    };

    vm.register = function () {
      UserService.save(vm.user, vm.registerSuccess, vm.registerFail);
    };
  }
})();
