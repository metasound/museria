/*!
 * metasound face
 * @version 0.2.49
 * {@link https://github.com/ortexx/museria}
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FaceMetasound"] = factory();
	else
		root["FaceMetasound"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/assert/build/assert.js":
/*!*********************************************!*\
  !*** ./node_modules/assert/build/assert.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(/*! ./internal/errors */ "./node_modules/assert/build/internal/errors.js"),
    _require$codes = _require.codes,
    ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
    ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;

var AssertionError = __webpack_require__(/*! ./internal/assert/assertion_error */ "./node_modules/assert/build/internal/assert/assertion_error.js");

var _require2 = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require2.inspect;

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isPromise = _require$types.isPromise,
    isRegExp = _require$types.isRegExp;

var objectAssign = Object.assign ? Object.assign : (__webpack_require__(/*! es6-object-assign */ "./node_modules/es6-object-assign/index.js").assign);
var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;

function lazyLoadComparison() {
  var comparison = __webpack_require__(/*! ./internal/util/comparisons */ "./node_modules/assert/build/internal/util/comparisons.js");

  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
} // Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex


var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = ["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"];

var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};

var warned = false; // The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}

function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;

  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }

    if (argsLen === 2) operator = '!=';
  }

  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };

  if (message !== undefined) {
    errArgs.message = message;
  }

  var err = new AssertionError(errArgs);

  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }

  throw err;
}

assert.fail = fail; // The AssertionError is defined in internal/error.

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;

    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }

    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
} // Pure assertion tests whether a value is truthy, as determined
// by !!value.


function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  innerOk.apply(void 0, [ok, args.length].concat(args));
}

assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.

/* eslint-disable no-restricted-properties */

assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
}; // The non-equality assertion tests for whether two objects are not
// equal with !=.


assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
}; // The equivalence assertion tests a deep equality relation.


assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
}; // The non-equivalence assertion tests for any deep inequality.


assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */


assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;

function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};

var Comparison = function Comparison(obj, keys, actual) {
  var _this = this;

  _classCallCheck(this, Comparison);

  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
};

function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }

    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}

function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.

    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    } // Handle primitives properly.


    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }

    var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
    // as well.

    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }

    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
        return;
      }

      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  } // Guard instanceof against arrow functions as they don't have a prototype.


  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION_SENTINEL;
}

function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.
  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.
  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;

    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn(); // Fail in case no promise is returned.

      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }

    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}

function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }

    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }

    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }

  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';

    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }

    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }

  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}

function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;

  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }

  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }

  throw actual;
}

assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};

assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};

assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};

assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};

assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';

    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }

    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    }); // Make sure we actually have a stack trace!

    var origStack = err.stack;

    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift(); // Filter all frames existing in err.stack.

      var tmp1 = newErr.stack.split('\n');

      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);

        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }

      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }

    throw newErr;
  }
}; // Expose a strict only variant of assert


function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  innerOk.apply(void 0, [strict, args.length].concat(args));
}

assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ "./node_modules/assert/build/internal/assert/assertion_error.js":
/*!**********************************************************************!*\
  !*** ./node_modules/assert/build/internal/assert/assertion_error.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(/*! util/ */ "./node_modules/util/util.js"),
    inspect = _require.inspect;

var _require2 = __webpack_require__(/*! ../errors */ "./node_modules/assert/build/internal/errors.js"),
    ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat


function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));

  while (count) {
    str += str;
    count--;
  }

  str += str.substring(0, maxCount - str.length);
  return str;
}

var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
}; // Comparing short primitives should just show === / !== instead of using the
// diff.

var kMaxShortLength = 10;

function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}

function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}

function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.

  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  } // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.


  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.

    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;

      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        } // Ignore the first characters.


        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  } // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).


  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];

  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }

    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }

  var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.


    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);

      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }

    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }

  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }

  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }

  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");

  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;

    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the expected line to the cache.

      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++; // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the actual line to the result.

      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++; // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.

      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //

      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }

      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }

          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        } // Mark the current line as the last diverging one.


        lastPos = i; // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.

        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2; // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = ''; // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.

        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    } // Inspected object to big (Show ~20 rows max)


    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }

  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}

var AssertionError =
/*#__PURE__*/
function (_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(options) {
    var _this;

    _classCallCheck(this, AssertionError);

    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    var message = options.message,
        operator = options.operator,
        stackStartFn = options.stackStartFn;
    var actual = options.actual,
        expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;

    if (message != null) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      } // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.


      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }

      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.

        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        } // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.


        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);

          while (res.length > 27) {
            res.pop();
          }
        } // Only print a single input.


        if (res.length === 1) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
        } else {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
        }
      } else {
        var _res = inspectValue(actual);

        var other = '';
        var knownOperators = kReadableOperator[operator];

        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);

          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));

          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }

          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }

          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
      }
    }

    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;

    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    } // Create error message including the error code in the name.


    _this.stack; // Reset the name.

    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }

  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: inspect.custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread({}, ctx, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);

  return AssertionError;
}(_wrapNativeSuper(Error));

module.exports = AssertionError;

/***/ }),

/***/ "./node_modules/assert/build/internal/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/assert/build/internal/errors.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */

/* eslint node-core/alphabetize-errors: "error" */

/* eslint node-core/prefer-util-format-errors: "error" */
 // The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codes = {}; // Lazy loaded

var assert;
var util;

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inherits(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      var _this;

      _classCallCheck(this, NodeError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
      _this.code = code;
      return _this;
    }

    return NodeError;
  }(Base);

  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'

  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(/*! util/ */ "./node_modules/util/util.js");
  var inspected = util.inspect(value);

  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }

  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;

  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }

  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (assert === undefined) assert = __webpack_require__(/*! ../assert */ "./node_modules/assert/build/assert.js");
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });

  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;

    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;

    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }

  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ "./node_modules/assert/build/internal/util/comparisons.js":
/*!****************************************************************!*\
  !*** ./node_modules/assert/build/internal/util/comparisons.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var regexFlagsSupported = /a/g.flags !== undefined;

var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};

var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};

var objectIs = Object.is ? Object.is : __webpack_require__(/*! object-is */ "./node_modules/object-is/index.js");
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(/*! is-nan */ "./node_modules/is-nan/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);

var _require$types = (__webpack_require__(/*! util/ */ "./node_modules/util/util.js").types),
    isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
    isArrayBufferView = _require$types.isArrayBufferView,
    isDate = _require$types.isDate,
    isMap = _require$types.isMap,
    isRegExp = _require$types.isRegExp,
    isSet = _require$types.isSet,
    isNativeError = _require$types.isNativeError,
    isBoxedPrimitive = _require$types.isBoxedPrimitive,
    isNumberObject = _require$types.isNumberObject,
    isStringObject = _require$types.isStringObject,
    isBooleanObject = _require$types.isBooleanObject,
    isBigIntObject = _require$types.isBigIntObject,
    isSymbolObject = _require$types.isSymbolObject,
    isFloat32Array = _require$types.isFloat32Array,
    isFloat64Array = _require$types.isFloat64Array;

function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;

  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  } // The maximum size for an array is 2 ** 32 -1.


  return key.length === 10 && key >= Math.pow(2, 32);
}

function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
} // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3; // Check if they have the same source and flags

function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}

function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }

  return true;
}

function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}

function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}

function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }

  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }

  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }

  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }

  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
} // Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.


function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  } // Check more closely if val1 and val2 are equal.


  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }

    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }

    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }

      return false;
    }

    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }

  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }

    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.


  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }

  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    } // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.


    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);

    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (_keys.length !== _keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }

  return keyCheck(val1, val2, strict, memos, kNoIterator);
}

function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}

function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.

    if (aKeys.length !== bKeys.length) {
      return false;
    }
  } // Cheap key test


  var i = 0;

  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }

  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);

    if (symbolKeysA.length !== 0) {
      var count = 0;

      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];

        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }

          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }

      var symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }

  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  } // Use memos to handle cycles.


  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);

    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);

      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }

    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}

function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];

    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
} // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').


function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;

    case 'object':
      // Only pass in null as object!
      return undefined;

    case 'symbol':
      return false;

    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through

    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }

  }

  return true;
}

function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}

function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);

  if (altValue != null) {
    return altValue;
  }

  var curB = b.get(altValue);

  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }

  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}

function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);

  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.

    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      } // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.


      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.

      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }

      if (set === null) {
        set = new Set();
      }

      set.add(val);
    }
  }

  if (set !== null) {
    var bValues = arrayFromSet(b);

    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i]; // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.

      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];

    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);

  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
        key = _aEntries$i[0],
        item1 = _aEntries$i[1];

    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }

      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);

      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
        // keys.

        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;

        if (set === null) {
          set = new Set();
        }

        set.add(key);
      }
    }
  }

  if (set !== null) {
    var bEntries = arrayFromMap(b);

    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
          key = _bEntries$_i[0],
          item = _bEntries$_i[1];

      if (_typeof(key) === 'object' && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);

        for (; i < keysA.length; i++) {
          var key = keysA[i];

          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }

        if (keysA.length !== Object.keys(b).length) {
          return false;
        }

        return true;
      }
    }
  } // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:


  for (i = 0; i < keys.length; i++) {
    var _key = keys[i];

    if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
      return false;
    }
  }

  return true;
}

function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}

function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}

module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ "./node_modules/akili/src/akili.js":
/*!*****************************************!*\
  !*** ./node_modules/akili/src/akili.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component.js */ "./node_modules/akili/src/component.js");
/* harmony import */ var _components_if_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/if.js */ "./node_modules/akili/src/components/if.js");
/* harmony import */ var _components_for_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/for.js */ "./node_modules/akili/src/components/for.js");
/* harmony import */ var _components_select_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/select.js */ "./node_modules/akili/src/components/select.js");
/* harmony import */ var _components_input_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/input.js */ "./node_modules/akili/src/components/input.js");
/* harmony import */ var _components_radio_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/radio.js */ "./node_modules/akili/src/components/radio.js");
/* harmony import */ var _components_text_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/text.js */ "./node_modules/akili/src/components/text.js");
/* harmony import */ var _components_textarea_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/textarea.js */ "./node_modules/akili/src/components/textarea.js");
/* harmony import */ var _components_content_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/content.js */ "./node_modules/akili/src/components/content.js");
/* harmony import */ var _components_include_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/include.js */ "./node_modules/akili/src/components/include.js");
/* harmony import */ var _components_iframe_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/iframe.js */ "./node_modules/akili/src/components/iframe.js");
/* harmony import */ var _components_image_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/image.js */ "./node_modules/akili/src/components/image.js");
/* harmony import */ var _components_embed_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/embed.js */ "./node_modules/akili/src/components/embed.js");
/* harmony import */ var _components_audio_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/audio.js */ "./node_modules/akili/src/components/audio.js");
/* harmony import */ var _components_video_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/video.js */ "./node_modules/akili/src/components/video.js");
/* harmony import */ var _components_track_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/track.js */ "./node_modules/akili/src/components/track.js");
/* harmony import */ var _components_source_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/source.js */ "./node_modules/akili/src/components/source.js");
/* harmony import */ var _components_object_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/object.js */ "./node_modules/akili/src/components/object.js");
/* harmony import */ var _components_route_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/route.js */ "./node_modules/akili/src/components/route.js");
/* harmony import */ var _components_url_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _components_a_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/a.js */ "./node_modules/akili/src/components/a.js");
/* harmony import */ var _components_script_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/script.js */ "./node_modules/akili/src/components/script.js");
/* harmony import */ var _components_style_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/style.js */ "./node_modules/akili/src/components/style.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./scope.js */ "./node_modules/akili/src/scope.js");
/* harmony import */ var _event_emitter_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./event-emitter.js */ "./node_modules/akili/src/event-emitter.js");
/* harmony import */ var _services_request_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./services/request.js */ "./node_modules/akili/src/services/request.js");
/* harmony import */ var _services_router_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./services/router.js */ "./node_modules/akili/src/services/router.js");
/* harmony import */ var _services_store_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./services/store.js */ "./node_modules/akili/src/services/store.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./utils.js */ "./node_modules/akili/src/utils.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./globals.js */ "./node_modules/akili/src/globals.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Javascript framework
 *
 * const Akili = makeItEasy(js + html);
 *
 * @author Alexandr Balasyan <mywebstreet@gmail.com>
 * @link http://akilijs.com
 */
































/**
 * The framework main object
 * 
 * {@link https://akilijs.com/docs/getting-started}
 */
var Akili = {};
Akili.options = {
  debug: true
};
Akili.__init = null;
Akili.__root = null;
Akili.__components = {};
Akili.__aliases = {};
Akili.__scopes = {};
Akili.__storeLinks = {};
Akili.__window = {};
Akili.__tags = {};
Akili.__isolation = null;
Akili.__evaluation = null;
Akili.__wrapping = false;
Akili.__disableStoreProxy = false;
Akili.__rootOuterHTML = '';
Akili.__onError = function () {
  return Akili.triggerInit(false);
};
Akili.htmlBooleanAttributes = ['disabled', 'contenteditable', 'hidden'];
Akili.components = {};
Akili.services = {};
Akili.Component = _component_js__WEBPACK_IMPORTED_MODULE_2__["default"];
Akili.EventEmitter = _event_emitter_js__WEBPACK_IMPORTED_MODULE_26__["default"];
Akili.Scope = _scope_js__WEBPACK_IMPORTED_MODULE_25__["default"];
Akili.utils = _utils_js__WEBPACK_IMPORTED_MODULE_30__["default"];
Akili.globals = _globals_js__WEBPACK_IMPORTED_MODULE_31__["default"];
Akili.components.A = _components_a_js__WEBPACK_IMPORTED_MODULE_22__["default"];
Akili.components.Audio = _components_audio_js__WEBPACK_IMPORTED_MODULE_15__["default"];
Akili.components.Content = _components_content_js__WEBPACK_IMPORTED_MODULE_10__["default"];
Akili.components.For = _components_for_js__WEBPACK_IMPORTED_MODULE_4__["default"];
Akili.components.Embed = _components_embed_js__WEBPACK_IMPORTED_MODULE_14__["default"];
Akili.components.If = _components_if_js__WEBPACK_IMPORTED_MODULE_3__["default"];
Akili.components.Include = _components_include_js__WEBPACK_IMPORTED_MODULE_11__["default"];
Akili.components.Input = _components_input_js__WEBPACK_IMPORTED_MODULE_6__["default"];
Akili.components.Iframe = _components_iframe_js__WEBPACK_IMPORTED_MODULE_12__["default"];
Akili.components.Image = _components_image_js__WEBPACK_IMPORTED_MODULE_13__["default"];
Akili.components.Object = _components_object_js__WEBPACK_IMPORTED_MODULE_19__["default"];
Akili.components.Radio = _components_radio_js__WEBPACK_IMPORTED_MODULE_7__["default"];
Akili.components.Route = _components_route_js__WEBPACK_IMPORTED_MODULE_20__["default"];
Akili.components.Select = _components_select_js__WEBPACK_IMPORTED_MODULE_5__["default"];
Akili.components.Source = _components_source_js__WEBPACK_IMPORTED_MODULE_18__["default"];
Akili.components.Text = _components_text_js__WEBPACK_IMPORTED_MODULE_8__["default"];
Akili.components.Textarea = _components_textarea_js__WEBPACK_IMPORTED_MODULE_9__["default"];
Akili.components.Track = _components_track_js__WEBPACK_IMPORTED_MODULE_17__["default"];
Akili.components.Url = _components_url_js__WEBPACK_IMPORTED_MODULE_21__["default"];
Akili.components.Video = _components_video_js__WEBPACK_IMPORTED_MODULE_16__["default"];
Akili.components.Script = _components_script_js__WEBPACK_IMPORTED_MODULE_23__["default"];
Akili.components.Style = _components_style_js__WEBPACK_IMPORTED_MODULE_24__["default"];
Akili.services.request = _services_request_js__WEBPACK_IMPORTED_MODULE_27__["default"];
Akili.services.router = _services_router_js__WEBPACK_IMPORTED_MODULE_28__["default"];
Akili.services.store = _services_store_js__WEBPACK_IMPORTED_MODULE_29__["default"];

/**
 * Define the default components
 */
Akili.define = function () {
  _components_a_js__WEBPACK_IMPORTED_MODULE_22__["default"].define();
  _components_audio_js__WEBPACK_IMPORTED_MODULE_15__["default"].define();
  _components_content_js__WEBPACK_IMPORTED_MODULE_10__["default"].define();
  _component_js__WEBPACK_IMPORTED_MODULE_2__["default"].define();
  _components_embed_js__WEBPACK_IMPORTED_MODULE_14__["default"].define();
  _components_for_js__WEBPACK_IMPORTED_MODULE_4__["default"].define();
  _components_include_js__WEBPACK_IMPORTED_MODULE_11__["default"].define();
  _components_iframe_js__WEBPACK_IMPORTED_MODULE_12__["default"].define();
  _components_image_js__WEBPACK_IMPORTED_MODULE_13__["default"].define();
  _components_input_js__WEBPACK_IMPORTED_MODULE_6__["default"].define();
  _components_if_js__WEBPACK_IMPORTED_MODULE_3__["default"].define();
  _components_object_js__WEBPACK_IMPORTED_MODULE_19__["default"].define();
  _components_radio_js__WEBPACK_IMPORTED_MODULE_7__["default"].define();
  _components_route_js__WEBPACK_IMPORTED_MODULE_20__["default"].define();
  _components_select_js__WEBPACK_IMPORTED_MODULE_5__["default"].define();
  _components_source_js__WEBPACK_IMPORTED_MODULE_18__["default"].define();
  _components_textarea_js__WEBPACK_IMPORTED_MODULE_9__["default"].define();
  _components_track_js__WEBPACK_IMPORTED_MODULE_17__["default"].define();
  _components_video_js__WEBPACK_IMPORTED_MODULE_16__["default"].define();
  _components_script_js__WEBPACK_IMPORTED_MODULE_23__["default"].define();
  _components_style_js__WEBPACK_IMPORTED_MODULE_24__["default"].define();
};

/**
 * Clear the global context
 */
Akili.clearGlobals = function () {
  for (var key in _globals_js__WEBPACK_IMPORTED_MODULE_31__["default"]) {
    delete _globals_js__WEBPACK_IMPORTED_MODULE_31__["default"][key];
  }
  for (var _key in this.__window.Element.prototype) {
    Element.prototype[_key] = this.__window.Element.prototype[_key];
  }
  for (var _key2 in this.__window.Array.prototype) {
    Array.prototype[_key2] = this.__window.Array.prototype[_key2];
  }
  for (var _key3 in this.options.globals) {
    this.options.globals[_key3] = this.unwrap(this.options.globals[_key3]);
  }
  window.setTimeout = this.__window.setTimeout;
  window.setInterval = this.__window.setInterval;
  window.Promise = this.__window.Promise;
  window.removeEventListener('error', this.__onError);
};

/**
 * Join the binding keys
 *
 * @param {string[]} keys binding keys
 */
Akili.joinBindingKeys = function (keys) {
  return keys.map(function (el) {
    return el.toString();
  }).join('.');
};

/**
 * Add the scope
 *
 * @param scope
 */
Akili.addScope = function (scope) {
  if (this.__scopes[scope.__name]) {
    throw new Error("Scope name ".concat(scope.__name, " already exists"));
  }
  this.__scopes[scope.__name] = scope;
};

/**
 * Get the scope
 *
 * @param {string} name - scope name
 * @returns {Scope}
 */
Akili.getScope = function (name) {
  return this.__scopes[name];
};

/**
 * Remove the scope
 *
 * @param {string} name - scope name
 */
Akili.removeScope = function (name) {
  delete this.__scopes[name];
};

/**
 * Get all elements that is wrapped in the Akili component
 *
 * @param {Element} el
 * @param {boolean} [tree=true] - return array of the parents if true, closest parent if false
 * @returns {Array|Element|null}
 */
Akili.getAkiliParents = function (el) {
  var tree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arr = [];
  function check(node) {
    if (!node.parentNode) {
      return;
    }
    if (node.parentNode.__akili) {
      arr.push(node.parentNode);
      if (!tree) {
        return;
      }
    }
    check(node.parentNode);
  }
  check(el);
  return tree ? arr : arr[0];
};

/**
 * Create the template
 *
 * @example
 * // returns "<i>Hello</i><b>World</b>"
 * el.innerHTML = "<b>World</b>";
 * Akili.setTemplate(el, "<i>Hello</i>${this.__content}");
 *
 * @param {Element} el
 * @param {string} template
 * @returns {string}
 */
Akili.setTemplate = function (el, template) {
  template = template.replace(/\${(((?!\${)\s*this\.__content\s*)*)}/, el.innerHTML);
  el.innerHTML = template;
  return el.innerHTML;
};

/**
 * Generate the unique scope name
 *
 * @returns {string}
 */
Akili.createScopeName = function () {
  var _this = this;
  return _utils_js__WEBPACK_IMPORTED_MODULE_30__["default"].createRandomString(16, function (str) {
    return !!_this.__scopes[str];
  });
};

/**
 * Isolate the scope changes
 *
 * @param {function} fn
 * @returns {*}
 */
Akili.isolate = function (fn) {
  var isolation = this.__isolation;
  !isolation && (this.__isolation = {});
  var res;
  try {
    res = fn();
    if (isolation) {
      return res;
    }
  } catch (err) {
    this.__isolation = null;
    throw err;
  }
  var props = [];
  for (var k in this.__isolation) {
    props.push(this.__isolation[k]);
  }
  this.__isolation = null;
  for (var i = 0, l = props.length; i < l; i++) {
    var prop = props[i];
    if (!prop.component) {
      var value = _utils_js__WEBPACK_IMPORTED_MODULE_30__["default"].copy(_utils_js__WEBPACK_IMPORTED_MODULE_30__["default"].getPropertyByKeys(prop.rootKeys, _services_store_js__WEBPACK_IMPORTED_MODULE_29__["default"].__target), {
        plain: true
      });
      this.root && this.root.__storeTriggerByName(prop.rootKey, value);
      continue;
    }
    if (prop.component.__isRemoved) {
      continue;
    }
    prop.component.scope[prop.rootKey] = _utils_js__WEBPACK_IMPORTED_MODULE_30__["default"].getPropertyByKeys(prop.rootKeys, prop.component.__scope);
  }
  return res;
};

/**
 * Stop the evaluation inside the function
 *
 * @param {function} fn
 * @returns {*}
 */
Akili.unevaluate = function (fn) {
  var evaluation = this.__evaluation;
  this.__evaluation = null;
  var res;
  try {
    res = fn();
  } catch (err) {
    this.__evaluation = evaluation;
    throw err;
  }
  this.__evaluation = evaluation;
  return res;
};

/**
 * Evaluate only the root properties
 *
 * @param {function} fn
 * @returns {*}
 */
Akili.wrapping = function (fn) {
  var wrapping = this.__wrapping;
  !wrapping && (this.__wrapping = true);
  var res;
  try {
    res = this.isolate(fn);
    if (wrapping) {
      return res;
    }
  } catch (err) {
    this.__wrapping = false;
    throw err;
  }
  this.__wrapping = false;
  return res;
};

/**
 * Stop the isolation inside the function
 *
 * @param {function} fn
 * @returns {*}
 */
Akili.unisolate = function (fn) {
  var isolation = this.__isolation;
  this.__isolation = null;
  var res;
  try {
    res = fn();
  } catch (err) {
    this.__isolation = isolation;
    throw err;
  }
  this.__isolation = isolation;
  return res;
};

/**
 * Initialize the element
 *
 * @param {Element} el
 * @param {object} [options={}]
 * @returns {*}
 */
Akili.initialize = function (el) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var recompile = options.recompile;
  var component = el.__akili;
  if (component) {
    if (recompile) {
      component.__recompile(recompile === true ? {} : recompile);
      return component;
    }
    return;
  }
  var isRoot = el === this.__root;
  var componentName = _utils_js__WEBPACK_IMPORTED_MODULE_30__["default"].toDashCase(el.getAttribute('component') || el.tagName.toLowerCase());
  var _Component = this.__components[componentName];
  CHECK_ALIASES: if (!_Component) {
    var selectors = Object.keys(this.__aliases);
    if (!selectors.length) {
      break CHECK_ALIASES;
    }
    var selectorAll = selectors.join(',');
    if (!el.matches(selectorAll)) {
      break CHECK_ALIASES;
    }
    for (var i = 0, l = selectors.length; i < l; i++) {
      var selector = selectors[i];
      if (el.matches(selector)) {
        _Component = this.__components[this.__aliases[selector]];
        break;
      }
    }
  }
  if (!_Component && !isRoot) {
    return;
  }
  if (!_Component) {
    _Component = this.Component;
  }
  if (_Component.matches && !el.matches(_Component.matches)) {
    return;
  }
  component = new _Component(el, {});
  if (component.__cancelled) {
    return;
  }
  if (Akili.getAkiliParents(el).find(function (p) {
    return p.__akili.__prevent;
  })) {
    return;
  }
  component.__create();
  return component;
};

/**
 * Compile the element
 *
 * @param {Element} root
 * @param {object} [options]
 * @returns {Promise}
 */
Akili.compile = function (root) {
  var _this2 = this;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    recompile: false
  };
  var elements = [];
  if (window.AKILI_SSR) {
    var arr = root.querySelectorAll('[no-ssr]');
    for (var i = 0, l = arr.length; i < l; i++) {
      arr[i].remove();
    }
  }
  var nestedInitializing = function nestedInitializing(el) {
    var component = _this2.initialize(el, options);
    var children = el.children;
    component && elements.push(component);
    for (var _i = 0, _l = children.length; _i < _l; _i++) {
      var child = children[_i];
      nestedInitializing(child);
    }
  };
  nestedInitializing(root);
  var p = [];
  for (var _i2 = 0, _l2 = elements.length; _i2 < _l2; _i2++) {
    var component = elements[_i2];
    p.push(component.__compile());
  }
  return Promise.all(p).then(function () {
    var r = [];
    for (var _i3 = elements.length - 1; _i3 >= 0; _i3--) {
      var _component = elements[_i3];
      r.push(_component.__resolve());
    }
    return Promise.all(r);
  });
};

/**
 * Register the component.
 * Or get it if the function is not passed
 *
 * @param {string} name
 * @param {Component} [fn]
 */
Akili.component = function (name, fn) {
  name = name.toLowerCase();
  if (!fn) {
    return this.__components[name] || null;
  }
  if (this.__components[name] && Akili.options.debug) {
    // eslint-disable-next-line no-console
    console.warn("Component ".concat(name, " already was added"));
  }
  this.__components[name] = fn;
};

/**
 * Remove the component
 *
 * @param {string} name
 */
Akili.removeComponent = function (name) {
  delete this.__components[name];
};

/**
 * Register the selector alias.
 * Or get it if the component name is not passed
 *
 * @param {string} selector - DOM selector
 * @param {string} [componentName]
 */
Akili.alias = function (selector) {
  var componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  componentName = componentName.toLowerCase();
  if (!componentName) {
    return this.__aliases[selector] || null;
  }
  if (this.__aliases[selector] && Akili.options.debug) {
    // eslint-disable-next-line no-console
    console.warn("Alias with selector ".concat(selector, " already was added"));
  }
  this.__aliases[selector] = componentName;
};

/**
 * Remove the selector alias
 *
 * @param {string} selector
 */
Akili.removeAlias = function (selector) {
  delete this.__aliases[selector];
};

/**
 * Isolate the array prototype functions
 */
Akili.isolateArrayPrototype = function () {
  var _this3 = this;
  this.__window.Array = {
    prototype: {}
  };
  var keys = Object.getOwnPropertyNames(Array.prototype);
  var _loop = function _loop() {
    var key = keys[i];
    var old = Array.prototype[key];
    if (typeof old != 'function' || key == 'constructor') {
      return "continue";
    }
    _this3.__window.Array.prototype[key] = old;
    Array.prototype[key] = function () {
      var _arguments = arguments,
        _this4 = this;
      return Akili.unevaluate(function () {
        if (!_this4.__isProxy) {
          return old.apply(_this4, _arguments);
        }
        return Akili.isolate(function () {
          return old.apply(_this4, _arguments);
        });
      });
    };
  };
  for (var i = 0, l = keys.length; i < l; i++) {
    var _ret = _loop();
    if (_ret === "continue") continue;
  }
};

/**
 * Isolate the window functions
 */
Akili.isolateWindowFunctions = function () {
  this.__window.setTimeout = setTimeout;
  this.__window.setInterval = setInterval;
  this.__window.Promise = window.Promise;
  window.setTimeout = this.createCallbackIsolation(window.setTimeout, 0);
  window.setInterval = this.createCallbackIsolation(window.setInterval, 0);
  if (!window.AKILI_SSR) {
    window.Promise.constructor = this.createCallbackIsolation(window.Promise.constructor);
    window.Promise.prototype.then = this.createCallbackIsolation(window.Promise.prototype.then, [0, 'last']);
    window.Promise.prototype["catch"] = this.createCallbackIsolation(window.Promise.prototype["catch"]);
  }
};

/**
 * Isolate the globals
 */
Akili.isolateGlobals = function () {
  _globals_js__WEBPACK_IMPORTED_MODULE_31__["default"].__target.utils = this.wrap(_utils_js__WEBPACK_IMPORTED_MODULE_30__["default"]);
  this.isolateEvents();
  this.isolateArrayPrototype();
  this.isolateWindowFunctions();
};

/**
 * Isolate the event listeners
 */
Akili.isolateEvents = function () {
  this.__window.Element = {
    prototype: {}
  };
  if (window.AKILI_SSR) {
    return;
  }
  this.__window.Element.prototype.addEventListener = Element.prototype.addEventListener;
  this.__window.Element.prototype.removeEventListener = Element.prototype.removeEventListener;
  this.__window.Element.prototype.remove = Element.prototype.remove;
  Element.prototype.remove = function () {
    delete this.__akiliListeners;
    return Akili.__window.Element.prototype.remove.apply(this, arguments);
  };
  Element.prototype.addEventListener = function (name, fn) {
    var args = [].slice.call(arguments);
    if (!this.__akiliListeners) {
      this.__akiliListeners = {};
    }
    if (!this.__akiliListeners[name]) {
      this.__akiliListeners[name] = [];
    }
    if (typeof fn === 'function') {
      args[1] = function () {
        var _arguments2 = arguments,
          _this5 = this;
        return Akili.isolate(function () {
          return fn.apply(_this5, _arguments2);
        });
      };
    }
    this.__akiliListeners[name].push({
      link: fn,
      fn: args[1]
    });
    return Akili.__window.Element.prototype.addEventListener.apply(this, args);
  };
  Element.prototype.removeEventListener = function (name, fn) {
    var args = [].slice.call(arguments);
    if (!this.__akiliListeners) {
      this.__akiliListeners = {};
    }
    if (!this.__akiliListeners[name]) {
      this.__akiliListeners[name] = [];
    }
    for (var i = 0, l = this.__akiliListeners[name].length; i < l; i++) {
      var listener = this.__akiliListeners[name][i];
      if (listener.link === fn) {
        this.__akiliListeners[name].splice(i, 1);
        args[1] = listener.fn;
        i--;
        l--;
        break;
      }
    }
    if (!this.__akiliListeners[name].length) {
      delete this.__akiliListeners[name];
    }
    return Akili.__window.Element.prototype.removeEventListener.apply(this, args);
  };
};

/**
 * Wrap the function callback with the isolation context
 *
 * @param {function} fn
 * @param {number|string|number[]|string[]} [pos="last"]
 * @returns {function}
 */
Akili.createCallbackIsolation = function (fn) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'last';
  return function () {
    var args = [].slice.call(arguments);
    !Array.isArray(pos) && (pos = [pos]);
    var _loop2 = function _loop2() {
      var num = pos[i];
      var index = num;
      var callback = args[num];
      if (num == 'last') {
        index = args.length - 1;
        callback = args[index];
      }
      if (typeof callback != 'function') {
        return "continue";
      }
      if (!callback.__isolated) {
        args[index] = function () {
          var _arguments3 = arguments;
          return Akili.isolate(function () {
            return callback.apply(callback, _arguments3);
          });
        };
        Object.defineProperty(args[index], '__isolated', {
          enumerable: false,
          value: callback
        });
      }
    };
    for (var i = 0, l = pos.length; i < l; i++) {
      var _ret2 = _loop2();
      if (_ret2 === "continue") continue;
    }
    return fn.apply(this, args);
  };
};

/**
 * Wrap the object/function to isolate and unevaluate data
 *
 * @param {object|function} obj
 * @param {object} [options] 
 */
Akili.wrap = function (obj) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var current = obj;
  if (typeof obj == 'function') {
    obj = this.wrapFunction(obj, options);
    if (obj === current) {
      return obj;
    }
  } else if (!obj || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(obj) != 'object' || Array.isArray(obj)) {
    return obj;
  }
  var keys = Object.getOwnPropertyNames(obj);
  for (var k = 0, c = keys.length; k < c; k++) {
    var key = keys[k];
    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (!descriptor.configurable || !descriptor.writable) {
      continue;
    }
    if (options.reverse) {
      Object.defineProperty(obj, key, _objectSpread(_objectSpread({}, descriptor), {}, {
        value: obj[key].__akili || obj[key]
      }));
      continue;
    }
    Object.defineProperty(obj, key, _objectSpread(_objectSpread({}, descriptor), {}, {
      value: this.wrap(obj[key], options)
    }));
  }
  return obj;
};

/**
 * Unwrap the object/function
 *
 * @param {object|function} obj
 */
Akili.unwrap = function (obj) {
  return this.wrap(obj, {
    reverse: true
  });
};

/**
 * Isolate the function
 *
 * @param {function} fn
 * @param {object} [options] 
 * @returns {function}
 */
Akili.wrapFunction = function (fn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (fn.__akili) {
    return fn;
  }
  var akiliWrappedFunction = function akiliWrappedFunction() {
    var _arguments4 = arguments,
      _this6 = this;
    if (options.tag && Akili.__evaluation) {
      Akili.addTag(options.tag, Akili.__evaluation.node);
    }
    return Akili.wrapping(function () {
      return fn.apply(_this6, _arguments4);
    });
  };
  var keys = Object.keys(fn);
  akiliWrappedFunction.prototype = fn.prototype;
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    akiliWrappedFunction[key] = fn[key];
  }
  Object.defineProperty(akiliWrappedFunction, '__akili', {
    enumerable: false,
    value: fn
  });
  return akiliWrappedFunction;
};

/**
 * Add the tag
 * 
 * @param {string} tag
 * @param {Node} node
 */
Akili.addTag = function (tag, node) {
  if (this.hasTag(tag, node)) {
    return;
  }
  if (!this.__tags[node.__name]) {
    this.__tags[node.__name] = {};
  }
  if (!this.__tags[node.__name][tag]) {
    this.__tags[node.__name][tag] = [];
  }
  this.__tags[node.__name][tag].push({
    node: node
  });
};

/**
 * Get the tag
 * 
 * @param {string} tag
 * @param {Node} [node]
 * @returns {array|null}
 */
Akili.getTag = function (tag, node) {
  if (!node) {
    for (var key in this.__tags) {
      for (var k in this.__tags[key]) {
        if (k == tag) {
          return this.__tags[key][k];
        }
      }
    }
    return null;
  }
  if (this.__tags[node.__name] && this.__tags[node.__name][tag]) {
    return this.__tags[node.__name][tag];
  }
  return null;
};

/**
 * Check the tag exists
 * 
 * @param {string} tag
 * @param {Node} [node]
 * @returns {boolean}
 */
Akili.hasTag = function (tag, node) {
  return !!this.getTag(tag, node);
};

/**
 * Remove the tag
 * 
 * @param {string} [tag]
 * @param {Node} [node]
 */
Akili.removeTag = function (tag, node) {
  if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(tag) == 'object') {
    node = tag;
    tag = undefined;
  }
  if (!tag) {
    delete this.__tags[node.__name];
    return;
  }
  if (!node) {
    for (var key in this.__tags) {
      for (var k in this.__tags[key]) {
        if (k == tag) {
          delete this.__tags[key][k];
        }
      }
      if (!Object.keys(this.__tags[key]).length) {
        delete this.__tags[key];
      }
    }
    return;
  }
  for (var _key4 in this.__tags[node.__name]) {
    if (_key4 == tag) {
      delete this.__tags[node.__name][_key4];
    }
  }
  if (!Object.keys(this.__tags[node.__name]).length) {
    delete this.__tags[node.__name];
  }
};

/**
 * Evaluate the tag expressions
 * 
 * @param {string} tag
 */
Akili.triggerTag = function (tag) {
  for (var key in this.__tags) {
    for (var k in this.__tags[key]) {
      if (k == tag) {
        var arr = this.__tags[key][k];
        for (var i = 0, l = arr.length; i < l; i++) {
          var obj = arr[i];
          obj.node.__component.__evaluateNode(obj.node, false);
        }
      }
    }
  }
};

/**
 * Handle the errors
 */
Akili.handleErrors = function () {
  window.addEventListener('error', this.__onError);
};

/**
 * Trigger the initialization status
 *
 * @param {boolean} status
 */
Akili.triggerInit = function (status) {
  Akili.__init = status;
  window.dispatchEvent(new CustomEvent('akili-init', {
    detail: status
  }));
};

/**
 * Initialize the application
 *
 * @param {Element} [root]
 * @returns {Promise}
 */
Akili.init = function (root) {
  var _this7 = this;
  root = root || document.body;
  this.__rootOuterHTML = root.outerHTML;
  if (!(root instanceof Element)) {
    throw new Error("Root element must be an html element");
  }
  if (root === document.documentElement) {
    throw new Error("\"html\" can't be the root element");
  }
  this.__root = root;
  if (window.AKILI_SERVER) {
    Akili.initServerSideHtml(window.AKILI_SERVER.html);
    Akili.initServerSideRequestCache(window.AKILI_SERVER.requestCache);
  } else {
    window.AKILI_CLIENT = {
      html: this.prepareServerSideHtml()
    };
  }
  return this.compile(this.__root).then(function () {
    if (_services_router_js__WEBPACK_IMPORTED_MODULE_28__["default"].__init) {
      return _services_router_js__WEBPACK_IMPORTED_MODULE_28__["default"].changeState();
    }
  }).then(function () {
    window.AKILI_CLIENT && (window.AKILI_CLIENT.requestCache = _this7.prepareServerSideRequestCache());
    _this7.triggerInit(true);
  })["catch"](function (err) {
    _this7.triggerInit(false);
    throw err;
  });
};

/**
 * Deinitialize the application
 */
Akili.deinit = function () {
  this.__root && (this.__root.outerHTML = this.__rootOuterHTML);
  for (var key in this.__scopes) {
    var component = this.__scopes[key].__component;
    component && component.remove();
  }
  this.__rootOuterHTML = '';
  this.__init = null;
  this.__root = null;
  this.__scopes = {};
  this.__storeLinks = {};
  this.__tags = {};
};

/**
 * Destroy the framework
 */
Akili.destroy = function () {
  this.deinit();
  this.clearGlobals();
  var storeKeys = Object.keys(_services_store_js__WEBPACK_IMPORTED_MODULE_29__["default"].__target);
  for (var i = 0, l = storeKeys.length; i < l; i++) {
    delete _services_store_js__WEBPACK_IMPORTED_MODULE_29__["default"].__target[storeKeys[i]];
  }
  _services_router_js__WEBPACK_IMPORTED_MODULE_28__["default"].__init && _services_router_js__WEBPACK_IMPORTED_MODULE_28__["default"].deinit();
  delete window.AKILI_SERVER;
  delete window.AKILI_CLIENT;
  delete window.AKILI_SSR;
  for (var key in Akili) {
    delete Akili[key];
  }
  delete window.Akili;
};

/**
 * Initialize the SSR html
 * 
 * @param {string} html
 */
Akili.initServerSideHtml = function (html) {
  for (var i = this.__root.attributes.length - 1; i >= 0; i--) {
    this.__root.removeAttribute(this.__root.attributes[i].name);
  }
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, "text/html");
  var el = doc.querySelector(this.__root === document.body ? 'body' : 'body > *');
  this.__root.innerHTML = el.innerHTML;
  for (var _i4 = el.attributes.length - 1; _i4 >= 0; _i4--) {
    var attr = el.attributes[_i4];
    this.__root.setAttribute(attr.name, attr.value);
  }
};

/**
 * Initialize the SSR cache
 * 
 * @param {object} obj
 */
Akili.initServerSideRequestCache = function (obj) {
  var init = function init(instance, obj) {
    for (var key in obj) {
      instance.__cache[key] = obj[key];
    }
  };
  for (var key in obj) {
    var instance = key === '__main' ? _services_request_js__WEBPACK_IMPORTED_MODULE_27__["default"] : _services_request_js__WEBPACK_IMPORTED_MODULE_27__["default"].__instances[key];
    init(instance, obj[key]);
  }
};

/**
 * Prepare the SSR html
 */
Akili.prepareServerSideHtml = function () {
  return this.__root.outerHTML;
};

/**
 * Prepare the SSR cache
 */
Akili.prepareServerSideRequestCache = function () {
  var cache = {
    __main: _services_request_js__WEBPACK_IMPORTED_MODULE_27__["default"].__cache
  };
  for (var key in _services_request_js__WEBPACK_IMPORTED_MODULE_27__["default"].__instances) {
    cache[key] = _services_request_js__WEBPACK_IMPORTED_MODULE_27__["default"].__instances[key].__cache;
  }
  return cache;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Akili);
window.Akili = Akili;
Akili.define();
Akili.handleErrors();
Akili.isolateGlobals();

/***/ }),

/***/ "./node_modules/akili/src/component.js":
/*!*********************************************!*\
  !*** ./node_modules/akili/src/component.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component),
/* harmony export */   evaluationRegex: () => (/* binding */ evaluationRegex),
/* harmony export */   evaluationRegexGlobal: () => (/* binding */ evaluationRegexGlobal),
/* harmony export */   systemAttributes: () => (/* binding */ systemAttributes)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/construct */ "./node_modules/@babel/runtime/helpers/esm/construct.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scope.js */ "./node_modules/akili/src/scope.js");
/* harmony import */ var _services_request_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/request.js */ "./node_modules/akili/src/services/request.js");
/* harmony import */ var _services_store_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/store.js */ "./node_modules/akili/src/services/store.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./globals.js */ "./node_modules/akili/src/globals.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils.js */ "./node_modules/akili/src/utils.js");






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }






var evaluationRegex = /\${(((?!\${).)*)}/;
var evaluationRegexGlobal = new RegExp(evaluationRegex.source, "g");
var systemAttributes = ['component', 'scope', 'no-ssr'];

/**
 * Base class from which all components are inherited
 */
var Component = /*#__PURE__*/function () {
  /** 
   * @param {Element} el
   * @param {object} [scope] 
   */
  function Component(el) {
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Component);
    if (!(el instanceof Element)) {
      throw new Error("You must pass an html element to the component constructor");
    }
    this.__isCreated = false;
    this.__isMounted = false;
    this.__isCompiled = false;
    this.__isResolved = false;
    this.__isRemoved = false;
    this.__cancelled = false;
    this.__prevent = false;
    this.__bindings = {};
    this.__evaluatingEvent = null;
    this.__recompiling = null;
    this.__compiling = null;
    this.__disableProxy = {};
    this.__disableStoreKeys = {};
    this.__disableAttrKeys = {};
    this.__children = [];
    this.__parent = null;
    this.__parents = [];
    this.__content = '';
    this.__attrs = {};
    this.__attrLinks = {};
    this.__storeLinks = {};
    this.__attributeOf = null;
    this.__evaluationComponent = this;
    this.scope = scope;
    this.el = el;
    !this.constructor.ssr && window.AKILI_SSR && this.cancel();
  }

  /**
   * Create the compilation options 
   * 
   * @param {object} [options]
   * @protected
   */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Component, [{
    key: "__createCompilationOptions",
    value: function __createCompilationOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread({
        checkChanges: false,
        setEvents: true,
        setParents: true,
        setBooleanAttributes: true,
        defineAttributes: true
      }, options);
    }

    /**
     * Create the recompilation options 
     * 
     * @param {object} [options]
     * @protected
     */
  }, {
    key: "__createRecompilationOptions",
    value: function __createRecompilationOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _objectSpread(_objectSpread({}, this.__createCompilationOptions()), {}, {
        setEvents: false,
        setParents: false,
        defineAttributes: false
      }, options);
    }

    /**
     * Recompile the component
     * 
     * @param {object} [options]
     * @protected
     */
  }, {
    key: "__recompile",
    value: function __recompile() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.__isMounted = false;
      this.__recompiling = true;
      this.__evaluationComponent.__disableProxy = {};
      this.__compiling = this.__createRecompilationOptions(options);
      this.__compiling.setEvents && this.__setEvents();
      this.__compiling.setParents && this.__setParents();
      this.__compiling.setBooleanAttributes && this.__setBooleanAttributes();
      this.__compiling.defineAttributes && this.__defineAttributes();
    }

    /**
     * Create the component
     *
     * @protected
     */
  }, {
    key: "__create",
    value: function __create() {
      var _this = this;
      this.__compiling = this.__createCompilationOptions();
      this.__initialize();
      this.__setEvents();
      this.__setParents();
      this.__setBooleanAttributes();
      this.__defineAttributes();
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].isolate(function () {
        return _this.created(_this.attrs);
      });
      this.__isCreated = true;
    }

    /**
     * Compile the node
     *
     * @protected
     * @returns {Promise}
     */
  }, {
    key: "__compile",
    value: function __compile() {
      var _this2 = this;
      var control = this.__controlAttributes || !this.__evaluationParent;
      var p = Promise.resolve();
      this.__attributeOf = control ? this : this.__evaluationParent.__akili;
      if (!this.__recompiling || this.__compiling.newParent || this.__controlAttributes) {
        this.__interpolateAttributes(this.el, this.__attributeOf);
      }
      var interpolate = function interpolate(children, parent) {
        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          if (child.nodeType == 3 && _this2.__initializeNode(child, parent)) {
            _this2.__evaluateNode(child, _this2.__compiling ? _this2.__compiling.checkChanges : false);
          } else if (child.nodeType == 1 && !child.__akili) {
            _this2.__interpolateAttributes(child);
            interpolate(child.childNodes, child);
          }
        }
      };
      interpolate(this.el.childNodes, this.el);
      this.__isMounted = true;
      var res;
      if (!this.__recompiling) {
        res = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].isolate(function () {
          _this2.attrs.onCompiled && _this2.attrs.onCompiled.trigger(undefined, {
            bubbles: false
          });
          return _this2.compiled();
        });
        if (this.constructor.templateUrl) {
          p = _services_request_js__WEBPACK_IMPORTED_MODULE_8__["default"].get(this.constructor.templateUrl, {
            cache: this.constructor.templateCache
          }).then(function (res) {
            _this2.el.innerHTML = _this2.__content;
            _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].setTemplate(_this2.el, res.data);
            delete _this2.__content;
            return _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].compile(_this2.el, {
              recompile: true
            });
          });
        }
      } else {
        res = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].isolate(function () {
          _this2.attrs.onRecompiled && _this2.attrs.onRecompiled.trigger(undefined, {
            bubbles: false
          });
          _this2.recompiled();
        });
      }
      this.__recompiling = null;
      this.__compiling = null;
      return p.then(function () {
        _this2.__isCompiled = true;
        return res;
      });
    }

    /**
     * Resolve the component
     *
     * @protected
     * @returns {Promise}
     */
  }, {
    key: "__resolve",
    value: function __resolve() {
      var _this3 = this;
      if (this.__isResolved || this.__isRemoved) {
        return Promise.resolve();
      }
      this.attrs.onResolved && this.attrs.onResolved.trigger(undefined, {
        bubbles: false
      });
      return Promise.resolve(_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].isolate(function () {
        return _this3.resolved();
      })).then(function (res) {
        _this3.__isResolved = true;
        return res;
      });
    }

    /**
     * Initialize the component
     *
     * @protected
     */
  }, {
    key: "__initialize",
    value: function __initialize() {
      var parent = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].getAkiliParents(this.el, false);
      var Scope = this.constructor.scope || _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].Scope;
      var scope;
      var isRoot = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__root === this.el;
      this.el.__akili = this;
      if (parent) {
        scope = new Scope(this.el.getAttribute('scope') || _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].createScopeName(), this.el, this);
      } else {
        scope = new Scope(isRoot ? 'root' : _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].createScopeName(), this.el, this);
        isRoot && (_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].root = this);
      }
      var __scope = scope;
      var _scope = Object.assign(scope, this.scope);
      var controlAttributes = this.constructor.controlAttributes;
      var events = this.constructor.events;
      if (this.constructor.template) {
        _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].setTemplate(this.el, this.constructor.template);
      }
      if (this.constructor.templateUrl) {
        this.__content = this.el.innerHTML;
        this.el.innerHTML = '';
      }
      this.__scope = __scope;
      this.__events = events;
      this.__controlAttributes = controlAttributes;
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].addScope(scope);
      this.scope = this.__nestedObserve(_scope, []);
      return true;
    }

    /**
     * Set the boolean attributes
     *
     * @protected
     */
  }, {
    key: "__setBooleanAttributes",
    value: function __setBooleanAttributes() {
      var _this4 = this;
      this.booleanAttributes = [].concat(_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].htmlBooleanAttributes, this.constructor.booleanAttributes);
      var setAttr = function setAttr(el) {
        for (var i = 0, attrs = el.attributes, l = attrs.length; i < l; i++) {
          var node = attrs[i];
          if (_this4.booleanAttributes.indexOf(node.nodeName) != -1) {
            if (el.hasAttribute("boolean-".concat(node.nodeName))) {
              continue;
            }
            el.setAttribute("boolean-".concat(node.nodeName), el.getAttribute(node.nodeName) || node.nodeName);
            el.removeAttribute(node.nodeName);
          }
        }
        for (var _i = 0, _l = el.children.length; _i < _l; _i++) {
          var child = el.children[_i];
          if (!child.__akili) {
            setAttr(child);
          }
        }
      };
      setAttr(this.el);
    }

    /**
     * Set the events
     *
     * @protected
     */
  }, {
    key: "__setEvents",
    value: function __setEvents() {
      for (var i = 0, l = this.__events.length; i < l; i++) {
        var ev = this.__events[i];
        !/^on-/i.test(ev) && (ev = 'on-' + ev);
        if (!this.el.hasAttribute(ev)) {
          this.el.setAttribute(ev, '');
        }
      }
    }

    /**
     * Set the component parents
     *
     * @protected
     */
  }, {
    key: "__setParents",
    value: function __setParents() {
      var parents = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].getAkiliParents(this.el);
      if (!parents.length) {
        return;
      }
      var newParent = this.__parent !== parents[0];
      var evaluationParent = null;
      for (var i = 0, l = parents.length; i < l; i++) {
        var parent = parents[i];
        if (!parent.__akili.constructor.transparent) {
          evaluationParent = parent;
          break;
        }
      }
      this.__compiling.newParent = newParent;
      newParent && this.__detach();
      if (this.constructor.transparent) {
        this.__evaluationComponent = evaluationParent.__akili;
      }
      this.__evaluationParent = evaluationParent;
      this.__parent = parents[0];
      this.__parents = parents;
      this.scope.__parent = this.__evaluationParent.__akili.scope;
      !this.__recompiling && this.__parent.__akili.__addChild(this.el);
      Object.setPrototypeOf(this.scope, this.__parent.__akili.__scope);
    }

    /**
     * Add the child element to the list
     *
     * @param {Element} el
     * @protected
     */
  }, {
    key: "__addChild",
    value: function __addChild(el) {
      this.__children.push(el);
    }

    /**
     * Splice the child from the list
     *
     * @param {Element} el
     * @protected
     */
  }, {
    key: "__spliceChild",
    value: function __spliceChild(el) {
      for (var i = 0, l = this.__children.length; i < l; i++) {
        var child = this.__children[i];
        if (child === el) {
          this.__children.splice(i, 1);
          i--;
          l--;
        }
      }
    }

    /**
     * Get the parsed expression
     *
     * @param {string} expression
     * @returns {*}
     * @protected
     */
  }, {
    key: "__getParsedExpression",
    value: function __getParsedExpression(expression) {
      return expression;
    }

    /**
     * Check the need of the avaluation
     *
     * @param {Node} node
     * @returns {boolean}
     * @protected
     */
  }, {
    key: "__checkEvaluation",
    value: function __checkEvaluation(node) {
      if (!Object.keys(node.__properties).length) {
        return true;
      }
      for (var k in node.__properties) {
        if (!Object.prototype.hasOwnProperty.call(node.__properties, k)) {
          continue;
        }
        var prop = node.__properties[k];
        var value = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(prop.keys, prop.component.__scope);
        if (!node.__component.__compareNodePropertyValue(prop, value)) {
          return true;
        }
      }
      return false;
    }

    /**
     * Check the node properties change
     *
     * @param {Node} node
     * @param {string[]} keys
     * @param {*} value
     * @returns {boolean}
     * @protected
     */
  }, {
    key: "__checkNodePropertyChange",
    value: function __checkNodePropertyChange(node, keys, value) {
      var prop = this.__getNodeProperty(node, keys);
      if (!prop) {
        return true;
      }
      return !node.__component.__compareNodePropertyValue(prop, value);
    }

    /**
     * Compare the node property value
     * 
     * @param {object} prop 
     * @param {*} value 
     * @param {object} [options] 
     * @protected
     */
  }, {
    key: "__compareNodePropertyValue",
    value: function __compareNodePropertyValue(prop, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].compare(_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].createHash(value), prop.hash, options);
    }

    /**
     * Create an exception message
     * 
     * @param {Node} node 
     * @param {Error} err 
     * @protected
     */
  }, {
    key: "__createExceptionMessage",
    value: function __createExceptionMessage(node, err) {
      var tagName = node.__component.el.tagName;
      var attrName = node.__component.el.getAttribute('component');
      var componentName = (attrName || tagName).toLowerCase();
      var elementName = node.__element.tagName.toLowerCase();
      var attributeName = node instanceof window.Attr ? node.name.toLowerCase() : '';
      var messages = [err.message, node.__expression.trim()];
      attributeName && messages.push("[attribute ".concat(attributeName, "]"));
      messages = messages.concat(["[element ".concat(elementName, "]"), "[component ".concat(componentName, "]")]);
      return "Expression error: " + messages.join('\n\tat ');
    }

    /**
     * Evaluate the node expression
     *
     * @param {Node} node
     * @returns {*}
     * @protected
     */
  }, {
    key: "__evaluate",
    value: function __evaluate(node) {
      var _this5 = this;
      var counter = 0;
      var attributeValue;
      var expression;
      var evalComponent = node.__attributeOf || node.__component;
      if (node.__component.parents(function (com) {
        return com.__prevent;
      }).length) {
        return {
          res: node.__expression
        };
      }
      if (!(node instanceof window.Attr) && node.__component.__prevent) {
        return {
          res: node.__expression
        };
      }
      var res = node.__expression.replace(evaluationRegexGlobal, function (m, d) {
        counter++;
        var evaluate;
        var parseValue = node.__component.__getParsedExpression(d);
        _this5.__finishEvaluationCycle();
        _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation = {
          node: node,
          list: [],
          component: evalComponent
        };
        try {
          evaluate = _this5.constructor.parse(evalComponent.__evaluationComponent.scope, parseValue, _objectSpread({}, _globals_js__WEBPACK_IMPORTED_MODULE_10__["default"]));
        } catch (err) {
          throw _this5.__createExceptionMessage(node, err);
        }
        _this5.__finishEvaluationCycle();
        if (node instanceof window.Attr) {
          expression = m;
          attributeValue = evaluate;
          return _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].makeAttributeValue(evaluate);
        }
        if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(evaluate) == 'object') {
          try {
            return JSON.stringify(evaluate);
          } catch (e) {
            return evaluate;
          }
        }
        return evaluate;
      });
      return {
        res: res,
        counter: counter,
        expression: expression,
        attributeValue: attributeValue
      };
    }

    /**
     * Finish the evaluation cycle
     *
     * @protected
     */
  }, {
    key: "__finishEvaluationCycle",
    value: function __finishEvaluationCycle() {
      var evaluation = [];
      var existingBindings = {};
      var node;
      var component;
      if (_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation) {
        node = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation.node;
        component = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation.component;
        evaluation = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation.list;
        _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation.list = null;
        _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation = null;
      }
      for (var i = evaluation.length - 1; i >= 0; i--) {
        var data = evaluation[i];
        if (data.component.__isRemoved) {
          continue;
        }
        var hash = data.component.__createKeysHash(data.keys);
        if (data.notBinding) {
          continue;
        }
        if (existingBindings[hash]) {
          continue;
        }
        var parentValue = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(data.parents, data.component.__scope);
        if (_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].isScopeProxy(parentValue) && data.component !== component.__evaluationComponent && data.component === data.bindComponent) {
          continue;
        }
        data.bindComponent.__bindAndSetProperty(node, data.keys, data.evaluated);
        existingBindings[hash] = true;
      }
    }

    /**
     * Bind the node and set the property
     *
     * @param {Node} node
     * @param {string[]} keys
     * @param {boolean} [evaluated]
     * @protected
     */
  }, {
    key: "__bindAndSetProperty",
    value: function __bindAndSetProperty(node, keys, evaluated) {
      var bind = this.__getBoundNode(keys, node);
      var value = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(keys, this.__scope);
      if (!bind) {
        this.__bind(keys, {
          node: node,
          keys: keys
        });
      }
      this.__setNodeProperty(node, keys, value, evaluated);
    }

    /**
     * Get the keys evaluation components
     *
     * @param {string[]} keys
     * @returns {Component[]}
     * @protected
     */
  }, {
    key: "__getEvaluationComponents",
    value: function __getEvaluationComponents(keys) {
      var results = [];
      var loop = function loop(component) {
        if (component.__getBind(keys)) {
          results.push(component);
        }
        for (var i = 0; i < component.__children.length; i++) {
          loop(component.__children[i].__akili);
        }
      };
      loop(this);
      return results.length ? results : [this];
    }

    /**
     * Evaluate the component own keys
     *
     * @param {string[]} keys
     * @protected
     */
  }, {
    key: "__evaluateOwnKeys",
    value: function __evaluateOwnKeys(keys) {
      var data = this.__getAllBinds(keys);
      for (var i = 0; i < data.length; i++) {
        var res = data[i];
        if (!res) {
          continue;
        }
        var node = res.node;
        if (!res.node || !node.__initialized) {
          continue;
        }
        var value = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(res.keys, this.__scope);
        if (!this.__checkNodePropertyChange(node, res.keys, value)) {
          continue;
        }
        this.__disableKeys(keys);
        this.__evaluateNode(node);
        for (var key in node.__properties) {
          var prop = node.__properties[key];
          prop.component.__setNodeProperty(node, res.keys, value);
        }
        this.__enableKeys(keys);
      }
    }

    /**
     * Evaluate all the tree
     *
     * @param {string[]} keys
     * @protected
     */
  }, {
    key: "__evaluateByKeys",
    value: function __evaluateByKeys(keys) {
      var _this6 = this;
      keys = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(keys);
      var evaluate = function evaluate() {
        var components = _this6.__getEvaluationComponents(keys);
        for (var i = 0; i < components.length; i++) {
          var component = components[i];
          component.__evaluateOwnKeys(keys);
        }
        keys.pop();
        keys.length && evaluate();
      };
      evaluate();
    }

    /**
     * Evaluate the event expression
     *
     * @param {Node} node
     * @param {Element} el
     * @param {Event} e
     * @protected
     */
  }, {
    key: "__evaluateEvent",
    value: function __evaluateEvent(node, el, e) {
      var expression = evaluationRegex.exec(node.__expression);
      var evaluate;
      if (!expression) {
        return;
      }
      this.__evaluatingEvent = {
        el: el,
        component: this,
        event: e,
        node: node
      };
      this.__disableProxy = {};
      try {
        evaluate = this.constructor.parse(this.__evaluationComponent.scope, expression[1], _objectSpread(_objectSpread({}, _globals_js__WEBPACK_IMPORTED_MODULE_10__["default"]), {}, {
          event: e
        }));
      } catch (err) {
        throw this.__createExceptionMessage(node, err);
      }
      this.__evaluatingEvent = null;
      return evaluate;
    }

    /**
     * Evaluate the node expression with check
     *
     * @param {Node} node
     * @param {boolean} [check]
     * @protected
     */
  }, {
    key: "__evaluateNode",
    value: function __evaluateNode(node) {
      var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var key = node instanceof window.Attr ? 'value' : 'nodeValue';
      if (check ? this.__checkEvaluation(node) : true) {
        var _this$__evaluate = this.__evaluate(node),
          res = _this$__evaluate.res,
          attributeValue = _this$__evaluate.attributeValue,
          expression = _this$__evaluate.expression,
          counter = _this$__evaluate.counter;
        node[key] != res && (node[key] = res);
        if (node instanceof window.Attr) {
          var value = res;
          var isBooleanAttribute = false;
          if (counter == 1 && expression && node.__expression == expression) {
            value = attributeValue;
          }
          var clearAttribute = node.nodeName.replace(/^boolean-(.+)/i, '$1');
          var camelAttribute = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].toCamelCase(clearAttribute);
          if (clearAttribute != node.nodeName) {
            isBooleanAttribute = true;
            value = !!value;
          }
          if (node.__attributeOn) {
            var component = node.__attributeOn;
            value = component.__prepareAttributeIn(node, value);
            component.__disableAttributeSetter = true;
            component.attrs[camelAttribute] = value;
            component.__disableAttributeSetter = false;
            if (component.__isMounted) {
              component.__attrTriggerByName(camelAttribute, value);
            }
          } else if (isBooleanAttribute) {
            var element = node.__element;
            value ? element.setAttribute(camelAttribute, 'true') : element.removeAttribute(camelAttribute);
          }
        }
      }
      return node[key];
    }

    /**
     * Prepare the attribute value for receiving
     * 
     * @param {Node} node
     * @param {*} value
     * @protected
     */
  }, {
    key: "__prepareAttributeIn",
    value: function __prepareAttributeIn(node, value) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].copy(value, {
        plain: true
      });
    }

    /**
     * Prepare the attribute value for sending
     * 
     * @param {Node} node
     * @param {*} value
     * @protected
     */
  }, {
    key: "__prepareAttributeOut",
    value: function __prepareAttributeOut(node, value) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].copy(value, {
        plain: true
      });
    }

    /**
     * Initialize the attributes
     *
     * @param {Node} node
     * @param {Element} el
     * @param {Component} attributeOf - if node is linked with parent scope
     * @protected
     */
  }, {
    key: "__initializeAttribute",
    value: function __initializeAttribute(node, el, attributeOf) {
      if (!node || systemAttributes.indexOf(node.nodeName) != -1) {
        return;
      }
      if (!this.__initializeNode(node, el)) {
        return;
      }
      var eventName = node.nodeName.replace(/^on-(.+)/i, '$1');
      var component = attributeOf ? attributeOf : this;
      if (node.__isEvent) {
        if (node.__event) {
          return;
        }
        var emitter = new _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].EventEmitter(eventName, node, el, component);
        if (node.__hasBindings) {
          emitter.bind(function (e) {
            return component.__evaluateEvent(node, el, e);
          });
        }
        node.__event = emitter;
        el.setAttribute(node.nodeName, _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].makeAttributeValue(emitter));
        if (attributeOf) {
          this.__disableAttributeSetter = true;
          this.attrs[_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].toCamelCase(node.nodeName)] = emitter;
          this.__disableAttributeSetter = false;
        }
        return;
      }
      if (attributeOf) {
        node.__attributeOn = this;
        node.__attributeOf = component;
      }
      var check = this.__compiling ? this.__compiling.checkChanges : false;
      component.__evaluateNode(node, check);
    }

    /**
     * Initialize the node
     *
     * @param {Node} node
     * @param {Element} el
     * @returns {boolean}
     * @protected
     */
  }, {
    key: "__initializeNode",
    value: function __initializeNode(node, el) {
      if (node.__initialized) {
        return true;
      }
      var isAttr = node instanceof window.Attr;
      var val = node[isAttr ? 'value' : 'nodeValue'];
      var hasBindings = evaluationRegex.test(val.trim());
      var isBoolean = isAttr ? /^boolean-/i.test(node.nodeName) : false;
      var isEvent = isAttr ? /^on-(.+)/i.test(node.nodeName) : false;
      if (!el.__akili && !hasBindings && !isBoolean && !isEvent) {
        return false;
      }
      node.__name = this.__scope.__name + _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].createRandomString(16);
      node.__isEvent = isEvent;
      node.__hasBindings = hasBindings;
      node.__isBoolean = isBoolean;
      node.__expression = val;
      node.__properties = {};
      node.__attributeOf = null;
      node.__attributeOn = null;
      node.__event = null;
      node.__initialized = true;
      node.__component = this;
      node.__element = el;
      return true;
    }

    /**
     * Deinitialize the node
     *
     * @param {Node} node
     * @param {object} [options]
     * @protected
     */
  }, {
    key: "__deinitializeNode",
    value: function __deinitializeNode(node) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!node.__initialized) {
        return;
      }
      if (node.__event) {
        node.__event.remove();
      }
      if (node.__hasBindings && !options.saveBindings) {
        this.__unbindByNodes(node);
        this.__unbindParentsByNodes(node);
      }
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].removeTag(node);
      delete node.__name;
      delete node.__hasBindings;
      delete node.__isBoolean;
      delete node.__isEvent;
      delete node.__expression;
      delete node.__properties;
      delete node.__attributeOf;
      delete node.__attributeOn;
      delete node.__event;
      delete node.__initialized;
      delete node.__component;
      delete node.__element;
    }

    /**
     * Interpolate the element attributes
     *
     * @param {Element} el
     * @param {Component} [attributeOf=null] - if the node has link with the parent scope
     * @protected
     */
  }, {
    key: "__interpolateAttributes",
    value: function __interpolateAttributes(el) {
      var attributeOf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      for (var i = 0, attrs = el.attributes, l = attrs.length; i < l; i++) {
        this.__initializeAttribute(attrs[i], el, attributeOf);
      }
    }

    /**
     * Define the attributes as a proxy
     *
     * @protected
     */
  }, {
    key: "__defineAttributes",
    value: function __defineAttributes() {
      var _this7 = this;
      var changeAttribute = function changeAttribute(key, value) {
        var isDeleted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (_this7.__disableAttributeSetter) {
          return;
        }
        var node = _this7.el.getAttributeNode(key);
        if (isDeleted) {
          node && _this7.__deinitializeNode(node);
          _this7.el.removeAttribute(key);
          return;
        } else if (!node) {
          _this7.el.setAttribute(key, value);
          node = _this7.el.getAttributeNode(key);
        } else {
          node.value = value;
          _this7.__deinitializeNode(node);
        }
        _this7.__initializeAttribute(node, _this7.el, _this7.__attributeOf);
      };
      this.attrs = new Proxy(this.__attrs, {
        get: function get(target, key) {
          if (key == '__isProxy') {
            return true;
          }
          return target[key];
        },
        set: function set(target, key, value) {
          var attrKey = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].toDashCase(key);
          if (_this7.booleanAttributes.indexOf(attrKey) != -1) {
            value ? _this7.el.setAttribute(attrKey, value) : _this7.el.removeAttribute(attrKey);
            attrKey = "boolean-".concat(attrKey);
          }
          target[key] = value;
          changeAttribute(attrKey, _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].makeAttributeValue(value));
          return true;
        },
        deleteProperty: function deleteProperty(target, key, value) {
          var attrKey = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].toDashCase(key);
          changeAttribute(attrKey, _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].makeAttributeValue(value), true);
          delete target[key];
          return true;
        }
      });
    }

    /**
     * Convert the object to a proxy
     *
     * @param {object} obj
     * @param {string[]} parents
     * @returns {Proxy}
     * @protected
     */
  }, {
    key: "__observe",
    value: function __observe(obj, parents) {
      var _this8 = this;
      return new Proxy(obj, {
        get: function get(target, key) {
          if (key == "__isProxy") {
            return true;
          } else if (key == "__target") {
            return obj;
          } else if (key == "__component") {
            return _this8;
          } else if (key == "__keys") {
            return parents;
          } else if (_this8.__isSystemKey(key)) {
            return target[key];
          }
          if (_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation && !_this8.__isRemoved) {
            var keys = [].concat(parents, [key]);
            var notBinding = false;
            var evaluated = !_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getOwnPropertyTarget(_this8.__scope, keys);
            var component = _this8;
            if (target instanceof _scope_js__WEBPACK_IMPORTED_MODULE_7__["default"]) {
              var realTarget = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getOwnPropertyTarget(target, [key]);
              realTarget && realTarget instanceof _scope_js__WEBPACK_IMPORTED_MODULE_7__["default"] && (component = realTarget.__component);
            }
            if (_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__wrapping && keys.length > 1) {
              return target[key];
            }
            if (key in target && !_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getEnumerablePropertyTarget(target, [key])) {
              notBinding = true;
            }
            _this8.__bindNode(_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__evaluation.list, component, keys, parents, target[key], notBinding, evaluated);
            return target[key];
          }
          return target[key];
        },
        set: function set(target, key, value) {
          var keys = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(parents), [key]);
          if (_this8.__isRemoved || _this8.__isSystemKey(key) || _this8.__checkDisablement(keys)) {
            target[key] = value;
            _this8.__setScopeObjectHash(target, keys);
            return true;
          }
          if (_this8.__isCreated && value !== undefined && !Object.prototype.hasOwnProperty.call(target, key) && key in target) {
            var tScope = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getEnumerablePropertyTarget(target, [key]);
            tScope.__component.scope[key] = value;
            return false;
          }
          if (typeof value === 'function') {
            value = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].wrapFunction(value);
          }
          target[key] = _this8.__nestedObserve(value, keys);
          if (!_this8.__isResolved) {
            _this8.__triggerStoreAndAttr(keys);
          }
          if (_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__isolation) {
            _this8.__createIsolationObject(parents, key);
            return true;
          }
          _this8.__setScopeObjectHash(target, keys);
          if (_this8.__isResolved) {
            _this8.__triggerStoreAndAttr(keys);
          }
          if (_this8.__isMounted) {
            _this8.__evaluateByKeys(keys);
          }
          return true;
        },
        deleteProperty: function deleteProperty(target, key) {
          var keys = [].concat(parents, [key]);
          if (_this8.__isRemoved || _this8.__isSystemKey(key) || _this8.__checkDisablement(keys)) {
            delete target[key];
            _this8.__setScopeObjectHash(target, keys);
            return true;
          }
          delete target[key];
          if (!_this8.__isResolved) {
            _this8.__triggerStoreAndAttr(keys);
          }
          if (_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__isolation) {
            _this8.__createIsolationObject(parents, key);
            return true;
          }
          if (_this8.__isResolved) {
            _this8.__triggerStoreAndAttr(keys);
          }
          _this8.__setScopeObjectHash(target, keys);
          _this8.__evaluateByKeys(keys);
          return true;
        }
      });
    }

    /**
     * Trigger the store and the attributes change
     * 
     * @param {string[]} keys 
     * @protected
     */
  }, {
    key: "__triggerStoreAndAttr",
    value: function __triggerStoreAndAttr(keys) {
      for (var i = 0, l = keys.length; i < l; i++) {
        var currentKeys = keys.slice(0, l - i);
        var currentKeyString = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(currentKeys);
        var val = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(currentKeys, this.__scope);
        if (this.__storeLinks[currentKeyString]) {
          this.__storeTriggerByKeys(currentKeys, val);
        }
        if (this.__attrLinks[currentKeyString]) {
          this.__attrTriggerByKeys(currentKeys, val);
        }
      }
    }

    /**
     * Create the hash for the keys
     * 
     * @param {string[]} keys 
     * @returns {string}    
     * @protected
     */
  }, {
    key: "__createKeysHash",
    value: function __createKeysHash(keys) {
      return "scope.".concat(this.__scope.__name, ".").concat(_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys));
    }

    /**
     * Get the store of the disablement type
     * 
     * @param {string} type 
     * @returns {object}
     * @protected
     */
  }, {
    key: "__getDisablementTypeStore",
    value: function __getDisablementTypeStore(type) {
      return {
        proxy: '__disableProxy',
        store: '__disableStoreKeys',
        attr: '__disableAttrKeys'
      }[type];
    }

    /**
     * Disable the keys setter
     * 
     * @param {string[]} keys  
     * @param {string} [type]  
     * @protected
     */
  }, {
    key: "__disableKeys",
    value: function __disableKeys(keys) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'proxy';
      this[this.__getDisablementTypeStore(type)][keys ? this.__createKeysHash(keys) : '__all'] = true;
    }

    /**
     * Enable the keys setter
     * 
     * @param {string[]} keys 
     * @param {string} [type]   
     * @protected
     */
  }, {
    key: "__enableKeys",
    value: function __enableKeys(keys) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'proxy';
      delete this[this.__getDisablementTypeStore(type)][keys ? this.__createKeysHash(keys) : '__all'];
    }

    /**
     * Check the keys setter disablemant
     * 
     * @param {string[]} keys 
     * @param {string} [type]   
     * @protected
     */
  }, {
    key: "__checkDisablement",
    value: function __checkDisablement(keys) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'proxy';
      var store = this.__getDisablementTypeStore(type);
      return this[store].__all ? true : this[store][this.__createKeysHash(keys)];
    }

    /**
     * Save the value to the store by the keys
     * 
     * @param {string[]} keys 
     * @param {*} value    
     * @protected
     */
  }, {
    key: "__storeTriggerByKeys",
    value: function __storeTriggerByKeys(keys, value) {
      if (this.__checkDisablement(keys, 'store')) {
        return;
      }
      var links = this.__storeLinks[_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys)];
      if (!links || !links.length) {
        return;
      }
      value = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].copy(value, {
        plain: true
      });
      var p = [];
      for (var i = 0, l = links.length; i < l; i++) {
        var link = links[i];
        if (!link.set) {
          continue;
        }
        p.push(this.__storeTriggerByName(link.name, value));
      }
      return Promise.all(p);
    }

    /**
     * Save the value to the store by the name
     * 
     * @param {string} name 
     * @param {*} value 
     * @protected
     */
  }, {
    key: "__storeTriggerByName",
    value: function __storeTriggerByName(name, value) {
      var _this9 = this;
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__disableStoreProxy = true;
      _services_store_js__WEBPACK_IMPORTED_MODULE_9__["default"][name] = value;
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__disableStoreProxy = false;
      var links = (_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name] || []).concat(_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks['*'] || []);
      if (!links || !links.length) {
        return;
      }
      links = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].sort(links, ['date'], true);
      var _loop = function _loop() {
        var link = links[i];
        var component = link.component;
        if (component === _this9) {
          return "continue";
        }
        if (link.fn) {
          _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].isolate(function () {
            return link.fn.call(component, value, name);
          });
          return "continue";
        }
        if (!link.get) {
          return "continue";
        }
        component.__disableKeys(link.keys, 'store');
        var current = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(link.keys, component.__scope);
        !_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].compare(current, value) && component.scope.__set(link.keys, value);
        component.__enableKeys(link.keys, 'store');
      };
      for (var i = 0, l = links.length; i < l; i++) {
        var _ret = _loop();
        if (_ret === "continue") continue;
      }
    }

    /**
     * Create the store link with the scope property
     * 
     * @param {string} name 
     * @param {string|string[]} keys
     * @param {obhect} [options]
     * @protected
     */
  }, {
    key: "__storeByKeys",
    value: function __storeByKeys(name, keys) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options = _objectSpread({
        get: true,
        set: true
      }, options);
      if (!keys) {
        throw new Error("Store link \"".concat(name, "\" must have the scope property name"));
      }
      if (!options.get && !options.set) {
        throw new Error("Store link \"".concat(name, "\" must have at least \"get\" or \"set\" option as true"));
      }
      if (!Array.isArray(keys)) {
        keys = [keys];
      }
      this.__disableKeys(keys, 'store');
      (Object.prototype.hasOwnProperty.call(_services_store_js__WEBPACK_IMPORTED_MODULE_9__["default"], name) || !_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].hasPropertyByKeys(keys, this.__scope)) && this.scope.__set(keys, _services_store_js__WEBPACK_IMPORTED_MODULE_9__["default"][name]);
      this.__enableKeys(keys, 'store');
      var keyString = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys);
      var info;
      if (!this.__storeLinks[keyString]) {
        this.__storeLinks[keyString] = [];
      }
      var arr = this.__storeLinks[keyString];
      for (var i = arr.length - 1; i >= 0; i--) {
        var res = arr[i];
        if (res.component === this && res.name == name && res.keyString == keyString) {
          arr[i] = _objectSpread(_objectSpread(_objectSpread({}, res), options), {}, {
            date: Date.now()
          });
          return;
        }
      }
      if (!_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name]) {
        _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name] = [];
      }
      info = _objectSpread(_objectSpread({}, options), {}, {
        component: this,
        name: name,
        keys: keys,
        keyString: keyString,
        date: Date.now()
      });
      this.__storeLinks[keyString].push(info);
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name].push(info);
    }

    /**
     * Create the store link with the function
     * 
     * @param {string} name 
     * @param {function} fn   
     * @param {object} [options]
     * @protected
     * @returns {*}
     */
  }, {
    key: "__storeByFunction",
    value: function __storeByFunction(name, fn) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var call = options.callOnStart === undefined ? Object.prototype.hasOwnProperty.call(_services_store_js__WEBPACK_IMPORTED_MODULE_9__["default"].__target, name) : options.callOnStart;
      if (!_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name]) {
        _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name] = [];
      }
      var links = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name];
      for (var i = links.length - 1; i >= 0; i--) {
        var res = links[i];
        if (res.component === this && res.name == name && res.fn === fn) {
          links[i] = _objectSpread(_objectSpread(_objectSpread({}, res), options), {}, {
            date: Date.now()
          });
          return;
        }
      }
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name].push(_objectSpread(_objectSpread({}, options), {}, {
        component: this,
        name: name,
        fn: fn,
        date: Date.now()
      }));
      if (name == '*' && options.callOnStart !== false) {
        var storeKeys = Object.keys(_services_store_js__WEBPACK_IMPORTED_MODULE_9__["default"].__target);
        var p = [];
        for (var _i2 = 0, l = storeKeys.length; _i2 < l; _i2++) {
          var key = storeKeys[_i2];
          var val = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].copy(_services_store_js__WEBPACK_IMPORTED_MODULE_9__["default"].__target[key], {
            plain: true
          });
          p.push(fn.call(this, val, key));
        }
        return Promise.all(p);
      }
      if (call) {
        return fn.call(this, _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].copy(_services_store_js__WEBPACK_IMPORTED_MODULE_9__["default"].__target[name], {
          plain: true
        }));
      }
    }

    /**
     * Remove the store link with the scope property
     * 
     * @param {string} name
     * @param {string|string[]} keys
     * @protected
     */
  }, {
    key: "__unstoreByKeys",
    value: function __unstoreByKeys(name, keys) {
      if (!keys) {
        throw new Error("You have to pass the scope property name for store link \"".concat(name, "\""));
      }
      if (!Array.isArray(keys)) {
        keys = [keys];
      }
      var keyString = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys);
      var arr = this.__storeLinks[keyString];
      if (!arr.length) {
        return;
      }
      for (var i = arr.length - 1; i >= 0; i--) {
        var res = arr[i];
        var links = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[res.name];
        if (res.component !== this || res.name != name || res.keyString != keyString) {
          continue;
        }
        arr.splice(i, 1);
        if (!links || !links.length) {
          continue;
        }
        for (var k = links.length - 1; k >= 0; k--) {
          var link = links[k];
          if (link.component === this && link.keyString == keyString) {
            links.splice(k, 1);
          }
        }
        if (!links.length) {
          delete _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name];
        }
      }
      if (!arr.length) {
        delete this.__storeLinks[keyString];
      }
    }

    /**
     * Remove the store link with the function
     * 
     * @param {string} name 
     * @param {function} fn 
     * @protected
     */
  }, {
    key: "__unstoreByFunction",
    value: function __unstoreByFunction(name, fn) {
      if (!_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name]) {
        return;
      }
      var links = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name];
      for (var i = links.length - 1; i >= 0; i--) {
        var res = links[i];
        if (res.component === this && res.name == name && res.fn === fn) {
          links.splice(i, 1);
          break;
        }
      }
      if (!links.length) {
        delete _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks[name];
      }
    }

    /**
     * Trigger the attribute event by the keys
     * 
     * @param {string[]} keys 
     * @param {*} value    
     * @protected
     */
  }, {
    key: "__attrTriggerByKeys",
    value: function __attrTriggerByKeys(keys, value) {
      var _this10 = this;
      if (this.__checkDisablement(keys, 'attr')) {
        return;
      }
      var links = this.__attrLinks[_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys)];
      if (!links || !links.length) {
        return;
      }
      return _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].isolate(function () {
        for (var i = 0, l = links.length; i < l; i++) {
          var link = links[i];
          if (link.fn) {
            continue;
          }
          if (!link.set) {
            continue;
          }
          var ev = 'on' + _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].capitalize(link.name);
          _this10.attrs[ev] && _this10.attrs[ev].trigger(value, {
            bubbles: true
          });
        }
      });
    }

    /**
     * Trigger the attribute event by the name
     * 
     * @param {string} name 
     * @param {*} value 
     * @protected
     */
  }, {
    key: "__attrTriggerByName",
    value: function __attrTriggerByName(name, value) {
      var _this11 = this;
      var links = (this.__attrLinks[name] || []).concat(this.__attrLinks['*'] || []);
      if (!links || !links.length) {
        return;
      }
      links = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].sort(links, ['date'], true);
      var _loop2 = function _loop2() {
        var link = links[i];
        if (link.fn) {
          _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].isolate(function () {
            return link.fn.call(_this11, value, _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].toDashCase(name));
          });
          return "continue";
        }
        if (!link.get) {
          return "continue";
        }
        _this11.__disableKeys(link.keys, 'attr');
        var current = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(link.keys, _this11.__scope);
        !_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].compare(current, value) && _this11.scope.__set(link.keys, value);
        _this11.__enableKeys(link.keys, 'attr');
      };
      for (var i = 0, l = links.length; i < l; i++) {
        var _ret2 = _loop2();
        if (_ret2 === "continue") continue;
      }
    }

    /**
     * Create the  attribute link with the scope property
     * 
     * @param {string} name 
     * @param {string|string[]} keys
     * @param {object} [options]
     * @protected
     */
  }, {
    key: "__attrByKeys",
    value: function __attrByKeys(name, keys) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options = _objectSpread({
        get: true,
        set: true
      }, options);
      name = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].toCamelCase(name);
      if (!keys) {
        throw new Error("Attribute link \"".concat(name, "\" must have the scope property name"));
      }
      if (!Array.isArray(keys)) {
        keys = [keys];
      }
      this.__disableKeys(keys, 'attr');
      (Object.prototype.hasOwnProperty.call(this.attrs, name) || !_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].hasPropertyByKeys(keys, this.__scope)) && this.scope.__set(keys, this.attrs[name]);
      this.__enableKeys(keys, 'attr');
      var keyString = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys);
      if (!this.__attrLinks[keyString]) {
        this.__attrLinks[keyString] = [];
      }
      var arr = this.__attrLinks[keyString];
      for (var i = arr.length - 1; i >= 0; i--) {
        var res = arr[i];
        if (res.name == name && res.keyString == keyString) {
          arr[i] = _objectSpread(_objectSpread(_objectSpread({}, res), options), {}, {
            date: Date.now()
          });
          return;
        }
      }
      this.__attrLinks[keyString].push(_objectSpread(_objectSpread({}, options), {}, {
        name: name,
        keys: keys,
        keyString: keyString,
        date: Date.now(),
        component: this
      }));
    }

    /**
     * Create the attribute link with the function
     * 
     * @param {string} name 
     * @param {function} fn
     * @param {object} [options]
     * @protected 
     * @returns {*}
     */
  }, {
    key: "__attrByFunction",
    value: function __attrByFunction(name, fn) {
      var _this12 = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      name = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].toCamelCase(name);
      var call = options.callOnStart === undefined ? Object.prototype.hasOwnProperty.call(this.attrs, name) : options.callOnStart;
      if (!this.__attrLinks[name]) {
        this.__attrLinks[name] = [];
      }
      var links = this.__attrLinks[name];
      for (var i = links.length - 1; i >= 0; i--) {
        var res = links[i];
        if (res.name == name && res.fn === fn) {
          links[i] = _objectSpread(_objectSpread(_objectSpread({}, res), options), {}, {
            date: Date.now()
          });
          return;
        }
      }
      this.__attrLinks[name].push(_objectSpread(_objectSpread({}, options), {}, {
        name: name,
        fn: fn,
        date: Date.now(),
        component: this
      }));
      if (name == '*' && options.callOnStart !== false) {
        var attrsKeys = Object.keys(this.__attrs).filter(function (k) {
          return !(_this12.__attrs[k] instanceof _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].EventEmitter);
        });
        var p = [];
        for (var _i3 = 0, l = attrsKeys.length; _i3 < l; _i3++) {
          var key = attrsKeys[_i3];
          var val = this.__attrs[key];
          p.push(fn.call(this, val, _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].toDashCase(key)));
        }
        return Promise.all(p);
      }
      if (call) {
        return fn.call(this, this.attrs[name]);
      }
    }

    /**
     * Remove the attribute link with the scope property
     * 
     * @param {string} name
     * @param {string|string[]} keys
     * @protected
     */
  }, {
    key: "__unattrByKeys",
    value: function __unattrByKeys(name, keys) {
      if (!keys) {
        throw new Error("You have to pass the scope property name for attribute link \"".concat(name, "\""));
      }
      if (!Array.isArray(keys)) {
        keys = [keys];
      }
      var keyString = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys);
      var arr = this.__attrLinks[keyString];
      if (!arr.length) {
        return;
      }
      for (var i = arr.length - 1; i >= 0; i--) {
        var res = arr[i];
        if (res.name != name || res.keyString != keyString) {
          continue;
        }
        arr.splice(i, 1);
      }
      if (!arr.length) {
        delete this.__attrLinks[keyString];
      }
    }

    /**
     * Remove the attribute link with the function
     * 
     * @param {string} name 
     * @param {function} fn
     * @protected
     */
  }, {
    key: "__unattrByFunction",
    value: function __unattrByFunction(name, fn) {
      if (!this.__attrLinks[name]) {
        return;
      }
      var links = this.__attrLinks[name];
      for (var i = links.length - 1; i >= 0; i--) {
        var res = links[i];
        if (res.name == name && res.fn === fn) {
          links.splice(i, 1);
          break;
        }
      }
      if (!links.length) {
        delete this.__attrLinks[name];
      }
    }

    /**
     * Check the key is system
     *
     * @param {string} key
     * @returns {boolean}
     * @protected
     */
  }, {
    key: "__isSystemKey",
    value: function __isSystemKey(key) {
      return key.match && key.match('^_|#') || key == 'constructor';
    }

    /**
     * Set the object hash
     *
     * @param {*} obj
     * @param {string[]} [keys]
     * @protected
     */
  }, {
    key: "__setScopeObjectHash",
    value: function __setScopeObjectHash(obj, keys) {
      if (!obj || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(obj) != 'object' || obj instanceof _scope_js__WEBPACK_IMPORTED_MODULE_7__["default"]) {
        return;
      }
      Object.defineProperty(obj, '__hash', {
        configurable: true,
        enumerable: false,
        value: _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].createHash(obj, {
          ignoreScopeHash: true
        })
      });
      if (!keys) {
        return;
      }
      keys = keys.slice(0, -1);
      this.__setScopeObjectHash(_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(keys, this.__scope), keys);
    }

    /**
     * Nested observing of the value
     *
     * @param {*} value
     * @param {string[]} [startKeys]
     * @protected
     */
  }, {
    key: "__nestedObserve",
    value: function __nestedObserve(value, startKeys) {
      var _this13 = this;
      var observe = function observe(value, parents) {
        if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(value) != 'object' || value === null) {
          return value;
        }
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].isPlainObject(value) && !_utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].isScopeProxy(value) && !(value instanceof _scope_js__WEBPACK_IMPORTED_MODULE_7__["default"])) {
          return value;
        }
        var target = value;
        CHECK_PROXY: if (value.__isProxy) {
          target = value.__target;
          if (_this13.__disableProxyRedefining) {
            break CHECK_PROXY;
          }
          if (value.__component !== _this13 || _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(parents) != _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(value.__keys)) {
            target = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].copy(target, {
              nested: false
            });
            value = target;
          }
        } else if (!_this13.__disableProxyRedefining && !(value instanceof _scope_js__WEBPACK_IMPORTED_MODULE_7__["default"])) {
          target = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].copy(target, {
            nested: false
          });
          value = target;
        }
        var targetKeys = Object.keys(target);
        for (var i = 0, l = targetKeys.length; i < l; i++) {
          var k = targetKeys[i];
          var val = target[k];
          target[k] = observe(val, [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(parents), [k]));
        }
        _this13.__setScopeObjectHash(target);
        if (!value.__isProxy) {
          return _this13.__observe(value, parents);
        }
        return value;
      };
      return observe(value, startKeys || []);
    }

    /**
     * Create an isolation object
     *
     * @param {string[]} parents
     * @param {string} key
     * @returns {*}
     * @protected
     */
  }, {
    key: "__createIsolationObject",
    value: function __createIsolationObject(parents, key) {
      var rootKeys = parents.length ? [parents[0]] : [key];
      var rootKey = rootKeys[0];
      var keys = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(parents), [key]);
      var isolationHash = this.__createKeysHash(rootKeys);
      if (!_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__isolation[isolationHash]) {
        _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__isolation[isolationHash] = {
          updatedAt: Date.now(),
          component: this,
          rootKeys: rootKeys,
          rootKey: rootKey,
          keys: keys
        };
      }
      return _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__isolation[isolationHash];
    }

    /**
     * Prepare the node to the binding
     *
     * @param {object} bind - by default is component.__evaluation.list
     * @param {Component} bindComponent
     * @param {string[]} keys
     * @param {string[]} parents
     * @param {*} value
     * @param {boolean} [notBinding=false]
     * @param {boolean} [evaluated=false]
     * @protected
     */
  }, {
    key: "__bindNode",
    value: function __bindNode(bind, bindComponent, keys, parents, value) {
      var notBinding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var evaluated = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var parentKeysString = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(parents);
      var component = this;
      if (bind.length && !notBinding) {
        var l = bind.length - 1;
        var data = bind[l];
        if (data.bindComponent === this && data.keysString == parentKeysString) {
          component = data.component;
        }
        if (data.keysString == parentKeysString && data.component === component) {
          bind.splice(l, 1);
        }
      }
      bind.push({
        component: component,
        bindComponent: bindComponent,
        keysString: _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys),
        parents: parents,
        keys: keys,
        value: value,
        evaluated: evaluated,
        notBinding: notBinding
      });
    }

    /**
     * Check the key is the system
     *
     * @param {string} key
     * @returns {boolean}
     * @protected
     */
  }, {
    key: "__isSystemBindingKey",
    value: function __isSystemBindingKey(key) {
      return key == '__data';
    }

    /**
     * Get a binding by the keys
     *
     * @param {string[]} keys
     * @returns {object|null}
     * @protected
     */
  }, {
    key: "__getBind",
    value: function __getBind(keys) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(keys, this.__bindings) || null;
    }

    /**
     * Get all nested bindings by the keys
     * 
     * @param {string[]} keys 
     * @returns {array}
     */
  }, {
    key: "__getAllBinds",
    value: function __getAllBinds(keys) {
      var root = this.__getBind(keys);
      if (!root) {
        return [];
      }
      var data = [];
      var collect = function collect(obj) {
        data = data.concat(obj.__data || []);
        for (var key in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, key) || key == '__data') {
            continue;
          }
          collect(obj[key]);
        }
      };
      collect(root);
      return data;
    }

    /**
     * Get a binding by the keys
     *
     * @param {string[]} keys
     * @param {Node} node
     * @returns {object|null}
     * @protected
     */
  }, {
    key: "__getBoundNode",
    value: function __getBoundNode(keys, node) {
      var bind = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].getPropertyByKeys(keys, this.__bindings);
      if (!bind || !bind.__data || !bind.__data.length) {
        return null;
      }
      for (var i = 0, l = bind.__data.length; i < l; i++) {
        var data = bind.__data[i];
        if (data.node === node) {
          return data;
        }
      }
      return null;
    }

    /**
     * Set the node property
     *
     * @param {Node} node
     * @param {string[]} keys
     * @param {*} value
     * @param {boolean} [evaluated=false]
     * @returns {boolean}
     * @protected
     */
  }, {
    key: "__setNodeProperty",
    value: function __setNodeProperty(node, keys, value) {
      var evaluated = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var prop = this.__getNodeProperty(node, keys);
      var hash = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].createHash(value);
      if (prop) {
        var res = node.__component.__compareNodePropertyValue(prop, value);
        prop.value = value;
        prop.hash = hash;
        return !res;
      }
      node.__properties[this.__createKeysHash(keys)] = {
        component: this,
        value: value,
        hash: hash,
        node: node,
        keys: keys,
        evaluated: evaluated
      };
      return true;
    }

    /**
     * Get the node property
     *
     * @param {Node} node
     * @param {string[]} keys
     * @returns {object|null}
     * @protected
     */
  }, {
    key: "__getNodeProperty",
    value: function __getNodeProperty(node, keys) {
      return node.__properties[this.__createKeysHash(keys)] || null;
    }

    /**
     * Delete the node property
     *
     * @param {Node} node
     * @param {string[]} keys
     * @protected
     */
  }, {
    key: "__deleteNodeProperty",
    value: function __deleteNodeProperty(node, keys) {
      var hash = "scope.".concat(this.__scope.__name, ".").concat(_akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].joinBindingKeys(keys));
      delete node.__properties[hash];
    }

    /**
     * Map the nodes
     * 
     * @param {function} fn
     * @param {object} [options]
     * @protected
     */
  }, {
    key: "__mapNodes",
    value: function __mapNodes(fn) {
      var _this14 = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options = _objectSpread({
        rootAttrs: true,
        attrs: true,
        node: true,
        el: true
      }, options);
      var find = function find(el) {
        if (!el) {
          return;
        }
        if (options.attrs && (el !== _this14.el || options.rootAttrs)) {
          for (var k = 0, attrs = el.attributes, c = attrs.length; k < c; k++) {
            fn(attrs[k]);
          }
        }
        for (var i = el.childNodes.length - 1; i >= 0; i--) {
          var node = el.childNodes[i];
          if (node.nodeType == 3) {
            options.node && fn(node);
          } else if (node.nodeType == 1 && !node.__akili) {
            find(node);
            options.el && fn(node);
          }
        }
      };
      find(this.el);
    }

    /**
     * Get all nodes
     * 
     * @returns {Node[]}
     * @protected 
     */
  }, {
    key: "__getAllNodes",
    value: function __getAllNodes() {
      var nodes = [];
      this.__mapNodes(function (node) {
        return nodes.push(node);
      });
      return nodes;
    }

    /**
     * Bind the data with the keys
     *
     * @param {string[]} keys
     * @param {object} data
     * @protected
     */
  }, {
    key: "__bind",
    value: function __bind(keys, data) {
      _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].setPropertyByKeys(keys, this.__bindings, function (last, value) {
        var obj = {
          __data: []
        };
        if (!last) {
          return value ? value : obj;
        }
        if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(value) == 'object') {
          obj = value;
        }
        if (!obj.__data) {
          obj.__data = [];
        }
        obj.__data.push(data);
        return obj;
      });
    }

    /**
     * Unbind the data by nodes
     *
     * @param {Node|Node[]} nodes
     * @protected
     */
  }, {
    key: "__unbindByNodes",
    value: function __unbindByNodes(nodes) {
      var _this15 = this;
      nodes instanceof Node && (nodes = [nodes]);
      var unbind = function unbind(obj, parent, key) {
        var keys = Object.keys(obj);
        for (var j = 0, c = keys.length; j < c; j++) {
          var k = keys[j];
          if (k == '__data') {
            var data = obj[k] || [];
            var l = data.length;
            for (var i = 0; i < l; i++) {
              var bind = data[i];
              if (nodes.indexOf(bind.node) != -1) {
                delete bind.node;
                data.splice(i, 1);
                i--;
                l--;
              }
            }
            if (!l) {
              delete obj[k];
            }
          } else if (!_this15.__isSystemBindingKey(k)) {
            unbind(obj[k], obj, k);
          }
          if (parent && !Object.keys(obj).length) {
            delete parent[key];
          }
        }
      };
      unbind(this.__bindings);
    }

    /**
     * Remove all parent bindings with the nodes
     * 
     * @param {Node|Node[]} nodes
     * @protected
     */
  }, {
    key: "__unbindParentsByNodes",
    value: function __unbindParentsByNodes(nodes) {
      for (var i = 0, l = this.__parents.length; i < l; i++) {
        var parent = this.__parents[i];
        parent && parent.__akili && parent.__akili.__unbindByNodes(nodes);
      }
    }

    /**
     * Clear the links
     * 
     * @protected
     */
  }, {
    key: "__clearStoreLinks",
    value: function __clearStoreLinks() {
      var links = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__storeLinks;
      for (var key in links) {
        var arr = links[key];
        for (var i = arr.length - 1; i >= 0; i--) {
          var link = arr[i];
          if (link.component === this) {
            arr.splice(i, 1);
          }
        }
        if (!arr.length) {
          delete links[key];
        }
      }
    }

    /**
     * Remove the component without the children removing
     *
     * @param {object} [options]
     * @returns {Node[]}
     * @protected
     */
  }, {
    key: "__remove",
    value: function __remove() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.attrs.onRemoved && this.attrs.onRemoved.trigger(undefined, {
        bubbles: false
      });
      this.removed();
      var detachNodes = this.__detach({
        saveBindings: true,
        deinitializeNodes: true
      });
      var nodes = [].concat(detachNodes, this.__empty({
        saveBindings: true
      }));
      this.__unbindByNodes(detachNodes);
      !options.saveBindings && this.__unbindParentsByNodes(nodes);
      this.__clearStoreLinks();
      this.__scope.__remove();
      delete this.__scope;
      delete this.scope;
      this.el.remove();
      delete this.el.__akili;
      delete this.el;
      delete this.__parent;
      delete this.__attributeOf;
      delete this.__evaluationComponent;
      delete this.__evaluationParent;
      delete this.__parents;
      delete this.__bindings;
      delete this.__attrLinks;
      delete this.__storeLinks;
      delete this.__attrs;
      delete this.attrs;
      this.__isRemoved = true;
      return nodes;
    }

    /**
     * Remove all children
     *
     * @param {object} [options]
     * @returns {Node[]}
     * @protected
     */
  }, {
    key: "__removeChildren",
    value: function __removeChildren() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var nodes = [];
      for (var i = 0; i < this.__children.length; i++) {
        var child = this.__children[i];
        nodes = nodes.concat(child.__akili.__remove(options));
        i--;
      }
      return nodes;
    }

    /**
     * Detach the component
     *
     * @param {object} [options]
     * @returns {object}
     * @protected
     */
  }, {
    key: "__detach",
    value: function __detach() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.__parent && this.__parent.__akili.__spliceChild(this.el);
      var nodes = [];
      for (var i = 0, l = this.el.attributes.length; i < l; i++) {
        var node = this.el.attributes[i];
        if (node.__initialized) {
          nodes.push(node);
          options.deinitializeNodes && this.__deinitializeNode(node, {
            saveBindings: true
          });
        }
      }
      !options.saveBindings && this.__unbindParentsByNodes(nodes);
      return nodes;
    }

    /**
     * Clear the component html
     *
     * @param {object} [options]
     * @returns {Node[]}
     * @protected
     */
  }, {
    key: "__empty",
    value: function __empty() {
      var _this16 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var nodes = this.__removeChildren({
        saveBindings: true
      });
      this.__mapNodes(function (node) {
        if (node.nodeType == 1) {
          node.remove();
          return;
        }
        if (!node.__initialized) {
          return;
        }
        _this16.__deinitializeNode(node, {
          saveBindings: true
        });
        nodes.push(node);
      }, {
        rootAttrs: false
      });
      this.__unbindByNodes(nodes);
      !options.saveBindings && this.__unbindParentsByNodes(nodes);
      this.el.innerHTML = '';
      return nodes;
    }

    /**
     * Get the parent components
     *
     * @param {string} [selector='']
     * @param {boolean} [findAll=true] - get array if true
     * @param {number|number[]} [levels=null]
     * @returns {Component|Component[]}
     * @protected
     */
  }, {
    key: "__getParent",
    value: function __getParent() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var findAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var levels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var arr = [];
      var level = 0;
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(levels) != 'object') {
        levels = [levels];
      }
      var find = function find(parent) {
        if (!parent) {
          return;
        }
        if (!levels || levels.indexOf(level) != -1) {
          if (!selector || parent.__akili.matches(selector)) {
            if (!findAll) {
              arr.push(parent.__akili);
              return;
            }
            arr.push(parent.__akili);
          }
        }
        level++;
        find(parent.__akili.__parent);
      };
      find(this.__parent);
      return findAll ? arr : arr[0] || null;
    }

    /**
     * Get the child components
     *
     * @param {string} [selector='']
     * @param {boolean} [findAll=true] - get array if true
     * @param {number|number[]} [levels=null]
     * @returns {Component|Component[]}
     * @protected
     */
  }, {
    key: "__getChildren",
    value: function __getChildren() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var findAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var levels = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var arr = [];
      var level = 0;
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(levels) != 'object') {
        levels = [levels];
      }
      var find = function find(children) {
        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          if (!levels || levels.indexOf(level) != -1) {
            if (!selector || child.__akili.matches(selector)) {
              if (!findAll) {
                arr.push(child.__akili);
                return;
              }
              arr.push(child.__akili);
            }
          }
        }
        level++;
        for (var _i4 = 0, _l2 = children.length; _i4 < _l2; _i4++) {
          find(children[_i4].__akili.__children);
        }
      };
      find(this.__children);
      return findAll ? arr : arr[0] || null;
    }

    /**
     * Get the nearest components
     *
     * @param {string} [selector='']
     * @param {boolean} [findAll=true] - get array if true
     * @param {boolean} [right=false] - from the right side if true
     * @returns {Component|Component[]}
     * @protected
     */
  }, {
    key: "__getNear",
    value: function __getNear() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var findAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!this.__parent) {
        return null;
      }
      var levelElements = this.__parent.__akili.__children.slice();
      var arr = [];
      right && levelElements.reverse();
      for (var i = 0, l = levelElements.length; i < l; i++) {
        var el = levelElements[i];
        if (el === this.el) {
          break;
        }
        if (!selector || el.__akili.matches(selector)) {
          arr.push(el.__akili);
        }
      }
      arr.reverse();
      if (!findAll) {
        return arr.length ? arr[0] : null;
      }
      return arr;
    }

    /**
     * Create the link with the store
     * 
     * @param {string} name 
     * @param {string|string[]|function} handler
     */
  }, {
    key: "store",
    value: function store(name, handler) {
      if (!this.__isMounted) {
        throw new Error("Method \"store\" must be called after the compilation. For example, in \"compiled\" method.");
      }
      var args = [].slice.call(arguments);
      if (typeof name == 'function') {
        args.unshift('*');
        handler = name;
      }
      return typeof handler === 'function' ? this.__storeByFunction.apply(this, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(args)) : this.__storeByKeys.apply(this, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(args));
    }

    /**
     * Create the link with the attribute
     * 
     * @param {string} name 
     * @param {string|string[]|function} handler
     */
  }, {
    key: "attr",
    value: function attr(name, handler) {
      if (!this.__isMounted) {
        throw new Error("Method \"attr\" must be called after the compilation. For example, in \"compiled\" method.");
      }
      var args = [].slice.call(arguments);
      if (typeof name == 'function') {
        args.unshift('*');
        handler = name;
      }
      return typeof handler === 'function' ? this.__attrByFunction.apply(this, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(args)) : this.__attrByKeys.apply(this, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(args));
    }

    /**
     * Remove the store link
     * 
     * @param {string} name 
     * @param {string|string[]|function} handler
     */
  }, {
    key: "unstore",
    value: function unstore(name, handler) {
      if (!this.__isMounted) {
        throw new Error("Method \"unstore\" must be called after the compilation. For example, in \"compiled\" method.");
      }
      var args = [].slice.call(arguments);
      if (typeof name == 'function') {
        args.unshift('*');
        handler = name;
      }
      return typeof handler === 'function' ? this.__unstoreByFunction.apply(this, arguments) : this.__unstoreByKeys.apply(this, arguments);
    }

    /**
     * Remove the attribute link
     * 
     * @param {string} name 
     * @param {string|string[]|function} handler
     */
  }, {
    key: "unattr",
    value: function unattr(name, handler) {
      if (!this.__isMounted) {
        throw new Error("Method \"unattr\" must be called after the compilation. For example, in \"compiled\" method.");
      }
      var args = [].slice.call(arguments);
      if (typeof name == 'function') {
        args.unshift('*');
        handler = name;
      }
      return typeof handler === 'function' ? this.__unattrByFunction.apply(this, arguments) : this.__unattrByKeys.apply(this, arguments);
    }

    /**
     * Check the component using the selector
     *
     * @param {string|function} selector
     * @returns {boolean}
     */
  }, {
    key: "matches",
    value: function matches(selector) {
      if (typeof selector == 'function') {
        return selector(this);
      }
      return this.el.matches(selector);
    }

    /**
     * Get the closest parent component by the selector
     *
     * @param {string|function} [selector='']
     * @param {number|number[]} [levels=null]
     * @returns {Component}
     */
  }, {
    key: "parent",
    value: function parent() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var levels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.__getParent(selector, false, levels);
    }

    /**
     * Get an array of parent components by the selector
     *
     * @param {string|function} [selector='']
     * @param {number|number[]} [levels=null]
     * @returns {Component[]}
     */
  }, {
    key: "parents",
    value: function parents() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var levels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.__getParent(selector, true, levels);
    }

    /**
     * Get the closest child component by the selector
     *
     * @param {string|function} [selector='']
     * @param {number|number[]} [levels=null]
     * @returns {Component}
     */
  }, {
    key: "child",
    value: function child() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var levels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.__getChildren(selector, false, levels);
    }

    /**
     * Get an array of child components by the selector
     *
     * @param {string|function} [selector='']
     * @param {number|number[]} [levels=null]
     * @returns {Component[]}
     */
  }, {
    key: "children",
    value: function children() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var levels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return this.__getChildren(selector, true, levels);
    }

    /**
     * Get an array of components left from the current by the selector
     *
     * @param {string|function} [selector='']
     * @returns {Component[]}
     */
  }, {
    key: "before",
    value: function before() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.__getNear(selector, true, false);
    }

    /**
     * Get an array of components right from the current by the selector
     *
     * @param {string|function} [selector='']
     * @returns {Component[]}
     */
  }, {
    key: "after",
    value: function after() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.__getNear(selector, true, true);
    }

    /**
     * Get the closest leftcomponent by the selector
     *
     * @param {string|function} [selector='']
     * @returns {Component}
     */
  }, {
    key: "prev",
    value: function prev() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.__getNear(selector, false, false);
    }

    /**
     * Get the closest right component by the selector
     *
     * @param {string|function} [selector='']
     * @returns {Component}
     */
  }, {
    key: "next",
    value: function next() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.__getNear(selector, false, true);
    }

    /**
     * Change the element parent
     *
     * @param {Element} parent
     */
  }, {
    key: "appendTo",
    value: function appendTo(parent) {
      parent.appendChild(this.el);
      return _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].compile(this.el, {
        recompile: {
          setParents: true,
          checkChanges: false
        }
      });
    }

    /**
     * Cancel the component compilation
     */
  }, {
    key: "cancel",
    value: function cancel() {
      this.__cancelled = true;
    }

    /**
     * Compile the component but prevent the compilation inside
     */
  }, {
    key: "prevent",
    value: function prevent() {
      this.__prevent = true;
    }

    /**
     * Clear the element content
     *
     * @returns {*}
     */
  }, {
    key: "empty",
    value: function empty() {
      return this.__empty.apply(this, arguments);
    }

    /**
     * Remove the element
     *
     * @returns {*}
     */
  }, {
    key: "remove",
    value: function remove() {
      return this.__remove.apply(this, arguments);
    }
  }, {
    key: "created",
    value: function created() {}
  }, {
    key: "compiled",
    value: function compiled() {}
  }, {
    key: "recompiled",
    value: function recompiled() {}
  }, {
    key: "resolved",
    value: function resolved() {}
  }, {
    key: "removed",
    value: function removed() {}
  }, {
    key: "transition",
    get: function get() {
      return this.__scope && this.__scope.__transition || null;
    }
  }, {
    key: "isCreated",
    get: function get() {
      return this.__isCreated;
    }
  }, {
    key: "isCompiled",
    get: function get() {
      return this.__isCompiled;
    }
  }, {
    key: "isResolved",
    get: function get() {
      return this.__isResolved;
    }
  }, {
    key: "isRemoved",
    get: function get() {
      return this.__isRemoved;
    }
  }], [{
    key: "define",
    value:
    /**
     * Define the component
     */
    function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('component', Component);
    }

    /**
     * Parse the expression
     *
     * @param {object} context
     * @param {string} expression
     * @param {object} [vars]
     */
  }, {
    key: "parse",
    value: function parse(context, expression) {
      var variables = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var keys = [];
      var vars = [];
      var exps = _utils_js__WEBPACK_IMPORTED_MODULE_11__["default"].split(expression, ';', ['"', "'", '`']);
      exps[exps.length - 1] = "return ".concat(exps[exps.length - 1]);
      for (var key in variables) {
        keys.push(key);
        vars.push(variables[key]);
      }
      return (0,_babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_0__["default"])(Function, keys.concat(["".concat(exps.join('; '))])).apply(context, vars);
    }
  }]);
  return Component;
}();
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "matches", '');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "booleanAttributes", []);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "events", []);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "controlAttributes", false);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "transparent", false);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "template", '');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "templateUrl", '');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "scope", null);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Component, "ssr", true);


/***/ }),

/***/ "./node_modules/akili/src/components/a.js":
/*!************************************************!*\
  !*** ./node_modules/akili/src/components/a.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ A)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");
/* harmony import */ var _services_router_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/router.js */ "./node_modules/akili/src/services/router.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




/**
 * Component for links.
 * It works with router as well. 
 * 
 * {@link https://akilijs.com/docs/components#docs_links}
 * 
 * @tag a
 * @selector a[state]:not([url]),a[url]:not([state])
 * @attr {string} [url] - url to go
 * @attr {string} [state] - state to go {@link https://akilijs.com/docs/routing}
 * @attr {object} [params] - params for the state {@link https://akilijs.com/docs/routing#docs_state_params}
 * @attr {object} [query] - query for the state {@link https://akilijs.com/docs/routing#docs_state_query}
 * @attr {string} [hash] - hash for the state {@link https://akilijs.com/docs/routing#docs_state_hash}
 * @attr {object} [options] - options for the state {@link https://akilijs.com/docs/routing#docs_router.location}
 * @scope {boolean} isActiveState - the state is active or not 
 * @scope {boolean} inActiveState - the state is part of the active state or not
 */
var A = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(A, _Component);
  var _super = _createSuper(A);
  function A() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, A);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = null;
    _this.params = {};
    _this.query = {};
    _this.options = {};
    _this.isUrl = _this.el.hasAttribute('url');
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(A, [{
    key: "compiled",
    value: function compiled() {
      var _this2 = this;
      this.el.addEventListener('click', function (e) {
        e.preventDefault();
        if (_this2.isUrl) {
          _services_router_js__WEBPACK_IMPORTED_MODULE_8__["default"].location(_this2.attrs.url, _this2.options);
          return;
        }
        _services_router_js__WEBPACK_IMPORTED_MODULE_8__["default"].state(_this2.state.name, _this2.params, _this2.query, _this2.hash, _this2.options);
      });
      this.onStateChanged = function () {
        return _this2.state && _this2.setActivity();
      };
      window.addEventListener('state-changed', this.onStateChanged);
      this.attr('state', this.setState);
      this.attr('params', this.setParams);
      this.attr('query', this.setQuery);
      this.attr('hash', this.setHash);
      this.attr('options', this.setOptions);
      this.attr('url', this.setUrl);
      this.attr('state', this.resetHref, {
        callOnStart: false
      });
      this.attr('params', this.resetHref, {
        callOnStart: false
      });
      this.attr('query', this.resetHref, {
        callOnStart: false
      });
      this.attr('hash', this.resetHref, {
        callOnStart: false
      });
      this.attr('url', this.resetHref, {
        callOnStart: false
      });
      this.resetHref();
    }
  }, {
    key: "removed",
    value: function removed() {
      window.removeEventListener('state-changed', this.onStateChanged);
    }
  }, {
    key: "setUrl",
    value: function setUrl(url) {
      this.url = url;
    }
  }, {
    key: "setState",
    value: function setState(name) {
      this.state = this.getState(name);
      this.setActivity();
    }
  }, {
    key: "setActivity",
    value: function setActivity() {
      this.scope.isActiveState = _services_router_js__WEBPACK_IMPORTED_MODULE_8__["default"].isActiveState(this.state);
      this.scope.inActiveState = _services_router_js__WEBPACK_IMPORTED_MODULE_8__["default"].inActiveState(this.state);
    }
  }, {
    key: "setParams",
    value: function setParams(params) {
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(params) != 'object' || !params) {
        throw new Error("Router state params must be an object");
      }
      this.params = params;
    }
  }, {
    key: "setQuery",
    value: function setQuery(query) {
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(query) != 'object' || !query) {
        throw new Error("Router state query must be an object");
      }
      this.query = query;
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {
      if (typeof hash != 'string' && hash !== undefined && hash !== null) {
        throw new Error("Router state hash must be a string|null");
      }
      this.hash = hash;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(options) != 'object' || !options) {
        throw new Error("Router state options must be an object");
      }
      this.options = options;
    }
  }, {
    key: "getState",
    value: function getState(name) {
      var state = _services_router_js__WEBPACK_IMPORTED_MODULE_8__["default"].getState(name);
      if (!state) {
        throw new Error("Not found router state with name \"".concat(name, "\""));
      }
      return state;
    }
  }, {
    key: "resetHref",
    value: function resetHref() {
      if (this.url) {
        this.attrs.href = this.url;
      } else {
        this.attrs.href = _services_router_js__WEBPACK_IMPORTED_MODULE_8__["default"].createStateUrl(this.state, this.params, this.query, this.hash, this.options);
      }
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('a', this);
    }
  }]);
  return A;
}(_component_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(A, "matches", '[state]:not([url]),[url]:not([state])');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(A, "controlAttributes", true);


/***/ }),

/***/ "./node_modules/akili/src/components/audio.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/audio.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Audio)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for audio elements.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag audio
 * @see Url
 */
var Audio = /*#__PURE__*/function (_Url) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Audio, _Url);
  var _super = _createSuper(Audio);
  function Audio() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Audio);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Audio, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('audio', this);
    }
  }]);
  return Audio;
}(_url_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/content.js":
/*!******************************************************!*\
  !*** ./node_modules/akili/src/components/content.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Content)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text.js */ "./node_modules/akili/src/components/text.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for elements with the contenteditable attribute.
 * 
 * {@link https://akilijs.com/docs/components#docs_contenteditable}
 * 
 * @tag content
 * @selector content,[contenteditable]
 * @attr @see Text
 * @attr {boolean} [editable] - editable or not
 */
var Content = /*#__PURE__*/function (_Text) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Content, _Text);
  var _super = _createSuper(Content);
  function Content() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Content);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    if (_this.el.hasAttribute('editable')) {
      _this.el.setAttribute('contenteditable', _this.el.getAttribute('editable'));
      _this.el.removeAttribute('editable');
    }
    if (getComputedStyle(_this.el).display == 'inline') {
      _this.el.style.display = 'block';
    }
    _this.valueKey = 'innerHTML';
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Content, [{
    key: "walkTextNodes",
    value: function walkTextNodes(el, fn) {
      var nodes = el.childNodes;
      for (var i = 0, l = nodes.length; i < l; i++) {
        var node = nodes[i];
        node.nodeType == 3 ? fn(node) : this.walkTextNodes(node, fn);
      }
    }
  }, {
    key: "getElementTextLength",
    value: function getElementTextLength() {
      var length = 0;
      this.walkTextNodes(this.el, function (node) {
        return length += node.nodeValue.length;
      });
      return length;
    }
  }, {
    key: "setElementFocusOn",
    value: function setElementFocusOn(pos) {
      var nodes = [];
      var node;
      var max = this.getElementTextLength();
      pos > max && (pos = max);
      if (pos <= 0) {
        return this.el.focus();
      }
      this.walkTextNodes(this.el, function (node) {
        return nodes.push(node);
      });
      for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        if (pos > nodes[i].nodeValue.length && nodes[i + 1]) {
          pos -= nodes[i].nodeValue.length;
          continue;
        }
        node = nodes[i];
        break;
      }
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(node, pos);
      range.setEnd(node, pos);
      sel.removeAllRanges();
      sel.addRange(range);
      this.el.focus();
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('content', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].alias('[contenteditable]', 'content');
    }
  }]);
  return Content;
}(_text_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/embed.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/embed.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Embed)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for embed elements.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag embed
 * @see Url
 */
var Embed = /*#__PURE__*/function (_Url) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Embed, _Url);
  var _super = _createSuper(Embed);
  function Embed() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Embed);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Embed, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('embed', this);
    }
  }]);
  return Embed;
}(_url_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/for.js":
/*!**************************************************!*\
  !*** ./node_modules/akili/src/components/for.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Loop: () => (/* binding */ Loop),
/* harmony export */   "default": () => (/* binding */ For)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils.js */ "./node_modules/akili/src/utils.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




/**
 * Component for loops.
 * 
 * {@link https://akilijs.com/docs/components#docs_loops}
 * 
 * @tag for
 * @selector for[in],ol[in],ul[in],thead[in],tbody[in],tfoot[in]
 * @attr {object|array} in - data to create the loop
 * @attr {number} [chunks] - chunks to load data asynchronously
 * @message {object|array} out - sent on the data change
 */
var For = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(For, _Component);
  var _super = _createSuper(For);
  function For() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, For);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.iterators = [];
    _this.iteratorEl = null;
    _this.reset();
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(For, [{
    key: "__prepareAttributeIn",
    value: function __prepareAttributeIn(node, value) {
      if (node instanceof window.Attr && node.name == 'in') {
        return value;
      }
      return (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(For.prototype), "__prepareAttributeIn", this).apply(this, arguments);
    }
  }, {
    key: "__compareNodePropertyValue",
    value: function __compareNodePropertyValue(prop, value) {
      var node = prop.node;
      if (node instanceof window.Attr && node.name == 'in' && prop.value !== value) {
        return false;
      }
      return (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(For.prototype), "__compareNodePropertyValue", this).apply(this, arguments);
    }
  }, {
    key: "__stepIterationChunk",
    value: function __stepIterationChunk(index) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          _this2.drawChunk(index).then(resolve)["catch"](reject);
        });
      });
    }
  }, {
    key: "__removeExcessIterators",
    value: function __removeExcessIterators() {
      var length = Object.keys(this.data).length;
      for (var i = length, l = this.iterators.length; i < l; i++) {
        var iterator = this.iterators[i];
        iterator.__remove();
        this.iterators.splice(i, 1);
        l--;
        i--;
      }
    }
  }, {
    key: "__completeDrawing",
    value: function __completeDrawing() {
      if (this.__isRemoved) {
        return;
      }
      this.reset();
      this.attrs.onOut.trigger(this.data, {
        bubbles: true
      });
    }
  }, {
    key: "__createIterator",
    value: function __createIterator() {
      var el;
      for (var i = 0, l = this.el.children.length; i < l; i++) {
        var child = this.el.children[i];
        if (child.getAttribute('component') == 'loop') {
          el = child;
          break;
        }
        el = child;
      }
      if (!el) {
        el = document.createElement('loop');
        el.innerHTML = this.el.innerHTML;
        this.el.innerHTML = '';
        this.el.appendChild(el);
      }
      var componentName = el.getAttribute('component');
      if (componentName != 'loop') {
        var component = _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component(componentName || el.tagName);
        if (!component) {
          el.setAttribute('component', 'loop');
        } else if (!(component.prototype instanceof For)) {
          var mask = document.createElement('loop');
          mask.appendChild(el);
          el = mask;
        }
      }
      this.html = el.innerHTML;
      this.iteratorEl = this.__createIteratorElement(el.outerHTML);
      el.remove();
    }
  }, {
    key: "__createIteratorElement",
    value: function __createIteratorElement(html) {
      var el = document.createElement('template');
      el.innerHTML = html;
      return el.content.firstChild;
    }
  }, {
    key: "created",
    value: function created() {
      this.__createIterator();
    }
  }, {
    key: "compiled",
    value: function compiled() {
      return this.attr('in', this.draw);
    }
  }, {
    key: "removed",
    value: function removed() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(For.prototype), "removed", this).apply(this, arguments);
      this.iteratorEl && this.iteratorEl.remove();
      delete this.html;
      delete this.iterators;
      delete this.iteratorEl;
      delete this.__iterator;
      delete this.__value;
    }
  }, {
    key: "loop",
    value: function loop(key, value, index) {
      var promise = Promise.resolve();
      this.__index = index;
      this.__key = key;
      this.__value = value;
      this.__hash = _utils_js__WEBPACK_IMPORTED_MODULE_10__["default"].createHash(value);
      if (this.iterators.length > index) {
        var iterator = this.iterators[index];
        iterator.setIndex(this.__index === iterator.index);
        iterator.setKey(this.__key === iterator.key);
        iterator.setValue(_utils_js__WEBPACK_IMPORTED_MODULE_10__["default"].compare(this.__hash, iterator.hash));
        return {
          promise: promise,
          iterator: iterator
        };
      }
      var el = this.iteratorEl.cloneNode();
      el.innerHTML = this.html;
      this.el.appendChild(el);
      promise = _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].compile(el);
      this.iterators.push(el.__akili);
      return {
        promise: promise,
        iterator: el.__akili
      };
    }
  }, {
    key: "drawChunk",
    value: function drawChunk(index) {
      var _this3 = this;
      var keys = Object.keys(this.data);
      var length = keys.length;
      if (index == length) {
        this.__removeExcessIterators();
        return Promise.resolve(this.__completeDrawing());
      }
      var promises = [];
      var chunks = +(this.attrs.chunks || length);
      var size = index + chunks;
      size > length && (size = length);
      var finisher = this.__stepIterationChunk.bind(this);
      var _loop = function _loop() {
        var key = keys[i];
        var n = i + 1;
        var res = _this3.loop(key, _this3.data[key], i);
        res.iterator.iterate(i);
        promises.push(res.promise);
        if (n != size) {
          return "continue";
        }
        if (n == length) {
          _this3.__removeExcessIterators();
          finisher = _this3.__completeDrawing.bind(_this3);
        }
        return {
          v: Promise.all(promises).then(function () {
            return finisher(n);
          })
        };
      };
      for (var i = index; i < size; i++) {
        var _ret = _loop();
        if (_ret === "continue") continue;
        if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(_ret) === "object") return _ret.v;
      }
    }
  }, {
    key: "draw",
    value: function draw(data) {
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(data) != 'object' || data === null) {
        if (_akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].options.debug) {
          // eslint-disable-next-line no-console
          console.warn("\"For\" component \"in\" attribute value type must be an object/array");
        }
        data = [];
      }
      this.data = data;
      var children = [].slice.call(this.el.children);
      this.iterators.sort(function (a, b) {
        return children.indexOf(a.el) - children.indexOf(b.el);
      });
      this.__children.sort(function (a, b) {
        return children.indexOf(a) - children.indexOf(b);
      });
      return this.drawChunk(0);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.__iterator = null;
      this.__index = 0;
      this.__key = '';
      this.__value = null;
      this.__hash = '';
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('for', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('ol', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('ul', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('thead', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('tbody', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('tfoot', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('tr', this.Loop);
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('loop', this.Loop);
    }
  }]);
  return For;
}(_component_js__WEBPACK_IMPORTED_MODULE_8__["default"]);
/**
 * Component for loops.
 * 
 * {@link https://akilijs.com/docs/components#docs_loops}
 * 
 * @tag loop
 * @selector loop,tr
 * @attr @see For
 * @scope {*} loopValue - data item's value of the current iteration 
 * @scope {string|number} loopKey - key of the iteration
 * @scope {number} loopIndex - index of the iteration
 */
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(For, "matches", '[in]');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(For, "events", ['out']);

var Loop = /*#__PURE__*/function (_For) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Loop, _For);
  var _super2 = _createSuper(Loop);
  function Loop() {
    var _this4;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Loop);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this4 = _super2.call.apply(_super2, [this].concat(args));
    _this4["for"] = null;
    _this4.html = _this4.el.innerHTML;
    _this4.isFor = _this4.el.hasAttribute('in');
    if (!_this4.isFor && !(_this4.el.parentNode.__akili instanceof For)) {
      _this4.cancel();
    }
    return _this4;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Loop, [{
    key: "created",
    value: function created() {
      this.__parent.__akili.__iterator = this;
      this["for"] = this.__parent.__akili;
      this.setIndex(true);
      this.setKey(true);
      this.setValue(true);
      if (this.isFor) {
        return (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Loop.prototype), "created", this).apply(this, arguments);
      }
    }
  }, {
    key: "compiled",
    value: function compiled() {
      if (this.isFor) {
        return (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Loop.prototype), "compiled", this).apply(this, arguments);
      }
    }
  }, {
    key: "removed",
    value: function removed() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Loop.prototype), "removed", this).apply(this, arguments);
      delete this["for"];
      delete this.value;
    }
  }, {
    key: "setIndex",
    value: function setIndex(target) {
      this.index = this["for"].__index;
      this.scope.__set('loopIndex', this.index, {
        target: target
      });
    }
  }, {
    key: "setKey",
    value: function setKey(target) {
      this.key = this["for"].__key;
      this.scope.__set('loopKey', this.key, {
        target: target
      });
    }
  }, {
    key: "setValue",
    value: function setValue(target) {
      this.value = this["for"].__value;
      this.scope.__set('loopValue', this.value, {
        target: target,
        saveProxy: true
      });
      this.hash = this["for"].__hash;
    }
  }, {
    key: "iterate",
    value: function iterate() {}
  }]);
  return Loop;
}(For);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Loop, "matches", '');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__["default"])(Loop, "controlAttributes", true);
For.Loop = Loop;

/***/ }),

/***/ "./node_modules/akili/src/components/if.js":
/*!*************************************************!*\
  !*** ./node_modules/akili/src/components/if.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Else: () => (/* binding */ Else),
/* harmony export */   ElseIf: () => (/* binding */ ElseIf),
/* harmony export */   "default": () => (/* binding */ If)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for conditional statements.
 * 
 * {@link https://akilijs.com/docs/components#docs_conditional_statements}
 * 
 * @tag if
 * @selector if[is]
 * @attr {boolean} is - show the element content or not
 * @attr {boolean} recreate - delete the content and recreate or just show/hide 
 */
var If = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(If, _Component);
  var _super = _createSuper(If);
  function If() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, If);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.html = _this.el.innerHTML;
    _this.el.innerHTML = '';
    _this.state = false;
    _this.active = false;
    _this.recreate = false;
    _this.rendered = false;
    _this.display = getComputedStyle(_this.el).display;
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(If, [{
    key: "compiled",
    value: function compiled() {
      this.attr('recreate', this.setRecreation);
      return this.attr('is', this.setIs);
    }
  }, {
    key: "setIs",
    value: function setIs(val) {
      this.state = !!val;
      return this.setState();
    }
  }, {
    key: "setActivity",
    value: function setActivity(active) {
      this.active = active;
    }
  }, {
    key: "setRecreation",
    value: function setRecreation(recreate) {
      this.recreate = recreate;
    }
  }, {
    key: "setState",
    value: function setState() {
      var res = this.rendering();
      var next = this.el.nextElementSibling;
      var result;
      if (!next || !next.matches('else-if,else')) {
        return;
      }
      next.__akili.setActivity(this.active || this.state);
      next.__akili.setRecreation(this.recreate);
      result = next.__akili.setState();
      return Promise.resolve(res).then(function () {
        return result;
      });
    }
  }, {
    key: "rendering",
    value: function rendering() {
      var res = Promise.resolve();
      if (this.state && !this.active) {
        this.el.style.setProperty('display', this.display, 'important');
        if (this.recreate || !this.rendered) {
          res = this.render();
        }
      } else {
        if (this.recreate) {
          this.empty();
        } else if (!this.rendered) {
          res = this.render();
        }
        this.el.style.setProperty('display', 'none', 'important');
      }
      return res;
    }
  }, {
    key: "render",
    value: function render() {
      var res;
      this.empty();
      this.el.innerHTML = this.html;
      res = _akili_js__WEBPACK_IMPORTED_MODULE_7__["default"].compile(this.el, {
        recompile: true
      });
      this.rendered = true;
      return res;
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_7__["default"].component('if', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_7__["default"].component('else-if', this.ElseIf);
      _akili_js__WEBPACK_IMPORTED_MODULE_7__["default"].component('else', this.Else);
    }
  }]);
  return If;
}(_component_js__WEBPACK_IMPORTED_MODULE_6__["default"]);
/**
 * Component for conditional statements.
 * 
 * {@link https://akilijs.com/docs/components#docs_conditional_statements}
 * 
 * @tag else-if
 * @selector else-if[is]
 * @attr {boolean} is @see If
 */
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(If, "transparent", true);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(If, "matches", '[is]');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(If, "booleanAttributes", ['recreate']);

var ElseIf = /*#__PURE__*/function (_If) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(ElseIf, _If);
  var _super2 = _createSuper(ElseIf);
  function ElseIf() {
    var _this2;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ElseIf);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _this2.active = true;
    return _this2;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ElseIf);
}(If);

/**
 * Component for conditional statements.
 * 
 * {@link https://akilijs.com/docs/components#docs_conditional_statements}
 * 
 * @tag else
 */
var Else = /*#__PURE__*/function (_ElseIf) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Else, _ElseIf);
  var _super3 = _createSuper(Else);
  function Else() {
    var _this3;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Else);
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    _this3 = _super3.call.apply(_super3, [this].concat(args));
    _this3.el.setAttribute('is', 'true');
    return _this3;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Else);
}(ElseIf);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Else, "matches", '');
If.ElseIf = ElseIf;
If.Else = Else;

/***/ }),

/***/ "./node_modules/akili/src/components/iframe.js":
/*!*****************************************************!*\
  !*** ./node_modules/akili/src/components/iframe.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Iframe)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for iframes.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag iframe
 * @see Url
 */
var Iframe = /*#__PURE__*/function (_Url) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Iframe, _Url);
  var _super = _createSuper(Iframe);
  function Iframe() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Iframe);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Iframe, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('iframe', this);
    }
  }]);
  return Iframe;
}(_url_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/image.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/image.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Image)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for images.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag img
 * @see Url
 */
var Image = /*#__PURE__*/function (_Url) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Image, _Url);
  var _super = _createSuper(Image);
  function Image() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Image);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Image, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('img', this);
    }
  }]);
  return Image;
}(_url_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/include.js":
/*!******************************************************!*\
  !*** ./node_modules/akili/src/components/include.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Include)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _services_request_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/request.js */ "./node_modules/akili/src/services/request.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




/**
 * Component to include templates by url.
 * 
 * {@link https://akilijs.com/docs/components#docs_html_templates}
 * 
 * @tag include
 * @selector include[url]
 * @attr {string} url - template path
 * @attr {number|function|boolean} [cache] - request cache {@link https://akilijs.com/docs/requests#docs_cache}
 * @message {void} load - sent on the template load
 * @message {Error} error - sent on error
 */
var Include = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Include, _Component);
  var _super = _createSuper(Include);
  function Include() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Include);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.html = _this.el.innerHTML;
    _this.el.innerHTML = '';
    _this.connection = null;
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Include, [{
    key: "compiled",
    value: function compiled() {
      this.attr('cache', this.setCache);
      return this.attr('url', this.setTemplate);
    }
  }, {
    key: "setCache",
    value: function setCache(cache) {
      this.cache = cache;
    }
  }, {
    key: "setTemplate",
    value: function setTemplate(url) {
      var _this2 = this;
      this.connection && this.connection.abort();
      return _services_request_js__WEBPACK_IMPORTED_MODULE_8__["default"].get(url, {
        cache: this.cache,
        onStart: function onStart(xhr) {
          _this2.connection = xhr;
        }
      }).then(function (res) {
        _this2.connection = null;
        _this2.empty();
        _this2.el.innerHTML = _this2.html;
        _akili_js__WEBPACK_IMPORTED_MODULE_7__["default"].setTemplate(_this2.el, res.data);
        return _akili_js__WEBPACK_IMPORTED_MODULE_7__["default"].compile(_this2.el, {
          recompile: true
        }).then(function () {
          _this2.attrs.onLoad.trigger(undefined, {
            bubbles: false
          });
        });
      })["catch"](function (err) {
        _this2.attrs.onError.trigger(err, {
          bubbles: false
        });
        throw err;
      });
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_7__["default"].component('include', this);
    }
  }]);
  return Include;
}(_component_js__WEBPACK_IMPORTED_MODULE_6__["default"]);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Include, "transparent", true);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Include, "matches", '[url]');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Include, "events", ['load', 'error']);


/***/ }),

/***/ "./node_modules/akili/src/components/input.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/input.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./text.js */ "./node_modules/akili/src/components/text.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component to work with input elements.
 * 
 * {@link https://akilijs.com/docs/components#docs_input}
 * {@link https://akilijs.com/docs/components#docs_checkbox_and_radio}
 * 
 * @tag input
 * @attr @see Text
 * @message @see Text
 */
var Input = /*#__PURE__*/function (_Text) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Input, _Text);
  var _super = _createSuper(Input);
  function Input() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Input);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.isCheckbox = _this.el.type == 'checkbox';
    _this.isRadio = _this.el.type == 'radio';
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Input, [{
    key: "compiled",
    value: function compiled() {
      (this.isCheckbox || this.isRadio) && this.attr('checked', this.setChecked);
      return (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Input.prototype), "compiled", this).apply(this, arguments);
    }
  }, {
    key: "setChecked",
    value: function setChecked(value) {
      value = !!value;
      if (this.el.checked === value) {
        return;
      }
      this.el.checked = value;
      this.__isCompiled && this.attrs.onChange.dispatch(Event, {
        bubbles: true
      });
      this.isRadio && this.changeRadio();
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Input.prototype), "setValue", this).apply(this, arguments);
      this.isRadio && this.el[this.valueKey] != value && this.attrs.onChange.dispatch(Event, {
        bubbles: true
      });
    }
  }, {
    key: "changeRadio",
    value: function changeRadio() {
      var name = this.el.getAttribute('name');
      var selector = "input[type=radio][name='".concat(name, "']:not([scope='").concat(this.scope.__name, "'])");
      var children = this.parent().children(selector);
      for (var i = 0, l = children.length; i < l; i++) {
        var radio = children[i];
        radio.setChecked(radio.el.checked);
      }
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_8__["default"].component('input', this);
    }
  }]);
  return Input;
}(_text_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Input, "booleanAttributes", ['checked', 'multiple'].concat(_text_js__WEBPACK_IMPORTED_MODULE_7__["default"].booleanAttributes));
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Input, "events", ['change'].concat(_text_js__WEBPACK_IMPORTED_MODULE_7__["default"].events));


/***/ }),

/***/ "./node_modules/akili/src/components/object.js":
/*!*****************************************************!*\
  !*** ./node_modules/akili/src/components/object.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Objects)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for object elements.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag object
 * @see Url
 */
var Objects = /*#__PURE__*/function (_Url) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Objects, _Url);
  var _super = _createSuper(Objects);
  function Objects() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Objects);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.urlAttribute = 'data';
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Objects, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('object', this);
    }
  }]);
  return Objects;
}(_url_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/radio.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/radio.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RadioButton: () => (/* binding */ RadioButton),
/* harmony export */   "default": () => (/* binding */ Radio)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _for_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./for.js */ "./node_modules/akili/src/components/for.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component to work with radio group.
 * 
 * {@link https://akilijs.com/docs/components#docs_radio_group}
 * 
 * @tag radio
 * @selector radio[name]
 * @attr {string} name - name of the group
 * @attr {string|null} value - selected value
 * @attr {boolean} defaultRequired - default value is required or not
 * @attr [in] @see For
 * @message {string} radio - sent on value change
 */
var Radio = /*#__PURE__*/function (_For) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Radio, _For);
  var _super = _createSuper(Radio);
  function Radio() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Radio);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.iterable = _this.el.hasAttribute('in');
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Radio, [{
    key: "created",
    value: function created() {
      var _this2 = this;
      this.el.addEventListener('change', function () {
        if (_this2._disableInternalEvents) {
          return;
        }
        var value = _this2.getRadioValue();
        if (value === _this2.prevValue) {
          return;
        }
        _this2.prevValue = value;
        if (_this2.attrs.value === undefined || _this2.__isResolved) {
          _this2.attrs.onRadio.trigger(value, {
            bubbles: true
          });
        }
      });
      if (this.iterable) {
        return (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Radio.prototype), "created", this).apply(this, arguments);
      }
    }
  }, {
    key: "compiled",
    value: function compiled() {
      if (this.iterable) {
        var res = (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Radio.prototype), "compiled", this).apply(this, arguments);
        this.unattr('in', this.draw);
        return res;
      }
    }
  }, {
    key: "resolved",
    value: function resolved() {
      this.attr('value', this.setValue);
      this.attr('name', this.setNames);
      this.attr('defaultRequired', this.setDefaultRequired, {
        callOnStart: false
      });
      return this.attr('in', this.setIn, {
        callOnStart: false
      });
    }
  }, {
    key: "setIn",
    value: function setIn(data) {
      return this.draw(data).then(this.redrawRadio.bind(this));
    }
  }, {
    key: "setDefaultRequired",
    value: function setDefaultRequired() {
      return this.setValue(this.prevValue);
    }
  }, {
    key: "redrawRadio",
    value: function redrawRadio() {
      this.setNames();
      var value = this.isProperValue(this.prevValue) ? this.prevValue : null;
      var children = this.children('input[type=radio]');
      var checkedValue = value;
      for (var i = 0, l = children.length; i < l; i++) {
        var radioEl = children[i].el;
        var selection = !!radioEl.getAttribute('checked');
        if (value && radioEl.value !== value) {
          radioEl.checked = false;
          continue;
        }
        if (value) {
          radioEl.checked = true;
          checkedValue = radioEl.value;
          continue;
        }
        radioEl.checked = selection;
        selection && (checkedValue = radioEl.value);
      }
      this.setValue(checkedValue);
    }
  }, {
    key: "isProperValue",
    value: function isProperValue(value) {
      var children = this.children('input[type=radio]');
      for (var i = 0, l = children.length; i < l; i++) {
        if (children[i].el.value === value) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "setNames",
    value: function setNames(name) {
      var children = this.children('input[type=radio]');
      for (var i = 0, l = children.length; i < l; i++) {
        children[i].el.setAttribute('name', name || this.attrs.name);
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (!this.attrs.defaultRequired && value === this.prevValue) {
        return;
      }
      var children = this.children('input[type=radio]');
      if (this.attrs.defaultRequired && value === null && children.length) {
        value = children[0].el.value;
      }
      if (value === this.prevValue) {
        return;
      }
      this._disableInternalEvents = true;
      for (var i = 0, l = children.length; i < l; i++) {
        var radio = children[i];
        radio.setChecked(radio.el.value === value);
      }
      this._disableInternalEvents = false;
      this.prevValue = value;
      this.attrs.onRadio.trigger(value, {
        bubbles: true
      });
    }
  }, {
    key: "getRadioValue",
    value: function getRadioValue() {
      var children = this.children('input[type=radio]');
      for (var i = 0, l = children.length; i < l; i++) {
        var radio = children[i];
        if (radio.el.checked) {
          return radio.el.value;
        }
      }
      return null;
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_8__["default"].component('radio', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_8__["default"].component('radio-button', this.RadioButton);
    }
  }]);
  return Radio;
}(_for_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
/**
 * Component to work with radio group item.
 * 
 * {@link https://akilijs.com/docs/components#docs_radio_group}
 * 
 * @tag radio-button
 * @attr {string} value - value
 */
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Radio, "matches", '[name]');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Radio, "events", ['radio'].concat(_for_js__WEBPACK_IMPORTED_MODULE_7__["default"].events));
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Radio, "booleanAttributes", ['default-required'].concat(_for_js__WEBPACK_IMPORTED_MODULE_7__["default"].booleanAttributes));

var RadioButton = /*#__PURE__*/function (_Loop) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(RadioButton, _Loop);
  var _super2 = _createSuper(RadioButton);
  function RadioButton() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, RadioButton);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return _super2.call.apply(_super2, [this].concat(args));
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(RadioButton, [{
    key: "compiled",
    value: function compiled() {
      this.attr('value', 'value');
      return (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(RadioButton.prototype), "compiled", this).apply(this, arguments);
    }
  }]);
  return RadioButton;
}(_for_js__WEBPACK_IMPORTED_MODULE_7__.Loop);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(RadioButton, "template", '<label><input type="radio" value="${this.value}"/>${this.__content}</label>');
Radio.RadioButton = RadioButton;

/***/ }),

/***/ "./node_modules/akili/src/components/route.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/route.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _services_request_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/request.js */ "./node_modules/akili/src/services/request.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




/**
 * Component to work with router templates.
 * 
 * {@link https://akilijs.com/docs/routing#docs_templates}
 * 
 * @tag route
 */
var Route = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Route, _Component);
  var _super = _createSuper(Route);
  function Route() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Route);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.el.innerHTML = '';
    return _this;
  }

  /**
   * @param {Transition} transition
   * @param {boolean} load
   * @returns {Promise}
   */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Route, [{
    key: "setTransition",
    value: function setTransition(transition) {
      var _this2 = this;
      var load = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var state = transition.path.state;
      var getParentScopeTransition = function getParentScopeTransition(path) {
        if (path.parent) {
          if (path.parent.component) {
            return path.parent.component.__scope.__transition.path;
          }
          return getParentScopeTransition(path.parent);
        }
        return null;
      };
      var compile = function compile(html) {
        _this2.empty();
        var name = 'component';
        if (state.component) {
          var exists = false;
          for (var key in _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__components) {
            var component = _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].__components[key];
            if (component === state.component) {
              name = key;
              exists = true;
              break;
            }
          }
          if (!exists) {
            throw new Error("Router state \"".concat(state.name, "\" has no defined component"));
          }
        }
        _this2.el.innerHTML = "<".concat(name, ">").concat(html, "</").concat(name, ">");
        return _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].compile(_this2.el, {
          recompile: true
        });
      };
      this.__scope.__transition = {
        parent: getParentScopeTransition(transition.path),
        state: transition.path.state,
        data: transition.path.data,
        url: transition.path.url,
        params: transition.path.params,
        query: transition.path.query,
        hash: transition.path.hash
      };
      if (!load) {
        return _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].compile(this.el, {
          recompile: {
            checkChanges: true
          }
        });
      }
      return Promise.resolve().then(function () {
        if (state.template) {
          return state.template;
        }
        if (state.templateUrl) {
          return _services_request_js__WEBPACK_IMPORTED_MODULE_7__["default"].get(state.templateUrl).then(function (res) {
            return res.data;
          });
        }
      }).then(function (html) {
        return compile(html);
      });
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('route', this);
    }
  }]);
  return Route;
}(_component_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/script.js":
/*!*****************************************************!*\
  !*** ./node_modules/akili/src/components/script.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Script)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for a script element.
 */
var Script = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Script, _Component);
  var _super = _createSuper(Script);
  function Script() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Script);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.prevent();
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Script, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_5__["default"].component('script', this);
    }
  }]);
  return Script;
}(_component_js__WEBPACK_IMPORTED_MODULE_6__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/select.js":
/*!*****************************************************!*\
  !*** ./node_modules/akili/src/components/select.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Option: () => (/* binding */ Option),
/* harmony export */   "default": () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _for_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./for.js */ "./node_modules/akili/src/components/for.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils.js */ "./node_modules/akili/src/utils.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




/**
 * Component to work with select.
 * 
 * {@link https://akilijs.com/docs/components#docs_select}
 * 
 * @tag select  
 * @attr {string} value - actual value
 * @attr [in] @see For
 */
var Select = /*#__PURE__*/function (_For) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Select, _For);
  var _super = _createSuper(Select);
  function Select() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Select);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.iteratorTagName = 'option';
    _this.iterable = _this.el.hasAttribute('in');
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Select, [{
    key: "created",
    value: function created() {
      var _this2 = this;
      this.el.addEventListener('change', function () {
        return _this2.el.content = _this2.getContent();
      });
      if (this.iterable) {
        return (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Select.prototype), "created", this).apply(this, arguments);
      }
    }
  }, {
    key: "compiled",
    value: function compiled() {
      this.iterable && (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Select.prototype), "compiled", this).apply(this, arguments);
      this.attr('multiple', this.setMultiple, {
        callOnStart: false
      });
      this.attr('value', this.setValue);
      this.unattr('in', this.draw);
      return this.attr('in', this.setIn);
    }
  }, {
    key: "setIn",
    value: function setIn(data) {
      return this.draw(data).then(this.redrawSelect.bind(this));
    }
  }, {
    key: "redrawSelect",
    value: function redrawSelect() {
      var vals = this.removeUnproperValues(this.el.content);
      var content = vals.length ? vals : null;
      var selected = [];
      for (var i = this.el.options.length - 1; i >= 0; i--) {
        var option = this.el.options[i];
        var selection = !!option.getAttribute('selected');
        if (content && !content.includes(option.value)) {
          option.selected = false;
          continue;
        }
        if (content) {
          option.selected = true;
          selected.push(option.value);
          continue;
        }
        option.selected = selection;
        selection && selected.push(option.value);
      }
      this.changeValue(this.formatValue(selected));
    }
  }, {
    key: "setMultiple",
    value: function setMultiple() {
      this.changeValue(this.formatValue(_utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].copy(this.el.content)));
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (value === undefined && !this.__isCompiled) {
        return;
      }
      var properValue = this.formatValue(value);
      this.changeValue(properValue, !_utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].compare(properValue, value));
    }
  }, {
    key: "createIteratorElement",
    value: function createIteratorElement() {
      var el = (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Select.prototype), "createIteratorElement", this).apply(this, arguments);
      if (!el.hasAttribute('value')) {
        el.setAttribute('value', this.html.trim());
      }
      return el;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      if (!this.attrs.multiple) {
        return this.el.value;
      }
      var content = [];
      for (var i = 0, l = this.el.options.length; i < l; i++) {
        var option = this.el.options[i];
        if (option.selected) {
          content.push(option.value);
        }
      }
      return content;
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      if (this.attrs.multiple) {
        !Array.isArray(value) && (value = [value]);
        value = this.removeUnproperValues(value);
        return value;
      }
      Array.isArray(value) && (value = value[0]);
      return this.removeUnproperValues(value).length ? value : this.getDefaultValue();
    }
  }, {
    key: "removeUnproperValues",
    value: function removeUnproperValues(values) {
      !Array.isArray(values) ? values = [values] : values.slice();
      var hash = {};
      for (var i = 0, l = this.el.options.length; i < l; i++) {
        hash[this.el.options[i].value] = true;
      }
      for (var _i = values.length - 1; _i >= 0; _i--) {
        if (!hash[values[_i]]) {
          values.splice(_i, 1);
        }
      }
      return values;
    }
  }, {
    key: "redefine",
    value: function redefine() {
      if (!this.el.querySelector('[selected]')) {
        this.el.value = this.getDefaultValue();
      }
      this.changeValue(this.getContent());
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue() {
      var firstEl = this.el.options[0];
      return this.attrs.multiple ? [] : firstEl ? firstEl.value : undefined;
    }
  }, {
    key: "changeValue",
    value: function changeValue(value) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].compare(this.el.content, value)) {
        if (Array.isArray(value)) {
          this.el.value = value[value.length - 1];
          for (var i = 0, l = this.el.options.length; i < l; i++) {
            var option = this.el.options[i];
            option.selected = value.indexOf(option.value) != -1;
          }
        } else {
          this.el.value = value;
          for (var _i2 = 0, _l = this.el.options.length; _i2 < _l; _i2++) {
            var _option = this.el.options[_i2];
            _option.selected = _option.value == value;
          }
        }
        this.el.content = value;
      } else {
        if (!force) {
          return;
        }
      }
      this.attrs.onChange.dispatch(Event, {
        bubbles: true
      });
    }
  }], [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('select', this);
      _akili_js__WEBPACK_IMPORTED_MODULE_9__["default"].component('option', this.Option);
    }
  }]);
  return Select;
}(_for_js__WEBPACK_IMPORTED_MODULE_7__["default"]);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Select, "matches", '');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Select, "booleanAttributes", ['multiple'].concat(_for_js__WEBPACK_IMPORTED_MODULE_7__["default"].booleanAttributes));
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Select, "events", ['change'].concat(_for_js__WEBPACK_IMPORTED_MODULE_7__["default"].events));

var Option = /*#__PURE__*/function (_Loop) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Option, _Loop);
  var _super2 = _createSuper(Option);
  function Option() {
    var _this3;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Option);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this3 = _super2.call.apply(_super2, [this].concat(args));
    _this3.iterable = _this3.el.parentNode.__akili.iterable;
    if (!_this3.iterable) {
      _this3.__cancelled = false;
    }
    return _this3;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Option, [{
    key: "__getParsedExpression",
    value: function __getParsedExpression(expression) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_8__["default"].decodeHtmlEntities(expression);
    }
  }, {
    key: "compiled",
    value: function compiled() {
      this.attr('selected', this.setSelected, {
        callOnStart: false
      });
      if (this.iterable) {
        (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Option.prototype), "compiled", this).apply(this, arguments);
      }
    }
  }, {
    key: "setSelected",
    value: function setSelected(value) {
      this.el.selected = value;
      this["for"].redefine();
    }
  }]);
  return Option;
}(_for_js__WEBPACK_IMPORTED_MODULE_7__.Loop);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Option, "booleanAttributes", ['selected']);
Select.Option = Option;

/***/ }),

/***/ "./node_modules/akili/src/components/source.js":
/*!*****************************************************!*\
  !*** ./node_modules/akili/src/components/source.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Source)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for source elements.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag source
 * @see Url
 */
var Source = /*#__PURE__*/function (_Url) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Source, _Url);
  var _super = _createSuper(Source);
  function Source() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Source);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Source, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('source', this);
    }
  }]);
  return Source;
}(_url_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/style.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/style.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Style)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for a style element.
 */
var Style = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Style, _Component);
  var _super = _createSuper(Style);
  function Style() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Style);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.prevent();
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Style, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_5__["default"].component('style', this);
    }
  }]);
  return Style;
}(_component_js__WEBPACK_IMPORTED_MODULE_6__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/text.js":
/*!***************************************************!*\
  !*** ./node_modules/akili/src/components/text.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils.js */ "./node_modules/akili/src/utils.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Base component to work with text elements.
 * 
 * {@link https://akilijs.com/docs/components#docs_input}
 * {@link https://akilijs.com/docs/components#docs_textarea}
 * {@link https://akilijs.com/docs/components#docs_contenteditable}
 * 
 * @attr {string} value - actual value
 * @attr {boolean} focus - set the focus or not
 * @attr {number} debounce - debounce delay
 * @message {void} debounce - sent on the debounce {@link https://akilijs.com/docs/components#docs_input}
 */
var Text = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Text, _Component);
  var _super = _createSuper(Text);
  function Text() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Text);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.valueKey = 'value';
    _this.debounceInterval = 500;
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Text, [{
    key: "created",
    value: function created() {
      var _this2 = this;
      if (this.el.hasAttribute('on-debounce')) {
        this.el.addEventListener('input', _utils_js__WEBPACK_IMPORTED_MODULE_6__["default"].debounce(function () {
          _this2.attrs.onDebounce.trigger(undefined, {
            bubbles: true
          });
        }, this.debounceInterval));
      }
    }
  }, {
    key: "compiled",
    value: function compiled() {
      this.attr('focus', this.setFocus);
      this.attr('value', this.setValue);
      this.attr('debounce', this.setDebounce);
    }
  }, {
    key: "setDebounce",
    value: function setDebounce(interval) {
      this.debounceInterval = +interval;
    }
  }, {
    key: "setFocus",
    value: function setFocus(value) {
      value ? this.setElementFocus() : this.setElementBlur();
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.el[this.valueKey] !== value && (this.el[this.valueKey] = value === 0 ? '0' : value || '');
    }
  }, {
    key: "setElementFocus",
    value: function setElementFocus() {
      return this.setElementFocusOn(this.getElementTextLength());
    }
  }, {
    key: "setElementFocusOn",
    value: function setElementFocusOn(pos) {
      if (document.activeElement !== this.el) {
        this.el.focus();
      }
      this.el.selectionStart = this.el.selectionEnd = pos;
    }
  }, {
    key: "setElementBlur",
    value: function setElementBlur() {
      this.el.blur();
    }
  }, {
    key: "getElementTextLength",
    value: function getElementTextLength() {
      return this.el.value.length;
    }
  }]);
  return Text;
}(_component_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/textarea.js":
/*!*******************************************************!*\
  !*** ./node_modules/akili/src/components/textarea.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Textarea)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./text.js */ "./node_modules/akili/src/components/text.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component to work with textarea.
 * 
 * {@link https://akilijs.com/docs/components#docs_textarea}
 * 
 * @tag textarea
 * @attr @see Text
 * @message @see Text
 */
var Textarea = /*#__PURE__*/function (_Text) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Textarea, _Text);
  var _super = _createSuper(Textarea);
  function Textarea() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Textarea);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Textarea, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('textarea', this);
    }
  }]);
  return Textarea;
}(_text_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/track.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/track.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Track)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for track elements.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag track
 * @see Url
 */
var Track = /*#__PURE__*/function (_Url) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Track, _Url);
  var _super = _createSuper(Track);
  function Track() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Track);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Track, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('track', this);
    }
  }]);
  return Track;
}(_url_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/components/url.js":
/*!**************************************************!*\
  !*** ./node_modules/akili/src/components/url.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Url)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../component.js */ "./node_modules/akili/src/component.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


/**
 * Component for elements which have async attribute content.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag url
 * @selector [url],[urlset]
 * @attr {string} [url] - source link
 * @attr {string} [urlset] - source link set
 * @attr {boolean} [hidden-error] - hide the failed request picture
 * @attr {string} [loading] - loading type: "lazy", "viewport"
 */
var Url = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Url, _Component);
  var _super = _createSuper(Url);
  function Url() {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Url);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.urlAttribute = 'src';
    _this.handlerAttribute = _this.el.hasAttribute('urlset') ? 'urlset' : 'url';
    _this.elOpacity = getComputedStyle(_this.el).opacity;
    return _this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Url, [{
    key: "created",
    value: function created() {
      this.viewport = false;
      this.cancelable = false;
      this.observer = null;
      this.finished = false;
      this.cancelling = false;
      this.onLoadListener = this.onLoad.bind(this);
      this.onErrorListener = this.onError.bind(this);
      this.el.addEventListener('load', this.onLoadListener);
      this.el.addEventListener('error', this.onErrorListener);
      this.createUrlAttribute();
    }
  }, {
    key: "compiled",
    value: function compiled() {
      this.attr('loading', this.setLoading);
      this.attr(this.handlerAttribute, this.setUrl);
    }
  }, {
    key: "removed",
    value: function removed() {
      this.observer && this.observer.disconnect();
    }
  }, {
    key: "createUrlAttribute",
    value: function createUrlAttribute() {
      if (this.handlerAttribute == 'urlset') {
        this.urlAttribute + 'set';
      }
    }
  }, {
    key: "onLoad",
    value: function onLoad() {
      if (this.isRemoved) {
        return;
      }
      this.attrs.hiddenError && (this.el.style.opacity = this.elOpacity);
      this.finished = true;
      this.cancelling = false;
    }
  }, {
    key: "onError",
    value: function onError() {
      if (this.isRemoved) {
        return;
      }
      this.attrs.hiddenError && (this.el.style.opacity = 0);
      !this.cancelling && (this.finished = true);
    }
  }, {
    key: "intersectionHandler",
    value: function intersectionHandler(entries) {
      var entry = entries[0];
      this.isIntersecting = entry.isIntersecting;
      if (!entry.isIntersecting && !this.finished) {
        this.cancelling = true;
        this.attrs[this.urlAttribute] = '';
        return;
      }
      if (!this.finished) {
        this.cancelling = false;
        this.attrs[this.urlAttribute] = this.attrs[this.handlerAttribute];
      }
    }
  }, {
    key: "setLoading",
    value: function setLoading(value) {
      this.viewport = value == 'viewport';
      if (!this.viewport) {
        this.observer && this.observer.disconnect();
        delete this.isIntersecting;
        return;
      }
      this.observer = new IntersectionObserver(this.intersectionHandler.bind(this));
      this.observer.observe(this.el);
    }
  }, {
    key: "setUrl",
    value: function setUrl(url) {
      this.finished = false;
      this.cancelling = false;
      if (this.viewport && !this.isIntersecting) {
        return;
      }
      this.attrs[this.urlAttribute] = url;
    }
  }]);
  return Url;
}(_component_js__WEBPACK_IMPORTED_MODULE_6__["default"]);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Url, "matches", '[url],[urlset]');
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Url, "booleanAttributes", ['hidden-error']);


/***/ }),

/***/ "./node_modules/akili/src/components/video.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/components/video.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Video)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./url.js */ "./node_modules/akili/src/components/url.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/**
 * Component for video elements.
 * 
 * {@link https://akilijs.com/docs/components#docs_image,_iframe,_embed,_audio,_video,_track,_source,_object}
 * 
 * @tag video
 * @see Url
 */
var Video = /*#__PURE__*/function (_Url) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Video, _Url);
  var _super = _createSuper(Video);
  function Video() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Video);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Video, null, [{
    key: "define",
    value: function define() {
      _akili_js__WEBPACK_IMPORTED_MODULE_6__["default"].component('video', this);
    }
  }]);
  return Video;
}(_url_js__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ }),

/***/ "./node_modules/akili/src/event-emitter.js":
/*!*************************************************!*\
  !*** ./node_modules/akili/src/event-emitter.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventEmitter)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./node_modules/akili/src/utils.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }


/**
 * Class to work with events.
 * 
 * {@link https://akilijs.com/docs/events}
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter(name, node, el, component) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, EventEmitter);
    this.name = name;
    this.node = node;
    this.el = el;
    this.component = component;
  }

  /**
   * Trigger the event
   *
   * @param {*} data
   * @param {object} [options]
   * @param {boolean} [force]
   * @returns {Promise}
   */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(EventEmitter, [{
    key: "trigger",
    value: function trigger(data) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.__removed) {
        return;
      }
      if (force || !this.inEvaluating()) {
        data = _utils__WEBPACK_IMPORTED_MODULE_3__["default"].copy(data, {
          plain: true
        });
        this.el.dispatchEvent(new CustomEvent(this.name, this.prepareOptions(_objectSpread({
          detail: data
        }, options))));
      }
    }

    /**
     * Dispatch the event
     *
     * @param {Event} _Event - class of the event
     * @param {object} [options]
     * @param {boolean} [force]
     * @returns {Promise}
     */
  }, {
    key: "dispatch",
    value: function dispatch(_Event) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.__removed) {
        return;
      }
      if (force || !this.inEvaluating()) {
        this.el.dispatchEvent(new _Event(this.name, this.prepareOptions(options)));
      }
    }

    /**
     * Prepere the event options
     * 
     * @param {object} [options] 
     */
  }, {
    key: "prepareOptions",
    value: function prepareOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      options = _objectSpread({
        bubbles: true
      }, options);
      this.node.__component.__prepareAttributeOut(this.node, options.detail);
      return options;
    }

    /**
     * Check the event callback doesn't run recursively
     *
     * @returns {boolean}
     */
  }, {
    key: "inEvaluating",
    value: function inEvaluating() {
      var data = this.component.__evaluatingEvent;
      if (!data) {
        return false;
      }
      return data.el === this.el && data.event.type === this.name && data.component === this.component;
    }

    /**
     * Bind the function
     *
     * @param {function} fn
     */
  }, {
    key: "bind",
    value: function bind(fn) {
      this.el.addEventListener(this.name, this.fn = fn);
    }

    /**
     * Unbind the function
     */
  }, {
    key: "unbind",
    value: function unbind() {
      this.fn && this.el.removeEventListener(this.name, this.fn);
    }

    /**
     * Remove the emitter
     */
  }, {
    key: "remove",
    value: function remove() {
      this.unbind();
      delete this.name;
      delete this.node;
      delete this.component;
      delete this.el;
      this.__removed = true;
    }
  }]);
  return EventEmitter;
}();


/***/ }),

/***/ "./node_modules/akili/src/globals.js":
/*!*******************************************!*\
  !*** ./node_modules/akili/src/globals.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./akili.js */ "./node_modules/akili/src/akili.js");

var obj = {};

/**
 * Globals is for using the custom variables in html
 * 
 * {@link https://akilijs.com/docs/scope#docs_globals}
 */
var globals = new Proxy(obj, {
  get: function get(target, key) {
    if (key == '__target') {
      return obj;
    }
    return target[key];
  },
  set: function set(target, key, value) {
    target[key] = _akili_js__WEBPACK_IMPORTED_MODULE_0__["default"].wrap(value, {
      tag: key
    });
    return true;
  },
  deleteProperty: function deleteProperty(target, key) {
    _akili_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeTag(key);
    delete target[key];
    return true;
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globals);

/***/ }),

/***/ "./node_modules/akili/src/scope.js":
/*!*****************************************!*\
  !*** ./node_modules/akili/src/scope.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Scope)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/akili/src/utils.js");





/**
 * Scope class
 * 
 * {@link https://akilijs.com/docs/scope}
 *
 * All properties starting with __ are not monitored.
 * You can use them for internal manipulations.
 */
var Scope = /*#__PURE__*/function () {
  function Scope(name, el, component) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Scope);
    this.__name = name;
    this.__el = el;
    this.__component = component;
    el.setAttribute('scope', name);
  }

  /**
   * Set the scope value
   * 
   * @param {string|string[]} keys
   * @param {*} value
   * @param {object} [options] 
   * @param {boolean} [options.saveProxy] 
   * @param {boolean} [options.silent]
   * @param {boolean} [options.target]
   * @protected
   */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Scope, [{
    key: "__set",
    value: function __set(keys, value) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!Array.isArray(keys)) {
        keys = [keys];
      }
      _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].unisolate(function () {
        options.saveProxy && (_this.__component.__disableProxyRedefining = true);
        options.silent && _this.__component.__disableKeys();
        _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].setPropertyByKeys(keys, options.target ? _this.__target : _this, function (last, val) {
          if (!last) {
            return val || {};
          }
          return value;
        });
        options.silent && _this.__component.__enableKeys();
        options.saveProxy && (_this.__component.__disableProxyRedefining = false);
      });
    }

    /**
     * Remove the scope
     * 
     * @protected
     */
  }, {
    key: "__remove",
    value: function __remove() {
      _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].removeScope(this.__name);
      for (var key in this) {
        if (!Object.prototype.hasOwnProperty.call(this, key)) {
          continue;
        }
        delete this[key];
      }
    }
  }]);
  return Scope;
}();


/***/ }),

/***/ "./node_modules/akili/src/services/request.js":
/*!****************************************************!*\
  !*** ./node_modules/akili/src/services/request.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Request: () => (/* binding */ Request),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils.js */ "./node_modules/akili/src/utils.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



/**
 * Class to manage requests.
 * 
 * {@link https://akilijs.com/docs/requests}
 */
var Request = /*#__PURE__*/function () {
  /**
   * @param {string} baseUrl
   * @param {object} [defaults] 
   */
  function Request(baseUrl, defaults) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Request);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "__cache", {});
    /**
     * Get the headers of an XMLHttpRequest instance
     * 
     * @param {XMLHttpRequest}
     */
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "getHeaders", function (xhr) {
      var headers = {};
      var str = xhr.getAllResponseHeaders();
      var arr = str.split("\r\n");
      for (var i = 0, l = arr.length; i < l; i++) {
        var line = arr[i];
        var index = line.indexOf(": ");
        if (index > 0) {
          var key = line.substring(0, index);
          var val = line.substring(index + 2);
          headers[key] = val;
        }
      }
      return headers;
    });
    this.baseUrl = baseUrl ? baseUrl.replace(/\/$/, '') + '/' : '';
    this.defaults = _objectSpread({
      statusErrorPattern: /^[^23]/,
      cache: false
    }, defaults || {});
  }

  /**
   * Send the request
   *
   * @param {object} options
   * @returns {Promise}
   */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Request, [{
    key: "query",
    value: function query(options) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        options = _objectSpread(_objectSpread({}, _this.defaults), options || {});
        options.url = _this.baseUrl ? "".concat(_this.baseUrl).concat(options.url.replace(/^\//, '')) : options.url;
        options.method = options.method || 'GET';
        var xhr = new XMLHttpRequest();
        var before = _this.transformBefore(xhr, options);
        xhr = before.xhr;
        options = before.options;
        typeof options.onStart == 'function' && options.onStart(xhr);
        options.headers = options.headers || {};
        if (options.json) {
          options.json !== true && (options.body = JSON.stringify(options.json));
          options.headers['content-type'] = 'application/json';
          options.responseType = options.responseType || 'json';
        } else if (options.form) {
          options.body = _this.createFormData(options.form);
          options.headers['content-type'] = 'multipart/form-data';
        }
        if (options.params) {
          var str = _this.paramsToQuery(options.params);
          str && (options.url += "?" + str);
        }
        var hash = null;
        var cache = typeof options.cache == 'function' ? options.cache(options) : options.cache;
        !window.AKILI_SSR && !_akili_js__WEBPACK_IMPORTED_MODULE_5__["default"].__init && (cache = true);
        if (options.method.toUpperCase() == 'GET' && (!options.body || typeof options.body == 'string')) {
          hash = _this.createCacheHash({
            url: options.url,
            method: options.method,
            user: options.user,
            password: options.password,
            body: options.body
          });
        }
        if (cache && hash) {
          var _cache = _this.getCache(hash);
          var now = new Date().getTime();
          if (_cache && (cache === true || now - _cache.createdAt <= cache)) {
            return resolve(_this.transformAfter(_cache.result));
          }
        }
        xhr.open(options.method, options.url, true, options.user, options.password);
        if (Object.prototype.hasOwnProperty.call(options, 'timeout')) {
          xhr.timeout = options.timeout;
        }
        if (options.responseType) {
          xhr.responseType = options.responseType;
        }
        if (options.withCredentials) {
          xhr.withCredentials = options.withCredentials;
        }
        var headerKeys = Object.keys(options.headers);
        for (var i = 0, l = headerKeys.length; i < l; i++) {
          var k = headerKeys[i];
          xhr.setRequestHeader(k, options.headers[k]);
        }
        if (typeof options.onProgress == 'function') {
          xhr.onprogress = function (event) {
            return options.onProgress(event, xhr);
          };
        }
        xhr.onload = function () {
          var result = {
            response: xhr.response,
            status: xhr.status,
            readyState: xhr.readyState,
            statusText: xhr.statusText,
            withCredentials: xhr.withCredentials,
            responseType: xhr.responseType,
            responseText: xhr.responseType == 'text' ? xhr.responseText : '',
            responseXML: xhr.responseType == 'document' ? xhr.responseXML : '',
            responseURL: xhr.responseURL,
            timeout: xhr.timeout,
            headers: _this.getHeaders(xhr)
          };
          var response = _this.transformAfter(result);
          if (options.statusErrorPattern && (xhr.status + '').match(options.statusErrorPattern)) {
            var err = new Error("Request to \"".concat(options.url, "\" returns failure status code ").concat(xhr.status));
            err.response = response;
            return reject(err);
          }
          (cache || window.AKILI_SSR) && hash && _this.createCache(hash, result);
          resolve(response);
        };
        xhr.ontimeout = function () {
          return reject(new Error("Request to \"".concat(options.url, "\" timed out")));
        };
        xhr.onerror = reject;
        xhr.send(options.body);
      });
    }
  }, {
    key: "getCache",
    value:
    /**
     * Get the cache
     * 
     * @param {string} hash
     * @returns {object}
     */
    function getCache(hash) {
      return this.__cache[hash] || null;
    }

    /**
     * Create the cache
     * 
     * @param {string} hash
     * @param {object} result
     */
  }, {
    key: "createCache",
    value: function createCache(hash, result) {
      this.__cache[hash] = {
        result: result,
        createdAt: new Date().getTime()
      };
    }

    /**
     * Remove the cache
     * 
     * @param {string} hash
     */
  }, {
    key: "removeCache",
    value: function removeCache(hash) {
      delete this.__cache[hash];
    }

    /**
     * Create a hash for saving in the cache
     * 
     * @param {object} data
     * @returns {string}
     */
  }, {
    key: "createCacheHash",
    value: function createCacheHash(data) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].createHash(data);
    }

    /**
     * Convert the object to a query string
     *
     * @param {object} obj
     * @returns {string}
     */
  }, {
    key: "paramsToQuery",
    value: function paramsToQuery(obj) {
      var sep = '&';
      var eq = '=';
      if (!obj || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(obj) !== 'object') {
        return '';
      }
      return Object.keys(obj).map(function (k) {
        var ks = encodeURIComponent(k);
        if (Array.isArray(obj[k])) {
          ks = encodeURIComponent(k);
          return obj[k].map(function (v, i) {
            return ks + "[".concat(i, "]") + eq + encodeURIComponent(v);
          }).join(sep);
        } else if (obj[k] && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(obj[k]) === 'object') {
          var opt = [];
          Object.keys(obj[k]).map(function (key) {
            return opt.push(ks + "[".concat(key, "]") + eq + encodeURIComponent(obj[k][key]));
          });
          return opt.join(sep);
        } else {
          return ks + eq + encodeURIComponent(obj[k]);
        }
      }).join(sep);
    }

    /**
     * Convert the query string to an object
     *
     * @param {string} str
     * @returns {object}
     */
  }, {
    key: "paramsFromQuery",
    value: function paramsFromQuery(str) {
      var query = {};
      var amps = str.split('&');
      for (var i = 0, l = amps.length; i < l; i++) {
        var eqs = amps[i].split('=');
        var key = decodeURIComponent(eqs[0]);
        var val = decodeURIComponent(eqs[1]);
        if (!key) {
          continue;
        }
        if (Array.isArray(query[key])) {
          query[key].push(val);
        } else if (query[key]) {
          query[key] = [query[key], val];
        } else {
          query[key] = val;
        }
      }
      return query;
    }

    /**
     * Create multipart form data from the object
     *
     * @param {object} obj
     * @param {FormData} [data]
     * @param {string} [namespace]
     * @returns {FormData}
     */
  }, {
    key: "createFormData",
    value: function createFormData(obj) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var namespace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var fd = data || new FormData();
      for (var k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k) && obj[k]) {
          var key = namespace ? namespace + '[' + k + ']' : k;
          if (obj[k] instanceof Date) {
            fd.append(key, obj[k].toISOString());
          } else if (_utils_js__WEBPACK_IMPORTED_MODULE_4__["default"].isPlainObject(obj[k])) {
            this.createFormData(obj[k], fd, key);
          } else {
            fd.append(key, obj[k]);
          }
        }
      }
      return fd;
    }

    /**
     * Transform the data before the request
     *
     * @param {XMLHttpRequest} xhr
     * @param {object} options
     * @returns {object}
     */
  }, {
    key: "transformBefore",
    value: function transformBefore(xhr, options) {
      return {
        xhr: xhr,
        options: options
      };
    }

    /**
     * Transform the data after the request
     *
     * @param {object} result
     * @returns {object}
     */
  }, {
    key: "transformAfter",
    value: function transformAfter(result) {
      return _objectSpread(_objectSpread({}, result), {}, {
        data: result.response
      });
    }

    /**
     *  Make a GET request
     *
     * @param {string} url
     * @param {object} options
     * @returns {Promise}
     */
  }, {
    key: "get",
    value: function get(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.url = url;
      options.method = 'GET';
      return this.query(options);
    }

    /**
     * Makea a DELETE request
     *
     * @param {string} url
     * @param {object} options
     * @returns {Promise}
     */
  }, {
    key: "delete",
    value: function _delete(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.url = url;
      options.method = 'DELETE';
      return this.query(options);
    }

    /**
     * Make a POST request
     *
     * @param {string} url
     * @param {object} options
     * @returns {Promise}
     */
  }, {
    key: "post",
    value: function post(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.url = url;
      options.method = 'POST';
      return this.query(options);
    }

    /**
     * Make a PUT request
     *
     * @param {string} url
     * @param {object} options
     * @returns {Promise}
     */
  }, {
    key: "put",
    value: function put(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.url = url;
      options.method = 'PUT';
      return this.query(options);
    }

    /**
     *  Make a PATCH request
     *
     * @param {string} url
     * @param {object} options
     * @returns {Promise}
     */
  }, {
    key: "patch",
    value: function patch(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.url = url;
      options.method = 'PATCH';
      return this.query(options);
    }

    /**
     * Make a HEAD request
     *
     * @param {string} url
     * @param {object} options
     * @returns {Promise}
     */
  }, {
    key: "head",
    value: function head(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.url = url;
      options.method = 'HEAD';
      return this.query(options);
    }
  }]);
  return Request;
}();
var request = new Request();
request.__instances = {};
request.__cache = {};

/**
 * Add a new instance
 *
 * @param {string} name
 * @param {Request} instance
 */
request.addInstance = function (name, instance) {
  this.__instances[name] = instance;
};

/**
 * Remove the instance
 *
 * @param {string} name
 */
request.removeInstance = function (name) {
  delete this.__instances[name];
};
Object.defineProperty(request, 'use', {
  get: function get() {
    return request.__instances;
  }
});
request.Request = Request;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);

/***/ }),

/***/ "./node_modules/akili/src/services/router.js":
/*!***************************************************!*\
  !*** ./node_modules/akili/src/services/router.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transition: () => (/* binding */ Transition),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils.js */ "./node_modules/akili/src/utils.js");
/* harmony import */ var _request_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./request.js */ "./node_modules/akili/src/services/request.js");
/* harmony import */ var _components_route_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/route.js */ "./node_modules/akili/src/components/route.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }





/**
 * Transition class.
 * The instance of this class includes the last actual router transition information.
 * 
 * {@link https://akilijs.com/docs/routing#docs_transition}
 */
var Transition = /*#__PURE__*/function () {
  function Transition(url) {
    var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Transition);
    this.url = url;
    this.previous = previous;
    this.path = null;
    this.routes = [];
    this.states = {};
    this.__cancelled = false;
    this.__finished = false;
  }

  /**
   * Redirect to another state
   * 
   * @see router.state
   */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Transition, [{
    key: "redirect",
    value: function redirect(state) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var hash = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      options = _objectSpread(_objectSpread({}, this.path.options), options);
      this.cancel();
      return router.state.call(router, state, params, query, hash, options);
    }

    /**
     * Reload the current state
     * 
     * @see router.state
     */
  }, {
    key: "reload",
    value: function reload() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      options = _objectSpread(_objectSpread({}, this.path.options), options);
      params = _objectSpread(_objectSpread({}, this.path.params), params);
      query = _objectSpread(_objectSpread({}, this.path.query), query);
      hash = hash === undefined ? this.path.hash : hash;
      return this.redirect(this.path.state.name, params, query, hash, options);
    }

    /**
     * Set the current path
     * 
     * @param {object} path 
     */
  }, {
    key: "setPath",
    value: function setPath(path) {
      path.parent = this.path || null;
      this.path = _objectSpread({
        params: {},
        query: {}
      }, path);
      this.routes.push(this.path);
      this.states[this.path.state.name] = this.path;
    }

    /**
     * Get a route by the state
     *  
     * @param {*} state 
     */
  }, {
    key: "getRoute",
    value: function getRoute(state) {
      for (var i = 0, l = this.routes.length; i < l; i++) {
        var route = this.routes[i];
        if (route.state === state) {
          return route;
        }
      }
      return null;
    }

    /**
     * Check if it has the state
     * 
     * @param {object} state 
     */
  }, {
    key: "hasState",
    value: function hasState(state) {
      return !!this.states[state.name];
    }

    /**
     * Check the route is changed
     * 
     * @param {object} route
     */
  }, {
    key: "isRouteChanged",
    value: function isRouteChanged(route) {
      if (!this.previous) {
        return true;
      }
      var state = route.state;
      if (!this.previous.hasState(state)) {
        return true;
      }
      var paramKeys = [];
      state.fullPattern.replace(router.__paramRegex, function (m, f, v) {
        return paramKeys.push(v);
      });
      for (var key in state.params) {
        if (paramKeys.indexOf(key) == -1) {
          paramKeys.push(key);
        }
      }
      var queryKeys = Object.keys(state.query);
      var watchHash = state.hash !== undefined;
      var prevRoute = this.previous.getRoute(state);
      var prev = {
        params: _utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].includeKeys(prevRoute.params, paramKeys),
        query: _utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].includeKeys(prevRoute.query, queryKeys)
      };
      var current = {
        params: _utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].includeKeys(route.params, paramKeys),
        query: _utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].includeKeys(route.query, queryKeys)
      };
      if (watchHash) {
        prev.hash = prevRoute.hash;
        current.hash = route.hash;
      }
      return !_utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].compare(prev, current);
    }

    /**
     * Cancel the current transition
     */
  }, {
    key: "cancel",
    value: function cancel() {
      this.__cancelled = true;
      this.finish();
    }

    /**
     * Finish the transition
     */
  }, {
    key: "finish",
    value: function finish() {
      this.__finished = true;
      delete this.previous;
      var index = router.__queue.indexOf(this);
      index >= 0 && router.__queue.splice(index, 1);
    }
  }]);
  return Transition;
}();

/**
 * Akili router
 * 
 * {@link https://akilijs.com/docs/routing}
 */
var router = {};
router.baseUrl = "/";
router.states = [];
router.hashMode = true;
router.transition = null;
router.__info = {};
router.__queue = [];
router.__redirects = 0;
router.__init = false;
router.__paramRegex = /(\/?:([\w\d-]+))/g;
router.__routeSelector = function (c) {
  return c instanceof _components_route_js__WEBPACK_IMPORTED_MODULE_7__["default"];
};

/**
 * Add a new state
 *
 * @param {string} name - state name. To set parents you can use dot, e.g. 'app.article.edit'
 * @param {string} pattern - url pattern like 'app/article/:id'
 * @param {object} [options]
 * @returns {router}
 */
router.add = function (name, pattern) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(name) == 'object') {
    options = name;
    pattern = options.pattern;
    name = options.state;
    delete options.pattern;
    delete options.state;
  }
  if (!name) {
    throw new Error("Router state must have a name");
  }
  var defaultOptions = {
    template: '',
    templateUrl: '',
    "abstract": false,
    component: null,
    params: {},
    query: {},
    handler: function handler() {},
    options: {}
  };
  if (_akili_js__WEBPACK_IMPORTED_MODULE_4__["default"].options.debug && options.component && (options.template || options.templateUrl)) {
    // eslint-disable-next-line no-console
    console.warn("Router state \"".concat(name, "\" must only have a component or template option"));
  }
  if (!options.template && !options.templateUrl && !options.component) {
    options["abstract"] = true;
  }
  if (this.has(name)) {
    throw new Error("Router state \"".concat(name, "\" is already exists"));
  }
  this.setState(name, pattern, _objectSpread(_objectSpread({}, defaultOptions), options));
  return this;
};

/**
 * Remove the state
 *
 * @param {string} name
 */
router.remove = function (name) {
  for (var i = 0, l = this.states.length; i < l; i++) {
    if (this.states[i].name == name) {
      this.states.splice(i, 1);
      return;
    }
  }
};

/**
 * Check the state exists
 *
 * @param {string} name
 * @returns {boolean}
 */
router.has = function (name) {
  for (var i = 0, l = this.states.length; i < l; i++) {
    if (this.states[i].name == name) {
      return true;
    }
  }
  return false;
};

/**
 * Change the state
 *
 * @param {string} state
 * @param {object} [params] - params for state {id: 1} => '/app/:id' => '/app/1'
 * @param {object} [query] - query {x: 1} => '/app/?x=1'
 * @param {string} [hash]
 * @param {object} [options]
 */
router.state = function (state) {
  var _this = this;
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var hash = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(state) !== 'object' && (state = this.getState(state));
  if (!state) {
    throw new Error("Not found route state with name ".concat(state));
  }
  options = _objectSpread({}, options);
  options.manual = true;
  var _this$prepareStateArg = this.prepareStateArgs(state, params, query, hash, options, false);
  params = _this$prepareStateArg.params;
  query = _this$prepareStateArg.query;
  hash = _this$prepareStateArg.hash;
  options = _this$prepareStateArg.options;
  var url = this.createStateUrl(state, params, query, hash, options);
  this.isolate(function () {
    return _this.setUrl(url);
  });
  return this.changeState(options);
};

/**
 * Go back
 */
router.back = function () {
  return window.history.back.apply(window.history, arguments);
};

/**
 * Go to some position
 */
router.go = function () {
  return window.history.go.apply(window.history, arguments);
};

/**
 * Go forward
 */
router.forward = function () {
  return window.history.forward.apply(window.history, arguments);
};

/**
 * Change the state by the url
 *
 * @param {string} url
 * @param {object} [options]
 */
router.location = function (url) {
  var _this2 = this;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options = _objectSpread({}, options);
  options.manual = true;
  this.isolate(function () {
    return _this2.setUrl(url);
  });
  return this.changeState(options);
};

/**
 * Initialize the router. 
 * Must be called before Akili.init()
 *
 * @param {string} [defaultUrl]
 * @param {boolean} [hashMode=true]
 */
router.init = function () {
  var _this3 = this;
  var defaultUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var hashMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var oldPushState = window.history.pushState;
  window.history.pushState = function () {
    var res = oldPushState.apply(this, arguments);
    // eslint-disable-next-line no-console
    router.changeState()["catch"](function (err) {
      return console.error(err);
    });
    return res;
  };
  this.__onStateChangeHandler = function () {
    // eslint-disable-next-line no-console
    _this3.changeState()["catch"](function (err) {
      return console.error(err);
    });
  };
  this.defaultUrl = defaultUrl;
  this.hashMode = hashMode;
  this.states.sort(function (a, b) {
    a = a.name.split('.').length;
    b = b.name.split('.').length;
    return a - b;
  });
  for (var i = 0, l = this.states.length; i < l; i++) {
    this.initState(this.states[i]);
  }
  if (!this.states.length && _akili_js__WEBPACK_IMPORTED_MODULE_4__["default"].options.debug) {
    // eslint-disable-next-line no-console
    console.warn("You didn't add any routes to the router");
  }
  window.addEventListener('popstate', this.__onStateChangeHandler);
  this.__init = true;
};

/**
 * Initialize the state 
 * 
 * @param {object} state 
 */
router.initState = function (state) {
  var parents = [];
  state.children = [];
  parents = state.name.split('.');
  parents.pop();
  state.level = state["abstract"] ? null : parents.length;
  if (parents.length) {
    var parentName = parents.join('.');
    var parent = this.getState(parentName);
    if (!parent) {
      throw new Error("Not found parent route state \"".concat(parentName, "\" for \"").concat(state.name, "\""));
    }
    if (state.level !== null && parent["abstract"]) {
      state.level--;
    }
    state.fullPattern = this.splitSlashes(parent.fullPattern + '/' + state.pattern);
    parent.children.push(state);
  } else {
    state.fullPattern = state.pattern;
  }
};

/**
 * Get the state by the name
 *
 * @param {string} name
 * @returns {object|null}
 */
router.getState = function (name) {
  for (var i = 0, l = this.states.length; i < l; i++) {
    var state = this.states[i];
    if (state.name == name) {
      return state;
    }
  }
  return null;
};

/**
 * Set the state
 *
 * @param {string} name
 * @param {string} pattern
 * @param {object} options
 */
router.setState = function (name, pattern) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var state = _objectSpread(_objectSpread({}, options), {}, {
    name: name,
    pattern: pattern
  });
  this.states.push(state);
  this.__init && this.initState(state);
  return state;
};

/**
 * Remove the state by the name
 *
 * @param {string} name
 */
router.removeState = function (name) {
  for (var i = 0, l = this.states.length; i < l; i++) {
    var state = this.states[i];
    if (state.name == name) {
      this.states.splice(i, 1);
      return;
    }
  }
};

/**
 * Set the url
 *
 * @param {string} url
 */
router.setUrl = function (url) {
  this.hashMode ? this.setHashUrl(url) : this.setHistoryUrl(url);
};

/**
 * Set the url using the history
 *
 * @param url
 */
router.setHistoryUrl = function (url) {
  window.history.pushState(undefined, undefined, url);
};

/**
 * Set the url using the hash
 *
 * @param url
 */
router.setHashUrl = function (url) {
  window.location.hash = '#' + (url || '/');
};

/**
 * Replace the url
 *
 * @param {string} url
 */
router.replaceUrl = function (url) {
  this.hashMode ? this.replaceHashUrl(url) : this.replaceHistoryUrl(url);
};

/**
 * Replace the url using the history
 *
 * @param url
 */
router.replaceHistoryUrl = function (url) {
  window.history.replaceState(undefined, undefined, url);
};

/**
 * Replace the url using the hash
 *
 * @param url
 */
router.replaceHashUrl = function (url) {
  window.history.replaceState(undefined, undefined, '#' + (url || '/'));
};

/**
 * Get the url
 *
 * @returns {string}
 */
router.getUrl = function () {
  return this.hashMode ? this.getHashUrl() : this.getHistoryUrl();
};

/**
 * Get the url using the history
 *
 * @returns {string}
 */
router.getHistoryUrl = function () {
  return window.location.pathname + window.location.search + window.location.hash;
};

/**
 * Get the url using the hash
 *
 * @returns {string}
 */
router.getHashUrl = function () {
  return window.location.hash.replace(/^#/, '');
};

/**
 * Get the query params
 *
 * @returns {object}
 */
router.getUrlQuery = function () {
  return this.hashMode ? this.getHashUrlQuery() : this.getHistoryUrlQuery();
};

/**
 * Get the query params using the history
 *
 * @returns {object}
 */
router.getHistoryUrlQuery = function () {
  return _request_js__WEBPACK_IMPORTED_MODULE_6__["default"].paramsFromQuery(window.location.search.replace(/^\?/, ''));
};

/**
 * Get the query params using the hash
 *
 * @returns {object}
 */
router.getHashUrlQuery = function () {
  return _request_js__WEBPACK_IMPORTED_MODULE_6__["default"].paramsFromQuery(window.location.hash.split('?')[1] || '');
};

/**
 * Create the url
 *
 * @param {string|Object} state
 * @param {object} [params]
 * @param {object} [query]
 * @param {string} [hash]
 * @param {object} [options]
 * @param {boolean} [prepare]
 */
router.createStateUrl = function (state) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var hash = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var prepare = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
  (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(state) !== 'object' && (state = this.getState(state));
  options = _objectSpread({}, options);
  if (prepare) {
    var _this$prepareStateArg2 = this.prepareStateArgs(state, params, query, hash, options);
    params = _this$prepareStateArg2.params;
    query = _this$prepareStateArg2.query;
    hash = _this$prepareStateArg2.hash;
    options = _this$prepareStateArg2.options;
  }
  var url = state.fullPattern.replace(this.__paramRegex, function (m, f, v) {
    return '/' + (params[v] || '');
  });
  url = url.replace(/^\^/, '');
  url = this.splitSlashes(url);
  if (Object.keys(query).length) {
    url += '?' + _request_js__WEBPACK_IMPORTED_MODULE_6__["default"].paramsToQuery(query);
  }
  if (!this.hashMode && hash) {
    url += '#' + hash.replace('#', '');
  }
  return url;
};

/**
 * Prepare the state arguments
 * 
 * @param {string|Object} state
 * @param {object} [params]
 * @param {object} [query]
 * @param {string} [hash]
 * @param {object} [options]
 */
router.prepareStateArgs = function (state) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var hash = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var args = {
    params: params,
    query: query,
    hash: hash,
    options: options
  };
  for (var i = 0; i < 4 ^ 4; i++) {
    var paramsTemp = this.prepareStateParams(state, params, args);
    var queryTemp = this.prepareStateQuery(state, query, args);
    var hashTemp = this.prepareStateHash(state, hash, args);
    var optionsTemp = this.prepareStateOptions(state, options, args);
    if (hashTemp === null) {
      optionsTemp.emptyHash = null;
    } else if (hashTemp === '') {
      optionsTemp.emptyHash = '';
    }
    var newArgs = {
      params: paramsTemp,
      query: queryTemp,
      hash: hashTemp,
      options: optionsTemp
    };
    if (_utils_js__WEBPACK_IMPORTED_MODULE_5__["default"].compare(newArgs, args)) {
      break;
    }
    args = newArgs;
  }
  return args;
};

/**
 * Prepare the state params
 * 
 * @param {string|Object} state
 * @param {object} params
 * @param {object} [args]
 */
router.prepareStateParams = function (state, params, args) {
  (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(state) !== 'object' && (state = this.getState(state));
  var states = state.name.split('.');
  params = Object.assign({}, params);
  for (var i = states.length - 1; i >= 0; i--) {
    var current = states.slice(0, states.length - i).join('.');
    params = this.createStateObjectArgs(params, this.getState(current).params, args);
  }
  return params;
};

/**
 * Prepare the state query
 * 
 * @param {string|Object} state
 * @param {object} query
 * @param {object} [args]
 */
router.prepareStateQuery = function (state, query, args) {
  (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(state) !== 'object' && (state = this.getState(state));
  var states = state.name.split('.');
  query = Object.assign({}, query);
  for (var i = states.length - 1; i >= 0; i--) {
    var current = states.slice(0, states.length - i).join('.');
    query = this.createStateObjectArgs(query, this.getState(current).query, args);
  }
  return query;
};

/**
 * Prepare the state options
 * 
 * @param {string|Object} state
 * @param {object} options
 * @param {object} [args]
 */
router.prepareStateOptions = function (state, options, args) {
  (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(state) !== 'object' && (state = this.getState(state));
  var states = state.name.split('.');
  options = Object.assign({}, options);
  for (var i = states.length - 1; i >= 0; i--) {
    var current = states.slice(0, states.length - i).join('.');
    options = this.createStateObjectArgs(options, this.getState(current).options, args);
  }
  return options;
};

/**
 * Create the state arguments
 * 
 * @param {object} current
 * @param {object} defaults
 * @param {object} [args]
 */
router.createStateObjectArgs = function (current, defaults) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    params: {},
    query: {},
    options: {}
  };
  var all = Object.assign({}, current);
  for (var key in defaults) {
    var val = defaults[key];
    if (all[key] === null) {
      continue;
    }
    if (typeof val == 'function') {
      all[key] = val(args);
    }
    if (all[key] === undefined) {
      all[key] = val;
    }
  }
  for (var _key in all) {
    if (all[_key] === null) {
      delete all[_key];
    }
  }
  return all;
};

/**
 * Prepare the state hash
 * 
 * @param {string|Object} state
 * @param {string} hash
 * @param {object} [args]
 */
router.prepareStateHash = function (state, hash, args) {
  if (hash === null) {
    return hash;
  }
  (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(state) !== 'object' && (state = this.getState(state));
  var states = state.name.split('.');
  for (var i = states.length - 1; i >= 0; i--) {
    var current = states.slice(0, states.length - i).join('.');
    hash = this.createStateHashArgs(hash, this.getState(current).hash, args);
  }
  return hash;
};

/**
 * Create the state hash arguments
 * 
 * @param {string|null} current
 * @param {string|null} defaults
 * @param {object} [args]
 */
router.createStateHashArgs = function (current, defaults) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    params: {},
    query: {}
  };
  if (current === null) {
    return current;
  }
  if (typeof defaults == 'function') {
    return defaults(args);
  }
  if (current === undefined) {
    return defaults;
  }
  return current;
};

/**
 * Remove all unnecessary slashes from the url
 *
 * @param {string} url
 * @returns {string}
 */
router.splitSlashes = function (url) {
  return url.replace(/[/]+/g, '/');
};

/**
 * Get the pattern info
 *
 * @param {string|Object} state
 * @param {string} url
 * @returns {object}
 */
router.getPatternContent = function (state, url) {
  (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(state) !== 'object' && (state = this.getState(state));
  var keys = [];
  var params = {};
  url = url.split('?')[0];
  url = url.split('#')[0];
  var urlPattern = state.fullPattern.replace(this.__paramRegex, function (m, f, v) {
    keys.push(v);
    return '/?([^/]*)';
  });
  urlPattern = urlPattern.replace(/([^^/]+)[/]+$/, '$1');
  var regex = new RegExp(urlPattern, 'g');
  var isIncluded = url.match(regex);
  if (!isIncluded) {
    return null;
  }
  url.replace(regex, function (m) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    args = args.slice(0, args.length - 2);
    for (var i = 0, l = args.length; i < l; i++) {
      var v = args[i];
      v && (params[keys[i]] = v);
    }
  });
  return {
    params: params
  };
};

/**
 * Check the state is active
 *
 * @param {string|Object} state
 * @param {boolean} includes
 * @returns {boolean}
 */
router.isActiveState = function (state) {
  var includes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(state) !== 'object' && (state = this.getState(state));
  var url = router.transition && !router.transition.__finished ? router.transition.url : this.getUrl();
  url = this.splitSlashes('/' + url.split('?')[0] + '/');
  var urlPattern = state.fullPattern.replace(this.__paramRegex, '/?([^/]*)');
  urlPattern = urlPattern.replace(/^\^/, '').replace(/\$$/, '');
  var str = includes ? urlPattern : this.splitSlashes('^/' + urlPattern + '/$');
  var regex = new RegExp(str);
  return regex.test(url);
};

/**
 * Check the current url includes the state
 *
 * @param {string|Object} state
 * @returns {boolean}
 */
router.inActiveState = function (state) {
  return router.isActiveState(state, true);
};

/**
 * Get the route component by the level
 *
 * @param {number} level
 */
router.getRoute = function (level) {
  var _this4 = this;
  var i = 0;
  var find = function find(el) {
    var route = el.child(_this4.__routeSelector);
    if (!route) {
      return null;
    }
    if (i == level) {
      return route;
    }
    i++;
    return find(route);
  };
  return find(_akili_js__WEBPACK_IMPORTED_MODULE_4__["default"].root);
};

/**
 * Get the patterns array info
 *
 * @param {array} arr
 * @param {string} url
 * @returns {object|null}
 */
router.getArrayPatternContent = function (arr, url) {
  for (var i = 0, l = arr.length; i < l; i++) {
    var state = arr[i];
    var content = this.getPatternContent(state, url);
    if (!content) {
      continue;
    }
    return _objectSpread({
      state: state
    }, content);
  }
  return null;
};

/**
 * Get the states by the level
 *
 * @param {number} level
 * @returns {Array}
 */
router.getStatesByLevel = function (level) {
  var states = [];
  for (var i = 0, l = this.states.length; i < l; i++) {
    var state = this.states[i];
    if (state.level < level) {
      continue;
    } else if (state.level > level) {
      break;
    }
    states.push(state);
  }
  return states;
};

/**
 * Reload the state
 * 
 * @see Transition.reload
 */
router.reload = function () {
  var _this$transition;
  if (!this.transition) {
    throw new Error('Not found an active transition to reload the state');
  }
  return (_this$transition = this.transition).reload.apply(_this$transition, arguments);
};

/**
 * Isolate the function
 *
 * @param {function} fn
 * @returns {*}
 */
router.isolate = function (fn) {
  this.__isolated = true;
  var res;
  try {
    res = fn();
  } catch (err) {
    this.__isolated = false;
    throw err;
  }
  this.__isolated = false;
  return res;
};

/**
 * Change the state
 * 
 * @param {object} [options]
 */
router.changeState = function () {
  var _this5 = this;
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (this.__isolated) {
    return Promise.resolve();
  }
  var url = this.getUrl();
  var transition = new Transition(url);
  this.__queue.push(transition);
  return new Promise(function (resolve) {
    var interval = setInterval(function () {
      if (_this5.__queue[0] === transition) {
        clearInterval(interval);
        resolve();
      }
    });
  }).then(function () {
    transition.previous = router.transition || null;
    router.transition = transition;
    window.dispatchEvent(new CustomEvent('state-change', {
      detail: transition
    }));
    var emptyHash = options.emptyHash;
    if (!_this5.__redirects) {
      var docStyle = getComputedStyle(document.documentElement);
      _this5.__info.scrollPos = {
        left: window.scrollX,
        top: window.scrollY
      };
      _this5.__info.docMinHeight = docStyle.minHeight;
      _this5.__info.docMinWidth = docStyle.minWidth;
      document.documentElement.style.minHeight = document.documentElement.offsetHeight + 'px';
      document.documentElement.style.minWidth = document.documentElement.offsetWidth + 'px';
    }
    var params = {};
    var query = _this5.getUrlQuery();
    var hash = _this5.hashMode ? '' : window.location.hash.replace('#', '');
    var level = 0;
    var next = function next(states) {
      if (!states.length) {
        return Promise.resolve();
      }
      var content = _this5.getArrayPatternContent(states, url);
      if (!content) {
        return Promise.resolve();
      }
      var state = content.state;
      transition.setPath({
        state: state,
        component: route
      });
      params = _objectSpread(_objectSpread({}, params), content.params);
      hash = hash || emptyHash;
      var _this5$prepareStateAr = _this5.prepareStateArgs(state, params, query, hash, options);
      params = _this5$prepareStateAr.params;
      query = _this5$prepareStateAr.query;
      hash = _this5$prepareStateAr.hash;
      options = _this5$prepareStateAr.options;
      options.init = _akili_js__WEBPACK_IMPORTED_MODULE_4__["default"].__init === null;
      hash = hash || '';
      var realUrl = _this5.createStateUrl(state, params, query, hash, options, false);
      _this5.isolate(function () {
        return _this5.replaceUrl(realUrl);
      });
      var route = state["abstract"] ? null : _this5.getRoute(level);
      if (!route && !state["abstract"]) {
        throw new Error("Not found route component for state \"".concat(state.name, "\""));
      }
      transition.path.params = params;
      transition.path.query = query;
      transition.path.hash = hash;
      transition.path.url = realUrl;
      transition.path.options = options;
      !state["abstract"] && level++;
      var isDifferent = true;
      if (realUrl != url) {
        isDifferent = transition.isRouteChanged(transition.path);
      }
      var load = isDifferent && options.reload !== false;
      var prevData = transition.previous && transition.previous.path ? transition.previous.path.data : undefined;
      return Promise.resolve(load ? state.handler(transition) : prevData).then(function (data) {
        transition.path.data = data;
        state.title && (document.title = typeof state.title == 'function' ? state.title(transition) : state.title);
        if (transition.__cancelled) {
          return;
        }
        if (state["abstract"]) {
          return;
        }
        var prevRoute = transition.previous && transition.previous.getRoute(state);
        prevRoute && !prevRoute.loaded && (load = true);
        return route.setTransition(transition, load).then(function () {
          return transition.path.loaded = true;
        });
      }).then(function () {
        return next(state.children);
      });
    };
    return next(_this5.getStatesByLevel(0)).then(function () {
      if (!transition.routes.length) {
        if (_this5.__redirects) {
          throw new Error("Wrong router default url \"".concat(_this5.defaultUrl, "\""));
        }
        if (_this5.defaultUrl) {
          if (_this5.defaultUrl == _this5.getUrl()) {
            throw new Error("Not found any routes");
          }
          _this5.isolate(function () {
            return _this5.replaceUrl(_this5.defaultUrl);
          });
          _this5.__redirects++;
          transition.finish();
          return _this5.changeState(options);
        }
        if (_akili_js__WEBPACK_IMPORTED_MODULE_4__["default"].options.debug) {
          // eslint-disable-next-line no-console
          console.warn("Not found a default route. You can pass it in \"router.init(defaultUrl)\" function");
        }
      }
      if (_this5.hashMode || !transition.path || !transition.path.hash) {
        window.scrollTo(_objectSpread({}, options.saveScrollPosition ? _this5.__info.scrollPos : {
          top: 0,
          left: 0
        }));
      }
      document.documentElement.style.minHeight = _this5.__info.docMinHeight;
      document.documentElement.style.minWidth = _this5.__info.docMinWidth;
      _this5.__redirects = 0;
      _this5.__info = {};
      window.dispatchEvent(new CustomEvent('state-changed', {
        detail: transition
      }));
      transition.finish();
      return transition;
    });
  })["catch"](function (err) {
    transition && transition.finish();
    throw err;
  });
};

/**
 * Deinitialize the router
 */
router.deinit = function () {
  window.removeEventListener('popstate', this.__onStateChangeHandler);
  this.__init = false;
};
router.Transition = Transition;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),

/***/ "./node_modules/akili/src/services/store.js":
/*!**************************************************!*\
  !*** ./node_modules/akili/src/services/store.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _akili_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../akili.js */ "./node_modules/akili/src/akili.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./node_modules/akili/src/utils.js");





/**
 * Store allows you to save and share data.
 * 
 * {@link https://akilijs.com/docs/store}
 */
var store = wrap({}, []);
function createProxy(obj, parents) {
  return new Proxy(obj, {
    get: function get(target, key) {
      if (key == '__target') {
        return obj;
      } else if (key == "__keys") {
        return parents;
      } else if (key == '__isProxy') {
        return true;
      }
      return target[key];
    },
    set: function set(target, key, value) {
      var keys = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(parents), [key]);
      var rootKey = keys[0];
      target[key] = wrap(value, keys);
      if (_akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].__disableStoreProxy) {
        return true;
      }
      if (_akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].__isolation) {
        createIsolationObject(parents, key);
        return true;
      }
      var copy = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].copy(store[rootKey], {
        plain: true
      });
      _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].root && _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].root.__storeTriggerByName(rootKey, copy);
      return true;
    },
    deleteProperty: function deleteProperty(target, key) {
      if (_akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].__disableStoreProxy) {
        delete target[key];
        return true;
      }
      var keys = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(parents), [key]);
      var rootKey = keys[0];
      var value = rootKey === key ? undefined : store[rootKey];
      if (_akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].__isolation) {
        createIsolationObject(parents, key);
        delete target[key];
        return true;
      }
      var copy = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].copy(value, {
        plain: true
      });
      _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].root && _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].root.__storeTriggerByName(rootKey, copy);
      delete target[key];
      return true;
    }
  });
}
function createIsolationObject(parents, key) {
  var rootKeys = parents.length ? [parents[0]] : [key];
  var rootKey = rootKeys[0];
  var keys = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(parents), [key]);
  var isolationHash = "store.".concat(rootKey);
  _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].__isolation[isolationHash] = {
    updatedAt: Date.now(),
    rootKey: rootKey,
    rootKeys: rootKeys,
    keys: keys
  };
}
function wrap(value, keys) {
  if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(value) != 'object' || value === null) {
    return value;
  }
  if (!_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isPlainObject(value) && !_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStoreProxy(value) && value !== store) {
    return value;
  }
  var target = value;
  if (value.__isProxy) {
    target = value.__target;
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isStoreProxy(value) || _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].joinBindingKeys(keys) != _akili_js__WEBPACK_IMPORTED_MODULE_2__["default"].joinBindingKeys(value.__keys)) {
      target = _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].copy(target, {
        nested: false
      });
      value = target;
    }
  }
  var targetKeys = Object.keys(value);
  for (var i = 0, l = targetKeys.length; i < l; i++) {
    var k = targetKeys[i];
    var val = target[k];
    target[k] = wrap(val, [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(keys), [k]));
  }
  if (!value.__isProxy) {
    return createProxy(value, keys);
  }
  return value;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

/***/ }),

/***/ "./node_modules/akili/src/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/akili/src/utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _event_emitter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event-emitter.js */ "./node_modules/akili/src/event-emitter.js");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }


/**
 * The object with a lot of useful functions
 * 
 * {@link https://akilijs.com/docs/utils}
 */
var utils = {};

/**
 * Create the class attribute from the object
 *
 * @example
 * // returns "red active"
 * utils.class({red: true, active: true, green: false});
 *
 * @param {object} obj
 * @returns {string}
 */
utils["class"] = function (obj) {
  if (!obj || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(obj) !== 'object') {
    return '';
  }
  var classes = [];
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    var k = keys[i];
    var val = obj[k];
    val && classes.push(k);
  }
  return classes.join(' ');
};

/**
 * Create the style attribute from the object
 *
 * @example
 * // returns "color:red;width:10px"
 * utils.style({color: "red", background: false, width: "10px"});
 *
 * @param {object} obj
 * @returns {string}
 */
utils.style = function (obj) {
  if (!obj || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(obj) !== 'object') {
    return '';
  }
  var styles = [];
  var keys = Object.keys(obj);
  for (var i = 0, l = keys.length; i < l; i++) {
    var k = keys[i];
    var val = obj[k];
    val && styles.push("".concat(this.toDashCase(k), ":").concat(val));
  }
  return styles.join(';');
};

/**
 * Split the string extended
 * 
 * @example
 * // returns ["Hello", "World"]
 * utils.split("Hello World", " ");
 * 
 * @example
 * // returns ['x = 5', ' y = "1;2;3"']
 * utils.split('x = 5; y = "1;2;3"', ";", ['"']);
 * 
 * @param {string|RegExp} str 
 * @param {string} [del]
 * @param {string[]} [exclude] 
 */
utils.split = function (str) {
  var del = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var exps = [];
  var last = '';
  if (!del) {
    return str.split('');
  } else if (del instanceof RegExp) {
    return str.split(del);
  } else if (str.indexOf(del) == -1) {
    last = str;
  } else {
    var arr = str.split('');
    var open = '';
    for (var i = 0, l = arr.length; i < l; i++) {
      var val = arr[i];
      var index = exclude.indexOf(val);
      if (index > -1 && (!open || open == val)) {
        !open ? open = exclude[index] : open = '';
      }
      if (val == del && !open) {
        exps.push(last);
        last = '';
        continue;
      }
      last += val;
    }
  }
  last && exps.push(last);
  return exps;
};

/**
 * Filter the array
 *
 * @example
 * // returns [1, 11]
 * utils.filter([1, 2, 3, 11], '1');
 *
 * @example
 * // returns [{x: 1}, {x: 11}]
 * utils.filter([{x: 1}, {x: 2}, {x: 3}, {x: 11}], '1', 'x');
 * 
 * @example
 * // returns [{x: 1}, {x: 11}]
 * utils.filter([{x: 1}, {x: 2}, {x: 3}, {x: 11}], '1', ['x']);
 * 
 * @example
 * // returns [{x: 1}, {x: 11}]
 * utils.filter([{x: 1}, {x: 2}, {x: 3}, {x: 11}], '1', [['x']]);
 * 
 * @example
 * // returns [{x: {y: 1}}]
 * utils.filter([{x: {y: 1}}, {x: {y: 2}}], '1', [['x', 'y']]);
 * 
 * @example
 * // returns [{x:1, y: 2}, {x: 2, y:1}] 
 * utils.filter([{x: 1, y: 2}, {x: 3, y: 3}, {x: 2, y: 1}], '1', ['x', 'y']);
 * 
 * @example
 * // returns [{x:1, y: 2}, {x: 2, y:1}]
 * utils.filter([{x: 1, y: 2}, {x: 3, y: 3}, {x: 2, y: 1}], '1', [['x'], ['y']]);
 *
 * @param {Array} arr
 * @param {string|RegExp|function} handler - type of the filtering
 * @param {string[]|string} [keys] - filter by the keys
 * @returns {Array} 
 */
utils.filter = function (arr, handler) {
  var _this = this;
  var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var res = [];
  if (keys && !Array.isArray(keys)) {
    keys = [keys];
  }
  if (typeof handler != 'function') {
    var str = handler ? (handler + '').toLowerCase() : '';
    handler = function handler(val) {
      return (val ? (val + '').toLowerCase() : '').match(_this.escapeForRegExp(str));
    };
  }
  for (var i = 0, l = arr.length; i < l; i++) {
    var item = arr[i];
    var filtered = false;
    if (!keys && handler(item)) {
      filtered = true;
    } else if (keys) {
      for (var k = 0, c = keys.length; k < c; k++) {
        var key = keys[k];
        key = Array.isArray(key) ? key : [key];
        var val = key ? this.getPropertyByKeys(key, item) : item;
        if (handler(val)) {
          filtered = true;
          continue;
        }
      }
    }
    filtered && res.push(item);
  }
  return res;
};

/**
 * Sort the array
 *
 * @example
 * // returns [1, 2, 3]
 * utils.sort([3, 2, 1], true);
 *
 * @example
 * // returns [3, 2, 1]
 * utils.sort([1, 2, 3], false);
 *
 * @example
 * // returns [{x: 1}, {x: 2}, {x: 3}]
 * utils.sort([{x: 3}, {x: 2}, {x: 1}], [['x']], [true]);
 * utils.sort([{x: 3}, {x: 2}, {x: 1}], ['x'], true);
 * utils.sort([{x: 3}, {x: 2}, {x: 1}], 'x');
 *
 * @example
 * // returns [{x: 3}, {x: 2}, {x: 1}]
 * utils.sort([{x: 1}, {x: 2}, {x: 3}], [['x']], [false]);
 * utils.sort([{x: 1}, {x: 2}, {x: 3}], ['x'], false);
 * utils.sort([{x: 1}, {x: 2}, {x: 3}], 'x', false);
 *
 * @example
 * // returns [{x: 1, y: 3}, {x: 2, y: 1}, {x:2, y: 2}]
 * utils.sort([{x: 2, y: 2}, {x: 2, y: 1}, {x: 2, y: 3}], [['x'], ['y']], [true, true]);
 * 
 * @example
 * // returns [{x: {y: 1}}, {x: {y: 2}}]
 * utils.sort([{x: {y: 2}}, {x: {y: 1}}], [['x', 'y']], [true]);
 *
 * @param {Array} arr
 * @param {boolean|Array[]|string[]|string} [keys]
 * @param {boolean|boolean[]} [order] - reverse or not
 * @returns {Array}
 */
utils.sort = function (arr) {
  var _this2 = this;
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  arr = arr.slice();
  if (keys === true) {
    keys = [];
    order = [true];
  } else if (keys === false) {
    keys = [];
    order = [false];
  }
  if (!Array.isArray(keys)) {
    keys = [keys];
  }
  if (!Array.isArray(order)) {
    order = [order];
  }
  var l = keys.length;
  arr.sort(function (a, b) {
    var i = 0;
    var check = function check(a, b) {
      var reverse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (a instanceof Date) {
        a = a.getTime();
      }
      if (b instanceof Date) {
        b = b.getTime();
      }
      if (a > b) {
        return reverse ? -1 : 1;
      } else if (a < b) {
        return reverse ? 1 : -1;
      }
      return 0;
    };
    var next = function next() {
      if (i >= l) {
        return 0;
      }
      var key = keys[i];
      if (!Array.isArray(key)) {
        key = [key];
      }
      var aV = _this2.getPropertyByKeys(key, a);
      var bV = _this2.getPropertyByKeys(key, b);
      var res = check(aV, bV, order[i] === false);
      if (res !== 0) {
        return res;
      }
      i++;
      return next();
    };
    if (!l) {
      return check(a, b, order[i] === false);
    }
    return next();
  });
  return arr;
};

/**
 * Return a new object with the specified keys
 * 
 * @example
 * // returns {x: 1, z: 1}
 * utils.includeKeys({x: 1, y: 1, z: 1}, ['x', 'z']);
 * 
 * @param {object} obj
 * @param {string[]} keys
 */
utils.includeKeys = function (obj, keys) {
  var newObj = {};
  var objKeys = Object.keys(obj);
  for (var i = 0, l = objKeys.length; i < l; i++) {
    var key = objKeys[i];
    if (keys.indexOf(key) != -1) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/**
 * Return a new object without the specified keys
 * 
 * @example
 * // returns {x: 1, z: 1}
 * utils.includeKeys({x: 1, y: 1, z: 1}, ['y']);
 * 
 * @param {object} obj
 * @param {string[]} keys
 */
utils.excludeKeys = function (obj, keys) {
  var newObj = {};
  var objKeys = Object.keys(obj);
  for (var i = 0, l = objKeys.length; i < l; i++) {
    var key = objKeys[i];
    if (keys.indexOf(key) == -1) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/**
 * Check the value is the scope proxy object
 *
 * @param {*} val
 * @returns {boolean}
 */
utils.isScopeProxy = function (val) {
  return !!(val && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(val) == 'object' && val.__isProxy);
};

/**
 * Check the value is the store proxy object
 *
 * @param {*} val
 * @returns {boolean}
 */
utils.isStoreProxy = function (val) {
  return !!(val && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(val) == 'object' && val.__isProxy && !val.__component);
};

/**
 * Check the value is a plain object
 *
 * @param {*} obj
 * @returns {boolean}
 */
utils.isPlainObject = function (obj) {
  return !!(obj && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(obj) == 'object' && (obj.constructor == Object || obj.constructor == Array));
};

/**
 * Copy the value
 *
 * @param {*} value
 * @param {boolean} [options] 
 * @returns {*}
 */
utils.copy = function (value) {
  var _this3 = this;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(value) != 'object' || !value) {
    return value;
  }
  options = _objectSpread({
    nested: true,
    enumerable: true,
    plain: false
  }, options);
  var next = function next(obj) {
    obj = _this3.isScopeProxy(obj) || _this3.isStoreProxy(obj) ? obj.__target : obj;
    if (options.plain && !_this3.isPlainObject(obj)) {
      return obj;
    }
    var keys = !options.enumerable ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    var newObj = Array.isArray(obj) ? [] : {};
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      var val = obj[key];
      val = val && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(val) == 'object' && options.nested ? next(val) : val;
      if (!Object.prototype.propertyIsEnumerable.call(obj, key)) {
        Object.defineProperty(newObj, key, _objectSpread(_objectSpread({}, Object.getOwnPropertyDescriptor(obj, key)), {}, {
          value: val
        }));
        continue;
      }
      newObj[key] = val;
    }
    return newObj;
  };
  return next(value);
};

/**
 * Change the attribute value to the appropriate format
 *
 * @param {*} value
 * @returns {*}
 */
utils.makeAttributeValue = function (value) {
  if (value === false || value === null || value === undefined) {
    return '';
  }
  if (value instanceof _event_emitter_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
    return '[object Event]';
  }
  if (typeof value == 'function') {
    return '[object Function]';
  }
  if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(value) == 'object') {
    return Object.prototype.toString.call(value);
  }
  return value + '';
};

/**
 * Compare two values
 *
 * @param {*} a
 * @param {*} b
 * @param {object} [options]
 * @returns {boolean}
 */
utils.compare = function (a, b) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  } else if (typeof a == 'function' && typeof b == 'function') {
    return a.toString() === b.toString();
  } else if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(a) == 'object' && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(b) == 'object') {
    if (a === null || b === null) {
      return a === b;
    }
    options = _objectSpread({
      enumerable: true,
      ignoreUndefined: true
    }, options);
    var clearUndefined = function clearUndefined(val) {
      var obj = Array.isArray(val) ? [] : {};
      var keys = !options.enumerable ? Object.getOwnPropertyNames() : Object.keys(val);
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        val[key] !== undefined && (obj[key] = val[key]);
      }
      return obj;
    };
    if (options.ignoreUndefined) {
      a = clearUndefined(a);
      b = clearUndefined(b);
    }
    var aKeys = !options.enumerable ? Object.getOwnPropertyNames() : Object.keys(a);
    var bKeys = !options.enumerable ? Object.getOwnPropertyNames() : Object.keys(b);
    if (aKeys.length != bKeys.length) {
      return false;
    }
    a = this.isScopeProxy(a) ? a.__target : a;
    b = this.isScopeProxy(b) ? b.__target : b;
    for (var i = 0, l = aKeys.length; i < l; i++) {
      var key = aKeys[i];
      if (!this.compare(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a === b;
};

/**
 * Escape the string to pass in RegExp
 * 
 * @param {string} str
 * @returns {string}
 */
utils.escapeForRegExp = function (str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Create a variable hash
 * 
 * @param {*} source
 * @param {object} [options]
 * @param {boolean} [options.ignoreScopeHash]
 * @returns {string}
 */
utils.createHash = function (source) {
  var _this4 = this;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!options.ignoreScopeHash && this.isScopeProxy(source) && source.__hash) {
    return source.__hash;
  }
  var loop = function loop(obj) {
    if (!obj || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(obj) != 'object') {
      return String(obj);
    }
    if (_this4.isScopeProxy(obj)) {
      if (obj !== source && obj.__hash) {
        return obj.__hash;
      }
      obj = obj.__target;
    }
    var keys = Object.keys(obj);
    var length = keys.length;
    var str = '';
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      str += "\"".concat(key, "\"::\"").concat(loop(obj[key]), "\";;");
    }
    return str;
  };
  source = loop(source);
  var hash = 0;
  for (var i = 0; i < source.length; i++) {
    var _char = source.charCodeAt(i);
    hash = (hash << 5) - hash + _char;
    hash = hash & hash;
  }
  return hash + '';
};

/**
 * Encode the html entities
 *
 * @example
 * // returns "you &amp me"
 * utils.encodeHtmlEntities('you & me');
 *
 * @param {string} html
 * @returns {string}
 */
utils.encodeHtmlEntities = function (html) {
  var el = document.createElement("div");
  var value;
  el.textContent = html;
  value = el.innerHTML;
  el.remove();
  el = null;
  return value;
};

/**
 * Decode the html entities
 *
 * @example
 * // returns "you & me"
 * utils.decodeHtmlEntities('you &amp me');
 *
 * @param {string} html
 * @returns {string}
 */
utils.decodeHtmlEntities = function (html) {
  var el = document.createElement("textarea");
  var value;
  el.innerHTML = html;
  value = el.value;
  el.remove();
  el = null;
  return value;
};

/**
 * Convert the string from a dash to a camel case
 *
 * @param {string} str
 * @returns {string}
 */
utils.toCamelCase = function (str) {
  return str.replace(/\W+(.)/g, function (m, c) {
    return c.toUpperCase();
  });
};

/**
 * Capitalize the string
 *
 * @param {string} str
 * @returns {string}
 */
utils.capitalize = function (str) {
  return str[0].toUpperCase() + str.slice(1);
};

/**
 * Convert the string from a camel to a dash case
 *
 * @param {string} str
 * @returns {string}
 */
utils.toDashCase = function (str) {
  return str.replace(/([A-Z])/g, function (m, c) {
    return "-".concat(c.toLowerCase());
  });
};

/**
 * Get the nested object property by array keys
 *
 * @example
 * // returns 5
 * utils.getPropertyByKeys(['x', 'y'], {x: {y: 5}});
 *
 * @param {string[]} keys
 * @param {object} object
 * @param {object} [options]
 * @param {boolean|array} [options.closest]
 * @returns {*}
 */
utils.getPropertyByKeys = function (keys, object) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var breakCode = 'ERR_ARRAY_REDUCE_BREAK';
  var current;
  var length = keys.length;
  var i = 0;
  var endKeys = Array.isArray(options.closest) ? options.closest : [];
  var breakReducer = function breakReducer() {
    var err = new Error('Break the reducer');
    err.code = breakCode;
    throw err;
  };
  var fn = function fn(o, k) {
    i++;
    if (!o || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(o) != 'object') {
      breakReducer();
    }
    if (o[k] === undefined && options.closest) {
      current = endKeys.length ? o : undefined;
      breakReducer();
    }
    endKeys.push(k);
    if (o[k] === undefined) {
      return {};
    }
    i == length && (current = o[k]);
    return o[k];
  };
  try {
    keys.reduce(fn, object);
  } catch (err) {
    if (err.code != breakCode) {
      throw err;
    }
  }
  return current;
};

/**
 * Check the object nested property existence
 *
 * @example
 * // returns true
 * utils.hasPropertyByKeys(['x', 'y'], {x: {y: 5}});
 *
 * @param {string[]} keys
 * @param {object} object
 * @returns {boolean}
 */
utils.hasPropertyByKeys = function (keys, object) {
  var has = false;
  var length = keys.length;
  var i = 0;
  keys.reduce(function (o, k) {
    i++;
    if (!o || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(o) != 'object') {
      return !!o;
    }
    if (!Object.prototype.hasOwnProperty.call(o, k)) {
      return {};
    }
    i == length && (has = Object.prototype.hasOwnProperty.call(o, k));
    return o[k];
  }, object);
  return has;
};

/**
 * Check the object nested enumerable property existence
 *
 * @example
 * // returns true
 * utils.hasEnumerablePropertyByKeys(['x', 'y'], {x: {y: 5}});
 *
 * @param {string[]} keys
 * @param {object} object
 * @returns {boolean}
 */
utils.hasEnumerablePropertyByKeys = function (keys, object) {
  var has = false;
  var length = keys.length;
  var i = 0;
  keys.reduce(function (o, k) {
    i++;
    if (!o || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(o) != 'object') {
      return !!o;
    }
    if (!Object.prototype.propertyIsEnumerable.call(o, k)) {
      return {};
    }
    i == length && (has = Object.prototype.hasOwnProperty.call(o, k));
    return o[k];
  }, object);
  return has;
};

/**
 * Set the object nested property value
 *
 * @example
 * // returns {y: 6}
 * utils.setPropertyByKeys(['x', 'y'], {x: {y: 5}}, (last, val) => last? 6: (val || {}));
 *
 * @param {string[]} keys
 * @param {object} object
 * @param {function} fn
 * @returns {*}
 */
utils.setPropertyByKeys = function (keys, object, fn) {
  var current = undefined;
  var length = keys.length;
  var i = 0;
  keys.reduce(function (o, k) {
    i++;
    if (!o || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(o) != 'object') {
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(o, k)) {
      o[k] = undefined;
    }
    o[k] = fn(i == length, o[k]);
    current = o;
    return o[k];
  }, object);
  return current;
};

/**
 * Delete the property from the object
 * You can cancel the deletion returning false in the callback function
 *
 * @example
 * // returns 5
 * utils.deletePropertyByKeys(['x', 'y'], {x: {y: 5}});
 * @example
 * // returns 5
 * utils.deletePropertyByKeys(['x', 'y'], {x: {y: 5}}, val => val != 5);
 *
 * @param {string[]} keys
 * @param {object} object
 * @param {function} [fn]
 * @returns {*}
 */
utils.deletePropertyByKeys = function (keys, object, fn) {
  var length = keys.length;
  var value;
  var i = 0;
  keys.reduce(function (o, k) {
    i++;
    if (!o || (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(o) != 'object') {
      return;
    }
    if (!Object.prototype.hasOwnProperty.call(o, k)) {
      return {};
    }
    if (i == length) {
      value = o[k];
      (!fn || fn(value)) && delete o[k];
      return value;
    }
    return o[k];
  }, object);
  return value;
};

/**
 * Get the enumerable property target object
 *
 * @param {object} target
 * @param {string[]} keys
 * @returns {object}
 */

utils.getEnumerablePropertyTarget = function (target, keys) {
  var _this5 = this;
  var check = function check(obj) {
    if (_this5.hasEnumerablePropertyByKeys(keys, obj)) {
      return obj;
    }
    var proto = Object.getPrototypeOf(obj);
    if (!proto) {
      return null;
    }
    return check(proto);
  };
  return check(target);
};

/**
 * Get the own property target object
 *
 * @param {object} target
 * @param {string[]} keys
 * @returns {object}
 */
utils.getOwnPropertyTarget = function (target, keys) {
  var _this6 = this;
  var check = function check(obj) {
    if (_this6.hasPropertyByKeys(keys, obj)) {
      return obj;
    }
    var proto = Object.getPrototypeOf(obj);
    if (!proto) {
      return null;
    }
    return check(proto);
  };
  return check(target);
};

/**
 * Generate a random string
 *
 * @param {number} length
 * @param {function} fn
 * @returns {*}
 */
utils.createRandomString = function () {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var str = Math.random().toString(36).substring(2, length + 2);
  var now = Date.now();
  var val = '';
  for (var i = 0, l = str.length; i < l; i++) {
    if (!(now % i)) {
      val += str[i].toUpperCase();
    } else {
      val += str[i];
    }
  }
  if (fn && fn(val)) {
    return this.createRandomString(length, fn);
  }
  return val;
};

/**
 * Create a function with the debounce
 *
 * @param {function} fn
 * @param {number} delay
 * @returns {fn}
 */
utils.debounce = function (fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var wrapper = function wrapper() {
    clearTimeout(fn.__debounceTimeout);
    fn.__debounceTimeout = setTimeout(function () {
      fn();
      wrapper.removeDebounce();
    }, delay);
  };
  wrapper.removeDebounce = function () {
    clearTimeout(fn.__debounceTimeout);
    delete fn.__debounceTimeout;
  };
  return wrapper;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (utils);

/***/ }),

/***/ "./src/browser/face/client.js":
/*!************************************!*\
  !*** ./src/browser/face/client.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../../dist/client/museria.client.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());

var client = new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../../dist/client/museria.client.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (client);

/***/ }),

/***/ "./src/browser/face/controllers/app/app.js":
/*!*************************************************!*\
  !*** ./src/browser/face/controllers/app/app.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _app_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.scss */ "./src/browser/face/controllers/app/app.scss");
/* harmony import */ var akili__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! akili */ "./node_modules/akili/src/akili.js");
/* harmony import */ var akili_src_services_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! akili/src/services/router */ "./node_modules/akili/src/services/router.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../client */ "./src/browser/face/client.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var App = /*#__PURE__*/function (_Akili$Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(App, _Akili$Component);
  var _super = _createSuper(App);
  function App() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, App);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(App, [{
    key: "created",
    value: function created() {
      this.captchaWidth = 240;
      this.findingSongsLimit = 10;
      this.songsCountInterval = 15 * 1000;
      this.songsCountIntervalObj = null;
      this.scope.songsCount = 0;
      this.scope.searchInputValue = this.transition.query.f;
      this.scope.showCaptcha = false;
      this.scope.isUploading = false;
      this.scope.isFinding = false;
      this.scope.searchInputFocus = true;
      this.scope.isGettingApprovalInfo = false;
      this.scope.uploadFormFails = {
        cover: false,
        title: false,
        captcha: false
      };
      this.scope.findSongs = this.findSongs.bind(this);
      this.scope.chooseSong = this.chooseSong.bind(this);
      this.scope.prepareAudio = this.prepareAudio.bind(this);
      this.scope.prepareCover = this.prepareCover.bind(this);
      this.scope.removeCover = this.removeCover.bind(this);
      this.scope.uploadSong = this.uploadSong.bind(this);
      this.scope.setFindingValue = this.setFindingValue.bind(this);
      this.scope.createApprovalInfo = this.createApprovalInfo.bind(this);
      this.scope.uploadSongAction = this.uploadSongAction.bind(this);
      this.scope.resetSearchEvent = this.resetSearchEvent.bind(this);
      this.scope.resetUploadEvent = this.resetUploadEvent.bind(this);
      this.scope.checkUploadSongTitle = this.checkUploadSongTitle.bind(this);
      this.resetSearchEvent();
      this.resetUploadEvent();
      this.resetSongUploadInfo();
    }
  }, {
    key: "compiled",
    value: function () {
      var _compiled = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = this.scope.searchInputValue;
              if (!_context.t0) {
                _context.next = 4;
                break;
              }
              _context.next = 4;
              return this.findSongs();
            case 4:
              _context.next = 6;
              return this.enableSongsCountCounter();
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function compiled() {
        return _compiled.apply(this, arguments);
      }
      return compiled;
    }()
  }, {
    key: "removed",
    value: function removed() {
      clearInterval(this.songsCountIntervalObj);
    }
  }, {
    key: "resetSearchEvent",
    value: function resetSearchEvent() {
      this.scope.searchEvent = {
        status: '',
        message: '',
        meta: {}
      };
    }
  }, {
    key: "resetUploadEvent",
    value: function resetUploadEvent() {
      this.scope.uploadEvent = {
        status: '',
        message: ''
      };
    }
  }, {
    key: "resetSongUploadInfo",
    value: function resetSongUploadInfo() {
      this.scope.isUploading = false;
      this.scope.songUploadInfo = {
        title: '',
        сover: '',
        file: null,
        coverFile: null,
        controlled: false,
        fileChanged: false,
        priority: '1',
        approvalInfo: {}
      };
    }
  }, {
    key: "enableSongsCountCounter",
    value: function () {
      var _enableSongsCountCounter = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee2() {
        var _this = this;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              this.songsCountIntervalObj = setInterval(function () {
                return _this.setSongsCount();
              }, this.songsCountInterval);
              _context2.next = 3;
              return this.setSongsCount();
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function enableSongsCountCounter() {
        return _enableSongsCountCounter.apply(this, arguments);
      }
      return enableSongsCountCounter;
    }()
  }, {
    key: "setSongsCount",
    value: function () {
      var _setSongsCount = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _client__WEBPACK_IMPORTED_MODULE_11__["default"].getNetworkFilesCount();
            case 2:
              this.scope.songsCount = _context3.sent;
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function setSongsCount() {
        return _setSongsCount.apply(this, arguments);
      }
      return setSongsCount;
    }()
  }, {
    key: "setFindingValue",
    value: function setFindingValue(val) {
      this.scope.searchInputValue = val;
      akili_src_services_router__WEBPACK_IMPORTED_MODULE_10__["default"].reload({}, {
        f: this.scope.searchInputValue || null
      }, undefined, {
        reload: false,
        saveScrollPosition: true
      });
    }
  }, {
    key: "chooseSong",
    value: function chooseSong() {
      this.el.querySelector('#audio-file').value = null;
      this.resetSongUploadInfo();
      this.el.querySelector('#audio-file').click();
    }
  }, {
    key: "checkUploadSongTitle",
    value: function checkUploadSongTitle() {
      this.scope.uploadFormFails.title = false;
      if (!_client__WEBPACK_IMPORTED_MODULE_11__["default"].constructor.utils.isSongTitle(this.scope.songUploadInfo.title)) {
        this.scope.uploadFormFails.title = true;
      }
    }
  }, {
    key: "findSongs",
    value: function () {
      var _findSongs = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee4() {
        var _this2 = this;
        var title, timeout, songs;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              title = this.scope.searchInputValue;
              if (title) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return");
            case 3:
              this.findingRequestController && this.findingRequestController.abort();
              this.findingRequestController = new AbortController();
              timeout = setTimeout(function () {
                return _this2.scope.isFinding = true;
              }, 100);
              _context4.prev = 6;
              _context4.next = 9;
              return _client__WEBPACK_IMPORTED_MODULE_11__["default"].findSongs(title, {
                limit: this.findingSongsLimit,
                signal: this.findingRequestController.signal
              });
            case 9:
              songs = _context4.sent;
              clearTimeout(timeout);
              this.findingRequestController = null;
              this.scope.isFinding = false;
              this.scope.searchEvent.status = 'info';
              this.scope.searchEvent.message = 'No related songs found';
              if (songs.length) {
                this.scope.searchEvent.status = 'success';
                this.scope.searchEvent.message = '';
                this.scope.searchEvent.meta = {
                  songs: songs
                };
              }
              _context4.next = 26;
              break;
            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](6);
              clearTimeout(timeout);
              this.findingRequestController = null;
              this.scope.isFinding = false;
              if (_context4.t0.code) {
                _context4.next = 25;
                break;
              }
              throw _context4.t0;
            case 25:
              if (_context4.t0.code != 20) {
                this.scope.searchEvent.status = 'danger';
                this.scope.searchEvent.message = _context4.t0.message;
              }
            case 26:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[6, 18]]);
      }));
      function findSongs() {
        return _findSongs.apply(this, arguments);
      }
      return findSongs;
    }()
  }, {
    key: "prepareAudio",
    value: function () {
      var _prepareAudio = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee5(file) {
        var tags, coverFile;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (file) {
                _context5.next = 2;
                break;
              }
              return _context5.abrupt("return");
            case 2:
              _context5.next = 4;
              return _client__WEBPACK_IMPORTED_MODULE_11__["default"].constructor.utils.getSongTags(file);
            case 4:
              tags = _context5.sent;
              this.resetUploadEvent();
              this.scope.songUploadInfo.file = file;
              this.scope.songUploadInfo.title = tags.fullTitle;
              if (tags.APIC) {
                coverFile = new Blob([tags.APIC]);
                this.scope.songUploadInfo.cover = URL.createObjectURL(coverFile);
                this.scope.songUploadInfo.coverFile = coverFile;
              }
              this.checkUploadSongTitle();
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function prepareAudio(_x) {
        return _prepareAudio.apply(this, arguments);
      }
      return prepareAudio;
    }()
  }, {
    key: "prepareCover",
    value: function () {
      var _prepareCover = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee6(file) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (file) {
                _context6.next = 2;
                break;
              }
              return _context6.abrupt("return");
            case 2:
              this.scope.songUploadInfo.coverFile = file;
              this.scope.songUploadInfo.cover = URL.createObjectURL(file);
              this.scope.songUploadInfo.fileChanged = true;
            case 5:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function prepareCover(_x2) {
        return _prepareCover.apply(this, arguments);
      }
      return prepareCover;
    }()
  }, {
    key: "removeCover",
    value: function () {
      var _removeCover = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee7() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              this.resetCover();
              this.scope.songUploadInfo.fileChanged = true;
            case 2:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function removeCover() {
        return _removeCover.apply(this, arguments);
      }
      return removeCover;
    }()
  }, {
    key: "resetCover",
    value: function () {
      var _resetCover = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee8() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              this.scope.uploadFormFails.cover = '';
              this.scope.songUploadInfo.cover = '';
              this.scope.songUploadInfo.coverFile = null;
              this.scope.uploadFormFails.cover && URL.revokeObjectURL(this.scope.uploadFormFails.cover);
            case 4:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function resetCover() {
        return _resetCover.apply(this, arguments);
      }
      return resetCover;
    }()
  }, {
    key: "uploadSong",
    value: function () {
      var _uploadSong = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function () {
        var _this3 = this;
        var failed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee9() {
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                if (_this3.scope.songUploadInfo.controlled) {
                  _context9.next = 4;
                  break;
                }
                _context9.next = 3;
                return _this3.uploadSongAction();
              case 3:
                return _context9.abrupt("return", _context9.sent);
              case 4:
                _this3.scope.isUploading = true;
                _context9.next = 7;
                return _this3.createApprovalInfo(failed);
              case 7:
                _this3.scope.isUploading = false;
              case 8:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
        })();
      });
      function uploadSong() {
        return _uploadSong.apply(this, arguments);
      }
      return uploadSong;
    }()
  }, {
    key: "createApprovalInfo",
    value: function () {
      var _createApprovalInfo = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee10(failed) {
        var info;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              this.scope.isGettingApprovalInfo = true;
              _context10.prev = 1;
              info = {
                captchaWidth: this.captchaWidth
              };
              _context10.next = 5;
              return _client__WEBPACK_IMPORTED_MODULE_11__["default"].getApprovalQuestion('addSong', info);
            case 5:
              this.scope.songUploadInfo.approvalInfo = _context10.sent;
              this.scope.songUploadInfo.approvalInfo.answer = '';
              this.scope.showCaptcha = true;
              _context10.next = 13;
              break;
            case 10:
              _context10.prev = 10;
              _context10.t0 = _context10["catch"](1);
              this.onUploadError(_context10.t0);
            case 13:
              this.scope.isGettingApprovalInfo = false;
              !failed && (this.scope.uploadFormFails.captcha = false);
            case 15:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this, [[1, 10]]);
      }));
      function createApprovalInfo(_x3) {
        return _createApprovalInfo.apply(this, arguments);
      }
      return createApprovalInfo;
    }()
  }, {
    key: "uploadSongAction",
    value: function () {
      var _uploadSongAction = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee11() {
        var captchaErrors, tags, controlled, priority, approvalInfo;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              captchaErrors = ['ERR_SPREADABLE_WRONG_APPROVAL_ANSWER', 'ERR_SPREADABLE_NOT_ENOUGH_APPROVER_DECISIONS'];
              if (!this.scope.songUploadInfo.fileChanged) {
                _context11.next = 10;
                break;
              }
              _context11.next = 4;
              return _client__WEBPACK_IMPORTED_MODULE_11__["default"].constructor.utils.getSongTags(this.scope.songUploadInfo.file);
            case 4:
              tags = _context11.sent;
              tags.fullTitle = this.scope.songUploadInfo.title;
              if (this.scope.songUploadInfo.coverFile) {
                tags.APIC = this.scope.songUploadInfo.coverFile;
              } else {
                delete tags.APIC;
              }
              _context11.next = 9;
              return _client__WEBPACK_IMPORTED_MODULE_11__["default"].constructor.utils.setSongTags(this.scope.songUploadInfo.file, tags);
            case 9:
              this.scope.songUploadInfo.file = _context11.sent;
            case 10:
              this.scope.songUploadInfo.fileChanged = false;
              controlled = this.scope.songUploadInfo.controlled;
              priority = controlled ? parseInt(this.scope.songUploadInfo.priority) : 0;
              approvalInfo = controlled ? this.scope.songUploadInfo.approvalInfo : null;
              this.scope.isUploading = true;
              _context11.prev = 15;
              _context11.next = 18;
              return _client__WEBPACK_IMPORTED_MODULE_11__["default"].addSong(this.scope.songUploadInfo.file, {
                controlled: controlled,
                priority: priority,
                approvalInfo: approvalInfo
              });
            case 18:
              this.onUploadSuccess();
              _context11.next = 30;
              break;
            case 21:
              _context11.prev = 21;
              _context11.t0 = _context11["catch"](15);
              if (!captchaErrors.includes(_context11.t0.code)) {
                _context11.next = 29;
                break;
              }
              this.scope.uploadFormFails.captcha = true;
              this.scope.isUploading = false;
              _context11.next = 28;
              return this.uploadSong(true);
            case 28:
              return _context11.abrupt("return", _context11.sent);
            case 29:
              this.onUploadError(_context11.t0);
            case 30:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this, [[15, 21]]);
      }));
      function uploadSongAction() {
        return _uploadSongAction.apply(this, arguments);
      }
      return uploadSongAction;
    }()
  }, {
    key: "onUploadSuccess",
    value: function onUploadSuccess() {
      this.scope.showCaptcha = false;
      this.scope.uploadFormFails.captcha = false;
      this.scope.uploadEvent.status = 'success';
      this.scope.uploadEvent.message = 'Song has been uploaded';
      this.scope.isUploading = false;
      this.el.querySelector('#audio-file').value = null;
      this.resetSongUploadInfo();
    }
  }, {
    key: "onUploadError",
    value: function onUploadError(err) {
      //eslint-disable-next-line no-console
      console.error(err.stack);
      this.scope.showCaptcha = false;
      this.scope.uploadEvent.status = 'danger';
      this.scope.uploadEvent.message = err.message;
      this.scope.isUploading = false;
    }
  }], [{
    key: "define",
    value: function define() {
      akili__WEBPACK_IMPORTED_MODULE_9__["default"].component('app', this);
      akili_src_services_router__WEBPACK_IMPORTED_MODULE_10__["default"].add('app', '^/app', {
        component: this,
        title: 'Museria - decentralized music storage'
      });
    }
  }]);
  return App;
}(akili__WEBPACK_IMPORTED_MODULE_9__["default"].Component);
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(App, "template", __webpack_require__(/*! ./app.html */ "./src/browser/face/controllers/app/app.html"));


/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "./node_modules/util/util.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/assert/build/assert.js")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(/*! object-keys */ "./node_modules/object-keys/index.js");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = __webpack_require__(/*! has-property-descriptors */ "./node_modules/has-property-descriptors/index.js")();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ "./src/browser/face/controllers/app/img/logo.svg":
/*!*******************************************************!*\
  !*** ./src/browser/face/controllers/app/img/logo.svg ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "logo.svg";

/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(/*! is-callable */ "./node_modules/is-callable/index.js");

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

try {
	null.error; // eslint-disable-line no-unused-expressions
} catch (e) {
	// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
	var errorProto = getProto(getProto(e));
	INTRINSICS['%Error.prototype%'] = errorProto;
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/gopd/index.js":
/*!************************************!*\
  !*** ./node_modules/gopd/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./node_modules/has-property-descriptors/index.js":
/*!********************************************************!*\
  !*** ./node_modules/has-property-descriptors/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./src/browser/face/controllers/app/app.html":
/*!***************************************************!*\
  !*** ./src/browser/face/controllers/app/app.html ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
var ___HTML_LOADER_IMPORT_0___ = __webpack_require__(/*! ./img/logo.svg */ "./src/browser/face/controllers/app/img/logo.svg");
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = ___HTML_LOADER_GET_SOURCE_FROM_IMPORT___(___HTML_LOADER_IMPORT_0___);
var code = "<div class=\"app container-fluid\">  \n  <if recreate is=\"${ this.showCaptcha }\" class=\"captcha wmodal\">\n    <div class=\"wmodal-overlay\" on-mousedown=\"${ this.showCaptcha = false }\">     \n      <div class=\"wmodal-body\" on-mousedown=\"${ event.stopPropagation(); }\">\n        <i class=\"wmodal-close fas fa-times\" on-mousedown=\"${ this.showCaptcha = false }\"></i>\n        <div hidden=\"${ !this.isGettingApprovalInfo }\" class=\"captcha-preloader\">\n          <i class=\"fas fa-spinner fa-spin\"></i>\n        </div>\n        <a hidden=\"${ this.isGettingApprovalInfo }\" href=\"javascript:;\" on-click=\"${ this.createApprovalInfo() }\">\n          <img url=\"${ this.songUploadInfo.approvalInfo.question }\" alt=\"captcha\">\n        </a>       \n        <form on-submit=\"${ event.preventDefault(); this.uploadSongAction(); this.showCaptcha = false; }\">\n          <div class=\"form-group w-100 mt-3\">\n            <input type=\"text\" class=\"${ utils.class({ 'form-control': true, 'is-invalid': this.uploadFormFails.captcha }) }\" focus=\"${ !this.isGettingApprovalInfo }\" value=\"${ this.songUploadInfo.approvalInfo.answer }\" on-input=\"${ this.songUploadInfo.approvalInfo.answer = event.target.value; this.uploadFormFails.captcha = false; }\" placeholder=\"enter 6 symbols\">\n            <div class=\"invalid-feedback\">Wrong answer, try again</div>\n          </div> \n          <button type=\"submit\" class=\"upload-preloader-btn btn form-control btn-secondary mt-2\" disabled=\"${ this.isGettingApprovalInfo}\">\n            Confirm\n          </button>  \n        </form>            \n      </div>\n    </div>\n  </if>\n  <if recreate is=\"${ this.uploadEvent.status }\" class=\"wmodal upload-events\">\n    <div class=\"wmodal-overlay container-fluid\" on-click=\"${ this.resetUploadEvent() }\">     \n      <div class=\"w-100 row justify-content-center align-items-center\">\n        <div class=\"col-12 col-md-7 col-lg-6 col-xl-5\">\n          <div class=\"wmodal-body ${ this.uploadEvent.status }\" on-click=\"${ event.stopPropagation(); }\">\n            <i class=\"wmodal-close fas fa-times\" on-click=\"${ this.resetUploadEvent() }\"></i>\n            ${ this.uploadEvent.message }\n          </div>\n        </div>\n      </div>\n    </div>\n  </if>\n  <header class=\"header row\">\n    <div class=\"songs-counter-text\">\n      There ${this.songsCount == 1? 'is': 'are'} <b>${ Number(this.songsCount).toLocaleString() }</b> song${this.songsCount == 1? '': 's'} on the network\n    </div>\n    <a state=\"app\" class=\"logo mx-auto px-4\">\n      <div>\n        <img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" class=\"logo-img\">\n        <span class=\"logo-title\">museria</span>\n        <div class=\"logo-description-start\">decentralized</div>\n        <div class=\"logo-description-end-lg d-lg-none\">storage</div>\n      </div>\n      <div class=\"logo-description-end d-none d-lg-block\">storage</div>\n    </a>\n  </header>\n  <div class=\"content\">    \n    <div class=\"row pt-5 pb-3\">\n      <div class=\"song-search col-lg-6 col-12 pl-5 pr-5 pr-lg-4 pt-4\">             \n        <div class=\"song-search-input input-group input-group-lg\">\n          <i hidden=\"${ this.isFinding }\" class=\"fas fa-search fa-lg\"></i>\n          <i hidden=\"${ !this.isFinding }\" class=\"fas fa-circle-notch fa-spin song-search-loading fa-lg\"></i>\n          <i on-click=\"${ this.resetSearchEvent(); this.setFindingValue(''); this.searchInputFocus = true }\" hidden=\"${ !this.searchEvent.status }\" class=\"fa fa-times fa-lg song-search-close\"></i>\n          <input type=\"text\" class=\"form-control\" placeholder=\"find a song...\" debounce=\"2500\" focus=\"${ this.searchInputFocus }\" value=\"${ this.searchInputValue }\" on-input=\"${ this.resetSearchEvent(); this.setFindingValue(event.target.value) }\" on-debounce=\"${ this.findSongs() }\" on-focus=\"${ this.searchInputFocus = true }\" on-blur=\"${ this.searchInputFocus = false }\">\n        </div>        \n        <if is=\"${ this.searchEvent.status }\" class=\"d-block alert alert-${this.searchEvent.status} my-4\">     \n          <if recreate is=\"${ !this.searchEvent.message }\">     \n            <for in=\"${ this.searchEvent.meta.songs || [] }\" class=\"finding-list\">\n              <a href=\"${ this.loopValue.audioLink }\" target=\"_blank\">\n                <i class=\"fas fa-link mr-2\"></i> ${ this.loopValue.title }\n              </a>\n            </for>\n          </if>\n          <else>\n            ${ this.searchEvent.message }\n          </else>        \n        </if>\n      </div>\n      <div class=\"col-lg-6 col-12 pl-5 pr-5 pl-lg-4 pt-4\">\n        <div class=\"position-relative\">\n          <button class=\"btn form-control mb-2 btn-lg btn-primary\" on-click=\"${ this.chooseSong() }\">\n            <if is=\"${ !this.songUploadInfo.file }\">\n              Choose a song <span class=\"d-none d-sm-inline\">to upload</span>\n            </if>\n            <else>\n              Choose another song\n            </else>\n          </button>\n          <input type=\"file\" id=\"audio-file\" class=\"invisible position-absolute\" on-change=\"${ this.prepareAudio(event.target.files[0]) }\" accept=\"audio/mpeg\">\n          <form on-submit=\"${ event.preventDefault(); this.uploadSong() }\" class=\"input-group my-4 d-block\">\n            <if recreate is=\"${ this.songUploadInfo.file }\">          \n              <div class=\"form-group w-100\">\n                <input type=\"text\" class=\"${ utils.class({ 'form-control': true, 'is-invalid': this.uploadFormFails.title }) }\" placeholder=\"Write a song title\" value=\"${ this.songUploadInfo.title }\" on-input=\"${ this.songUploadInfo.title = event.target.value; this.songUploadInfo.fileChanged = true }\" debounce=\"2000\" on-debounce=\"${ this.checkUploadSongTitle(event.target) }\">\n                <div class=\"invalid-feedback\">Title must be like \"Artist - Title\"</div>\n              </div>\n              <div class=\"form-group mt-3 w-100\">\n                <div class=\"custom-file position-relative\">\n                  <input type=\"file\" class=\"${ utils.class({ 'custom-file-input': true, 'is-invalid': this.uploadFormFails.cover }) }\" id=\"cover-file\" on-change=\"${ this.prepareCover(event.target.files[0]) }\" accept=\"image/jpeg,image/png\">\n                  <div class=\"invalid-feedback\">Cover must be \"jpeg\" or \"png\"</div>\n                  <img hidden=\"${ !this.songUploadInfo.cover }\" url=\"${ this.songUploadInfo.cover }\" class=\"cover-img\">\n                  <label class=\"custom-file-label ${ utils.class({'cover-label': true, 'with-img': !!this.songUploadInfo.cover}) }\" for=\"cover-file\">\n                    ${ this.songUploadInfo.cover? 'Cover is chosen': 'Choose a cover file' }\n                  </label>\n                  <i hidden=\"${ !this.songUploadInfo.cover }\" on-click=\"${ this.removeCover() }\" class=\"close-fa cover-remove fas fa-times fa-lg\" title=\"remove the cover\"></i>\n                </div>\n              </div>\n              <div class=\"form-group mt-3 w-100\">\n                <div class=\"custom-control custom-checkbox my-1 mr-sm-2\">\n                  <input type=\"checkbox\" class=\"custom-control-input\" id=\"songHighPriorityCheckbox\" checked=\"${ this.songUploadInfo.controlled }\" on-change=\"${ this.songUploadInfo.controlled = event.target.checked }\">\n                  <label class=\"custom-control-label\" for=\"songHighPriorityCheckbox\">\n                    Moderation mode (optional)\n                  </label>\n                </div>\n              </div>\n\n              <div hidden=\"${ !this.songUploadInfo.controlled }\" class=\"form-group mt-3 w-100\">\n                <radio name=\"song-priority\" value=\"${ this.songUploadInfo.priority }\" on-radio=\"${ this.songUploadInfo.priority = event.detail }\" class=\"d-flex song-priority\">\n                  <div class=\"custom-control custom-radio pr-4\">\n                    <input type=\"radio\" class=\"custom-control-input\" id=\"songLowPriority\" value=\"-1\">\n                    <label class=\"custom-control-label\" for=\"songLowPriority\">Low priority</label>\n                  </div>\n                  <div class=\"custom-control custom-radio pr-4\">\n                    <input type=\"radio\" class=\"custom-control-input\" id=\"songNormalPriority\" value=\"0\">\n                    <label class=\"custom-control-label\" for=\"songNormalPriority\">Normal priority</label>\n                  </div>\n                  <div class=\"custom-control custom-radio\">\n                    <input type=\"radio\" class=\"custom-control-input\" id=\"songHighPriority\" value=\"1\">\n                    <label class=\"custom-control-label\" for=\"songHighPriority\">High priority</label>\n                  </div>\n                </radio>               \n              </div>\n              <button disabled=\"${ this.uploadFormFails.title || this.uploadFormFails.cover || this.isUploading }\" type=\"submit\" class=\"upload-preloader-btn btn form-control btn-secondary mt-2\">\n                Upload the song <i hidden=\"${ !this.isUploading }\" class=\"fas fa-circle-notch fa-spin\"></i>\n              </button>\n            </if>\n          </form>\n        </div>\n      </div>    \n    </div>  \n    <div class=\"container py-5\">\n      <div class=\"row px-2 pb-5\">\n        <div class=\"col-12 text-center\">\n          <ul class=\"questions\">\n            <li>\n              <div>What is this?</div>\n              <div>It is a decentralized music storage node.</div>\n            </li>\n            <li>\n              <div>What node?</div>\n              <div>This is one of the servers that is part of the network.</div>\n            </li>\n            <li>\n              <div>What network?</div>\n              <div>If you are here and don’t know it, then this is most likely\n                <a href=\"https://github.com/ortexx/museria-global/\" target=\"_blank\">a global storage network</a>.\n                But it could be another one.\n              </div>\n            </li>\n            <li>\n              <div>Global storage network?</div>\n              <div>\n                Yes, <a href=\"https://github.com/ortexx/museria-global/\" target=\"_blank\">a global decentralized network</a> \n                has been launched, that allows us all to store and receive music for free and in a single place.\n              </div>\n            </li>\n            <li>\n              <div>What can I do on this page?</div>\n              <div>\n                Once you are here, then the network is public or you have access. \n                You can try to find a song in the storage or add your own there.\n              </div>\n            </li> \n            <li>\n              <div>Where can I get the node status?</div>\n              <div>\n                There is a special route <a href=\"/status?pretty\" target=\"_blank\">here</a>.\n              </div>\n            </li>          \n            <li>\n              <div>How to learn more about all this?</div>\n              <div>\n                Look into <a href=\"https://github.com/ortexx/museria/\" target=\"_blank\">the documentation</a> of the library that is responsible for everything.\n                If you are not a programmer then find out the details from the person who gave you the link to the site.\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>    \n    </div>\n  </div>  \n  <footer class=\"footer row\">\n    <div class=\"container\">\n      <div class=\"row px-4\">\n        <div class=\"col-xl-4 col-lg-6 mt-4 px-0 footer-contacts\">\n          <h5>Contacts</h5>\n          <ul class=\"flex-column nav\">\n            <li>\n              <i class=\"fas fa-envelope\" aria-hidden=\"true\"></i>\n              <a href=\"mailto:storage@museria.com\" target=\"_blank\">\n                <span class=\"pl-1\">storage@museria.com</span>\n              </a>\n            </li>\n            <li>\n              <i class=\"fab fa-github\" aria-hidden=\"true\"></i>\n              <a href=\"https://github.com/ortexx/\" target=\"_blank\">\n                <span class=\"pl-1\">ortexx</span>\n              </a>\n            </li>\n          </ul>\n        </div>\n        <div class=\"col-xl-4 col-lg-6 mt-4 px-0\">\n          <h5>Information</h5>\n          <ul class=\"flex-column nav\">\n            <li>\n              <i class=\"fas fa-book-open\" aria-hidden=\"true\"></i>\n              <a href=\"https://github.com/ortexx/museria/\" target=\"_blank\">Documentation</a>\n            </li>\n            <li>\n              <i class=\"fas fa-globe\" aria-hidden=\"true\"></i>\n              <a href=\"https://github.com/ortexx/museria-global/\" target=\"_blank\">Global network</a>\n            </li>\n            <li>\n              <i class=\"fas fa-play-circle\" aria-hidden=\"true\"></i>\n              <a href=\"https://github.com/ortexx/musiphone/\" target=\"_blank\">Decentralized player</a>\n            </li>\n          </ul>\n        </div>\n        <div class=\"col-xl-4 col-lg-6 mt-4 px-0\">\n          <h5>Donate</h5>\n          <ul class=\"flex-column nav\">\n            <li>\n              <i class=\"fab fa-btc\" aria-hidden=\"true\"></i>\n              <span>38dyvCmUadqS2HVFEuDBVC3k1a7h6J5gqU</span>\n            </li>\n            <li>\n              <i class=\"fab fa-ethereum\" aria-hidden=\"true\"></i>\n              <span>0x4e5Ef1b362271523f5c6eDe7a54BDcA9750D81E8</span>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </footer>\n</div>";
// Exports
module.exports = code;

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-nan/implementation.js":
/*!***********************************************!*\
  !*** ./node_modules/is-nan/implementation.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ "./node_modules/is-nan/index.js":
/*!**************************************!*\
  !*** ./node_modules/is-nan/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/is-nan/shim.js");

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/is-nan/polyfill.js":
/*!*****************************************!*\
  !*** ./node_modules/is-nan/polyfill.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/is-nan/implementation.js");

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ "./node_modules/is-nan/shim.js":
/*!*************************************!*\
  !*** ./node_modules/is-nan/shim.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/is-nan/polyfill.js");

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./src/browser/face/controllers/app/app.scss":
/*!***************************************************!*\
  !*** ./src/browser/face/controllers/app/app.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/browser/face/styles/main.scss":
/*!*******************************************!*\
  !*** ./src/browser/face/styles/main.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/object-is/implementation.js":
/*!**************************************************!*\
  !*** ./node_modules/object-is/implementation.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "./node_modules/object-is/index.js":
/*!*****************************************!*\
  !*** ./node_modules/object-is/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");
var callBind = __webpack_require__(/*! call-bind */ "./node_modules/call-bind/index.js");

var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");
var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var shim = __webpack_require__(/*! ./shim */ "./node_modules/object-is/shim.js");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "./node_modules/object-is/polyfill.js":
/*!********************************************!*\
  !*** ./node_modules/object-is/polyfill.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/object-is/implementation.js");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "./node_modules/object-is/shim.js":
/*!****************************************!*\
  !*** ./node_modules/object-is/shim.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(/*! ./polyfill */ "./node_modules/object-is/polyfill.js");
var define = __webpack_require__(/*! define-properties */ "./node_modules/define-properties/index.js");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(/*! ./isArguments */ "./node_modules/object-keys/isArguments.js");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ "./node_modules/object-keys/implementation.js");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! ./node_modules/process/browser.js */ "./node_modules/process/browser.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! for-each */ "./node_modules/for-each/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");
var gOPD = __webpack_require__(/*! gopd */ "./node_modules/gopd/index.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/construct.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/construct.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _construct)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");


function _construct(Parent, args, Class) {
  if ((0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_1__["default"])()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/get.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/get.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _get)
/* harmony export */ });
/* harmony import */ var _superPropBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./superPropBase.js */ "./node_modules/@babel/runtime/helpers/esm/superPropBase.js");

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = (0,_superPropBase_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeReflectConstruct)
/* harmony export */ });
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/superPropBase.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/superPropBase.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _superPropBase)
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object);
    if (object === null) break;
  }
  return object;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toConsumableArray)
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function _toPrimitive(input, hint) {
  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function _toPropertyKey(arg) {
  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arg, "string");
  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) === "symbol" ? key : String(key);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./src/browser/face/index.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/main.scss */ "./src/browser/face/styles/main.scss");
/* harmony import */ var akili__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! akili */ "./node_modules/akili/src/akili.js");
/* harmony import */ var akili_src_services_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! akili/src/services/router */ "./node_modules/akili/src/services/router.js");
/* harmony import */ var _controllers_app_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controllers/app/app */ "./src/browser/face/controllers/app/app.js");
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./client */ "./src/browser/face/client.js");
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");







_controllers_app_app__WEBPACK_IMPORTED_MODULE_5__["default"].define();
document.addEventListener('DOMContentLoaded', /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        akili_src_services_router__WEBPACK_IMPORTED_MODULE_4__["default"].init('/app', false);
        _context.next = 4;
        return _client__WEBPACK_IMPORTED_MODULE_6__["default"].init();
      case 4:
        _context.next = 6;
        return akili__WEBPACK_IMPORTED_MODULE_3__["default"].init();
      case 6:
        _context.next = 11;
        break;
      case 8:
        _context.prev = 8;
        _context.t0 = _context["catch"](0);
        // eslint-disable-next-line no-console
        console.error(_context.t0);
      case 11:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 8]]);
})));
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});