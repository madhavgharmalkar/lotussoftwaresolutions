'use strict';

var gulp = require('gulp');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var del = require('del');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

gulp.task('clean', () => {
    return del([
        'build/*'
    ])
});

gulp.task('html', () => {
    return gulp.src('./src/index.html')
        .pipe(usemin({
        }))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream());
});

gulp.task('scss', () => {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('/styles.css'))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream())
})

gulp.task('js', () => {
    return gulp.src('./src/**/*.js')
        .pipe(concat('/bundle.js'))
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream())
})

gulp.task('img', () => {
    return gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./build/img/'))
})

gulp.task('build', ['scss', 'html', 'js', 'img']);


gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch("./src/**/*.scss", ['scss']);
    gulp.watch("./src/index.html", ['html']);
    gulp.watch("./src/**/*.js", ['js']);
  });