var gulp = require('gulp'),
		pug = require('gulp-pug'),
		sass = require('gulp-ruby-sass'),
		srcmaps = require('gulp-sourcemaps'),
		prefix = require('gulp-autoprefixer'),
		webserver = require('gulp-webserver'),
		uglify = require('gulp-uglify');

var dirs = {
	site: 'build',
	source: 'source'
};

// Compile pug task

gulp.task('pug', function() {
	return gulp.src([dirs.source + '/pugs/**/*.pug', '!' + dirs.source + '/pugs/**/_*.pug'])
		.pipe(pug( { pretty: true } ))
		.pipe(gulp.dest(dirs.site));
});

// SASS + Autoprefixer + sourcemaps Task

gulp.task('sass', function() {
	return sass(dirs.source + '/assets/css/main.sass', { sourcemap: true, style: 'compact' })
		.on('error', sass.logError)
		.pipe(prefix('last 15 versions'))
		.pipe(srcmaps.write('/'))
		.pipe(gulp.dest(dirs.site + '/assets/css'));
});

gulp.task('js', function() {
		return gulp.src([dirs.source + '/assets/js/*.js', '!' + dirs.source + '/assets/js/**/_*.js'])
		.pipe(uglify('functions.min.js'))
		.pipe(gulp.dest(dirs.site + '/assets/js/'));
});

// Watch task

gulp.task('watch', function() {
	gulp.watch(dirs.source + '/pugs/**', ['pug']);
	gulp.watch(dirs.source + '/assets/css/**', ['sass']);
	gulp.watch(dirs.source + '/assets/js/**', ['js']);
});

// Copia todos os arquivos da pasta assets menos as pastas css e js

gulp.task('copyFiles', function(){
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
					open: true
				}))
});


// Default GULP task

gulp.task('default', ['copyFiles', 'webserver', 'watch']);
