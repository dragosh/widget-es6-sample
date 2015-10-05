/**
 * @todo  add https://www.npmjs.com/package/html-webpack-plugin
 * @todo fix HotReload
 * to generate custom template headers/footers
 */
'use strict'

/**
 * ------------------------------------------------------------------------
 * External dependencies
 * ------------------------------------------------------------------------
 */
const webpack = require('webpack')
const colors = require('colors')
const path = require('path')
const WebpackDevServer = require('webpack-dev-server')

/**
 * ------------------------------------------------------------------------
 * Internal dependencies
 * ------------------------------------------------------------------------
 */
const setup = require('../setup')
const config = require('../configs/webpack/webpack.config')
const WebpackNotifierPlugin = require('webpack-notifier')

// Dev Server
config.entry['dev-server'] = [
    'webpack-dev-server/client?' + setup.devServer.url
    // 'webpack/hot/only-dev-server'
]

// Development Plugins
// config.plugins.push(new webpack.HotModuleReplacementPlugin())
// config.plugins.push(new webpack.NoErrorsPlugin())

const HOST = setup.devServer.host
const PORT = setup.devServer.port

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: setup.devServer.contentBase,
    noInfo: true,
    hot: false, // to fix
    host: HOST,
    port: PORT,
    inline: false,
    quiet: false,
    lazy: false,
    historyApiFallback: false,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 50,
    },
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    proxy: {
        "api/": "http://0.0.0.0:3030"
    }
}).listen(PORT, HOST, function(err, result) {
    if (err) {
        console.log(err)
    }

    console.info('---------------------------------------------');
    console.info('Local web server runs @ http://%s:%d'.green, HOST, PORT);
    console.info('---------------------------------------------');
})
