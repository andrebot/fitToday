'use strict';

const Logger = require('../../helpers/logger');
const Validators = require('../../helpers/validators');

class Controller {
  constructor(logPrefix, modelDAO) {
    this.logPrefix = logPrefix;
    this.validators = Validators;
    this.modelDAO = modelDAO;

    Logger.info(`${this.logPrefix}: Controller instanciated`);
  }

  /**
   * Sends error message to the client.
   *
   * @private
   * @param response {Object} express response Object
   * @param msg {String} message to be displayed for error
   * @returns {Function} function to be executed with the error thrown
   */
  _sendErrorMsg(response, msg) {
    return (error) => {
      Logger.error(`${this.logPrefix}: ${msg}`);

      response.sendStatus(500).json({error: error.message});
    };
  }

  /**
   * Handler for create model route. It will get the data from the request body
   * and then it will try to create a new model.
   *
   * @public
   * 
   * @return {function} route handler for login
   */
  create() {
    return (request, response) => {
      this.modelDAO.save(request.body).then((document) => {
        Logger.info(`${this.logPrefix}: Document created`);

        response.json(document);
      }).catch(this._sendErrorMsg(response, 'Error while creating a document.'));
    }
  }

  /**
   * Handler for list all documents.
   *
   * @public
   * 
   * @return {function} route handler for listing all documents
   */
  listAll() {
    return (request, response) {
      this.modelDAO.listDocuments().then((documents) => {
        Logger.info(`${this.logPrefix}: All documents fetched.`);

        response.json(documents);
      }).catch(this._sendErrorMsg(response, 'There was an error listing documents.'));
    }
  }

  /**
   * Handler to fetch a document.
   *
   * @public
   * 
   * @return {function} route handler for fetching a document
   */
  get() {
    return (request, response) {
      this.modelDAO.findById(request.params.id).then((document) => {
        Logger.info(`${this.logPrefix}: Document was fetched.`);

        response.json(document);
      }).catch(this._sendErrorMsg(response, 'There was an error fetching a document.'));
    }
  }

  /**
   * Handler to update a document.
   *
   * @public
   * 
   * @return {function} route handler for fetching a document
   */
  update() {
    return (request, response) {
      this.modelDAO.update(request.params.id, request.body).then((document) => {
        Logger.info(`${this.logPrefix}: Document was updated.`);

        response.json(document);
      }).catch(this._sendErrorMsg(response, 'There was an error updating a document.'));
    }
  }

  /**
   * Handler to delete a document.
   *
   * @public
   * 
   * @return {function} route handler for fetching a document
   */
  deleteDocument() {
    return (request, response) {
      this.modelDAO.deleteDocument(request.params.id).then((deletedDocument) => {
        if (deletedDocument) {
          Logger.info(`${this.logPrefix}: Document #${deletedDocument._id} deleted successfully.`);

          response.json(deletedDocument);
        }
      }).catch(this._sendErrorMsg(response, 'There was an error deleting a document.'))
    }
  }
}

module.exports = Controller;
