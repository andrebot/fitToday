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
               'build:clientJS'], cb);
});
