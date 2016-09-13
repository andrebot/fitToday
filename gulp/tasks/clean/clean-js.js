'use strict';

const config = require('../../config');
const gulp = require('gulp');
const del = require('del');

gulp.task('clean:js', function () {
  return del([`${config.distFolder}/app.js`]);
});
