'use strict'

const config   = require('../../config');
const mocha  = require('gulp-mocha');
const gulp     = require('gulp');

gulp.task('test:backend', function () {
  process.env.ENV = 'test';
  return gulp.src(config.serverTestFiles)
          .pipe(mocha());
});
