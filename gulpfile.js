var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  Roots = require('roots'),
  path = require('path'),
  coffeeScript = require('coffee-script/register'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer');


//   gulp.task('roots:init', function(){
//   return Roots.new({
//     path: path.join(__dirname, 'roots')
//   }).done(function() {
//     console.log("roots is ready");
//   }, function(err){
//     console.error("oh no! " + err);
//   });
// });

gulp.task('roots:compile', function(){
  return require('child_process').exec('roots compile', {cwd: '.'}).on('exit', function(){
    browserSync.init({
      server : {
        baseDir : './public/'
      }
    })
  });
});

gulp.task('roots:recompile', function(){
  return require('child_process').exec('roots compile', {cwd: '.'}).on('exit', function(){browserSync.reload()});
});

gulp.task('clean', function(cb){
  del(['./public/**/*'], cb);
});

  gulp.task('prefix', function () {
    return gulp.src('./public/css/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function(){
  gulp.watch([
    'views/**/*',
    'assets/**/*',
    'app.coffee',
    'app.production.coffee',
    '!public/**/*'],
    ['roots:recompile']);
    gulp.watch('assets/**/*.scss', ['prefix']);
});

gulp.task('default',['clean', 'roots:compile','prefix', 'watch'], function(){
});
