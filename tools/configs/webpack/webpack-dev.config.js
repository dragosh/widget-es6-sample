'use strict'

const path = require('path')
const utils = require('../../utils')
const addLoaders = require('../../loaders')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
    // plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')


var addPlugins = function(setup) {
    var plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(setup.ENVS.CTX),
            VERSION: JSON.stringify(setup.pckJson.version)
        }),
        new ExtractTextPlugin('[name].css')
    ];


    if(!setup.ENVS.CI) {

        plugins.push(new WebpackNotifierPlugin({
            contentImage: path.resolve(utils.rootDir('tools'), 'logo.png')
        }))

    }
    return plugins;
}


module.exports = function webpackDev(setup) {

    var config = {
        devtool: 'source-map',
        debug: true,
        target: 'web',
        context: setup.PATHS.src,
        entry: {},
        output: {
            path: setup.PATHS.dist,
            filename: '[name].js',
            publicPath: '/',
            libraryTarget: 'umd'
        },
        stats: {
            colors: true,
            reasons: true
        },
        plugins: addPlugins(setup),
        resolve: {
            extensions: ['', '.js', '.scss', '.woff', '.woff2', '.png', '.jpg'],
            modulesDirectories: ['node_modules']
        },
        module: {
            loaders: addLoaders(setup)
        },
        eslint: {
            emitError: false,
            failOnError: false,
            failOnWarning: false,
            quiet: true,
            configFile: 'tools/configs/linters/eslint.config.json'
        },
        node: {
            fs: 'empty'
        },
        postcss: [
            autoprefixer({
                browsers: ['last 3 versions']
            })
        ]
    }

    config.entry[setup.pckJson.name] = setup.PATHS.entry

    return config
}













// var devConfig = {
//     context: here('src'),
//     entry: './index.js',

//     stats: {
//         colors: true,
//         reasons: true
//     },

//     devtool: 'eval',

//     plugins: [],

//     resolve: {
//         extensions: ['', '.js']
//     },

// module: {
//     loaders: _.union(
//         getJavaScriptLoaders(), [{
//             test: /\.css$/,
//             loaders: ['style', 'css']
//         }, {
//             test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//             loader: 'file-loader?name=/res/[name].[ext]?[hash]'
//         }]
//     )
// },
// eslint: {
//     emitError: false,
//     failOnError: false,
//     failOnWarning: false,
//     quiet: true
// }
// };

// if (process.env.CI !== 'true') {
//     devConfig.plugins = [
//         new WebpackNotifierPlugin()
//     ];
// }
// return devConfig;




/**
 * ------------------------------------------------------------------------
 * Externals
 * ------------------------------------------------------------------------
 */
// const webpack = require('webpack');
// const merge = require('deepmerge');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// /**
// * ------------------------------------------------------------------------
// * Internals
// * ------------------------------------------------------------------------
// */
// const utils = require('../utils')
// const baseConfig = require('./webpack.config');
// const config = merge(baseConfig , {
//     //devtool: 'eval',
//     entry: {
//         'ui-server': [
//             'webpack-dev-server/client?http://0.0.0.0:3000',
//             'webpack/hot/only-dev-server'
//         ],
//         'ui-docs-samples': [

//         ]
//     }
// });
// config.externals = [];
// config.plugins.push(new webpack.HotModuleReplacementPlugin());
// config.plugins.push(new ExtractTextPlugin('ui-docs-samples.css'));

// module.exports = config;
