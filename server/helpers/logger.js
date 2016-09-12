'use strict';

const winston = require('winston');
const config = require('../config');

winston.emitErrs = true;

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: config.LOG_LEVEL,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: function() {
        return (new Date()).toISOString();
      },
      humanReadableUnhandledException: true
    })
  ],
  exitOnError: false
});
