const gulp = require('gulp');
const sync = require('browser-sync').create();
const include = require("gulp-include");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

gulp.task('sass', function() {
  var processors = [
    autoprefixer()
    ];

  return gulp.src('src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./assets/css'))
    .pipe(sync.stream());
});

gulp.task('includeSnippets', () => {
  return gulp.src('./src/index.html')
    .pipe(include())
      .on('error', console.log)
    .pipe(gulp.dest('./'))
    .pipe(sync.stream());
});

gulp.task('serve', gulp.series('sass', () => {
  sync.init({
    ui: false,
    notify: false,
    port: 3000,
    server: {
      baseDir: '.'
    }
  });

  gulp.watch(['src/**/**.scss'], gulp.series('sass'));
  gulp.watch(['./assets/js/**.*', './src/**/**.*', '!src/**/**.scss'], gulp.series('includeSnippets'));
}));
