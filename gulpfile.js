var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify'); 
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var eslint = require('gulp-eslint');

gulp.task('serve', ['minify-css'], function() {
    browserSync.init({
        server: './sf-movies'
    });

    gulp.watch('sf-movies/*.css', ['minify-css']);
    gulp.watch('sf-movies/*.css').on('change', reload);
});

gulp.task('serve:dist', ['minify-css'], function() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('dist/*.css').on('change', reload);
});

gulp.task('default', ['styles', 'lint'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['lint']);
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('sf-movies/**/*.js'),
        uglify(),
        gulp.dest('./dist')
    ],
    cb
  );
});

gulp.task('minify-css', function() {
  return gulp.src('sf-movies/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
	gulp.src('src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./sf-movies'));
});


gulp.task('lint', function () {
    return gulp.src(['sf-movies/**/*.js', 'dist/**/*.min.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});