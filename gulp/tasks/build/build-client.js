'use strict';

const ngAnnotate = require('gulp-ng-annotate');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const gulp = require('gulp');
const config = require('../../config');

gulp.task('build:clientJS', function (cb) {
  const isProduction = process.env.ENV === 'production';

  return gulp.src([config.clientInits, config.clientJS])
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    //.pipe(gulpIf(isProduction, uglify()))
    .pipe(gulp.dest(config.distFolder));
});
