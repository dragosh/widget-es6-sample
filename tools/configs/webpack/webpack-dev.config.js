'use strict'

const path = require('path')
const utils = require('../../utils')
const addLoaders = require('../../loaders')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
    // plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
var BowerWebpackPlugin = require('bower-webpack-plugin');

var node_modules = utils.rootDir('node_modules');
var customLoadersPath = path.resolve(__dirname, '../loaders');

var addPlugins = function(setup) {
    var plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(setup.ENVS.CTX),
            'VERSION': JSON.stringify(setup.pckJson.version)
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new webpack.ProvidePlugin({
            jQuery: 'jQuery'
        }),
        new BowerWebpackPlugin({
            modulesDirectories: ['bower_components'],
            manifestFiles:      'bower.json',
            includes:           /\.js$/,
            excludes:           [node_modules],
            searchResolveModulesDirectories: true
        })
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
            id: utils.getlibName(setup.pckJson),
            library: utils.getlibName(setup.pckJson),
            libraryTarget: 'umd'
        },
        stats: {
            colors: true,
            reasons: true
        },
        plugins: addPlugins(setup),
        resolve: {
            extensions: ['', '.js', '.scss', '.woff', '.woff2', '.png', '.jpg'],
            modulesDirectories: ['resources', 'node_modules', 'features', 'bower_components']
        },
        resolveLoader: {
            modulesDirectories: [ customLoadersPath ],
            fallback: node_modules
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
