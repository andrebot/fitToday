'use strict'

const config   = require('../../config');
const mocha  = require('gulp-mocha');
const gulp     = require('gulp');

gulp.task('test:backend', function () {
  return gulp.src(config.serverTestFiles)
          .pipe(mocha());
});
