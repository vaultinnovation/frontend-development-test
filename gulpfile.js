var gulp = require('gulp');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var gutil = require('gulp-util');
var rimraf = require('rimraf');
var revOutdated = require('gulp-rev-outdated');
var path = require('path');
var through = require('through2');
var runSequence = require('run-sequence');

var assetsDir = 'resources/assets';
var publicAssetsDir = 'public';

function cleaner() {
    return through.obj(function (file, enc, cb) {
        rimraf(path.resolve((file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}

gulp.task("default", function () {
    runSequence(['components', 'js', 'css'], 'rev', ['clean-js', 'clean-styles']);
});

gulp.task('css', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'node_modules/hamburgers/dist/hamburgers.css',
        assetsDir + '/sass/**/*.scss'
    ])
        .pipe(sass({
            errLogToConsole: true,
            debugInfo: true,
            lineNumbers: true,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(publicAssetsDir + '/css/'))
        .pipe(notify('Sass Compiled!'));
});

gulp.task('components', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/popper.js/dist/umd/popper.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/handlebars/dist/handlebars.min.js'
    ])
        .pipe(concat('components.js'))
        .pipe(uglify())
        .pipe(gulp.dest(publicAssetsDir + '/js/'))
        .pipe(notify('Components Compiled!'));
});

gulp.task('js', function () {
    return gulp.src([
        assetsDir + '/js/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(publicAssetsDir + '/js/'))
        .pipe(notify('Javascript Compiled!'));
});

gulp.task('rev', function () {
    return gulp.src([publicAssetsDir + '/css/**/*.css', publicAssetsDir + '/js/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest(publicAssetsDir + '/build/'))
        .pipe(rev.manifest(publicAssetsDir + '/build/rev-manifest.json', {
            base: publicAssetsDir + '/build/',
            merge: true
        }))
        .pipe(gulp.dest(publicAssetsDir + '/build/'));
});

gulp.task('clean-js', function () {
    return gulp.src([publicAssetsDir + '/build/*.js'], {read: false})
        .pipe(revOutdated())
        .pipe(cleaner());
});

gulp.task('clean-styles', function () {
    return gulp.src([publicAssetsDir + '/build/*.css'], {read: false})
        .pipe(revOutdated())
        .pipe(cleaner());
});

gulp.task('watch', ['default'], function () {
    gulp.watch(assetsDir + '/js/**/*.js', function () {
        runSequence(['js'], 'rev', ['clean-js'])
    });

    gulp.watch(assetsDir + '/sass/**/*.scss', function () {
        runSequence(['css'], 'rev', ['clean-styles'])
    });
});
