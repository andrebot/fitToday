'use strict';

// ===========
// = Imports =
// ===========
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config');
const Logger = require('./helpers/logger');
const userRoute = require('./routes/user/userRoute');
const mealRoute = require('./routes/meal/mealRoute');

// ==========================
// = Configuring the server =
// ==========================
const app = new express();

app.set('port', config.PORT);

Logger.debug('Server: Connecting into Mongo', config.DB.URL);

mongoose.Promise = Promise;

if (mongoose.connection.readyState === 0) {
  mongoose.connect(config.DB.URL, config.DB.OPTIONS, function (error) {
    if (error) {
      Logger.info('Server: There was an error connecting to mongo.');
      Logger.info(error);
    } else {
      Logger.info('Server: Connected to mongo.');
    }
  });
}

app.use(express.static(`${__dirname}/public`));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =================
// = Adding routes =
// =================
app.use('/api/v1/user', userRoute);
app.use('/api/v1/meal', mealRoute);

// ================
// = Start Server =
// ================
const server = app.listen(app.get('port'), 'localhost', function () {
  const address = server.address();

  Logger.info(`Server: Listening at port: ${address.port}`);
});

module.exports = server;

