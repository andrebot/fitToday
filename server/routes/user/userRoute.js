'use strict';

const {Router} = require('express');
const UserController = require('./userController');
const Auth = require('../../helpers/auth');
const router = new Router();

router.route('/')
  .post(UserController.create())
  .get(Auth.verifyAdmin, UserController.listAll());

router.route('/:id')
  .get(Auth.verifyRequestAuthentication, UserController.get())
  .put(Auth.verifyRequestAuthentication, UserController.update())
  .delete(Auth.verifyAdmin, UserController.deleteDocument());

router.route('/login')
  .post(UserController.loginUser());

router.route('/logout')
  .post(UserController.logoutUser());

module.exports = router;