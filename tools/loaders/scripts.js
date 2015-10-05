/**
* ------------------------------------------------------------------------
* Scripts loaders
* ------------------------------------------------------------------------
* @todo add ng-annotate loader for angular scripts
*/
module.exports = [{
    test: /\.js$/,
    loaders: ['babel?stage=0', 'eslint'],
    exclude: /(node_modules|bower_components)/,
}];
