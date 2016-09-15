'use strict';

const runSequence = require('run-sequence');
const config      = require('../../config');
const gulp        = require('gulp');

gulp.task('watch', function (cb) {
  gulp.watch(config.clientHTML, function () {
    runSequence('clean:html', 'copy:html');
  });

  gulp.watch(config.clientJS, function () {
    runSequence('clean:js','build:clientJS');
  });

  gulp.watch(config.clientCSS, function () {
    runSequence('clean:css','build:clientCSS');
  });
});
