// Constants
const dist = 'dist/';

// Plugins
const gulp = require('gulp');
const concat = require('gulp-concat');
const envify = require('gulp-envify');

const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const minifyHTML = require('gulp-minify-html');
const minifyCSS = require('gulp-minify-css');

const jade = require('gulp-jade');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

const mainBowerFiles = require('main-bower-files');
const gulpFilter = require('gulp-filter');

const clean = require('gulp-clean');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const connect = require('gulp-connect');
const rev = require('gulp-rev');
const inject = require('gulp-inject');

const Server = require('karma').Server;
const protractor = require('gulp-protractor').protractor;

// Cleaning project folder task
gulp.task('clean', () => {
  return gulp.src(dist + '/*').pipe(clean({ force: true }));
});

gulp.task('clean-css', () => {
  return gulp.src([dist + 'css/**/*.css', '!' + dist + 'css/bower_components*.css'])
          .pipe(clean({ force: true }));
});

gulp.task('clean-js', () => {
  return gulp.src([dist + 'js/**/*.js', '!' + dist + 'js/bower_components*.js'])
          .pipe(clean({ force: true }));
});

// Processing styles task
gulp.task('css', () => {
  return gulp.src('app/css/*.scss')
          .pipe(sass())
          .pipe(gulp.dest(dist + 'css/'));
});

// Processing scripts task
gulp.task('js', () => {
  return gulp.src('app/js/**/*.js')
          .pipe(babel({
            presets: ['es2015']
          }))
          .pipe(envify([process.env.NODE_ENV]))
          .pipe(jshint())
          .pipe(rev())
          //.pipe(uglify())
          .pipe(gulp.dest(dist + 'js/')); 
});

// Processing images task
gulp.task('images', () => {
  return gulp.src('app/images/**').pipe(gulp.dest(dist + 'images/'));
});

// Processing templates task
gulp.task('templates', () => {
  return gulp.src(['app/**/*.jade', '!app/index.jade', '!app/**/_*.jade'])
          .pipe(jade())
          .pipe(minifyHTML())
          .pipe(gulp.dest(dist));
});

gulp.task('inject', () => {
  var sources = gulp.src([dist + '/js/**/*.js', dist + '/css/*.css'], { read: false });

  return gulp.src('app/index.jade')
          .pipe(inject(sources, { ignorePath: '/dist/' }))
          .pipe(jade())
          .pipe(minifyHTML())
          .pipe(gulp.dest(dist));
});

// Processing bower components(js, css, fonts) task
gulp.task('bower-components', () => {
  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);

  return gulp.src(mainBowerFiles())
          .pipe(jsFilter)
          .pipe(rename({suffix: '.min'}))
          .pipe(concat('bower_components.js'))
          .pipe(rev())
          .pipe(uglify())
          .pipe(gulp.dest(dist  + 'js/'))
          .pipe(jsFilter.restore())
          .pipe(cssFilter)
          .pipe(concat('bower_components.css'))
          .pipe(rev())
          .pipe(minifyCSS())
          .pipe(gulp.dest(dist  + 'css/'))
          .pipe(cssFilter.restore())
          .pipe(fontFilter)
          .pipe(gulp.dest(dist + 'fonts/'));
});

// Unit-testing
gulp.task('unit-testing', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
  }, () => {
    done();
  }).start();
});

gulp.task('e2e-testing', () => {
  gulp.src([]).pipe(protractor({ configFile: 'protractor.conf.js' }))
    .on('error', (e) => { throw e })
});

// Watching files for changes task
gulp.task('watch', () => {
  gulp.watch('app/css/**/*.scss', () => {
    runSequence('clean-css', 'css', 'inject');
  });
  gulp.watch('app/js/**/*.js', () => {
    runSequence('clean-js', 'js', 'inject');
  });
  gulp.watch('app/img/**/*', ['images']);
  gulp.watch('app/**/*.jade', ['templates']); 
});

// Server creating task
gulp.task('server', () => {
  connect.server({
    root: dist,
    port: 8888
  });
});

// Default task
gulp.task('default', () => {
  runSequence('clean', ['css', 'js', 'images', 'templates', 'bower-components'], 'inject', 'server', 'watch');
})