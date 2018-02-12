let gulp        = require('gulp')
let sass        = require('gulp-sass')
let prefix      = require('gulp-autoprefixer')
let uglify      = require('gulp-uglify')
let cssNano     = require('gulp-cssnano')
let rename      = require('gulp-rename')
let babel       = require('gulp-babel')
let sourcemaps  = require('gulp-sourcemaps')
let browserSync = require('browser-sync').create()
const eslint = require('gulp-eslint')

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    startPath: '/demo'
  })
})

gulp.task('compressJS', function() {
  gulp.src(['src/*.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

// 使用 cssnano 执行各种优化，删除空白和注释，压缩代码
gulp.task('compressCSS', function() {
  gulp.src('src/*.scss')
    .pipe(sass())
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cssNano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

gulp.task('watch', function () {
  gulp.watch(['src/*.js'], ['compressJS'])
  gulp.watch(['src/*.scss'], ['compressCSS'])
  gulp.watch('demo/*').on('change', browserSync.reload)
})

gulp.task('lint', () => {
  return gulp.src(['**/*.js','!node_modules/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('release', ['compressJS', 'compressCSS'])

gulp.task('default', ['lint', 'release', 'browser-sync', 'watch'])
