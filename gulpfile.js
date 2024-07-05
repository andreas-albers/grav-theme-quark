const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
// const sourcemaps = require('gulp-sourcemaps');

// configure the paths
var watch_dir = './scss/**/*.scss';
var src_dir = './scss/*.scss';
var dest_dir = './css-compiled';

var paths = {
    source: src_dir
};

function watch() {
  return gulp.watch(watch_dir, build);
}

function build() {
  return gulp
      .src(paths.source)
      // .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'})
        .on('error', sass.logError)
      )
      // .pipe(sourcemaps.write())
      .pipe(autoprefixer())
      .pipe(csscomb())
      .pipe(gulp.dest(dest_dir))
      .pipe(cleancss())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(dest_dir));
}

exports.watch = watch;
exports.build = build;
exports.default = build;
