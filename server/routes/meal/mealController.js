'use strict';

const Controller = require('../controller');
const Logger = require('../../helpers/logger');
const config = require('../../config');
const MealDAO = require('../persistence/mealDAO');

/**
 * Controller responsible for authenticating the user
 */
class MealController extends Controller {

  /**
   * @constructor
   */
  constructor() {
    super('MealController');
  }

  /**
   * Handler for listing user's meals.
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  getMyMeal() {
    return (request, response) => {
      MealDAO.listByUserId(request.toke.userId).then((meals) => {
        Logger.info(`${this.logPrefix}: Fecthed all the meals.`);

        response.json(meals);
      }).catch(this._sendErrorMsg(response, 'Error while listing all user\'s meals.'));
    };
  }
}

module.exports = new MealController();
