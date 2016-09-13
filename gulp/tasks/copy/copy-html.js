'use strict';

const config = require('../../config');
const gulp = require('gulp');
const flatten = require('gulp-flatten');

gulp.task('copy:html', function () {
  gulp.src([config.clientHTML, '!' + config.clientIndex])
    .pipe(flatten())
    .pipe(gulp.dest(config.viewFolder));

  return gulp.src(config.clientIndex)
    .pipe(flatten())
    .pipe(gulp.dest(config.distFolder));
});
