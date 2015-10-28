/**
 * ------------------------------------------------------------------------
 * File loaders templates, html's, json etc
 * ------------------------------------------------------------------------
 * @todo add html-raw loader
 * @todo add json loader
 */
module.exports = [{
    test: /\.html$/,
    loader: 'raw!html-minify'
}, {
    test: /\.hbs$/,
    loader: 'handlebars-loader'
}, {
    test: /[\/\\]angular\.js$/,
    loader: 'exports?angular'
}, {
    test: /[\/\\](jQuery)\.js$/,
    loader: 'exports?jQuery!exports?$'
}, {
    test: /[\/\\](lodash)\.js$/,
    loader: 'exports?_'
}];
