var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var babel = require("gulp-babel");

// CSS Tasks
gulp.task('css-compile', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./build/css/'));
    
});

gulp.task('css-minify', function() {
    gulp.src(['./build/css/*.css', '!build/css/*.min.css'])
      .pipe(cssmin())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'));

});

gulp.task('css', function(done) {
  gulp.src('./src/scss/*.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css/'));

    done();
});

// JavaScript Tasks WIP
gulp.task('js-build', function() {
  gulp.src('./src/js/**/*.js')
  .pipe(babel())
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('./build/js'));

});

gulp.task('js-minify', function() {
  gulp.src('./build/js/scripts.js')
    .pipe(minify({
      ext:{
        // src:'.js',
        min:'.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest('./build/js'));

});

gulp.task('js', function(done) {
  gulp.src('./src/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('scripts.js'))
    .pipe(minify({
      ext:{
        // src:'.js',
        min:'.min.js'
      },
      noSource: true,
    }))
  .pipe(gulp.dest('./build/js'));
   
  done();
});

// Build frontend stuff
gulp.task('default', gulp.series('css','js'),function(done) {
  done();
});


// Watch on CSS and JS
gulp.task('watch', function(done) {
  gulp.watch("./src/scss/**/*.scss", ['css']);
  gulp.watch("./src/js/**/*.js", ['js']);

  done();
});