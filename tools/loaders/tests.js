 /**
  * ------------------------------------------------------------------------
  * Fonts loaders
  * ------------------------------------------------------------------------
  */
 module.exports = [{
    test: /\.test\.js$|\.spec\.js$/, // include only mock and test files
    loaders: ['babel?stage=0', 'eslint'],
    exclude: /(node_modules|bower_components)/
 }, {
    test: /\.js$/,
    loaders: ['isparta'],
    exclude: /node_modules|bower_components|\.test.js$|\.spec\.js$/ // exclude node_modules and test files
 }];
