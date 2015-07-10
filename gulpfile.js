/*=====================================
=            Gulp Packages            =
=====================================*/
var gulp     = require('gulp'),
sass         = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifyCSS    = require('gulp-minify-css'),
uglify       = require('gulp-uglify'),
rename       = require('gulp-rename'),
notify       = require("gulp-notify"),
watch        = require('gulp-watch'),
plumber      = require('gulp-plumber'),
jshint       = require('gulp-jshint');

/*=====================================
=            Default Paths            =
=====================================*/
var devBase   = './dev';
var distBase = './dist'

/*=========================================
=            Destination Paths            =
=========================================*/
var stylePathSrc  = devBase + '/scss/*.scss';
var stylePathDest = distBase + '/css/';

var scriptsPathWatch = devBase + '/js/*.js';
var scriptsPathDest  = distBase + '/js/';

// Compile, prefix, minify and move our SCSS files
gulp.task('sass', function() {
  return gulp.src(stylePathSrc)
  .pipe(plumber())
  .pipe(sass({
    style: 'expanded',
    errLogToConsole: true
    }))
  .pipe(autoprefixer('last 4 versions', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(minifyCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(stylePathDest))
  .pipe(notify({ message: 'Styles task complete' }));
});

// Compile (in order), concatenate, minify, rename and move our JS files
gulp.task('scripts', function() {
  return gulp.src(scriptsPathWatch)
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(scriptsPathDest))
  .pipe(notify({ message: 'Scripts task complete' }));
});

/*===================================
=            Watch Tasks            =
===================================*/
gulp.task('watch', function() {
  gulp.watch(stylePathSrc, ['sass']);
  gulp.watch(scriptsPathWatch, ['scripts']);
});

/*==========================================
=            Run the Gulp Tasks            =
==========================================*/
gulp.task('default', ['sass', 'scripts', 'watch']);
