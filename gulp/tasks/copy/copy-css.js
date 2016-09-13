'use strict';

const gulp = require('gulp');
const config = require('../../config');

gulp.task('copy:css', function () {
  return gulp.src(config.clientCSSLib)
          .pipe(gulp.dest(`${config.distFolder}/lib/css`));
});
