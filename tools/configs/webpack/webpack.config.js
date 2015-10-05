'use strict'
const colors = require('colors');
const setup = require('../../setup')

const context = setup.ENVS.CTX
const ci = setup.ENVS.CI
const pckJson = setup.pckJson


var configs = {
    development: require('./webpack-dev.config'),
    production: require('./webpack-prod.config'),
    test: require('./webpack-test.config')
}
var webpackConfig = configs[context](setup)
module.exports = webpackConfig

console.info('==================================================')
console.info('Running  %s (%s) in %s mode',
    pckJson.name.bold.underline.green,
    pckJson.version.bold.underline.green,
    context.toUpperCase().bold.underline.green
)
console.info('Continuous: %s', ci.toString().bold.underline.red)
console.info('==================================================')
