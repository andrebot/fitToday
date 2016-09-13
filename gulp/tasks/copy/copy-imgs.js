'use strict';

const gulp = require('gulp');
const config = require('../../config');

gulp.task('copy:imgs', function () {
  return gulp.src(config.clientImgs)
          .pipe(gulp.dest(`${config.distFolder}/imgs`));
});
