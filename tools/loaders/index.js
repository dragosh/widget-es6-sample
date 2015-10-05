/**
* ------------------------------------------------------------------------
* Loaders
* ------------------------------------------------------------------------
* @todo exclude styles from being tested
*/
const union = require('lodash/array/union')

const scripts = require('./scripts')
const tests = require('./tests')
const styles = require('./styles')
const files = require('./files')
const fonts = require('./fonts')
const images = require('./images')

var loaders = [styles, files, fonts, images];

module.exports = function (setup) {

    var context = setup.ENVS.CTX
    var coverage = setup.ENVS.COV
    var isTest = function() {
        return context.indexOf('test') >= 0 && coverage === true
    }
    if (isTest()) {
        loaders.push(tests)
    } else {
        loaders.push(scripts);
    }
    return union(loaders)
}
