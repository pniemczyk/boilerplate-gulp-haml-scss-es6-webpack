/**
 * Created by jefvlamings on 14/05/15.
 */

// Requirements
var gulp                = require('gulp');
var gutil               = require("gulp-util");
var haml                = require('gulp-haml-coffee');
var sass                = require('gulp-sass');
var uglify              = require('gulp-uglify');
var notify              = require("gulp-notify");
var webpack             = require("gulp-webpack");
const webserver         = require('gulp-webserver');
var webpackConfig       = require("./webpack.config.js");

// Paths
var paths = {
    scripts: ['src/assets/js/*.js'],
    sass:    ['src/assets/css/*.sass'],
    haml:    ['src/**/*.haml'],
    images:  ['src/assets/images/**/*.*'],
    favicon: ['src/favicon.*']
};

// HTML
gulp.task('haml', function () {
    gulp.src(paths.haml)
        .pipe(haml())
        .pipe(gulp.dest('build'));
});

// Javascript
gulp.task("javascript", function() {
    return gulp.src('src/assets/js/app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('build/assets/js'))
        .pipe(notify("Bundling done."));
});

// Sass
gulp.task('sass', function () {
    gulp.src(paths.sass)
        .pipe(sass({ indentedSyntax: true }).on('error', sass.logError))
        .pipe(gulp.dest('build/assets/css'));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['javascript']);
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.images, ['copy-img']);
    gulp.watch(paths.favicon, ['copy-favicon']);
});

gulp.task('webserver', function() {
  return gulp.src('build')
    .pipe(webserver({
      path: './build',
      livereload: true,
      directoryListing: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('copy-img', function() {
  return gulp.src('./src/assets/images/**/*.*')
    .pipe(gulp.dest('./build/assets/images/'));
});

gulp.task('copy-favicon', function() {
  return gulp.src('./src/favicon.*')
    .pipe(gulp.dest('./build/'));
});


const COPY    = ['copy-img', 'copy-favicon'];
const DEFAULT = ['watch', 'javascript', 'haml', 'sass', 'copy-resources', 'webserver'];

gulp.task('copy-resources', COPY);

// Default task
gulp.task('default', DEFAULT);

