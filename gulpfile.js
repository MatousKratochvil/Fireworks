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
    '!**/*.zaloha.js',
    'vendor/*.js', 
    'js/common/base.js',
    'js/common/*.js',
    'js/particles/base/*.js',
    'js/particles/**/*.js',
    'js/particles/*.js',
    'js/managers/*.js',
    'js/classes/*.js',
    'js/scene/backgroundScene.js',
    'js/scene/introScene.js',
    'js/scene/menuScene.js',
    'js/scene/gameScene.js',
    'js/scene/endScene.js',
    'js/*.js',
    'main.js',
    '!gulpfile.js']
    
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
        .pipe(minifyjs({
            mangle: {
                keepClassName: true
            }
        }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})


gulp.task('babel-es2015-debug', function () {
    return gulp.src(js_files)
        .pipe(babel({presets: ['es2015-without-strict'], ignore: ['./vendor/*.js'] }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('babel-es2015', function () {
    return gulp.src(js_files)
        .pipe(babel({presets: ['es2015-without-strict'], ignore: ['./vendor/*.js'] }))
        .pipe(minifyjs({
            mangle: {
                keepClassName: true
            }
        }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('default', ['stylus', 'pug', 'babel'])
gulp.task('debug', ['stylus-debug', 'pug', 'babel-debug'])

gulp.task('es2015', ['stylus', 'pug', 'babel-es2015'])
gulp.task('es2015-debug', ['stylus-debug', 'pug', 'babel-es2015-debug'])