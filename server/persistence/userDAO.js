'user strict';

const User = require('../models/user');
const Logger = require('../helpers/logger');

/**
 * User Data Access Object. Here we manage all peristence layer actions and errors
 */
class UserDAO {
  /**
   * @constructor
   */
  constructor() {
    Logger.info('UserDAO: class instanciated.');
  }

  /**
   * Create a new user using the data provided.
   *
   * @public
   * @param payload {Object} should contain {name: required, email: required, password: required, role: optional}
   * @returns a promise to be comsumed
   */
  save(payload) {
    return new Promise(function (resolve, reject) {
      let newUser = new User(payload);
      newUser.save(payload).then(function (user) {
        Logger.info(`UserDAO: user ${user.name} created.`);

        resolve(user);
      }).catch(function (error) {
        Logger.error('UserDAO: Error while trying to save a new user.');
        Logger.error(error);

        reject(error);
      });
    });
  }

  /**
   * Find a user using an email.
   *
   * @public
   * @param email {String} the email which will be used to be searched
   * @returns a promise to be comsumed
   */
  findByEmail(email) {
    return new Promise(function (resolve, reject) {
      User.findOne({ email: email}).then(function (user) {
        if (user) {
          Logger.info('UserDAO: User found.');

          resolve(user);
        } else {
          Logger.info(`UserDAO: No user was found with this email: ${email}.`);

          resolve();
        }
      }).catch(function (error) {
        Logger.error(`UserDAO: Error while trying to fetch user with email ${email}.`);
        Logger.error(error);

        reject(error);
      });
    });
  }

  /**
   * List all users available
   *
   * @public
   * @returns a promise to be comsumed
   */
  listUsers() {
    return new Promise(function (resolve, reject) {
      User.find({}).then(function (users) {
        if (users && users.length > 0) {
          Logger.info(`UserDao: Returning ${users.length} the users.`);

          resolve(users);
        } else {
          Logger.info('UserDAO: no user were found.');

          resolve([]);
        }
      }).catch(function (error) {
        Logger.error('UserDAO: There was an error while trying to list all users.');
        Logger.error(error);

        reject(error);
      });
    });
  }
}

module.exports = new UserDAO();
