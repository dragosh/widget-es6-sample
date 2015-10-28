'use strict';

/**
 * ------------------------------------------------------------------------
 * Tools Utilities
 * ------------------------------------------------------------------------
 */

const path = require('path')
const camelCase = require('lodash/string/camelCase')

exports.parseBoolean = function(val) {
    return (typeof val === 'boolean' && val) ||
        (typeof val === 'string' && /\s*true\s*/i.test(val)) ||
        (typeof val === 'number' && val !== 0);
}
exports.getlibName = function(pckJson) {
    const libName = pckJson.namespace && pckJson.namespace.split('.') || [];
    libName.push(camelCase(pckJson.name));
    return libName;
}

exports.rootDir = function rootDir() {
    // from ES2015
    // function rootDir(...paths) {
    //   paths.unshift(process.cwd());
    // }
    for (var _len = arguments.length, paths = Array(_len), _key = 0; _key < _len; _key++) {
        paths[_key] = arguments[_key];
    }

    paths.unshift(process.cwd());
    return path.join.apply(path, paths);
}
