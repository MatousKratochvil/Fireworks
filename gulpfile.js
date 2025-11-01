const gulp = require('gulp')
const stylus = require('gulp-stylus')
const pug = require('gulp-pug')
const babel = require('gulp-babel')
const concat = require('gulp-concat');


const autoprefixer = require('autoprefixer-stylus')
gulp.task('stylus', function () {
    return gulp.src('*.styl')
        .pipe(stylus({
            use: [autoprefixer()],
            compress: true
        }))
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('stylus-debug', function () {
    return gulp.src('*.styl')
        .pipe(stylus({
            use: [autoprefixer()],
            compress: false
        }))
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('pug', function () {
    return gulp.src('index.pug')
        .pipe(pug())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./prod/'))

})
const js_files = [
    'vendor/*.js',
    'js/common/base.js',
    'js/common/*.js',
    'js/particles/base/*.js',
    'js/particles/classes/*.js',
    'js/particles/*.js',
    'js/managers/*.js',
    'js/classes/*.js',
    'js/scene/*.js',
    'main.js']
    
gulp.task('babel-debug', function () {
    return gulp.src(js_files)
        .pipe(babel())
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})

const minifyjs = require('gulp-babel-minify')
gulp.task('babel', function () {
    return gulp.src(js_files)
        .pipe(babel())
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})


gulp.task('babel-es2015-debug', function () {
    return gulp.src(js_files)
        .pipe(babel({presets: ['es2015-without-strict'] }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('babel-es2015', function () {
    return gulp.src(js_files)
        .pipe(babel({presets: ['es2015-without-strict'] }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('copy-assets', function () {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('./prod/assets/'))
})

gulp.task('default', gulp.parallel('stylus', 'pug', 'babel', 'copy-assets'))
gulp.task('debug', gulp.parallel('stylus-debug', 'pug', 'babel-debug', 'copy-assets'))

gulp.task('es2015', gulp.parallel('stylus', 'pug', 'babel-es2015', 'copy-assets'))
gulp.task('es2015-debug', gulp.parallel('stylus-debug', 'pug', 'babel-es2015-debug', 'copy-assets'))