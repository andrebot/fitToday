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

  /**
   * Delete a meal using its ID. However, only the owner or the admin can delete it.
   *
   * @public
   * @param mealId {String} meals' ID
   * @param userId {String} user's id who is trying to delete this meal
   * @param role {String} user's role
   * @returns a promise to be comsumed
   */
  deleteDocument(mealId, userId, role) {
    return new Promise((resolve, reject) => {
      this.findById(mealId).then((meal) => {
        if (role === 'admin' || meal.user.equals(userId)) {
          meal.remove((error, deleted) => {
            if (error) {
              this._logErrorFromDB(reject, 'There was an error while deleting a document.')(error);
              
            } else {
              Logger.info(`${this.logPrefix}: Document #${deleted._id} was deleted`);
              resolve(deleted);
            }
          });
        } else {
          this._logErrorFromDB(reject, 'You are not allowed to delete someone else\'s meal.')(new Error('Business error'));
        }
      }).catch(reject);
    });
  }
}

module.exports = new MealDAO();
