'use strict';

const {Router} = require('express');
const AuthController = require('../controllers/authController');
const router = new Router();

router.route('/login')
  .post();