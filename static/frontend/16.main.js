(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./frontend/src/screens/authenticated/Error/Error.css":
/*!************************************************************!*\
  !*** ./frontend/src/screens/authenticated/Error/Error.css ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Error_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!./Error.css */ \"./node_modules/css-loader/dist/cjs.js!./frontend/src/screens/authenticated/Error/Error.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_Error_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_css_loader_dist_cjs_js_Error_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack:///./frontend/src/screens/authenticated/Error/Error.css?");

/***/ }),

/***/ "./frontend/src/screens/authenticated/Error/Error.js":
/*!***********************************************************!*\
  !*** ./frontend/src/screens/authenticated/Error/Error.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Error_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Error.css */ \"./frontend/src/screens/authenticated/Error/Error.css\");\n\n\n\nfunction Error() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"error-page-con\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"error-contents-con\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"error-description\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"\\uC624\\uB958\\uAC00 \\uBC1C\\uC0DD\\uD588\\uC2B5\\uB2C8\\uB2E4.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"\\uC774 \\uD398\\uC774\\uC9C0\\uB294 \\uC5C6\\uB294 \\uD398\\uC774\\uC9C0\\uC785\\uB2C8\\uB2E4.\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: \"error-goto-btn\",\n    onClick: function onClick() {\n      window.location.href = \"/\";\n    }\n  }, \"Go To Home\")));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Error);\n\n//# sourceURL=webpack:///./frontend/src/screens/authenticated/Error/Error.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./frontend/src/screens/authenticated/Error/Error.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./frontend/src/screens/authenticated/Error/Error.css ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"#root {\\n  width: 100%;\\n  height: 100%;\\n}\\n#app {\\n  width: 100%;\\n  height: 100%;\\n}\\n\\n.error-page-con {\\n  width: 100%;\\n  height: 100%;\\n  background-size: 100%;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n.error-contents-con {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n}\\n.error-description {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  margin: 20px 0 10px;\\n}\\n.error-goto-btn {\\n  background-color: #5d4215;\\n  color: white;\\n  border: 0;\\n  padding: 5px 10px;\\n}\\n.error-goto-btn:hover {\\n  cursor: pointer;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./frontend/src/screens/authenticated/Error/Error.css?./node_modules/css-loader/dist/cjs.js");

/***/ })

}]);