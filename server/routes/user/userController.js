'use strict';

const Auth = require('../../helpers/auth');
const Controller = require('../controller');
const config = require('../../config/config');
const UserDAO = require('../persistence/userDAO');

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
      id: user._id
    };

    const token = Auth.createToken(payload);

    response.cookie(config.COOKIE_NAME, token);

    return payload;
  }

  /**
   * Handler for create user route. It will get the user cerdentials from the request body
   * and then it will try to create a new user.
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  createUser() {
    return (request, response) => {
      let credentials = request.body;

      if (credentials.email && credentials.name && credentials.password) {
        UserDAO.save({
          name: credentials.name,
          email: cerdentials.email,
          password: credentials.password
        }).then((user) => {

          this.logger.info(`${this.logPrefix}: User created and logged in.`);
          response.json(this._createToken(user, response));

        }).catch((error) => {
          this.logger.error(`${this.logPrefix}: could not authenticate the user.`);

          response.sendStatus(500).json({error: error.message});
        });
      } else {
        const msg = 'missing information.';

        this.logger.error(`${this.logPrefix}: ${msg}`);

        response.sendStatus(400).json({error: msg});
      }
    }
  }

  /**
   * Handler for log in user route. It will get the user cerdentials from the request body
   * and then it will try to find and login this user.
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  loginUser() {
    return (request, response) {
      let credentials = request.body;

      if (credentials.email && credentials.password) {
        UserDAO.findByEmail(credentials.email).then((user) => {
          if (user) {
            user.comparePassword(credentials.password).then((isMatch) => {
              if (isMatch) {
                this.logger.info(`${this.logPrefix}: User logged in.`);
                response.json(this._createToken(user, response));
              } else {
                this.logger.info(`${this.logPrefix}: wrong password.`);

                response.sendStatus(400).json({error: 'wrong password.'});
              }
            })
          } else {
            response.sendStatus(400).json({error: `no user with this email: ${credentials.email}`});
          }
        }).catch((error) => {
          response.sendStatus(500).json({error: error.msg});
        });
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
    return (request, response) {
      response.clearCookie(config.COOKIE_NAME);

      response.sendStatus(200).json({data: {msg: 'loged out'}});
    }
  }

  /**
   * Handler for get user route. It will fetch an user by id which was provided
   * in the url. e.g: /user/123
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  getUser() {
    return (request, response) {
      UserDAO.findById(request.params.id).then((user) => {
        if (user) {
          response.json(user);
        } else {
          response.sendStatus(400).json({error: `no user with this ID: ${request.params.id}`});
        }
      }).catch((error) => {
        response.sendStatus(500).json({error: error.msg});
      });
    }
  }

  /**
   * Handler for get user route. It will fetch an user by id which was provided
   * in the url. e.g: /user/123
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  updateUser() {
    return (request, response) {
      let newInfo = request.body;

      UserDAO.update(newInfo, request.params.id).then(function (updatedUser) {
        response.json(updatedUser);
      }).catch((error) => {
        response.sendStatus(500).json({error: error.msg});
      });
    }
  }
}

module.exports = new UserController();
