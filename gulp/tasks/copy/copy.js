'use strict';

const gulp = require('gulp');
const config = require('../../config');

gulp.task('copy:js', function () {
  return gulp.src(config.clientLib)
          pipe(gulp.dest('${config.distFolder}/lib/js'));
})