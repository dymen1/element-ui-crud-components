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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(9).default
var update = add("609dbf80", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 11 */,
/* 12 */,
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
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(26);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_a1b5ff34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_a1b5ff34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_a1b5ff34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_style_index_0_id_a1b5ff34_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(18);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(false);
// Module
exports.push([module.i, ".entity[data-v-a1b5ff34]{margin-bottom:35px}.entity .el-row[data-v-a1b5ff34]{margin-top:35px}.entity .el-row .el-card .el-row[data-v-a1b5ff34]:first-child{margin-top:0px}.entity .el-form-item__content>a+.el-button[data-v-a1b5ff34]{margin-left:10px}\n", ""]);



/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/form/src/form.vue?vue&type=template&id=a1b5ff34&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "entity" },
    [
      _c(
        "el-row",
        { attrs: { type: "flex", justify: "center", gutter: 0 } },
        [
          _c(
            "el-card",
            { staticStyle: { width: "90%" } },
            [
              _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                _c("span", [_vm._v(_vm._s(_vm.ucFirst(_vm.resource)))]),
                _vm.entity.id
                  ? _c("span", [_vm._v(" :: " + _vm._s(_vm.entity.id))])
                  : _vm._e()
              ]),
              _vm.entityData
                ? _c(
                    "el-form",
                    {
                      ref: "form",
                      attrs: {
                        model: _vm.entityData,
                        rules: _vm.rules,
                        "label-position": "left",
                        "label-width": "200px"
                      },
                      nativeOn: {
                        reset: function($event) {
                          return _vm.resetForm($event)
                        }
                      }
                    },
                    [
                      _vm._l(_vm.entityData, function(value, key) {
                        return [
                          _vm.hiddenInputs.includes(key)
                            ? _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.entityData[key],
                                    expression: "entityData[key]"
                                  }
                                ],
                                attrs: { type: "hidden", readonly: true },
                                domProps: { value: _vm.entityData[key] },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.entityData,
                                      key,
                                      $event.target.value
                                    )
                                  }
                                }
                              })
                            : !_vm.noInputs.includes(key)
                            ? _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    prop: key,
                                    label: _vm.$t(_vm.plural + "." + key) + ":"
                                  }
                                },
                                [
                                  _vm.selectConfig.hasOwnProperty(key)
                                    ? [
                                        _c(
                                          "el-select",
                                          {
                                            attrs: {
                                              multiple: value instanceof Array,
                                              disabled: _vm.readonly(key),
                                              filterable: "",
                                              "collapse-tags": !_vm.readonly(
                                                key
                                              )
                                            },
                                            model: {
                                              value: _vm.entityData[key],
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.entityData,
                                                  key,
                                                  $$v
                                                )
                                              },
                                              expression: "entityData[key]"
                                            }
                                          },
                                          _vm._l(
                                            _vm.selectOptions[key].options,
                                            function(item) {
                                              return _c("el-option", {
                                                key: item.value,
                                                attrs: {
                                                  value: item.value,
                                                  label: item.label
                                                }
                                              })
                                            }
                                          ),
                                          1
                                        )
                                      ]
                                    : [
                                        value instanceof Array
                                          ? _c("span", [
                                              _vm._v(
                                                '"' +
                                                  _vm._s(key) +
                                                  "\" can't be rendered as text input."
                                              )
                                            ])
                                          : _c("el-input", {
                                              attrs: {
                                                readonly: _vm.readonly(key)
                                              },
                                              model: {
                                                value: _vm.entityData[key],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.entityData,
                                                    key,
                                                    $$v
                                                  )
                                                },
                                                expression: "entityData[key]"
                                              }
                                            })
                                      ]
                                ],
                                2
                              )
                            : _vm._e()
                        ]
                      }),
                      _vm._t("default", null, {
                        entityData: _vm.entityData,
                        plural: _vm.plural
                      }),
                      _c(
                        "el-row",
                        [
                          _c(
                            "el-col",
                            { attrs: { span: 14 } },
                            [
                              _c(
                                "el-form-item",
                                [
                                  _c(
                                    "nuxt-link",
                                    {
                                      attrs: {
                                        to: _vm.backLink
                                          ? _vm.backLink
                                          : "/" + _vm.plural
                                      }
                                    },
                                    [
                                      _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            loading: _vm.goingBack,
                                            icon: "el-icon-back"
                                          },
                                          on: {
                                            click: function($event) {
                                              _vm.goingBack = true
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                  " +
                                              _vm._s(_vm.backButtonLabel) +
                                              "\n                "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm.readonly()
                                    ? _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            loading: _vm.submitting,
                                            icon: "el-icon-delete",
                                            type: "danger"
                                          },
                                          on: { click: _vm.deleteEntity }
                                        },
                                        [
                                          _vm._v(
                                            "\n                " +
                                              _vm._s(
                                                _vm.$t(
                                                  "crud.buttonLabel.delete",
                                                  {
                                                    resource: this.resource.toLowerCase()
                                                  }
                                                )
                                              ) +
                                              "\n              "
                                          )
                                        ]
                                      )
                                    : _vm._e(),
                                  !_vm.readonly()
                                    ? _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            loading: _vm.submitting,
                                            icon: "el-icon-upload",
                                            type: "primary"
                                          },
                                          on: { click: _vm.handleFormSubmit }
                                        },
                                        [
                                          _vm._v(
                                            "\n                " +
                                              _vm._s(_vm.persistButtonLabel) +
                                              "\n              "
                                          )
                                        ]
                                      )
                                    : _vm._e(),
                                  !_vm.readonly()
                                    ? _c(
                                        "el-button",
                                        {
                                          attrs: {
                                            "native-type": "reset",
                                            icon: "el-icon-circle-close",
                                            type: "warning"
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                " +
                                              _vm._s(
                                                _vm.$t("crud.buttonLabel.reset")
                                              ) +
                                              "\n              "
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _c(
                            "el-col",
                            { attrs: { span: 10 } },
                            [
                              _vm.extraButtons
                                ? _c(
                                    "el-form-item",
                                    { staticStyle: { "text-align": "right" } },
                                    [
                                      _vm._l(_vm.extraButtons, function(
                                        button
                                      ) {
                                        return [
                                          _c(
                                            "el-button",
                                            {
                                              attrs: {
                                                type: button.type
                                                  ? button.type
                                                  : "default"
                                              },
                                              on: {
                                                click: function($event) {
                                                  button.handler
                                                    ? button.handler($event)
                                                    : ""
                                                }
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "\n                  " +
                                                  _vm._s(_vm.$t(button.label)) +
                                                  "\n                "
                                              )
                                            ]
                                          )
                                        ]
                                      })
                                    ],
                                    2
                                  )
                                : _vm._e()
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    2
                  )
                : _c("h3", [_vm._v("No data")])
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


// CONCATENATED MODULE: ./packages/form/src/form.vue?vue&type=template&id=a1b5ff34&scoped=true&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(3);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: ./src/utils/class-component.js + 1 modules
var class_component = __webpack_require__(6);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(2);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./packages/form/src/form.vue?vue&type=script&lang=js&
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


 // TODO: validation astrix behind label

let formvue_type_script_lang_js_Form = (_dec = Object(class_component["a" /* default */])({
  props: {
    resource: String,
    backLink: {
      type: String,
      default: undefined
    },
    entity: Object,
    mode: {
      type: String,
      default: 'edit'
    },
    hiddenInputs: {
      type: Array,
      default: () => []
    },
    noInputs: {
      type: Array,
      default: () => []
    },
    readOnlyInputs: {
      type: Array,
      default: () => []
    },
    selectConfig: {
      type: Object,
      default: () => ({})
    },
    extraButtons: {
      type: Object,
      default: () => undefined
    }
  }
}), _dec(_class = (_temp = class Form extends external_vue_default.a {
  constructor(...args) {
    super(...args);
    this.goingBack = false;
    this.submitting = false;
    this.resetting = false;
    this.rules = {
      // TODO: move rules to props
      name: [{
        required: true,
        trigger: 'blur'
      }, //message: 'Please input Activity name',
      {
        min: 3,
        message: 'Needs to be > 3 characters',
        trigger: 'blur'
      }]
    };
    this.entityData = null;
  }

  // lifecycle hook
  mounted() {
    // We only need this to allow for a form reset...
    if (this.resetting) this.resetting = false;
    let data = {};
    if (!this.entity) return null;
    Object.entries(this.entity).forEach(([key, value]) => {
      // Don't add fields that we don't want to see
      switch (this.readonly()) {
        case true:
          if (['id'].includes(key)) return;
          break;

        case false:
          if (['id', 'createdAt', 'updatedAt'].includes(key)) return;
          break;
      } // format dates


      let date = external_moment_default()(value, external_moment_default.a.ISO_8601, true);
      if (date.isValid()) value = this.$d(date, 'long');
      data[key] = value;
    });
    this.entityData = data;
  }
  /**
   * Gets the form's selectOptions, this is done by using selectConfig to populate the options.
   * @returns String
   */


  get selectOptions() {
    let options = {}; // handle selectOptions

    Object.entries(this.selectConfig).forEach(([key, value]) => {
      if (value instanceof Array) {
        options[key] = {
          optionsFiltered: [],
          options: value
        };
        return;
      }

      if (typeof value === typeof 'string') {
        options[key] = {
          optionsFiltered: [],
          options: this.$store.getters[value + '/selectOptions'],
          method: query => {
            if (query !== '') {
              setTimeout(() => {
                options[key].optionsFiltered = options[key].options.filter(item => {
                  return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
              }, 200);
            } else {
              options[key].optionsFiltered = [];
            }
          }
        };
      }
    });
    return options;
  }
  /**
   * Gets the resource's plural, from it's store.
   * @returns String
   */


  get plural() {
    return this.$store.getters[this.resource.toLowerCase() + '/plural'];
  }
  /**
   * Returns true when mode is 'read'
   * Returns true when a key is given and is present in readOnlyInputs
   * @returns Boolean
   */


  readonly(key) {
    let isReadonly = this.mode === 'read';

    if (key && this.readOnlyInputs.includes(key)) {
      isReadonly = true;
    }

    return isReadonly;
  }
  /**
   * Returns the correct back button label
   * @returns String
   */


  get backButtonLabel() {
    switch (this.mode) {
      case 'read':
        return this.$t('crud.buttonLabel.back');

      case 'edit':
        return this.$t('crud.buttonLabel.cancel');

      case 'create':
        return this.$t('crud.buttonLabel.cancel');

      default:
        return this.$t('crud.buttonLabel.back');
    }
  }
  /**
   * Returns the correct persist button label
   * @returns String
   */


  get persistButtonLabel() {
    switch (this.mode) {
      case 'edit':
        return this.$t('crud.buttonLabel.update', {
          resource: this.resource.toLowerCase()
        });

      case 'create':
        return this.$t('crud.buttonLabel.create', {
          resource: this.resource.toLowerCase()
        });

      default:
        return this.$t('crud.buttonLabel.update');
    }
  }
  /**
   * Resets the form to it's original state.
   * @param event
   */


  resetForm(event) {
    // We only need this to allow for a form reset...
    this.resetting = true; // Actual form reset logic

    this.$refs.form.$children.forEach(formItem => {
      if (!formItem.prop) return;
      formItem.$children.forEach(input => {
        // Not an formItem with a input
        if (!input.$refs.input) {
          // And not a select with a input
          if (!input.$refs.reference.$refs.input) return;
        } // Has no setCurrentValue method


        if (!input.setCurrentValue || !input.clear) {
          // And has no setSelected method
          if (!input.setSelected) return;
        } // If we have entityData then set it, if not then clear


        if (this.entity) {
          formItem.resetField();
          return;
        }

        input.clear();
      });
    }); // We still want to prevent the default reset behavior

    if (event) event.preventDefault();
  }
  /**
   * TODO: allow overwrite via property
   * Handles form submit.
   * Validates the form and triggers a store dispatch.
   */


  handleFormSubmit() {
    this.submitting = true;
    this.$refs.form.validate(async valid => {
      try {
        if (valid) {
          let id;
          if (this.mode === 'edit') this.entityData.id = id = this.entity.id;
          let {
            entity,
            message
          } = await this.$store.dispatch(this.resource.toLowerCase() + '/persist', {
            data: this.entityData,
            id: id
          }); // TODO: display success message

          this.$router.push('/' + this.plural);
        }
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    });
  }
  /**
   * Triggers a store dispatch.
   */


  async deleteEntity() {
    this.submitting = true;

    try {
      let id = this.entity.id;
      let {
        message
      } = await this.$store.dispatch(this.resource.toLowerCase() + '/delete', id); // TODO: display success message

      this.$router.push('/' + this.plural);
    } catch (e) {
      this.$message.warning(e.message);
    } finally {
      this.submitting = false;
    }
  }
  /**
   * return the input with the first character as uppercase.
   * @param string
   * @returns {string}
   */


  ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}, _temp)) || _class);

// CONCATENATED MODULE: ./packages/form/src/form.vue?vue&type=script&lang=js&
 /* harmony default export */ var formvue_type_script_lang_js_ = (formvue_type_script_lang_js_Form); 
// EXTERNAL MODULE: ./packages/form/src/form.vue?vue&type=style&index=0&id=a1b5ff34&lang=scss&scoped=true&
var formvue_type_style_index_0_id_a1b5ff34_lang_scss_scoped_true_ = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(5);

// CONCATENATED MODULE: ./packages/form/src/form.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  formvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "a1b5ff34",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "packages/form/src/form.vue"
/* harmony default export */ var src_form = (component.exports);
// CONCATENATED MODULE: ./packages/form/index.js

/* istanbul ignore next */

src_form.install = function (Vue) {
  Vue.component(src_form.name, src_form);
};

/* harmony default export */ var packages_form = __webpack_exports__["default"] = (src_form);

/***/ })
/******/ ]);