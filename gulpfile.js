const gulp = require('gulp');
const sass = require('gulp-sass');

const yargs = require('yargs');
const cleanCss = require('gulp-clean-css');
const gulpif = require('gulp-if');

const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');

const PRODUCTION = yargs.argv.prod;

gulp.task('sass', function(){
  return gulp.src("./scss/main.scss")
  .pipe(sass({outputStyle:'compressed'}))
  .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
  .on('error', sass.logError)
  .pipe(sass().on("error", sass.logError))
  .pipe(gulpif(PRODUCTION, postcss([ autoprefixer ])))
  .pipe(gulpif(PRODUCTION, cleanCss({compatibility:'ie8'})))
  .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
  .pipe(gulp.dest("./"));
});

gulp.task("watch", function(){
  gulp.watch("scss/**/*.scss", gulp.series("sass"));
 });