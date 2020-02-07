const gulp = require('gulp'); // Load Gulp!
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const terser = require('gulp-terser');
const sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror'),
  rename = require('gulp-rename');

gulp.task('sass', function () {
  return gulp
    .src('./sass/style.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function () {
  return gulp
    .src('./js/*.js') // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
    .pipe(gulp.dest('./build/js')); // Where do we put the result?
});
gulp.task('watch', function () {
  gulp.watch('js/*.js', gulp.series('scripts', 'reload'));
  gulp.watch('sass/*.scss', gulp.series('sass', 'reload'));
  gulp.watch('./index.html', gulp.series('reload'));
});
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});
gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});
gulp.task('default', gulp.parallel('scripts', 'sass', 'watch', 'browser-sync'));

gulp.task('lint', function () {
  return gulp
    .src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});