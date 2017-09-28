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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Riot v3.6.1, @license MIT */
(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : factory(global.riot = global.riot || {});
})(this, function (exports) {
  'use strict';

  var __TAGS_CACHE = [];
  var __TAG_IMPL = {};
  var GLOBAL_MIXIN = '__global_mixin';
  var ATTRS_PREFIX = 'riot-';
  var REF_DIRECTIVES = ['ref', 'data-ref'];
  var IS_DIRECTIVE = 'data-is';
  var CONDITIONAL_DIRECTIVE = 'if';
  var LOOP_DIRECTIVE = 'each';
  var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
  var SHOW_DIRECTIVE = 'show';
  var HIDE_DIRECTIVE = 'hide';
  var RIOT_EVENTS_KEY = '__riot-events__';
  var T_STRING = 'string';
  var T_OBJECT = 'object';
  var T_UNDEF = 'undefined';
  var T_FUNCTION = 'function';
  var XLINK_NS = 'http://www.w3.org/1999/xlink';
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var XLINK_REGEX = /^xlink:(\w+)/;
  var WIN = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === T_UNDEF ? undefined : window;
  var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
  var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
  var RE_EVENTS_PREFIX = /^on/;
  var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
  var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
  var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
  var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
  var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

  /**
   * Check Check if the passed argument is undefined
   * @param   { String } value -
   * @returns { Boolean } -
   */
  function isBoolAttr(value) {
    return RE_BOOL_ATTRS.test(value);
  }

  /**
   * Check if passed argument is a function
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isFunction(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === T_FUNCTION;
  }

  /**
   * Check if passed argument is an object, exclude null
   * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isObject(value) {
    return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === T_OBJECT; // typeof null is 'object'
  }

  /**
   * Check if passed argument is undefined
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isUndefined(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === T_UNDEF;
  }

  /**
   * Check if passed argument is a string
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isString(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === T_STRING;
  }

  /**
   * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
   * @param { * } value -
   * @returns { Boolean } -
   */
  function isBlank(value) {
    return isUndefined(value) || value === null || value === '';
  }

  /**
   * Check if passed argument is a kind of array
   * @param   { * } value -
   * @returns { Boolean } -
   */
  function isArray(value) {
    return Array.isArray(value) || value instanceof Array;
  }

  /**
   * Check whether object's property could be overridden
   * @param   { Object }  obj - source object
   * @param   { String }  key - object property
   * @returns { Boolean } -
   */
  function isWritable(obj, key) {
    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
    return isUndefined(obj[key]) || descriptor && descriptor.writable;
  }

  /**
   * Check if passed argument is a reserved name
   * @param   { String } value -
   * @returns { Boolean } -
   */
  function isReservedName(value) {
    return RE_RESERVED_NAMES.test(value);
  }

  var check = Object.freeze({
    isBoolAttr: isBoolAttr,
    isFunction: isFunction,
    isObject: isObject,
    isUndefined: isUndefined,
    isString: isString,
    isBlank: isBlank,
    isArray: isArray,
    isWritable: isWritable,
    isReservedName: isReservedName
  });

  /**
   * Shorter and fast way to select multiple nodes in the DOM
   * @param   { String } selector - DOM selector
   * @param   { Object } ctx - DOM node where the targets of our search will is located
   * @returns { Object } dom nodes found
   */
  function $$(selector, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(selector));
  }

  /**
   * Shorter and fast way to select a single node in the DOM
   * @param   { String } selector - unique dom selector
   * @param   { Object } ctx - DOM node where the target of our search will is located
   * @returns { Object } dom node found
   */
  function $(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }

  /**
   * Create a document fragment
   * @returns { Object } document fragment
   */
  function createFrag() {
    return document.createDocumentFragment();
  }

  /**
   * Create a document text node
   * @returns { Object } create a text node to use as placeholder
   */
  function createDOMPlaceholder() {
    return document.createTextNode('');
  }

  /**
   * Check if a DOM node is an svg tag
   * @param   { HTMLElement }  el - node we want to test
   * @returns {Boolean} true if it's an svg node
   */
  function isSvg(el) {
    return !!el.ownerSVGElement;
  }

  /**
   * Create a generic DOM node
   * @param   { String } name - name of the DOM node we want to create
   * @param   { Boolean } isSvg - true if we need to use an svg node
   * @returns { Object } DOM node just created
   */
  function mkEl(name) {
    return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name);
  }

  /**
   * Set the inner html of any DOM node SVGs included
   * @param { Object } container - DOM node where we'll inject new html
   * @param { String } html - html to inject
   */
  /* istanbul ignore next */
  function setInnerHTML(container, html) {
    if (!isUndefined(container.innerHTML)) {
      container.innerHTML = html;
    }
    // some browsers do not support innerHTML on the SVGs tags
    else {
        var doc = new DOMParser().parseFromString(html, 'application/xml');
        var node = container.ownerDocument.importNode(doc.documentElement, true);
        container.appendChild(node);
      }
  }

  /**
   * Toggle the visibility of any DOM node
   * @param   { Object }  dom - DOM node we want to hide
   * @param   { Boolean } show - do we want to show it?
   */

  function toggleVisibility(dom, show) {
    dom.style.display = show ? '' : 'none';
    dom['hidden'] = show ? false : true;
  }

  /**
   * Remove any DOM attribute from a node
   * @param   { Object } dom - DOM node we want to update
   * @param   { String } name - name of the property we want to remove
   */
  function remAttr(dom, name) {
    dom.removeAttribute(name);
  }

  /**
   * Convert a style object to a string
   * @param   { Object } style - style object we need to parse
   * @returns { String } resulting css string
   * @example
   * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
   */
  function styleObjectToString(style) {
    return Object.keys(style).reduce(function (acc, prop) {
      return acc + " " + prop + ": " + style[prop] + ";";
    }, '');
  }

  /**
   * Get the value of any DOM attribute on a node
   * @param   { Object } dom - DOM node we want to parse
   * @param   { String } name - name of the attribute we want to get
   * @returns { String | undefined } name of the node attribute whether it exists
   */
  function getAttr(dom, name) {
    return dom.getAttribute(name);
  }

  /**
   * Set any DOM attribute
   * @param { Object } dom - DOM node we want to update
   * @param { String } name - name of the property we want to set
   * @param { String } val - value of the property we want to set
   */
  function setAttr(dom, name, val) {
    var xlink = XLINK_REGEX.exec(name);
    if (xlink && xlink[1]) {
      dom.setAttributeNS(XLINK_NS, xlink[1], val);
    } else {
      dom.setAttribute(name, val);
    }
  }

  /**
   * Insert safely a tag to fix #1962 #1649
   * @param   { HTMLElement } root - children container
   * @param   { HTMLElement } curr - node to insert
   * @param   { HTMLElement } next - node that should preceed the current node inserted
   */
  function safeInsert(root, curr, next) {
    root.insertBefore(curr, next.parentNode && next);
  }

  /**
   * Minimize risk: only zero or one _space_ between attr & value
   * @param   { String }   html - html string we want to parse
   * @param   { Function } fn - callback function to apply on any attribute found
   */
  function walkAttrs(html, fn) {
    if (!html) {
      return;
    }
    var m;
    while (m = RE_HTML_ATTRS.exec(html)) {
      fn(m[1].toLowerCase(), m[2] || m[3] || m[4]);
    }
  }

  /**
   * Walk down recursively all the children tags starting dom node
   * @param   { Object }   dom - starting node where we will start the recursion
   * @param   { Function } fn - callback to transform the child node just found
   * @param   { Object }   context - fn can optionally return an object, which is passed to children
   */
  function walkNodes(dom, fn, context) {
    if (dom) {
      var res = fn(dom, context);
      var next;
      // stop the recursion
      if (res === false) {
        return;
      }

      dom = dom.firstChild;

      while (dom) {
        next = dom.nextSibling;
        walkNodes(dom, fn, res);
        dom = next;
      }
    }
  }

  var dom = Object.freeze({
    $$: $$,
    $: $,
    createFrag: createFrag,
    createDOMPlaceholder: createDOMPlaceholder,
    isSvg: isSvg,
    mkEl: mkEl,
    setInnerHTML: setInnerHTML,
    toggleVisibility: toggleVisibility,
    remAttr: remAttr,
    styleObjectToString: styleObjectToString,
    getAttr: getAttr,
    setAttr: setAttr,
    safeInsert: safeInsert,
    walkAttrs: walkAttrs,
    walkNodes: walkNodes
  });

  var styleNode;
  var cssTextProp;
  var byName = {};
  var remainder = [];
  var needsInject = false;

  // skip the following code on the server
  if (WIN) {
    styleNode = function () {
      // create a new style element with the correct type
      var newNode = mkEl('style');
      setAttr(newNode, 'type', 'text/css');

      // replace any user node or insert the new one into the head
      var userNode = $('style[type=riot]');
      /* istanbul ignore next */
      if (userNode) {
        if (userNode.id) {
          newNode.id = userNode.id;
        }
        userNode.parentNode.replaceChild(newNode, userNode);
      } else {
        document.getElementsByTagName('head')[0].appendChild(newNode);
      }

      return newNode;
    }();
    cssTextProp = styleNode.styleSheet;
  }

  /**
   * Object that will be used to inject and manage the css of every tag instance
   */
  var styleManager = {
    styleNode: styleNode,
    /**
     * Save a tag style to be later injected into DOM
     * @param { String } css - css string
     * @param { String } name - if it's passed we will map the css to a tagname
     */
    add: function add(css, name) {
      if (name) {
        byName[name] = css;
      } else {
        remainder.push(css);
      }
      needsInject = true;
    },
    /**
     * Inject all previously saved tag styles into DOM
     * innerHTML seems slow: http://jsperf.com/riot-insert-style
     */
    inject: function inject() {
      if (!WIN || !needsInject) {
        return;
      }
      needsInject = false;
      var style = Object.keys(byName).map(function (k) {
        return byName[k];
      }).concat(remainder).join('\n');
      /* istanbul ignore next */
      if (cssTextProp) {
        cssTextProp.cssText = style;
      } else {
        styleNode.innerHTML = style;
      }
    }
  };

  /**
   * The riot template engine
   * @version v3.0.8
   */

  var skipRegex = function () {
    //eslint-disable-line no-unused-vars

    var beforeReChars = '[{(,;:?=|&!^~>%*/';

    var beforeReWords = ['case', 'default', 'do', 'else', 'in', 'instanceof', 'prefix', 'return', 'typeof', 'void', 'yield'];

    var wordsLastChar = beforeReWords.reduce(function (s, w) {
      return s + w.slice(-1);
    }, '');

    var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
    var RE_VN_CHAR = /[$\w]/;

    function prev(code, pos) {
      while (--pos >= 0 && /\s/.test(code[pos])) {}
      return pos;
    }

    function _skipRegex(code, start) {

      var re = /.*/g;
      var pos = re.lastIndex = start++;
      var match = re.exec(code)[0].match(RE_REGEX);

      if (match) {
        var next = pos + match[0].length;

        pos = prev(code, pos);
        var c = code[pos];

        if (pos < 0 || ~beforeReChars.indexOf(c)) {
          return next;
        }

        if (c === '.') {

          if (code[pos - 1] === '.') {
            start = next;
          }
        } else if (c === '+' || c === '-') {

          if (code[--pos] !== c || (pos = prev(code, pos)) < 0 || !RE_VN_CHAR.test(code[pos])) {
            start = next;
          }
        } else if (~wordsLastChar.indexOf(c)) {

          var end = pos + 1;

          while (--pos >= 0 && RE_VN_CHAR.test(code[pos])) {}
          if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
            start = next;
          }
        }
      }

      return start;
    }

    return _skipRegex;
  }();

  /**
   * riot.util.brackets
   *
   * - `brackets    ` - Returns a string or regex based on its parameter
   * - `brackets.set` - Change the current riot brackets
   *
   * @module
   */

  /* global riot */

  /* istanbul ignore next */
  var brackets = function (UNDEF) {

    var REGLOB = 'g',
        R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
        R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,
        S_QBLOCKS = R_STRINGS.source + '|' + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,
        UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),
        NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,
        S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,
        FINDBRACES = {
      '(': RegExp('([()])|' + S_QBLOCK2, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
      '{': RegExp('([{}])|' + S_QBLOCK2, REGLOB)
    },
        DEFAULT = '{ }';

    var _pairs = ['{', '}', '{', '}', /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB), DEFAULT, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/];

    var cachedBrackets = UNDEF,
        _regex,
        _cache = [],
        _settings;

    function _loopback(re) {
      return re;
    }

    function _rewrite(re, bp) {
      if (!bp) {
        bp = _cache;
      }
      return new RegExp(re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : '');
    }

    function _create(pair) {
      if (pair === DEFAULT) {
        return _pairs;
      }

      var arr = pair.split(' ');

      if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
        throw new Error('Unsupported brackets "' + pair + '"');
      }
      arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

      arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
      arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
      arr[6] = _rewrite(_pairs[6], arr);
      arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
      arr[8] = pair;
      return arr;
    }

    function _brackets(reOrIdx) {
      return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx];
    }

    _brackets.split = function split(str, tmpl, _bp) {
      // istanbul ignore next: _bp is for the compiler
      if (!_bp) {
        _bp = _cache;
      }

      var parts = [],
          match,
          isexpr,
          start,
          pos,
          re = _bp[6];

      var qblocks = [];
      var prevStr = '';
      var mark, lastIndex;

      isexpr = start = re.lastIndex = 0;

      while (match = re.exec(str)) {

        lastIndex = re.lastIndex;
        pos = match.index;

        if (isexpr) {

          if (match[2]) {

            var ch = match[2];
            var rech = FINDBRACES[ch];
            var ix = 1;

            rech.lastIndex = lastIndex;
            while (match = rech.exec(str)) {
              if (match[1]) {
                if (match[1] === ch) {
                  ++ix;
                } else if (! --ix) {
                  break;
                }
              } else {
                rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
              }
            }
            re.lastIndex = ix ? str.length : rech.lastIndex;
            continue;
          }

          if (!match[3]) {
            re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
            continue;
          }
        }

        if (!match[1]) {
          unescapeStr(str.slice(start, pos));
          start = re.lastIndex;
          re = _bp[6 + (isexpr ^= 1)];
          re.lastIndex = start;
        }
      }

      if (str && start < str.length) {
        unescapeStr(str.slice(start));
      }

      parts.qblocks = qblocks;

      return parts;

      function unescapeStr(s) {
        if (prevStr) {
          s = prevStr + s;
          prevStr = '';
        }
        if (tmpl || isexpr) {
          parts.push(s && s.replace(_bp[5], '$1'));
        } else {
          parts.push(s);
        }
      }

      function pushQBlock(_pos, _lastIndex, slash) {
        //eslint-disable-line
        if (slash) {
          _lastIndex = skipRegex(str, _pos);
        }

        if (tmpl && _lastIndex > _pos + 2) {
          mark = '\u2057' + qblocks.length + '~';
          qblocks.push(str.slice(_pos, _lastIndex));
          prevStr += str.slice(start, _pos) + mark;
          start = _lastIndex;
        }
        return _lastIndex;
      }
    };

    _brackets.hasExpr = function hasExpr(str) {
      return _cache[4].test(str);
    };

    _brackets.loopKeys = function loopKeys(expr) {
      var m = expr.match(_cache[9]);

      return m ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] } : { val: expr.trim() };
    };

    _brackets.array = function array(pair) {
      return pair ? _create(pair) : _cache;
    };

    function _reset(pair) {
      if ((pair || (pair = DEFAULT)) !== _cache[8]) {
        _cache = _create(pair);
        _regex = pair === DEFAULT ? _loopback : _rewrite;
        _cache[9] = _regex(_pairs[9]);
      }
      cachedBrackets = pair;
    }

    function _setSettings(o) {
      var b;

      o = o || {};
      b = o.brackets;
      Object.defineProperty(o, 'brackets', {
        set: _reset,
        get: function get() {
          return cachedBrackets;
        },
        enumerable: true
      });
      _settings = o;
      _reset(b);
    }

    Object.defineProperty(_brackets, 'settings', {
      set: _setSettings,
      get: function get() {
        return _settings;
      }
    });

    /* istanbul ignore next: in the browser riot is always in the scope */
    _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
    _brackets.set = _reset;
    _brackets.skipRegex = skipRegex;

    _brackets.R_STRINGS = R_STRINGS;
    _brackets.R_MLCOMMS = R_MLCOMMS;
    _brackets.S_QBLOCKS = S_QBLOCKS;
    _brackets.S_QBLOCK2 = S_QBLOCK2;

    return _brackets;
  }();

  /**
   * @module tmpl
   *
   * tmpl          - Root function, returns the template value, render with data
   * tmpl.hasExpr  - Test the existence of a expression inside a string
   * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
   */

  /* istanbul ignore next */
  var tmpl = function () {

    var _cache = {};

    function _tmpl(str, data) {
      if (!str) {
        return str;
      }

      return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr.bind({
        data: data,
        tmpl: str
      }));
    }

    _tmpl.hasExpr = brackets.hasExpr;

    _tmpl.loopKeys = brackets.loopKeys;

    // istanbul ignore next
    _tmpl.clearCache = function () {
      _cache = {};
    };

    _tmpl.errorHandler = null;

    function _logErr(err, ctx) {

      err.riotData = {
        tagName: ctx && ctx.__ && ctx.__.tagName,
        _riot_id: ctx && ctx._riot_id //eslint-disable-line camelcase
      };

      if (_tmpl.errorHandler) {
        _tmpl.errorHandler(err);
      } else if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(err.message);
        console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
        console.log(this.data); // eslint-disable-line
      }
    }

    function _create(str) {
      var expr = _getTmpl(str);

      if (expr.slice(0, 11) !== 'try{return ') {
        expr = 'return ' + expr;
      }

      return new Function('E', expr + ';'); // eslint-disable-line no-new-func
    }

    var RE_DQUOTE = /\u2057/g;
    var RE_QBMARK = /\u2057(\d+)~/g;

    function _getTmpl(str) {
      var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
      var qstr = parts.qblocks;
      var expr;

      if (parts.length > 2 || parts[0]) {
        var i,
            j,
            list = [];

        for (i = j = 0; i < parts.length; ++i) {

          expr = parts[i];

          if (expr && (expr = i & 1 ? _parseExpr(expr, 1, qstr) : '"' + expr.replace(/\\/g, '\\\\').replace(/\r\n?|\n/g, '\\n').replace(/"/g, '\\"') + '"')) {
            list[j++] = expr;
          }
        }

        expr = j < 2 ? list[0] : '[' + list.join(',') + '].join("")';
      } else {

        expr = _parseExpr(parts[1], 0, qstr);
      }

      if (qstr.length) {
        expr = expr.replace(RE_QBMARK, function (_, pos) {
          return qstr[pos].replace(/\r/g, '\\r').replace(/\n/g, '\\n');
        });
      }
      return expr;
    }

    var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
    var RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

    function _parseExpr(expr, asText, qstr) {

      expr = expr.replace(/\s+/g, ' ').trim().replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

      if (expr) {
        var list = [],
            cnt = 0,
            match;

        while (expr && (match = expr.match(RE_CSNAME)) && !match.index) {
          var key,
              jsb,
              re = /,|([[{(])|$/g;

          expr = RegExp.rightContext;
          key = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

          while (jsb = (match = re.exec(expr))[1]) {
            skipBraces(jsb, re);
          }

          jsb = expr.slice(0, match.index);
          expr = RegExp.rightContext;

          list[cnt++] = _wrapExpr(jsb, 1, key);
        }

        expr = !cnt ? _wrapExpr(expr, asText) : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
      }
      return expr;

      function skipBraces(ch, re) {
        var mm,
            lv = 1,
            ir = RE_BREND[ch];

        ir.lastIndex = re.lastIndex;
        while (mm = ir.exec(expr)) {
          if (mm[0] === ch) {
            ++lv;
          } else if (! --lv) {
            break;
          }
        }
        re.lastIndex = lv ? expr.length : ir.lastIndex;
      }
    }

    // istanbul ignore next: not both
    var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' ? 'global' : 'window') + ').',
        JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
        JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

    function _wrapExpr(expr, asText, key) {
      var tb;

      expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
        if (mvar) {
          pos = tb ? 0 : pos + match.length;

          if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
            match = p + '("' + mvar + JS_CONTEXT + mvar;
            if (pos) {
              tb = (s = s[pos]) === '.' || s === '(' || s === '[';
            }
          } else if (pos) {
            tb = !JS_NOPROPS.test(s.slice(pos));
          }
        }
        return match;
      });

      if (tb) {
        expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
      }

      if (key) {

        expr = (tb ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')') + '?"' + key + '":""';
      } else if (asText) {

        expr = 'function(v){' + (tb ? expr.replace('return ', 'v=') : 'v=(' + expr + ')') + ';return v||v===0?v:""}.call(this)';
      }

      return expr;
    }

    _tmpl.version = brackets.version = 'v3.0.8';

    return _tmpl;
  }();

  /* istanbul ignore next */
  var observable$1 = function observable$1(el) {

    /**
     * Extend the original object or create a new empty one
     * @type { Object }
     */

    el = el || {};

    /**
     * Private variables
     */
    var callbacks = {},
        slice = Array.prototype.slice;

    /**
     * Public Api
     */

    // extend the el object adding the observable methods
    Object.defineProperties(el, {
      /**
       * Listen to the given `event` ands
       * execute the `callback` each time an event is triggered.
       * @param  { String } event - event id
       * @param  { Function } fn - callback function
       * @returns { Object } el
       */
      on: {
        value: function value(event, fn) {
          if (typeof fn == 'function') {
            (callbacks[event] = callbacks[event] || []).push(fn);
          }
          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Removes the given `event` listeners
       * @param   { String } event - event id
       * @param   { Function } fn - callback function
       * @returns { Object } el
       */
      off: {
        value: function value(event, fn) {
          if (event == '*' && !fn) {
            callbacks = {};
          } else {
            if (fn) {
              var arr = callbacks[event];
              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
                if (cb == fn) {
                  arr.splice(i--, 1);
                }
              }
            } else {
              delete callbacks[event];
            }
          }
          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Listen to the given `event` and
       * execute the `callback` at most once
       * @param   { String } event - event id
       * @param   { Function } fn - callback function
       * @returns { Object } el
       */
      one: {
        value: function value(event, fn) {
          function on() {
            el.off(event, on);
            fn.apply(el, arguments);
          }
          return el.on(event, on);
        },
        enumerable: false,
        writable: false,
        configurable: false
      },

      /**
       * Execute all callback functions that listen to
       * the given `event`
       * @param   { String } event - event id
       * @returns { Object } el
       */
      trigger: {
        value: function value(event) {
          var arguments$1 = arguments;

          // getting the arguments
          var arglen = arguments.length - 1,
              args = new Array(arglen),
              fns,
              fn,
              i;

          for (i = 0; i < arglen; i++) {
            args[i] = arguments$1[i + 1]; // skip first argument
          }

          fns = slice.call(callbacks[event] || [], 0);

          for (i = 0; fn = fns[i]; ++i) {
            fn.apply(el, args);
          }

          if (callbacks['*'] && event != '*') {
            el.trigger.apply(el, ['*', event].concat(args));
          }

          return el;
        },
        enumerable: false,
        writable: false,
        configurable: false
      }
    });

    return el;
  };

  /**
   * Specialized function for looping an array-like collection with `each={}`
   * @param   { Array } list - collection of items
   * @param   {Function} fn - callback function
   * @returns { Array } the array looped
   */
  function each(list, fn) {
    var len = list ? list.length : 0;
    var i = 0;
    for (; i < len; ++i) {
      fn(list[i], i);
    }
    return list;
  }

  /**
   * Check whether an array contains an item
   * @param   { Array } array - target array
   * @param   { * } item - item to test
   * @returns { Boolean } -
   */
  function contains(array, item) {
    return array.indexOf(item) !== -1;
  }

  /**
   * Convert a string containing dashes to camel case
   * @param   { String } str - input string
   * @returns { String } my-string -> myString
   */
  function toCamel(str) {
    return str.replace(/-(\w)/g, function (_, c) {
      return c.toUpperCase();
    });
  }

  /**
   * Faster String startsWith alternative
   * @param   { String } str - source string
   * @param   { String } value - test string
   * @returns { Boolean } -
   */
  function startsWith(str, value) {
    return str.slice(0, value.length) === value;
  }

  /**
   * Helper function to set an immutable property
   * @param   { Object } el - object where the new property will be set
   * @param   { String } key - object key where the new property will be stored
   * @param   { * } value - value of the new property
   * @param   { Object } options - set the propery overriding the default options
   * @returns { Object } - the initial object
   */
  function defineProperty(el, key, value, options) {
    Object.defineProperty(el, key, extend({
      value: value,
      enumerable: false,
      writable: false,
      configurable: true
    }, options));
    return el;
  }

  /**
   * Extend any object with other properties
   * @param   { Object } src - source object
   * @returns { Object } the resulting extended object
   *
   * var obj = { foo: 'baz' }
   * extend(obj, {bar: 'bar', foo: 'bar'})
   * console.log(obj) => {bar: 'bar', foo: 'bar'}
   *
   */
  function extend(src) {
    var obj,
        args = arguments;
    for (var i = 1; i < args.length; ++i) {
      if (obj = args[i]) {
        for (var key in obj) {
          // check if this property of the source object could be overridden
          if (isWritable(src, key)) {
            src[key] = obj[key];
          }
        }
      }
    }
    return src;
  }

  var misc = Object.freeze({
    each: each,
    contains: contains,
    toCamel: toCamel,
    startsWith: startsWith,
    defineProperty: defineProperty,
    extend: extend
  });

  var settings$1 = extend(Object.create(brackets.settings), {
    skipAnonymousTags: true,
    // handle the auto updates on any DOM event
    autoUpdate: true
  });

  /**
   * Trigger DOM events
   * @param   { HTMLElement } dom - dom element target of the event
   * @param   { Function } handler - user function
   * @param   { Object } e - event object
   */
  function handleEvent(dom, handler, e) {
    var ptag = this.__.parent,
        item = this.__.item;

    if (!item) {
      while (ptag && !item) {
        item = ptag.__.item;
        ptag = ptag.__.parent;
      }
    }

    // override the event properties
    /* istanbul ignore next */
    if (isWritable(e, 'currentTarget')) {
      e.currentTarget = dom;
    }
    /* istanbul ignore next */
    if (isWritable(e, 'target')) {
      e.target = e.srcElement;
    }
    /* istanbul ignore next */
    if (isWritable(e, 'which')) {
      e.which = e.charCode || e.keyCode;
    }

    e.item = item;

    handler.call(this, e);

    // avoid auto updates
    if (!settings$1.autoUpdate) {
      return;
    }

    if (!e.preventUpdate) {
      var p = getImmediateCustomParentTag(this);
      // fixes #2083
      if (p.isMounted) {
        p.update();
      }
    }
  }

  /**
   * Attach an event to a DOM node
   * @param { String } name - event name
   * @param { Function } handler - event callback
   * @param { Object } dom - dom node
   * @param { Tag } tag - tag instance
   */
  function setEventHandler(name, handler, dom, tag) {
    var eventName,
        cb = handleEvent.bind(tag, dom, handler);

    // avoid to bind twice the same event
    // possible fix for #2332
    dom[name] = null;

    // normalize event name
    eventName = name.replace(RE_EVENTS_PREFIX, '');

    // cache the listener into the listeners array
    if (!contains(tag.__.listeners, dom)) {
      tag.__.listeners.push(dom);
    }
    if (!dom[RIOT_EVENTS_KEY]) {
      dom[RIOT_EVENTS_KEY] = {};
    }
    if (dom[RIOT_EVENTS_KEY][name]) {
      dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]);
    }

    dom[RIOT_EVENTS_KEY][name] = cb;
    dom.addEventListener(eventName, cb, false);
  }

  /**
   * Update dynamically created data-is tags with changing expressions
   * @param { Object } expr - expression tag and expression info
   * @param { Tag }    parent - parent for tag creation
   * @param { String } tagName - tag implementation we want to use
   */
  function updateDataIs(expr, parent, tagName) {
    var conf, isVirtual, head, ref;

    if (expr.tag && expr.tagName === tagName) {
      expr.tag.update();
      return;
    }

    isVirtual = expr.dom.tagName === 'VIRTUAL';
    // sync _parent to accommodate changing tagnames
    if (expr.tag) {
      // need placeholder before unmount
      if (isVirtual) {
        head = expr.tag.__.head;
        ref = createDOMPlaceholder();
        head.parentNode.insertBefore(ref, head);
      }

      expr.tag.unmount(true);
    }

    if (!isString(tagName)) {
      return;
    }

    expr.impl = __TAG_IMPL[tagName];
    conf = { root: expr.dom, parent: parent, hasImpl: true, tagName: tagName };
    expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
    each(expr.attrs, function (a) {
      return setAttr(expr.tag.root, a.name, a.value);
    });
    expr.tagName = tagName;
    expr.tag.mount();
    if (isVirtual) {
      makeReplaceVirtual(expr.tag, ref || expr.tag.root);
    } // root exist first time, after use placeholder

    // parent is the placeholder tag, not the dynamic tag so clean up
    parent.__.onUnmount = function () {
      var delName = expr.tag.opts.dataIs,
          tags = expr.tag.parent.tags,
          _tags = expr.tag.__.parent.tags;
      arrayishRemove(tags, delName, expr.tag);
      arrayishRemove(_tags, delName, expr.tag);
      expr.tag.unmount();
    };
  }

  /**
   * Nomalize any attribute removing the "riot-" prefix
   * @param   { String } attrName - original attribute name
   * @returns { String } valid html attribute name
   */
  function normalizeAttrName(attrName) {
    if (!attrName) {
      return null;
    }
    attrName = attrName.replace(ATTRS_PREFIX, '');
    if (CASE_SENSITIVE_ATTRIBUTES[attrName]) {
      attrName = CASE_SENSITIVE_ATTRIBUTES[attrName];
    }
    return attrName;
  }

  /**
   * Update on single tag expression
   * @this Tag
   * @param { Object } expr - expression logic
   * @returns { undefined }
   */
  function updateExpression(expr) {
    if (this.root && getAttr(this.root, 'virtualized')) {
      return;
    }

    var dom = expr.dom,

    // remove the riot- prefix
    attrName = normalizeAttrName(expr.attr),
        isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
        isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
        parent = dom && (expr.parent || dom.parentNode),

    // detect the style attributes
    isStyleAttr = attrName === 'style',
        isClassAttr = attrName === 'class',
        hasValue,
        isObj,
        value;

    // if it's a tag we could totally skip the rest
    if (expr._riot_id) {
      if (expr.isMounted) {
        expr.update();
        // if it hasn't been mounted yet, do that now.
      } else {
        expr.mount();
        if (isVirtual) {
          makeReplaceVirtual(expr, expr.root);
        }
      }
      return;
    }
    // if this expression has the update method it means it can handle the DOM changes by itself
    if (expr.update) {
      return expr.update();
    }

    // ...it seems to be a simple expression so we try to calculat its value
    value = tmpl(expr.expr, isToggle ? extend({}, Object.create(this.parent), this) : this);
    hasValue = !isBlank(value);
    isObj = isObject(value);

    // convert the style/class objects to strings
    if (isObj) {
      isObj = !isClassAttr && !isStyleAttr;
      if (isClassAttr) {
        value = tmpl(JSON.stringify(value), this);
      } else if (isStyleAttr) {
        value = styleObjectToString(value);
      }
    }

    // remove original attribute
    if (expr.attr && (!expr.isAttrRemoved || !hasValue || value === false)) {
      remAttr(dom, expr.attr);
      expr.isAttrRemoved = true;
    }

    // for the boolean attributes we don't need the value
    // we can convert it to checked=true to checked=checked
    if (expr.bool) {
      value = value ? attrName : false;
    }
    if (expr.isRtag) {
      return updateDataIs(expr, this, value);
    }
    if (expr.wasParsedOnce && expr.value === value) {
      return;
    }

    // update the expression value
    expr.value = value;
    expr.wasParsedOnce = true;

    // if the value is an object we can not do much more with it
    if (isObj && !isToggle) {
      return;
    }
    // avoid to render undefined/null values
    if (isBlank(value)) {
      value = '';
    }

    // textarea and text nodes have no attribute name
    if (!attrName) {
      // about #815 w/o replace: the browser converts the value to a string,
      // the comparison by "==" does too, but not in the server
      value += '';
      // test for parent avoids error with invalid assignment to nodeValue
      if (parent) {
        // cache the parent node because somehow it will become null on IE
        // on the next iteration
        expr.parent = parent;
        if (parent.tagName === 'TEXTAREA') {
          parent.value = value; // #1113
          if (!IE_VERSION) {
            dom.nodeValue = value;
          } // #1625 IE throws here, nodeValue
        } // will be available on 'updated'
        else {
            dom.nodeValue = value;
          }
      }
      return;
    }

    // event handler
    if (isFunction(value)) {
      setEventHandler(attrName, value, dom, this);
      // show / hide
    } else if (isToggle) {
      toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
      // handle attributes
    } else {
      if (expr.bool) {
        dom[attrName] = value;
      }

      if (attrName === 'value' && dom.value !== value) {
        dom.value = value;
      }

      if (hasValue && value !== false) {
        setAttr(dom, attrName, value);
      }

      // make sure that in case of style changes
      // the element stays hidden
      if (isStyleAttr && dom.hidden) {
        toggleVisibility(dom, false);
      }
    }
  }

  /**
   * Update all the expressions in a Tag instance
   * @this Tag
   * @param { Array } expressions - expression that must be re evaluated
   */
  function updateAllExpressions(expressions) {
    each(expressions, updateExpression.bind(this));
  }

  var IfExpr = {
    init: function init(dom, tag, expr) {
      remAttr(dom, CONDITIONAL_DIRECTIVE);
      this.tag = tag;
      this.expr = expr;
      this.stub = createDOMPlaceholder();
      this.pristine = dom;

      var p = dom.parentNode;
      p.insertBefore(this.stub, dom);
      p.removeChild(dom);

      return this;
    },
    update: function update() {
      this.value = tmpl(this.expr, this.tag);

      if (this.value && !this.current) {
        // insert
        this.current = this.pristine.cloneNode(true);
        this.stub.parentNode.insertBefore(this.current, this.stub);
        this.expressions = [];
        parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
      } else if (!this.value && this.current) {
        // remove
        unmountAll(this.expressions);
        if (this.current._tag) {
          this.current._tag.unmount();
        } else if (this.current.parentNode) {
          this.current.parentNode.removeChild(this.current);
        }
        this.current = null;
        this.expressions = [];
      }

      if (this.value) {
        updateAllExpressions.call(this.tag, this.expressions);
      }
    },
    unmount: function unmount() {
      unmountAll(this.expressions || []);
    }
  };

  var RefExpr = {
    init: function init(dom, parent, attrName, attrValue) {
      this.dom = dom;
      this.attr = attrName;
      this.rawValue = attrValue;
      this.parent = parent;
      this.hasExp = tmpl.hasExpr(attrValue);
      return this;
    },
    update: function update() {
      var old = this.value;
      var customParent = this.parent && getImmediateCustomParentTag(this.parent);
      // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
      var tagOrDom = this.dom.__ref || this.tag || this.dom;

      this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

      // the name changed, so we need to remove it from the old key (if present)
      if (!isBlank(old) && customParent) {
        arrayishRemove(customParent.refs, old, tagOrDom);
      }
      if (!isBlank(this.value) && isString(this.value)) {
        // add it to the refs of parent tag (this behavior was changed >=3.0)
        if (customParent) {
          arrayishAdd(customParent.refs, this.value, tagOrDom,
          // use an array if it's a looped node and the ref is not an expression
          null, this.parent.__.index);
        }

        if (this.value !== old) {
          setAttr(this.dom, this.attr, this.value);
        }
      } else {
        remAttr(this.dom, this.attr);
      }

      // cache the ref bound to this dom node
      // to reuse it in future (see also #2329)
      if (!this.dom.__ref) {
        this.dom.__ref = tagOrDom;
      }
    },
    unmount: function unmount() {
      var tagOrDom = this.tag || this.dom;
      var customParent = this.parent && getImmediateCustomParentTag(this.parent);
      if (!isBlank(this.value) && customParent) {
        arrayishRemove(customParent.refs, this.value, tagOrDom);
      }
    }
  };

  /**
   * Convert the item looped into an object used to extend the child tag properties
   * @param   { Object } expr - object containing the keys used to extend the children tags
   * @param   { * } key - value to assign to the new object returned
   * @param   { * } val - value containing the position of the item in the array
   * @param   { Object } base - prototype object for the new item
   * @returns { Object } - new object containing the values of the original item
   *
   * The variables 'key' and 'val' are arbitrary.
   * They depend on the collection type looped (Array, Object)
   * and on the expression used on the each tag
   *
   */
  function mkitem(expr, key, val, base) {
    var item = base ? Object.create(base) : {};
    item[expr.key] = key;
    if (expr.pos) {
      item[expr.pos] = val;
    }
    return item;
  }

  /**
   * Unmount the redundant tags
   * @param   { Array } items - array containing the current items to loop
   * @param   { Array } tags - array containing all the children tags
   */
  function unmountRedundant(items, tags) {
    var i = tags.length,
        j = items.length;

    while (i > j) {
      i--;
      remove.apply(tags[i], [tags, i]);
    }
  }

  /**
   * Remove a child tag
   * @this Tag
   * @param   { Array } tags - tags collection
   * @param   { Number } i - index of the tag to remove
   */
  function remove(tags, i) {
    tags.splice(i, 1);
    this.unmount();
    arrayishRemove(this.parent, this, this.__.tagName, true);
  }

  /**
   * Move the nested custom tags in non custom loop tags
   * @this Tag
   * @param   { Number } i - current position of the loop tag
   */
  function moveNestedTags(i) {
    var this$1 = this;

    each(Object.keys(this.tags), function (tagName) {
      moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
    });
  }

  /**
   * Move a child tag
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */
  function move(root, nextTag, isVirtual) {
    if (isVirtual) {
      moveVirtual.apply(this, [root, nextTag]);
    } else {
      safeInsert(root, this.root, nextTag.root);
    }
  }

  /**
   * Insert and mount a child tag
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */
  function insert(root, nextTag, isVirtual) {
    if (isVirtual) {
      makeVirtual.apply(this, [root, nextTag]);
    } else {
      safeInsert(root, this.root, nextTag.root);
    }
  }

  /**
   * Append a new tag into the DOM
   * @this Tag
   * @param   { HTMLElement } root - dom node containing all the loop children
   * @param   { Boolean } isVirtual - is it a virtual tag?
   */
  function append(root, isVirtual) {
    if (isVirtual) {
      makeVirtual.call(this, root);
    } else {
      root.appendChild(this.root);
    }
  }

  /**
   * Manage tags having the 'each'
   * @param   { HTMLElement } dom - DOM node we need to loop
   * @param   { Tag } parent - parent tag instance where the dom node is contained
   * @param   { String } expr - string contained in the 'each' attribute
   * @returns { Object } expression object for this each loop
   */
  function _each(dom, parent, expr) {

    // remove the each property from the original tag
    remAttr(dom, LOOP_DIRECTIVE);

    var mustReorder = _typeof(getAttr(dom, LOOP_NO_REORDER_DIRECTIVE)) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
        tagName = getTagName(dom),
        impl = __TAG_IMPL[tagName],
        parentNode = dom.parentNode,
        placeholder = createDOMPlaceholder(),
        child = getTag(dom),
        ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
        tags = [],
        oldItems = [],
        hasKeys,
        isLoop = true,
        isAnonymous = !__TAG_IMPL[tagName],
        isVirtual = dom.tagName === 'VIRTUAL';

    // parse the each expression
    expr = tmpl.loopKeys(expr);
    expr.isLoop = true;

    if (ifExpr) {
      remAttr(dom, CONDITIONAL_DIRECTIVE);
    }

    // insert a marked where the loop tags will be injected
    parentNode.insertBefore(placeholder, dom);
    parentNode.removeChild(dom);

    expr.update = function updateEach() {
      // get the new items collection
      expr.value = tmpl(expr.val, parent);

      var frag = createFrag(),
          items = expr.value,
          isObject$$1 = !isArray(items) && !isString(items),
          root = placeholder.parentNode;

      // if this DOM was removed the update here is useless
      // this condition fixes also a weird async issue on IE in our unit test
      if (!root) {
        return;
      }

      // object loop. any changes cause full redraw
      if (isObject$$1) {
        hasKeys = items || false;
        items = hasKeys ? Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key);
        }) : [];
      } else {
        hasKeys = false;
      }

      if (ifExpr) {
        items = items.filter(function (item, i) {
          if (expr.key && !isObject$$1) {
            return !!tmpl(ifExpr, mkitem(expr, item, i, parent));
          }

          return !!tmpl(ifExpr, extend(Object.create(parent), item));
        });
      }

      // loop all the new items
      each(items, function (item, i) {
        // reorder only if the items are objects
        var doReorder = mustReorder && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === T_OBJECT && !hasKeys,
            oldPos = oldItems.indexOf(item),
            isNew = oldPos === -1,
            pos = !isNew && doReorder ? oldPos : i,

        // does a tag exist in this position?
        tag = tags[pos],
            mustAppend = i >= oldItems.length,
            mustCreate = doReorder && isNew || !doReorder && !tag;

        item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

        // new tag
        if (mustCreate) {
          tag = new Tag$1(impl, {
            parent: parent,
            isLoop: isLoop,
            isAnonymous: isAnonymous,
            tagName: tagName,
            root: dom.cloneNode(isAnonymous),
            item: item,
            index: i
          }, dom.innerHTML);

          // mount the tag
          tag.mount();

          if (mustAppend) {
            append.apply(tag, [frag || root, isVirtual]);
          } else {
            insert.apply(tag, [root, tags[i], isVirtual]);
          }

          if (!mustAppend) {
            oldItems.splice(i, 0, item);
          }
          tags.splice(i, 0, tag);
          if (child) {
            arrayishAdd(parent.tags, tagName, tag, true);
          }
        } else if (pos !== i && doReorder) {
          // move
          if (contains(items, oldItems[pos])) {
            move.apply(tag, [root, tags[i], isVirtual]);
            // move the old tag instance
            tags.splice(i, 0, tags.splice(pos, 1)[0]);
            // move the old item
            oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
          }

          // update the position attribute if it exists
          if (expr.pos) {
            tag[expr.pos] = i;
          }

          // if the loop tags are not custom
          // we need to move all their custom tags into the right position
          if (!child && tag.tags) {
            moveNestedTags.call(tag, i);
          }
        }

        // cache the original item to use it in the events bound to this node
        // and its children
        tag.__.item = item;
        tag.__.index = i;
        tag.__.parent = parent;

        if (!mustCreate) {
          tag.update(item);
        }
      });

      // remove the redundant tags
      unmountRedundant(items, tags);

      // clone the items array
      oldItems = items.slice();

      // this condition is weird u
      root.insertBefore(frag, placeholder);
    };

    expr.unmount = function () {
      each(tags, function (t) {
        t.unmount();
      });
    };

    return expr;
  }

  /**
   * Walk the tag DOM to detect the expressions to evaluate
   * @this Tag
   * @param   { HTMLElement } root - root tag where we will start digging the expressions
   * @param   { Array } expressions - empty array where the expressions will be added
   * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
   * @returns { Object } an object containing the root noode and the dom tree
   */
  function parseExpressions(root, expressions, mustIncludeRoot) {
    var this$1 = this;

    var tree = { parent: { children: expressions } };

    walkNodes(root, function (dom, ctx) {
      var type = dom.nodeType,
          parent = ctx.parent,
          attr,
          expr,
          tagImpl;
      if (!mustIncludeRoot && dom === root) {
        return { parent: parent };
      }

      // text node
      if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue)) {
        parent.children.push({ dom: dom, expr: dom.nodeValue });
      }

      if (type !== 1) {
        return ctx;
      } // not an element

      var isVirtual = dom.tagName === 'VIRTUAL';

      // loop. each does it's own thing (for now)
      if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
        if (isVirtual) {
          setAttr(dom, 'loopVirtual', true);
        } // ignore here, handled in _each
        parent.children.push(_each(dom, this$1, attr));
        return false;
      }

      // if-attrs become the new parent. Any following expressions (either on the current
      // element, or below it) become children of this expression.
      if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
        parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
        return false;
      }

      if (expr = getAttr(dom, IS_DIRECTIVE)) {
        if (tmpl.hasExpr(expr)) {
          parent.children.push({ isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes) });
          return false;
        }
      }

      // if this is a tag, stop traversing here.
      // we ignore the root, since parseExpressions is called while we're mounting that root
      tagImpl = getTag(dom);
      if (isVirtual) {
        if (getAttr(dom, 'virtualized')) {
          dom.parentElement.removeChild(dom);
        } // tag created, remove from dom
        if (!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual')) // ok to create virtual tag
          {
            tagImpl = { tmpl: dom.outerHTML };
          }
      }

      if (tagImpl && (dom !== root || mustIncludeRoot)) {
        if (isVirtual && !getAttr(dom, IS_DIRECTIVE)) {
          // handled in update
          // can not remove attribute like directives
          // so flag for removal after creation to prevent maximum stack error
          setAttr(dom, 'virtualized', true);

          var tag = new Tag$1({ tmpl: dom.outerHTML }, { root: dom, parent: this$1 }, dom.innerHTML);
          parent.children.push(tag); // no return, anonymous tag, keep parsing
        } else {
          var conf = { root: dom, parent: this$1, hasImpl: true };
          parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
          return false;
        }
      }

      // attribute expressions
      parseAttributes.apply(this$1, [dom, dom.attributes, function (attr, expr) {
        if (!expr) {
          return;
        }
        parent.children.push(expr);
      }]);

      // whatever the parent is, all child elements get the same parent.
      // If this element had an if-attr, that's the parent for all child elements
      return { parent: parent };
    }, tree);
  }

  /**
   * Calls `fn` for every attribute on an element. If that attr has an expression,
   * it is also passed to fn.
   * @this Tag
   * @param   { HTMLElement } dom - dom node to parse
   * @param   { Array } attrs - array of attributes
   * @param   { Function } fn - callback to exec on any iteration
   */
  function parseAttributes(dom, attrs, fn) {
    var this$1 = this;

    each(attrs, function (attr) {
      if (!attr) {
        return false;
      }

      var name = attr.name,
          bool = isBoolAttr(name),
          expr;

      if (contains(REF_DIRECTIVES, name)) {
        expr = Object.create(RefExpr).init(dom, this$1, name, attr.value);
      } else if (tmpl.hasExpr(attr.value)) {
        expr = { dom: dom, expr: attr.value, attr: name, bool: bool };
      }

      fn(attr, expr);
    });
  }

  /*
    Includes hacks needed for the Internet Explorer version 9 and below
    See: http://kangax.github.io/compat-table/es5/#ie8
         http://codeplanet.io/dropping-ie8/
  */

  var reHasYield = /<yield\b/i;
  var reYieldAll = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
  var reYieldSrc = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
  var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
  var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
  var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
  var GENERIC = 'div';
  var SVG = 'svg';

  /*
    Creates the root element for table or select child elements:
    tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
  */
  function specialTags(el, tmpl, tagName) {

    var select = tagName[0] === 'o',
        parent = select ? 'select>' : 'table>';

    // trim() is important here, this ensures we don't have artifacts,
    // so we can check if we have only one element inside the parent
    el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
    parent = el.firstChild;

    // returns the immediate parent if tr/th/td/col is the only element, if not
    // returns the whole tree, as this can include additional elements
    /* istanbul ignore next */
    if (select) {
      parent.selectedIndex = -1; // for IE9, compatible w/current riot behavior
    } else {
      // avoids insertion of cointainer inside container (ex: tbody inside tbody)
      var tname = rootEls[tagName];
      if (tname && parent.childElementCount === 1) {
        parent = $(tname, parent);
      }
    }
    return parent;
  }

  /*
    Replace the yield tag from any tag template with the innerHTML of the
    original tag in the page
  */
  function replaceYield(tmpl, html) {
    // do nothing if no yield
    if (!reHasYield.test(tmpl)) {
      return tmpl;
    }

    // be careful with #1343 - string on the source having `$1`
    var src = {};

    html = html && html.replace(reYieldSrc, function (_, ref, text) {
      src[ref] = src[ref] || text; // preserve first definition
      return '';
    }).trim();

    return tmpl.replace(reYieldDest, function (_, ref, def) {
      // yield with from - to attrs
      return src[ref] || def || '';
    }).replace(reYieldAll, function (_, def) {
      // yield without any "from"
      return html || def || '';
    });
  }

  /**
   * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
   * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
   *
   * @param   { String } tmpl  - The template coming from the custom tag definition
   * @param   { String } html - HTML content that comes from the DOM element where you
   *           will mount the tag, mostly the original tag in the page
   * @param   { Boolean } isSvg - true if the root node is an svg
   * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
   */
  function mkdom(tmpl, html, isSvg$$1) {
    var match = tmpl && tmpl.match(/^\s*<([-\w]+)/),
        tagName = match && match[1].toLowerCase(),
        el = mkEl(isSvg$$1 ? SVG : GENERIC);

    // replace all the yield tags with the tag inner html
    tmpl = replaceYield(tmpl, html);

    /* istanbul ignore next */
    if (tblTags.test(tagName)) {
      el = specialTags(el, tmpl, tagName);
    } else {
      setInnerHTML(el, tmpl);
    }

    return el;
  }

  /**
   * Another way to create a riot tag a bit more es6 friendly
   * @param { HTMLElement } el - tag DOM selector or DOM node/s
   * @param { Object } opts - tag logic
   * @returns { Tag } new riot tag instance
   */
  function Tag$2(el, opts) {
    // get the tag properties from the class constructor
    var ref = this;
    var name = ref.name;
    var tmpl = ref.tmpl;
    var css = ref.css;
    var attrs = ref.attrs;
    var onCreate = ref.onCreate;
    // register a new tag and cache the class prototype
    if (!__TAG_IMPL[name]) {
      tag$1(name, tmpl, css, attrs, onCreate);
      // cache the class constructor
      __TAG_IMPL[name].class = this.constructor;
    }

    // mount the tag using the class instance
    mountTo(el, name, opts, this);
    // inject the component css
    if (css) {
      styleManager.inject();
    }

    return this;
  }

  /**
   * Create a new riot tag implementation
   * @param   { String }   name - name/id of the new riot tag
   * @param   { String }   tmpl - tag template
   * @param   { String }   css - custom tag css
   * @param   { String }   attrs - root tag attributes
   * @param   { Function } fn - user function
   * @returns { String } name/id of the tag just created
   */
  function tag$1(name, tmpl, css, attrs, fn) {
    if (isFunction(attrs)) {
      fn = attrs;

      if (/^[\w\-]+\s?=/.test(css)) {
        attrs = css;
        css = '';
      } else {
        attrs = '';
      }
    }

    if (css) {
      if (isFunction(css)) {
        fn = css;
      } else {
        styleManager.add(css);
      }
    }

    name = name.toLowerCase();
    __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

    return name;
  }

  /**
   * Create a new riot tag implementation (for use by the compiler)
   * @param   { String }   name - name/id of the new riot tag
   * @param   { String }   tmpl - tag template
   * @param   { String }   css - custom tag css
   * @param   { String }   attrs - root tag attributes
   * @param   { Function } fn - user function
   * @returns { String } name/id of the tag just created
   */
  function tag2$1(name, tmpl, css, attrs, fn) {
    if (css) {
      styleManager.add(css, name);
    }

    __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

    return name;
  }

  /**
   * Mount a tag using a specific tag implementation
   * @param   { * } selector - tag DOM selector or DOM node/s
   * @param   { String } tagName - tag implementation name
   * @param   { Object } opts - tag logic
   * @returns { Array } new tags instances
   */
  function mount$1(selector, tagName, opts) {
    var tags = [];
    var elem, allTags;

    function pushTagsTo(root) {
      if (root.tagName) {
        var riotTag = getAttr(root, IS_DIRECTIVE),
            tag;

        // have tagName? force riot-tag to be the same
        if (tagName && riotTag !== tagName) {
          riotTag = tagName;
          setAttr(root, IS_DIRECTIVE, tagName);
        }

        tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

        if (tag) {
          tags.push(tag);
        }
      } else if (root.length) {
        each(root, pushTagsTo);
      } // assume nodeList
    }

    // inject styles into DOM
    styleManager.inject();

    if (isObject(tagName)) {
      opts = tagName;
      tagName = 0;
    }

    // crawl the DOM to find the tag
    if (isString(selector)) {
      selector = selector === '*' ?
      // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = selectTags() :
      // or just the ones named like the selector
      selector + selectTags(selector.split(/, */));

      // make sure to pass always a selector
      // to the querySelectorAll function
      elem = selector ? $$(selector) : [];
    } else
      // probably you have passed already a tag or a NodeList
      {
        elem = selector;
      }

    // select all the registered and mount them inside their root elements
    if (tagName === '*') {
      // get all custom tags
      tagName = allTags || selectTags();
      // if the root els it's just a single tag
      if (elem.tagName) {
        elem = $$(tagName, elem);
      } else {
        // select all the children for all the different root elements
        var nodeList = [];

        each(elem, function (_el) {
          return nodeList.push($$(tagName, _el));
        });

        elem = nodeList;
      }
      // get rid of the tagName
      tagName = 0;
    }

    pushTagsTo(elem);

    return tags;
  }

  // Create a mixin that could be globally shared across all the tags
  var mixins = {};
  var globals = mixins[GLOBAL_MIXIN] = {};
  var mixins_id = 0;

  /**
   * Create/Return a mixin by its name
   * @param   { String }  name - mixin name (global mixin if object)
   * @param   { Object }  mix - mixin logic
   * @param   { Boolean } g - is global?
   * @returns { Object }  the mixin logic
   */
  function mixin$1(name, mix, g) {
    // Unnamed global
    if (isObject(name)) {
      mixin$1("__" + mixins_id++ + "__", name, true);
      return;
    }

    var store = g ? globals : mixins;

    // Getter
    if (!mix) {
      if (isUndefined(store[name])) {
        throw new Error("Unregistered mixin: " + name);
      }

      return store[name];
    }

    // Setter
    store[name] = isFunction(mix) ? extend(mix.prototype, store[name] || {}) && mix : extend(store[name] || {}, mix);
  }

  /**
   * Update all the tags instances created
   * @returns { Array } all the tags instances
   */
  function update$1() {
    return each(__TAGS_CACHE, function (tag) {
      return tag.update();
    });
  }

  function unregister$1(name) {
    __TAG_IMPL[name] = null;
  }

  var version$1 = 'v3.6.1';

  var core = Object.freeze({
    Tag: Tag$2,
    tag: tag$1,
    tag2: tag2$1,
    mount: mount$1,
    mixin: mixin$1,
    update: update$1,
    unregister: unregister$1,
    version: version$1
  });

  // counter to give a unique id to all the Tag instances
  var __uid = 0;

  /**
   * We need to update opts for this tag. That requires updating the expressions
   * in any attributes on the tag, and then copying the result onto opts.
   * @this Tag
   * @param   {Boolean} isLoop - is it a loop tag?
   * @param   { Tag }  parent - parent tag node
   * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
   * @param   { Object }  opts - tag options
   * @param   { Array }  instAttrs - tag attributes array
   */
  function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
    // isAnonymous `each` tags treat `dom` and `root` differently. In this case
    // (and only this case) we don't need to do updateOpts, because the regular parse
    // will update those attrs. Plus, isAnonymous tags don't need opts anyway
    if (isLoop && isAnonymous) {
      return;
    }

    var ctx = !isAnonymous && isLoop ? this : parent || this;
    each(instAttrs, function (attr) {
      if (attr.expr) {
        updateAllExpressions.call(ctx, [attr.expr]);
      }
      // normalize the attribute names
      opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
    });
  }

  /**
   * Tag class
   * @constructor
   * @param { Object } impl - it contains the tag template, and logic
   * @param { Object } conf - tag options
   * @param { String } innerHTML - html that eventually we need to inject in the tag
   */
  function Tag$1(impl, conf, innerHTML) {
    if (impl === void 0) impl = {};
    if (conf === void 0) conf = {};

    var opts = extend({}, conf.opts),
        parent = conf.parent,
        isLoop = conf.isLoop,
        isAnonymous = !!conf.isAnonymous,
        skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
        item = cleanUpData(conf.item),
        index = conf.index,
        // available only for the looped nodes
    instAttrs = [],
        // All attributes on the Tag when it's first parsed
    implAttrs = [],
        // expressions on this type of Tag
    expressions = [],
        root = conf.root,
        tagName = conf.tagName || getTagName(root),
        isVirtual = tagName === 'virtual',
        isInline = !isVirtual && !impl.tmpl,
        propsInSyncWithParent = [],
        dom;

    // make this tag observable
    if (!skipAnonymous) {
      observable$1(this);
    }
    // only call unmount if we have a valid __TAG_IMPL (has name property)
    if (impl.name && root._tag) {
      root._tag.unmount(true);
    }

    // not yet mounted
    this.isMounted = false;

    defineProperty(this, '__', {
      isAnonymous: isAnonymous,
      instAttrs: instAttrs,
      innerHTML: innerHTML,
      tagName: tagName,
      index: index,
      isLoop: isLoop,
      isInline: isInline,
      // tags having event listeners
      // it would be better to use weak maps here but we can not introduce breaking changes now
      listeners: [],
      // these vars will be needed only for the virtual tags
      virts: [],
      tail: null,
      head: null,
      parent: null,
      item: null
    });

    // create a unique id to this tag
    // it could be handy to use it also to improve the virtual dom rendering speed
    defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
    defineProperty(this, 'root', root);
    extend(this, { opts: opts }, item);
    // protect the "tags" and "refs" property from being overridden
    defineProperty(this, 'parent', parent || null);
    defineProperty(this, 'tags', {});
    defineProperty(this, 'refs', {});

    if (isInline || isLoop && isAnonymous) {
      dom = root;
    } else {
      if (!isVirtual) {
        root.innerHTML = '';
      }
      dom = mkdom(impl.tmpl, innerHTML, isSvg(root));
    }

    /**
     * Update the tag expressions and options
     * @param   { * }  data - data we want to use to extend the tag properties
     * @returns { Tag } the current tag instance
     */
    defineProperty(this, 'update', function tagUpdate(data) {
      var nextOpts = {},
          canTrigger = this.isMounted && !skipAnonymous;

      // make sure the data passed will not override
      // the component core methods
      data = cleanUpData(data);
      extend(this, data);
      updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);

      if (canTrigger && this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) {
        return this;
      }

      // inherit properties from the parent, but only for isAnonymous tags
      if (isLoop && isAnonymous) {
        inheritFrom.apply(this, [this.parent, propsInSyncWithParent]);
      }
      extend(opts, nextOpts);
      if (canTrigger) {
        this.trigger('update', data);
      }
      updateAllExpressions.call(this, expressions);
      if (canTrigger) {
        this.trigger('updated');
      }

      return this;
    }.bind(this));

    /**
     * Add a mixin to this tag
     * @returns { Tag } the current tag instance
     */
    defineProperty(this, 'mixin', function tagMixin() {
      var this$1 = this;

      each(arguments, function (mix) {
        var instance, obj;
        var props = [];

        // properties blacklisted and will not be bound to the tag instance
        var propsBlacklist = ['init', '__proto__'];

        mix = isString(mix) ? mixin$1(mix) : mix;

        // check if the mixin is a function
        if (isFunction(mix)) {
          // create the new mixin instance
          instance = new mix();
        } else {
          instance = mix;
        }

        var proto = Object.getPrototypeOf(instance);

        // build multilevel prototype inheritance chain property list
        do {
          props = props.concat(Object.getOwnPropertyNames(obj || instance));
        } while (obj = Object.getPrototypeOf(obj || instance));

        // loop the keys in the function prototype or the all object keys
        each(props, function (key) {
          // bind methods to this
          // allow mixins to override other properties/parent mixins
          if (!contains(propsBlacklist, key)) {
            // check for getters/setters
            var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
            var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

            // apply method only if it does not already exist on the instance
            if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
              Object.defineProperty(this$1, key, descriptor);
            } else {
              this$1[key] = isFunction(instance[key]) ? instance[key].bind(this$1) : instance[key];
            }
          }
        });

        // init method will be called automatically
        if (instance.init) {
          instance.init.bind(this$1)();
        }
      });
      return this;
    }.bind(this));

    /**
     * Mount the current tag instance
     * @returns { Tag } the current tag instance
     */
    defineProperty(this, 'mount', function tagMount() {
      var this$1 = this;

      root._tag = this; // keep a reference to the tag just created

      // Read all the attrs on this instance. This give us the info we need for updateOpts
      parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
        if (!isAnonymous && RefExpr.isPrototypeOf(expr)) {
          expr.tag = this$1;
        }
        attr.expr = expr;
        instAttrs.push(attr);
      }]);

      // update the root adding custom attributes coming from the compiler
      implAttrs = [];
      walkAttrs(impl.attrs, function (k, v) {
        implAttrs.push({ name: k, value: v });
      });
      parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
        if (expr) {
          expressions.push(expr);
        } else {
          setAttr(root, attr.name, attr.value);
        }
      }]);

      // initialiation
      updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

      // add global mixins
      var globalMixin = mixin$1(GLOBAL_MIXIN);

      if (globalMixin && !skipAnonymous) {
        for (var i in globalMixin) {
          if (globalMixin.hasOwnProperty(i)) {
            this$1.mixin(globalMixin[i]);
          }
        }
      }

      if (impl.fn) {
        impl.fn.call(this, opts);
      }

      if (!skipAnonymous) {
        this.trigger('before-mount');
      }

      // parse layout after init. fn may calculate args for nested custom tags
      parseExpressions.apply(this, [dom, expressions, isAnonymous]);

      this.update(item);

      if (!isAnonymous && !isInline) {
        while (dom.firstChild) {
          root.appendChild(dom.firstChild);
        }
      }

      defineProperty(this, 'root', root);
      defineProperty(this, 'isMounted', true);

      if (skipAnonymous) {
        return;
      }

      // if it's not a child tag we can trigger its mount event
      if (!this.parent) {
        this.trigger('mount');
      }
      // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
      else {
          var p = getImmediateCustomParentTag(this.parent);
          p.one(!p.isMounted ? 'mount' : 'updated', function () {
            this$1.trigger('mount');
          });
        }

      return this;
    }.bind(this));

    /**
     * Unmount the tag instance
     * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
     * @returns { Tag } the current tag instance
     */
    defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
      var this$1 = this;

      var el = this.root,
          p = el.parentNode,
          ptag,
          tagIndex = __TAGS_CACHE.indexOf(this);

      if (!skipAnonymous) {
        this.trigger('before-unmount');
      }

      // clear all attributes coming from the mounted tag
      walkAttrs(impl.attrs, function (name) {
        if (startsWith(name, ATTRS_PREFIX)) {
          name = name.slice(ATTRS_PREFIX.length);
        }

        remAttr(root, name);
      });

      // remove all the event listeners
      this.__.listeners.forEach(function (dom) {
        Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
          dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
        });
      });

      // remove this tag instance from the global virtualDom variable
      if (tagIndex !== -1) {
        __TAGS_CACHE.splice(tagIndex, 1);
      }

      if (p || isVirtual) {
        if (parent) {
          ptag = getImmediateCustomParentTag(parent);

          if (isVirtual) {
            Object.keys(this.tags).forEach(function (tagName) {
              arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
            });
          } else {
            arrayishRemove(ptag.tags, tagName, this);
            // remove from _parent too
            if (parent !== ptag) {
              arrayishRemove(parent.tags, tagName, this);
            }
          }
        } else {
          // remove the tag contents
          setInnerHTML(el, '');
        }

        if (p && !mustKeepRoot) {
          p.removeChild(el);
        }
      }

      if (this.__.virts) {
        each(this.__.virts, function (v) {
          if (v.parentNode) {
            v.parentNode.removeChild(v);
          }
        });
      }

      // allow expressions to unmount themselves
      unmountAll(expressions);
      each(instAttrs, function (a) {
        return a.expr && a.expr.unmount && a.expr.unmount();
      });

      // custom internal unmount function to avoid relying on the observable
      if (this.__.onUnmount) {
        this.__.onUnmount();
      }

      if (!skipAnonymous) {
        this.trigger('unmount');
        this.off('*');
      }

      defineProperty(this, 'isMounted', false);

      delete this.root._tag;

      return this;
    }.bind(this));
  }

  /**
   * Detect the tag implementation by a DOM node
   * @param   { Object } dom - DOM node we need to parse to get its tag implementation
   * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
   */
  function getTag(dom) {
    return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) || getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()];
  }

  /**
   * Inherit properties from a target tag instance
   * @this Tag
   * @param   { Tag } target - tag where we will inherit properties
   * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
   */
  function inheritFrom(target, propsInSyncWithParent) {
    var this$1 = this;

    each(Object.keys(target), function (k) {
      // some properties must be always in sync with the parent tag
      var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

      if (isUndefined(this$1[k]) || mustSync) {
        // track the property to keep in sync
        // so we can keep it updated
        if (!mustSync) {
          propsInSyncWithParent.push(k);
        }
        this$1[k] = target[k];
      }
    });
  }

  /**
   * Move the position of a custom tag in its parent tag
   * @this Tag
   * @param   { String } tagName - key where the tag was stored
   * @param   { Number } newPos - index where the new tag will be stored
   */
  function moveChildTag(tagName, newPos) {
    var parent = this.parent,
        tags;
    // no parent no move
    if (!parent) {
      return;
    }

    tags = parent.tags[tagName];

    if (isArray(tags)) {
      tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]);
    } else {
      arrayishAdd(parent.tags, tagName, this);
    }
  }

  /**
   * Create a new child tag including it correctly into its parent
   * @param   { Object } child - child tag implementation
   * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
   * @param   { String } innerHTML - inner html of the child node
   * @param   { Object } parent - instance of the parent tag including the child custom tag
   * @returns { Object } instance of the new child tag just created
   */
  function initChildTag(child, opts, innerHTML, parent) {
    var tag = new Tag$1(child, opts, innerHTML),
        tagName = opts.tagName || getTagName(opts.root, true),
        ptag = getImmediateCustomParentTag(parent);
    // fix for the parent attribute in the looped elements
    defineProperty(tag, 'parent', ptag);
    // store the real parent tag
    // in some cases this could be different from the custom parent tag
    // for example in nested loops
    tag.__.parent = parent;

    // add this tag to the custom parent tag
    arrayishAdd(ptag.tags, tagName, tag);

    // and also to the real parent tag
    if (ptag !== parent) {
      arrayishAdd(parent.tags, tagName, tag);
    }

    return tag;
  }

  /**
   * Loop backward all the parents tree to detect the first custom parent tag
   * @param   { Object } tag - a Tag instance
   * @returns { Object } the instance of the first custom parent tag found
   */
  function getImmediateCustomParentTag(tag) {
    var ptag = tag;
    while (ptag.__.isAnonymous) {
      if (!ptag.parent) {
        break;
      }
      ptag = ptag.parent;
    }
    return ptag;
  }

  /**
   * Trigger the unmount method on all the expressions
   * @param   { Array } expressions - DOM expressions
   */
  function unmountAll(expressions) {
    each(expressions, function (expr) {
      if (expr instanceof Tag$1) {
        expr.unmount(true);
      } else if (expr.tagName) {
        expr.tag.unmount(true);
      } else if (expr.unmount) {
        expr.unmount();
      }
    });
  }

  /**
   * Get the tag name of any DOM node
   * @param   { Object } dom - DOM node we want to parse
   * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
   * @returns { String } name to identify this dom node in riot
   */
  function getTagName(dom, skipDataIs) {
    var child = getTag(dom),
        namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
    return namedTag && !tmpl.hasExpr(namedTag) ? namedTag : child ? child.name : dom.tagName.toLowerCase();
  }

  /**
   * With this function we avoid that the internal Tag methods get overridden
   * @param   { Object } data - options we want to use to extend the tag instance
   * @returns { Object } clean object without containing the riot internal reserved words
   */
  function cleanUpData(data) {
    if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger))) {
      return data;
    }

    var o = {};
    for (var key in data) {
      if (!RE_RESERVED_NAMES.test(key)) {
        o[key] = data[key];
      }
    }
    return o;
  }

  /**
   * Set the property of an object for a given key. If something already
   * exists there, then it becomes an array containing both the old and new value.
   * @param { Object } obj - object on which to set the property
   * @param { String } key - property name
   * @param { Object } value - the value of the property to be set
   * @param { Boolean } ensureArray - ensure that the property remains an array
   * @param { Number } index - add the new item in a certain array position
   */
  function arrayishAdd(obj, key, value, ensureArray, index) {
    var dest = obj[key];
    var isArr = isArray(dest);
    var hasIndex = !isUndefined(index);

    if (dest && dest === value) {
      return;
    }

    // if the key was never set, set it once
    if (!dest && ensureArray) {
      obj[key] = [value];
    } else if (!dest) {
      obj[key] = value;
    }
    // if it was an array and not yet set
    else {
        if (isArr) {
          var oldIndex = dest.indexOf(value);
          // this item never changed its position
          if (oldIndex === index) {
            return;
          }
          // remove the item from its old position
          if (oldIndex !== -1) {
            dest.splice(oldIndex, 1);
          }
          // move or add the item
          if (hasIndex) {
            dest.splice(index, 0, value);
          } else {
            dest.push(value);
          }
        } else {
          obj[key] = [dest, value];
        }
      }
  }

  /**
   * Removes an item from an object at a given key. If the key points to an array,
   * then the item is just removed from the array.
   * @param { Object } obj - object on which to remove the property
   * @param { String } key - property name
   * @param { Object } value - the value of the property to be removed
   * @param { Boolean } ensureArray - ensure that the property remains an array
  */
  function arrayishRemove(obj, key, value, ensureArray) {
    if (isArray(obj[key])) {
      var index = obj[key].indexOf(value);
      if (index !== -1) {
        obj[key].splice(index, 1);
      }
      if (!obj[key].length) {
        delete obj[key];
      } else if (obj[key].length === 1 && !ensureArray) {
        obj[key] = obj[key][0];
      }
    } else {
      delete obj[key];
    } // otherwise just delete the key
  }

  /**
   * Mount a tag creating new Tag instance
   * @param   { Object } root - dom node where the tag will be mounted
   * @param   { String } tagName - name of the riot tag we want to mount
   * @param   { Object } opts - options to pass to the Tag instance
   * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
   * @returns { Tag } a new Tag instance
   */
  function mountTo(root, tagName, opts, ctx) {
    var impl = __TAG_IMPL[tagName],
        implClass = __TAG_IMPL[tagName].class,
        tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),

    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

    var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

    if (impl && root) {
      Tag$1.apply(tag, [impl, conf, innerHTML]);
    }

    if (tag && tag.mount) {
      tag.mount(true);
      // add this tag to the virtualDom variable
      if (!contains(__TAGS_CACHE, tag)) {
        __TAGS_CACHE.push(tag);
      }
    }

    return tag;
  }

  /**
   * makes a tag virtual and replaces a reference in the dom
   * @this Tag
   * @param { tag } the tag to make virtual
   * @param { ref } the dom reference location
   */
  function makeReplaceVirtual(tag, ref) {
    var frag = createFrag();
    makeVirtual.call(tag, frag);
    ref.parentNode.replaceChild(frag, ref);
  }

  /**
   * Adds the elements for a virtual tag
   * @this Tag
   * @param { Node } src - the node that will do the inserting or appending
   * @param { Tag } target - only if inserting, insert before this tag's first child
   */
  function makeVirtual(src, target) {
    var this$1 = this;

    var head = createDOMPlaceholder(),
        tail = createDOMPlaceholder(),
        frag = createFrag(),
        sib,
        el;

    this.root.insertBefore(head, this.root.firstChild);
    this.root.appendChild(tail);

    this.__.head = el = head;
    this.__.tail = tail;

    while (el) {
      sib = el.nextSibling;
      frag.appendChild(el);
      this$1.__.virts.push(el); // hold for unmounting
      el = sib;
    }

    if (target) {
      src.insertBefore(frag, target.__.head);
    } else {
      src.appendChild(frag);
    }
  }

  /**
   * Move virtual tag and all child nodes
   * @this Tag
   * @param { Node } src  - the node that will do the inserting
   * @param { Tag } target - insert before this tag's first child
   */
  function moveVirtual(src, target) {
    var this$1 = this;

    var el = this.__.head,
        frag = createFrag(),
        sib;

    while (el) {
      sib = el.nextSibling;
      frag.appendChild(el);
      el = sib;
      if (el === this$1.__.tail) {
        frag.appendChild(el);
        src.insertBefore(frag, target.__.head);
        break;
      }
    }
  }

  /**
   * Get selectors for tags
   * @param   { Array } tags - tag names to select
   * @returns { String } selector
   */
  function selectTags(tags) {
    // select all tags
    if (!tags) {
      var keys = Object.keys(__TAG_IMPL);
      return keys + selectTags(keys);
    }

    return tags.filter(function (t) {
      return !/[^-\w]/.test(t);
    }).reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]";
    }, '');
  }

  var tags = Object.freeze({
    getTag: getTag,
    inheritFrom: inheritFrom,
    moveChildTag: moveChildTag,
    initChildTag: initChildTag,
    getImmediateCustomParentTag: getImmediateCustomParentTag,
    unmountAll: unmountAll,
    getTagName: getTagName,
    cleanUpData: cleanUpData,
    arrayishAdd: arrayishAdd,
    arrayishRemove: arrayishRemove,
    mountTo: mountTo,
    makeReplaceVirtual: makeReplaceVirtual,
    makeVirtual: makeVirtual,
    moveVirtual: moveVirtual,
    selectTags: selectTags
  });

  /**
   * Riot public api
   */
  var settings = settings$1;
  var util = {
    tmpl: tmpl,
    brackets: brackets,
    styleManager: styleManager,
    vdom: __TAGS_CACHE,
    styleNode: styleManager.styleNode,
    // export the riot internal utils as well
    dom: dom,
    check: check,
    misc: misc,
    tags: tags
  };

  // export the core props/methods
  var Tag$$1 = Tag$2;
  var tag$$1 = tag$1;
  var tag2$$1 = tag2$1;
  var mount$$1 = mount$1;
  var mixin$$1 = mixin$1;
  var update$$1 = update$1;
  var unregister$$1 = unregister$1;
  var version$$1 = version$1;
  var observable = observable$1;

  var riot$1 = extend({}, core, {
    observable: observable$1,
    settings: settings,
    util: util
  });

  exports.settings = settings;
  exports.util = util;
  exports.Tag = Tag$$1;
  exports.tag = tag$$1;
  exports.tag2 = tag2$$1;
  exports.mount = mount$$1;
  exports.mixin = mixin$$1;
  exports.update = update$$1;
  exports.unregister = unregister$$1;
  exports.version = version$$1;
  exports.observable = observable;
  exports['default'] = riot$1;

  Object.defineProperty(exports, '__esModule', { value: true });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _riot = __webpack_require__(0);

var _riot2 = _interopRequireDefault(_riot);

__webpack_require__(2);

var _noframeworkWaypoints = __webpack_require__(3);

var _noframeworkWaypoints2 = _interopRequireDefault(_noframeworkWaypoints);

__webpack_require__(4);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.body.innerHTML = '<app></app>';
_riot2.default.mount('*');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Zenscroll 4.0.0
 * https://github.com/zengabor/zenscroll/
 *
 * Copyright 2015–2017 Gabor Lenard
 *
 * This is free and unencumbered software released into the public domain.
 * 
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 * 
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 * For more information, please refer to <http://unlicense.org>
 * 
 */

/*jshint devel:true, asi:true */

/*global define, module */

(function (root, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory()),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
		module.exports = factory();
	} else {
		(function install() {
			// To make sure Zenscroll can be referenced from the header, before `body` is available
			if (document && document.body) {
				root.zenscroll = factory();
			} else {
				// retry 9ms later
				setTimeout(install, 9);
			}
		})();
	}
})(this, function () {
	"use strict";

	// Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:

	var isNativeSmoothScrollEnabledOn = function isNativeSmoothScrollEnabledOn(elem) {
		return "getComputedStyle" in window && window.getComputedStyle(elem)["scroll-behavior"] === "smooth";
	};

	// Exit if it’s not a browser environment:
	if (typeof window === "undefined" || !("document" in window)) {
		return {};
	}

	var makeScroller = function makeScroller(container, defaultDuration, edgeOffset) {

		// Use defaults if not provided
		defaultDuration = defaultDuration || 999; //ms
		if (!edgeOffset && edgeOffset !== 0) {
			// When scrolling, this amount of distance is kept from the edges of the container:
			edgeOffset = 9; //px
		}

		// Handling the life-cycle of the scroller
		var scrollTimeoutId;
		var setScrollTimeoutId = function setScrollTimeoutId(newValue) {
			scrollTimeoutId = newValue;
		};

		/**
   * Stop the current smooth scroll operation immediately
   */
		var stopScroll = function stopScroll() {
			clearTimeout(scrollTimeoutId);
			setScrollTimeoutId(0);
		};

		var getTopWithEdgeOffset = function getTopWithEdgeOffset(elem) {
			return Math.max(0, container.getTopOf(elem) - edgeOffset);
		};

		/**
   * Scrolls to a specific vertical position in the document.
   *
   * @param {targetY} The vertical position within the document.
   * @param {duration} Optionally the duration of the scroll operation.
   *        If not provided the default duration is used.
   * @param {onDone} An optional callback function to be invoked once the scroll finished.
   */
		var scrollToY = function scrollToY(targetY, duration, onDone) {
			stopScroll();
			if (duration === 0 || duration && duration < 0 || isNativeSmoothScrollEnabledOn(container.body)) {
				container.toY(targetY);
				if (onDone) {
					onDone();
				}
			} else {
				var startY = container.getY();
				var distance = Math.max(0, targetY) - startY;
				var startTime = new Date().getTime();
				duration = duration || Math.min(Math.abs(distance), defaultDuration);
				(function loopScroll() {
					setScrollTimeoutId(setTimeout(function () {
						// Calculate percentage:
						var p = Math.min(1, (new Date().getTime() - startTime) / duration);
						// Calculate the absolute vertical position:
						var y = Math.max(0, Math.floor(startY + distance * (p < 0.5 ? 2 * p * p : p * (4 - p * 2) - 1)));
						container.toY(y);
						if (p < 1 && container.getHeight() + y < container.body.scrollHeight) {
							loopScroll();
						} else {
							setTimeout(stopScroll, 99); // with cooldown time
							if (onDone) {
								onDone();
							}
						}
					}, 9));
				})();
			}
		};

		/**
   * Scrolls to the top of a specific element.
   *
   * @param {elem} The element to scroll to.
   * @param {duration} Optionally the duration of the scroll operation.
   * @param {onDone} An optional callback function to be invoked once the scroll finished.
   */
		var scrollToElem = function scrollToElem(elem, duration, onDone) {
			scrollToY(getTopWithEdgeOffset(elem), duration, onDone);
		};

		/**
   * Scrolls an element into view if necessary.
   *
   * @param {elem} The element.
   * @param {duration} Optionally the duration of the scroll operation.
   * @param {onDone} An optional callback function to be invoked once the scroll finished.
   */
		var scrollIntoView = function scrollIntoView(elem, duration, onDone) {
			var elemHeight = elem.getBoundingClientRect().height;
			var elemBottom = container.getTopOf(elem) + elemHeight;
			var containerHeight = container.getHeight();
			var y = container.getY();
			var containerBottom = y + containerHeight;
			if (getTopWithEdgeOffset(elem) < y || elemHeight + edgeOffset > containerHeight) {
				// Element is clipped at top or is higher than screen.
				scrollToElem(elem, duration, onDone);
			} else if (elemBottom + edgeOffset > containerBottom) {
				// Element is clipped at the bottom.
				scrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone);
			} else if (onDone) {
				onDone();
			}
		};

		/**
   * Scrolls to the center of an element.
   *
   * @param {elem} The element.
   * @param {duration} Optionally the duration of the scroll operation.
   * @param {offset} Optionally the offset of the top of the element from the center of the screen.
   * @param {onDone} An optional callback function to be invoked once the scroll finished.
   */
		var scrollToCenterOf = function scrollToCenterOf(elem, duration, offset, onDone) {
			scrollToY(Math.max(0, container.getTopOf(elem) - container.getHeight() / 2 + (offset || elem.getBoundingClientRect().height / 2)), duration, onDone);
		};

		/**
   * Changes default settings for this scroller.
   *
   * @param {newDefaultDuration} Optionally a new value for default duration, used for each scroll method by default.
   *        Ignored if null or undefined.
   * @param {newEdgeOffset} Optionally a new value for the edge offset, used by each scroll method by default. Ignored if null or undefined.
   * @returns An object with the current values.
   */
		var setup = function setup(newDefaultDuration, newEdgeOffset) {
			if (newDefaultDuration === 0 || newDefaultDuration) {
				defaultDuration = newDefaultDuration;
			}
			if (newEdgeOffset === 0 || newEdgeOffset) {
				edgeOffset = newEdgeOffset;
			}
			return {
				defaultDuration: defaultDuration,
				edgeOffset: edgeOffset
			};
		};

		return {
			setup: setup,
			to: scrollToElem,
			toY: scrollToY,
			intoView: scrollIntoView,
			center: scrollToCenterOf,
			stop: stopScroll,
			moving: function moving() {
				return !!scrollTimeoutId;
			},
			getY: container.getY,
			getTopOf: container.getTopOf
		};
	};

	var docElem = document.documentElement;
	var getDocY = function getDocY() {
		return window.scrollY || docElem.scrollTop;
	};

	// Create a scroller for the document:
	var zenscroll = makeScroller({
		body: document.scrollingElement || document.body,
		toY: function toY(y) {
			window.scrollTo(0, y);
		},
		getY: getDocY,
		getHeight: function getHeight() {
			return window.innerHeight || docElem.clientHeight;
		},
		getTopOf: function getTopOf(elem) {
			return elem.getBoundingClientRect().top + getDocY() - docElem.offsetTop;
		}
	});

	/**
  * Creates a scroller from the provided container element (e.g., a DIV)
  *
  * @param {scrollContainer} The vertical position within the document.
  * @param {defaultDuration} Optionally a value for default duration, used for each scroll method by default.
  *        Ignored if 0 or null or undefined.
  * @param {edgeOffset} Optionally a value for the edge offset, used by each scroll method by default. 
  *        Ignored if null or undefined.
  * @returns A scroller object, similar to `zenscroll` but controlling the provided element.
  */
	zenscroll.createScroller = function (scrollContainer, defaultDuration, edgeOffset) {
		return makeScroller({
			body: scrollContainer,
			toY: function toY(y) {
				scrollContainer.scrollTop = y;
			},
			getY: function getY() {
				return scrollContainer.scrollTop;
			},
			getHeight: function getHeight() {
				return Math.min(scrollContainer.clientHeight, window.innerHeight || docElem.clientHeight);
			},
			getTopOf: function getTopOf(elem) {
				return elem.offsetTop;
			}
		}, defaultDuration, edgeOffset);
	};

	// Automatic link-smoothing on achors
	// Exclude IE8- or when native is enabled or Zenscroll auto- is disabled
	if ("addEventListener" in window && !window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.body)) {

		var isScrollRestorationSupported = "scrollRestoration" in history;

		// On first load & refresh make sure the browser restores the position first
		if (isScrollRestorationSupported) {
			history.scrollRestoration = "auto";
		}

		window.addEventListener("load", function () {

			if (isScrollRestorationSupported) {
				// Set it to manual
				setTimeout(function () {
					history.scrollRestoration = "manual";
				}, 9);
				window.addEventListener("popstate", function (event) {
					if (event.state && "zenscrollY" in event.state) {
						zenscroll.toY(event.state.zenscrollY);
					}
				}, false);
			}

			// Add edge offset on first load if necessary
			// This may not work on IE (or older computer?) as it requires more timeout, around 100 ms
			if (window.location.hash) {
				setTimeout(function () {
					// Adjustment is only needed if there is an edge offset:
					var edgeOffset = zenscroll.setup().edgeOffset;
					if (edgeOffset) {
						var targetElem = document.getElementById(window.location.href.split("#")[1]);
						if (targetElem) {
							var targetY = Math.max(0, zenscroll.getTopOf(targetElem) - edgeOffset);
							var diff = zenscroll.getY() - targetY;
							// Only do the adjustment if the browser is very close to the element:
							if (0 <= diff && diff < 9) {
								window.scrollTo(0, targetY);
							}
						}
					}
				}, 9);
			}
		}, false);

		// Handling clicks on anchors
		var RE_noZensmooth = new RegExp("(^|\\s)noZensmooth(\\s|$)");
		window.addEventListener("click", function (event) {
			var anchor = event.target;
			while (anchor && anchor.tagName !== "A") {
				anchor = anchor.parentNode;
			}
			// Let the browser handle the click if it wasn't with the primary button, or with some modifier keys:
			if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
				return;
			}
			// Save the current scrolling position so it can be used for scroll restoration:
			if (isScrollRestorationSupported) {
				try {
					history.replaceState({ zenscrollY: zenscroll.getY() }, "");
				} catch (e) {
					// Avoid the Chrome Security exception on file protocol, e.g., file://index.html
				}
			}
			// Find the referenced ID:
			var href = anchor.getAttribute("href") || "";
			if (href.indexOf("#") === 0 && !RE_noZensmooth.test(anchor.className)) {
				var targetY = 0;
				var targetElem = document.getElementById(href.substring(1));
				if (href !== "#") {
					if (!targetElem) {
						// Let the browser handle the click if the target ID is not found.
						return;
					}
					targetY = zenscroll.getTopOf(targetElem);
				}
				event.preventDefault();
				// By default trigger the browser's `hashchange` event...
				var onDone = function onDone() {
					window.location = href;
				};
				// ...unless there is an edge offset specified
				var edgeOffset = zenscroll.setup().edgeOffset;
				if (edgeOffset) {
					targetY = Math.max(0, targetY - edgeOffset);
					onDone = function onDone() {
						history.pushState(null, "", href);
					};
				}
				zenscroll.toY(targetY, null, onDone);
			}
		}, false);
	}

	return zenscroll;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function () {
  'use strict';

  var keyCounter = 0;
  var allWaypoints = {};

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor');
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor');
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor');
    }

    this.key = 'waypoint-' + keyCounter;
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options);
    this.element = this.options.element;
    this.adapter = new Waypoint.Adapter(this.element);
    this.callback = options.handler;
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical';
    this.enabled = this.options.enabled;
    this.triggerPoint = null;
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    });
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context);

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset];
    }
    this.group.add(this);
    this.context.add(this);
    allWaypoints[this.key] = this;
    keyCounter += 1;
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function (direction) {
    this.group.queueTrigger(this, direction);
  };

  /* Private */
  Waypoint.prototype.trigger = function (args) {
    if (!this.enabled) {
      return;
    }
    if (this.callback) {
      this.callback.apply(this, args);
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function () {
    this.context.remove(this);
    this.group.remove(this);
    delete allWaypoints[this.key];
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function () {
    this.enabled = false;
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function () {
    this.context.refresh();
    this.enabled = true;
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function () {
    return this.group.next(this);
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function () {
    return this.group.previous(this);
  };

  /* Private */
  Waypoint.invokeAll = function (method) {
    var allWaypointsArray = [];
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey]);
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function () {
    Waypoint.invokeAll('destroy');
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function () {
    Waypoint.invokeAll('disable');
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function () {
    Waypoint.Context.refreshAll();
    for (var waypointKey in allWaypoints) {
      allWaypoints[waypointKey].enabled = true;
    }
    return this;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function () {
    Waypoint.Context.refreshAll();
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight;
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function () {
    return document.documentElement.clientWidth;
  };

  Waypoint.adapters = [];

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  };

  Waypoint.offsetAliases = {
    'bottom-in-view': function bottomInView() {
      return this.context.innerHeight() - this.adapter.outerHeight();
    },
    'right-in-view': function rightInView() {
      return this.context.innerWidth() - this.adapter.outerWidth();
    }
  };

  window.Waypoint = Waypoint;
})();(function () {
  'use strict';

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60);
  }

  var keyCounter = 0;
  var contexts = {};
  var Waypoint = window.Waypoint;
  var oldWindowLoad = window.onload;

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element;
    this.Adapter = Waypoint.Adapter;
    this.adapter = new this.Adapter(element);
    this.key = 'waypoint-context-' + keyCounter;
    this.didScroll = false;
    this.didResize = false;
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    };
    this.waypoints = {
      vertical: {},
      horizontal: {}
    };

    element.waypointContextKey = this.key;
    contexts[element.waypointContextKey] = this;
    keyCounter += 1;
    if (!Waypoint.windowContext) {
      Waypoint.windowContext = true;
      Waypoint.windowContext = new Context(window);
    }

    this.createThrottledScrollHandler();
    this.createThrottledResizeHandler();
  }

  /* Private */
  Context.prototype.add = function (waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical';
    this.waypoints[axis][waypoint.key] = waypoint;
    this.refresh();
  };

  /* Private */
  Context.prototype.checkEmpty = function () {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal);
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical);
    var isWindow = this.element == this.element.window;
    if (horizontalEmpty && verticalEmpty && !isWindow) {
      this.adapter.off('.waypoints');
      delete contexts[this.key];
    }
  };

  /* Private */
  Context.prototype.createThrottledResizeHandler = function () {
    var self = this;

    function resizeHandler() {
      self.handleResize();
      self.didResize = false;
    }

    this.adapter.on('resize.waypoints', function () {
      if (!self.didResize) {
        self.didResize = true;
        Waypoint.requestAnimationFrame(resizeHandler);
      }
    });
  };

  /* Private */
  Context.prototype.createThrottledScrollHandler = function () {
    var self = this;
    function scrollHandler() {
      self.handleScroll();
      self.didScroll = false;
    }

    this.adapter.on('scroll.waypoints', function () {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true;
        Waypoint.requestAnimationFrame(scrollHandler);
      }
    });
  };

  /* Private */
  Context.prototype.handleResize = function () {
    Waypoint.Context.refreshAll();
  };

  /* Private */
  Context.prototype.handleScroll = function () {
    var triggeredGroups = {};
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    };

    for (var axisKey in axes) {
      var axis = axes[axisKey];
      var isForward = axis.newScroll > axis.oldScroll;
      var direction = isForward ? axis.forward : axis.backward;

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey];
        if (waypoint.triggerPoint === null) {
          continue;
        }
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint;
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint;
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint;
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint;
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers();
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    };
  };

  /* Private */
  Context.prototype.innerHeight = function () {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight();
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight();
  };

  /* Private */
  Context.prototype.remove = function (waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key];
    this.checkEmpty();
  };

  /* Private */
  Context.prototype.innerWidth = function () {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth();
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth();
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function () {
    var allWaypoints = [];
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey]);
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function () {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window;
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset();
    var triggeredGroups = {};
    var axes;

    this.handleScroll();
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    };

    for (var axisKey in axes) {
      var axis = axes[axisKey];
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey];
        var adjustment = waypoint.options.offset;
        var oldTriggerPoint = waypoint.triggerPoint;
        var elementOffset = 0;
        var freshWaypoint = oldTriggerPoint == null;
        var contextModifier, wasBeforeScroll, nowAfterScroll;
        var triggeredBackward, triggeredForward;

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp];
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint);
        } else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment);
          if (waypoint.options.offset.indexOf('%') > -1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset;
        waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment);
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll;
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll;
        triggeredBackward = wasBeforeScroll && nowAfterScroll;
        triggeredForward = !wasBeforeScroll && !nowAfterScroll;

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        } else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        } else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        }
      }
    }

    Waypoint.requestAnimationFrame(function () {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers();
      }
    });

    return this;
  };

  /* Private */
  Context.findOrCreateByElement = function (element) {
    return Context.findByElement(element) || new Context(element);
  };

  /* Private */
  Context.refreshAll = function () {
    for (var contextId in contexts) {
      contexts[contextId].refresh();
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function (element) {
    return contexts[element.waypointContextKey];
  };

  window.onload = function () {
    if (oldWindowLoad) {
      oldWindowLoad();
    }
    Context.refreshAll();
  };

  Waypoint.requestAnimationFrame = function (callback) {
    var requestFn = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || requestAnimationFrameShim;
    requestFn.call(window, callback);
  };
  Waypoint.Context = Context;
})();(function () {
  'use strict';

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint;
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint;
  }

  var groups = {
    vertical: {},
    horizontal: {}
  };
  var Waypoint = window.Waypoint;

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name;
    this.axis = options.axis;
    this.id = this.name + '-' + this.axis;
    this.waypoints = [];
    this.clearTriggerQueues();
    groups[this.axis][this.name] = this;
  }

  /* Private */
  Group.prototype.add = function (waypoint) {
    this.waypoints.push(waypoint);
  };

  /* Private */
  Group.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    };
  };

  /* Private */
  Group.prototype.flushTriggers = function () {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction];
      var reverse = direction === 'up' || direction === 'left';
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i];
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction]);
        }
      }
    }
    this.clearTriggerQueues();
  };

  /* Private */
  Group.prototype.next = function (waypoint) {
    this.waypoints.sort(byTriggerPoint);
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    var isLast = index === this.waypoints.length - 1;
    return isLast ? null : this.waypoints[index + 1];
  };

  /* Private */
  Group.prototype.previous = function (waypoint) {
    this.waypoints.sort(byTriggerPoint);
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    return index ? this.waypoints[index - 1] : null;
  };

  /* Private */
  Group.prototype.queueTrigger = function (waypoint, direction) {
    this.triggerQueues[direction].push(waypoint);
  };

  /* Private */
  Group.prototype.remove = function (waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    if (index > -1) {
      this.waypoints.splice(index, 1);
    }
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function () {
    return this.waypoints[0];
  };

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1];
  };

  /* Private */
  Group.findOrCreate = function (options) {
    return groups[options.axis][options.name] || new Group(options);
  };

  Waypoint.Group = Group;
})();(function () {
  'use strict';

  var Waypoint = window.Waypoint;

  function isWindow(element) {
    return element === element.window;
  }

  function getWindow(element) {
    if (isWindow(element)) {
      return element;
    }
    return element.defaultView;
  }

  function NoFrameworkAdapter(element) {
    this.element = element;
    this.handlers = {};
  }

  NoFrameworkAdapter.prototype.innerHeight = function () {
    var isWin = isWindow(this.element);
    return isWin ? this.element.innerHeight : this.element.clientHeight;
  };

  NoFrameworkAdapter.prototype.innerWidth = function () {
    var isWin = isWindow(this.element);
    return isWin ? this.element.innerWidth : this.element.clientWidth;
  };

  NoFrameworkAdapter.prototype.off = function (event, handler) {
    function removeListeners(element, listeners, handler) {
      for (var i = 0, end = listeners.length - 1; i < end; i++) {
        var listener = listeners[i];
        if (!handler || handler === listener) {
          element.removeEventListener(listener);
        }
      }
    }

    var eventParts = event.split('.');
    var eventType = eventParts[0];
    var namespace = eventParts[1];
    var element = this.element;

    if (namespace && this.handlers[namespace] && eventType) {
      removeListeners(element, this.handlers[namespace][eventType], handler);
      this.handlers[namespace][eventType] = [];
    } else if (eventType) {
      for (var ns in this.handlers) {
        removeListeners(element, this.handlers[ns][eventType] || [], handler);
        this.handlers[ns][eventType] = [];
      }
    } else if (namespace && this.handlers[namespace]) {
      for (var type in this.handlers[namespace]) {
        removeListeners(element, this.handlers[namespace][type], handler);
      }
      this.handlers[namespace] = {};
    }
  };

  /* Adapted from jQuery 1.x offset() */
  NoFrameworkAdapter.prototype.offset = function () {
    if (!this.element.ownerDocument) {
      return null;
    }

    var documentElement = this.element.ownerDocument.documentElement;
    var win = getWindow(this.element.ownerDocument);
    var rect = {
      top: 0,
      left: 0
    };

    if (this.element.getBoundingClientRect) {
      rect = this.element.getBoundingClientRect();
    }

    return {
      top: rect.top + win.pageYOffset - documentElement.clientTop,
      left: rect.left + win.pageXOffset - documentElement.clientLeft
    };
  };

  NoFrameworkAdapter.prototype.on = function (event, handler) {
    var eventParts = event.split('.');
    var eventType = eventParts[0];
    var namespace = eventParts[1] || '__default';
    var nsHandlers = this.handlers[namespace] = this.handlers[namespace] || {};
    var nsTypeList = nsHandlers[eventType] = nsHandlers[eventType] || [];

    nsTypeList.push(handler);
    this.element.addEventListener(eventType, handler);
  };

  NoFrameworkAdapter.prototype.outerHeight = function (includeMargin) {
    var height = this.innerHeight();
    var computedStyle;

    if (includeMargin && !isWindow(this.element)) {
      computedStyle = window.getComputedStyle(this.element);
      height += parseInt(computedStyle.marginTop, 10);
      height += parseInt(computedStyle.marginBottom, 10);
    }

    return height;
  };

  NoFrameworkAdapter.prototype.outerWidth = function (includeMargin) {
    var width = this.innerWidth();
    var computedStyle;

    if (includeMargin && !isWindow(this.element)) {
      computedStyle = window.getComputedStyle(this.element);
      width += parseInt(computedStyle.marginLeft, 10);
      width += parseInt(computedStyle.marginRight, 10);
    }

    return width;
  };

  NoFrameworkAdapter.prototype.scrollLeft = function () {
    var win = getWindow(this.element);
    return win ? win.pageXOffset : this.element.scrollLeft;
  };

  NoFrameworkAdapter.prototype.scrollTop = function () {
    var win = getWindow(this.element);
    return win ? win.pageYOffset : this.element.scrollTop;
  };

  NoFrameworkAdapter.extend = function () {
    var args = Array.prototype.slice.call(arguments);

    function merge(target, obj) {
      if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            target[key] = obj[key];
          }
        }
      }

      return target;
    }

    for (var i = 1, end = args.length; i < end; i++) {
      merge(args[0], args[i]);
    }
    return args[0];
  };

  NoFrameworkAdapter.inArray = function (element, array, i) {
    return array == null ? -1 : array.indexOf(element, i);
  };

  NoFrameworkAdapter.isEmptyObject = function (obj) {
    /* eslint no-unused-vars: 0 */
    for (var name in obj) {
      return false;
    }
    return true;
  };

  Waypoint.adapters.push({
    name: 'noframework',
    Adapter: NoFrameworkAdapter
  });
  Waypoint.Adapter = NoFrameworkAdapter;
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/dist/index.js!./main.less", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/dist/index.js!./main.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Cousine);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700);", ""]);

// module
exports.push([module.i, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  line-height: 1.15;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 3 */\n  -webkit-text-size-adjust: 100%;\n  /* 3 */\n}\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  /* 1 */\n  display: block;\n}\n/**\n * Add the correct display in IE 9-.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\ntemplate,\n[hidden] {\n  display: none;\n}\n/* Links\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font: inherit;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n}\n/**\n * Restore the font weight unset by the previous rule.\n */\noptgroup {\n  font-weight: bold;\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n}\n/**\n * prism.js Coy theme for JavaScript, CoffeeScript, CSS and HTML\n * Based on https://github.com/tshedor/workshop-wp-theme (Example: http://workshop.kansan.com/category/sessions/basics or http://workshop.timshedor.com/category/sessions/basics);\n * @author Tim  Shedor\n */\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n  color: black;\n  background: none;\n  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n  text-align: left;\n  white-space: pre;\n  word-spacing: normal;\n  word-break: normal;\n  word-wrap: normal;\n  line-height: 1.5;\n  -moz-tab-size: 4;\n  -o-tab-size: 4;\n  tab-size: 4;\n  -webkit-hyphens: none;\n  -moz-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n}\n/* Code blocks */\npre[class*=\"language-\"] {\n  position: relative;\n  margin: .5em 0;\n  box-shadow: -1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf;\n  border-left: 10px solid #358ccb;\n  background-color: #fdfdfd;\n  background-image: linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);\n  background-size: 3em 3em;\n  background-origin: content-box;\n  overflow: visible;\n  padding: 0;\n}\ncode[class*=\"language\"] {\n  max-height: inherit;\n  height: 100%;\n  padding: 0 1em;\n  display: block;\n  overflow: auto;\n}\n/* Margin bottom to accomodate shadow */\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n  background-color: #fdfdfd;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin-bottom: 1em;\n}\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n  position: relative;\n  padding: .2em;\n  border-radius: 0.3em;\n  color: #c92c2c;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  display: inline;\n  white-space: normal;\n}\npre[class*=\"language-\"]:before,\npre[class*=\"language-\"]:after {\n  content: '';\n  z-index: -2;\n  display: block;\n  position: absolute;\n  bottom: 0.75em;\n  left: 0.18em;\n  width: 40%;\n  height: 20%;\n  max-height: 13em;\n  box-shadow: 0px 13px 8px #979797;\n  -webkit-transform: rotate(-2deg);\n  -moz-transform: rotate(-2deg);\n  -ms-transform: rotate(-2deg);\n  -o-transform: rotate(-2deg);\n  transform: rotate(-2deg);\n}\n:not(pre) > code[class*=\"language-\"]:after,\npre[class*=\"language-\"]:after {\n  right: 0.75em;\n  left: auto;\n  -webkit-transform: rotate(2deg);\n  -moz-transform: rotate(2deg);\n  -ms-transform: rotate(2deg);\n  -o-transform: rotate(2deg);\n  transform: rotate(2deg);\n}\n.token.comment,\n.token.block-comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: #7D8B99;\n}\n.token.punctuation {\n  color: #5F6364;\n}\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.function-name,\n.token.constant,\n.token.symbol,\n.token.deleted {\n  color: #c92c2c;\n}\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.function,\n.token.builtin,\n.token.inserted {\n  color: #2f9c0a;\n}\n.token.operator,\n.token.entity,\n.token.url,\n.token.variable {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n.token.atrule,\n.token.attr-value,\n.token.keyword,\n.token.class-name {\n  color: #1990b8;\n}\n.token.regex,\n.token.important {\n  color: #e90;\n}\n.language-css .token.string,\n.style .token.string {\n  color: #a67f59;\n  background: rgba(255, 255, 255, 0.5);\n}\n.token.important {\n  font-weight: normal;\n}\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n.token.entity {\n  cursor: help;\n}\n.namespace {\n  opacity: .7;\n}\n@media screen and (max-width: 767px) {\n  pre[class*=\"language-\"]:before,\n  pre[class*=\"language-\"]:after {\n    bottom: 14px;\n    box-shadow: none;\n  }\n}\n/* Plugin styles */\n.token.tab:not(:empty):before,\n.token.cr:before,\n.token.lf:before {\n  color: #e0d7d1;\n}\n/* Plugin styles: Line Numbers */\npre[class*=\"language-\"].line-numbers {\n  padding-left: 0;\n}\npre[class*=\"language-\"].line-numbers code {\n  padding-left: 3.8em;\n}\npre[class*=\"language-\"].line-numbers .line-numbers-rows {\n  left: 0;\n}\n/* Plugin styles: Line Highlight */\npre[class*=\"language-\"][data-line] {\n  padding-top: 0;\n  padding-bottom: 0;\n  padding-left: 0;\n}\npre[data-line] code {\n  position: relative;\n  padding-left: 4em;\n}\npre .line-highlight {\n  margin-top: 0;\n}\n[flex-offset=\"0\"] {\n  margin-left: 0%;\n}\n[flex-offset=\"5\"] {\n  margin-left: 5%;\n}\n[flex-offset=\"10\"] {\n  margin-left: 10%;\n}\n[flex-offset=\"15\"] {\n  margin-left: 15%;\n}\n[flex-offset=\"20\"] {\n  margin-left: 20%;\n}\n[flex-offset=\"25\"] {\n  margin-left: 25%;\n}\n[flex-offset=\"30\"] {\n  margin-left: 30%;\n}\n[flex-offset=\"35\"] {\n  margin-left: 35%;\n}\n[flex-offset=\"40\"] {\n  margin-left: 40%;\n}\n[flex-offset=\"45\"] {\n  margin-left: 45%;\n}\n[flex-offset=\"50\"] {\n  margin-left: 50%;\n}\n[flex-offset=\"55\"] {\n  margin-left: 55%;\n}\n[flex-offset=\"60\"] {\n  margin-left: 60%;\n}\n[flex-offset=\"65\"] {\n  margin-left: 65%;\n}\n[flex-offset=\"70\"] {\n  margin-left: 70%;\n}\n[flex-offset=\"75\"] {\n  margin-left: 75%;\n}\n[flex-offset=\"80\"] {\n  margin-left: 80%;\n}\n[flex-offset=\"85\"] {\n  margin-left: 85%;\n}\n[flex-offset=\"90\"] {\n  margin-left: 90%;\n}\n[flex-offset=\"95\"] {\n  margin-left: 95%;\n}\n[flex-offset=\"33\"] {\n  margin-left: calc(33.33333333%);\n}\n[flex-offset=\"66\"] {\n  margin-left: calc(66.66666667%);\n}\n[flex-order=\"0\"] {\n  order: 0;\n}\n[flex-order=\"1\"] {\n  order: 1;\n}\n[flex-order=\"2\"] {\n  order: 2;\n}\n[flex-order=\"3\"] {\n  order: 3;\n}\n[flex-order=\"4\"] {\n  order: 4;\n}\n[flex-order=\"5\"] {\n  order: 5;\n}\n[flex-order=\"6\"] {\n  order: 6;\n}\n[flex-order=\"7\"] {\n  order: 7;\n}\n[flex-order=\"8\"] {\n  order: 8;\n}\n[flex-order=\"9\"] {\n  order: 9;\n}\n[flex-order=\"10\"] {\n  order: 10;\n}\n[flex-order=\"11\"] {\n  order: 11;\n}\n[flex-order=\"12\"] {\n  order: 12;\n}\n[flex-order=\"13\"] {\n  order: 13;\n}\n[flex-order=\"14\"] {\n  order: 14;\n}\n[flex-order=\"15\"] {\n  order: 15;\n}\n[flex-order=\"16\"] {\n  order: 16;\n}\n[flex-order=\"17\"] {\n  order: 17;\n}\n[flex-order=\"18\"] {\n  order: 18;\n}\n[flex-order=\"19\"] {\n  order: 19;\n}\n[flex-order=\"20\"] {\n  order: 20;\n}\n[layout] {\n  display: flex;\n  flex-wrap: wrap;\n}\n[layout] > * {\n  box-sizing: border-box;\n}\n[layout=\"column\"] {\n  flex-direction: column;\n}\n[layout=\"row\"] {\n  flex-direction: row;\n}\n[layout-align] {\n  justify-content: flex-start;\n  align-content: stretch;\n  align-items: stretch;\n}\n[layout-align^=\"start\"] {\n  justify-content: flex-start;\n}\n[layout-align^=\"center\"] {\n  justify-content: center;\n}\n[layout-align^=\"end\"] {\n  justify-content: flex-end;\n}\n[layout-align^=\"space-around\"] {\n  justify-content: space-around;\n}\n[layout-align^=\"space-between\"] {\n  justify-content: space-between;\n}\n[layout-align$=\"start\"] {\n  align-items: flex-start;\n  align-content: flex-start;\n}\n[layout-align$=\"center\"] {\n  align-items: center;\n  align-content: center;\n  max-width: 100%;\n}\n[layout-align$=\"center\"] > * {\n  max-width: 100%;\n}\n[layout-align$=\"end\"] {\n  align-items: flex-end;\n  align-content: flex-end;\n}\n[layout-align=\"start\"],\n[layout-align=\"end\"],\n[layout-align=\"center\"],\n[layout-align=\"space-around\"],\n[layout-align=\"space-between\"] {\n  align-items: stretch;\n  align-content: stretch;\n}\n[flex] {\n  flex: 1;\n}\n[flex-start] {\n  margin-bottom: auto;\n}\n[flex-end] {\n  margin-top: auto;\n}\n[flex-none] {\n  flex: 0 0 auto;\n}\n[flex-initial] {\n  flex: 0 1 auto;\n}\n[flex-noshrink] {\n  flex: 1 0 auto;\n}\n[flex-auto] {\n  flex: 1 1 auto;\n}\n[flex-grow] {\n  flex: 1 1 100%;\n}\n[flex],\n[layout=\"row\"] > [flex],\n[layout=\"row\"] > [flex] {\n  max-height: 100%;\n}\n[layout=\"column\"] > [flex],\n[layout=\"column\"] > [flex] {\n  max-width: 100%;\n}\n[layout=\"row\"] > [flex=\"5\"],\n[layout=\"row\"] > [flex=\"5\"],\n[layout=\"row\"] > [flex=\"5\"] {\n  flex: 1 1 5%;\n  max-width: 5%;\n}\n[layout=\"column\"] > [flex=\"5\"],\n[layout=\"column\"] > [flex=\"5\"],\n[layout=\"column\"] > [flex=\"5\"] {\n  flex: 1 1 5%;\n  max-height: 5%;\n}\n[layout=\"row\"] > [flex=\"10\"],\n[layout=\"row\"] > [flex=\"10\"],\n[layout=\"row\"] > [flex=\"10\"] {\n  flex: 1 1 10%;\n  max-width: 10%;\n}\n[layout=\"column\"] > [flex=\"10\"],\n[layout=\"column\"] > [flex=\"10\"],\n[layout=\"column\"] > [flex=\"10\"] {\n  flex: 1 1 10%;\n  max-height: 10%;\n}\n[layout=\"row\"] > [flex=\"15\"],\n[layout=\"row\"] > [flex=\"15\"],\n[layout=\"row\"] > [flex=\"15\"] {\n  flex: 1 1 15%;\n  max-width: 15%;\n}\n[layout=\"column\"] > [flex=\"15\"],\n[layout=\"column\"] > [flex=\"15\"],\n[layout=\"column\"] > [flex=\"15\"] {\n  flex: 1 1 15%;\n  max-height: 15%;\n}\n[layout=\"row\"] > [flex=\"20\"],\n[layout=\"row\"] > [flex=\"20\"],\n[layout=\"row\"] > [flex=\"20\"] {\n  flex: 1 1 20%;\n  max-width: 20%;\n}\n[layout=\"column\"] > [flex=\"20\"],\n[layout=\"column\"] > [flex=\"20\"],\n[layout=\"column\"] > [flex=\"20\"] {\n  flex: 1 1 20%;\n  max-height: 20%;\n}\n[layout=\"row\"] > [flex=\"25\"],\n[layout=\"row\"] > [flex=\"25\"],\n[layout=\"row\"] > [flex=\"25\"] {\n  flex: 1 1 25%;\n  max-width: 25%;\n}\n[layout=\"column\"] > [flex=\"25\"],\n[layout=\"column\"] > [flex=\"25\"],\n[layout=\"column\"] > [flex=\"25\"] {\n  flex: 1 1 25%;\n  max-height: 25%;\n}\n[layout=\"row\"] > [flex=\"30\"],\n[layout=\"row\"] > [flex=\"30\"],\n[layout=\"row\"] > [flex=\"30\"] {\n  flex: 1 1 30%;\n  max-width: 30%;\n}\n[layout=\"column\"] > [flex=\"30\"],\n[layout=\"column\"] > [flex=\"30\"],\n[layout=\"column\"] > [flex=\"30\"] {\n  flex: 1 1 30%;\n  max-height: 30%;\n}\n[layout=\"row\"] > [flex=\"35\"],\n[layout=\"row\"] > [flex=\"35\"],\n[layout=\"row\"] > [flex=\"35\"] {\n  flex: 1 1 35%;\n  max-width: 35%;\n}\n[layout=\"column\"] > [flex=\"35\"],\n[layout=\"column\"] > [flex=\"35\"],\n[layout=\"column\"] > [flex=\"35\"] {\n  flex: 1 1 35%;\n  max-height: 35%;\n}\n[layout=\"row\"] > [flex=\"40\"],\n[layout=\"row\"] > [flex=\"40\"],\n[layout=\"row\"] > [flex=\"40\"] {\n  flex: 1 1 40%;\n  max-width: 40%;\n}\n[layout=\"column\"] > [flex=\"40\"],\n[layout=\"column\"] > [flex=\"40\"],\n[layout=\"column\"] > [flex=\"40\"] {\n  flex: 1 1 40%;\n  max-height: 40%;\n}\n[layout=\"row\"] > [flex=\"45\"],\n[layout=\"row\"] > [flex=\"45\"],\n[layout=\"row\"] > [flex=\"45\"] {\n  flex: 1 1 45%;\n  max-width: 45%;\n}\n[layout=\"column\"] > [flex=\"45\"],\n[layout=\"column\"] > [flex=\"45\"],\n[layout=\"column\"] > [flex=\"45\"] {\n  flex: 1 1 45%;\n  max-height: 45%;\n}\n[layout=\"row\"] > [flex=\"50\"],\n[layout=\"row\"] > [flex=\"50\"],\n[layout=\"row\"] > [flex=\"50\"] {\n  flex: 1 1 50%;\n  max-width: 50%;\n}\n[layout=\"column\"] > [flex=\"50\"],\n[layout=\"column\"] > [flex=\"50\"],\n[layout=\"column\"] > [flex=\"50\"] {\n  flex: 1 1 50%;\n  max-height: 50%;\n}\n[layout=\"row\"] > [flex=\"55\"],\n[layout=\"row\"] > [flex=\"55\"],\n[layout=\"row\"] > [flex=\"55\"] {\n  flex: 1 1 55%;\n  max-width: 55%;\n}\n[layout=\"column\"] > [flex=\"55\"],\n[layout=\"column\"] > [flex=\"55\"],\n[layout=\"column\"] > [flex=\"55\"] {\n  flex: 1 1 55%;\n  max-height: 55%;\n}\n[layout=\"row\"] > [flex=\"60\"],\n[layout=\"row\"] > [flex=\"60\"],\n[layout=\"row\"] > [flex=\"60\"] {\n  flex: 1 1 60%;\n  max-width: 60%;\n}\n[layout=\"column\"] > [flex=\"60\"],\n[layout=\"column\"] > [flex=\"60\"],\n[layout=\"column\"] > [flex=\"60\"] {\n  flex: 1 1 60%;\n  max-height: 60%;\n}\n[layout=\"row\"] > [flex=\"65\"],\n[layout=\"row\"] > [flex=\"65\"],\n[layout=\"row\"] > [flex=\"65\"] {\n  flex: 1 1 65%;\n  max-width: 65%;\n}\n[layout=\"column\"] > [flex=\"65\"],\n[layout=\"column\"] > [flex=\"65\"],\n[layout=\"column\"] > [flex=\"65\"] {\n  flex: 1 1 65%;\n  max-height: 65%;\n}\n[layout=\"row\"] > [flex=\"70\"],\n[layout=\"row\"] > [flex=\"70\"],\n[layout=\"row\"] > [flex=\"70\"] {\n  flex: 1 1 70%;\n  max-width: 70%;\n}\n[layout=\"column\"] > [flex=\"70\"],\n[layout=\"column\"] > [flex=\"70\"],\n[layout=\"column\"] > [flex=\"70\"] {\n  flex: 1 1 70%;\n  max-height: 70%;\n}\n[layout=\"row\"] > [flex=\"75\"],\n[layout=\"row\"] > [flex=\"75\"],\n[layout=\"row\"] > [flex=\"75\"] {\n  flex: 1 1 75%;\n  max-width: 75%;\n}\n[layout=\"column\"] > [flex=\"75\"],\n[layout=\"column\"] > [flex=\"75\"],\n[layout=\"column\"] > [flex=\"75\"] {\n  flex: 1 1 75%;\n  max-height: 75%;\n}\n[layout=\"row\"] > [flex=\"80\"],\n[layout=\"row\"] > [flex=\"80\"],\n[layout=\"row\"] > [flex=\"80\"] {\n  flex: 1 1 80%;\n  max-width: 80%;\n}\n[layout=\"column\"] > [flex=\"80\"],\n[layout=\"column\"] > [flex=\"80\"],\n[layout=\"column\"] > [flex=\"80\"] {\n  flex: 1 1 80%;\n  max-height: 80%;\n}\n[layout=\"row\"] > [flex=\"85\"],\n[layout=\"row\"] > [flex=\"85\"],\n[layout=\"row\"] > [flex=\"85\"] {\n  flex: 1 1 85%;\n  max-width: 85%;\n}\n[layout=\"column\"] > [flex=\"85\"],\n[layout=\"column\"] > [flex=\"85\"],\n[layout=\"column\"] > [flex=\"85\"] {\n  flex: 1 1 85%;\n  max-height: 85%;\n}\n[layout=\"row\"] > [flex=\"90\"],\n[layout=\"row\"] > [flex=\"90\"],\n[layout=\"row\"] > [flex=\"90\"] {\n  flex: 1 1 90%;\n  max-width: 90%;\n}\n[layout=\"column\"] > [flex=\"90\"],\n[layout=\"column\"] > [flex=\"90\"],\n[layout=\"column\"] > [flex=\"90\"] {\n  flex: 1 1 90%;\n  max-height: 90%;\n}\n[layout=\"row\"] > [flex=\"95\"],\n[layout=\"row\"] > [flex=\"95\"],\n[layout=\"row\"] > [flex=\"95\"] {\n  flex: 1 1 95%;\n  max-width: 95%;\n}\n[layout=\"column\"] > [flex=\"95\"],\n[layout=\"column\"] > [flex=\"95\"],\n[layout=\"column\"] > [flex=\"95\"] {\n  flex: 1 1 95%;\n  max-height: 95%;\n}\n[layout=\"row\"] > [flex=\"100\"],\n[layout=\"row\"] > [flex=\"100\"],\n[layout=\"row\"] > [flex=\"100\"] {\n  flex: 1 1 100%;\n  max-width: 100%;\n}\n[layout=\"column\"] > [flex=\"100\"],\n[layout=\"column\"] > [flex=\"100\"],\n[layout=\"column\"] > [flex=\"100\"] {\n  flex: 1 1 100%;\n  max-height: 100%;\n}\n[layout=\"row\"] > [flex=\"33\"],\n[layout=\"row\"] > [flex=\"33\"],\n[layout=\"row\"] > [flex=\"33\"] {\n  flex: 1 1 33.33%;\n  max-width: 33.33%;\n}\n[layout=\"column\"] > [flex=\"33\"],\n[layout=\"column\"] > [flex=\"33\"],\n[layout=\"column\"] > [flex=\"33\"] {\n  flex: 1 1 33.33%;\n  max-height: 33.33%;\n}\n[layout=\"row\"] > [flex=\"66\"],\n[layout=\"row\"] > [flex=\"66\"],\n[layout=\"row\"] > [flex=\"66\"] {\n  flex: 1 1 66.66%;\n  max-width: 66.66%;\n}\n[layout=\"column\"] > [flex=\"66\"],\n[layout=\"column\"] > [flex=\"66\"],\n[layout=\"column\"] > [flex=\"66\"] {\n  flex: 1 1 66.66%;\n  max-height: 66.66%;\n}\n[hide] {\n  display: none;\n}\n@media (max-width: 599px) {\n  [flex-offset-sm=\"0\"] {\n    margin-left: 0%;\n  }\n  [flex-offset-sm=\"5\"] {\n    margin-left: 5%;\n  }\n  [flex-offset-sm=\"10\"] {\n    margin-left: 10%;\n  }\n  [flex-offset-sm=\"15\"] {\n    margin-left: 15%;\n  }\n  [flex-offset-sm=\"20\"] {\n    margin-left: 20%;\n  }\n  [flex-offset-sm=\"25\"] {\n    margin-left: 25%;\n  }\n  [flex-offset-sm=\"30\"] {\n    margin-left: 30%;\n  }\n  [flex-offset-sm=\"35\"] {\n    margin-left: 35%;\n  }\n  [flex-offset-sm=\"40\"] {\n    margin-left: 40%;\n  }\n  [flex-offset-sm=\"45\"] {\n    margin-left: 45%;\n  }\n  [flex-offset-sm=\"50\"] {\n    margin-left: 50%;\n  }\n  [flex-offset-sm=\"55\"] {\n    margin-left: 55%;\n  }\n  [flex-offset-sm=\"60\"] {\n    margin-left: 60%;\n  }\n  [flex-offset-sm=\"65\"] {\n    margin-left: 65%;\n  }\n  [flex-offset-sm=\"70\"] {\n    margin-left: 70%;\n  }\n  [flex-offset-sm=\"75\"] {\n    margin-left: 75%;\n  }\n  [flex-offset-sm=\"80\"] {\n    margin-left: 80%;\n  }\n  [flex-offset-sm=\"85\"] {\n    margin-left: 85%;\n  }\n  [flex-offset-sm=\"90\"] {\n    margin-left: 90%;\n  }\n  [flex-offset-sm=\"95\"] {\n    margin-left: 95%;\n  }\n  [flex-offset-sm=\"33\"] {\n    margin-left: calc(33.33333333%);\n  }\n  [flex-offset-sm=\"66\"] {\n    margin-left: calc(66.66666667%);\n  }\n  [flex-order-sm=\"0\"] {\n    order: 0;\n  }\n  [flex-order-sm=\"1\"] {\n    order: 1;\n  }\n  [flex-order-sm=\"2\"] {\n    order: 2;\n  }\n  [flex-order-sm=\"3\"] {\n    order: 3;\n  }\n  [flex-order-sm=\"4\"] {\n    order: 4;\n  }\n  [flex-order-sm=\"5\"] {\n    order: 5;\n  }\n  [flex-order-sm=\"6\"] {\n    order: 6;\n  }\n  [flex-order-sm=\"7\"] {\n    order: 7;\n  }\n  [flex-order-sm=\"8\"] {\n    order: 8;\n  }\n  [flex-order-sm=\"9\"] {\n    order: 9;\n  }\n  [flex-order-sm=\"10\"] {\n    order: 10;\n  }\n  [flex-order-sm=\"11\"] {\n    order: 11;\n  }\n  [flex-order-sm=\"12\"] {\n    order: 12;\n  }\n  [flex-order-sm=\"13\"] {\n    order: 13;\n  }\n  [flex-order-sm=\"14\"] {\n    order: 14;\n  }\n  [flex-order-sm=\"15\"] {\n    order: 15;\n  }\n  [flex-order-sm=\"16\"] {\n    order: 16;\n  }\n  [flex-order-sm=\"17\"] {\n    order: 17;\n  }\n  [flex-order-sm=\"18\"] {\n    order: 18;\n  }\n  [flex-order-sm=\"19\"] {\n    order: 19;\n  }\n  [flex-order-sm=\"20\"] {\n    order: 20;\n  }\n  [layout-sm] {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  [layout-sm] > * {\n    box-sizing: border-box;\n  }\n  [layout-sm=\"column\"] {\n    flex-direction: column;\n  }\n  [layout-sm=\"row\"] {\n    flex-direction: row;\n  }\n  [layout-align-sm] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch;\n  }\n  [layout-align-sm^=\"start\"] {\n    justify-content: flex-start;\n  }\n  [layout-align-sm^=\"center\"] {\n    justify-content: center;\n  }\n  [layout-align-sm^=\"end\"] {\n    justify-content: flex-end;\n  }\n  [layout-align-sm^=\"space-around\"] {\n    justify-content: space-around;\n  }\n  [layout-align-sm^=\"space-between\"] {\n    justify-content: space-between;\n  }\n  [layout-align-sm$=\"start\"] {\n    align-items: flex-start;\n    align-content: flex-start;\n  }\n  [layout-align-sm$=\"center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%;\n  }\n  [layout-align-sm$=\"center\"] > * {\n    max-width: 100%;\n  }\n  [layout-align-sm$=\"end\"] {\n    align-items: flex-end;\n    align-content: flex-end;\n  }\n  [layout-align-sm=\"start\"],\n  [layout-align-sm=\"end\"],\n  [layout-align-sm=\"center\"],\n  [layout-align-sm=\"space-around\"],\n  [layout-align-sm=\"space-between\"] {\n    align-items: stretch;\n    align-content: stretch;\n  }\n  [flex-sm] {\n    flex: 1;\n  }\n  [flex-sm-start] {\n    margin-bottom: auto;\n  }\n  [flex-sm-end] {\n    margin-top: auto;\n  }\n  [flex-sm-none] {\n    flex: 0 0 auto;\n  }\n  [flex-sm-initial] {\n    flex: 0 1 auto;\n  }\n  [flex-sm-noshrink] {\n    flex: 1 0 auto;\n  }\n  [flex-sm-auto] {\n    flex: 1 1 auto;\n  }\n  [flex-sm-grow] {\n    flex: 1 1 100%;\n  }\n  [flex-sm],\n  [layout=\"row\"] > [flex-sm],\n  [layout-sm=\"row\"] > [flex-sm] {\n    max-height: 100%;\n  }\n  [layout-sm=\"column\"] > [flex-sm],\n  [layout=\"column\"] > [flex-sm] {\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-sm=\"5\"],\n  [layout-sm=\"row\"] > [flex-sm=\"5\"],\n  [layout-sm=\"row\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-sm=\"5\"],\n  [layout-sm=\"column\"] > [flex-sm=\"5\"],\n  [layout-sm=\"column\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [layout=\"row\"] > [flex-sm=\"10\"],\n  [layout-sm=\"row\"] > [flex-sm=\"10\"],\n  [layout-sm=\"row\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-sm=\"10\"],\n  [layout-sm=\"column\"] > [flex-sm=\"10\"],\n  [layout-sm=\"column\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [layout=\"row\"] > [flex-sm=\"15\"],\n  [layout-sm=\"row\"] > [flex-sm=\"15\"],\n  [layout-sm=\"row\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-sm=\"15\"],\n  [layout-sm=\"column\"] > [flex-sm=\"15\"],\n  [layout-sm=\"column\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [layout=\"row\"] > [flex-sm=\"20\"],\n  [layout-sm=\"row\"] > [flex-sm=\"20\"],\n  [layout-sm=\"row\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-sm=\"20\"],\n  [layout-sm=\"column\"] > [flex-sm=\"20\"],\n  [layout-sm=\"column\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [layout=\"row\"] > [flex-sm=\"25\"],\n  [layout-sm=\"row\"] > [flex-sm=\"25\"],\n  [layout-sm=\"row\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-sm=\"25\"],\n  [layout-sm=\"column\"] > [flex-sm=\"25\"],\n  [layout-sm=\"column\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [layout=\"row\"] > [flex-sm=\"30\"],\n  [layout-sm=\"row\"] > [flex-sm=\"30\"],\n  [layout-sm=\"row\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-sm=\"30\"],\n  [layout-sm=\"column\"] > [flex-sm=\"30\"],\n  [layout-sm=\"column\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [layout=\"row\"] > [flex-sm=\"35\"],\n  [layout-sm=\"row\"] > [flex-sm=\"35\"],\n  [layout-sm=\"row\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-sm=\"35\"],\n  [layout-sm=\"column\"] > [flex-sm=\"35\"],\n  [layout-sm=\"column\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [layout=\"row\"] > [flex-sm=\"40\"],\n  [layout-sm=\"row\"] > [flex-sm=\"40\"],\n  [layout-sm=\"row\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-sm=\"40\"],\n  [layout-sm=\"column\"] > [flex-sm=\"40\"],\n  [layout-sm=\"column\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [layout=\"row\"] > [flex-sm=\"45\"],\n  [layout-sm=\"row\"] > [flex-sm=\"45\"],\n  [layout-sm=\"row\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-sm=\"45\"],\n  [layout-sm=\"column\"] > [flex-sm=\"45\"],\n  [layout-sm=\"column\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [layout=\"row\"] > [flex-sm=\"50\"],\n  [layout-sm=\"row\"] > [flex-sm=\"50\"],\n  [layout-sm=\"row\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-sm=\"50\"],\n  [layout-sm=\"column\"] > [flex-sm=\"50\"],\n  [layout-sm=\"column\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [layout=\"row\"] > [flex-sm=\"55\"],\n  [layout-sm=\"row\"] > [flex-sm=\"55\"],\n  [layout-sm=\"row\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-sm=\"55\"],\n  [layout-sm=\"column\"] > [flex-sm=\"55\"],\n  [layout-sm=\"column\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [layout=\"row\"] > [flex-sm=\"60\"],\n  [layout-sm=\"row\"] > [flex-sm=\"60\"],\n  [layout-sm=\"row\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-sm=\"60\"],\n  [layout-sm=\"column\"] > [flex-sm=\"60\"],\n  [layout-sm=\"column\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [layout=\"row\"] > [flex-sm=\"65\"],\n  [layout-sm=\"row\"] > [flex-sm=\"65\"],\n  [layout-sm=\"row\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-sm=\"65\"],\n  [layout-sm=\"column\"] > [flex-sm=\"65\"],\n  [layout-sm=\"column\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [layout=\"row\"] > [flex-sm=\"70\"],\n  [layout-sm=\"row\"] > [flex-sm=\"70\"],\n  [layout-sm=\"row\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-sm=\"70\"],\n  [layout-sm=\"column\"] > [flex-sm=\"70\"],\n  [layout-sm=\"column\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [layout=\"row\"] > [flex-sm=\"75\"],\n  [layout-sm=\"row\"] > [flex-sm=\"75\"],\n  [layout-sm=\"row\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-sm=\"75\"],\n  [layout-sm=\"column\"] > [flex-sm=\"75\"],\n  [layout-sm=\"column\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [layout=\"row\"] > [flex-sm=\"80\"],\n  [layout-sm=\"row\"] > [flex-sm=\"80\"],\n  [layout-sm=\"row\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-sm=\"80\"],\n  [layout-sm=\"column\"] > [flex-sm=\"80\"],\n  [layout-sm=\"column\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [layout=\"row\"] > [flex-sm=\"85\"],\n  [layout-sm=\"row\"] > [flex-sm=\"85\"],\n  [layout-sm=\"row\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-sm=\"85\"],\n  [layout-sm=\"column\"] > [flex-sm=\"85\"],\n  [layout-sm=\"column\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [layout=\"row\"] > [flex-sm=\"90\"],\n  [layout-sm=\"row\"] > [flex-sm=\"90\"],\n  [layout-sm=\"row\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-sm=\"90\"],\n  [layout-sm=\"column\"] > [flex-sm=\"90\"],\n  [layout-sm=\"column\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [layout=\"row\"] > [flex-sm=\"95\"],\n  [layout-sm=\"row\"] > [flex-sm=\"95\"],\n  [layout-sm=\"row\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-sm=\"95\"],\n  [layout-sm=\"column\"] > [flex-sm=\"95\"],\n  [layout-sm=\"column\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [layout=\"row\"] > [flex-sm=\"100\"],\n  [layout-sm=\"row\"] > [flex-sm=\"100\"],\n  [layout-sm=\"row\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-sm=\"100\"],\n  [layout-sm=\"column\"] > [flex-sm=\"100\"],\n  [layout-sm=\"column\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-sm=\"33\"],\n  [layout-sm=\"row\"] > [flex-sm=\"33\"],\n  [layout-sm=\"row\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"column\"] > [flex-sm=\"33\"],\n  [layout-sm=\"column\"] > [flex-sm=\"33\"],\n  [layout-sm=\"column\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"row\"] > [flex-sm=\"66\"],\n  [layout-sm=\"row\"] > [flex-sm=\"66\"],\n  [layout-sm=\"row\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-sm=\"66\"],\n  [layout-sm=\"column\"] > [flex-sm=\"66\"],\n  [layout-sm=\"column\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [hide-sm] {\n    display: none;\n  }\n}\n@media (min-width: 600px) {\n  [flex-offset-gt-sm=\"0\"] {\n    margin-left: 0%;\n  }\n  [flex-offset-gt-sm=\"5\"] {\n    margin-left: 5%;\n  }\n  [flex-offset-gt-sm=\"10\"] {\n    margin-left: 10%;\n  }\n  [flex-offset-gt-sm=\"15\"] {\n    margin-left: 15%;\n  }\n  [flex-offset-gt-sm=\"20\"] {\n    margin-left: 20%;\n  }\n  [flex-offset-gt-sm=\"25\"] {\n    margin-left: 25%;\n  }\n  [flex-offset-gt-sm=\"30\"] {\n    margin-left: 30%;\n  }\n  [flex-offset-gt-sm=\"35\"] {\n    margin-left: 35%;\n  }\n  [flex-offset-gt-sm=\"40\"] {\n    margin-left: 40%;\n  }\n  [flex-offset-gt-sm=\"45\"] {\n    margin-left: 45%;\n  }\n  [flex-offset-gt-sm=\"50\"] {\n    margin-left: 50%;\n  }\n  [flex-offset-gt-sm=\"55\"] {\n    margin-left: 55%;\n  }\n  [flex-offset-gt-sm=\"60\"] {\n    margin-left: 60%;\n  }\n  [flex-offset-gt-sm=\"65\"] {\n    margin-left: 65%;\n  }\n  [flex-offset-gt-sm=\"70\"] {\n    margin-left: 70%;\n  }\n  [flex-offset-gt-sm=\"75\"] {\n    margin-left: 75%;\n  }\n  [flex-offset-gt-sm=\"80\"] {\n    margin-left: 80%;\n  }\n  [flex-offset-gt-sm=\"85\"] {\n    margin-left: 85%;\n  }\n  [flex-offset-gt-sm=\"90\"] {\n    margin-left: 90%;\n  }\n  [flex-offset-gt-sm=\"95\"] {\n    margin-left: 95%;\n  }\n  [flex-offset-gt-sm=\"33\"] {\n    margin-left: calc(33.33333333%);\n  }\n  [flex-offset-gt-sm=\"66\"] {\n    margin-left: calc(66.66666667%);\n  }\n  [flex-order-gt-sm=\"0\"] {\n    order: 0;\n  }\n  [flex-order-gt-sm=\"1\"] {\n    order: 1;\n  }\n  [flex-order-gt-sm=\"2\"] {\n    order: 2;\n  }\n  [flex-order-gt-sm=\"3\"] {\n    order: 3;\n  }\n  [flex-order-gt-sm=\"4\"] {\n    order: 4;\n  }\n  [flex-order-gt-sm=\"5\"] {\n    order: 5;\n  }\n  [flex-order-gt-sm=\"6\"] {\n    order: 6;\n  }\n  [flex-order-gt-sm=\"7\"] {\n    order: 7;\n  }\n  [flex-order-gt-sm=\"8\"] {\n    order: 8;\n  }\n  [flex-order-gt-sm=\"9\"] {\n    order: 9;\n  }\n  [flex-order-gt-sm=\"10\"] {\n    order: 10;\n  }\n  [flex-order-gt-sm=\"11\"] {\n    order: 11;\n  }\n  [flex-order-gt-sm=\"12\"] {\n    order: 12;\n  }\n  [flex-order-gt-sm=\"13\"] {\n    order: 13;\n  }\n  [flex-order-gt-sm=\"14\"] {\n    order: 14;\n  }\n  [flex-order-gt-sm=\"15\"] {\n    order: 15;\n  }\n  [flex-order-gt-sm=\"16\"] {\n    order: 16;\n  }\n  [flex-order-gt-sm=\"17\"] {\n    order: 17;\n  }\n  [flex-order-gt-sm=\"18\"] {\n    order: 18;\n  }\n  [flex-order-gt-sm=\"19\"] {\n    order: 19;\n  }\n  [flex-order-gt-sm=\"20\"] {\n    order: 20;\n  }\n  [layout-gt-sm] {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  [layout-gt-sm] > * {\n    box-sizing: border-box;\n  }\n  [layout-gt-sm=\"column\"] {\n    flex-direction: column;\n  }\n  [layout-gt-sm=\"row\"] {\n    flex-direction: row;\n  }\n  [layout-align-gt-sm] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch;\n  }\n  [layout-align-gt-sm^=\"start\"] {\n    justify-content: flex-start;\n  }\n  [layout-align-gt-sm^=\"center\"] {\n    justify-content: center;\n  }\n  [layout-align-gt-sm^=\"end\"] {\n    justify-content: flex-end;\n  }\n  [layout-align-gt-sm^=\"space-around\"] {\n    justify-content: space-around;\n  }\n  [layout-align-gt-sm^=\"space-between\"] {\n    justify-content: space-between;\n  }\n  [layout-align-gt-sm$=\"start\"] {\n    align-items: flex-start;\n    align-content: flex-start;\n  }\n  [layout-align-gt-sm$=\"center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%;\n  }\n  [layout-align-gt-sm$=\"center\"] > * {\n    max-width: 100%;\n  }\n  [layout-align-gt-sm$=\"end\"] {\n    align-items: flex-end;\n    align-content: flex-end;\n  }\n  [layout-align-gt-sm=\"start\"],\n  [layout-align-gt-sm=\"end\"],\n  [layout-align-gt-sm=\"center\"],\n  [layout-align-gt-sm=\"space-around\"],\n  [layout-align-gt-sm=\"space-between\"] {\n    align-items: stretch;\n    align-content: stretch;\n  }\n  [flex-gt-sm] {\n    flex: 1;\n  }\n  [flex-gt-sm-start] {\n    margin-bottom: auto;\n  }\n  [flex-gt-sm-end] {\n    margin-top: auto;\n  }\n  [flex-gt-sm-none] {\n    flex: 0 0 auto;\n  }\n  [flex-gt-sm-initial] {\n    flex: 0 1 auto;\n  }\n  [flex-gt-sm-noshrink] {\n    flex: 1 0 auto;\n  }\n  [flex-gt-sm-auto] {\n    flex: 1 1 auto;\n  }\n  [flex-gt-sm-grow] {\n    flex: 1 1 100%;\n  }\n  [flex-gt-sm],\n  [layout=\"row\"] > [flex-gt-sm],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm] {\n    max-height: 100%;\n  }\n  [layout-gt-sm=\"column\"] > [flex-gt-sm],\n  [layout=\"column\"] > [flex-gt-sm] {\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"row\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"5\"],\n  [layout-gt-sm=\"column\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"row\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"10\"],\n  [layout-gt-sm=\"column\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"row\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"15\"],\n  [layout-gt-sm=\"column\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"row\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"20\"],\n  [layout-gt-sm=\"column\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"row\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"25\"],\n  [layout-gt-sm=\"column\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"row\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"30\"],\n  [layout-gt-sm=\"column\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"row\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"35\"],\n  [layout-gt-sm=\"column\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"row\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"40\"],\n  [layout-gt-sm=\"column\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"row\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"45\"],\n  [layout-gt-sm=\"column\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"row\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"50\"],\n  [layout-gt-sm=\"column\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"row\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"55\"],\n  [layout-gt-sm=\"column\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"row\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"60\"],\n  [layout-gt-sm=\"column\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"row\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"65\"],\n  [layout-gt-sm=\"column\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"row\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"70\"],\n  [layout-gt-sm=\"column\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"row\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"75\"],\n  [layout-gt-sm=\"column\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"row\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"80\"],\n  [layout-gt-sm=\"column\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"row\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"85\"],\n  [layout-gt-sm=\"column\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"row\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"90\"],\n  [layout-gt-sm=\"column\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"row\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"95\"],\n  [layout-gt-sm=\"column\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"row\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"100\"],\n  [layout-gt-sm=\"column\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"row\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"33\"],\n  [layout-gt-sm=\"column\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"row\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"row\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"row\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"column\"] > [flex-gt-sm=\"66\"],\n  [layout-gt-sm=\"column\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [hide-gt-sm] {\n    display: none;\n  }\n}\n@media (min-width: 600px) and (max-width: 959px) {\n  [flex-offset-md=\"0\"] {\n    margin-left: 0%;\n  }\n  [flex-offset-md=\"5\"] {\n    margin-left: 5%;\n  }\n  [flex-offset-md=\"10\"] {\n    margin-left: 10%;\n  }\n  [flex-offset-md=\"15\"] {\n    margin-left: 15%;\n  }\n  [flex-offset-md=\"20\"] {\n    margin-left: 20%;\n  }\n  [flex-offset-md=\"25\"] {\n    margin-left: 25%;\n  }\n  [flex-offset-md=\"30\"] {\n    margin-left: 30%;\n  }\n  [flex-offset-md=\"35\"] {\n    margin-left: 35%;\n  }\n  [flex-offset-md=\"40\"] {\n    margin-left: 40%;\n  }\n  [flex-offset-md=\"45\"] {\n    margin-left: 45%;\n  }\n  [flex-offset-md=\"50\"] {\n    margin-left: 50%;\n  }\n  [flex-offset-md=\"55\"] {\n    margin-left: 55%;\n  }\n  [flex-offset-md=\"60\"] {\n    margin-left: 60%;\n  }\n  [flex-offset-md=\"65\"] {\n    margin-left: 65%;\n  }\n  [flex-offset-md=\"70\"] {\n    margin-left: 70%;\n  }\n  [flex-offset-md=\"75\"] {\n    margin-left: 75%;\n  }\n  [flex-offset-md=\"80\"] {\n    margin-left: 80%;\n  }\n  [flex-offset-md=\"85\"] {\n    margin-left: 85%;\n  }\n  [flex-offset-md=\"90\"] {\n    margin-left: 90%;\n  }\n  [flex-offset-md=\"95\"] {\n    margin-left: 95%;\n  }\n  [flex-offset-md=\"33\"] {\n    margin-left: calc(33.33333333%);\n  }\n  [flex-offset-md=\"66\"] {\n    margin-left: calc(66.66666667%);\n  }\n  [flex-order-md=\"0\"] {\n    order: 0;\n  }\n  [flex-order-md=\"1\"] {\n    order: 1;\n  }\n  [flex-order-md=\"2\"] {\n    order: 2;\n  }\n  [flex-order-md=\"3\"] {\n    order: 3;\n  }\n  [flex-order-md=\"4\"] {\n    order: 4;\n  }\n  [flex-order-md=\"5\"] {\n    order: 5;\n  }\n  [flex-order-md=\"6\"] {\n    order: 6;\n  }\n  [flex-order-md=\"7\"] {\n    order: 7;\n  }\n  [flex-order-md=\"8\"] {\n    order: 8;\n  }\n  [flex-order-md=\"9\"] {\n    order: 9;\n  }\n  [flex-order-md=\"10\"] {\n    order: 10;\n  }\n  [flex-order-md=\"11\"] {\n    order: 11;\n  }\n  [flex-order-md=\"12\"] {\n    order: 12;\n  }\n  [flex-order-md=\"13\"] {\n    order: 13;\n  }\n  [flex-order-md=\"14\"] {\n    order: 14;\n  }\n  [flex-order-md=\"15\"] {\n    order: 15;\n  }\n  [flex-order-md=\"16\"] {\n    order: 16;\n  }\n  [flex-order-md=\"17\"] {\n    order: 17;\n  }\n  [flex-order-md=\"18\"] {\n    order: 18;\n  }\n  [flex-order-md=\"19\"] {\n    order: 19;\n  }\n  [flex-order-md=\"20\"] {\n    order: 20;\n  }\n  [layout-md] {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  [layout-md] > * {\n    box-sizing: border-box;\n  }\n  [layout-md=\"column\"] {\n    flex-direction: column;\n  }\n  [layout-md=\"row\"] {\n    flex-direction: row;\n  }\n  [layout-align-md] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch;\n  }\n  [layout-align-md^=\"start\"] {\n    justify-content: flex-start;\n  }\n  [layout-align-md^=\"center\"] {\n    justify-content: center;\n  }\n  [layout-align-md^=\"end\"] {\n    justify-content: flex-end;\n  }\n  [layout-align-md^=\"space-around\"] {\n    justify-content: space-around;\n  }\n  [layout-align-md^=\"space-between\"] {\n    justify-content: space-between;\n  }\n  [layout-align-md$=\"start\"] {\n    align-items: flex-start;\n    align-content: flex-start;\n  }\n  [layout-align-md$=\"center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%;\n  }\n  [layout-align-md$=\"center\"] > * {\n    max-width: 100%;\n  }\n  [layout-align-md$=\"end\"] {\n    align-items: flex-end;\n    align-content: flex-end;\n  }\n  [layout-align-md=\"start\"],\n  [layout-align-md=\"end\"],\n  [layout-align-md=\"center\"],\n  [layout-align-md=\"space-around\"],\n  [layout-align-md=\"space-between\"] {\n    align-items: stretch;\n    align-content: stretch;\n  }\n  [flex-md] {\n    flex: 1;\n  }\n  [flex-md-start] {\n    margin-bottom: auto;\n  }\n  [flex-md-end] {\n    margin-top: auto;\n  }\n  [flex-md-none] {\n    flex: 0 0 auto;\n  }\n  [flex-md-initial] {\n    flex: 0 1 auto;\n  }\n  [flex-md-noshrink] {\n    flex: 1 0 auto;\n  }\n  [flex-md-auto] {\n    flex: 1 1 auto;\n  }\n  [flex-md-grow] {\n    flex: 1 1 100%;\n  }\n  [flex-md],\n  [layout=\"row\"] > [flex-md],\n  [layout-md=\"row\"] > [flex-md] {\n    max-height: 100%;\n  }\n  [layout-md=\"column\"] > [flex-md],\n  [layout=\"column\"] > [flex-md] {\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-md=\"5\"],\n  [layout-md=\"row\"] > [flex-md=\"5\"],\n  [layout-md=\"row\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-md=\"5\"],\n  [layout-md=\"column\"] > [flex-md=\"5\"],\n  [layout-md=\"column\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [layout=\"row\"] > [flex-md=\"10\"],\n  [layout-md=\"row\"] > [flex-md=\"10\"],\n  [layout-md=\"row\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-md=\"10\"],\n  [layout-md=\"column\"] > [flex-md=\"10\"],\n  [layout-md=\"column\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [layout=\"row\"] > [flex-md=\"15\"],\n  [layout-md=\"row\"] > [flex-md=\"15\"],\n  [layout-md=\"row\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-md=\"15\"],\n  [layout-md=\"column\"] > [flex-md=\"15\"],\n  [layout-md=\"column\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [layout=\"row\"] > [flex-md=\"20\"],\n  [layout-md=\"row\"] > [flex-md=\"20\"],\n  [layout-md=\"row\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-md=\"20\"],\n  [layout-md=\"column\"] > [flex-md=\"20\"],\n  [layout-md=\"column\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [layout=\"row\"] > [flex-md=\"25\"],\n  [layout-md=\"row\"] > [flex-md=\"25\"],\n  [layout-md=\"row\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-md=\"25\"],\n  [layout-md=\"column\"] > [flex-md=\"25\"],\n  [layout-md=\"column\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [layout=\"row\"] > [flex-md=\"30\"],\n  [layout-md=\"row\"] > [flex-md=\"30\"],\n  [layout-md=\"row\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-md=\"30\"],\n  [layout-md=\"column\"] > [flex-md=\"30\"],\n  [layout-md=\"column\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [layout=\"row\"] > [flex-md=\"35\"],\n  [layout-md=\"row\"] > [flex-md=\"35\"],\n  [layout-md=\"row\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-md=\"35\"],\n  [layout-md=\"column\"] > [flex-md=\"35\"],\n  [layout-md=\"column\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [layout=\"row\"] > [flex-md=\"40\"],\n  [layout-md=\"row\"] > [flex-md=\"40\"],\n  [layout-md=\"row\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-md=\"40\"],\n  [layout-md=\"column\"] > [flex-md=\"40\"],\n  [layout-md=\"column\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [layout=\"row\"] > [flex-md=\"45\"],\n  [layout-md=\"row\"] > [flex-md=\"45\"],\n  [layout-md=\"row\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-md=\"45\"],\n  [layout-md=\"column\"] > [flex-md=\"45\"],\n  [layout-md=\"column\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [layout=\"row\"] > [flex-md=\"50\"],\n  [layout-md=\"row\"] > [flex-md=\"50\"],\n  [layout-md=\"row\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-md=\"50\"],\n  [layout-md=\"column\"] > [flex-md=\"50\"],\n  [layout-md=\"column\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [layout=\"row\"] > [flex-md=\"55\"],\n  [layout-md=\"row\"] > [flex-md=\"55\"],\n  [layout-md=\"row\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-md=\"55\"],\n  [layout-md=\"column\"] > [flex-md=\"55\"],\n  [layout-md=\"column\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [layout=\"row\"] > [flex-md=\"60\"],\n  [layout-md=\"row\"] > [flex-md=\"60\"],\n  [layout-md=\"row\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-md=\"60\"],\n  [layout-md=\"column\"] > [flex-md=\"60\"],\n  [layout-md=\"column\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [layout=\"row\"] > [flex-md=\"65\"],\n  [layout-md=\"row\"] > [flex-md=\"65\"],\n  [layout-md=\"row\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-md=\"65\"],\n  [layout-md=\"column\"] > [flex-md=\"65\"],\n  [layout-md=\"column\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [layout=\"row\"] > [flex-md=\"70\"],\n  [layout-md=\"row\"] > [flex-md=\"70\"],\n  [layout-md=\"row\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-md=\"70\"],\n  [layout-md=\"column\"] > [flex-md=\"70\"],\n  [layout-md=\"column\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [layout=\"row\"] > [flex-md=\"75\"],\n  [layout-md=\"row\"] > [flex-md=\"75\"],\n  [layout-md=\"row\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-md=\"75\"],\n  [layout-md=\"column\"] > [flex-md=\"75\"],\n  [layout-md=\"column\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [layout=\"row\"] > [flex-md=\"80\"],\n  [layout-md=\"row\"] > [flex-md=\"80\"],\n  [layout-md=\"row\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-md=\"80\"],\n  [layout-md=\"column\"] > [flex-md=\"80\"],\n  [layout-md=\"column\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [layout=\"row\"] > [flex-md=\"85\"],\n  [layout-md=\"row\"] > [flex-md=\"85\"],\n  [layout-md=\"row\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-md=\"85\"],\n  [layout-md=\"column\"] > [flex-md=\"85\"],\n  [layout-md=\"column\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [layout=\"row\"] > [flex-md=\"90\"],\n  [layout-md=\"row\"] > [flex-md=\"90\"],\n  [layout-md=\"row\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-md=\"90\"],\n  [layout-md=\"column\"] > [flex-md=\"90\"],\n  [layout-md=\"column\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [layout=\"row\"] > [flex-md=\"95\"],\n  [layout-md=\"row\"] > [flex-md=\"95\"],\n  [layout-md=\"row\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-md=\"95\"],\n  [layout-md=\"column\"] > [flex-md=\"95\"],\n  [layout-md=\"column\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [layout=\"row\"] > [flex-md=\"100\"],\n  [layout-md=\"row\"] > [flex-md=\"100\"],\n  [layout-md=\"row\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-md=\"100\"],\n  [layout-md=\"column\"] > [flex-md=\"100\"],\n  [layout-md=\"column\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-md=\"33\"],\n  [layout-md=\"row\"] > [flex-md=\"33\"],\n  [layout-md=\"row\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"column\"] > [flex-md=\"33\"],\n  [layout-md=\"column\"] > [flex-md=\"33\"],\n  [layout-md=\"column\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"row\"] > [flex-md=\"66\"],\n  [layout-md=\"row\"] > [flex-md=\"66\"],\n  [layout-md=\"row\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-md=\"66\"],\n  [layout-md=\"column\"] > [flex-md=\"66\"],\n  [layout-md=\"column\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [hide-md] {\n    display: none;\n  }\n}\n@media (min-width: 960px) {\n  [flex-offset-gt-md=\"0\"] {\n    margin-left: 0%;\n  }\n  [flex-offset-gt-md=\"5\"] {\n    margin-left: 5%;\n  }\n  [flex-offset-gt-md=\"10\"] {\n    margin-left: 10%;\n  }\n  [flex-offset-gt-md=\"15\"] {\n    margin-left: 15%;\n  }\n  [flex-offset-gt-md=\"20\"] {\n    margin-left: 20%;\n  }\n  [flex-offset-gt-md=\"25\"] {\n    margin-left: 25%;\n  }\n  [flex-offset-gt-md=\"30\"] {\n    margin-left: 30%;\n  }\n  [flex-offset-gt-md=\"35\"] {\n    margin-left: 35%;\n  }\n  [flex-offset-gt-md=\"40\"] {\n    margin-left: 40%;\n  }\n  [flex-offset-gt-md=\"45\"] {\n    margin-left: 45%;\n  }\n  [flex-offset-gt-md=\"50\"] {\n    margin-left: 50%;\n  }\n  [flex-offset-gt-md=\"55\"] {\n    margin-left: 55%;\n  }\n  [flex-offset-gt-md=\"60\"] {\n    margin-left: 60%;\n  }\n  [flex-offset-gt-md=\"65\"] {\n    margin-left: 65%;\n  }\n  [flex-offset-gt-md=\"70\"] {\n    margin-left: 70%;\n  }\n  [flex-offset-gt-md=\"75\"] {\n    margin-left: 75%;\n  }\n  [flex-offset-gt-md=\"80\"] {\n    margin-left: 80%;\n  }\n  [flex-offset-gt-md=\"85\"] {\n    margin-left: 85%;\n  }\n  [flex-offset-gt-md=\"90\"] {\n    margin-left: 90%;\n  }\n  [flex-offset-gt-md=\"95\"] {\n    margin-left: 95%;\n  }\n  [flex-offset-gt-md=\"33\"] {\n    margin-left: calc(33.33333333%);\n  }\n  [flex-offset-gt-md=\"66\"] {\n    margin-left: calc(66.66666667%);\n  }\n  [flex-order-gt-md=\"0\"] {\n    order: 0;\n  }\n  [flex-order-gt-md=\"1\"] {\n    order: 1;\n  }\n  [flex-order-gt-md=\"2\"] {\n    order: 2;\n  }\n  [flex-order-gt-md=\"3\"] {\n    order: 3;\n  }\n  [flex-order-gt-md=\"4\"] {\n    order: 4;\n  }\n  [flex-order-gt-md=\"5\"] {\n    order: 5;\n  }\n  [flex-order-gt-md=\"6\"] {\n    order: 6;\n  }\n  [flex-order-gt-md=\"7\"] {\n    order: 7;\n  }\n  [flex-order-gt-md=\"8\"] {\n    order: 8;\n  }\n  [flex-order-gt-md=\"9\"] {\n    order: 9;\n  }\n  [flex-order-gt-md=\"10\"] {\n    order: 10;\n  }\n  [flex-order-gt-md=\"11\"] {\n    order: 11;\n  }\n  [flex-order-gt-md=\"12\"] {\n    order: 12;\n  }\n  [flex-order-gt-md=\"13\"] {\n    order: 13;\n  }\n  [flex-order-gt-md=\"14\"] {\n    order: 14;\n  }\n  [flex-order-gt-md=\"15\"] {\n    order: 15;\n  }\n  [flex-order-gt-md=\"16\"] {\n    order: 16;\n  }\n  [flex-order-gt-md=\"17\"] {\n    order: 17;\n  }\n  [flex-order-gt-md=\"18\"] {\n    order: 18;\n  }\n  [flex-order-gt-md=\"19\"] {\n    order: 19;\n  }\n  [flex-order-gt-md=\"20\"] {\n    order: 20;\n  }\n  [layout-gt-md] {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  [layout-gt-md] > * {\n    box-sizing: border-box;\n  }\n  [layout-gt-md=\"column\"] {\n    flex-direction: column;\n  }\n  [layout-gt-md=\"row\"] {\n    flex-direction: row;\n  }\n  [layout-align-gt-md] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch;\n  }\n  [layout-align-gt-md^=\"start\"] {\n    justify-content: flex-start;\n  }\n  [layout-align-gt-md^=\"center\"] {\n    justify-content: center;\n  }\n  [layout-align-gt-md^=\"end\"] {\n    justify-content: flex-end;\n  }\n  [layout-align-gt-md^=\"space-around\"] {\n    justify-content: space-around;\n  }\n  [layout-align-gt-md^=\"space-between\"] {\n    justify-content: space-between;\n  }\n  [layout-align-gt-md$=\"start\"] {\n    align-items: flex-start;\n    align-content: flex-start;\n  }\n  [layout-align-gt-md$=\"center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%;\n  }\n  [layout-align-gt-md$=\"center\"] > * {\n    max-width: 100%;\n  }\n  [layout-align-gt-md$=\"end\"] {\n    align-items: flex-end;\n    align-content: flex-end;\n  }\n  [layout-align-gt-md=\"start\"],\n  [layout-align-gt-md=\"end\"],\n  [layout-align-gt-md=\"center\"],\n  [layout-align-gt-md=\"space-around\"],\n  [layout-align-gt-md=\"space-between\"] {\n    align-items: stretch;\n    align-content: stretch;\n  }\n  [flex-gt-md] {\n    flex: 1;\n  }\n  [flex-gt-md-start] {\n    margin-bottom: auto;\n  }\n  [flex-gt-md-end] {\n    margin-top: auto;\n  }\n  [flex-gt-md-none] {\n    flex: 0 0 auto;\n  }\n  [flex-gt-md-initial] {\n    flex: 0 1 auto;\n  }\n  [flex-gt-md-noshrink] {\n    flex: 1 0 auto;\n  }\n  [flex-gt-md-auto] {\n    flex: 1 1 auto;\n  }\n  [flex-gt-md-grow] {\n    flex: 1 1 100%;\n  }\n  [flex-gt-md],\n  [layout=\"row\"] > [flex-gt-md],\n  [layout-gt-md=\"row\"] > [flex-gt-md] {\n    max-height: 100%;\n  }\n  [layout-gt-md=\"column\"] > [flex-gt-md],\n  [layout=\"column\"] > [flex-gt-md] {\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"row\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"5\"],\n  [layout-gt-md=\"column\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"row\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"10\"],\n  [layout-gt-md=\"column\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"row\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"15\"],\n  [layout-gt-md=\"column\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"row\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"20\"],\n  [layout-gt-md=\"column\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"row\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"25\"],\n  [layout-gt-md=\"column\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"row\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"30\"],\n  [layout-gt-md=\"column\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"row\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"35\"],\n  [layout-gt-md=\"column\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"row\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"40\"],\n  [layout-gt-md=\"column\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"row\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"45\"],\n  [layout-gt-md=\"column\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"row\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"50\"],\n  [layout-gt-md=\"column\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"row\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"55\"],\n  [layout-gt-md=\"column\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"row\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"60\"],\n  [layout-gt-md=\"column\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"row\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"65\"],\n  [layout-gt-md=\"column\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"row\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"70\"],\n  [layout-gt-md=\"column\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"row\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"75\"],\n  [layout-gt-md=\"column\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"row\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"80\"],\n  [layout-gt-md=\"column\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"row\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"85\"],\n  [layout-gt-md=\"column\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"row\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"90\"],\n  [layout-gt-md=\"column\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"row\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"95\"],\n  [layout-gt-md=\"column\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"row\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"100\"],\n  [layout-gt-md=\"column\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"row\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"33\"],\n  [layout-gt-md=\"column\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"row\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"row\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"row\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"column\"] > [flex-gt-md=\"66\"],\n  [layout-gt-md=\"column\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [hide-gt-md] {\n    display: none;\n  }\n}\n@media (min-width: 960px) and (max-width: 1199px) {\n  [flex-offset-lg=\"0\"] {\n    margin-left: 0%;\n  }\n  [flex-offset-lg=\"5\"] {\n    margin-left: 5%;\n  }\n  [flex-offset-lg=\"10\"] {\n    margin-left: 10%;\n  }\n  [flex-offset-lg=\"15\"] {\n    margin-left: 15%;\n  }\n  [flex-offset-lg=\"20\"] {\n    margin-left: 20%;\n  }\n  [flex-offset-lg=\"25\"] {\n    margin-left: 25%;\n  }\n  [flex-offset-lg=\"30\"] {\n    margin-left: 30%;\n  }\n  [flex-offset-lg=\"35\"] {\n    margin-left: 35%;\n  }\n  [flex-offset-lg=\"40\"] {\n    margin-left: 40%;\n  }\n  [flex-offset-lg=\"45\"] {\n    margin-left: 45%;\n  }\n  [flex-offset-lg=\"50\"] {\n    margin-left: 50%;\n  }\n  [flex-offset-lg=\"55\"] {\n    margin-left: 55%;\n  }\n  [flex-offset-lg=\"60\"] {\n    margin-left: 60%;\n  }\n  [flex-offset-lg=\"65\"] {\n    margin-left: 65%;\n  }\n  [flex-offset-lg=\"70\"] {\n    margin-left: 70%;\n  }\n  [flex-offset-lg=\"75\"] {\n    margin-left: 75%;\n  }\n  [flex-offset-lg=\"80\"] {\n    margin-left: 80%;\n  }\n  [flex-offset-lg=\"85\"] {\n    margin-left: 85%;\n  }\n  [flex-offset-lg=\"90\"] {\n    margin-left: 90%;\n  }\n  [flex-offset-lg=\"95\"] {\n    margin-left: 95%;\n  }\n  [flex-offset-lg=\"33\"] {\n    margin-left: calc(33.33333333%);\n  }\n  [flex-offset-lg=\"66\"] {\n    margin-left: calc(66.66666667%);\n  }\n  [flex-order-lg=\"0\"] {\n    order: 0;\n  }\n  [flex-order-lg=\"1\"] {\n    order: 1;\n  }\n  [flex-order-lg=\"2\"] {\n    order: 2;\n  }\n  [flex-order-lg=\"3\"] {\n    order: 3;\n  }\n  [flex-order-lg=\"4\"] {\n    order: 4;\n  }\n  [flex-order-lg=\"5\"] {\n    order: 5;\n  }\n  [flex-order-lg=\"6\"] {\n    order: 6;\n  }\n  [flex-order-lg=\"7\"] {\n    order: 7;\n  }\n  [flex-order-lg=\"8\"] {\n    order: 8;\n  }\n  [flex-order-lg=\"9\"] {\n    order: 9;\n  }\n  [flex-order-lg=\"10\"] {\n    order: 10;\n  }\n  [flex-order-lg=\"11\"] {\n    order: 11;\n  }\n  [flex-order-lg=\"12\"] {\n    order: 12;\n  }\n  [flex-order-lg=\"13\"] {\n    order: 13;\n  }\n  [flex-order-lg=\"14\"] {\n    order: 14;\n  }\n  [flex-order-lg=\"15\"] {\n    order: 15;\n  }\n  [flex-order-lg=\"16\"] {\n    order: 16;\n  }\n  [flex-order-lg=\"17\"] {\n    order: 17;\n  }\n  [flex-order-lg=\"18\"] {\n    order: 18;\n  }\n  [flex-order-lg=\"19\"] {\n    order: 19;\n  }\n  [flex-order-lg=\"20\"] {\n    order: 20;\n  }\n  [layout-lg] {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  [layout-lg] > * {\n    box-sizing: border-box;\n  }\n  [layout-lg=\"column\"] {\n    flex-direction: column;\n  }\n  [layout-lg=\"row\"] {\n    flex-direction: row;\n  }\n  [layout-align-lg] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch;\n  }\n  [layout-align-lg^=\"start\"] {\n    justify-content: flex-start;\n  }\n  [layout-align-lg^=\"center\"] {\n    justify-content: center;\n  }\n  [layout-align-lg^=\"end\"] {\n    justify-content: flex-end;\n  }\n  [layout-align-lg^=\"space-around\"] {\n    justify-content: space-around;\n  }\n  [layout-align-lg^=\"space-between\"] {\n    justify-content: space-between;\n  }\n  [layout-align-lg$=\"start\"] {\n    align-items: flex-start;\n    align-content: flex-start;\n  }\n  [layout-align-lg$=\"center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%;\n  }\n  [layout-align-lg$=\"center\"] > * {\n    max-width: 100%;\n  }\n  [layout-align-lg$=\"end\"] {\n    align-items: flex-end;\n    align-content: flex-end;\n  }\n  [layout-align-lg=\"start\"],\n  [layout-align-lg=\"end\"],\n  [layout-align-lg=\"center\"],\n  [layout-align-lg=\"space-around\"],\n  [layout-align-lg=\"space-between\"] {\n    align-items: stretch;\n    align-content: stretch;\n  }\n  [flex-lg] {\n    flex: 1;\n  }\n  [flex-lg-start] {\n    margin-bottom: auto;\n  }\n  [flex-lg-end] {\n    margin-top: auto;\n  }\n  [flex-lg-none] {\n    flex: 0 0 auto;\n  }\n  [flex-lg-initial] {\n    flex: 0 1 auto;\n  }\n  [flex-lg-noshrink] {\n    flex: 1 0 auto;\n  }\n  [flex-lg-auto] {\n    flex: 1 1 auto;\n  }\n  [flex-lg-grow] {\n    flex: 1 1 100%;\n  }\n  [flex-lg],\n  [layout=\"row\"] > [flex-lg],\n  [layout-lg=\"row\"] > [flex-lg] {\n    max-height: 100%;\n  }\n  [layout-lg=\"column\"] > [flex-lg],\n  [layout=\"column\"] > [flex-lg] {\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-lg=\"5\"],\n  [layout-lg=\"row\"] > [flex-lg=\"5\"],\n  [layout-lg=\"row\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-lg=\"5\"],\n  [layout-lg=\"column\"] > [flex-lg=\"5\"],\n  [layout-lg=\"column\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [layout=\"row\"] > [flex-lg=\"10\"],\n  [layout-lg=\"row\"] > [flex-lg=\"10\"],\n  [layout-lg=\"row\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-lg=\"10\"],\n  [layout-lg=\"column\"] > [flex-lg=\"10\"],\n  [layout-lg=\"column\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [layout=\"row\"] > [flex-lg=\"15\"],\n  [layout-lg=\"row\"] > [flex-lg=\"15\"],\n  [layout-lg=\"row\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-lg=\"15\"],\n  [layout-lg=\"column\"] > [flex-lg=\"15\"],\n  [layout-lg=\"column\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [layout=\"row\"] > [flex-lg=\"20\"],\n  [layout-lg=\"row\"] > [flex-lg=\"20\"],\n  [layout-lg=\"row\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-lg=\"20\"],\n  [layout-lg=\"column\"] > [flex-lg=\"20\"],\n  [layout-lg=\"column\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [layout=\"row\"] > [flex-lg=\"25\"],\n  [layout-lg=\"row\"] > [flex-lg=\"25\"],\n  [layout-lg=\"row\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-lg=\"25\"],\n  [layout-lg=\"column\"] > [flex-lg=\"25\"],\n  [layout-lg=\"column\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [layout=\"row\"] > [flex-lg=\"30\"],\n  [layout-lg=\"row\"] > [flex-lg=\"30\"],\n  [layout-lg=\"row\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-lg=\"30\"],\n  [layout-lg=\"column\"] > [flex-lg=\"30\"],\n  [layout-lg=\"column\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [layout=\"row\"] > [flex-lg=\"35\"],\n  [layout-lg=\"row\"] > [flex-lg=\"35\"],\n  [layout-lg=\"row\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-lg=\"35\"],\n  [layout-lg=\"column\"] > [flex-lg=\"35\"],\n  [layout-lg=\"column\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [layout=\"row\"] > [flex-lg=\"40\"],\n  [layout-lg=\"row\"] > [flex-lg=\"40\"],\n  [layout-lg=\"row\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-lg=\"40\"],\n  [layout-lg=\"column\"] > [flex-lg=\"40\"],\n  [layout-lg=\"column\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [layout=\"row\"] > [flex-lg=\"45\"],\n  [layout-lg=\"row\"] > [flex-lg=\"45\"],\n  [layout-lg=\"row\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-lg=\"45\"],\n  [layout-lg=\"column\"] > [flex-lg=\"45\"],\n  [layout-lg=\"column\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [layout=\"row\"] > [flex-lg=\"50\"],\n  [layout-lg=\"row\"] > [flex-lg=\"50\"],\n  [layout-lg=\"row\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-lg=\"50\"],\n  [layout-lg=\"column\"] > [flex-lg=\"50\"],\n  [layout-lg=\"column\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [layout=\"row\"] > [flex-lg=\"55\"],\n  [layout-lg=\"row\"] > [flex-lg=\"55\"],\n  [layout-lg=\"row\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-lg=\"55\"],\n  [layout-lg=\"column\"] > [flex-lg=\"55\"],\n  [layout-lg=\"column\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [layout=\"row\"] > [flex-lg=\"60\"],\n  [layout-lg=\"row\"] > [flex-lg=\"60\"],\n  [layout-lg=\"row\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-lg=\"60\"],\n  [layout-lg=\"column\"] > [flex-lg=\"60\"],\n  [layout-lg=\"column\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [layout=\"row\"] > [flex-lg=\"65\"],\n  [layout-lg=\"row\"] > [flex-lg=\"65\"],\n  [layout-lg=\"row\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-lg=\"65\"],\n  [layout-lg=\"column\"] > [flex-lg=\"65\"],\n  [layout-lg=\"column\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [layout=\"row\"] > [flex-lg=\"70\"],\n  [layout-lg=\"row\"] > [flex-lg=\"70\"],\n  [layout-lg=\"row\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-lg=\"70\"],\n  [layout-lg=\"column\"] > [flex-lg=\"70\"],\n  [layout-lg=\"column\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [layout=\"row\"] > [flex-lg=\"75\"],\n  [layout-lg=\"row\"] > [flex-lg=\"75\"],\n  [layout-lg=\"row\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-lg=\"75\"],\n  [layout-lg=\"column\"] > [flex-lg=\"75\"],\n  [layout-lg=\"column\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [layout=\"row\"] > [flex-lg=\"80\"],\n  [layout-lg=\"row\"] > [flex-lg=\"80\"],\n  [layout-lg=\"row\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-lg=\"80\"],\n  [layout-lg=\"column\"] > [flex-lg=\"80\"],\n  [layout-lg=\"column\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [layout=\"row\"] > [flex-lg=\"85\"],\n  [layout-lg=\"row\"] > [flex-lg=\"85\"],\n  [layout-lg=\"row\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-lg=\"85\"],\n  [layout-lg=\"column\"] > [flex-lg=\"85\"],\n  [layout-lg=\"column\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [layout=\"row\"] > [flex-lg=\"90\"],\n  [layout-lg=\"row\"] > [flex-lg=\"90\"],\n  [layout-lg=\"row\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-lg=\"90\"],\n  [layout-lg=\"column\"] > [flex-lg=\"90\"],\n  [layout-lg=\"column\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [layout=\"row\"] > [flex-lg=\"95\"],\n  [layout-lg=\"row\"] > [flex-lg=\"95\"],\n  [layout-lg=\"row\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-lg=\"95\"],\n  [layout-lg=\"column\"] > [flex-lg=\"95\"],\n  [layout-lg=\"column\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [layout=\"row\"] > [flex-lg=\"100\"],\n  [layout-lg=\"row\"] > [flex-lg=\"100\"],\n  [layout-lg=\"row\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-lg=\"100\"],\n  [layout-lg=\"column\"] > [flex-lg=\"100\"],\n  [layout-lg=\"column\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-lg=\"33\"],\n  [layout-lg=\"row\"] > [flex-lg=\"33\"],\n  [layout-lg=\"row\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"column\"] > [flex-lg=\"33\"],\n  [layout-lg=\"column\"] > [flex-lg=\"33\"],\n  [layout-lg=\"column\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"row\"] > [flex-lg=\"66\"],\n  [layout-lg=\"row\"] > [flex-lg=\"66\"],\n  [layout-lg=\"row\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-lg=\"66\"],\n  [layout-lg=\"column\"] > [flex-lg=\"66\"],\n  [layout-lg=\"column\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [hide-lg] {\n    display: none;\n  }\n}\n@media (min-width: 1200px) {\n  [flex-offset-gt-lg=\"0\"] {\n    margin-left: 0%;\n  }\n  [flex-offset-gt-lg=\"5\"] {\n    margin-left: 5%;\n  }\n  [flex-offset-gt-lg=\"10\"] {\n    margin-left: 10%;\n  }\n  [flex-offset-gt-lg=\"15\"] {\n    margin-left: 15%;\n  }\n  [flex-offset-gt-lg=\"20\"] {\n    margin-left: 20%;\n  }\n  [flex-offset-gt-lg=\"25\"] {\n    margin-left: 25%;\n  }\n  [flex-offset-gt-lg=\"30\"] {\n    margin-left: 30%;\n  }\n  [flex-offset-gt-lg=\"35\"] {\n    margin-left: 35%;\n  }\n  [flex-offset-gt-lg=\"40\"] {\n    margin-left: 40%;\n  }\n  [flex-offset-gt-lg=\"45\"] {\n    margin-left: 45%;\n  }\n  [flex-offset-gt-lg=\"50\"] {\n    margin-left: 50%;\n  }\n  [flex-offset-gt-lg=\"55\"] {\n    margin-left: 55%;\n  }\n  [flex-offset-gt-lg=\"60\"] {\n    margin-left: 60%;\n  }\n  [flex-offset-gt-lg=\"65\"] {\n    margin-left: 65%;\n  }\n  [flex-offset-gt-lg=\"70\"] {\n    margin-left: 70%;\n  }\n  [flex-offset-gt-lg=\"75\"] {\n    margin-left: 75%;\n  }\n  [flex-offset-gt-lg=\"80\"] {\n    margin-left: 80%;\n  }\n  [flex-offset-gt-lg=\"85\"] {\n    margin-left: 85%;\n  }\n  [flex-offset-gt-lg=\"90\"] {\n    margin-left: 90%;\n  }\n  [flex-offset-gt-lg=\"95\"] {\n    margin-left: 95%;\n  }\n  [flex-offset-gt-lg=\"33\"] {\n    margin-left: calc(33.33333333%);\n  }\n  [flex-offset-gt-lg=\"66\"] {\n    margin-left: calc(66.66666667%);\n  }\n  [flex-order-gt-lg=\"0\"] {\n    order: 0;\n  }\n  [flex-order-gt-lg=\"1\"] {\n    order: 1;\n  }\n  [flex-order-gt-lg=\"2\"] {\n    order: 2;\n  }\n  [flex-order-gt-lg=\"3\"] {\n    order: 3;\n  }\n  [flex-order-gt-lg=\"4\"] {\n    order: 4;\n  }\n  [flex-order-gt-lg=\"5\"] {\n    order: 5;\n  }\n  [flex-order-gt-lg=\"6\"] {\n    order: 6;\n  }\n  [flex-order-gt-lg=\"7\"] {\n    order: 7;\n  }\n  [flex-order-gt-lg=\"8\"] {\n    order: 8;\n  }\n  [flex-order-gt-lg=\"9\"] {\n    order: 9;\n  }\n  [flex-order-gt-lg=\"10\"] {\n    order: 10;\n  }\n  [flex-order-gt-lg=\"11\"] {\n    order: 11;\n  }\n  [flex-order-gt-lg=\"12\"] {\n    order: 12;\n  }\n  [flex-order-gt-lg=\"13\"] {\n    order: 13;\n  }\n  [flex-order-gt-lg=\"14\"] {\n    order: 14;\n  }\n  [flex-order-gt-lg=\"15\"] {\n    order: 15;\n  }\n  [flex-order-gt-lg=\"16\"] {\n    order: 16;\n  }\n  [flex-order-gt-lg=\"17\"] {\n    order: 17;\n  }\n  [flex-order-gt-lg=\"18\"] {\n    order: 18;\n  }\n  [flex-order-gt-lg=\"19\"] {\n    order: 19;\n  }\n  [flex-order-gt-lg=\"20\"] {\n    order: 20;\n  }\n  [layout-gt-lg] {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  [layout-gt-lg] > * {\n    box-sizing: border-box;\n  }\n  [layout-gt-lg=\"column\"] {\n    flex-direction: column;\n  }\n  [layout-gt-lg=\"row\"] {\n    flex-direction: row;\n  }\n  [layout-align-gt-lg] {\n    justify-content: flex-start;\n    align-content: stretch;\n    align-items: stretch;\n  }\n  [layout-align-gt-lg^=\"start\"] {\n    justify-content: flex-start;\n  }\n  [layout-align-gt-lg^=\"center\"] {\n    justify-content: center;\n  }\n  [layout-align-gt-lg^=\"end\"] {\n    justify-content: flex-end;\n  }\n  [layout-align-gt-lg^=\"space-around\"] {\n    justify-content: space-around;\n  }\n  [layout-align-gt-lg^=\"space-between\"] {\n    justify-content: space-between;\n  }\n  [layout-align-gt-lg$=\"start\"] {\n    align-items: flex-start;\n    align-content: flex-start;\n  }\n  [layout-align-gt-lg$=\"center\"] {\n    align-items: center;\n    align-content: center;\n    max-width: 100%;\n  }\n  [layout-align-gt-lg$=\"center\"] > * {\n    max-width: 100%;\n  }\n  [layout-align-gt-lg$=\"end\"] {\n    align-items: flex-end;\n    align-content: flex-end;\n  }\n  [layout-align-gt-lg=\"start\"],\n  [layout-align-gt-lg=\"end\"],\n  [layout-align-gt-lg=\"center\"],\n  [layout-align-gt-lg=\"space-around\"],\n  [layout-align-gt-lg=\"space-between\"] {\n    align-items: stretch;\n    align-content: stretch;\n  }\n  [flex-gt-lg] {\n    flex: 1;\n  }\n  [flex-gt-lg-start] {\n    margin-bottom: auto;\n  }\n  [flex-gt-lg-end] {\n    margin-top: auto;\n  }\n  [flex-gt-lg-none] {\n    flex: 0 0 auto;\n  }\n  [flex-gt-lg-initial] {\n    flex: 0 1 auto;\n  }\n  [flex-gt-lg-noshrink] {\n    flex: 1 0 auto;\n  }\n  [flex-gt-lg-auto] {\n    flex: 1 1 auto;\n  }\n  [flex-gt-lg-grow] {\n    flex: 1 1 100%;\n  }\n  [flex-gt-lg],\n  [layout=\"row\"] > [flex-gt-lg],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg] {\n    max-height: 100%;\n  }\n  [layout-gt-lg=\"column\"] > [flex-gt-lg],\n  [layout=\"column\"] > [flex-gt-lg] {\n    max-width: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"row\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-width: 5%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"5\"],\n  [layout-gt-lg=\"column\"] > [flex=\"5\"] {\n    flex: 1 1 5%;\n    max-height: 5%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"row\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-width: 10%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"10\"],\n  [layout-gt-lg=\"column\"] > [flex=\"10\"] {\n    flex: 1 1 10%;\n    max-height: 10%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"row\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-width: 15%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"15\"],\n  [layout-gt-lg=\"column\"] > [flex=\"15\"] {\n    flex: 1 1 15%;\n    max-height: 15%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"row\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-width: 20%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"20\"],\n  [layout-gt-lg=\"column\"] > [flex=\"20\"] {\n    flex: 1 1 20%;\n    max-height: 20%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"row\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-width: 25%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"25\"],\n  [layout-gt-lg=\"column\"] > [flex=\"25\"] {\n    flex: 1 1 25%;\n    max-height: 25%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"row\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-width: 30%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"30\"],\n  [layout-gt-lg=\"column\"] > [flex=\"30\"] {\n    flex: 1 1 30%;\n    max-height: 30%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"row\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-width: 35%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"35\"],\n  [layout-gt-lg=\"column\"] > [flex=\"35\"] {\n    flex: 1 1 35%;\n    max-height: 35%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"row\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-width: 40%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"40\"],\n  [layout-gt-lg=\"column\"] > [flex=\"40\"] {\n    flex: 1 1 40%;\n    max-height: 40%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"row\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-width: 45%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"45\"],\n  [layout-gt-lg=\"column\"] > [flex=\"45\"] {\n    flex: 1 1 45%;\n    max-height: 45%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"row\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-width: 50%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"50\"],\n  [layout-gt-lg=\"column\"] > [flex=\"50\"] {\n    flex: 1 1 50%;\n    max-height: 50%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"row\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-width: 55%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"55\"],\n  [layout-gt-lg=\"column\"] > [flex=\"55\"] {\n    flex: 1 1 55%;\n    max-height: 55%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"row\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-width: 60%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"60\"],\n  [layout-gt-lg=\"column\"] > [flex=\"60\"] {\n    flex: 1 1 60%;\n    max-height: 60%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"row\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-width: 65%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"65\"],\n  [layout-gt-lg=\"column\"] > [flex=\"65\"] {\n    flex: 1 1 65%;\n    max-height: 65%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"row\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-width: 70%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"70\"],\n  [layout-gt-lg=\"column\"] > [flex=\"70\"] {\n    flex: 1 1 70%;\n    max-height: 70%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"row\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-width: 75%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"75\"],\n  [layout-gt-lg=\"column\"] > [flex=\"75\"] {\n    flex: 1 1 75%;\n    max-height: 75%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"row\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-width: 80%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"80\"],\n  [layout-gt-lg=\"column\"] > [flex=\"80\"] {\n    flex: 1 1 80%;\n    max-height: 80%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"row\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-width: 85%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"85\"],\n  [layout-gt-lg=\"column\"] > [flex=\"85\"] {\n    flex: 1 1 85%;\n    max-height: 85%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"row\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-width: 90%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"90\"],\n  [layout-gt-lg=\"column\"] > [flex=\"90\"] {\n    flex: 1 1 90%;\n    max-height: 90%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"row\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-width: 95%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"95\"],\n  [layout-gt-lg=\"column\"] > [flex=\"95\"] {\n    flex: 1 1 95%;\n    max-height: 95%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"row\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-width: 100%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"100\"],\n  [layout-gt-lg=\"column\"] > [flex=\"100\"] {\n    flex: 1 1 100%;\n    max-height: 100%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"row\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-width: 33.33%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"33\"],\n  [layout-gt-lg=\"column\"] > [flex=\"33\"] {\n    flex: 1 1 33.33%;\n    max-height: 33.33%;\n  }\n  [layout=\"row\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"row\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"row\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-width: 66.66%;\n  }\n  [layout=\"column\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"column\"] > [flex-gt-lg=\"66\"],\n  [layout-gt-lg=\"column\"] > [flex=\"66\"] {\n    flex: 1 1 66.66%;\n    max-height: 66.66%;\n  }\n  [hide-gt-lg] {\n    display: none;\n  }\n}\n[layout-padding] > [flex-sm] {\n  padding: 0.25em;\n}\n[layout-padding],\n[layout-padding] > [flex],\n[layout-padding] > [flex-gt-sm],\n[layout-padding] > [flex-md] {\n  padding: 0.5em;\n}\n[layout-padding] > [flex-gt-md],\n[layout-padding] > [flex-lg] {\n  padding: 1em;\n}\n[layout-margin] > [flex-sm] {\n  margin: 0.25em;\n}\n[layout-margin],\n[layout-margin] > [flex],\n[layout-margin] > [flex-gt-sm],\n[layout-margin] > [flex-md] {\n  margin: 0.5em;\n}\n[layout-margin] > [flex-gt-md],\n[layout-margin] > [flex-lg] {\n  margin: 1em;\n}\n[layout-nowrap] {\n  flex-wrap: nowrap;\n}\n/*  ========================================\n    COLORS\n    ======================================== */\n/*  ========================================\n    FONTS\n    ======================================== */\n/*  ========================================\n    BREAKPOINTS\n    ======================================== */\n/*  ========================================\n    Z-INDEXES\n    ======================================== */\n/*  ========================================\n    DURATIONS\n    ======================================== */\n/*  ========================================\n    INDENTATIONS\n    ======================================== */\n/*  ========================================\n    INDENTATIONS\n    ======================================== */\n/* ========================================\nMIXINS\n* General Use Mixins to ease up reoccuring styles\n* No Components!\n======================================== */\n/* ========================================\nBUTTON COMPONENT\n* Defines a full-width colorful container\n*\n* @size: small|medium|large|custom(e.g.:5%)\n* @indent: small|medium|large|custom(e.g.:5%)\n* @color: color\n======================================== */\n.button.outline {\n  display: inline-block;\n  user-select: none;\n  width: auto;\n  margin-top: 1em;\n  border-radius: .1em;\n  font-size: 1em;\n  cursor: pointer;\n  line-height: 1;\n  text-transform: uppercase;\n  transition: all 0.5s ease;\n  font-family: 'Merriweather Sans', verdana;\n  background-color: transparent;\n  color: #f4f1f2;\n  border: 1px solid #f4f1f2;\n}\n.button.outline:hover {\n  background-color: #f4f1f2;\n  color: #ff0044;\n}\n.button.reverse {\n  display: inline-block;\n  user-select: none;\n  width: auto;\n  margin-top: 1em;\n  border-radius: .1em;\n  font-size: 1em;\n  cursor: pointer;\n  line-height: 1;\n  text-transform: uppercase;\n  transition: all 0.5s ease;\n  font-family: 'Merriweather Sans', verdana;\n  background-color: transparent;\n  color: #ff0044;\n  border: 1px solid #ff0044;\n}\n.button.reverse:hover {\n  color: #f4f1f2;\n  background-color: #ff0044;\n}\n/* ========================================\nCARD COMPONENT\n* Defines a rectangular area, used for a specific kind of content\n* containing a title, description and actions (buttons/icons)\n* a card is often used together with grid systems to evenly\n* distribute related content.\n* Cards contain little and scannable content to quickly get to the desired\n* full content. Thus, a description should contain not more than 140 letters\n*\n* @type\n======================================== */\n/* ========================================\nSTRIPE COMPONENT\n* Defines a full-width colorful container\n*\n* @padding: small|medium|large|custom(e.g.:5%)\n* @width: small|medium|large|custom(e.g.:300)\n* this value is substracted from the current breakpoint\n* @color: color\n======================================== */\n.stripe.fluid {\n  padding: 0;\n}\n.stripe.fluid > * {\n  width: 100%;\n}\n.stripe.medium {\n  padding: 2em 0;\n  width: 100%;\n  padding-top: 4em;\n  padding-bottom: 4em;\n}\n.stripe.medium > * {\n  margin-left: auto;\n  margin-right: auto;\n}\n@media screen and (max-width: 600px) {\n  .stripe.medium > * {\n    padding-left: 5%;\n    padding-right: 5%;\n  }\n}\n@media screen and (min-width: 600px) {\n  .stripe.medium > * {\n    width: 493.33333333px;\n  }\n}\n@media screen and (min-width: 960px) {\n  .stripe.medium > * {\n    width: 800px;\n  }\n}\n@media screen and (min-width: 1200px) {\n  .stripe.medium > * {\n    width: 880px;\n  }\n}\n.stripe.small {\n  padding: 2em 0;\n  width: 100%;\n  padding-top: 4em;\n  padding-bottom: 4em;\n}\n.stripe.small > * {\n  margin-left: auto;\n  margin-right: auto;\n}\n@media screen and (max-width: 600px) {\n  .stripe.small > * {\n    padding-left: 5%;\n    padding-right: 5%;\n  }\n}\n@media screen and (min-width: 600px) {\n  .stripe.small > * {\n    width: 386.66666667px;\n  }\n}\n@media screen and (min-width: 960px) {\n  .stripe.small > * {\n    width: 640px;\n  }\n}\n@media screen and (min-width: 1200px) {\n  .stripe.small > * {\n    width: 560px;\n  }\n}\n/* ========================================\nBASE\n* Contains HTML default elements (b,i,u,table...)\n* Does not contain classes, ids\n* Can implement mixins\n======================================== */\n* {\n  box-sizing: border-box;\n}\n::-webkit-scrollbar {\n  width: .5em;\n}\n::-webkit-scrollbar-thumb {\n  background: rgba(56, 46, 49, 0.5);\n}\n::-webkit-scrollbar-track {\n  background: rgba(244, 241, 242, 0.5);\n}\n/*  ========================================\n    BLOCK ELEMENTS\n    ======================================== */\ncode,\npre {\n  font-family: 'Cousine', monospace;\n}\ncode {\n  color: #ff0044;\n}\nbody,\nhtml {\n  scroll-behavior: smooth;\n  background-color: #f4f1f2;\n  min-width: 320px;\n  font-family: 'Merriweather Sans', verdana;\n  font-weight: 300;\n  font-size: 16px;\n  line-height: 1.5em;\n  color: #382e31;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  width: 100%;\n}\napp {\n  height: 100%;\n  width: 100%;\n}\ntable {\n  margin: 1em 0 2em 0;\n  border-spacing: 0;\n  width: 100%;\n}\ntable thead {\n  background: #e8e3e4;\n}\ntable th {\n  font-family: 'Merriweather Sans', verdana, sans-serif;\n  font-weight: normal;\n  text-align: left;\n  background: #e8e3e4;\n  vertical-align: top;\n}\ntable tr th,\ntable tr td {\n  vertical-align: top;\n  padding: .75em .75em .25em .5em;\n  border-bottom: 1px solid #ddd5d7;\n}\n/*  ========================================\n    TEXTUAL/CONTENT ELEMENTS\n    ======================================== */\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 0;\n  margin: 1em 0;\n  line-height: 1.25em;\n  text-transform: none;\n  font-family: 'Merriweather Sans', sans-serif;\n  font-weight: 400;\n}\nh1 a,\nh2 a,\nh3 a,\nh4 a,\nh5 a,\nh6 a {\n  text-decoration: none;\n}\nh1,\nh2,\nh3,\nh4 {\n  position: relative;\n}\nh1 a,\nh2 a,\nh3 a,\nh4 a {\n  position: absolute;\n  left: -1em;\n  width: calc(100% + 1em);\n  opacity: 0;\n  transition: 0.33s all ease;\n}\nh1:hover a,\nh2:hover a,\nh3:hover a,\nh4:hover a {\n  opacity: 1;\n}\nh1 {\n  font-size: 2.5em;\n  margin: 0;\n  padding-top: 1.5em;\n  text-transform: uppercase;\n}\nh2 {\n  font-size: 1.5em;\n  color: #ff0044;\n}\nh3,\nh3 a {\n  font-size: 1.15em;\n  color: #ff0044;\n}\nh4 {\n  font-size: 1rem;\n  color: #ff0044;\n}\nhr {\n  margin: 1em 0;\n  border: none;\n  width: 100%;\n  height: .1rem;\n  background-color: #baabaf;\n}\np {\n  padding: 0;\n  margin: 1em 0;\n  line-height: 1.5em;\n  word-wrap: break-word;\n}\np:first-child {\n  margin-top: 0;\n}\np:last-child {\n  margin-bottom: 0;\n}\na {\n  position: relative;\n  transition: all 0.5s ease;\n  color: #ff0044;\n  text-decoration: none;\n  cursor: pointer;\n  outline: 0;\n}\na:hover {\n  color: #ff0044;\n}\na img {\n  border: none;\n  outline: none;\n}\na p,\na span {\n  cursor: pointer;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n}\nul {\n  list-style: square;\n}\nul,\nol {\n  padding: 0 0 0 1em;\n  margin-bottom: 0;\n}\nol {\n  list-style-type: decimal;\n}\nol ol {\n  list-style-type: lower-alpha;\n}\nb,\nstrong {\n  font-weight: 700;\n  font-family: 'Merriweather Sans', verdana, sans-serif;\n}\n/*  ========================================\n    FORM ELEMENTS\n    ======================================== */\nfieldset {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\ninput[type=submit] {\n  display: inline-block;\n  user-select: none;\n  width: auto;\n  margin-top: 1em;\n  border-radius: .1em;\n  font-size: 1em;\n  cursor: pointer;\n  line-height: 1;\n  text-transform: uppercase;\n  transition: all 0.5s ease;\n  font-family: 'Merriweather Sans', verdana;\n  background-color: transparent;\n  color: #ff0044;\n  border: 1px solid #ff0044;\n  margin: 0;\n}\ninput[type=submit]:hover {\n  color: #f4f1f2;\n  background-color: #ff0044;\n}\n* {\n  box-sizing: border-box;\n}\n.versionpicker {\n  color: #f4f1f2;\n  padding: .5em 0;\n}\n.versionpicker img {\n  border: 1px solid #f4f1f2;\n  border-radius: 2px;\n  margin-right: 0.5eml;\n}\n.versionpicker:hover,\n.versionpicker.active {\n  color: #ff0044;\n  box-shadow: inset -0.125em 0 #ff0044;\n  background: #f4f1f2;\n}\n.versionpicker:hover > *,\n.versionpicker.active > * {\n  color: #ff0044;\n}\nmenu {\n  position: fixed;\n  margin: 0;\n  margin-left: 10em;\n  padding: 0;\n  background: rgba(56, 46, 49, 0.5);\n  z-index: 200;\n  transition: all 0.33s ease;\n  overflow-y: auto;\n  max-height: 100%;\n}\n@media screen and (max-width: 600px) {\n  menu {\n    display: none;\n  }\n}\nmenu b {\n  color: #ff0044;\n}\nmenu a {\n  font-size: .8em;\n  color: #f4f1f2;\n  display: block;\n  padding: .25em .5em;\n}\nmenu a:hover {\n  color: #ff0044;\n  background: #f4f1f2;\n}\nmenu input {\n  width: 100%;\n  padding: .25em .5em;\n}\nheader {\n  overflow-y: auto;\n  background: #ff0044;\n  color: #f4f1f2;\n  padding: 2em 0;\n}\n@media screen and (max-width: 600px) {\n  header {\n    padding: 2em 0;\n    width: 100%;\n    padding-top: 4em;\n    padding-bottom: 4em;\n    text-align: center;\n  }\n  header > * {\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n@media screen and (max-width: 600px) and screen and (max-width: 600px) {\n  header > * {\n    padding-left: 5%;\n    padding-right: 5%;\n  }\n}\n@media screen and (max-width: 600px) and screen and (min-width: 600px) {\n  header > * {\n    width: 493.33333333px;\n  }\n}\n@media screen and (max-width: 600px) and screen and (min-width: 960px) {\n  header > * {\n    width: 800px;\n  }\n}\n@media screen and (max-width: 600px) and screen and (min-width: 1200px) {\n  header > * {\n    width: 880px;\n  }\n}\n@media screen and (min-width: 600px) {\n  header {\n    position: fixed;\n    width: 10em;\n    left: 0;\n    top: 0;\n    padding: 1em 0;\n    height: 100%;\n    box-shadow: inset -0.125em 0 rgba(56, 46, 49, 0.5);\n  }\n}\nheader p {\n  color: #382e31;\n  background: #f4f1f2;\n  box-shadow: inset -0.125em 0 rgba(56, 46, 49, 0.5);\n  padding: .5em 1em;\n}\nheader .nav__item {\n  display: block;\n  color: #f4f1f2;\n  padding: 1em;\n  text-transform: uppercase;\n}\n@media screen and (max-width: 960px) {\n  header .nav__item {\n    padding: .5em;\n  }\n}\nheader .nav__item:hover,\nheader .nav__item.active {\n  background: #f4f1f2;\n  color: #ff0044;\n  box-shadow: inset -0.125em 0 #ff0044;\n}\n.top {\n  transition: all 1s ease;\n  opacity: 0;\n  border-radius: 100%;\n  position: fixed;\n  background: rgba(56, 46, 49, 0.5);\n  color: #f4f1f2;\n  font-size: 5em;\n  left: calc(50% - .5em);\n  bottom: -0.5em;\n  padding-top: .4em;\n  height: 1em;\n  width: 1em;\n  z-index: 200;\n  text-align: center;\n  vertical-align: bottom;\n  box-shadow: 0 0 0.1em rgba(244, 241, 242, 0.5);\n}\n@media screen and (min-width: 600px) {\n  .top {\n    display: none;\n  }\n}\n.top.active {\n  opacity: 1;\n}\nmain {\n  padding: 2em 0;\n  width: 100%;\n  background-color: #f4f1f2;\n  color: #382e31;\n  padding-top: 4em;\n  padding-bottom: 4em;\n}\nmain > * {\n  margin-left: auto;\n  margin-right: auto;\n}\n@media screen and (max-width: 600px) {\n  main > * {\n    padding-left: 5%;\n    padding-right: 5%;\n  }\n}\n@media screen and (min-width: 600px) {\n  main > * {\n    width: 440px;\n  }\n}\n@media screen and (min-width: 960px) {\n  main > * {\n    width: 720px;\n  }\n}\n@media screen and (min-width: 1200px) {\n  main > * {\n    width: 720px;\n  }\n}\n@media screen and (min-width: 600px) {\n  main {\n    width: calc(100% - 10em);\n    margin-left: 10em;\n  }\n}\nmain a {\n  border-bottom: 1px dashed #ff0044;\n}\nmain a:hover {\n  border-bottom: 1px solid #ff0044;\n}\nmain h1 a,\nmain h2 a,\nmain h3 a,\nmain h4 a,\nmain h5 a,\nmain h6 a,\nmain h1 a:hover,\nmain h2 a:hover,\nmain h3 a:hover,\nmain h4 a:hover,\nmain h5 a:hover,\nmain h6 a:hover {\n  border-bottom: none;\n}\nfooter {\n  padding: 2em 0;\n  width: 100%;\n  background-color: #382e31;\n  padding-top: 4em;\n  padding-bottom: 4em;\n  color: #f4f1f2;\n}\nfooter > * {\n  margin-left: auto;\n  margin-right: auto;\n}\n@media screen and (max-width: 600px) {\n  footer > * {\n    padding-left: 5%;\n    padding-right: 5%;\n  }\n}\n@media screen and (min-width: 600px) {\n  footer > * {\n    width: 440px;\n  }\n}\n@media screen and (min-width: 960px) {\n  footer > * {\n    width: 720px;\n  }\n}\n@media screen and (min-width: 1200px) {\n  footer > * {\n    width: 720px;\n  }\n}\n@media screen and (min-width: 600px) {\n  footer {\n    width: calc(100% - 10em);\n    margin-left: 10em;\n  }\n}\narticle {\n  padding: .5em;\n}\n.github-corner {\n  top: 0;\n  right: 0;\n  position: absolute;\n  z-index: 100;\n}\n@media screen and (min-width: 600px) {\n  .github-corner {\n    position: fixed;\n  }\n}\ncode[class*=language] {\n  padding: 0 .5em;\n}\npre[class*=language] {\n  border-left-width: 0;\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
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

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
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

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

riot.tag2('app', '<a href="https://github.com/MartinMuzatko/riot-cheatsheet" class="github-corner"><svg width="80" height="80" viewbox="0 0 250 250" style="fill:#fff; color:#151513; position: absolute; top: 0; border: 0; right: 0;"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a> <header layout-nowrap id="head" layout="column" layout-align="start"> <p>Riot Cheatsheet</p> <p hide-md>Love this cheatsheet? <iframe style="vertical-align:middle" src="https://ghbtns.com/github-btn.html?user=MartinMuzatko&repo=riot-cheatsheet&type=star&count=true" frameborder="0" scrolling="0" width="90px" height="20px"></iframe> </p> <nav flex-auto layout-nowrap layout="column"> <a onclick="{switchDocumentation}" href="#cheatsheet-{doc}" class="nav__item {active: name == doc}" each="{doc in docs}">{doc}</a> <a class="nav__item" flex-end href="#credits">credits</a> </nav> </header> <menu> <input placeholder="find topic..." onfocus="{filterShortcuts}" oninput="{filterShortcuts}" type="text" ref="filter"> <a onclick="{resetShortcuts}" if="{shortcut.active}" each="{shortcut in shortcuts}" href="#{shortcut.id}"> <highlight find="{parent.refs.filter.value}" name="{shortcut.name}"></highlight> </a> </menu> <a onclick="{removeClass}" href="#head" ref="top" class="top"> ^ </a> <main ref="main"> <div> <article id="cheatsheet-{doc}" ref="cheatsheet-{doc}" each="{doc in docs}"> <markdown file="{doc}"></markdown> </article> </div> </main> <footer id="credits"> <div> <p> Created with <span style="color: red">♥</span> by <a href="https://twitter.com/martinmuzatko">@MartinMuzatko</a> with Riot {builtwith} </p> <p> Learn how to use Riot in the real world. Visit <a href="http://happy-css.com">happy-css.com</a> </p> </div> </footer>', 'app .github-corner:hover .octo-arm,[data-is="app"] .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{ 0%,100%{transform:rotate(0)} 20%,60%{transform:rotate(-25deg)} 40%,80%{transform:rotate(10deg)}}@media (max-width:500px){ app .github-corner:hover .octo-arm,[data-is="app"] .github-corner:hover .octo-arm{animation:none} app .github-corner .octo-arm,[data-is="app"] .github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}', '', function (opts) {
    var _this2 = this;

    this.shortcuts = [];

    this.version = '3.6.1';

    this.builtwith = riot.version;

    this.docs = ['templating', 'tag', 'riot', 'mixin', 'observable', 'router'];

    this.name = this.docs[0];

    this.filterShortcuts = function (e) {
        var _this = this;

        var value = this.refs.filter.value.toUpperCase().replace(/\s$/g, '');
        this.shortcuts.map(function (shortcut) {
            var name = shortcut.name.toUpperCase();
            shortcut.active = false;
            if (value == '') {
                return;
            }
            if (value == '*') {
                shortcut.active = true;
                return;
            }
            if (!!~name.indexOf(value)) {
                shortcut.active = true;
            }
            if (value.split(' ').length > 1) {
                var values = value.split(' ');
                for (var val in values) {
                    if (!!~name.indexOf(values[val])) {
                        shortcut.active = true;
                    }
                }
            }
            if (shortcut.group) {
                var levelNames = _this.getGroupNames(shortcut);
                levelNames.map(function (level) {
                    shortcut.active = !!~level.indexOf(value) ? true : shortcut.active;
                });
            }
        });
    }.bind(this);

    this.removeClass = function () {
        this.refs.top.classList.remove('active');
    }.bind(this);

    this.switchDocumentation = function (e) {
        this.name = e.item.doc;
    }.bind(this);

    this.resetShortcuts = function () {
        _this2.shortcuts.map(function (shortcut) {
            shortcut.active = false;
        });
    };

    this.getGroupNames = function (node) {
        var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        if (node.group) {
            result.push(node.group.name.toUpperCase());
            return _this2.getGroupNames(node.group, result);
        } else {
            return result;
        }
    };

    this.getGroupLevel = function (node, level) {
        if (!node) {
            return node;
        }
        if (node.group && node.level != level) {
            return _this2.getGroupLevel(node.group, level);
        } else {
            return node;
        }
    };

    this.initGroupedAnchors = function () {
        var previousShortcuts = [].concat(_this2.shortcuts);
        _this2.shortcuts = [];
        var shortcuts = document.querySelectorAll('h1,h2,h3');
        var level = 1;
        var currentNode = 1;
        var group = undefined;
        for (var i = 0; i < shortcuts.length; i++) {

            var shortcut = shortcuts[i];
            var previousShortcut = _this2.shortcuts[i - 1];
            var levelBefore = level;
            var id = shortcut.id;
            level = shortcut.tagName.replace(/\w/, '') | 0;

            var highestGroup = _this2.getGroupLevel(previousShortcut, 1);
            if (highestGroup && level > 1) {
                id = highestGroup.id + '-' + shortcut.id;
            }
            shortcut.id = id;

            shortcut.innerHTML = '<a href="#' + id + '">#</a>' + shortcut.innerHTML;

            if (_this2.shortcuts.length) {
                group = _this2.getGroupLevel(_this2.shortcuts[currentNode - 1], level - 1);
            }
            if (level > levelBefore) {

                group = previousShortcut;
                currentNode = i;
            }
            var active = false;
            try {
                active = previousShortcuts.filter(function (item) {
                    return item.id == id;
                })[0].active;
            } catch (e) {}
            _this2.shortcuts.push({
                id: id,
                name: shortcut.innerText.replace(/#/g, ''),
                active: false,
                level: level,
                group: group
            });
        }
    };

    this.on('mount', function () {
        document.body.addEventListener('keydown', function (event) {
            if (event.code == 'Escape') {
                if (document.activeElement == _this2.refs.filter) {
                    _this2.refs.filter.blur();
                    _this2.resetShortcuts();
                    _this2.update();
                } else {
                    _this2.refs.filter.focus();
                }
            }
        });

        new Waypoint({
            element: _this2.refs.main,
            handler: function handler(event) {
                if (event == 'down') {
                    _this2.refs.top.classList.add('active');
                }
            }
        });

        for (var doc in _this2.docs) {
            doc = _this2.docs[doc];
            new Waypoint({
                element: _this2.refs['cheatsheet-' + doc],
                riot: _this2,
                doc: doc,
                handler: function handler() {
                    this.options.riot.name = this.options.doc;
                    this.options.riot.update();
                }
            });
        }

        _this2.tags.markdown[_this2.tags.markdown.length - 1].on('mount', function () {
            _this2.update();
        });

        _this2.on('updated', function () {
            _this2.initGroupedAnchors();
        });
    });

    this.on('update', function () {
        console.log('update');
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

riot.tag2('markdown', '', '', '', function (opts) {
    var _this = this;

    this.on('updated', function () {
        _this.setMarkdown();
    });

    this.on('mount', function () {
        _this.setMarkdown();
    });

    this.setMarkdown = function () {
        _this.root.innerHTML = __webpack_require__(10)("./" + opts.file + '.md');
    };
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./mixin.md": 11,
	"./observable.md": 12,
	"./riot.md": 13,
	"./router.md": 14,
	"./tag.md": 15,
	"./templating.md": 16
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"mixins\">Mixins</h1>\n<h2 id=\"mixin-anatomy\">Mixin anatomy</h2>\n<p>A mixin can be a <code>function</code>, <code>object</code> or <code>class</code>\nMixins have, after initializing them, access to your tag</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">var</span> authService <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n    init<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n        <span class=\"token comment\" spellcheck=\"true\">// Called upon initializing the mixin</span>\n    <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    login<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">(</span>user<span class=\"token punctuation\">,</span> pass<span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span><span class=\"token comment\" spellcheck=\"true\">//...}</span>\n<span class=\"token punctuation\">}</span></code></pre><h2 id=\"initializing\">Initializing</h2>\n<h3 id=\"inline-usage\">Inline Usage</h3>\n<p>For global objects or dynamic mixins within the tag</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">mixin</span><span class=\"token punctuation\">(</span>authService<span class=\"token punctuation\">)</span></code></pre><h3 id=\"shared-mixin\">Shared Mixin</h3>\n<p>Share your mixin across tags</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token comment\" spellcheck=\"true\">// In global scope</span>\nriot<span class=\"token punctuation\">.</span><span class=\"token function\">mixin</span><span class=\"token punctuation\">(</span><span class=\"token string\">'auth-service'</span><span class=\"token punctuation\">,</span> authService<span class=\"token punctuation\">)</span>\n<span class=\"token comment\" spellcheck=\"true\">// In your tag</span>\n<span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">mixin</span><span class=\"token punctuation\">(</span><span class=\"token string\">'auth-service'</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"global-mixin\">Global Mixin</h3>\n<p>Add mixin to every mounted tag</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token comment\" spellcheck=\"true\">// In global scope BEFORE mounting</span>\nriot<span class=\"token punctuation\">.</span><span class=\"token function\">mixin</span><span class=\"token punctuation\">(</span>authService<span class=\"token punctuation\">)</span></code></pre>";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"observable\">Observable</h1>\n<p>Great to create tag-based API\nFor use outside tags, see <a href=\"#riot-observable\"></a></p>\n<h2 id=\"trigger\">Trigger</h2>\n<p>Trigger custom events similar <code>update</code></p>\n<h3 id=\"simple-trigger\">Simple trigger</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">trigger</span><span class=\"token punctuation\">(</span><span class=\"token string\">'selected'</span><span class=\"token punctuation\">,</span> items<span class=\"token punctuation\">)</span></code></pre><h3 id=\"trigger-with-data\">Trigger with data</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">trigger</span><span class=\"token punctuation\">(</span><span class=\"token string\">'selected'</span><span class=\"token punctuation\">,</span> items<span class=\"token punctuation\">)</span></code></pre><h2 id=\"listening-to-triggers\">Listening to triggers</h2>\n<p>From inside the tag or parent/child tag\nYou can use them for <a href=\"#tag-lifecycle-events\">lifecycle events</a> too.</p>\n<h3 id=\"always-listen\">Always listen</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">on</span><span class=\"token punctuation\">(</span><span class=\"token string\">'selected'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span>items<span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Do something with the selected items</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"listen-once\">Listen once</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">one</span><span class=\"token punctuation\">(</span><span class=\"token string\">'selected'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span>items<span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Do something with the selected items</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"stop-listening\">Stop listening</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">off</span><span class=\"token punctuation\">(</span><span class=\"token string\">'selected'</span><span class=\"token punctuation\">)</span></code></pre>";

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"riot\">Riot</h1>\n<h2 id=\"mount\">mount</h2>\n<p>Mounting a tag will make it appear on your webpage/app\nThere are various ways to mount your tags</p>\n<h3 id=\"all\">All</h3>\n<p>This will mount all tags and their children tags</p>\n<p><strong>Notice:</strong> This will not mount dynamically loaded tags such as with a router</p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\">.</span><span class=\"token function\">mount</span><span class=\"token punctuation\">(</span><span class=\"token string\">'*'</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"specific-with-options\">Specific with options</h3>\n<p>When mounting a tag, you can pass options, accessible as <code>opts</code></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>todo<span class=\"token operator\">-</span>list<span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>todo<span class=\"token operator\">-</span>list<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">var</span> items <span class=\"token operator\">=</span> <span class=\"token punctuation\">[</span>\n        <span class=\"token string\">'fork'</span><span class=\"token punctuation\">,</span>\n        <span class=\"token string\">'star'</span><span class=\"token punctuation\">,</span>\n        <span class=\"token string\">'contribute'</span>\n    <span class=\"token punctuation\">]</span>\n    riot<span class=\"token punctuation\">.</span><span class=\"token function\">mount</span><span class=\"token punctuation\">(</span><span class=\"token string\">'todo-list'</span><span class=\"token punctuation\">,</span> items<span class=\"token punctuation\">)</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h3 id=\"data-attribute\">Data attribute</h3>\n<p><strong>Notice:</strong> This feature is supported in <strong>Riot 2.3.17</strong> or later\nWith a <code>data</code> attribute, you can mount a tag into an element</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>ul data<span class=\"token operator\">-</span>is<span class=\"token operator\">=</span><span class=\"token string\">\"todo-list\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>ul<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token comment\" spellcheck=\"true\">// You can mount all or with data too here</span>\n    riot<span class=\"token punctuation\">.</span><span class=\"token function\">mount</span><span class=\"token punctuation\">(</span><span class=\"token string\">'todo-list'</span><span class=\"token punctuation\">)</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h3 id=\"mount-to-dom-node\">Mount to DOM node</h3>\n<p>You can also use a DOM node to mount your tag</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>main ref<span class=\"token operator\">=</span><span class=\"token string\">\"content\"</span><span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token comment\" spellcheck=\"true\">// At maximum, riot.mount takes three arguments</span>\n    riot<span class=\"token punctuation\">.</span><span class=\"token function\">mount</span><span class=\"token punctuation\">(</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>refs<span class=\"token punctuation\">.</span>content<span class=\"token punctuation\">,</span> <span class=\"token string\">'todo-list'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">{</span>items<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">[</span><span class=\"token string\">'be nice'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'share your knowledge'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'give feedback'</span><span class=\"token punctuation\">]</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h2 id=\"observable\">observable</h2>\n<p>Turns a non-riot object/class into an observable, being capable of triggering and listening to events\nThis will add <code>trigger</code>, <code>on</code>, <code>one</code> and <code>off</code> to the provided object\nSee <a href=\"#observable\">Observable</a> for all methods</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">class</span> <span class=\"token class-name\">AuthService</span> <span class=\"token punctuation\">{</span>\n    <span class=\"token function\">constructor</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token punctuation\">{</span>\n        riot<span class=\"token punctuation\">.</span><span class=\"token function\">observable</span><span class=\"token punctuation\">(</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">)</span>\n    <span class=\"token punctuation\">}</span>\n<span class=\"token punctuation\">}</span></code></pre>";

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"router\">Router</h1>\n<p>The router takes care of the history <code>pushState</code></p>\n<p>Depending on route, you can mount different tags, update data and so on.</p>\n<h2 id=\"minimal-setup\">Minimal setup</h2>\n<h3 id=\"setup\">Setup</h3>\n<p>The function works with any amount of parameters</p>\n<p><strong>Recommendation:</strong> Put your routing setup within <code>this.on(&#39;mount&#39;, () =&gt; {})</code> in your main tag, that controls everything (e.g. <code>app.html</code>)</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>main ref<span class=\"token operator\">=</span><span class=\"token string\">\"content\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>main<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\nriot<span class=\"token punctuation\">.</span><span class=\"token function\">route</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">(</span>collection<span class=\"token punctuation\">,</span> action<span class=\"token punctuation\">,</span> id<span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Mount another tag, or do something with the data</span>\n    riot<span class=\"token punctuation\">.</span><span class=\"token function\">mount</span><span class=\"token punctuation\">(</span><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>refs<span class=\"token punctuation\">.</span>content<span class=\"token punctuation\">,</span> collection<span class=\"token punctuation\">,</span> <span class=\"token punctuation\">{</span>view<span class=\"token punctuation\">:</span> action<span class=\"token punctuation\">,</span> id<span class=\"token punctuation\">:</span> id<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h3 id=\"go-to-route\">Go to Route</h3>\n<p>This will call the route method defined above\nWhere <code>customer</code> is <code>collection</code>, <code>edit</code> is <code>action</code> and <code>289</code> is <code>id</code></p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\">.</span><span class=\"token function\">route</span><span class=\"token punctuation\">(</span><span class=\"token string\">'customer/edit/289'</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"start-listening\">Start listening</h3>\n<p>This starts the router, and examines the hash that is already in place\n<strong>Notice:</strong> This feature is supported in <strong>Riot 2.3</strong> or later</p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\">.</span>route<span class=\"token punctuation\">.</span><span class=\"token function\">start</span><span class=\"token punctuation\">(</span><span class=\"token boolean\">true</span><span class=\"token punctuation\">)</span></code></pre><p>In earlier versions of riot, this was done with</p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\">.</span>route<span class=\"token punctuation\">.</span><span class=\"token function\">start</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span>\nriot<span class=\"token punctuation\">.</span>route<span class=\"token punctuation\">.</span><span class=\"token function\">exec</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span></code></pre><p>You can also separately set them up, if you like to</p>\n<h2 id=\"advanced-setup\">Advanced setup</h2>\n<p>In the advanced setup, you can set up a function per route call and you are more flexible with wildcard support</p>\n<p><strong>Notice:</strong> These features are only supported on <strong>Riot 2.3</strong> or later</p>\n<h3 id=\"route-without-wildcard\">Route without wildcard</h3>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\">.</span><span class=\"token function\">route</span><span class=\"token punctuation\">(</span><span class=\"token string\">'/index'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"route-with-wildcard\">Route with wildcard</h3>\n<p>Regex for wildcards:</p>\n<p>*  <code>([^/?#]+?)</code></p>\n<p>..  <code>.*</code></p>\n<p>This route will catch everything that is a subroute of <code>blog</code></p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\">.</span><span class=\"token function\">route</span><span class=\"token punctuation\">(</span><span class=\"token string\">'/blog/*'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span>entry<span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><p>You can setup more distinct variables, other than splitting <code>/</code></p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\">.</span><span class=\"token function\">route</span><span class=\"token punctuation\">(</span><span class=\"token string\">'/blog/*-*/*'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span>month<span class=\"token punctuation\">,</span> year<span class=\"token punctuation\">,</span> entry<span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// route might look like /blog/06-2012/give-me-lasagna</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><p>Everything after a keyword</p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\">.</span><span class=\"token function\">route</span><span class=\"token punctuation\">(</span><span class=\"token string\">'/old..'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Sorry, this page has been removed</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h2 id=\"subroutes\">Subroutes</h2>\n<p>Subroutes overwrite existing routes, based on context</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">var</span> subRoute <span class=\"token operator\">=</span> riot<span class=\"token punctuation\">.</span>route<span class=\"token punctuation\">.</span><span class=\"token function\">create</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span>\n<span class=\"token function\">subRoute</span><span class=\"token punctuation\">(</span><span class=\"token string\">'/blog/tags'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Instead of looking for a post named tags</span>\n    <span class=\"token comment\" spellcheck=\"true\">// List all tags used in posts</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre>";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"tag\">Tag</h1>\n<h2 id=\"lifecycle-events\">Lifecycle events</h2>\n<h3 id=\"before-mount\">before-mount</h3>\n<p>Before the tag is mounted</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">on</span><span class=\"token punctuation\">(</span><span class=\"token string\">'before-mount'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"mount\">mount</h3>\n<p>After all expressions are evaluated on mount</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">on</span><span class=\"token punctuation\">(</span><span class=\"token string\">'mount'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"update\">update</h3>\n<p>Allows recalculation of data before updating</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">on</span><span class=\"token punctuation\">(</span><span class=\"token string\">'update'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"updated\">updated</h3>\n<p>After updates</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">on</span><span class=\"token punctuation\">(</span><span class=\"token string\">'updated'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"before-unmount\">before-unmount</h3>\n<p>Before the tag is removed</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">on</span><span class=\"token punctuation\">(</span><span class=\"token string\">'before-unmount'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"unmount\">unmount</h3>\n<p>After the tag is removed</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">on</span><span class=\"token punctuation\">(</span><span class=\"token string\">'unmount'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"all-events\">all events</h3>\n<p>Listen to all events\nYou can fetch the event name if desired</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">on</span><span class=\"token punctuation\">(</span><span class=\"token string\">'*'</span><span class=\"token punctuation\">,</span> <span class=\"token punctuation\">(</span>eventName<span class=\"token punctuation\">)</span> <span class=\"token operator\">=</span><span class=\"token operator\">></span> <span class=\"token punctuation\">{</span>\n<span class=\"token punctuation\">}</span><span class=\"token punctuation\">)</span></code></pre><h2 id=\"tag-methods-properties\">Tag Methods &amp; Properties</h2>\n<h3 id=\"on-one-off-trigger\">on, one, off, trigger</h3>\n<p>A riot tag already implements a <code>riot.observable</code>\nSee <a href=\"#observable\">observable</a></p>\n<h3 id=\"update\">Update</h3>\n<p>Shortcut for <a href=\"#observable-trigger\">trigger</a> <code>this.trigger(&#39;update&#39;)</code></p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span><span class=\"token function\">update</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span></code></pre><h3 id=\"ismounted\">isMounted</h3>\n<p>Attribute to tell whether or not the tag is mounted</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>isMounted</code></pre><h3 id=\"root\">root</h3>\n<p>Points to it&#39;s own tag element</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>root <span class=\"token comment\" spellcheck=\"true\">// reference to riot tag</span></code></pre><h3 id=\"opts\">opts</h3>\n<p>Options passed via HTML or on mount, See <a href=\"#templating-options\">options</a></p>\n<h3 id=\"mixin\">mixin</h3>\n<p>See <a href=\"#mixins\">Mixins</a></p>\n<h3 id=\"tags\">tags</h3>\n<p>See <a href=\"#templating-child-tags\">Child tags</a></p>\n<h3 id=\"parent\">parent</h3>\n<p>Access the parent tag, if there is one</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>parent <span class=\"token comment\" spellcheck=\"true\">// &lt;Tag></span></code></pre>";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<h1 id=\"templating\">Templating</h1>\n<h2 id=\"anatomy\">Anatomy</h2>\n<p>Everything is a component, Riot refers to them as tags\nTags have to be <a href=\"#riot-mount\">mounted</a></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>example<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>b<span class=\"token operator\">></span>Markup<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>b<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n        <span class=\"token comment\" spellcheck=\"true\">// Script</span>\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>example<span class=\"token operator\">></span></code></pre><h2 id=\"expressions\">Expressions</h2>\n<h3 id=\"pure-javascript\">Pure JavaScript</h3>\n<p>Expressions <code>{}</code> can contain any javascript except curly brackets (object literals)</p>\n<pre class=\"language-html\"><code class=\"language-html\">Random number<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>Math<span class=\"token punctuation\">.</span><span class=\"token function\">random</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span> <span class=\"token operator\">*</span> <span class=\"token number\">10</span><span class=\"token punctuation\">}</span>\n<span class=\"token operator\">&amp;</span>copy<span class=\"token punctuation\">;</span> <span class=\"token operator\">&lt;</span>time datetime<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token keyword\">new</span> <span class=\"token class-name\">Date</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">.</span><span class=\"token function\">getFullYear</span><span class=\"token punctuation\">(</span><span class=\"token punctuation\">)</span><span class=\"token punctuation\">}</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>time<span class=\"token operator\">></span>\nHow long is a day <span class=\"token keyword\">in</span> seconds<span class=\"token operator\">?</span> <span class=\"token punctuation\">{</span><span class=\"token number\">60</span><span class=\"token operator\">*</span><span class=\"token number\">60</span><span class=\"token operator\">*</span><span class=\"token number\">24</span><span class=\"token punctuation\">}</span></code></pre><h3 id=\"accessing-tag-properties\">Accessing tag properties</h3>\n<pre class=\"language-html\"><code class=\"language-html\">My name is <span class=\"token punctuation\">{</span>author<span class=\"token punctuation\">.</span>name<span class=\"token punctuation\">}</span>\nand I'm <span class=\"token punctuation\">{</span>author<span class=\"token punctuation\">.</span>age<span class=\"token punctuation\">}</span> <span class=\"token punctuation\">{</span>unit<span class=\"token punctuation\">}</span>s old\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>author <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n        name<span class=\"token punctuation\">:</span> <span class=\"token string\">'Martin'</span><span class=\"token punctuation\">,</span>\n        age<span class=\"token punctuation\">:</span> <span class=\"token number\">26</span>\n    <span class=\"token punctuation\">}</span>\n<span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>unit <span class=\"token operator\">=</span> <span class=\"token string\">'year'</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h2 id=\"foreach-loop-data\">Foreach - loop data</h2>\n<h3 id=\"array\">Array</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>nav<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>a href<span class=\"token operator\">=</span><span class=\"token string\">\"#{doc}\"</span> each<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>doc <span class=\"token keyword\">in</span> docs<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n        <span class=\"token punctuation\">{</span>doc<span class=\"token punctuation\">}</span>\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>a<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>nav<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>docs <span class=\"token operator\">=</span> <span class=\"token punctuation\">[</span>\n        <span class=\"token string\">'templating'</span><span class=\"token punctuation\">,</span>\n        <span class=\"token string\">'tag'</span><span class=\"token punctuation\">,</span>\n        <span class=\"token string\">'mixin'</span><span class=\"token punctuation\">,</span>\n        <span class=\"token string\">'observable'</span><span class=\"token punctuation\">,</span>\n        <span class=\"token string\">'router'</span>\n    <span class=\"token punctuation\">]</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><p>You can access both index and value by providing a second argument</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>nav<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>a href<span class=\"token operator\">=</span><span class=\"token string\">\"#{doc}\"</span> each<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>doc<span class=\"token punctuation\">,</span> index <span class=\"token keyword\">in</span> docs<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n        <span class=\"token punctuation\">{</span>index <span class=\"token operator\">+</span> <span class=\"token number\">1</span><span class=\"token punctuation\">}</span> <span class=\"token operator\">-</span> <span class=\"token punctuation\">{</span>doc<span class=\"token punctuation\">}</span>\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>a<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>nav<span class=\"token operator\">></span></code></pre><h3 id=\"object\">Object</h3>\n<p>Used for more complex structures, where each item has a distinct key</p>\n<p>Objects use different order of <code>key, value</code> in the each statement</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>card size<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>card<span class=\"token punctuation\">.</span>size<span class=\"token punctuation\">}</span> name<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>title<span class=\"token punctuation\">}</span>\n      each<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>title<span class=\"token punctuation\">,</span> card <span class=\"token keyword\">in</span> cards<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>card<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>cards <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n        analytics <span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n            size<span class=\"token punctuation\">:</span> <span class=\"token number\">1</span><span class=\"token punctuation\">,</span>\n            toolbar<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">[</span><span class=\"token string\">'reset'</span><span class=\"token punctuation\">]</span>\n        <span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n        posts<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">{</span>\n            size<span class=\"token punctuation\">:</span> <span class=\"token number\">2</span><span class=\"token punctuation\">,</span>\n            toolbar<span class=\"token punctuation\">:</span> <span class=\"token punctuation\">[</span><span class=\"token string\">'add'</span><span class=\"token punctuation\">,</span> <span class=\"token string\">'list'</span><span class=\"token punctuation\">]</span>\n        <span class=\"token punctuation\">}</span>\n    <span class=\"token punctuation\">}</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h3 id=\"virtual\">Virtual</h3>\n<p>The virtual tag is used for loops that should generate no wrapper markup</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>dl<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>virtual each<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>item <span class=\"token keyword\">in</span> items<span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>dt<span class=\"token operator\">></span><span class=\"token punctuation\">{</span>item<span class=\"token punctuation\">.</span>key<span class=\"token punctuation\">}</span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>dt<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>dd<span class=\"token operator\">></span><span class=\"token punctuation\">{</span>item<span class=\"token punctuation\">.</span>value<span class=\"token punctuation\">}</span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>dd<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>virtual<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>dl<span class=\"token operator\">></span></code></pre><h3 id=\"context\">Context</h3>\n<p>Loops have their own context. Instead of <code>item.key</code>, you could obtain the property just with <code>key</code>. Because of this, methods and properties of the tag instance itself, have to be accessed with for example <code>parent.removeItem</code></p>\n<h2 id=\"conditionals\">Conditionals</h2>\n<h3 id=\"shorthand-ternary\">Shorthand ternary</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>div <span class=\"token keyword\">class</span><span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>active<span class=\"token punctuation\">:</span> item<span class=\"token punctuation\">.</span>active<span class=\"token punctuation\">}</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>div<span class=\"token operator\">></span></code></pre><h3 id=\"ternary\">Ternary</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>div <span class=\"token keyword\">class</span><span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>item<span class=\"token punctuation\">.</span>active <span class=\"token operator\">?</span> <span class=\"token string\">'active'</span> <span class=\"token punctuation\">:</span> <span class=\"token string\">''</span><span class=\"token punctuation\">}</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>div<span class=\"token operator\">></span></code></pre><h3 id=\"blocklevel\">Blocklevel</h3>\n<p>Does not write HTML if condition is false</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>div <span class=\"token keyword\">if</span><span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>shop<span class=\"token punctuation\">.</span>items<span class=\"token punctuation\">.</span>length<span class=\"token punctuation\">}</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>div<span class=\"token operator\">></span></code></pre><h3 id=\"hide\">Hide</h3>\n<p>Writes HTML, just sets <code>display</code> style to <code>none</code> if condition is true</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>nav hide<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>mobile<span class=\"token punctuation\">}</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>nav<span class=\"token operator\">></span></code></pre><h3 id=\"show\">Show</h3>\n<p>Opposite of Hide <code>display</code></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>nav show<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>mobile<span class=\"token punctuation\">}</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>nav<span class=\"token operator\">></span></code></pre><h2 id=\"access-elements-and-tags\">Access elements and tags</h2>\n<h3 id=\"html-elements\">HTML Elements</h3>\n<p>To access your elements, use the <code>ref</code> attribute. References can then be accessed with <code>this.refs</code></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>input ref<span class=\"token operator\">=</span><span class=\"token string\">\"todo\"</span><span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>refs<span class=\"token punctuation\">.</span>todo<span class=\"token punctuation\">.</span>value <span class=\"token operator\">=</span> <span class=\"token string\">'write todolist'</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h3 id=\"child-tags\">Child tags</h3>\n<p>These are also accessed via the <code>refs</code></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>todo<span class=\"token operator\">-</span>item ref<span class=\"token operator\">=</span><span class=\"token string\">\"first\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>todo<span class=\"token operator\">-</span>item<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>tags<span class=\"token punctuation\">.</span>first\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><p>If there are more instances, you get an array of tags</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>todo<span class=\"token operator\">-</span>item<span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>todo<span class=\"token operator\">-</span>item<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>todo<span class=\"token operator\">-</span>item<span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>todo<span class=\"token operator\">-</span>item<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>todo<span class=\"token operator\">-</span>item ref<span class=\"token operator\">=</span><span class=\"token string\">\"last\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>todo<span class=\"token operator\">-</span>item<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>tags<span class=\"token punctuation\">[</span><span class=\"token string\">'todo-item'</span><span class=\"token punctuation\">]</span> <span class=\"token comment\" spellcheck=\"true\">// Array&lt;Tag> - 2</span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>tags<span class=\"token punctuation\">.</span>last <span class=\"token comment\" spellcheck=\"true\">// &lt;Tag> - 1</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h2 id=\"options\">Options</h2>\n<p>Options can be passed via html params or on mount</p>\n<p>Options only accept <code>boolean</code>, <code>number</code>, <code>string</code> or simple <code>array</code>, when passing values directly</p>\n<h3 id=\"passing-values-directly-per-html\">Passing values directly per HTML</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>todo<span class=\"token operator\">-</span>item name<span class=\"token operator\">=</span><span class=\"token string\">\"Finish Cheatsheet\"</span> done<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span><span class=\"token boolean\">false</span><span class=\"token punctuation\">}</span><span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>todo<span class=\"token operator\">-</span>item<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token comment\" spellcheck=\"true\">// Script of todo-item</span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>opts<span class=\"token punctuation\">.</span>name <span class=\"token comment\" spellcheck=\"true\">// 'Finish Cheatsheet'</span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>opts<span class=\"token punctuation\">.</span>done <span class=\"token comment\" spellcheck=\"true\">// false</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h3 id=\"passing-variables-per-html\">Passing variables per HTML</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>todo<span class=\"token operator\">-</span>item item<span class=\"token operator\">=</span><span class=\"token punctuation\">{</span>item<span class=\"token punctuation\">}</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>todo<span class=\"token operator\">-</span>item<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span>script<span class=\"token operator\">></span>\n    <span class=\"token keyword\">this</span><span class=\"token punctuation\">.</span>item <span class=\"token operator\">=</span> <span class=\"token punctuation\">{</span>\n        name<span class=\"token punctuation\">:</span> <span class=\"token string\">'Study riot'</span><span class=\"token punctuation\">,</span>\n        done<span class=\"token punctuation\">:</span> <span class=\"token boolean\">true</span>\n    <span class=\"token punctuation\">}</span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>script<span class=\"token operator\">></span></code></pre><h3 id=\"passing-values-on-mount\">Passing values on Mount</h3>\n<p>On mount, we are more flexible, since we are in js\nSee <a href=\"#riot-mount\">mount</a></p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\">var</span> items <span class=\"token operator\">=</span> <span class=\"token punctuation\">[</span>\n    <span class=\"token punctuation\">{</span>name<span class=\"token punctuation\">:</span> <span class=\"token string\">'Share'</span><span class=\"token punctuation\">,</span> done<span class=\"token punctuation\">:</span> <span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">{</span>name<span class=\"token punctuation\">:</span> <span class=\"token string\">'Star'</span><span class=\"token punctuation\">,</span> done<span class=\"token punctuation\">:</span> <span class=\"token boolean\">true</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n    <span class=\"token punctuation\">{</span>name<span class=\"token punctuation\">:</span> <span class=\"token string\">'Work'</span><span class=\"token punctuation\">,</span> done<span class=\"token punctuation\">:</span> <span class=\"token boolean\">false</span><span class=\"token punctuation\">}</span><span class=\"token punctuation\">,</span>\n<span class=\"token punctuation\">]</span>\nriot<span class=\"token punctuation\">.</span><span class=\"token function\">mount</span><span class=\"token punctuation\">(</span><span class=\"token string\">'todo-list'</span><span class=\"token punctuation\">,</span> items<span class=\"token punctuation\">)</span></code></pre><h2 id=\"yield\">Yield</h2>\n<p>Yielding is like <a href=\"#templating-options\">options</a>, just that it accepts HTML and other riot tags</p>\n<p>Definition</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>popup<span class=\"token operator\">-</span>body<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span><span class=\"token keyword\">yield</span><span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>popup<span class=\"token operator\">-</span>body<span class=\"token operator\">></span></code></pre><p>Usage</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>popup<span class=\"token operator\">-</span>body<span class=\"token operator\">></span>\n    Hi<span class=\"token operator\">!</span> I'm supporting\n    <span class=\"token operator\">&lt;</span>abbr title<span class=\"token operator\">=</span><span class=\"token string\">\"Hypertext Markup Language\"</span><span class=\"token operator\">></span>HTML<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>abbr<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>popup<span class=\"token operator\">-</span>body<span class=\"token operator\">></span></code></pre><h3 id=\"multiple-yieldpoints\">Multiple Yieldpoints</h3>\n<p><strong>Notice:</strong> This feature is supported in <strong>Riot 2.3.12</strong> or later</p>\n<h4 id=\"usage\">Usage</h4>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>card<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span><span class=\"token keyword\">yield</span> to<span class=\"token operator\">=</span><span class=\"token string\">\"toolbar\"</span><span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>a<span class=\"token operator\">></span>Add post<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>a<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>a<span class=\"token operator\">></span>Recently published<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>a<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span><span class=\"token keyword\">yield</span><span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span><span class=\"token keyword\">yield</span> to<span class=\"token operator\">=</span><span class=\"token string\">\"header\"</span><span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span>i <span class=\"token keyword\">class</span><span class=\"token operator\">=</span><span class=\"token string\">\"fa fa-text\"</span><span class=\"token operator\">></span><span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>i<span class=\"token operator\">></span> Posts\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span><span class=\"token keyword\">yield</span><span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>card<span class=\"token operator\">></span></code></pre><h4 id=\"definition\">Definition</h4>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\">&lt;</span>card<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>h2<span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span><span class=\"token keyword\">yield</span> <span class=\"token keyword\">from</span><span class=\"token operator\">=</span><span class=\"token string\">\"header\"</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>h2<span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span>div <span class=\"token keyword\">class</span><span class=\"token operator\">=</span><span class=\"token string\">\"toolbar\"</span><span class=\"token operator\">></span>\n        <span class=\"token operator\">&lt;</span><span class=\"token keyword\">yield</span> <span class=\"token keyword\">from</span><span class=\"token operator\">=</span><span class=\"token string\">\"toolbar\"</span> <span class=\"token operator\">/</span><span class=\"token operator\">></span>\n    <span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>div<span class=\"token operator\">></span>\n<span class=\"token operator\">&lt;</span><span class=\"token operator\">/</span>card<span class=\"token operator\">></span></code></pre>";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(riot) {

riot.tag2('highlight', '<div ref="result"></div>', '', '', function (opts) {
    var _this = this;

    this.on('update', function () {

        var content = _this.opts.name;
        var searchQueries = _this.opts.find.toLowerCase().split(' ');

        for (var searchQuery in searchQueries) {
            searchQuery = searchQueries[searchQuery];
            if (!!~content.toLowerCase().indexOf(searchQuery)) {
                content = content.replace(new RegExp('(' + searchQuery + ')(?!</b>)', 'i'), '<b>$1</b>');
            }
        }
        _this.refs.result.innerHTML = content;
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map