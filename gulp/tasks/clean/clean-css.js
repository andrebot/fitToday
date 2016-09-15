'use strict';

const config = require('../../config');
const gulp = require('gulp');
const del = require('del');

gulp.task('clean:css', function () {
  return del([`${config.distFolder}/app.css`]);
});
