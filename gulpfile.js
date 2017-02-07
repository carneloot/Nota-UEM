var gulp = require('gulp'),
	pug = require('gulp-pug'),
	sass = require('gulp-ruby-sass'),
	prefix = require('gulp-autoprefixer'),
	webserver = require('gulp-webserver'),
	concat = require('gulp-concat');

var dirs = {
	site: 'docs',
	source: 'source'
};

// Compile pug task

gulp.task('pug', function() {
	return gulp.src([dirs.source + '/pugs/**/*.pug', '!' + dirs.source + '/pugs/**/_*.pug'])
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest(dirs.site));
});

// SASS + Autoprefixer

gulp.task('sass', function() {
	return sass(dirs.source + '/assets/css/main.sass', {
			style: 'compact',
			'default-encoding': 'utf-8'
		})
		.on('error', sass.logError)
		.pipe(prefix('last 15 versions'))
		.pipe(gulp.dest(dirs.site + '/assets/css'));
});

gulp.task('js', function() {
	gulp.src([dirs.source + '/assets/js/**/*.js', '!' + dirs.source + '/assets/js/libs/*.js'])
		.pipe(concat('script.js'))
		.pipe(gulp.dest(dirs.site + '/assets/js/'));

	gulp.src([dirs.source + '/assets/js/libs/*.js'])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest(dirs.site + '/assets/js/'));
});

// Watch task

gulp.task('watch', function() {
	gulp.watch(dirs.source + '/pugs/**', ['pug']);
	gulp.watch(dirs.source + '/assets/css/**', ['sass']);
	gulp.watch(dirs.source + '/assets/js/**', ['js']);
});

// Copia todos os arquivos da pasta assets menos as pastas css e js

gulp.task('copyFiles', function() {
	return gulp.src([
			dirs.source + '/assets/**/*',
			'!' + dirs.source + '/assets/css/**',
			'!' + dirs.source + '/assets/js/**'
		])
		.pipe(gulp.dest(dirs.site + '/assets/'));
});

// webserver task

gulp.task('webserver', () => {
	return gulp.src(dirs.site)
		.pipe(webserver({
			open: true,
			host: '0.0.0.0',
			livereload: true
		}))
});


// Default GULP task

gulp.task('default', ['copyFiles', 'watch']);
// gulp.task('default', ['copyFiles', 'webserver', 'watch']);
