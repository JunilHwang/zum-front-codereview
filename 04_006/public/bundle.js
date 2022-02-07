/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var _cors_Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cors/Component.js */ \"./src/cors/Component.js\");\n/* harmony import */ var _page_main_Main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page/main/Main.js */ \"./src/page/main/Main.js\");\n/* harmony import */ var _page_Detail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page/Detail */ \"./src/page/Detail.js\");\n\n\n\n\nclass App extends _cors_Component_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    setup () {\n        this.$state =  {\n          url: \"\" , \n          data : \"\"\n        };\n      }\n    \ntemplate () {\n    return `\n      <header data-component=\"item-appender\"></header>\n      <main data-component=\"items\"></main>\n      <footer data-component=\"item-filter\"></footer>\n      ${this.$state.url}\n    `;\n  }\n  mounted(){\n    const {catchUrl} = this;\n    const $items = this.$target.querySelector('[data-component=\"items\"]');\n    if(this.$state.url == \"\"){\n      fetch(\"http://localhost:3001/\")\n      .then((response) => response.json())\n      .then((data) => this.setState({\n        data: data.data\n    }));\n    \n        new _page_main_Main_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]($items,{\n            catchurl: catchUrl.bind(this),\n            data : this.$state.data\n        });\n    }else if(this.$state.url == \"/home\"){\n        new _page_Detail__WEBPACK_IMPORTED_MODULE_2__[\"default\"]($items);\n    }\n  }\n\n  catchUrl (url) {\n    this.setState({\n        url: url\n    });\n  }\n}\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://zum_fe/./src/app.js?");

/***/ }),

/***/ "./src/cors/Component.js":
/*!*******************************!*\
  !*** ./src/cors/Component.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Component)\n/* harmony export */ });\nclass Component {\n  $target;\n  $state;\n  $props;\n  constructor ($target, $props) {\n    this.$target = $target;\n    this.$props = $props;\n    this.setup();\n    this.render();\n  }\n  setup () {}\n  mounted () {}\n  template () { return ''; }\n  render () {\n    this.$target.innerHTML = this.template();\n    this.mounted()\n    this.setEvent()\n  }\n  setEvent () {}\n  setState (newState) {\n    this.$state = { ...this.$state, ...newState };\n    this.render();\n  }\n}\n\n//# sourceURL=webpack://zum_fe/./src/cors/Component.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\n\nnew _app__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.querySelector('#root'));\n\n//# sourceURL=webpack://zum_fe/./src/index.js?");

/***/ }),

/***/ "./src/page/Detail.js":
/*!****************************!*\
  !*** ./src/page/Detail.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ detail)\n/* harmony export */ });\n/* harmony import */ var _cors_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cors/Component */ \"./src/cors/Component.js\");\n\n\nclass detail extends _cors_Component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  \n  template () {\n    return `\n    <p>디테일 페이지</p>  \n    `\n  }\n\n}\n\n\n\n//# sourceURL=webpack://zum_fe/./src/page/Detail.js?");

/***/ }),

/***/ "./src/page/main/Main.js":
/*!*******************************!*\
  !*** ./src/page/main/Main.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Items)\n/* harmony export */ });\n/* harmony import */ var _cors_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../cors/Component */ \"./src/cors/Component.js\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.css */ \"./src/page/main/main.css\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_main_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass Items extends _cors_Component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  setup () {\n    this.$state = { items: ['item1', 'item2'] };\n  }\n  \n  template () {\n    const { items } = this.$state;\n    const {data} = this.$props;\n    return `\n    <p>메인 페이지</p>  \n    <ul>\n        ${items.map(item => `<li>${item}</li>`).join('')}\n      </ul>\n      <button id = \"btn2\"  route = \"/home\" >작성</button> \n      <button id = \"btn1\">추가111</button>\n\n      <table border=\"1\">\n\t    <th>글번호</th>\n\t    <th>제목</th>\n      <th>작성자</th>\n      <th>작성일</th>\n\t    <tr><!-- 첫번째 줄 시작 -->\n\t    <td>1</td>\n\t    <td>안녕</td>\n      <td>문창희</td>\n      <td>2022.01.29</td>\n\t    </tr><!-- 첫번째 줄 끝 -->\n    </table>\n    ${data}\n    `\n  }\n\n  setEvent () {\n    const {items} = this.$state;\n    const { catchurl } = this.$props;\n    this.$target.querySelector('#btn1').addEventListener('click', () => {\n    console.log(\"Asdfssss\")\n      // fetch(\"http://localhost:3001/get\")\n    // .then((response) => response.json())\n    // .then((data) => this.setState({items:[...items,data.data]}));\n    });\n\n    this.$target.querySelector('#btn2').addEventListener('click', (e) => {\n      const pathName = e.target.getAttribute(\"route\")\n      historyRouter(pathName,1)\n      catchurl(window.location.pathname)\n    })\n  }\n}\nconst historyRouter = (pathName , element) => {\n  window.history.pushState({} , pathName , window.location.origin + pathName ) \n}\n\n\n\n//# sourceURL=webpack://zum_fe/./src/page/main/Main.js?");

/***/ }),

/***/ "./src/page/main/main.css":
/*!********************************!*\
  !*** ./src/page/main/main.css ***!
  \********************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://zum_fe/./src/page/main/main.css?");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;