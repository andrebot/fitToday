'use strict';

const {Router} = require('express');
const MealController = require('./mealController');
const Auth = require('../../helpers/auth');
const router = new Router();

router.route('/')
  .post(Auth.verifyRequestAuthentication, MealController.create())
  .get(Auth.verifyAdmin, MealController.listAll());

router.route('/myList')
  .get(Auth.verifyRequestAuthentication, MealController.getMyMeal());

router.route('/:id')
  .get(Auth.verifyRequestAuthentication, MealController.get())
  .put(Auth.verifyRequestAuthentication, MealController.update())
  .delete(Auth.verifyRequestAuthentication, MealController.deleteDocument());

module.exports = router;
