(function () {
  'use strict';

  var dependencies = ['ngMaterial', 
                      'ngRoute',
                      'LocalStorageModule',
                      'fitToday.directives',
                      'fitToday.services'];

  angular.module('fitToday', dependencies)
         .config(routeConfig);

  function routeConfig ($routeProvider, localStorageServiceProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: 'views/home.html'
      });

    localStorageServiceProvider.setPrefix('fitToday');
  }

})();
