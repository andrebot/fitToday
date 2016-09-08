'use strict';

// ===========
// = Imports =
// ===========
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

// ==========================
// = Configuring the server =
// ==========================
const app = new express();

app.set('port', config.PORT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ================
// = Start Server =
// ================
const server = app.listen(app.get('port'), function () {
  const address = server.address();

  console.log(`Server: Listening at port: ${address.port}`);
});
