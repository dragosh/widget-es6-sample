var gulp = require('gulp');

var server = require('browser-sync');
var path = require('path');
var webpack = require('gulp-webpack');
var g = require('gulp-load-plugins')();
var eslint = require('gulp-load-plugins')();

var paths = {
    scripts: ['./scripts'],
    target: './dist',
};
gulp.task('build:scripts', function () {
    return gulp.src(paths.scripts + '/**/*.js')
        .pipe(g.webpack(require('./config/webpack.conf.js')))
        .pipe(gulp.dest(paths.target));
});

gulp.task('test:lint', function() {
    var rules = require(path.resolve(__dirname, './config/eslint.conf.json'));
    var src = [
        paths.scripts + '/**/*.js'
    ];
    gulp.src(src)
        .pipe(g.eslint({
            configFile: path.resolve(__dirname, './config/eslint.conf.json')
        }))
        .pipe(g.eslint.format())
        .pipe(g.eslint.failOnError())
        .on('error', g.notify.onError());
});

gulp.task('watch',['build:scripts'], function() {
    gulp.watch(paths.scripts + '/**/*.js', ['test:lint', 'build:scripts','server:reload']);
});

gulp.task('server', ['test:lint'], function() {

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
