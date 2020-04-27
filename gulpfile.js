// Requirements
const gulp           = require('gulp');
const gutil          = require("gulp-util");
const haml           = require('gulp-haml-coffee');
const scss           = require('gulp-ruby-sass');
const uglify         = require('gulp-uglify');
const notify         = require("gulp-notify");
const webserver      = require('gulp-webserver');
const injectPartials = require('gulp-inject-partials');
const clean          = require('gulp-clean');

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

const webserverOpts = {
  port: 8000,
  livereload: true,
  // directoryListing: true,
  open: true
}

// Paths
const paths = {
    dest:     {
      root:    './build',
      scripts: './build/assets/js',
      styles:  './build/assets/css',
      images:  './build/assets/images'
    },
    build:    ['build'],
    scripts:  ['src/assets/js/**/*.js'],
    styles:   ['src/assets/css/**/*.scss'],
    haml:     ['src/**/*.haml'],
    images:   ['src/assets/images/**/*.*'],
    favicon:  ['src/favicon.*'],
    partials: ['./build/**/*.html']
};

// HTML
gulp.task('haml', function () {
  return gulp.src(paths.haml)
          .pipe(haml())
          .pipe(gulp.dest(paths.dest.root))
          .pipe(notify("Haml bundling done."));
});

// Javascript
gulp.task("scripts", function() {
  return gulp.src(paths.scripts)
           .pipe(uglify())
           .pipe(gulp.dest(paths.dest.scripts))
           .pipe(notify("Scripts bundling done."));
});

// Styles
gulp.task('styles', function () {
  return scss(paths.styles)
          .on('error', errorLog)
          .pipe(gulp.dest(paths.dest.styles))
          .pipe(notify("Styles bundling done."));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.images, ['copy-img']);
    gulp.watch(paths.favicon, ['copy-favicon']);
    gulp.watch(paths.partials, ['partials']);
});

// Clean
gulp.task('clean', function(cb) {
  gulp.src(['build/assets/css', 'build/assets/js', 'build/assets/images'], {read: false})
    .pipe(clean());

  cb();
});

gulp.task('webserver', function() {
  return gulp.src(paths.build)
          .pipe(webserver(webserverOpts));
});

gulp.task('copy-img', function() {
  return gulp.src(paths.images)
           .pipe(gulp.dest(paths.dest.images));
});

gulp.task('copy-favicon', function() {
  return gulp.src(paths.favicon)
           .pipe(gulp.dest(paths.dest.root));
});

const partialsOpts = {
  start: "<!-- $$ {{path}}",
  end: "$$ -->",
  ignoreError: true,
  removeTags: false
}

gulp.task('partials', function () {
  return gulp.src(paths.partials)
           .pipe(injectPartials())
           .pipe(gulp.dest(paths.dest.root))
           .pipe(notify("Partials bundling done."));
});


const COPY    = ['copy-img', 'copy-favicon'];
const BUILD   = ['scripts', 'styles', 'copy-resources', 'haml', 'partials']
const DEFAULT = BUILD.concat(['watch', 'webserver']);

gulp.task('copy-resources', COPY);

gulp.task('build', ['clean'].concat(BUILD));

// Default task
gulp.task('default', DEFAULT);

