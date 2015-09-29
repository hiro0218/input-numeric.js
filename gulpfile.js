var gulp     = require('gulp');
var plugins  = require('gulp-load-plugins')();
var notifier = require('node-notifier');

// header for top of dist files
var packageJSON = require('./package.json');

var banner = [
  '/*!',
  ' * input-numeric.js (<%= pkg.version %>)',
  ' * <%= pkg.description %>',
  ' * Copyright (c) 2015 <%= pkg.author %> - http://b.0218.jp/',
  ' * This software is released under the MIT License.',
  ' * https://github.com/hiro0218/input-numeric.js/LICENSE',
  ' */',
  '',
  ''].join('\n');

// error handler
var onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  });

  console.log(error);
  this.emit('end');
}

// concat and uglify scripts
gulp.task('scripts', function() {
  return gulp.src('src/input-numeric.js')
    .pipe(plugins.plumber({ errorHandler: onError }))
    // .pipe(plugins.umd())
    .pipe(plugins.header(banner, { pkg: packageJSON }))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.uglify({ preserveComments: 'some' }))
    .pipe(plugins.rename(function(path) {
      path.basename = "input-numeric.min"
    }))
    .pipe(gulp.dest('dist'));
});

// watch
gulp.task('watch', function() {
  gulp.watch('src/input-numeric.js', ['scripts']);
});

// build and default task
gulp.task('default', ['scripts', 'watch']);
