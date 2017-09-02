var gulp = require('gulp'),
  $ = require('gulp-load-plugins')();

var dirs = {
  site: 'docs',
  source: 'source'
};

// Compile pug task

gulp.task('pug', function () {
  var vNumConfig = {
    'value': '%MD5%',
    'replaces': [
      /#{VERSION_REPLACE}/g
    ]
  };
  gulp.src([dirs.source + '/pugs/**/*.pug', '!' + dirs.source + '/pugs/**/_*.pug'])
    .pipe($.pug({
      pretty: true
    }))
    .pipe($.versionNumber(vNumConfig))
    .pipe(gulp.dest(dirs.site));
});

// SASS + Autoprefixer

gulp.task('sass', function () {
  return $.rubySass(dirs.source + '/assets/css/main.sass', {
      style: 'compact',
      'default-encoding': 'utf-8'
    })
    .on('error', $.rubySass.logError)
    .pipe($.autoprefixer('last 15 versions'))
    .pipe(gulp.dest(dirs.site + '/assets/css'));
});

gulp.task('js', function () {
  gulp.src([dirs.source + '/assets/js/**/*.js', '!' + dirs.source + '/assets/js/libs/*.js'])
    .pipe($.minify({
      ext: {
        src: '.js',
        min: '.js'
      },
      noSource: true,
      ignoreFiles: ['.min.js']
    }))
    .pipe(gulp.dest(dirs.site + '/assets/js/'));

  gulp.src([dirs.source + '/assets/js/libs/*.js'])
    .pipe($.concat('libs.js'))
    .pipe(gulp.dest(dirs.site + '/assets/js/'));

  gulp.src([dirs.source + '/assets/js/*.json'])
    .pipe($.jsonMinify())
    .pipe(gulp.dest(dirs.site + '/assets/js/'));
});

// Watch task

gulp.task('watch', function () {
  gulp.watch(dirs.source + '/pugs/**', ['pug']);
  gulp.watch(dirs.source + '/assets/css/**', ['sass']);
  gulp.watch(dirs.source + '/assets/js/**', ['js']);
});

// Copia todos os arquivos da pasta assets menos as pastas css e js

gulp.task('copyFiles', function () {
  gulp.src([
      dirs.source + '/assets/**/*',
      '!' + dirs.source + '/assets/css/**',
      '!' + dirs.source + '/assets/js/**'
    ])
    .pipe(gulp.dest(dirs.site + '/assets/'));
  gulp.src([dirs.source + '/*'])
    .pipe(gulp.dest(dirs.site + '/'));
});

// Default GULP task

gulp.task('default', ['copyFiles', 'watch']);
// gulp.task('default', ['copyFiles', 'webserver', 'watch']);