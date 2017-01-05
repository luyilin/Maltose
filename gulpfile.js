var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var cssNano     = require('gulp-cssnano');
var rename      = require('gulp-rename');
var babel       = require("gulp-babel");
var sourcemaps  = require("gulp-sourcemaps");
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: '/demo'
    });
});

gulp.task('compressJS', function() {
    gulp.src(['src/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write("/"))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// 使用 cssnano 执行各种优化，删除空白和注释，压缩代码
gulp.task('compressCSS', function() {
    gulp.src('src/*.scss')
        .pipe(sass())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssNano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch(['src/*.js'], ['compressJS']);
    gulp.watch(['src/*.scss'], ['compressCSS']);
    gulp.watch('demo/*').on('change', browserSync.reload);
});

gulp.task('release', ['compressJS', 'compressCSS']);

gulp.task('default', ['release', 'browser-sync', 'watch']);
