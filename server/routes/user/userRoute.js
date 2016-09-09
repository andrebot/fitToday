'use strict';

const {Router} = require('express');
const UserController = require('./userController');
const Auth = require('../../helpers/auth');
const router = new Router();

router.route('/')
  .post(UserController.createUser())
  .get(Auth.verifyAdmin, UserController.listUsers());

router.route('/:id')
  .get(Auth.verifyRequestAuthentication, UserController.getUser())
  .put(Auth.verifyRequestAuthentication, UserController.updateUser())
  .delete(Auth.verifyAdmin, UserController.deleteUser());

router.route('/login')
  .post(UserController.loginUser());

router.route('/logout')
  .post(UserController.logoutUser());

module.exports = router;