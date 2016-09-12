'use strict';

// ===========
// = Imports =
// ===========
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');
const logger = require('./helpers/logger');
const userRoute = require('./routes/user/userRoute');
const mealRoute = require('./routes/meal/mealRoute');

// ==========================
// = Configuring the server =
// ==========================
const app = new express();

app.set('port', config.PORT);

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
const server = app.listen(app.get('port'), function () {
  const address = server.address();

  logger.info(`Server: Listening at port: ${address.port}`);
});

module.exports = server;

