'use strict';

const Auth = require('../../helpers/auth');
const Controller = require('../controller');
const config = require('../../config');
const UserDAO = require('../../persistence/userDAO');
const Logger = require('../../helpers/logger');

/**
 * Controller responsible for authenticating the user
 */
class UserController extends Controller {

  /**
   * @constructor
   */
  constructor() {
    super('UserController');
  }

  /**
   * Create and adds the new token into the response (client).
   *
   * @private
   * @param user {Object} Database user with {email: String, name: String, role: String}
   * @param response {Object} express' response object
   * @returns {object} the payload used to create the token
   */
  _createToken(user, response) {
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      user_id: user._id
    };

    const token = Auth.createToken(payload);

    response.cookie(config.COOKIE_NAME, token);

    return payload;
  }

  /**
   * Validates client's user data. We need to have matching passwords (password and confirm)
   * so we can create a new user.
   *
   * @private
   * @param credentials {Object} contains user's credentials {email, name, password, confirmPassword}
   * @return {Boolean} if all data is there.
   */
  _validateCredentials({email, name, password, confirmPassword}) {
    if (email && name && password && confirmPassword && password === confirmPassword) {
      return true
    }

    return false;
  }

  /**
   * Handler for create user route. It will get the user credentials from the request body
   * and then it will try to create a new user.
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  create() {
    return (request, response) => {
      let credentials = request.body;

      if (this._validateCredentials(credentials)) {
        UserDAO.save({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        }).then((user) => {

          Logger.info(`${this.logPrefix}: User created and logged in.`);
          response.json(this._createToken(user, response));

        }).catch((error) => {
          Logger.error(`${this.logPrefix}: could not authenticate the user.`);

          let errorObj = {
            message: error.message,
            errors: []
          };

          for (let key in error.errors) {
            const err = error.errors[key];

            Logger.error(`${this.logPrefix}: ${err.ValidatorError}`);

            errorObj.errors.push({
              message: err.message,
              input: err.path
            });
          }

          response.status(500).json(errorObj);
        });
      } else {
        const msg = 'missing information.';

        Logger.error(`${this.logPrefix}: ${msg}`);

        response.status(400).json({error: msg});
      }
    }
  }

  /**
   * Handler for log in user route. It will get the user credentials from the request body
   * and then it will try to find and login this user.
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  loginUser() {
    return (request, response) => {
      let credentials = request.body;

      if (credentials.email && credentials.password) {
        UserDAO.findByEmail(credentials.email).then((user) => {
          if (user) {
            user.comparePassword(credentials.password).then((isMatch) => {
              if (isMatch) {
                Logger.info(`${this.logPrefix}: User logged in.`);

                response.json(this._createToken(user, response));
              } else {
                Logger.info(`${this.logPrefix}: wrong password.`);

                response.status(400).json({error: 'wrong password.'});
              }
            })
          } else {
            response.status(400).json({error: `no user with this email: ${credentials.email}`});
          }
        }).catch(this._sendErrorMsg(response, 'could not authenticate the user.'));
      }
    }
  }

  /**
   * Handler for log out user route. It will only remove cookie from the client
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  logoutUser() {
    return (request, response) => {
      response.clearCookie(config.COOKIE_NAME);

      Logger.info(`${this.logPrefix}: user was successfully logged out.`);
      response.status(200).json({data: {msg: 'loged out'}});
    }
  }
}

module.exports = new UserController();
