const gulp = require('gulp')
const pug = require('gulp-pug')
const babel = require('gulp-babel')
const concat = require('gulp-concat');
const stylus = require('stylus')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const { Transform } = require('stream')
const PluginError = require('plugin-error')
const path = require('path')


function compileStylus(options = {}) {
    return new Transform({
        objectMode: true,
        transform(file, enc, cb) {
            if (file.isNull()) {
                cb(null, file)
                return
            }

            if (file.isStream()) {
                cb(new PluginError('stylus', 'Streaming not supported'))
                return
            }

            const stylusOptions = Object.assign({
                filename: file.path,
                paths: [path.dirname(file.path)]
            }, options)

            const originalPath = file.path
            stylus.render(file.contents.toString('utf8'), stylusOptions, (err, css) => {
                if (err) {
                    cb(new PluginError('stylus', err))
                    return
                }

                postcss([autoprefixer])
                    .process(css, { from: originalPath, to: originalPath.replace(/\.styl$/i, '.css') })
                    .then(result => {
                        result.warnings().forEach(warning => {
                            console.warn(warning.toString())
                        })
                        file.contents = Buffer.from(result.css)
                        file.path = file.path.replace(/\.styl$/i, '.css')
                        cb(null, file)
                    })
                    .catch(postcssError => cb(new PluginError('postcss', postcssError)))
            })
        }
    })
}

gulp.task('stylus', function () {
    return gulp.src('*.styl')
        .pipe(compileStylus({ compress: true }))
        .pipe(concat('site.css'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('stylus-debug', function () {
    return gulp.src('*.styl')
        .pipe(compileStylus({ compress: false }))
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
        .pipe(babel({ sourceType: 'script', ignore: ['./vendor/*.js'] }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('babel', function () {
    return gulp.src(js_files)
        .pipe(babel({ sourceType: 'script', ignore: ['./vendor/*.js'] }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})


gulp.task('babel-es2015-debug', function () {
    return gulp.src(js_files)
        .pipe(babel({ sourceType: 'script', presets: ['@babel/preset-env'], ignore: ['./vendor/*.js'] }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('babel-es2015', function () {
    return gulp.src(js_files)
        .pipe(babel({ sourceType: 'script', presets: ['@babel/preset-env'], ignore: ['./vendor/*.js'] }))
        .pipe(concat('site.js'))
        .pipe(gulp.dest('./prod/'))
})

gulp.task('copy-assets', function () {
    return gulp.src('assets/**/*', { encoding: false })
        .pipe(gulp.dest('./prod/assets/'))
})

gulp.task('default', gulp.parallel('stylus', 'pug', 'babel', 'copy-assets'))
gulp.task('debug', gulp.parallel('stylus-debug', 'pug', 'babel-debug', 'copy-assets'))

gulp.task('es2015', gulp.parallel('stylus', 'pug', 'babel-es2015', 'copy-assets'))
gulp.task('es2015-debug', gulp.parallel('stylus-debug', 'pug', 'babel-es2015-debug', 'copy-assets'))
