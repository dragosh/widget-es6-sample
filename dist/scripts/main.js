(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("lodash")) : factory(root["lodash"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/scripts/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	var _import = __webpack_require__(3);
	
	var math = _interopRequireWildcard(_import);
	
	var _import2 = __webpack_require__(2);
	
	var utils = _interopRequireWildcard(_import2);
	
	console.log(utils);
	var aggregation = function aggregation(baseClass) {
	    for (var _len = arguments.length, mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        mixins[_key - 1] = arguments[_key];
	    }
	
	    var base = (function (_baseClass) {
	        function _Combined() {
	            var _this = this;
	
	            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                args[_key2] = arguments[_key2];
	            }
	
	            _classCallCheck(this, _Combined);
	
	            _get(Object.getPrototypeOf(_Combined.prototype), "constructor", this).apply(this, args);
	            mixins.forEach(function (mixin) {
	                mixin.prototype.initializer.call(_this);
	            });
	        }
	
	        _inherits(_Combined, _baseClass);
	
	        return _Combined;
	    })(baseClass);
	    var copyProps = function copyProps(target, source) {
	        Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source)).forEach(function (prop) {
	            if (prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) return;
	            Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
	        });
	    };
	    mixins.forEach(function (mixin) {
	        copyProps(base.prototype, mixin.prototype);
	        copyProps(base, mixin);
	    });
	    return base;
	};
	
	var Colored = (function () {
	    function Colored() {
	        _classCallCheck(this, Colored);
	    }
	
	    _createClass(Colored, [{
	        key: "initializer",
	        value: function initializer() {
	            this._color = "white";
	        }
	    }, {
	        key: "color",
	        get: function () {
	            return this._color;
	        },
	        set: function (v) {
	            this._color = v;
	        }
	    }]);
	
	    return Colored;
	})();
	
	var ZCoord = (function () {
	    function ZCoord() {
	        _classCallCheck(this, ZCoord);
	    }
	
	    _createClass(ZCoord, [{
	        key: "initializer",
	        value: function initializer() {
	            this._z = 0;
	        }
	    }, {
	        key: "z",
	        get: function () {
	            return this._z;
	        },
	        set: function (v) {
	            this._z = v;
	        }
	    }]);
	
	    return ZCoord;
	})();
	
	var Shape = (function () {
	    function Shape(x, y) {
	        _classCallCheck(this, Shape);
	
	        this._x = x;this._y = y;
	    }
	
	    _createClass(Shape, [{
	        key: "x",
	        get: function () {
	            return this._x;
	        },
	        set: function (v) {
	            this._x = v;
	        }
	    }, {
	        key: "y",
	        get: function () {
	            return this._y;
	        },
	        set: function (v) {
	            this._y = v;
	        }
	    }]);
	
	    return Shape;
	})();
	
	var Rectangle = (function (_aggregation) {
	    function Rectangle() {
	        _classCallCheck(this, Rectangle);
	
	        if (_aggregation != null) {
	            _aggregation.apply(this, arguments);
	        }
	    }
	
	    _inherits(Rectangle, _aggregation);
	
	    return Rectangle;
	})(aggregation(Shape, Colored, ZCoord));
	
	var rect = new Rectangle(7, 42);
	rect.z = 1000;
	rect.color = "red";
	console.log(rect.x, rect.y, rect.z, rect.color);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sum = sum;
	
	function sum(x, y) {
	  return x + y;
	}
	
	var pi = 3.141593;
	exports.pi = pi;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=main.map