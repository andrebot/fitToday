'use strict';

const nodemon = require('gulp-nodemon');
const config = require('../../config');
const gulp = require('gulp');

gulp.task('nodemon:start', function () {
  nodemon({
    script: config.serverIndex,
    ignore: [`public/**/*`]
  })
  .on('restart', function () {
    console.log('Nodemon restarted!');
  });
});
