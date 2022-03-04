require("source-map-support").install();
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Data.js":
/*!*********************!*\
  !*** ./src/Data.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! core-js/modules/es.array.map.js */ "core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.array.fill.js */ "core-js/modules/es.array.fill.js");

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "core-js/modules/es.array.concat.js");

var ref = [0, 31, 59, 90, 120, 151, 182];

var setData = function setData() {
  var dataLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  return new Array(dataLength).fill(0).map(function (ele, idx) {
    var day = idx + 1;
    var mon = day <= 31 ? 1 : day <= 59 ? 2 : day <= 90 ? 3 : day <= 120 ? 4 : day <= 151 ? 5 : day <= 182 ? 6 : 7;
    return {
      id: idx + 1,
      title: "title".concat(idx + 1),
      writer: "name".concat(idx + 1),
      content: "content".concat(idx + 1),
      date: "2021-".concat(mon, "-").concat(day - ref[mon - 1])
    };
  });
};

var totData = setData(200);
module.exports = totData;

/***/ }),

/***/ "./src/executor.js":
/*!*************************!*\
  !*** ./src/executor.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! core-js/modules/es.array.is-array.js */ "core-js/modules/es.array.is-array.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "core-js/modules/es.symbol.description.js");

__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "core-js/modules/es.symbol.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "core-js/modules/es.array.iterator.js");

__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "core-js/modules/es.string.iterator.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! core-js/modules/es.array.from.js */ "core-js/modules/es.array.from.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.object.define-property.js */ "core-js/modules/es.object.define-property.js");

__webpack_require__(/*! core-js/modules/es.object.keys.js */ "core-js/modules/es.object.keys.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "core-js/modules/es.object.get-own-property-descriptor.js");

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "core-js/modules/es.object.get-own-property-descriptors.js");

__webpack_require__(/*! core-js/modules/es.object.define-properties.js */ "core-js/modules/es.object.define-properties.js");

__webpack_require__(/*! core-js/modules/es.array.slice.js */ "core-js/modules/es.array.slice.js");

__webpack_require__(/*! core-js/modules/es.array.reverse.js */ "core-js/modules/es.array.reverse.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.entries.js */ "core-js/modules/es.object.entries.js");

__webpack_require__(/*! core-js/modules/es.array.includes.js */ "core-js/modules/es.array.includes.js");

__webpack_require__(/*! core-js/modules/es.string.includes.js */ "core-js/modules/es.string.includes.js");

__webpack_require__(/*! core-js/modules/es.array.map.js */ "core-js/modules/es.array.map.js");

__webpack_require__(/*! core-js/modules/es.function.name.js */ "core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.number.constructor.js */ "core-js/modules/es.number.constructor.js");

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "core-js/modules/es.array.concat.js");

__webpack_require__(/*! core-js/modules/es.date.to-iso-string.js */ "core-js/modules/es.date.to-iso-string.js");

__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "core-js/modules/es.date.to-string.js");

__webpack_require__(/*! core-js/modules/es.array.splice.js */ "core-js/modules/es.array.splice.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var tem = __webpack_require__(/*! ./Data.js */ "./src/Data.js");

var totData = tem;
var initialState = {
  data: totData.slice().reverse().slice(0, 5),
  page: 1,
  size: 5,
  order: 'dsc',
  filter: '',
  name: '',
  total: totData.length,
  index: 0
}; // ---- Query executor ---- 

var queryExecutor = {
  // SELECT * FROM _ WHERE all culumn LIKE '%keyword%' 
  filterByKeyWord: function filterByKeyWord(keyword) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : totData;
    // filter by search keyworkd
    // console.log("datata", data)
    return keyword === "" ? data : data.filter(function (ele) {
      var bool = false;

      for (var _i = 0, _Object$entries = Object.entries(ele); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            key = _Object$entries$_i[0],
            val = _Object$entries$_i[1];

        if (key === 'id' || key === 'date' || key === 'index') continue; // console.log( val, keyword)

        if (!String(val).includes(keyword)) continue;
        bool = true; // console.log(ele) 

        break;
      }

      return bool;
    });
  },
  // SELECT * FROM _ WHERE writer = name
  filterByName: function filterByName(name, data) {
    // filter by writer name
    // console.log("datata", data)
    return name === "" ? data : data.filter(function (ele) {
      var bool = false;

      for (var _i2 = 0, _Object$entries2 = Object.entries(ele); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            key = _Object$entries2$_i[0],
            val = _Object$entries2$_i[1];

        if (key === 'writer' && String(val) === name) {
          bool = true;
          break;
        }
      }

      return bool;
    });
  },
  // LIMIT & OFFSET 
  setRange: function setRange(page, size, offset, end) {
    // set view data range  
    var _from = (page - 1) * size - offset;

    _from = _from < 0 ? 0 : _from;

    var _to = _from + size + offset;

    _to = _to >= end ? end : _to; // console.log(page, size, _from, _to)

    return [_from, _to, end];
  },
  // ORDER BY & INDEX
  setIndexData: function setIndexData(order, _data) {
    _data = order === 'dsc' ? _data.reverse() : _data;
    return _data.slice().map(function (item, idx) {
      item['index'] = idx;
      return item;
    });
  }
};
module.exports = {
  updateStateByQueryExecutor: function updateStateByQueryExecutor(state) {
    var _state = state,
        filter = _state.filter,
        name = _state.name,
        order = _state.order,
        page = _state.page,
        size = _state.size,
        data = _state.data,
        total = _state.total;
    page = Number(page);
    size = Number(size); // console.log("executor=", page, size, filter, name, order, data)

    var filtered = queryExecutor.filterByKeyWord(filter); // console.log(filtered)

    filtered = queryExecutor.filterByName(name, filtered); // console.log(filtered)

    var _queryExecutor$setRan = queryExecutor.setRange(page, size, 0, filtered.length),
        _queryExecutor$setRan2 = _slicedToArray(_queryExecutor$setRan, 2),
        from = _queryExecutor$setRan2[0],
        to = _queryExecutor$setRan2[1];

    var totFilterData = queryExecutor.setIndexData(order, filtered.slice());
    data = totFilterData.slice(from, to);
    total = totFilterData.length;
    state = _objectSpread(_objectSpread({}, state), {}, {
      data: data,
      total: total
    }); // console.log(state)

    return state;
  },
  getPathURL: function getPathURL(state) {
    var filter = state.filter,
        name = state.name,
        order = state.order,
        data = state.data,
        total = state.total,
        page = state.page,
        size = state.size;
    var id = "filter=".concat(filter, "&name=").concat(name, "&order=").concat(order, "&page=").concat(page, "&size=").concat(size);
    return id;
  },
  updatePost: function updatePost(_ref) {
    var writer = _ref.writer,
        title = _ref.title,
        content = _ref.content,
        id = _ref.id;
    // console.log("id===========", id)
    totData = totData.map(function (ele) {
      if (Number(ele.id) === Number(id)) {
        ele.writer = writer;
        ele.title = title;
        ele.content = content;
      }

      return ele;
    }); // console.log(totData[ totData.length-1 ])

    return totData;
  },
  createPost: function createPost(_ref2) {
    var writer = _ref2.writer,
        title = _ref2.title,
        content = _ref2.content;
    var id = totData[totData.length - 1].id + 1;
    totData.push({
      id: id,
      writer: writer,
      title: title,
      content: content,
      date: new Date().toISOString()
    });
    return totData;
  },
  deletePost: function deletePost(id) {
    for (var i = 0; i < totData.length; i++) {
      if (totData[i].id === Number(id)) totData.splice(i, 1);
    }

    return totData;
  },
  getInitialState: function getInitialState() {
    initialState.data = totData.slice().reverse().slice(0, 5);
    return initialState;
  }
};

/***/ }),

/***/ "./src/ssr.service.js":
/*!****************************!*\
  !*** ./src/ssr.service.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.promise.js */ "core-js/modules/es.promise.js");

__webpack_require__(/*! core-js/modules/es.array.concat.js */ "core-js/modules/es.array.concat.js");

__webpack_require__(/*! regenerator-runtime/runtime.js */ "regenerator-runtime/runtime.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../public/ssr.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())),
    SSR = _require.SSR;

var getStringHtml = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(context) {
    var state, ssrRendered, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            state = context.state;
            _context.next = 3;
            return SSR.ssr_converter(context).then(result);

          case 3:
            ssrRendered = _context.sent;
            result = template(state, ssrRendered);
            return _context.abrupt("return", result ? result : template(state, null));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getStringHtml(_x) {
    return _ref.apply(this, arguments);
  };
}();

var template = function template(state, ssr_html) {
  return "\n  <!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Document</title>\n  <script>window.state=".concat(JSON.stringify(state), "</script>\n</head>\n<body>\n  <div id='root'>\n    ").concat(ssr_html ? ssr_html : "", " \n  </div>\n  <script src=\"./csr.js\"></script>\n</body>\n</html>\n  ");
};

module.exports = getStringHtml;

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


__webpack_require__(/*! core-js/modules/es.object.keys.js */ "core-js/modules/es.object.keys.js");

__webpack_require__(/*! core-js/modules/es.symbol.js */ "core-js/modules/es.symbol.js");

__webpack_require__(/*! core-js/modules/es.array.filter.js */ "core-js/modules/es.array.filter.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "core-js/modules/es.object.get-own-property-descriptor.js");

__webpack_require__(/*! core-js/modules/es.array.for-each.js */ "core-js/modules/es.array.for-each.js");

__webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "core-js/modules/web.dom-collections.for-each.js");

__webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "core-js/modules/es.object.get-own-property-descriptors.js");

__webpack_require__(/*! core-js/modules/es.object.define-properties.js */ "core-js/modules/es.object.define-properties.js");

__webpack_require__(/*! core-js/modules/es.object.define-property.js */ "core-js/modules/es.object.define-property.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ServerStore = /*#__PURE__*/function () {
  function ServerStore(state) {
    _classCallCheck(this, ServerStore);

    _defineProperty(this, "state", void 0);

    this.state = state;
  }

  _createClass(ServerStore, [{
    key: "setState",
    value: function setState(newState) {
      this.state = _objectSpread(_objectSpread({}, this.state), newState);
    }
  }]);

  return ServerStore;
}();

module.exports = {
  store: new ServerStore()
};

/***/ }),

/***/ "./node_modules/console-browserify/index.js":
/*!**************************************************!*\
  !*** ./node_modules/console-browserify/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(/*! util */ "util")
var assert = __webpack_require__(/*! assert */ "assert")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof global !== "undefined" && global.console) {
    console = global.console
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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "core-js/modules/es.array.concat.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.array.concat.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.concat.js");

/***/ }),

/***/ "core-js/modules/es.array.fill.js":
/*!***************************************************!*\
  !*** external "core-js/modules/es.array.fill.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.fill.js");

/***/ }),

/***/ "core-js/modules/es.array.filter.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.array.filter.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.filter.js");

/***/ }),

/***/ "core-js/modules/es.array.for-each.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.for-each.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.for-each.js");

/***/ }),

/***/ "core-js/modules/es.array.from.js":
/*!***************************************************!*\
  !*** external "core-js/modules/es.array.from.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.from.js");

/***/ }),

/***/ "core-js/modules/es.array.includes.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.includes.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.includes.js");

/***/ }),

/***/ "core-js/modules/es.array.is-array.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.is-array.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.is-array.js");

/***/ }),

/***/ "core-js/modules/es.array.iterator.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.array.iterator.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.iterator.js");

/***/ }),

/***/ "core-js/modules/es.array.map.js":
/*!**************************************************!*\
  !*** external "core-js/modules/es.array.map.js" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.map.js");

/***/ }),

/***/ "core-js/modules/es.array.reverse.js":
/*!******************************************************!*\
  !*** external "core-js/modules/es.array.reverse.js" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.reverse.js");

/***/ }),

/***/ "core-js/modules/es.array.slice.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.array.slice.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.slice.js");

/***/ }),

/***/ "core-js/modules/es.array.splice.js":
/*!*****************************************************!*\
  !*** external "core-js/modules/es.array.splice.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.array.splice.js");

/***/ }),

/***/ "core-js/modules/es.date.to-iso-string.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.date.to-iso-string.js" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.date.to-iso-string.js");

/***/ }),

/***/ "core-js/modules/es.date.to-string.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.date.to-string.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.date.to-string.js");

/***/ }),

/***/ "core-js/modules/es.function.name.js":
/*!******************************************************!*\
  !*** external "core-js/modules/es.function.name.js" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.function.name.js");

/***/ }),

/***/ "core-js/modules/es.number.constructor.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.number.constructor.js" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.number.constructor.js");

/***/ }),

/***/ "core-js/modules/es.object.define-properties.js":
/*!*****************************************************************!*\
  !*** external "core-js/modules/es.object.define-properties.js" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.define-properties.js");

/***/ }),

/***/ "core-js/modules/es.object.define-property.js":
/*!***************************************************************!*\
  !*** external "core-js/modules/es.object.define-property.js" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.define-property.js");

/***/ }),

/***/ "core-js/modules/es.object.entries.js":
/*!*******************************************************!*\
  !*** external "core-js/modules/es.object.entries.js" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.entries.js");

/***/ }),

/***/ "core-js/modules/es.object.get-own-property-descriptor.js":
/*!***************************************************************************!*\
  !*** external "core-js/modules/es.object.get-own-property-descriptor.js" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.get-own-property-descriptor.js");

/***/ }),

/***/ "core-js/modules/es.object.get-own-property-descriptors.js":
/*!****************************************************************************!*\
  !*** external "core-js/modules/es.object.get-own-property-descriptors.js" ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.get-own-property-descriptors.js");

/***/ }),

/***/ "core-js/modules/es.object.keys.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.object.keys.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.keys.js");

/***/ }),

/***/ "core-js/modules/es.object.to-string.js":
/*!*********************************************************!*\
  !*** external "core-js/modules/es.object.to-string.js" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.object.to-string.js");

/***/ }),

/***/ "core-js/modules/es.promise.js":
/*!************************************************!*\
  !*** external "core-js/modules/es.promise.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.promise.js");

/***/ }),

/***/ "core-js/modules/es.regexp.exec.js":
/*!****************************************************!*\
  !*** external "core-js/modules/es.regexp.exec.js" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.regexp.exec.js");

/***/ }),

/***/ "core-js/modules/es.string.includes.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.string.includes.js" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.string.includes.js");

/***/ }),

/***/ "core-js/modules/es.string.iterator.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.string.iterator.js" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.string.iterator.js");

/***/ }),

/***/ "core-js/modules/es.symbol.description.js":
/*!***********************************************************!*\
  !*** external "core-js/modules/es.symbol.description.js" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.symbol.description.js");

/***/ }),

/***/ "core-js/modules/es.symbol.iterator.js":
/*!********************************************************!*\
  !*** external "core-js/modules/es.symbol.iterator.js" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.symbol.iterator.js");

/***/ }),

/***/ "core-js/modules/es.symbol.js":
/*!***********************************************!*\
  !*** external "core-js/modules/es.symbol.js" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/es.symbol.js");

/***/ }),

/***/ "core-js/modules/web.dom-collections.for-each.js":
/*!******************************************************************!*\
  !*** external "core-js/modules/web.dom-collections.for-each.js" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/web.dom-collections.for-each.js");

/***/ }),

/***/ "core-js/modules/web.dom-collections.iterator.js":
/*!******************************************************************!*\
  !*** external "core-js/modules/web.dom-collections.iterator.js" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("core-js/modules/web.dom-collections.iterator.js");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "global-jsdom/register":
/*!****************************************!*\
  !*** external "global-jsdom/register" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("global-jsdom/register");

/***/ }),

/***/ "regenerator-runtime/runtime.js":
/*!*************************************************!*\
  !*** external "regenerator-runtime/runtime.js" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("regenerator-runtime/runtime.js");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/* provided dependency */ var console = __webpack_require__(/*! ./node_modules/console-browserify/index.js */ "./node_modules/console-browserify/index.js");


__webpack_require__(/*! core-js/modules/es.function.name.js */ "core-js/modules/es.function.name.js");

__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.promise.js */ "core-js/modules/es.promise.js");

__webpack_require__(/*! regenerator-runtime/runtime.js */ "regenerator-runtime/runtime.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

__webpack_require__(/*! global-jsdom/register */ "global-jsdom/register");

var express = __webpack_require__(/*! express */ "express");

var cors = __webpack_require__(/*! cors */ "cors");

var fs = __webpack_require__(/*! fs */ "fs");

var path = __webpack_require__(/*! path */ "path");

var server = express();
var PORT = 3001;

var getStringHtml = __webpack_require__(/*! ./src/ssr.service.js */ "./src/ssr.service.js");

var _require = __webpack_require__(/*! ./src/store.js */ "./src/store.js"),
    store = _require.store;

var _require2 = __webpack_require__(/*! ./src/executor.js */ "./src/executor.js"),
    updateStateByQueryExecutor = _require2.updateStateByQueryExecutor,
    getPathURL = _require2.getPathURL,
    getInitialState = _require2.getInitialState,
    updatePost = _require2.updatePost,
    createPost = _require2.createPost,
    deletePost = _require2.deletePost;

server.options('*', cors());
server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));
server.use(express["static"](path.resolve(__dirname, 'public')));

var updateCache = function updateCache(req, res) {
  if (!req.query) return res.status(400).end();
  store.setState(updateStateByQueryExecutor(req.query));
  var _store$state = store.state,
      data = _store$state.data,
      total = _store$state.total;
  res.json({
    id: getPathURL(store.state),
    data: data,
    total: total
  });
};

var updateState = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(400).end());

          case 2:
            store.setState(req.body);
            return _context.abrupt("return", res.status(203).end());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateState(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

server.get('/', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var redirectTo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            store.setState(getInitialState());
            redirectTo = "/list?" + getPathURL(store.state);
            return _context2.abrupt("return", res.redirect(redirectTo));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
server.get('/list', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var filePath, fileURL, html;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!store.state) store.setState(getInitialState());
            filePath = 'list?' + getPathURL(req.query);
            fileURL = path.resolve(__dirname, '../../client/resources', 'index_' + filePath + '.html');
            _context3.next = 5;
            return getStringHtml({
              url: '/',
              state: store.state,
              index: 0
            });

          case 5:
            html = _context3.sent;
            _context3.next = 8;
            return fs.writeFileSync(fileURL, html);

          case 8:
            return _context3.abrupt("return", res.send(html));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
server.get('/post-single', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var index, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            index = req.query.index;
            _context4.next = 3;
            return getStringHtml({
              url: '/post-single',
              state: store.state,
              index: index
            });

          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", res.send(result));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
server.get('/post-edit', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var index, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            index = req.query.index;
            _context5.next = 3;
            return getStringHtml({
              url: '/post-edit',
              state: store.state,
              index: index
            });

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", res.send(result));

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
server.get('/api/cache', updateCache);
server.put('/api/state', updateState);
server.post('/post/edit', function (req, res) {
  if (req.body.id === '') {
    if (!createPost(req.body)) return res.status(500).send('Internal server error');
    store.setState(updateStateByQueryExecutor({
      filter: "",
      order: 'dsc',
      name: "",
      page: 1,
      size: 5
    }));
    return res.json(store.state);
  }

  if (!updatePost(req.body)) return res.status(500).send('Internal server error');
  var name = store.state.name !== '' ? req.body.writer : '';
  store.setState({
    name: name
  });
  store.setState(updateStateByQueryExecutor(store.state));
  return res.json(store.state);
});
server["delete"]('/post/delete', function (req, res) {
  if (!deletePost(req.query.id)) return res.status(500).send("Internal server error");
  store.setState(updateStateByQueryExecutor({
    filter: "",
    order: 'dsc',
    name: "",
    page: 1,
    size: 5
  }));
  return res.status(202).json(store.state);
});
server.listen(PORT, function () {
  console.log("server listning by Port= " + PORT);
});
})();

/******/ })()
;
//# sourceMappingURL=server.js.map