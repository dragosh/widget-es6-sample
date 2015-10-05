/**
 * @todo check contentBase for the exact folder src
 */
'use strict';

const env = process.env
const argv = process.argv

const path = require('path')
const template = require('lodash/string/template')
const utils = require('./utils')
const pckJson = require(utils.rootDir('package.json'))

var contentBase = argv.slice(-1)[0].trim();
/**
 * ------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------
 */
exports.pckJson = pckJson;

exports.banner = function(pInfo) {
    var info = pInfo || pckJson
    return template('/* ${name} verison ${version} */')(info)
}

exports.PATHS = {
    node_modules: utils.rootDir('node_modules'),
    dist: utils.rootDir('dist'),
    src: utils.rootDir('src'),
    entry: utils.rootDir('src'),
    reports: utils.rootDir('reports')
}

exports.ENVS = {
    CTX: env.NODE_ENV || 'development',
    CI: utils.parseBoolean(env.CI) || false,
    COV: utils.parseBoolean(env.COVERAGE) || true
}

exports.devServer = {
    host: '0.0.0.0',
    port: 3000,
    url: 'http://0.0.0.0:3000',
    contentBase: /.\.js$/.test(contentBase) === true ? '' : path.resolve(exports.PATHS.src, contentBase)
}
