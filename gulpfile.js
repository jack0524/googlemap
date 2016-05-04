
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require("gulp.spritesmith"),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    gulpkss = require('gulp-kss'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    open = require('gulp-open');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var files = [
  './**/*.*',
  '!./node_modules/**',
  '!./bower_components/**'
];

// // Sass
gulp.task('sass', function() {
    gulp.src(['./asset/scss/**.scss'])
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            includePaths: ['./**/**']
        }))
        .pipe(autoprefixer({
            browsers: ["last 4 versions", "Firefox >= 27", "Blackberry >= 7", "IE 8", "IE 9"],
            cascade: false
        }))
        .pipe(gulp.dest('./asset/css'));
});


//Sever
gulp.task('browser', function () {
  browserSync.init(files, {
    startPath: './',
    server: {
      baseDir: './'
    },
    port:5000,
    browser: 'default'
  });
});

gulp.task('copyAssets', ['sass'], function() {
    gulp.src(['./scss/**'])
        .pipe(gulp.dest('../scss/'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('./asset/**/**.scss',['sass']);
    return gulp.watch(files).on('change', browserSync.reload);
});

gulp.task('default', function () {
  // runSequence('build', 'watch', 'browser');
  runSequence('watch', 'browser');
});
