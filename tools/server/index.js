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
const fs = require('fs')
const WebpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const template = require('lodash/string/template')
    /**
     * ------------------------------------------------------------------------
     * Internal dependencies
     * ------------------------------------------------------------------------
     */
const setup = require('../setup')
const config = require('../configs/webpack/webpack.config')
const WebpackNotifierPlugin = require('webpack-notifier')
const templatePath = setup.devServer.contentBase || path.resolve(setup.PATHS.src, '../index.dev.html')
    // Dev Server use zzz to load first the dev-server the the main app
    // @todo investigate webpack devserver adn html-webpack order scripts
config.entry['zzz__server__zzz'] = [
    'webpack-dev-server/client?' + setup.devServer.url
    //'webpack/hot/only-dev-server'
]

// Development Plugins
// config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.plugins.push(new webpack.NoErrorsPlugin())

config.plugins.push(new HtmlWebpackPlugin({
    title: setup.pckJson.name,
    template: templatePath,
    //excludeChunks: [setup.pckJson.name, 'zzz__server__zzz'],
    // templateContent: function(templateParams, compilation) {
    //   // Return your template content synchronously here
    //     var tpl = template(fs.readFileSync(templatePath, 'utf8'))(setup)
    //     return tpl;
    // },
    inject: 'head'
}))

const rewriteUrl = function(replacePath) {
    return function(req, opt) { // gets called with request and proxy object
        var queryIndex = req.url.indexOf('?');
        var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";
        req.url = req.path.replace(opt.path, replacePath) + query;
        console.log('Rewriting ', req.originalUrl, req.url);
    };
};
const HOST = setup.devServer.host
const PORT = setup.devServer.port

var server = new WebpackDevServer(webpack(config), {
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
    proxy: [{
        path: new RegExp('/api/(.*)'),
        rewrite: rewriteUrl('/$1'),
        target: "http://0.0.0.0:3030/"
    },{
        path: new RegExp('/\.+features/.BBHOST./(.*)'),
        rewrite: rewriteUrl('/$1'),
        target: `http://${HOST}:${PORT}/bower_components/`
    }, {
        path: new RegExp('/\.+services/rest/(.*)'),
        rewrite: rewriteUrl('/$1'),
        target: `http://0.0.0.0:7777/portalserver/services/rest`
    }]
}).listen(PORT, HOST, function(err, result) {
    if (err) {
        console.log(err)
    }

    console.info('---------------------------------------------');
    console.info('Local web server runs @ http://%s:%d'.green, HOST, PORT);
    console.info('---------------------------------------------');
})
