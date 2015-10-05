/**
 * @todo check the test
 */
'use strict'

const path = require('path')
const merge = require('lodash/object/merge')

module.exports = function webpackTest(setup) {

    var config = merge({}, require('./webpack-dev.config')(setup), {
        entry: path.resolve(setup.PATHS.src, 'index.test.js')
    })

    return config
}
