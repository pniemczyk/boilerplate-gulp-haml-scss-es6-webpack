/**
 * Created by jefvlamings on 14/05/15.
 */

// Requirements
const gulp           = require('gulp');
const gutil          = require("gulp-util");
const haml           = require('gulp-haml-coffee');
const sass           = require('gulp-sass');
const uglify         = require('gulp-uglify');
const notify         = require("gulp-notify");
const webpack        = require("gulp-webpack");
const webserver      = require('gulp-webserver');
const webpackConfig  = require("./webpack.config.js");
const injectPartials = require('gulp-inject-partials');
// Paths
const paths = {
    scripts:  ['src/assets/js/*.js'],
    sass:     ['src/assets/css/*.sass'],
    haml:     ['src/**/*.haml'],
    images:   ['src/assets/images/**/*.*'],
    favicon:  ['src/favicon.*'],
    partials: ['./build/**/*.html']
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
    gulp.watch(paths.partials, ['partials']);
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

gulp.task('partials', function () {
  return gulp.src('./build/**/*.html')
           .pipe(injectPartials({ start: "<!-- ## {{path}}", end: "## -->", removeTags: true }))
           .pipe(gulp.dest('./build'));
});


const COPY    = ['copy-img', 'copy-favicon'];
const DEFAULT = ['watch', 'javascript', 'haml', 'sass', 'copy-resources', 'partials', 'webserver'];

gulp.task('copy-resources', COPY);

// Default task
gulp.task('default', DEFAULT);

