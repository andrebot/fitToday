'user strict';

const User = require('../models/user');
const DataAccessObject = require('./DataAccessObject');
const Logger = require('../helpers/logger');

/**
 * User Data Access Object. Here we manage all peristence layer actions and errors
 */
class UserDAO extends DataAccessObject{
  /**
   * @constructor
   */
  constructor() {
    super('UserDAO', User);

    Logger.info(`${this.logPrefix}: class instanciated.`);
  }

  /**
   * Find a user using an email.
   *
   * @public
   * @param email {String} the email which will be used to be searched
   * @returns a promise to be comsumed
   */
  findByEmail(email) {
    return this.findByAttributes({email: email});
  }
}

module.exports = new UserDAO();
