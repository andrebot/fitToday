(function() {
  'use strict';

  angular.module('fitToday.services').factory('UserService', UserService);

  function UserService ($resource) {
    return $resource('/api/v1/user/:id', { id: '@_id'}, {
      'logIn': {
        method: 'POST',
        url: '/api/v1/user/login'
      },
      'logOut': {
        method: 'POST',
        url: '/api/v1/user/logout'
      }
    });
  }
})();
