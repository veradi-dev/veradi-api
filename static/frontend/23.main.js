(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{390:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n.n(o),u=n(391),i=n.n(u);n(465);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=p(t);if(e){var r=p(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return s(this,n)}}function s(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var y=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(c,t);var e,n,o,u=f(c);function c(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),(e=u.call(this,t)).modules={toolbar:[[{header:[1,2,!1]}],["bold","italic","underline","strike","blockquote"],[{list:"ordered"},{list:"bullet"},{indent:"-1"},{indent:"+1"}],[{align:[]},{color:[]},{background:[]}],["clean"]]},e.formats=["header","bold","italic","underline","strike","blockquote","list","bullet","indent","align","color","background"],e}return e=c,(n=[{key:"render",value:function(){var t=this.props,e=(t.value,t.onChange),n=(t.NoticeData,t.defaultValue);return r.a.createElement("div",{style:{height:"650px"}},r.a.createElement(i.a,{defaultValue:n,placeholder:"내용을 입력하세요",style:{height:"600px"},theme:"snow",modules:this.modules,formats:this.formats,onChange:function(t,n,o,r){return e(r.getHTML())}}))}}])&&l(e.prototype,n),o&&l(e,o),c}(o.Component);e.default=y}}]);