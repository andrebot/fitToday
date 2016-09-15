'use strict';

const concat = require('gulp-concat');
const gulp = require('gulp');
const config = require('../../config');

gulp.task('build:clientCSS', function () {
  return gulp.src(config.clientCSS)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(config.distFolder));
});
