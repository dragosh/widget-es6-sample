var gulp = require('gulp');

var babel = require('gulp-babel');
var server = require('browser-sync');
var path = require('path');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

var paths = {
    scripts: ['./scripts/**/*.js'],
    target: './dist',
};
gulp.task('compile:scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(webpack(require('./config/webpack.conf.js')))
        .pipe(gulp.dest(paths.target));
});

gulp.task('build:scripts', ['compile:scripts'], function(done) {

    gulp.src([
            path.resolve(paths.target, './scripts/main.js')
        ])
        .pipe(uglify({
            mangle: {
                except: ['require']
            }
        }))
        .pipe(gulp.dest(paths.target + '/scripts'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['compile:scripts','server:reload']);
});

gulp.task('server', [], function() {

    server({
        open: false,
        //files: [ paths.scripts ],
        server: {
            baseDir: ['./', paths.target],
            minify: true,
            index: 'index.html'
            // proxy: 'localhost:7777',

        }
    });
});
gulp.task('server:reload', function() {
    server.reload();
});

gulp.task('default', ['server','watch']);
gulp.task('build', ['build:scripts']);
