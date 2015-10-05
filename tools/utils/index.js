'use strict';

/**
 * ------------------------------------------------------------------------
 * Tools Utilities
 * ------------------------------------------------------------------------
 */

const path = require('path');

exports.parseBoolean = function(val) {
    return (typeof val === 'boolean' && val) ||
        (typeof val === 'string' && /\s*true\s*/i.test(val)) ||
        (typeof val === 'number' && val !== 0);
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
