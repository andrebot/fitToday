'user strict';

const Logger = require('../helpers/logger');

/**
 * User Data Access Object. Here we manage all peristence layer actions and errors
 */
class DataAccessObject {
  /**
   * @constructor
   */
  constructor(logPrefix, model) {
    this.logPrefix = logPrefix;
    this.model = model;
  }

  /**
   * Log messages and rejects a promise after an error occurs.
   *
   * @private
   * @param reject {Function} reject function from a promise
   * @param msg {String} error message to be displayed in case something goes wrong
   * @returns {Function} to be executed when an error occurs
   */
  _logErrorFromDB(reject, msg) {
    return (error) => {
      Logger.error(`${this.logPrefix}: ${msg}`);
      Logger.error(error);

      for (let mongoError in error.errors) {
        Logger.error(mongoError);
      }

      reject(error);
    }
  }

  /**
   * Create a new model using the data provided.
   *
   * @public
   * @param payload {Object} Object with the data to be saved
   * @returns a promise to be comsumed
   */
  save(payload) {
    return new Promise((resolve, reject) => {
      let newModel = new this.model(payload);
      newModel.save().then((savedModel) => {
        Logger.info(`${this.logPrefix}: Model was saved successfully. ID: ${savedModel._id}.`);

        resolve(savedModel);
      }).catch(this._logErrorFromDB(reject, 'Error while trying to save a new model.'));
    });
  }

  /**
   * Find a document by ID and update it.
   *
   * @public
   * @param id {string} document's ID
   * @param payload {Object} Object with data that will be used to update the document
   * @returns a promise to be comsumed
   */
  update(id, payload) {
    return new Promise((resolve, reject) => {
      this.model.findByIdAndUpdate(id, payload).then((updatedModel) => {
        Logger.info(`${this.logPrefix}: Model #${updatedModel._id} was updated correctly.`);

        resolve(updatedModel);
      }).catch(this._logErrorFromDB(reject, 'Error while trying to update a model.'));
    });
  }

  /**
   * Find a document using a model's attributes.
   *
   * @public
   * @param payload {Object} Object with attributes to be used in the search
   * @returns a promise to be comsumed
   */
  findByAttributes(payload) {
    return new Promise((resolve, reject) => {
      this.model.findOne(payload).then((document) => {
        if (document) {
          Logger.info(`${this.logPrefix}: document found.`);

          resolve(document);
        } else {
          Logger.info(`${this.logPrefix}: No document was found with these attributes:`);
          Logger.info(payload);

          resolve();
        }
      }).catch(this._logErrorFromDB(reject, 'Error while trying to fetch document with attributes.'));
    });
  }

  /**
   * Find a document using an id.
   *
   * @public
   * @param documentId {String} the ID which will be used to be searched
   * @returns a promise to be comsumed
   */
  findById(documentId) {
    return new Promise((resolve, reject) => {
      this.model.findById(documentId).then((document) => {
        if (document) {
          Logger.info(`${this.logPrefix}: document found.`);

          resolve(document);
        } else {
          Logger.info(`${this.logPrefix}: No user was found with this ID: ${documentId}.`);

          resolve();
        }
      }).catch(this._logErrorFromDB(reject, `Error while trying to fetch document with ID ${documentId}.`));
    });
  }

  /**
   * List all documents available
   *
   * @public
   * @returns a promise to be comsumed
   */
  listDocuments() {
    return new Promise((resolve, reject) => {
      this.model.find({}).then((documents) => {
        if (documents && documents.length > 0) {
          Logger.info(`${this.logPrefix}: Returning ${documents.length} documents.`);

          resolve(documents);
        } else {
          Logger.info(`${this.logPrefix}: no documents were found.`);

          resolve([]);
        }
      }).catch(this._logErrorFromDB(reject, 'There was an error while trying to list all documents.'));
    });
  }

  /**
   * List documents using a model's attributes.
   *
   * @public
   * @param payload {Object} Object with attributes to be used in the search
   * @returns a promise to be comsumed
   */
  listDocumentsByAttributes(payload) {
    return new Promise((resolve, reject) => {
      this.model.find(payload).then((documents) => {
        if (documents && documents.length > 0) {
          Logger.info(`${this.logPrefix}: Returning ${documents.length} documents.`);

          resolve(documents);
        } else {
          Logger.info(`${this.logPrefix}: no documents were found.`);

          resolve([]);
        }
      }).catch(this._logErrorFromDB(reject, 'There was an error while trying to list documents.'))
    });
  }

  /**
   * Delete a document using its ID.
   *
   * @public
   * @param documentId {Object} document's ID
   * @returns a promise to be comsumed
   */
  deleteDocument(documentId, userId, role) {
    return new Promise((resolve, reject) => {
      let query = {
        _id: documentId
      };

      if (role !== 'admin') {
        query.user = userId;
      }

      this.model.findOneAndRemove(query).then((deleted) => {
        if (deleted) {
          Logger.info(`${this.logPrefix}: Document #${deleted._id} was deleted`);

          resolve(deleted);
        } else {
          Logger.info(`${this.logPrefix}: No document was found for ${documentId}`);

          resolve();
        }
      }).catch(this._logErrorFromDB(reject, 'There was an error while deleting a document.'));
    });
  }
}

module.exports = DataAccessObject;
