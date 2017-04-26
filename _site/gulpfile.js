// Plugins
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del');

// Styles
gulp.task('styles', function() {
	return sass('dev/scss/rancho.scss', { style: 'expanded' })
		.pipe(autoprefixer('last 3 versions'))
		.pipe(gulp.dest('public/assets/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(cleancss())
		.pipe(gulp.dest('public/assets/css'))
		.pipe(gulp.dest('docs/assets/css'))
		.pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('dev/scripts/**/*.js')
		//.pipe(jshint('.jshintrc'))
		//.pipe(jshint.reporter('default'))
		.pipe(concat('rancho.js'))
		.pipe(gulp.dest('public/assets/js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('public/assets/js'))
		.pipe(gulp.dest('docs/assets/js'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
	return gulp.src('dev/images/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('public/assets/images'))
		.pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
	return del(['public/assets/css', 'public/assets/js', 'public/assets/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('dev/scss/**/*.scss', ['styles']);
	// Watch .js files
	gulp.watch('dev/scripts/**/*.js', ['scripts']);
	// Watch image files
	gulp.watch('dev/images/**/*', ['images']);
	// Create LiveReload server
	livereload.listen();
	// Watch any files in public/assets/, reload on change
	gulp.watch(['public/assets/**']).on('change', livereload.changed);
});