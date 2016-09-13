'use strict';

const ngAnnotate = require('gulp-ng-annotate');
const concat = require('gulp-concat');
const gulp = require('gulp');
const config = require('../../config');

gulp.task('build:clientJS', function () {
  return gulp.src([config.clientInits, config.clientJS])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(config.distFolder));
});
