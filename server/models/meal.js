'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const Validator = require('../helpers/validator');
const Logger = require('../helpers/logger');
const Schema = mongoose.Schema;

const Meal = new Schema({
  user:        {type: Schema.ObjectId, required: true, ref: 'User'},
  name:        {type: String, required: true, match: Validator.name},
  description: {type: String, match: Validator.description},
  calories:    {type: Number, required: true},
  when:        {type: Date}
});

Meal.pre('save', function (next) {
  if (this.isNew && !this.when) {
    this.when = Date.now();
  }

  return next();
});

module.exports = mongoose.model('Meal', Meal);
