'use strict';

const Logger = require('../../helpers/logger');
const Validators = require('../../helpers/validators');

class Controller {
  constructor(logPrefix) {
    this.logPrefix = logPrefix;
    this.logger = Logger;
    this.validators = Validators;

    this.logger(`${this.logPrefix}: Controller instanciated`);
  }
}

module.exports = Controller;
