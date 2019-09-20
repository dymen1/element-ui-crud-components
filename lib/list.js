module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("vuex-class");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("vue-class-component");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "vue-class-component"
var external_vue_class_component_ = __webpack_require__(1);
var external_vue_class_component_default = /*#__PURE__*/__webpack_require__.n(external_vue_class_component_);

// EXTERNAL MODULE: external "vuex-class"
var external_vuex_class_ = __webpack_require__(0);

// EXTERNAL MODULE: external "vuex"
var external_vuex_ = __webpack_require__(4);

// CONCATENATED MODULE: ./src/utils/getterTranslatorDecorator.js



function createBindingHelper(bindTo, mapFn) {
  function wrapper(getterName, getterFunction, filter) {
    return function () {
      let data = getterFunction.call(this);

      if (data instanceof String) {
        return this.$t(data);
      }

      if (data instanceof Array) {
        if (typeof filter !== 'function') {
          return data.map(value => this.$t(value));
        }

        return data.map(value => filter(this.$t, value));
      }

      throw Error('\'' + getterName + '\' didn\'t return a String or Array');
    };
  }

  function makeDecorator(map, namespace, filter) {
    return Object(external_vue_class_component_["createDecorator"])(function (componentOptions, key) {
      if (!componentOptions[bindTo]) {
        componentOptions[bindTo] = {};
      }

      let mapObject = (_a = {}, _a[key] = map, _a);
      componentOptions[bindTo][key] = namespace !== undefined ? wrapper(map, mapFn(namespace, mapObject)[key], filter) : wrapper(map, mapFn(mapObject)[key], filter);

      let _a;
    });
  }

  function helper(a, b) {
    if (typeof b === 'string') {
      let key = b;
      return makeDecorator(key, undefined)(a, key);
    }

    let namespace = extractNamespace(b);
    return makeDecorator(a, namespace, b);
  }

  return helper;
}

function extractNamespace(options) {
  let n = options && options.namespace;

  if (typeof n !== 'string') {
    return undefined;
  }

  if (n[n.length - 1] !== '/') {
    return n + '/';
  }

  return n;
}

/* harmony default export */ var getterTranslatorDecorator = (createBindingHelper('computed', external_vuex_["mapGetters"]));
// CONCATENATED MODULE: ./src/utils/class-component.js
/* concated harmony reexport default */__webpack_require__.d(__webpack_exports__, "a", function() { return external_vue_class_component_default.a; });
/* unused concated harmony import State */
/* unused concated harmony import Getter */
/* unused concated harmony import Action */
/* unused concated harmony import Mutation */
/* unused concated harmony import namespace */
/* unused concated harmony import GetterTranslator */



external_vue_class_component_default.a.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'asyncData', 'fetch', 'middleware', 'layout', 'transition', 'scrollToTop']);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(9).default
var update = add("3b197867", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(9).default
var update = add("421bc599", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("element-ui/packages/table/src/util.js");

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(27);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_vue_vue_type_style_index_0_id_049a15a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_vue_vue_type_style_index_0_id_049a15a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_vue_vue_type_style_index_0_id_049a15a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_vue_vue_type_style_index_0_id_049a15a6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(22);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(8)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// Module
exports.push([module.i, ".list[data-v-049a15a6]{margin-bottom:35px}.list .el-row[data-v-049a15a6]{margin-top:35px}.list .el-row .el-card .el-card__header div[data-v-049a15a6]{display:flex;justify-content:flex-start}.list .el-row .el-card .el-card__header div h2[data-v-049a15a6]{align-self:flex-end;margin:0}.list .el-row .el-card .el-card__header div .buttons[data-v-049a15a6]{flex-grow:1;justify-content:flex-end}.list .el-row .el-card .el-card__body .el-table-pagination[data-v-049a15a6]{padding-bottom:5px;padding-top:8px}.list .el-row .el-card .el-row.el-table-pagination[data-v-049a15a6]{margin-top:5px}.list .el-row .el-card .el-row[data-v-049a15a6]:first-child{margin-top:0px}.list .table-expand[data-v-049a15a6]{font-size:0}.list .table-expand label[data-v-049a15a6]{width:90px;color:#99a9bf}.list .table-expand .el-form-item[data-v-049a15a6]{margin-right:0;margin-bottom:0;width:50%}\n", ""]);



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_list_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(25);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(8)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// Module
exports.push([module.i, "\n.el-table .column-no-wrap .cell {\n  white-space: nowrap;\n}\n.rowActionColumn {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n}\n", ""]);



/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/list/src/list.vue?vue&type=template&id=049a15a6&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "list" },
    [
      _c(
        "el-row",
        { attrs: { type: "flex", justify: "center", gutter: 0 } },
        [
          _c(
            "el-card",
            { style: { width: _vm.listWidthPercentage + "%" } },
            [
              _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                _c("h2", [_vm._v(_vm._s(_vm.title))]),
                _c(
                  "div",
                  { staticClass: "buttons" },
                  [
                    _vm.hasAddButton
                      ? _c(
                          "nuxt-link",
                          {
                            attrs: {
                              to: _vm.addLink
                                ? _vm.addLink
                                : "/" + _vm.baseRoute + "/add"
                            }
                          },
                          [
                            _c("el-button", {
                              attrs: {
                                type: "primary",
                                title: _vm.$t("crud.buttonTitle.add"),
                                icon: "el-icon-plus",
                                circle: "",
                                size: "small"
                              }
                            })
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._l(_vm.extraTitleButtons, function(button) {
                      return [
                        (button.shouldRenderFn
                        ? button.shouldRenderFn(button)
                        : true)
                          ? _c("el-button", {
                              attrs: {
                                type: button.type ? button.type : "default",
                                size: _vm.buttonSize,
                                circle: _vm.useRoundButtons,
                                icon: button.icon
                                  ? button.icon
                                  : "el-icon-check"
                              },
                              on: {
                                click: function($event) {
                                  button.handler ? button.handler(button) : ""
                                }
                              }
                            })
                          : _vm._e()
                      ]
                    })
                  ],
                  2
                )
              ]),
              _c(
                "el-row",
                { staticClass: "el-table-pagination", attrs: { type: "flex" } },
                [
                  _c(
                    "el-col",
                    { attrs: { md: 16, lg: 18, xl: 20 } },
                    [
                      _c("el-pagination", {
                        attrs: {
                          background: "",
                          "current-page": _vm.pageOffset,
                          "page-sizes": _vm.pageSizes,
                          "page-size": _vm.pageSize,
                          layout: _vm.paginationLayout,
                          total: _vm.filteredListDataCount,
                          "hide-on-single-page": _vm.hasPagination
                        },
                        on: {
                          "size-change": _vm.handleSizeChange,
                          "current-change": _vm.handlePageChange
                        }
                      })
                    ],
                    1
                  ),
                  _c(
                    "el-col",
                    { attrs: { md: 8, lg: 6, xl: 4 } },
                    [
                      _vm.hasSearch
                        ? _c("el-input", {
                            ref: "search",
                            attrs: {
                              size: "mini",
                              autofocus: "",
                              placeholder: _vm.$t("crud.search")
                            },
                            model: {
                              value: _vm.searchInput,
                              callback: function($$v) {
                                _vm.searchInput = $$v
                              },
                              expression: "searchInput"
                            }
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              ),
              _c(
                "el-table",
                {
                  attrs: {
                    data: _vm.pagedListData,
                    "default-sort": _vm.defaultSort,
                    "row-class-name": _vm.rowClassNameGenerator,
                    border: "",
                    "tooltip-effect": "dark"
                  },
                  on: {
                    "selection-change": _vm.handleSelectionChange,
                    "sort-change": _vm.handleSortChange
                  }
                },
                [
                  _vm.showExpandColumn()
                    ? _c("el-table-column", {
                        attrs: { type: "expand" },
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c(
                                  "el-form",
                                  {
                                    staticClass: "table-expand",
                                    attrs: {
                                      "label-position": "left",
                                      inline: ""
                                    }
                                  },
                                  _vm._l(scope.row.expand, function(
                                    value,
                                    key
                                  ) {
                                    return _c(
                                      "el-form-item",
                                      {
                                        key: scope.row.id + value + key,
                                        attrs: {
                                          label:
                                            _vm.$t(_vm.plural + "." + key) + ":"
                                        }
                                      },
                                      [_c("span", [_vm._v(_vm._s(value))])]
                                    )
                                  }),
                                  1
                                )
                              ]
                            }
                          }
                        ])
                      })
                    : _vm._e(),
                  _vm._l(_vm.tableColumnsNames, function(value) {
                    return _vm.showColumns()
                      ? _c("el-table-column", {
                          key: "columns.id" + value + "columns." + value,
                          attrs: {
                            prop: "columns." + value,
                            label: _vm.$t(_vm.plural + "." + value),
                            "class-name": _vm.getCellClassName(value),
                            sortable: _vm.isSortableColumn(value),
                            filters: _vm.getColumnFilters(value),
                            "filter-method": _vm.getFilterMethod(value),
                            "filtered-value": _vm.getDefaultFiltered(value),
                            width: _vm.getColumnWidth(value),
                            "min-width": _vm.getColumnMinWidth(value),
                            formatter: _vm.getColumnFormatter(value)
                          }
                        })
                      : _vm._e()
                  }),
                  _vm.hasActionColumn
                    ? _c(
                        "el-table-column",
                        {
                          attrs: {
                            fixed: "right",
                            width: _vm.actionColumnWidth,
                            label: _vm.$t("crud.actions")
                          }
                        },
                        [
                          [
                            _c(
                              "el-button-group",
                              [
                                _vm.hasDetailButton
                                  ? _c("el-button", {
                                      attrs: {
                                        type: "primary",
                                        size: _vm.buttonSize,
                                        circle: _vm.useRoundButtons,
                                        title: _vm.$t(
                                          "crud.buttonTitle.detail"
                                        ),
                                        icon: "el-icon-search"
                                      },
                                      on: {
                                        click: function($event) {
                                          _vm.toChildPage(
                                            $event,
                                            _vm.scope.row.id,
                                            "detail"
                                          )
                                        }
                                      }
                                    })
                                  : _vm._e(),
                                _vm.hasEditButton
                                  ? _c("el-button", {
                                      attrs: {
                                        type: "primary",
                                        size: _vm.buttonSize,
                                        circle: _vm.useRoundButtons,
                                        title: _vm.$t("crud.buttonTitle.edit"),
                                        icon: "el-icon-edit"
                                      },
                                      on: {
                                        click: function($event) {
                                          _vm.toChildPage(
                                            $event,
                                            _vm.scope.row.id,
                                            "edit"
                                          )
                                        }
                                      }
                                    })
                                  : _vm._e(),
                                _vm._l(_vm.extraButtons, function(button) {
                                  return [
                                    (button.shouldRenderFn
                                    ? button.shouldRenderFn(_vm.scope.row)
                                    : true)
                                      ? _c("el-button", {
                                          attrs: {
                                            type: button.type
                                              ? button.type
                                              : "default",
                                            size: _vm.buttonSize,
                                            circle: _vm.useRoundButtons,
                                            icon: button.icon
                                              ? button.icon
                                              : "el-icon-check"
                                          },
                                          on: {
                                            click: function($event) {
                                              button.handler
                                                ? button.handler(
                                                    $event,
                                                    _vm.scope.row.id
                                                  )
                                                : ""
                                            }
                                          }
                                        })
                                      : _vm._e()
                                  ]
                                })
                              ],
                              2
                            )
                          ]
                        ],
                        2
                      )
                    : _vm._e()
                ],
                2
              ),
              _c(
                "el-row",
                { staticClass: "el-table-pagination" },
                [
                  _c(
                    "el-col",
                    { attrs: { md: 16, lg: 18, xl: 20 } },
                    [
                      _c("el-pagination", {
                        attrs: {
                          background: "",
                          "current-page": _vm.pageOffset,
                          "page-sizes": _vm.pageSizes,
                          "page-size": _vm.pageSize,
                          layout: _vm.paginationLayout,
                          total: _vm.filteredListDataCount,
                          "hide-on-single-page": _vm.hasPagination
                        },
                        on: {
                          "size-change": _vm.handleSizeChange,
                          "current-change": _vm.handlePageChange
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./packages/list/src/list.vue?vue&type=template&id=049a15a6&scoped=true&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(3);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: ./src/utils/class-component.js + 1 modules
var class_component = __webpack_require__(6);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: external "element-ui/packages/table/src/util.js"
var util_js_ = __webpack_require__(14);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./packages/list/src/list.vue?vue&type=script&lang=js&
var _dec, _class, _temp;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




let listvue_type_script_lang_js_List = (_dec = Object(class_component["a" /* default */])({
  props: {
    title: String,
    storeName: String,
    baseRoute: String,
    tableColumns: Array,
    expandTableColumns: Array,
    sortableColumns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultSorting: {
      type: Object,
      default: () => {
        return {};
      }
    },
    filterableColumns: {
      type: Object,
      default: () => {
        return {};
      }
    },
    rowClassNameGenerator: {
      type: Function,
      default: undefined
    },
    list: Array,
    hasSearch: {
      type: Boolean,
      default: true
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    hasActionColumn: {
      type: Boolean,
      default: true
    },
    actionColumnWidth: {
      type: Number,
      default: 152
    },
    listWidthPercentage: {
      type: Number,
      default: 90
    },
    useRoundButtons: {
      type: Boolean,
      default: true
    },
    buttonSize: {
      type: String,
      default: 'small'
    },
    hasEditButton: {
      type: Boolean,
      default: true
    },
    hasDetailButton: {
      type: Boolean,
      default: true
    },
    extraTitleButtons: {
      type: Array,
      default: () => {
        return [];
      }
    },
    extraButtons: {
      type: Array,
      default: () => {
        return [];
      }
    },
    hasAddButton: {
      type: Boolean,
      default: false
    },
    addLink: {
      type: String,
      default: undefined
    }
  }
}), _dec(_class = (_temp = class List extends external_vue_default.a {
  constructor(...args) {
    super(...args);
    this.selections = [];
    this.tableSort = {};
    this.tableFilters = {};
    this.defaultTableFilters = {};
    this.pageOffset = 1;
    this.pageSize = 15;
    this.pageSizes = [10, 15, 20, 50, 100];
    this.paginationLayout = 'total, sizes, prev, pager, next, jumper';
    this.searchInput = '';
  }

  /**
   * Gets the resource's plural, from it's store.
   * @returns String
   */
  get plural() {
    // return this.$store.getters[this.title.toLowerCase() + '/plural'];
    return this.$store.getters[this.storeName + '/plural'];
  }

  get defaultSort() {
    let defaultSort = this.defaultSorting;
    defaultSort.prop = 'columns.' + defaultSort.prop;
    this.tableSort = defaultSort;
    return defaultSort;
  }

  get tableColumnsNames() {
    return this.tableColumns.map(function (column) {
      return typeof column === typeof 'string' ? column : column.name;
    });
  }
  /**
   * Parses the passed list to the expected format.
   * @returns {Array}
   */


  get listData() {
    let data = [];
    if (!this.list) return [];
    this.list.forEach((entry, index) => {
      let row = {
        columns: undefined,
        expand: undefined
      };
      Object.entries(entry).forEach(([key, value]) => {
        // Add id if it's present
        if (key === 'id') {
          row.id = value;
          return;
        } // CHeck if the data should be auto formatted


        if (!this.getColumnFormatter(key)) {
          // auto format dates
          let date = external_moment_default()(value, external_moment_default.a.ISO_8601, true);
          if (date.isValid()) value = this.$d(date, 'long');
        } // Add value to filter


        if (this.isFilterableColumn(key)) {
          if (!(this.tableFilters[key] instanceof Array)) {
            this.tableFilters[key] = [];
            this.defaultTableFilters[key] = [];
          }

          let valueFilter = this.filterableColumns[key];
          let currentFilters = this.tableFilters[key];

          if (valueFilter instanceof Function) {
            valueFilter(currentFilters, value);
          } else if (valueFilter instanceof Object && valueFilter.hasOwnProperty("valueFilter")) {
            let valueFilterObject = valueFilter;
            valueFilter = valueFilterObject.valueFilter;
            valueFilter(currentFilters, value); // Set default filter

            if (valueFilterObject.hasOwnProperty("defaultFiltered")) {
              let defaultFiltered = valueFilterObject.defaultFiltered;

              if (defaultFiltered instanceof Function) {
                // Check for each value if it is a defaultFilter
                defaultFiltered(this.defaultTableFilters[key], value);
              } else if (this.defaultTableFilters[key].length !== defaultFiltered.length) {
                // set default only once if this isn't a callback
                this.defaultTableFilters[key] = defaultFiltered;
              }
            }
          } else {
            console.error("The values in the filter must be filtered of duplicates!");
          }
        } // Add to columns


        if (this.tableColumnsNames.includes(key)) {
          if (row.columns === undefined) row.columns = {};
          row.columns[key] = value;
          return;
        } // Add to expand columns


        if (this.expandTableColumns.includes(key)) {
          if (row.expand === undefined) row.expand = {};
          row.expand[key] = value;
          return;
        }
      });
      data[index] = row;
    });
    return data;
  }
  /**
   * filters the list to the expected size.
   * @returns {Array}
   */


  get sortedListData() {
    return Object.keys(this.tableSort).length === 0 ? this.listData : Object(util_js_["orderBy"])(this.listData, this.tableSort.prop, this.tableSort.order, this.tableSort.sortMethod, this.tableSort.sortBy);
  }
  /**
   * TODO: apply table filter before search
   * filters the list to according to the search query
   * @returns {Array}
   */


  get filteredListData() {
    let data = this.sortedListData;
    if (this.searchInput === '') return data;
    this.pageOffset = 1;
    return this.applySearchInput(data);
  }
  /**
   * Filters the list to the expected size.
   * @returns {Array}
   */


  get pagedListData() {
    let offset = this.pageSize * (this.pageOffset - 1);
    let set = this.pageSize * this.pageOffset;
    return this.filteredListData.slice(offset, set);
  }
  /**
   * Returns the number of rows in the filteredListData.
   * @returns {Number}
   */


  get filteredListDataCount() {
    return this.filteredListData.length;
  }
  /**
   * Check if the 'columns' property is set on the list's first row
   * @returns {boolean}
   */


  showColumns() {
    if (!this.listData[0]) return false;
    return this.listData[0].columns;
  }
  /**
   * Check if the 'expand' property is set on the list's first row
   * @returns {boolean}
   */


  showExpandColumn() {
    if (!this.listData[0]) return false;
    return this.listData[0].expand;
  }
  /**
   * Check if the given property is a sortable column
   * @returns {boolean}
   */


  isSortableColumn(property) {
    return this.sortableColumns.indexOf(property) !== -1;
  }
  /**
   * Check if the given property is a filterable column
   * @returns {boolean}
   */


  isFilterableColumn(property) {
    return this.filterableColumns[property] !== undefined;
  }
  /**
   * Enable filtering for the given property or return undefined
   * @returns {Array}
   */


  getColumnFilters(property) {
    if (!this.isFilterableColumn(property)) return undefined;
    return this.tableFilters[property];
  }
  /**
   * Get the filter method for the given property or return undefined
   * @returns {Function}
   */


  getFilterMethod(property) {
    if (!this.isFilterableColumn(property)) return undefined;
    let valueFilterObject = this.filterableColumns[property];
    if (!(valueFilterObject instanceof Object) || !valueFilterObject.hasOwnProperty("filterMethod")) return undefined;
    return valueFilterObject.filterMethod;
  }
  /**
   * Sets the default filter for the given property or return undefined
   * @returns {Array}
   */


  getDefaultFiltered(property) {
    if (!this.isFilterableColumn(property)) return undefined;
    return this.defaultTableFilters[property];
  }
  /**
   * TODO: implement
   * Handles the selection of a list's row
   * @param val {Object}
   */


  handleSelectionChange(val) {
    this.selections = val;
  }

  handleSortChange({
    column,
    prop,
    order
  }) {
    this.tableSort = {
      prop: prop,
      order: order,
      sortMethod: column.sortMethod,
      sortBy: column.sortBy
    };
  }

  handleSizeChange(newSize) {
    if (this.pageSize === newSize) return;
    this.pageSize = newSize;
  }

  handlePageChange(newOffset) {
    if (this.pageOffset === newOffset) return;
    this.pageOffset = newOffset;
  }
  /**
   * Filters the given data using the searchInput.
   * @param data {Array}
   * @returns {Array}
   */


  applySearchInput(data) {
    let matched = [];
    data.forEach(record => {
      let pushed = false;

      if (record.columns instanceof Object) {
        Object.values(record.columns).forEach(prop => {
          if (pushed) return;

          if (typeof prop !== typeof 'string') {
            if (prop === this.searchInput) {
              pushed = true;
              matched.push(record);
            }

            return;
          }

          if (prop.toLowerCase().indexOf(this.searchInput.toLowerCase()) === -1) return;
          pushed = true;
          matched.push(record);
        });
      }

      if (pushed) return;

      if (record.expand instanceof Object) {
        Object.values(record.expand).keys().forEach(prop => {
          if (prop.indexOf(this.searchInput) !== -1) matched.push(record);
        });
      }
    });
    return matched;
  }
  /**
   * Navigates to the given child page
   * @param event {Object}
   * @param id {Number}
   * @param childPage {string}
   */


  toChildPage(event, id, childPage = 'detail') {
    this.$router.push({
      path: id + '/' + childPage,
      append: true
    });
  }

  getColumnWidth(name) {
    let columnConfig = this.findObjectByName(name, this.tableColumns);
    if (!columnConfig instanceof Object || columnConfig === undefined) return;
    return columnConfig.width;
  }

  getColumnMinWidth(name) {
    let columnConfig = this.findObjectByName(name, this.tableColumns);
    if (!columnConfig instanceof Object || columnConfig === undefined) return;
    return columnConfig.minWidth;
  }

  getColumnFormatter(name) {
    let columnConfig = this.findObjectByName(name, this.tableColumns);
    if (!columnConfig instanceof Object || columnConfig === undefined) return;
    return columnConfig.formatter;
  }

  getCellClassName(name) {
    let columnConfig = this.findObjectByName(name, this.tableColumns);
    if (!columnConfig instanceof Object || columnConfig === undefined) return;
    return columnConfig.noWrap ? 'column-no-wrap' : '';
  }
  /**
   * find object by name
   * @param name {string}
   * @param array {Array}
   * @returns {Object}
   */


  findObjectByName(name, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name !== name) continue;
      return array[i];
    }
  }

}, _temp)) || _class);

// CONCATENATED MODULE: ./packages/list/src/list.vue?vue&type=script&lang=js&
 /* harmony default export */ var listvue_type_script_lang_js_ = (listvue_type_script_lang_js_List); 
// EXTERNAL MODULE: ./packages/list/src/list.vue?vue&type=style&index=0&id=049a15a6&lang=scss&scoped=true&
var listvue_type_style_index_0_id_049a15a6_lang_scss_scoped_true_ = __webpack_require__(20);

// EXTERNAL MODULE: ./packages/list/src/list.vue?vue&type=style&index=1&lang=css&
var listvue_type_style_index_1_lang_css_ = __webpack_require__(23);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(5);

// CONCATENATED MODULE: ./packages/list/src/list.vue







/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  listvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "049a15a6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/list/src/list.vue"
/* harmony default export */ var list = (component.exports);
// CONCATENATED MODULE: ./packages/list/index.js

/* istanbul ignore next */

list.install = function (Vue) {
  Vue.component(list.name, list);
};

/* harmony default export */ var packages_list = __webpack_exports__["default"] = (list);

/***/ })
/******/ ]);