(function () {
  'use strict';

  var dependencies = ['ngMaterial', 
                      'ngRoute',
                      'fitToday.directives'];

  angular.module('fitToday', dependencies)
         .config(routeConfig);

  function routeConfig ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'homeController',
        templateUrl: 'views/home.html'
      });
  }

})();
