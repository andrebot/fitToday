'use strict';

const Controller = require('../controller');
const Logger = require('../../helpers/logger');
const config = require('../../config');
const MealDAO = require('../../persistence/mealDAO');

/**
 * Controller responsible for authenticating the user
 */
class MealController extends Controller {

  /**
   * @constructor
   */
  constructor() {
    super('MealController', MealDAO);
  }

  create() {
    return (request, response) => {
      let meal = request.body;
      meal.user = request.token.user_id;

      this.modelDAO.save(meal).then((document) => {
        Logger.info(`${this.logPrefix}: Document created`);

        response.json(document);
      }).catch(this._sendErrorMsg(response, 'Error while creating a document.'));
    }
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
      MealDAO.listByUserId(request.token.user_id).then((meals) => {
        Logger.info(`${this.logPrefix}: Fecthed all the meals.`);

        response.json(meals);
      }).catch(this._sendErrorMsg(response, 'Error while listing all user\'s meals.'));
    };
  }
}

module.exports = new MealController();
