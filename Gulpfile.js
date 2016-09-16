'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

// =======================
// = Importing all tasks =
// =======================
requireDir('./gulp/tasks', { recurse: true });

gulp.task('build:client', function (cb) {
  runSequence(['clean:clientDist'], 
              ['copy:css', 
               'copy:js',
               'copy:html',
               'copy:imgs',
               'build:clientCSS',
               'build:clientJS'], cb);
});

gulp.task('deploy:dev', function (cb) {
  runSequence('build:client', 'nodemon:start', 'watch', cb);
});

gulp.task('deploy', function (cb) {
  runSequence('build:client', 'nodemon:start', cb);
});
