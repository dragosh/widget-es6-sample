'use strict'
/**
 * ------------------------------------------------------------------------
 * Test configuration
 * ------------------------------------------------------------------------
 */

const path = require('path')
const colors = require('colors')
const setup = require('../../setup')

const webpackConfig = require('../webpack/webpack.config')
const covarageDir = path.resolve(setup.PATHS.reports, 'covarage')
const jenkinsDir = path.resolve(covarageDir, 'jenkins/test-results.xml')
const entry = path.resolve(webpackConfig.context, webpackConfig.entry)
var preprocessors = {}
var reporters = ['mocha']
preprocessors[entry] = ['webpack']
if (setup.ENVS.COV) {
    console.info('==================================================')
    console.info('Starting karma server tests with summary coverage '.green);
    console.info('==================================================')
    reporters.push('coverage')

    if (setup.ENVS.CI) {
        reporters.push('jenkins')
    }
}


module.exports = function(config) {

    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        files: [
            setup.PATHS.node_modules + '/phantomjs-polyfill/bind-polyfill.js',
            setup.PATHS.node_modules + '/jasmine-expect/dist/jasmine-matchers.js',
            setup.PATHS.node_modules + '/dom-class/build/vitamer-mixins-qr.js',
            entry
        ],
        exlude: [],
        mochaReporter: {
            output: 'autowatch'
        },
        logLevel: config.LOG_INFO,
        preprocessors: preprocessors,
        autoWatch: true,
        singleRun: setup.ENVS.CI,
        browserNoActivityTimeout: 180000,
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
            stats: {
                colors: true
            }
        },
        coverageReporter: {
            reporters: [{
                type: 'lcov',
                dir: covarageDir,
                subdir: '.'
            }, {
                type: 'json',
                dir: covarageDir,
                subdir: '.'
            }, {
                type: 'cobertura',
                dir: covarageDir,
                subdir: '.'
            }, {
                type: 'text-summary'
            }]
        },
        jenkinsReporter: {
            outputFile: jenkinsDir,
            suite: ''
        },
        reporters: reporters,
        plugins: [
            'karma-*'
        ]
    })
}
