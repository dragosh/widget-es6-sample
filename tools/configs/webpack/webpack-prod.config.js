'use strict'

const merge = require('lodash/object/merge')
const webpack = require('webpack')

module.exports = function webpackProd(setup) {

    var config = merge({}, require('./webpack-dev.config')(setup), {
        debug: false,
        externals: [
            /^[a-z\-0-9]+$/
        ]
    })
    config.plugins.unshift(new webpack.BannerPlugin(setup.banner(), {
        raw: true
    }));
    config.plugins.unshift(new webpack.optimize.OccurenceOrderPlugin())
    config.plugins.unshift(new webpack.optimize.DedupePlugin())
    config.plugins.unshift(new webpack.optimize.AggressiveMergingPlugin())

    return config
}
