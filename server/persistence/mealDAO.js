'user strict';

const Meal = require('../models/meal');
const DataAccessObject = require('./DataAccessObject');
const Logger = require('../helpers/logger');

/**
 * User Data Access Object. Here we manage all peristence layer actions and errors
 */
class MealDAO extends DataAccessObject{
  /**
   * @constructor
   */
  constructor() {
    super('MealDAO', Meal);

    Logger.info(`${this.logPrefix}: class instanciated.`);
  }

  /**
   * Find a user using an email.
   *
   * @public
   * @param userId {String} the id which will be used in the searched
   * @returns a promise to be comsumed
   */
  listByUserId(userId) {
    return this.listDocumentsByAttributes({user: userId});
  }
}

module.exports = new MealDAO();
