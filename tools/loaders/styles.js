/**
* ------------------------------------------------------------------------
* Styles loaders
* ------------------------------------------------------------------------
*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const utils = require('../utils');

const scssLoaders = [
  'css?sourceMap',
  'sass?sourceMap&precision=10',
  'postcss'
];

module.exports = [{
    // CSS
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('css?sourceMap!postcss')
}, {
    // SCSS
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(scssLoaders.join('!') )
}];

