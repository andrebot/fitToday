(function () {
  'use strict';

  angular.module('fitToday.services').factory('MealService', MealService);

  function MealService ($resource) {
    return $resource('/api/v1/meal/:id', { id: '@_id'}, {
      listMyMeals: {
        method: 'GET',
        url: '/api/v1/meal/myList/',
        isArray: true
      }
    });
  }
})();
