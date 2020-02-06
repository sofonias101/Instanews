const gulp = require('gulp'); // Load Gulp!
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');

// Now that we've installed the terser package we can require it:
const terser = require('gulp-terser'),
  rename = require('gulp-rename');
gulp.task('scripts', function () {
  return gulp
    .src('./js/*.js') // What files do we want gulp to consume?
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
    .pipe(gulp.dest('./build/js')); // Where do we put the result?
});
gulp.task('watch', function () {
  gulp.watch('js/*.js', gulp.series('scripts', 'reload'));
  gulp.watch('css/*.css', gulp.series('reload'));
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
gulp.task('default', gulp.parallel('scripts', 'watch', 'browser-sync'));

gulp.task('lint', function () {
  return gulp
    .src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

});