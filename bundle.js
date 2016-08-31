/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _riot = __webpack_require__(11);
	
	var _riot2 = _interopRequireDefault(_riot);
	
	__webpack_require__(14);
	
	var _noframeworkWaypoints = __webpack_require__(15);
	
	var _noframeworkWaypoints2 = _interopRequireDefault(_noframeworkWaypoints);
	
	__webpack_require__(16);
	
	__webpack_require__(20);
	
	__webpack_require__(21);
	
	__webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.body.innerHTML = '<app></app>';
	_riot2.default.mount('*');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/* Riot v2.6.1, @license MIT */
	
	;(function (window, undefined) {
	  'use strict';
	
	  var riot = { version: 'v2.6.1', settings: {} },
	
	  // be aware, internal usage
	  // ATTENTION: prefix the global dynamic variables with `__`
	
	  // counter to give a unique id to all the Tag instances
	  __uid = 0,
	
	  // tags instances cache
	  __virtualDom = [],
	
	  // tags implementation cache
	  __tagImpl = {},
	
	
	  /**
	   * Const
	   */
	  GLOBAL_MIXIN = '__global_mixin',
	
	
	  // riot specific prefixes
	  RIOT_PREFIX = 'riot-',
	      RIOT_TAG = RIOT_PREFIX + 'tag',
	      RIOT_TAG_IS = 'data-is',
	
	
	  // for typeof == '' comparisons
	  T_STRING = 'string',
	      T_OBJECT = 'object',
	      T_UNDEF = 'undefined',
	      T_FUNCTION = 'function',
	      XLINK_NS = 'http://www.w3.org/1999/xlink',
	      XLINK_REGEX = /^xlink:(\w+)/,
	
	  // special native tags that cannot be treated like the others
	  SPECIAL_TAGS_REGEX = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
	      RESERVED_WORDS_BLACKLIST = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,
	
	  // SVG tags list https://www.w3.org/TR/SVG/attindex.html#PresentationAttributes
	  SVG_TAGS_LIST = ['altGlyph', 'animate', 'animateColor', 'circle', 'clipPath', 'defs', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'font', 'foreignObject', 'g', 'glyph', 'glyphRef', 'image', 'line', 'linearGradient', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use'],
	
	
	  // version# for IE 8-11, 0 for others
	  IE_VERSION = (window && window.document || {}).documentMode | 0,
	
	
	  // detect firefox to fix #1374
	  FIREFOX = window && !!window.InstallTrigger;
	  /* istanbul ignore next */
	  riot.observable = function (el) {
	
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
	     * Private Methods
	     */
	
	    /**
	     * Helper function needed to get and loop all the events in a string
	     * @param   { String }   e - event string
	     * @param   {Function}   fn - callback
	     */
	    function onEachEvent(e, fn) {
	      var es = e.split(' '),
	          l = es.length,
	          i = 0;
	      for (; i < l; i++) {
	        var name = es[i];
	        if (name) fn(name, i);
	      }
	    }
	
	    /**
	     * Public Api
	     */
	
	    // extend the el object adding the observable methods
	    Object.defineProperties(el, {
	      /**
	       * Listen to the given space separated list of `events` and
	       * execute the `callback` each time an event is triggered.
	       * @param  { String } events - events ids
	       * @param  { Function } fn - callback function
	       * @returns { Object } el
	       */
	      on: {
	        value: function value(events, fn) {
	          if (typeof fn != 'function') return el;
	
	          onEachEvent(events, function (name, pos) {
	            (callbacks[name] = callbacks[name] || []).push(fn);
	            fn.typed = pos > 0;
	          });
	
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },
	
	      /**
	       * Removes the given space separated list of `events` listeners
	       * @param   { String } events - events ids
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      off: {
	        value: function value(events, fn) {
	          if (events == '*' && !fn) callbacks = {};else {
	            onEachEvent(events, function (name, pos) {
	              if (fn) {
	                var arr = callbacks[name];
	                for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                  if (cb == fn) arr.splice(i--, 1);
	                }
	              } else delete callbacks[name];
	            });
	          }
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },
	
	      /**
	       * Listen to the given space separated list of `events` and
	       * execute the `callback` at most once
	       * @param   { String } events - events ids
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      one: {
	        value: function value(events, fn) {
	          function on() {
	            el.off(events, on);
	            fn.apply(el, arguments);
	          }
	          return el.on(events, on);
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },
	
	      /**
	       * Execute all callback functions that listen to
	       * the given space separated list of `events`
	       * @param   { String } events - events ids
	       * @returns { Object } el
	       */
	      trigger: {
	        value: function value(events) {
	
	          // getting the arguments
	          var arglen = arguments.length - 1,
	              args = new Array(arglen),
	              fns;
	
	          for (var i = 0; i < arglen; i++) {
	            args[i] = arguments[i + 1]; // skip first argument
	          }
	
	          onEachEvent(events, function (name, pos) {
	
	            fns = slice.call(callbacks[name] || [], 0);
	
	            for (var i = 0, fn; fn = fns[i]; ++i) {
	              if (fn.busy) continue;
	              fn.busy = 1;
	              fn.apply(el, fn.typed ? [name].concat(args) : args);
	              if (fns[i] !== fn) {
	                i--;
	              }
	              fn.busy = 0;
	            }
	
	            if (callbacks['*'] && name != '*') el.trigger.apply(el, ['*', name].concat(args));
	          });
	
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      }
	    });
	
	    return el;
	  }
	  /* istanbul ignore next */
	  ;(function (riot) {
	
	    /**
	     * Simple client-side router
	     * @module riot-route
	     */
	
	    var RE_ORIGIN = /^.+?\/\/+[^\/]+/,
	        EVENT_LISTENER = 'EventListener',
	        REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
	        ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
	        HAS_ATTRIBUTE = 'hasAttribute',
	        REPLACE = 'replace',
	        POPSTATE = 'popstate',
	        HASHCHANGE = 'hashchange',
	        TRIGGER = 'trigger',
	        MAX_EMIT_STACK_LEVEL = 3,
	        win = typeof window != 'undefined' && window,
	        doc = typeof document != 'undefined' && document,
	        hist = win && history,
	        loc = win && (hist.location || win.location),
	        // see html5-history-api
	    prot = Router.prototype,
	        // to minify more
	    clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
	        started = false,
	        central = riot.observable(),
	        routeFound = false,
	        debouncedEmit,
	        base,
	        current,
	        parser,
	        secondParser,
	        emitStack = [],
	        emitStackLevel = 0;
	
	    /**
	     * Default parser. You can replace it via router.parser method.
	     * @param {string} path - current path (normalized)
	     * @returns {array} array
	     */
	    function DEFAULT_PARSER(path) {
	      return path.split(/[/?#]/);
	    }
	
	    /**
	     * Default parser (second). You can replace it via router.parser method.
	     * @param {string} path - current path (normalized)
	     * @param {string} filter - filter string (normalized)
	     * @returns {array} array
	     */
	    function DEFAULT_SECOND_PARSER(path, filter) {
	      var re = new RegExp('^' + filter[REPLACE](/\*/g, '([^/?#]+?)')[REPLACE](/\.\./, '.*') + '$'),
	          args = path.match(re);
	
	      if (args) return args.slice(1);
	    }
	
	    /**
	     * Simple/cheap debounce implementation
	     * @param   {function} fn - callback
	     * @param   {number} delay - delay in seconds
	     * @returns {function} debounced function
	     */
	    function debounce(fn, delay) {
	      var t;
	      return function () {
	        clearTimeout(t);
	        t = setTimeout(fn, delay);
	      };
	    }
	
	    /**
	     * Set the window listeners to trigger the routes
	     * @param {boolean} autoExec - see route.start
	     */
	    function start(autoExec) {
	      debouncedEmit = debounce(emit, 1);
	      win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
	      win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	      doc[ADD_EVENT_LISTENER](clickEvent, click);
	      if (autoExec) emit(true);
	    }
	
	    /**
	     * Router class
	     */
	    function Router() {
	      this.$ = [];
	      riot.observable(this); // make it observable
	      central.on('stop', this.s.bind(this));
	      central.on('emit', this.e.bind(this));
	    }
	
	    function normalize(path) {
	      return path[REPLACE](/^\/|\/$/, '');
	    }
	
	    function isString(str) {
	      return typeof str == 'string';
	    }
	
	    /**
	     * Get the part after domain name
	     * @param {string} href - fullpath
	     * @returns {string} path from root
	     */
	    function getPathFromRoot(href) {
	      return (href || loc.href)[REPLACE](RE_ORIGIN, '');
	    }
	
	    /**
	     * Get the part after base
	     * @param {string} href - fullpath
	     * @returns {string} path from base
	     */
	    function getPathFromBase(href) {
	      return base[0] == '#' ? (href || loc.href || '').split(base)[1] || '' : (loc ? getPathFromRoot(href) : href || '')[REPLACE](base, '');
	    }
	
	    function emit(force) {
	      // the stack is needed for redirections
	      var isRoot = emitStackLevel == 0,
	          first;
	      if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) return;
	
	      emitStackLevel++;
	      emitStack.push(function () {
	        var path = getPathFromBase();
	        if (force || path != current) {
	          central[TRIGGER]('emit', path);
	          current = path;
	        }
	      });
	      if (isRoot) {
	        while (first = emitStack.shift()) {
	          first();
	        } // stack increses within this call
	        emitStackLevel = 0;
	      }
	    }
	
	    function click(e) {
	      if (e.which != 1 // not left click
	      || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	      || e.defaultPrevented // or default prevented
	      ) return;
	
	      var el = e.target;
	      while (el && el.nodeName != 'A') {
	        el = el.parentNode;
	      }if (!el || el.nodeName != 'A' // not A tag
	      || el[HAS_ATTRIBUTE]('download') // has download attr
	      || !el[HAS_ATTRIBUTE]('href') // has no href attr
	      || el.target && el.target != '_self' // another window or frame
	      || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
	      ) return;
	
	      if (el.href != loc.href && (el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
	      || base[0] != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	      || base[0] == '#' && el.href.split(base)[0] != loc.href.split(base)[0] // outside of #base
	      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	      )) return;
	
	      e.preventDefault();
	    }
	
	    /**
	     * Go to the path
	     * @param {string} path - destination path
	     * @param {string} title - page title
	     * @param {boolean} shouldReplace - use replaceState or pushState
	     * @returns {boolean} - route not found flag
	     */
	    function go(path, title, shouldReplace) {
	      // Server-side usage: directly execute handlers for the path
	      if (!hist) return central[TRIGGER]('emit', getPathFromBase(path));
	
	      path = base + normalize(path);
	      title = title || doc.title;
	      // browsers ignores the second parameter `title`
	      shouldReplace ? hist.replaceState(null, title, path) : hist.pushState(null, title, path);
	      // so we need to set it manually
	      doc.title = title;
	      routeFound = false;
	      emit();
	      return routeFound;
	    }
	
	    /**
	     * Go to path or set action
	     * a single string:                go there
	     * two strings:                    go there with setting a title
	     * two strings and boolean:        replace history with setting a title
	     * a single function:              set an action on the default route
	     * a string/RegExp and a function: set an action on the route
	     * @param {(string|function)} first - path / action / filter
	     * @param {(string|RegExp|function)} second - title / action
	     * @param {boolean} third - replace flag
	     */
	    prot.m = function (first, second, third) {
	      if (isString(first) && (!second || isString(second))) go(first, second, third || false);else if (second) this.r(first, second);else this.r('@', first);
	    };
	
	    /**
	     * Stop routing
	     */
	    prot.s = function () {
	      this.off('*');
	      this.$ = [];
	    };
	
	    /**
	     * Emit
	     * @param {string} path - path
	     */
	    prot.e = function (path) {
	      this.$.concat('@').some(function (filter) {
	        var args = (filter == '@' ? parser : secondParser)(normalize(path), normalize(filter));
	        if (typeof args != 'undefined') {
	          this[TRIGGER].apply(null, [filter].concat(args));
	          return routeFound = true; // exit from loop
	        }
	      }, this);
	    };
	
	    /**
	     * Register route
	     * @param {string} filter - filter for matching to url
	     * @param {function} action - action to register
	     */
	    prot.r = function (filter, action) {
	      if (filter != '@') {
	        filter = '/' + normalize(filter);
	        this.$.push(filter);
	      }
	      this.on(filter, action);
	    };
	
	    var mainRouter = new Router();
	    var route = mainRouter.m.bind(mainRouter);
	
	    /**
	     * Create a sub router
	     * @returns {function} the method of a new Router object
	     */
	    route.create = function () {
	      var newSubRouter = new Router();
	      // assign sub-router's main method
	      var router = newSubRouter.m.bind(newSubRouter);
	      // stop only this sub-router
	      router.stop = newSubRouter.s.bind(newSubRouter);
	      return router;
	    };
	
	    /**
	     * Set the base of url
	     * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	     */
	    route.base = function (arg) {
	      base = arg || '#';
	      current = getPathFromBase(); // recalculate current path
	    };
	
	    /** Exec routing right now **/
	    route.exec = function () {
	      emit(true);
	    };
	
	    /**
	     * Replace the default router to yours
	     * @param {function} fn - your parser function
	     * @param {function} fn2 - your secondParser function
	     */
	    route.parser = function (fn, fn2) {
	      if (!fn && !fn2) {
	        // reset parser for testing...
	        parser = DEFAULT_PARSER;
	        secondParser = DEFAULT_SECOND_PARSER;
	      }
	      if (fn) parser = fn;
	      if (fn2) secondParser = fn2;
	    };
	
	    /**
	     * Helper function to get url query as an object
	     * @returns {object} parsed query
	     */
	    route.query = function () {
	      var q = {};
	      var href = loc.href || current;
	      href[REPLACE](/[?&](.+?)=([^&]*)/g, function (_, k, v) {
	        q[k] = v;
	      });
	      return q;
	    };
	
	    /** Stop routing **/
	    route.stop = function () {
	      if (started) {
	        if (win) {
	          win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
	          win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	          doc[REMOVE_EVENT_LISTENER](clickEvent, click);
	        }
	        central[TRIGGER]('stop');
	        started = false;
	      }
	    };
	
	    /**
	     * Start routing
	     * @param {boolean} autoExec - automatically exec after starting if true
	     */
	    route.start = function (autoExec) {
	      if (!started) {
	        if (win) {
	          if (document.readyState == 'complete') start(autoExec);
	          // the timeout is needed to solve
	          // a weird safari bug https://github.com/riot/route/issues/33
	          else win[ADD_EVENT_LISTENER]('load', function () {
	              setTimeout(function () {
	                start(autoExec);
	              }, 1);
	            });
	        }
	        started = true;
	      }
	    };
	
	    /** Prepare the router **/
	    route.base();
	    route.parser();
	
	    riot.route = route;
	  })(riot);
	  /* istanbul ignore next */
	
	  /**
	   * The riot template engine
	   * @version v2.4.1
	   */
	  /**
	   * riot.util.brackets
	   *
	   * - `brackets    ` - Returns a string or regex based on its parameter
	   * - `brackets.set` - Change the current riot brackets
	   *
	   * @module
	   */
	
	  var brackets = function (UNDEF) {
	
	    var REGLOB = 'g',
	        R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
	        R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,
	        S_QBLOCKS = R_STRINGS.source + '|' + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,
	        UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),
	        NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,
	        FINDBRACES = {
	      '(': RegExp('([()])|' + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|' + S_QBLOCKS, REGLOB)
	    },
	        DEFAULT = '{ }';
	
	    var _pairs = ['{', '}', '{', '}', /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB), DEFAULT, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/];
	
	    var cachedBrackets = UNDEF,
	        _regex,
	        _cache = [],
	        _settings;
	
	    function _loopback(re) {
	      return re;
	    }
	
	    function _rewrite(re, bp) {
	      if (!bp) bp = _cache;
	      return new RegExp(re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : '');
	    }
	
	    function _create(pair) {
	      if (pair === DEFAULT) return _pairs;
	
	      var arr = pair.split(' ');
	
	      if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
	        throw new Error('Unsupported brackets "' + pair + '"');
	      }
	      arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));
	
	      arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	      arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	      arr[6] = _rewrite(_pairs[6], arr);
	      arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
	      arr[8] = pair;
	      return arr;
	    }
	
	    function _brackets(reOrIdx) {
	      return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx];
	    }
	
	    _brackets.split = function split(str, tmpl, _bp) {
	      // istanbul ignore next: _bp is for the compiler
	      if (!_bp) _bp = _cache;
	
	      var parts = [],
	          match,
	          isexpr,
	          start,
	          pos,
	          re = _bp[6];
	
	      isexpr = start = re.lastIndex = 0;
	
	      while (match = re.exec(str)) {
	
	        pos = match.index;
	
	        if (isexpr) {
	
	          if (match[2]) {
	            re.lastIndex = skipBraces(str, match[2], re.lastIndex);
	            continue;
	          }
	          if (!match[3]) {
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
	
	      return parts;
	
	      function unescapeStr(s) {
	        if (tmpl || isexpr) {
	          parts.push(s && s.replace(_bp[5], '$1'));
	        } else {
	          parts.push(s);
	        }
	      }
	
	      function skipBraces(s, ch, ix) {
	        var match,
	            recch = FINDBRACES[ch];
	
	        recch.lastIndex = ix;
	        ix = 1;
	        while (match = recch.exec(s)) {
	          if (match[1] && !(match[1] === ch ? ++ix : --ix)) break;
	        }
	        return ix ? s.length : recch.lastIndex;
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
	
	    _brackets.R_STRINGS = R_STRINGS;
	    _brackets.R_MLCOMMS = R_MLCOMMS;
	    _brackets.S_QBLOCKS = S_QBLOCKS;
	
	    return _brackets;
	  }();
	
	  /**
	   * @module tmpl
	   *
	   * tmpl          - Root function, returns the template value, render with data
	   * tmpl.hasExpr  - Test the existence of a expression inside a string
	   * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	   */
	
	  var tmpl = function () {
	
	    var _cache = {};
	
	    function _tmpl(str, data) {
	      if (!str) return str;
	
	      return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr);
	    }
	
	    _tmpl.haveRaw = brackets.hasRaw;
	
	    _tmpl.hasExpr = brackets.hasExpr;
	
	    _tmpl.loopKeys = brackets.loopKeys;
	
	    // istanbul ignore next
	    _tmpl.clearCache = function () {
	      _cache = {};
	    };
	
	    _tmpl.errorHandler = null;
	
	    function _logErr(err, ctx) {
	
	      if (_tmpl.errorHandler) {
	
	        err.riotData = {
	          tagName: ctx && ctx.root && ctx.root.tagName,
	          _riot_id: ctx && ctx._riot_id //eslint-disable-line camelcase
	        };
	        _tmpl.errorHandler(err);
	      }
	    }
	
	    function _create(str) {
	      var expr = _getTmpl(str);
	
	      if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr;
	
	      return new Function('E', expr + ';'); // eslint-disable-line no-new-func
	    }
	
	    var CH_IDEXPR = '⁗',
	        RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	        RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	        RE_DQUOTE = /\u2057/g,
	        RE_QBMARK = /\u2057(\d+)~/g;
	
	    function _getTmpl(str) {
	      var qstr = [],
	          expr,
	          parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
	
	      if (parts.length > 2 || parts[0]) {
	        var i,
	            j,
	            list = [];
	
	        for (i = j = 0; i < parts.length; ++i) {
	
	          expr = parts[i];
	
	          if (expr && (expr = i & 1 ? _parseExpr(expr, 1, qstr) : '"' + expr.replace(/\\/g, '\\\\').replace(/\r\n?|\n/g, '\\n').replace(/"/g, '\\"') + '"')) list[j++] = expr;
	        }
	
	        expr = j < 2 ? list[0] : '[' + list.join(',') + '].join("")';
	      } else {
	
	        expr = _parseExpr(parts[1], 0, qstr);
	      }
	
	      if (qstr[0]) {
	        expr = expr.replace(RE_QBMARK, function (_, pos) {
	          return qstr[pos].replace(/\r/g, '\\r').replace(/\n/g, '\\n');
	        });
	      }
	      return expr;
	    }
	
	    var RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };
	
	    function _parseExpr(expr, asText, qstr) {
	
	      expr = expr.replace(RE_QBLOCK, function (s, div) {
	        return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s;
	      }).replace(/\s+/g, ' ').trim().replace(/\ ?([[\({},?\.:])\ ?/g, '$1');
	
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
	          }jsb = expr.slice(0, match.index);
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
	          if (mm[0] === ch) ++lv;else if (! --lv) break;
	        }
	        re.lastIndex = lv ? expr.length : ir.lastIndex;
	      }
	    }
	
	    // istanbul ignore next: not both
	    var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' ? 'global' : 'window') + ').',
	        JS_VARNAME = /[,{][$\w]+(?=:)|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	        JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;
	
	    function _wrapExpr(expr, asText, key) {
	      var tb;
	
	      expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	        if (mvar) {
	          pos = tb ? 0 : pos + match.length;
	
	          if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	            match = p + '("' + mvar + JS_CONTEXT + mvar;
	            if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '[';
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
	
	    _tmpl.version = brackets.version = 'v2.4.1';
	
	    return _tmpl;
	  }();
	
	  /*
	    lib/browser/tag/mkdom.js
	  
	    Includes hacks needed for the Internet Explorer version 9 and below
	    See: http://kangax.github.io/compat-table/es5/#ie8
	         http://codeplanet.io/dropping-ie8/
	  */
	  var mkdom = function _mkdom() {
	    var reHasYield = /<yield\b/i,
	        reYieldAll = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
	        reYieldSrc = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
	        reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	    var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
	        tblTags = IE_VERSION && IE_VERSION < 10 ? SPECIAL_TAGS_REGEX : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
	
	    /**
	     * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	     * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	     *
	     * @param   {string} templ  - The template coming from the custom tag definition
	     * @param   {string} [html] - HTML content that comes from the DOM element where you
	     *           will mount the tag, mostly the original tag in the page
	     * @returns {HTMLElement} DOM element with _templ_ merged through `YIELD` with the _html_.
	     */
	    function _mkdom(templ, html) {
	      var match = templ && templ.match(/^\s*<([-\w]+)/),
	          tagName = match && match[1].toLowerCase(),
	          el = mkEl('div', isSVGTag(tagName));
	
	      // replace all the yield tags with the tag inner html
	      templ = replaceYield(templ, html);
	
	      /* istanbul ignore next */
	      if (tblTags.test(tagName)) el = specialTags(el, templ, tagName);else setInnerHTML(el, templ);
	
	      el.stub = true;
	
	      return el;
	    }
	
	    /*
	      Creates the root element for table or select child elements:
	      tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	    */
	    function specialTags(el, templ, tagName) {
	      var select = tagName[0] === 'o',
	          parent = select ? 'select>' : 'table>';
	
	      // trim() is important here, this ensures we don't have artifacts,
	      // so we can check if we have only one element inside the parent
	      el.innerHTML = '<' + parent + templ.trim() + '</' + parent;
	      parent = el.firstChild;
	
	      // returns the immediate parent if tr/th/td/col is the only element, if not
	      // returns the whole tree, as this can include additional elements
	      if (select) {
	        parent.selectedIndex = -1; // for IE9, compatible w/current riot behavior
	      } else {
	        // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	        var tname = rootEls[tagName];
	        if (tname && parent.childElementCount === 1) parent = $(tname, parent);
	      }
	      return parent;
	    }
	
	    /*
	      Replace the yield tag from any tag template with the innerHTML of the
	      original tag in the page
	    */
	    function replaceYield(templ, html) {
	      // do nothing if no yield
	      if (!reHasYield.test(templ)) return templ;
	
	      // be careful with #1343 - string on the source having `$1`
	      var src = {};
	
	      html = html && html.replace(reYieldSrc, function (_, ref, text) {
	        src[ref] = src[ref] || text; // preserve first definition
	        return '';
	      }).trim();
	
	      return templ.replace(reYieldDest, function (_, ref, def) {
	        // yield with from - to attrs
	        return src[ref] || def || '';
	      }).replace(reYieldAll, function (_, def) {
	        // yield without any "from"
	        return html || def || '';
	      });
	    }
	
	    return _mkdom;
	  }();
	
	  /**
	   * Convert the item looped into an object used to extend the child tag properties
	   * @param   { Object } expr - object containing the keys used to extend the children tags
	   * @param   { * } key - value to assign to the new object returned
	   * @param   { * } val - value containing the position of the item in the array
	   * @returns { Object } - new object containing the values of the original item
	   *
	   * The variables 'key' and 'val' are arbitrary.
	   * They depend on the collection type looped (Array, Object)
	   * and on the expression used on the each tag
	   *
	   */
	  function mkitem(expr, key, val) {
	    var item = {};
	    item[expr.key] = key;
	    if (expr.pos) item[expr.pos] = val;
	    return item;
	  }
	
	  /**
	   * Unmount the redundant tags
	   * @param   { Array } items - array containing the current items to loop
	   * @param   { Array } tags - array containing all the children tags
	   */
	  function unmountRedundant(items, tags) {
	
	    var i = tags.length,
	        j = items.length,
	        t;
	
	    while (i > j) {
	      t = tags[--i];
	      tags.splice(i, 1);
	      t.unmount();
	    }
	  }
	
	  /**
	   * Move the nested custom tags in non custom loop tags
	   * @param   { Object } child - non custom loop tag
	   * @param   { Number } i - current position of the loop tag
	   */
	  function moveNestedTags(child, i) {
	    Object.keys(child.tags).forEach(function (tagName) {
	      var tag = child.tags[tagName];
	      if (isArray(tag)) each(tag, function (t) {
	        moveChildTag(t, tagName, i);
	      });else moveChildTag(tag, tagName, i);
	    });
	  }
	
	  /**
	   * Adds the elements for a virtual tag
	   * @param { Tag } tag - the tag whose root's children will be inserted or appended
	   * @param { Node } src - the node that will do the inserting or appending
	   * @param { Tag } target - only if inserting, insert before this tag's first child
	   */
	  function addVirtual(tag, src, target) {
	    var el = tag._root,
	        sib;
	    tag._virts = [];
	    while (el) {
	      sib = el.nextSibling;
	      if (target) src.insertBefore(el, target._root);else src.appendChild(el);
	
	      tag._virts.push(el); // hold for unmounting
	      el = sib;
	    }
	  }
	
	  /**
	   * Move virtual tag and all child nodes
	   * @param { Tag } tag - first child reference used to start move
	   * @param { Node } src  - the node that will do the inserting
	   * @param { Tag } target - insert before this tag's first child
	   * @param { Number } len - how many child nodes to move
	   */
	  function moveVirtual(tag, src, target, len) {
	    var el = tag._root,
	        sib,
	        i = 0;
	    for (; i < len; i++) {
	      sib = el.nextSibling;
	      src.insertBefore(el, target._root);
	      el = sib;
	    }
	  }
	
	  /**
	   * Manage tags having the 'each'
	   * @param   { Object } dom - DOM node we need to loop
	   * @param   { Tag } parent - parent tag instance where the dom node is contained
	   * @param   { String } expr - string contained in the 'each' attribute
	   */
	  function _each(dom, parent, expr) {
	
	    // remove the each property from the original tag
	    remAttr(dom, 'each');
	
	    var mustReorder = _typeof(getAttr(dom, 'no-reorder')) !== T_STRING || remAttr(dom, 'no-reorder'),
	        tagName = getTagName(dom),
	        impl = __tagImpl[tagName] || { tmpl: getOuterHTML(dom) },
	        useRoot = SPECIAL_TAGS_REGEX.test(tagName),
	        root = dom.parentNode,
	        ref = document.createTextNode(''),
	        child = getTag(dom),
	        isOption = tagName.toLowerCase() === 'option',
	        // the option tags must be treated differently
	    tags = [],
	        oldItems = [],
	        hasKeys,
	        isVirtual = dom.tagName == 'VIRTUAL';
	
	    // parse the each expression
	    expr = tmpl.loopKeys(expr);
	
	    // insert a marked where the loop tags will be injected
	    root.insertBefore(ref, dom);
	
	    // clean template code
	    parent.one('before-mount', function () {
	
	      // remove the original DOM node
	      dom.parentNode.removeChild(dom);
	      if (root.stub) root = parent.root;
	    }).on('update', function () {
	      // get the new items collection
	      var items = tmpl(expr.val, parent),
	
	      // create a fragment to hold the new DOM nodes to inject in the parent tag
	      frag = document.createDocumentFragment();
	
	      // object loop. any changes cause full redraw
	      if (!isArray(items)) {
	        hasKeys = items || false;
	        items = hasKeys ? Object.keys(items).map(function (key) {
	          return mkitem(expr, key, items[key]);
	        }) : [];
	      }
	
	      // loop all the new items
	      var i = 0,
	          itemsLength = items.length;
	
	      for (; i < itemsLength; i++) {
	        // reorder only if the items are objects
	        var item = items[i],
	            _mustReorder = mustReorder && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) == T_OBJECT && !hasKeys,
	            oldPos = oldItems.indexOf(item),
	            pos = ~oldPos && _mustReorder ? oldPos : i,
	
	        // does a tag exist in this position?
	        tag = tags[pos];
	
	        item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;
	
	        // new tag
	        if (!_mustReorder && !tag // with no-reorder we just update the old tags
	        || _mustReorder && !~oldPos || !tag // by default we always try to reorder the DOM elements
	        ) {
	
	            tag = new Tag(impl, {
	              parent: parent,
	              isLoop: true,
	              hasImpl: !!__tagImpl[tagName],
	              root: useRoot ? root : dom.cloneNode(),
	              item: item
	            }, dom.innerHTML);
	
	            tag.mount();
	
	            if (isVirtual) tag._root = tag.root.firstChild; // save reference for further moves or inserts
	            // this tag must be appended
	            if (i == tags.length || !tags[i]) {
	              // fix 1581
	              if (isVirtual) addVirtual(tag, frag);else frag.appendChild(tag.root);
	            }
	            // this tag must be insert
	            else {
	                if (isVirtual) addVirtual(tag, root, tags[i]);else root.insertBefore(tag.root, tags[i].root); // #1374 some browsers reset selected here
	                oldItems.splice(i, 0, item);
	              }
	
	            tags.splice(i, 0, tag);
	            pos = i; // handled here so no move
	          } else tag.update(item, true);
	
	        // reorder the tag if it's not located in its previous position
	        if (pos !== i && _mustReorder && tags[i] // fix 1581 unable to reproduce it in a test!
	        ) {
	            // update the DOM
	            if (isVirtual) moveVirtual(tag, root, tags[i], dom.childNodes.length);else if (tags[i].root.parentNode) root.insertBefore(tag.root, tags[i].root);
	            // update the position attribute if it exists
	            if (expr.pos) tag[expr.pos] = i;
	            // move the old tag instance
	            tags.splice(i, 0, tags.splice(pos, 1)[0]);
	            // move the old item
	            oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	            // if the loop tags are not custom
	            // we need to move all their custom tags into the right position
	            if (!child && tag.tags) moveNestedTags(tag, i);
	          }
	
	        // cache the original item to use it in the events bound to this node
	        // and its children
	        tag._item = item;
	        // cache the real parent tag internally
	        defineProperty(tag, '_parent', parent);
	      }
	
	      // remove the redundant tags
	      unmountRedundant(items, tags);
	
	      // insert the new nodes
	      root.insertBefore(frag, ref);
	      if (isOption) {
	
	        // #1374 FireFox bug in <option selected={expression}>
	        if (FIREFOX && !root.multiple) {
	          for (var n = 0; n < root.length; n++) {
	            if (root[n].__riot1374) {
	              root.selectedIndex = n; // clear other options
	              delete root[n].__riot1374;
	              break;
	            }
	          }
	        }
	      }
	
	      // set the 'tags' property of the parent tag
	      // if child is 'undefined' it means that we don't need to set this property
	      // for example:
	      // we don't need store the `myTag.tags['div']` property if we are looping a div tag
	      // but we need to track the `myTag.tags['child']` property looping a custom child node named `child`
	      if (child) parent.tags[tagName] = tags;
	
	      // clone the items array
	      oldItems = items.slice();
	    });
	  }
	  /**
	   * Object that will be used to inject and manage the css of every tag instance
	   */
	  var styleManager = function (_riot) {
	
	    if (!window) return { // skip injection on the server
	      add: function add() {},
	      inject: function inject() {}
	    };
	
	    var styleNode = function () {
	      // create a new style element with the correct type
	      var newNode = mkEl('style');
	      setAttr(newNode, 'type', 'text/css');
	
	      // replace any user node or insert the new one into the head
	      var userNode = $('style[type=riot]');
	      if (userNode) {
	        if (userNode.id) newNode.id = userNode.id;
	        userNode.parentNode.replaceChild(newNode, userNode);
	      } else document.getElementsByTagName('head')[0].appendChild(newNode);
	
	      return newNode;
	    }();
	
	    // Create cache and shortcut to the correct property
	    var cssTextProp = styleNode.styleSheet,
	        stylesToInject = '';
	
	    // Expose the style node in a non-modificable property
	    Object.defineProperty(_riot, 'styleNode', {
	      value: styleNode,
	      writable: true
	    });
	
	    /**
	     * Public api
	     */
	    return {
	      /**
	       * Save a tag style to be later injected into DOM
	       * @param   { String } css [description]
	       */
	      add: function add(css) {
	        stylesToInject += css;
	      },
	      /**
	       * Inject all previously saved tag styles into DOM
	       * innerHTML seems slow: http://jsperf.com/riot-insert-style
	       */
	      inject: function inject() {
	        if (stylesToInject) {
	          if (cssTextProp) cssTextProp.cssText += stylesToInject;else styleNode.innerHTML += stylesToInject;
	          stylesToInject = '';
	        }
	      }
	    };
	  }(riot);
	
	  function parseNamedElements(root, tag, childTags, forceParsingNamed) {
	
	    walk(root, function (dom) {
	      if (dom.nodeType == 1) {
	        dom.isLoop = dom.isLoop || dom.parentNode && dom.parentNode.isLoop || getAttr(dom, 'each') ? 1 : 0;
	
	        // custom child tag
	        if (childTags) {
	          var child = getTag(dom);
	
	          if (child && !dom.isLoop) childTags.push(initChildTag(child, { root: dom, parent: tag }, dom.innerHTML, tag));
	        }
	
	        if (!dom.isLoop || forceParsingNamed) setNamed(dom, tag, []);
	      }
	    });
	  }
	
	  function parseExpressions(root, tag, expressions) {
	
	    function addExpr(dom, val, extra) {
	      if (tmpl.hasExpr(val)) {
	        expressions.push(extend({ dom: dom, expr: val }, extra));
	      }
	    }
	
	    walk(root, function (dom) {
	      var type = dom.nodeType,
	          attr;
	
	      // text node
	      if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue);
	      if (type != 1) return;
	
	      /* element */
	
	      // loop
	      attr = getAttr(dom, 'each');
	
	      if (attr) {
	        _each(dom, tag, attr);return false;
	      }
	
	      // attribute expressions
	      each(dom.attributes, function (attr) {
	        var name = attr.name,
	            bool = name.split('__')[1];
	
	        addExpr(dom, attr.value, { attr: bool || name, bool: bool });
	        if (bool) {
	          remAttr(dom, name);return false;
	        }
	      });
	
	      // skip custom tags
	      if (getTag(dom)) return false;
	    });
	  }
	  function Tag(impl, conf, innerHTML) {
	
	    var self = riot.observable(this),
	        opts = inherit(conf.opts) || {},
	        parent = conf.parent,
	        isLoop = conf.isLoop,
	        hasImpl = conf.hasImpl,
	        item = cleanUpData(conf.item),
	        expressions = [],
	        childTags = [],
	        root = conf.root,
	        tagName = root.tagName.toLowerCase(),
	        attr = {},
	        propsInSyncWithParent = [],
	        dom;
	
	    // only call unmount if we have a valid __tagImpl (has name property)
	    if (impl.name && root._tag) root._tag.unmount(true);
	
	    // not yet mounted
	    this.isMounted = false;
	    root.isLoop = isLoop;
	
	    // keep a reference to the tag just created
	    // so we will be able to mount this tag multiple times
	    root._tag = this;
	
	    // create a unique id to this tag
	    // it could be handy to use it also to improve the virtual dom rendering speed
	    defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
	
	    extend(this, { parent: parent, root: root, opts: opts }, item);
	    // protect the "tags" property from being overridden
	    defineProperty(this, 'tags', {});
	
	    // grab attributes
	    each(root.attributes, function (el) {
	      var val = el.value;
	      // remember attributes with expressions only
	      if (tmpl.hasExpr(val)) attr[el.name] = val;
	    });
	
	    dom = mkdom(impl.tmpl, innerHTML);
	
	    // options
	    function updateOpts() {
	      var ctx = hasImpl && isLoop ? self : parent || self;
	
	      // update opts from current DOM attributes
	      each(root.attributes, function (el) {
	        var val = el.value;
	        opts[toCamel(el.name)] = tmpl.hasExpr(val) ? tmpl(val, ctx) : val;
	      });
	      // recover those with expressions
	      each(Object.keys(attr), function (name) {
	        opts[toCamel(name)] = tmpl(attr[name], ctx);
	      });
	    }
	
	    function normalizeData(data) {
	      for (var key in item) {
	        if (_typeof(self[key]) !== T_UNDEF && isWritable(self, key)) self[key] = data[key];
	      }
	    }
	
	    function inheritFrom(target) {
	      each(Object.keys(target), function (k) {
	        // some properties must be always in sync with the parent tag
	        var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k);
	
	        if (_typeof(self[k]) === T_UNDEF || mustSync) {
	          // track the property to keep in sync
	          // so we can keep it updated
	          if (!mustSync) propsInSyncWithParent.push(k);
	          self[k] = target[k];
	        }
	      });
	    }
	
	    /**
	     * Update the tag expressions and options
	     * @param   { * }  data - data we want to use to extend the tag properties
	     * @param   { Boolean } isInherited - is this update coming from a parent tag?
	     * @returns { self }
	     */
	    defineProperty(this, 'update', function (data, isInherited) {
	
	      // make sure the data passed will not override
	      // the component core methods
	      data = cleanUpData(data);
	      // inherit properties from the parent in loop
	      if (isLoop) {
	        inheritFrom(self.parent);
	      }
	      // normalize the tag properties in case an item object was initially passed
	      if (data && isObject(item)) {
	        normalizeData(data);
	        item = data;
	      }
	      extend(self, data);
	      updateOpts();
	      self.trigger('update', data);
	      update(expressions, self);
	
	      // the updated event will be triggered
	      // once the DOM will be ready and all the re-flows are completed
	      // this is useful if you want to get the "real" root properties
	      // 4 ex: root.offsetWidth ...
	      if (isInherited && self.parent)
	        // closes #1599
	        self.parent.one('updated', function () {
	          self.trigger('updated');
	        });else rAF(function () {
	        self.trigger('updated');
	      });
	
	      return this;
	    });
	
	    defineProperty(this, 'mixin', function () {
	      each(arguments, function (mix) {
	        var instance,
	            props = [],
	            obj;
	
	        mix = (typeof mix === 'undefined' ? 'undefined' : _typeof(mix)) === T_STRING ? riot.mixin(mix) : mix;
	
	        // check if the mixin is a function
	        if (isFunction(mix)) {
	          // create the new mixin instance
	          instance = new mix();
	        } else instance = mix;
	
	        // build multilevel prototype inheritance chain property list
	        do {
	          props = props.concat(Object.getOwnPropertyNames(obj || instance));
	        } while (obj = Object.getPrototypeOf(obj || instance));
	
	        // loop the keys in the function prototype or the all object keys
	        each(props, function (key) {
	          // bind methods to self
	          // allow mixins to override other properties/parent mixins
	          if (key != 'init') {
	            // check for getters/setters
	            var descriptor = Object.getOwnPropertyDescriptor(instance, key);
	            var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);
	
	            // apply method only if it does not already exist on the instance
	            if (!self.hasOwnProperty(key) && hasGetterSetter) {
	              Object.defineProperty(self, key, descriptor);
	            } else {
	              self[key] = isFunction(instance[key]) ? instance[key].bind(self) : instance[key];
	            }
	          }
	        });
	
	        // init method will be called automatically
	        if (instance.init) instance.init.bind(self)();
	      });
	      return this;
	    });
	
	    defineProperty(this, 'mount', function () {
	
	      updateOpts();
	
	      // add global mixins
	      var globalMixin = riot.mixin(GLOBAL_MIXIN);
	
	      if (globalMixin) for (var i in globalMixin) {
	        if (globalMixin.hasOwnProperty(i)) self.mixin(globalMixin[i]);
	      } // children in loop should inherit from true parent
	      if (self._parent) {
	        inheritFrom(self._parent);
	      }
	
	      // initialiation
	      if (impl.fn) impl.fn.call(self, opts);
	
	      // parse layout after init. fn may calculate args for nested custom tags
	      parseExpressions(dom, self, expressions);
	
	      // mount the child tags
	      toggle(true);
	
	      // update the root adding custom attributes coming from the compiler
	      // it fixes also #1087
	      if (impl.attrs) walkAttributes(impl.attrs, function (k, v) {
	        setAttr(root, k, v);
	      });
	      if (impl.attrs || hasImpl) parseExpressions(self.root, self, expressions);
	
	      if (!self.parent || isLoop) self.update(item);
	
	      // internal use only, fixes #403
	      self.trigger('before-mount');
	
	      if (isLoop && !hasImpl) {
	        // update the root attribute for the looped elements
	        root = dom.firstChild;
	      } else {
	        while (dom.firstChild) {
	          root.appendChild(dom.firstChild);
	        }if (root.stub) root = parent.root;
	      }
	
	      defineProperty(self, 'root', root);
	
	      // parse the named dom nodes in the looped child
	      // adding them to the parent as well
	      if (isLoop) parseNamedElements(self.root, self.parent, null, true);
	
	      // if it's not a child tag we can trigger its mount event
	      if (!self.parent || self.parent.isMounted) {
	        self.isMounted = true;
	        self.trigger('mount');
	      }
	      // otherwise we need to wait that the parent event gets triggered
	      else self.parent.one('mount', function () {
	          // avoid to trigger the `mount` event for the tags
	          // not visible included in an if statement
	          if (!isInStub(self.root)) {
	            self.parent.isMounted = self.isMounted = true;
	            self.trigger('mount');
	          }
	        });
	    });
	
	    defineProperty(this, 'unmount', function (keepRootTag) {
	      var el = root,
	          p = el.parentNode,
	          ptag,
	          tagIndex = __virtualDom.indexOf(self);
	
	      self.trigger('before-unmount');
	
	      // remove this tag instance from the global virtualDom variable
	      if (~tagIndex) __virtualDom.splice(tagIndex, 1);
	
	      if (p) {
	
	        if (parent) {
	          ptag = getImmediateCustomParentTag(parent);
	          // remove this tag from the parent tags object
	          // if there are multiple nested tags with same name..
	          // remove this element form the array
	          if (isArray(ptag.tags[tagName])) each(ptag.tags[tagName], function (tag, i) {
	            if (tag._riot_id == self._riot_id) ptag.tags[tagName].splice(i, 1);
	          });else
	            // otherwise just delete the tag instance
	            ptag.tags[tagName] = undefined;
	        } else while (el.firstChild) {
	          el.removeChild(el.firstChild);
	        }if (!keepRootTag) p.removeChild(el);else {
	          // the riot-tag and the data-is attributes aren't needed anymore, remove them
	          remAttr(p, RIOT_TAG_IS);
	          remAttr(p, RIOT_TAG); // this will be removed in riot 3.0.0
	        }
	      }
	
	      if (this._virts) {
	        each(this._virts, function (v) {
	          if (v.parentNode) v.parentNode.removeChild(v);
	        });
	      }
	
	      self.trigger('unmount');
	      toggle();
	      self.off('*');
	      self.isMounted = false;
	      delete root._tag;
	    });
	
	    // proxy function to bind updates
	    // dispatched from a parent tag
	    function onChildUpdate(data) {
	      self.update(data, true);
	    }
	
	    function toggle(isMount) {
	
	      // mount/unmount children
	      each(childTags, function (child) {
	        child[isMount ? 'mount' : 'unmount']();
	      });
	
	      // listen/unlisten parent (events flow one way from parent to children)
	      if (!parent) return;
	      var evt = isMount ? 'on' : 'off';
	
	      // the loop tags will be always in sync with the parent automatically
	      if (isLoop) parent[evt]('unmount', self.unmount);else {
	        parent[evt]('update', onChildUpdate)[evt]('unmount', self.unmount);
	      }
	    }
	
	    // named elements available for fn
	    parseNamedElements(dom, this, childTags);
	  }
	  /**
	   * Attach an event to a DOM node
	   * @param { String } name - event name
	   * @param { Function } handler - event callback
	   * @param { Object } dom - dom node
	   * @param { Tag } tag - tag instance
	   */
	  function setEventHandler(name, handler, dom, tag) {
	
	    dom[name] = function (e) {
	
	      var ptag = tag._parent,
	          item = tag._item,
	          el;
	
	      if (!item) while (ptag && !item) {
	        item = ptag._item;
	        ptag = ptag._parent;
	      }
	
	      // cross browser event fix
	      e = e || window.event;
	
	      // override the event properties
	      if (isWritable(e, 'currentTarget')) e.currentTarget = dom;
	      if (isWritable(e, 'target')) e.target = e.srcElement;
	      if (isWritable(e, 'which')) e.which = e.charCode || e.keyCode;
	
	      e.item = item;
	
	      // prevent default behaviour (by default)
	      if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	        if (e.preventDefault) e.preventDefault();
	        e.returnValue = false;
	      }
	
	      if (!e.preventUpdate) {
	        el = item ? getImmediateCustomParentTag(ptag) : tag;
	        el.update();
	      }
	    };
	  }
	
	  /**
	   * Insert a DOM node replacing another one (used by if- attribute)
	   * @param   { Object } root - parent node
	   * @param   { Object } node - node replaced
	   * @param   { Object } before - node added
	   */
	  function insertTo(root, node, before) {
	    if (!root) return;
	    root.insertBefore(before, node);
	    root.removeChild(node);
	  }
	
	  /**
	   * Update the expressions in a Tag instance
	   * @param   { Array } expressions - expression that must be re evaluated
	   * @param   { Tag } tag - tag instance
	   */
	  function update(expressions, tag) {
	
	    each(expressions, function (expr, i) {
	
	      var dom = expr.dom,
	          attrName = expr.attr,
	          value = tmpl(expr.expr, tag),
	          parent = expr.parent || expr.dom.parentNode;
	
	      if (expr.bool) {
	        value = !!value;
	      } else if (value == null) {
	        value = '';
	      }
	
	      // #1638: regression of #1612, update the dom only if the value of the
	      // expression was changed
	      if (expr.value === value) {
	        return;
	      }
	      expr.value = value;
	
	      // textarea and text nodes has no attribute name
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
	            if (!IE_VERSION) dom.nodeValue = value; // #1625 IE throws here, nodeValue
	          } // will be available on 'updated'
	          else dom.nodeValue = value;
	        }
	        return;
	      }
	
	      // ~~#1612: look for changes in dom.value when updating the value~~
	      if (attrName === 'value') {
	        if (dom.value !== value) {
	          dom.value = value;
	          setAttr(dom, attrName, value);
	        }
	        return;
	      } else {
	        // remove original attribute
	        remAttr(dom, attrName);
	      }
	
	      // event handler
	      if (isFunction(value)) {
	        setEventHandler(attrName, value, dom, tag);
	
	        // if- conditional
	      } else if (attrName == 'if') {
	        var stub = expr.stub,
	            add = function add() {
	          insertTo(stub.parentNode, stub, dom);
	        },
	            remove = function remove() {
	          insertTo(dom.parentNode, dom, stub);
	        };
	
	        // add to DOM
	        if (value) {
	          if (stub) {
	            add();
	            dom.inStub = false;
	            // avoid to trigger the mount event if the tags is not visible yet
	            // maybe we can optimize this avoiding to mount the tag at all
	            if (!isInStub(dom)) {
	              walk(dom, function (el) {
	                if (el._tag && !el._tag.isMounted) el._tag.isMounted = !!el._tag.trigger('mount');
	              });
	            }
	          }
	          // remove from DOM
	        } else {
	          stub = expr.stub = stub || document.createTextNode('');
	          // if the parentNode is defined we can easily replace the tag
	          if (dom.parentNode) remove();
	          // otherwise we need to wait the updated event
	          else (tag.parent || tag).one('updated', remove);
	
	          dom.inStub = true;
	        }
	        // show / hide
	      } else if (attrName === 'show') {
	        dom.style.display = value ? '' : 'none';
	      } else if (attrName === 'hide') {
	        dom.style.display = value ? 'none' : '';
	      } else if (expr.bool) {
	        dom[attrName] = value;
	        if (value) setAttr(dom, attrName, attrName);
	        if (FIREFOX && attrName === 'selected' && dom.tagName === 'OPTION') {
	          dom.__riot1374 = value; // #1374
	        }
	      } else if (value === 0 || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== T_OBJECT) {
	        // <img src="{ expr }">
	        if (startsWith(attrName, RIOT_PREFIX) && attrName != RIOT_TAG) {
	          attrName = attrName.slice(RIOT_PREFIX.length);
	        }
	        setAttr(dom, attrName, value);
	      }
	    });
	  }
	  /**
	   * Specialized function for looping an array-like collection with `each={}`
	   * @param   { Array } els - collection of items
	   * @param   {Function} fn - callback function
	   * @returns { Array } the array looped
	   */
	  function each(els, fn) {
	    var len = els ? els.length : 0;
	
	    for (var i = 0, el; i < len; i++) {
	      el = els[i];
	      // return false -> current item was removed by fn during the loop
	      if (el != null && fn(el, i) === false) i--;
	    }
	    return els;
	  }
	
	  /**
	   * Detect if the argument passed is a function
	   * @param   { * } v - whatever you want to pass to this function
	   * @returns { Boolean } -
	   */
	  function isFunction(v) {
	    return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === T_FUNCTION || false; // avoid IE problems
	  }
	
	  /**
	   * Get the outer html of any DOM node SVGs included
	   * @param   { Object } el - DOM node to parse
	   * @returns { String } el.outerHTML
	   */
	  function getOuterHTML(el) {
	    if (el.outerHTML) return el.outerHTML;
	    // some browsers do not support outerHTML on the SVGs tags
	    else {
	        var container = mkEl('div');
	        container.appendChild(el.cloneNode(true));
	        return container.innerHTML;
	      }
	  }
	
	  /**
	   * Set the inner html of any DOM node SVGs included
	   * @param { Object } container - DOM node where we will inject the new html
	   * @param { String } html - html to inject
	   */
	  function setInnerHTML(container, html) {
	    if (_typeof(container.innerHTML) != T_UNDEF) container.innerHTML = html;
	    // some browsers do not support innerHTML on the SVGs tags
	    else {
	        var doc = new DOMParser().parseFromString(html, 'application/xml');
	        container.appendChild(container.ownerDocument.importNode(doc.documentElement, true));
	      }
	  }
	
	  /**
	   * Checks wether a DOM node must be considered part of an svg document
	   * @param   { String }  name - tag name
	   * @returns { Boolean } -
	   */
	  function isSVGTag(name) {
	    return ~SVG_TAGS_LIST.indexOf(name);
	  }
	
	  /**
	   * Detect if the argument passed is an object, exclude null.
	   * NOTE: Use isObject(x) && !isArray(x) to excludes arrays.
	   * @param   { * } v - whatever you want to pass to this function
	   * @returns { Boolean } -
	   */
	  function isObject(v) {
	    return v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === T_OBJECT; // typeof null is 'object'
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
	   * Convert a string containing dashes to camel case
	   * @param   { String } string - input string
	   * @returns { String } my-string -> myString
	   */
	  function toCamel(string) {
	    return string.replace(/-(\w)/g, function (_, c) {
	      return c.toUpperCase();
	    });
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
	   * Set any DOM/SVG attribute
	   * @param { Object } dom - DOM node we want to update
	   * @param { String } name - name of the property we want to set
	   * @param { String } val - value of the property we want to set
	   */
	  function setAttr(dom, name, val) {
	    var xlink = XLINK_REGEX.exec(name);
	    if (xlink && xlink[1]) dom.setAttributeNS(XLINK_NS, xlink[1], val);else dom.setAttribute(name, val);
	  }
	
	  /**
	   * Detect the tag implementation by a DOM node
	   * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	   * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	   */
	  function getTag(dom) {
	    return dom.tagName && __tagImpl[getAttr(dom, RIOT_TAG_IS) || getAttr(dom, RIOT_TAG) || dom.tagName.toLowerCase()];
	  }
	  /**
	   * Add a child tag to its parent into the `tags` object
	   * @param   { Object } tag - child tag instance
	   * @param   { String } tagName - key where the new tag will be stored
	   * @param   { Object } parent - tag instance where the new child tag will be included
	   */
	  function addChildTag(tag, tagName, parent) {
	    var cachedTag = parent.tags[tagName];
	
	    // if there are multiple children tags having the same name
	    if (cachedTag) {
	      // if the parent tags property is not yet an array
	      // create it adding the first cached tag
	      if (!isArray(cachedTag))
	        // don't add the same tag twice
	        if (cachedTag !== tag) parent.tags[tagName] = [cachedTag];
	      // add the new nested tag to the array
	      if (!contains(parent.tags[tagName], tag)) parent.tags[tagName].push(tag);
	    } else {
	      parent.tags[tagName] = tag;
	    }
	  }
	
	  /**
	   * Move the position of a custom tag in its parent tag
	   * @param   { Object } tag - child tag instance
	   * @param   { String } tagName - key where the tag was stored
	   * @param   { Number } newPos - index where the new tag will be stored
	   */
	  function moveChildTag(tag, tagName, newPos) {
	    var parent = tag.parent,
	        tags;
	    // no parent no move
	    if (!parent) return;
	
	    tags = parent.tags[tagName];
	
	    if (isArray(tags)) tags.splice(newPos, 0, tags.splice(tags.indexOf(tag), 1)[0]);else addChildTag(tag, tagName, parent);
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
	    var tag = new Tag(child, opts, innerHTML),
	        tagName = getTagName(opts.root),
	        ptag = getImmediateCustomParentTag(parent);
	    // fix for the parent attribute in the looped elements
	    tag.parent = ptag;
	    // store the real parent tag
	    // in some cases this could be different from the custom parent tag
	    // for example in nested loops
	    tag._parent = parent;
	
	    // add this tag to the custom parent tag
	    addChildTag(tag, tagName, ptag);
	    // and also to the real parent tag
	    if (ptag !== parent) addChildTag(tag, tagName, parent);
	    // empty the child node once we got its template
	    // to avoid that its children get compiled multiple times
	    opts.root.innerHTML = '';
	
	    return tag;
	  }
	
	  /**
	   * Loop backward all the parents tree to detect the first custom parent tag
	   * @param   { Object } tag - a Tag instance
	   * @returns { Object } the instance of the first custom parent tag found
	   */
	  function getImmediateCustomParentTag(tag) {
	    var ptag = tag;
	    while (!getTag(ptag.root)) {
	      if (!ptag.parent) break;
	      ptag = ptag.parent;
	    }
	    return ptag;
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
	   * Get the tag name of any DOM node
	   * @param   { Object } dom - DOM node we want to parse
	   * @returns { String } name to identify this dom node in riot
	   */
	  function getTagName(dom) {
	    var child = getTag(dom),
	        namedTag = getAttr(dom, 'name'),
	        tagName = namedTag && !tmpl.hasExpr(namedTag) ? namedTag : child ? child.name : dom.tagName.toLowerCase();
	
	    return tagName;
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
	          if (isWritable(src, key)) src[key] = obj[key];
	        }
	      }
	    }
	    return src;
	  }
	
	  /**
	   * Check whether an array contains an item
	   * @param   { Array } arr - target array
	   * @param   { * } item - item to test
	   * @returns { Boolean } Does 'arr' contain 'item'?
	   */
	  function contains(arr, item) {
	    return ~arr.indexOf(item);
	  }
	
	  /**
	   * Check whether an object is a kind of array
	   * @param   { * } a - anything
	   * @returns {Boolean} is 'a' an array?
	   */
	  function isArray(a) {
	    return Array.isArray(a) || a instanceof Array;
	  }
	
	  /**
	   * Detect whether a property of an object could be overridden
	   * @param   { Object }  obj - source object
	   * @param   { String }  key - object property
	   * @returns { Boolean } is this property writable?
	   */
	  function isWritable(obj, key) {
	    var props = Object.getOwnPropertyDescriptor(obj, key);
	    return _typeof(obj[key]) === T_UNDEF || props && props.writable;
	  }
	
	  /**
	   * With this function we avoid that the internal Tag methods get overridden
	   * @param   { Object } data - options we want to use to extend the tag instance
	   * @returns { Object } clean object without containing the riot internal reserved words
	   */
	  function cleanUpData(data) {
	    if (!(data instanceof Tag) && !(data && _typeof(data.trigger) == T_FUNCTION)) return data;
	
	    var o = {};
	    for (var key in data) {
	      if (!RESERVED_WORDS_BLACKLIST.test(key)) o[key] = data[key];
	    }
	    return o;
	  }
	
	  /**
	   * Walk down recursively all the children tags starting dom node
	   * @param   { Object }   dom - starting node where we will start the recursion
	   * @param   { Function } fn - callback to transform the child node just found
	   */
	  function walk(dom, fn) {
	    if (dom) {
	      // stop the recursion
	      if (fn(dom) === false) return;else {
	        dom = dom.firstChild;
	
	        while (dom) {
	          walk(dom, fn);
	          dom = dom.nextSibling;
	        }
	      }
	    }
	  }
	
	  /**
	   * Minimize risk: only zero or one _space_ between attr & value
	   * @param   { String }   html - html string we want to parse
	   * @param   { Function } fn - callback function to apply on any attribute found
	   */
	  function walkAttributes(html, fn) {
	    var m,
	        re = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
	
	    while (m = re.exec(html)) {
	      fn(m[1].toLowerCase(), m[2] || m[3] || m[4]);
	    }
	  }
	
	  /**
	   * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	   * @param   { Object }  dom - DOM node we want to parse
	   * @returns { Boolean } -
	   */
	  function isInStub(dom) {
	    while (dom) {
	      if (dom.inStub) return true;
	      dom = dom.parentNode;
	    }
	    return false;
	  }
	
	  /**
	   * Create a generic DOM node
	   * @param   { String } name - name of the DOM node we want to create
	   * @param   { Boolean } isSvg - should we use a SVG as parent node?
	   * @returns { Object } DOM node just created
	   */
	  function mkEl(name, isSvg) {
	    return isSvg ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(name);
	  }
	
	  /**
	   * Shorter and fast way to select multiple nodes in the DOM
	   * @param   { String } selector - DOM selector
	   * @param   { Object } ctx - DOM node where the targets of our search will is located
	   * @returns { Object } dom nodes found
	   */
	  function $$(selector, ctx) {
	    return (ctx || document).querySelectorAll(selector);
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
	   * Simple object prototypal inheritance
	   * @param   { Object } parent - parent object
	   * @returns { Object } child instance
	   */
	  function inherit(parent) {
	    function Child() {}
	    Child.prototype = parent;
	    return new Child();
	  }
	
	  /**
	   * Get the name property needed to identify a DOM node in riot
	   * @param   { Object } dom - DOM node we need to parse
	   * @returns { String | undefined } give us back a string to identify this dom node
	   */
	  function getNamedKey(dom) {
	    return getAttr(dom, 'id') || getAttr(dom, 'name');
	  }
	
	  /**
	   * Set the named properties of a tag element
	   * @param { Object } dom - DOM node we need to parse
	   * @param { Object } parent - tag instance where the named dom element will be eventually added
	   * @param { Array } keys - list of all the tag instance properties
	   */
	  function setNamed(dom, parent, keys) {
	    // get the key value we want to add to the tag instance
	    var key = getNamedKey(dom),
	        isArr,
	
	    // add the node detected to a tag instance using the named property
	    add = function add(value) {
	      // avoid to override the tag properties already set
	      if (contains(keys, key)) return;
	      // check whether this value is an array
	      isArr = isArray(value);
	      // if the key was never set
	      if (!value)
	        // set it once on the tag instance
	        parent[key] = dom;
	        // if it was an array and not yet set
	      else if (!isArr || isArr && !contains(value, dom)) {
	          // add the dom node into the array
	          if (isArr) value.push(dom);else parent[key] = [value, dom];
	        }
	    };
	
	    // skip the elements with no named properties
	    if (!key) return;
	
	    // check whether this key has been already evaluated
	    if (tmpl.hasExpr(key))
	      // wait the first updated event only once
	      parent.one('mount', function () {
	        key = getNamedKey(dom);
	        add(parent[key]);
	      });else add(parent[key]);
	  }
	
	  /**
	   * Faster String startsWith alternative
	   * @param   { String } src - source string
	   * @param   { String } str - test string
	   * @returns { Boolean } -
	   */
	  function startsWith(src, str) {
	    return src.slice(0, str.length) === str;
	  }
	
	  /**
	   * requestAnimationFrame function
	   * Adapted from https://gist.github.com/paulirish/1579671, license MIT
	   */
	  var rAF = function (w) {
	    var raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame;
	
	    if (!raf || /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent)) {
	      // buggy iOS6
	      var lastTime = 0;
	
	      raf = function raf(cb) {
	        var nowtime = Date.now(),
	            timeout = Math.max(16 - (nowtime - lastTime), 0);
	        setTimeout(function () {
	          cb(lastTime = nowtime + timeout);
	        }, timeout);
	      };
	    }
	    return raf;
	  }(window || {});
	
	  /**
	   * Mount a tag creating new Tag instance
	   * @param   { Object } root - dom node where the tag will be mounted
	   * @param   { String } tagName - name of the riot tag we want to mount
	   * @param   { Object } opts - options to pass to the Tag instance
	   * @returns { Tag } a new Tag instance
	   */
	  function mountTo(root, tagName, opts) {
	    var tag = __tagImpl[tagName],
	
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;
	
	    // clear the inner html
	    root.innerHTML = '';
	
	    if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML);
	
	    if (tag && tag.mount) {
	      tag.mount();
	      // add this tag to the virtualDom variable
	      if (!contains(__virtualDom, tag)) __virtualDom.push(tag);
	    }
	
	    return tag;
	  }
	  /**
	   * Riot public api
	   */
	
	  // share methods for other riot parts, e.g. compiler
	  riot.util = { brackets: brackets, tmpl: tmpl };
	
	  /**
	   * Create a mixin that could be globally shared across all the tags
	   */
	  riot.mixin = function () {
	    var mixins = {},
	        globals = mixins[GLOBAL_MIXIN] = {},
	        _id = 0;
	
	    /**
	     * Create/Return a mixin by its name
	     * @param   { String }  name - mixin name (global mixin if object)
	     * @param   { Object }  mixin - mixin logic
	     * @param   { Boolean } g - is global?
	     * @returns { Object }  the mixin logic
	     */
	    return function (name, mixin, g) {
	      // Unnamed global
	      if (isObject(name)) {
	        riot.mixin('__unnamed_' + _id++, name, true);
	        return;
	      }
	
	      var store = g ? globals : mixins;
	
	      // Getter
	      if (!mixin) {
	        if (_typeof(store[name]) === T_UNDEF) {
	          throw new Error('Unregistered mixin: ' + name);
	        }
	        return store[name];
	      }
	      // Setter
	      if (isFunction(mixin)) {
	        extend(mixin.prototype, store[name] || {});
	        store[name] = mixin;
	      } else {
	        store[name] = extend(store[name] || {}, mixin);
	      }
	    };
	  }();
	
	  /**
	   * Create a new riot tag implementation
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   html - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  riot.tag = function (name, html, css, attrs, fn) {
	    if (isFunction(attrs)) {
	      fn = attrs;
	      if (/^[\w\-]+\s?=/.test(css)) {
	        attrs = css;
	        css = '';
	      } else attrs = '';
	    }
	    if (css) {
	      if (isFunction(css)) fn = css;else styleManager.add(css);
	    }
	    name = name.toLowerCase();
	    __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn };
	    return name;
	  };
	
	  /**
	   * Create a new riot tag implementation (for use by the compiler)
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   html - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  riot.tag2 = function (name, html, css, attrs, fn) {
	    if (css) styleManager.add(css);
	    //if (bpair) riot.settings.brackets = bpair
	    __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn };
	    return name;
	  };
	
	  /**
	   * Mount a tag using a specific tag implementation
	   * @param   { String } selector - tag DOM selector
	   * @param   { String } tagName - tag implementation name
	   * @param   { Object } opts - tag logic
	   * @returns { Array } new tags instances
	   */
	  riot.mount = function (selector, tagName, opts) {
	
	    var els,
	        allTags,
	        tags = [];
	
	    // helper functions
	
	    function addRiotTags(arr) {
	      var list = '';
	      each(arr, function (e) {
	        if (!/[^-\w]/.test(e)) {
	          e = e.trim().toLowerCase();
	          list += ',[' + RIOT_TAG_IS + '="' + e + '"],[' + RIOT_TAG + '="' + e + '"]';
	        }
	      });
	      return list;
	    }
	
	    function selectAllTags() {
	      var keys = Object.keys(__tagImpl);
	      return keys + addRiotTags(keys);
	    }
	
	    function pushTags(root) {
	      if (root.tagName) {
	        var riotTag = getAttr(root, RIOT_TAG_IS) || getAttr(root, RIOT_TAG);
	
	        // have tagName? force riot-tag to be the same
	        if (tagName && riotTag !== tagName) {
	          riotTag = tagName;
	          setAttr(root, RIOT_TAG_IS, tagName);
	          setAttr(root, RIOT_TAG, tagName); // this will be removed in riot 3.0.0
	        }
	        var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);
	
	        if (tag) tags.push(tag);
	      } else if (root.length) {
	        each(root, pushTags); // assume nodeList
	      }
	    }
	
	    // ----- mount code -----
	
	    // inject styles into DOM
	    styleManager.inject();
	
	    if (isObject(tagName)) {
	      opts = tagName;
	      tagName = 0;
	    }
	
	    // crawl the DOM to find the tag
	    if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === T_STRING) {
	      if (selector === '*')
	        // select all the tags registered
	        // and also the tags found with the riot-tag attribute set
	        selector = allTags = selectAllTags();else
	        // or just the ones named like the selector
	        selector += addRiotTags(selector.split(/, */));
	
	      // make sure to pass always a selector
	      // to the querySelectorAll function
	      els = selector ? $$(selector) : [];
	    } else
	      // probably you have passed already a tag or a NodeList
	      els = selector;
	
	    // select all the registered and mount them inside their root elements
	    if (tagName === '*') {
	      // get all custom tags
	      tagName = allTags || selectAllTags();
	      // if the root els it's just a single tag
	      if (els.tagName) els = $$(tagName, els);else {
	        // select all the children for all the different root elements
	        var nodeList = [];
	        each(els, function (_el) {
	          nodeList.push($$(tagName, _el));
	        });
	        els = nodeList;
	      }
	      // get rid of the tagName
	      tagName = 0;
	    }
	
	    pushTags(els);
	
	    return tags;
	  };
	
	  /**
	   * Update all the tags instances created
	   * @returns { Array } all the tags instances
	   */
	  riot.update = function () {
	    return each(__virtualDom, function (tag) {
	      tag.update();
	    });
	  };
	
	  /**
	   * Export the Virtual DOM
	   */
	  riot.vdom = __virtualDom;
	
	  /**
	   * Export the Tag constructor
	   */
	  riot.Tag = Tag;
	  // support CommonJS, AMD & browser
	  /* istanbul ignore next */
	  if (( false ? 'undefined' : _typeof(exports)) === T_OBJECT) module.exports = riot;else if (( false ? 'undefined' : _typeof(__webpack_require__(12))) === T_FUNCTION && _typeof(__webpack_require__(13)) !== T_UNDEF) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return riot;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else window.riot = riot;
	})(typeof window != 'undefined' ? window : void 0);

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * Zenscroll 3.1.0
	 * https://github.com/zengabor/zenscroll/
	 *
	 * Copyright 2015–2016 Gabor Lenard
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
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory()), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
			module.exports = factory();
		} else {
			root.zenscroll = factory();
		}
	})(this, function () {
		"use strict";
	
		// Exit if it’s not a browser environment:
		if (!window || !document) {
			return {};
		}
	
		var createScroller = function createScroller(scrollContainer, defaultDuration, edgeOffset) {
	
			defaultDuration = defaultDuration || 999; //ms
			if (!edgeOffset && edgeOffset !== 0) {
				// When scrolling, this amount of distance is kept from the edges of the scrollContainer:
				edgeOffset = 9; //px
			}
	
			var scrollTimeoutId;
			var docElem = document.documentElement;
	
			// Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
			var nativeSmoothScrollEnabled = function nativeSmoothScrollEnabled() {
				return "getComputedStyle" in window && window.getComputedStyle(scrollContainer ? scrollContainer : document.body)["scroll-behavior"] === "smooth";
			};
	
			var getScrollTop = function getScrollTop() {
				return scrollContainer ? scrollContainer.scrollTop : window.scrollY || docElem.scrollTop;
			};
	
			var getViewHeight = function getViewHeight() {
				return scrollContainer ? Math.min(scrollContainer.offsetHeight, window.innerHeight) : window.innerHeight || docElem.clientHeight;
			};
	
			var getRelativeTopOf = function getRelativeTopOf(elem) {
				if (scrollContainer) {
					return elem.offsetTop - scrollContainer.offsetTop;
				} else {
					return elem.getBoundingClientRect().top + getScrollTop() - docElem.offsetTop;
				}
			};
	
			/**
	   * Immediately stops the current smooth scroll operation
	   */
			var stopScroll = function stopScroll() {
				clearTimeout(scrollTimeoutId);
				scrollTimeoutId = 0;
			};
	
			/**
	   * Scrolls to a specific vertical position in the document.
	   *
	   * @param {endY} The vertical position within the document.
	   * @param {duration} Optionally the duration of the scroll operation.
	   *        If 0 or not provided it is automatically calculated based on the 
	   *        distance and the default duration.
	   */
			var scrollToY = function scrollToY(endY, duration, onDone) {
				stopScroll();
				if (nativeSmoothScrollEnabled()) {
					(scrollContainer || window).scrollTo(0, endY);
					if (onDone) {
						onDone();
					}
				} else {
					var startY = getScrollTop();
					var distance = Math.max(endY, 0) - startY;
					duration = duration || Math.min(Math.abs(distance), defaultDuration);
					var startTime = new Date().getTime();
					(function loopScroll() {
						scrollTimeoutId = setTimeout(function () {
							var p = Math.min((new Date().getTime() - startTime) / duration, 1); // percentage
							var y = Math.max(Math.floor(startY + distance * (p < 0.5 ? 2 * p * p : p * (4 - p * 2) - 1)), 0);
							if (scrollContainer) {
								scrollContainer.scrollTop = y;
							} else {
								window.scrollTo(0, y);
							}
							if (p < 1 && getViewHeight() + y < (scrollContainer || docElem).scrollHeight) {
								loopScroll();
							} else {
								setTimeout(stopScroll, 99); // with cooldown time
								if (onDone) {
									onDone();
								}
							}
						}, 9);
					})();
				}
			};
	
			/**
	   * Scrolls to the top of a specific element.
	   *
	   * @param {elem} The element.
	   * @param {duration} Optionally the duration of the scroll operation.
	   *        A value of 0 is ignored.
	   */
			var scrollToElem = function scrollToElem(elem, duration, onDone) {
				scrollToY(getRelativeTopOf(elem) - edgeOffset, duration, onDone);
			};
	
			/**
	   * Scrolls an element into view if necessary.
	   *
	   * @param {elem} The element.
	   * @param {duration} Optionally the duration of the scroll operation.
	   *        A value of 0 is ignored.
	   */
			var scrollIntoView = function scrollIntoView(elem, duration, onDone) {
				var elemScrollHeight = elem.getBoundingClientRect().height + 2 * edgeOffset;
				var vHeight = getViewHeight();
				var elemTop = getRelativeTopOf(elem);
				var elemBottom = elemTop + elemScrollHeight - edgeOffset;
				var scrollTop = getScrollTop();
				if (elemTop - scrollTop < edgeOffset || elemScrollHeight > vHeight) {
					// Element is clipped at top or is higher than screen.
					scrollToElem(elem, duration, onDone);
				} else if (scrollTop + vHeight - elemBottom < 0) {
					// Element is clipped at the bottom.
					scrollToY(elemBottom - vHeight, duration, onDone);
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
	   *        A value of 0 is ignored.
	   */
			var scrollToCenterOf = function scrollToCenterOf(elem, duration, offset, onDone) {
				scrollToY(Math.max(getRelativeTopOf(elem) - getViewHeight() / 2 + (offset || elem.getBoundingClientRect().height / 2), 0), duration, onDone);
			};
	
			/**
	   * Changes default settings for this scroller.
	   *
	   * @param {newDefaultDuration} New value for default duration, used for each scroll method by default.
	   *        Ignored if 0 or falsy.
	   * @param {newEdgeOffset} New value for the edge offset, used by each scroll method by default.
	   */
			var setup = function setup(newDefaultDuration, newEdgeOffset) {
				if (newDefaultDuration) {
					defaultDuration = newDefaultDuration;
				}
				if (newEdgeOffset === 0 || newEdgeOffset) {
					edgeOffset = newEdgeOffset;
				}
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
				}
			};
		};
	
		// Create a scroller for the browser window, omitting parameters:
		var defaultScroller = createScroller();
	
		// Create listeners for the documentElement only & exclude IE8-
		if ("addEventListener" in window && document.body.style.scrollBehavior !== "smooth" && !window.noZensmooth) {
			var replaceUrl = function replaceUrl(hash) {
				try {
					history.replaceState({}, "", window.location.href.split("#")[0] + hash);
				} catch (e) {
					// To avoid the Security exception in Chrome when the page was opened via the file protocol, e.g., file://index.html
				}
			};
			window.addEventListener("click", function (event) {
				var anchor = event.target;
				while (anchor && anchor.tagName !== "A") {
					anchor = anchor.parentNode;
				}
				// Only handle links that were clicked with the primary button, without modifier keys:
				if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
					return;
				}
				var href = anchor.getAttribute("href") || "";
				if (href.indexOf("#") === 0) {
					if (href === "#") {
						event.preventDefault();
						defaultScroller.toY(0);
						replaceUrl("");
					} else {
						var targetId = anchor.hash.substring(1);
						var targetElem = document.getElementById(targetId);
						if (targetElem) {
							event.preventDefault();
							defaultScroller.to(targetElem);
							replaceUrl("#" + targetId);
						}
					}
				}
			}, false);
		}
	
		return {
			// Expose the "constructor" that can create a new scroller:
			createScroller: createScroller,
			// Surface the methods of the default scroller:
			setup: defaultScroller.setup,
			to: defaultScroller.to,
			toY: defaultScroller.toY,
			intoView: defaultScroller.intoView,
			center: defaultScroller.center,
			stop: defaultScroller.stop,
			moving: defaultScroller.moving
		};
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*!
	Waypoints - 4.0.0
	Copyright © 2011-2015 Caleb Troughton
	Licensed under the MIT license.
	https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
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
	    Waypoint.invokeAll('enable');
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
	    if (horizontalEmpty && verticalEmpty) {
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
	        waypoint.triggerPoint = elementOffset + contextModifier - adjustment;
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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?minimize!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./main.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?minimize!./../node_modules/postcss-loader/index.js!./../node_modules/less-loader/index.js!./main.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Cousine);", ""]);
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700);", ""]);
	
	// module
	exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}code[class*=language-],pre[class*=language-]{color:#000;background:none;font-family:Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;tab-size:4;-webkit-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{position:relative;margin:.5em 0;box-shadow:-1px 0 0 0 #358ccb,0 0 0 1px #dfdfdf;border-left:10px solid #358ccb;background-color:#fdfdfd;background-image:linear-gradient(transparent 50%,rgba(69,142,209,.04) 0);background-size:3em 3em;background-origin:content-box;overflow:visible;padding:0}code[class*=language]{max-height:inherit;height:100%;padding:0 1em;display:block;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background-color:#fdfdfd;box-sizing:border-box;margin-bottom:1em}:not(pre)>code[class*=language-]{position:relative;padding:.2em;border-radius:.3em;color:#c92c2c;border:1px solid rgba(0,0,0,.1);display:inline;white-space:normal}pre[class*=language-]:after,pre[class*=language-]:before{content:'';z-index:-2;display:block;position:absolute;bottom:.75em;left:.18em;width:40%;height:20%;max-height:13em;box-shadow:0 13px 8px #979797;transform:rotate(-2deg)}:not(pre)>code[class*=language-]:after,pre[class*=language-]:after{right:.75em;left:auto;transform:rotate(2deg)}.token.block-comment,.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#7d8b99}.token.punctuation{color:#5f6364}.token.boolean,.token.constant,.token.deleted,.token.function-name,.token.number,.token.property,.token.symbol,.token.tag{color:#c92c2c}.token.attr-name,.token.builtin,.token.char,.token.function,.token.inserted,.token.selector,.token.string{color:#2f9c0a}.token.entity,.token.operator,.token.url,.token.variable{color:#a67f59;background:hsla(0,0%,100%,.5)}.token.atrule,.token.attr-value,.token.class-name,.token.keyword{color:#1990b8}.token.important,.token.regex{color:#e90}.language-css .token.string,.style .token.string{color:#a67f59;background:hsla(0,0%,100%,.5)}.token.important{font-weight:400}.token.bold{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}.namespace{opacity:.7}@media screen and (max-width:767px){pre[class*=language-]:after,pre[class*=language-]:before{bottom:14px;box-shadow:none}}.token.cr:before,.token.lf:before,.token.tab:not(:empty):before{color:#e0d7d1}pre[class*=language-].line-numbers{padding-left:0}pre[class*=language-].line-numbers code{padding-left:3.8em}pre[class*=language-].line-numbers .line-numbers-rows{left:0}pre[class*=language-][data-line]{padding-top:0;padding-bottom:0;padding-left:0}pre[data-line] code{position:relative;padding-left:4em}pre .line-highlight{margin-top:0}[flex-offset=\"0\"]{margin-left:0}[flex-offset=\"5\"]{margin-left:5%}[flex-offset=\"10\"]{margin-left:10%}[flex-offset=\"15\"]{margin-left:15%}[flex-offset=\"20\"]{margin-left:20%}[flex-offset=\"25\"]{margin-left:25%}[flex-offset=\"30\"]{margin-left:30%}[flex-offset=\"35\"]{margin-left:35%}[flex-offset=\"40\"]{margin-left:40%}[flex-offset=\"45\"]{margin-left:45%}[flex-offset=\"50\"]{margin-left:50%}[flex-offset=\"55\"]{margin-left:55%}[flex-offset=\"60\"]{margin-left:60%}[flex-offset=\"65\"]{margin-left:65%}[flex-offset=\"70\"]{margin-left:70%}[flex-offset=\"75\"]{margin-left:75%}[flex-offset=\"80\"]{margin-left:80%}[flex-offset=\"85\"]{margin-left:85%}[flex-offset=\"90\"]{margin-left:90%}[flex-offset=\"95\"]{margin-left:95%}[flex-offset=\"33\"]{margin-left:33.33333%}[flex-offset=\"66\"]{margin-left:66.66667%}[flex-order=\"0\"]{-ms-flex-order:0;order:0}[flex-order=\"1\"]{-ms-flex-order:1;order:1}[flex-order=\"2\"]{-ms-flex-order:2;order:2}[flex-order=\"3\"]{-ms-flex-order:3;order:3}[flex-order=\"4\"]{-ms-flex-order:4;order:4}[flex-order=\"5\"]{-ms-flex-order:5;order:5}[flex-order=\"6\"]{-ms-flex-order:6;order:6}[flex-order=\"7\"]{-ms-flex-order:7;order:7}[flex-order=\"8\"]{-ms-flex-order:8;order:8}[flex-order=\"9\"]{-ms-flex-order:9;order:9}[flex-order=\"10\"]{-ms-flex-order:10;order:10}[flex-order=\"11\"]{-ms-flex-order:11;order:11}[flex-order=\"12\"]{-ms-flex-order:12;order:12}[flex-order=\"13\"]{-ms-flex-order:13;order:13}[flex-order=\"14\"]{-ms-flex-order:14;order:14}[flex-order=\"15\"]{-ms-flex-order:15;order:15}[flex-order=\"16\"]{-ms-flex-order:16;order:16}[flex-order=\"17\"]{-ms-flex-order:17;order:17}[flex-order=\"18\"]{-ms-flex-order:18;order:18}[flex-order=\"19\"]{-ms-flex-order:19;order:19}[flex-order=\"20\"]{-ms-flex-order:20;order:20}[layout]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}[layout]>*{box-sizing:border-box}[layout=column]{-ms-flex-direction:column;flex-direction:column}[layout=row]{-ms-flex-direction:row;flex-direction:row}[layout-align]{-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[layout-align^=start]{-ms-flex-pack:start;justify-content:flex-start}[layout-align^=center]{-ms-flex-pack:center;justify-content:center}[layout-align^=end]{-ms-flex-pack:end;justify-content:flex-end}[layout-align^=space-around]{-ms-flex-pack:distribute;justify-content:space-around}[layout-align^=space-between]{-ms-flex-pack:justify;justify-content:space-between}[layout-align$=start]{-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}[layout-align$=center]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%}[layout-align$=center]>*{max-width:100%}[layout-align$=end]{-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end;-ms-flex-line-pack:end;align-content:flex-end}[layout-align=center],[layout-align=end],[layout-align=space-around],[layout-align=space-between],[layout-align=start]{-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;-ms-flex-line-pack:stretch;align-content:stretch}[flex]{-ms-flex:1;flex:1}[flex-start]{margin-bottom:auto}[flex-end]{margin-top:auto}[flex-none]{-ms-flex:0 0 auto;flex:0 0 auto}[flex-initial]{-ms-flex:0 1 auto;flex:0 1 auto}[flex-noshrink]{-ms-flex:1 0 auto;flex:1 0 auto}[flex-auto]{-ms-flex:1 1 auto;flex:1 1 auto}[flex-grow]{-ms-flex:1 1 100%;flex:1 1 100%}[flex],[layout=row]>[flex]{max-height:100%}[layout=column]>[flex]{max-width:100%}[layout=row]>[flex=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout=column]>[flex=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[layout=row]>[flex=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout=column]>[flex=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[layout=row]>[flex=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout=column]>[flex=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[layout=row]>[flex=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout=column]>[flex=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[layout=row]>[flex=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout=column]>[flex=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[layout=row]>[flex=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout=column]>[flex=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[layout=row]>[flex=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout=column]>[flex=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[layout=row]>[flex=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout=column]>[flex=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[layout=row]>[flex=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout=column]>[flex=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[layout=row]>[flex=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout=column]>[flex=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[layout=row]>[flex=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout=column]>[flex=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[layout=row]>[flex=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout=column]>[flex=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[layout=row]>[flex=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout=column]>[flex=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[layout=row]>[flex=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout=column]>[flex=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[layout=row]>[flex=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout=column]>[flex=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[layout=row]>[flex=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout=column]>[flex=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[layout=row]>[flex=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout=column]>[flex=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[layout=row]>[flex=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout=column]>[flex=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[layout=row]>[flex=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout=column]>[flex=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[layout=row]>[flex=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout=column]>[flex=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout=row]>[flex=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout=column]>[flex=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout=row]>[flex=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout=column]>[flex=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[hide]{display:none}@media (max-width:599px){[flex-offset-sm=\"0\"]{margin-left:0}[flex-offset-sm=\"5\"]{margin-left:5%}[flex-offset-sm=\"10\"]{margin-left:10%}[flex-offset-sm=\"15\"]{margin-left:15%}[flex-offset-sm=\"20\"]{margin-left:20%}[flex-offset-sm=\"25\"]{margin-left:25%}[flex-offset-sm=\"30\"]{margin-left:30%}[flex-offset-sm=\"35\"]{margin-left:35%}[flex-offset-sm=\"40\"]{margin-left:40%}[flex-offset-sm=\"45\"]{margin-left:45%}[flex-offset-sm=\"50\"]{margin-left:50%}[flex-offset-sm=\"55\"]{margin-left:55%}[flex-offset-sm=\"60\"]{margin-left:60%}[flex-offset-sm=\"65\"]{margin-left:65%}[flex-offset-sm=\"70\"]{margin-left:70%}[flex-offset-sm=\"75\"]{margin-left:75%}[flex-offset-sm=\"80\"]{margin-left:80%}[flex-offset-sm=\"85\"]{margin-left:85%}[flex-offset-sm=\"90\"]{margin-left:90%}[flex-offset-sm=\"95\"]{margin-left:95%}[flex-offset-sm=\"33\"]{margin-left:33.33333%}[flex-offset-sm=\"66\"]{margin-left:66.66667%}[flex-order-sm=\"0\"]{-ms-flex-order:0;order:0}[flex-order-sm=\"1\"]{-ms-flex-order:1;order:1}[flex-order-sm=\"2\"]{-ms-flex-order:2;order:2}[flex-order-sm=\"3\"]{-ms-flex-order:3;order:3}[flex-order-sm=\"4\"]{-ms-flex-order:4;order:4}[flex-order-sm=\"5\"]{-ms-flex-order:5;order:5}[flex-order-sm=\"6\"]{-ms-flex-order:6;order:6}[flex-order-sm=\"7\"]{-ms-flex-order:7;order:7}[flex-order-sm=\"8\"]{-ms-flex-order:8;order:8}[flex-order-sm=\"9\"]{-ms-flex-order:9;order:9}[flex-order-sm=\"10\"]{-ms-flex-order:10;order:10}[flex-order-sm=\"11\"]{-ms-flex-order:11;order:11}[flex-order-sm=\"12\"]{-ms-flex-order:12;order:12}[flex-order-sm=\"13\"]{-ms-flex-order:13;order:13}[flex-order-sm=\"14\"]{-ms-flex-order:14;order:14}[flex-order-sm=\"15\"]{-ms-flex-order:15;order:15}[flex-order-sm=\"16\"]{-ms-flex-order:16;order:16}[flex-order-sm=\"17\"]{-ms-flex-order:17;order:17}[flex-order-sm=\"18\"]{-ms-flex-order:18;order:18}[flex-order-sm=\"19\"]{-ms-flex-order:19;order:19}[flex-order-sm=\"20\"]{-ms-flex-order:20;order:20}[layout-sm]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}[layout-sm]>*{box-sizing:border-box}[layout-sm=column]{-ms-flex-direction:column;flex-direction:column}[layout-sm=row]{-ms-flex-direction:row;flex-direction:row}[layout-align-sm]{-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[layout-align-sm^=start]{-ms-flex-pack:start;justify-content:flex-start}[layout-align-sm^=center]{-ms-flex-pack:center;justify-content:center}[layout-align-sm^=end]{-ms-flex-pack:end;justify-content:flex-end}[layout-align-sm^=space-around]{-ms-flex-pack:distribute;justify-content:space-around}[layout-align-sm^=space-between]{-ms-flex-pack:justify;justify-content:space-between}[layout-align-sm$=start]{-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}[layout-align-sm$=center]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%}[layout-align-sm$=center]>*{max-width:100%}[layout-align-sm$=end]{-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end;-ms-flex-line-pack:end;align-content:flex-end}[layout-align-sm=center],[layout-align-sm=end],[layout-align-sm=space-around],[layout-align-sm=space-between],[layout-align-sm=start]{-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;-ms-flex-line-pack:stretch;align-content:stretch}[flex-sm]{-ms-flex:1;flex:1}[flex-sm-start]{margin-bottom:auto}[flex-sm-end]{margin-top:auto}[flex-sm-none]{-ms-flex:0 0 auto;flex:0 0 auto}[flex-sm-initial]{-ms-flex:0 1 auto;flex:0 1 auto}[flex-sm-noshrink]{-ms-flex:1 0 auto;flex:1 0 auto}[flex-sm-auto]{-ms-flex:1 1 auto;flex:1 1 auto}[flex-sm-grow]{-ms-flex:1 1 100%;flex:1 1 100%}[flex-sm],[layout-sm=row]>[flex-sm],[layout=row]>[flex-sm]{max-height:100%}[layout-sm=column]>[flex-sm],[layout=column]>[flex-sm]{max-width:100%}[layout-sm=row]>[flex-sm=\"5\"],[layout-sm=row]>[flex=\"5\"],[layout=row]>[flex-sm=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-sm=column]>[flex-sm=\"5\"],[layout-sm=column]>[flex=\"5\"],[layout=column]>[flex-sm=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[layout-sm=row]>[flex-sm=\"10\"],[layout-sm=row]>[flex=\"10\"],[layout=row]>[flex-sm=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-sm=column]>[flex-sm=\"10\"],[layout-sm=column]>[flex=\"10\"],[layout=column]>[flex-sm=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[layout-sm=row]>[flex-sm=\"15\"],[layout-sm=row]>[flex=\"15\"],[layout=row]>[flex-sm=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-sm=column]>[flex-sm=\"15\"],[layout-sm=column]>[flex=\"15\"],[layout=column]>[flex-sm=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[layout-sm=row]>[flex-sm=\"20\"],[layout-sm=row]>[flex=\"20\"],[layout=row]>[flex-sm=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-sm=column]>[flex-sm=\"20\"],[layout-sm=column]>[flex=\"20\"],[layout=column]>[flex-sm=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[layout-sm=row]>[flex-sm=\"25\"],[layout-sm=row]>[flex=\"25\"],[layout=row]>[flex-sm=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-sm=column]>[flex-sm=\"25\"],[layout-sm=column]>[flex=\"25\"],[layout=column]>[flex-sm=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[layout-sm=row]>[flex-sm=\"30\"],[layout-sm=row]>[flex=\"30\"],[layout=row]>[flex-sm=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-sm=column]>[flex-sm=\"30\"],[layout-sm=column]>[flex=\"30\"],[layout=column]>[flex-sm=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[layout-sm=row]>[flex-sm=\"35\"],[layout-sm=row]>[flex=\"35\"],[layout=row]>[flex-sm=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-sm=column]>[flex-sm=\"35\"],[layout-sm=column]>[flex=\"35\"],[layout=column]>[flex-sm=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[layout-sm=row]>[flex-sm=\"40\"],[layout-sm=row]>[flex=\"40\"],[layout=row]>[flex-sm=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-sm=column]>[flex-sm=\"40\"],[layout-sm=column]>[flex=\"40\"],[layout=column]>[flex-sm=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[layout-sm=row]>[flex-sm=\"45\"],[layout-sm=row]>[flex=\"45\"],[layout=row]>[flex-sm=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-sm=column]>[flex-sm=\"45\"],[layout-sm=column]>[flex=\"45\"],[layout=column]>[flex-sm=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[layout-sm=row]>[flex-sm=\"50\"],[layout-sm=row]>[flex=\"50\"],[layout=row]>[flex-sm=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-sm=column]>[flex-sm=\"50\"],[layout-sm=column]>[flex=\"50\"],[layout=column]>[flex-sm=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[layout-sm=row]>[flex-sm=\"55\"],[layout-sm=row]>[flex=\"55\"],[layout=row]>[flex-sm=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-sm=column]>[flex-sm=\"55\"],[layout-sm=column]>[flex=\"55\"],[layout=column]>[flex-sm=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[layout-sm=row]>[flex-sm=\"60\"],[layout-sm=row]>[flex=\"60\"],[layout=row]>[flex-sm=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-sm=column]>[flex-sm=\"60\"],[layout-sm=column]>[flex=\"60\"],[layout=column]>[flex-sm=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[layout-sm=row]>[flex-sm=\"65\"],[layout-sm=row]>[flex=\"65\"],[layout=row]>[flex-sm=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-sm=column]>[flex-sm=\"65\"],[layout-sm=column]>[flex=\"65\"],[layout=column]>[flex-sm=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[layout-sm=row]>[flex-sm=\"70\"],[layout-sm=row]>[flex=\"70\"],[layout=row]>[flex-sm=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-sm=column]>[flex-sm=\"70\"],[layout-sm=column]>[flex=\"70\"],[layout=column]>[flex-sm=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[layout-sm=row]>[flex-sm=\"75\"],[layout-sm=row]>[flex=\"75\"],[layout=row]>[flex-sm=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-sm=column]>[flex-sm=\"75\"],[layout-sm=column]>[flex=\"75\"],[layout=column]>[flex-sm=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[layout-sm=row]>[flex-sm=\"80\"],[layout-sm=row]>[flex=\"80\"],[layout=row]>[flex-sm=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-sm=column]>[flex-sm=\"80\"],[layout-sm=column]>[flex=\"80\"],[layout=column]>[flex-sm=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[layout-sm=row]>[flex-sm=\"85\"],[layout-sm=row]>[flex=\"85\"],[layout=row]>[flex-sm=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-sm=column]>[flex-sm=\"85\"],[layout-sm=column]>[flex=\"85\"],[layout=column]>[flex-sm=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[layout-sm=row]>[flex-sm=\"90\"],[layout-sm=row]>[flex=\"90\"],[layout=row]>[flex-sm=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-sm=column]>[flex-sm=\"90\"],[layout-sm=column]>[flex=\"90\"],[layout=column]>[flex-sm=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[layout-sm=row]>[flex-sm=\"95\"],[layout-sm=row]>[flex=\"95\"],[layout=row]>[flex-sm=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-sm=column]>[flex-sm=\"95\"],[layout-sm=column]>[flex=\"95\"],[layout=column]>[flex-sm=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[layout-sm=row]>[flex-sm=\"100\"],[layout-sm=row]>[flex=\"100\"],[layout=row]>[flex-sm=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-sm=column]>[flex-sm=\"100\"],[layout-sm=column]>[flex=\"100\"],[layout=column]>[flex-sm=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-sm=row]>[flex-sm=\"33\"],[layout-sm=row]>[flex=\"33\"],[layout=row]>[flex-sm=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-sm=column]>[flex-sm=\"33\"],[layout-sm=column]>[flex=\"33\"],[layout=column]>[flex-sm=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-sm=row]>[flex-sm=\"66\"],[layout-sm=row]>[flex=\"66\"],[layout=row]>[flex-sm=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-sm=column]>[flex-sm=\"66\"],[layout-sm=column]>[flex=\"66\"],[layout=column]>[flex-sm=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[hide-sm]{display:none}}@media (min-width:600px){[flex-offset-gt-sm=\"0\"]{margin-left:0}[flex-offset-gt-sm=\"5\"]{margin-left:5%}[flex-offset-gt-sm=\"10\"]{margin-left:10%}[flex-offset-gt-sm=\"15\"]{margin-left:15%}[flex-offset-gt-sm=\"20\"]{margin-left:20%}[flex-offset-gt-sm=\"25\"]{margin-left:25%}[flex-offset-gt-sm=\"30\"]{margin-left:30%}[flex-offset-gt-sm=\"35\"]{margin-left:35%}[flex-offset-gt-sm=\"40\"]{margin-left:40%}[flex-offset-gt-sm=\"45\"]{margin-left:45%}[flex-offset-gt-sm=\"50\"]{margin-left:50%}[flex-offset-gt-sm=\"55\"]{margin-left:55%}[flex-offset-gt-sm=\"60\"]{margin-left:60%}[flex-offset-gt-sm=\"65\"]{margin-left:65%}[flex-offset-gt-sm=\"70\"]{margin-left:70%}[flex-offset-gt-sm=\"75\"]{margin-left:75%}[flex-offset-gt-sm=\"80\"]{margin-left:80%}[flex-offset-gt-sm=\"85\"]{margin-left:85%}[flex-offset-gt-sm=\"90\"]{margin-left:90%}[flex-offset-gt-sm=\"95\"]{margin-left:95%}[flex-offset-gt-sm=\"33\"]{margin-left:33.33333%}[flex-offset-gt-sm=\"66\"]{margin-left:66.66667%}[flex-order-gt-sm=\"0\"]{-ms-flex-order:0;order:0}[flex-order-gt-sm=\"1\"]{-ms-flex-order:1;order:1}[flex-order-gt-sm=\"2\"]{-ms-flex-order:2;order:2}[flex-order-gt-sm=\"3\"]{-ms-flex-order:3;order:3}[flex-order-gt-sm=\"4\"]{-ms-flex-order:4;order:4}[flex-order-gt-sm=\"5\"]{-ms-flex-order:5;order:5}[flex-order-gt-sm=\"6\"]{-ms-flex-order:6;order:6}[flex-order-gt-sm=\"7\"]{-ms-flex-order:7;order:7}[flex-order-gt-sm=\"8\"]{-ms-flex-order:8;order:8}[flex-order-gt-sm=\"9\"]{-ms-flex-order:9;order:9}[flex-order-gt-sm=\"10\"]{-ms-flex-order:10;order:10}[flex-order-gt-sm=\"11\"]{-ms-flex-order:11;order:11}[flex-order-gt-sm=\"12\"]{-ms-flex-order:12;order:12}[flex-order-gt-sm=\"13\"]{-ms-flex-order:13;order:13}[flex-order-gt-sm=\"14\"]{-ms-flex-order:14;order:14}[flex-order-gt-sm=\"15\"]{-ms-flex-order:15;order:15}[flex-order-gt-sm=\"16\"]{-ms-flex-order:16;order:16}[flex-order-gt-sm=\"17\"]{-ms-flex-order:17;order:17}[flex-order-gt-sm=\"18\"]{-ms-flex-order:18;order:18}[flex-order-gt-sm=\"19\"]{-ms-flex-order:19;order:19}[flex-order-gt-sm=\"20\"]{-ms-flex-order:20;order:20}[layout-gt-sm]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}[layout-gt-sm]>*{box-sizing:border-box}[layout-gt-sm=column]{-ms-flex-direction:column;flex-direction:column}[layout-gt-sm=row]{-ms-flex-direction:row;flex-direction:row}[layout-align-gt-sm]{-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[layout-align-gt-sm^=start]{-ms-flex-pack:start;justify-content:flex-start}[layout-align-gt-sm^=center]{-ms-flex-pack:center;justify-content:center}[layout-align-gt-sm^=end]{-ms-flex-pack:end;justify-content:flex-end}[layout-align-gt-sm^=space-around]{-ms-flex-pack:distribute;justify-content:space-around}[layout-align-gt-sm^=space-between]{-ms-flex-pack:justify;justify-content:space-between}[layout-align-gt-sm$=start]{-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}[layout-align-gt-sm$=center]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%}[layout-align-gt-sm$=center]>*{max-width:100%}[layout-align-gt-sm$=end]{-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end;-ms-flex-line-pack:end;align-content:flex-end}[layout-align-gt-sm=center],[layout-align-gt-sm=end],[layout-align-gt-sm=space-around],[layout-align-gt-sm=space-between],[layout-align-gt-sm=start]{-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;-ms-flex-line-pack:stretch;align-content:stretch}[flex-gt-sm]{-ms-flex:1;flex:1}[flex-gt-sm-start]{margin-bottom:auto}[flex-gt-sm-end]{margin-top:auto}[flex-gt-sm-none]{-ms-flex:0 0 auto;flex:0 0 auto}[flex-gt-sm-initial]{-ms-flex:0 1 auto;flex:0 1 auto}[flex-gt-sm-noshrink]{-ms-flex:1 0 auto;flex:1 0 auto}[flex-gt-sm-auto]{-ms-flex:1 1 auto;flex:1 1 auto}[flex-gt-sm-grow]{-ms-flex:1 1 100%;flex:1 1 100%}[flex-gt-sm],[layout-gt-sm=row]>[flex-gt-sm],[layout=row]>[flex-gt-sm]{max-height:100%}[layout-gt-sm=column]>[flex-gt-sm],[layout=column]>[flex-gt-sm]{max-width:100%}[layout-gt-sm=row]>[flex-gt-sm=\"5\"],[layout-gt-sm=row]>[flex=\"5\"],[layout=row]>[flex-gt-sm=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-gt-sm=column]>[flex-gt-sm=\"5\"],[layout-gt-sm=column]>[flex=\"5\"],[layout=column]>[flex-gt-sm=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[layout-gt-sm=row]>[flex-gt-sm=\"10\"],[layout-gt-sm=row]>[flex=\"10\"],[layout=row]>[flex-gt-sm=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-gt-sm=column]>[flex-gt-sm=\"10\"],[layout-gt-sm=column]>[flex=\"10\"],[layout=column]>[flex-gt-sm=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[layout-gt-sm=row]>[flex-gt-sm=\"15\"],[layout-gt-sm=row]>[flex=\"15\"],[layout=row]>[flex-gt-sm=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-gt-sm=column]>[flex-gt-sm=\"15\"],[layout-gt-sm=column]>[flex=\"15\"],[layout=column]>[flex-gt-sm=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[layout-gt-sm=row]>[flex-gt-sm=\"20\"],[layout-gt-sm=row]>[flex=\"20\"],[layout=row]>[flex-gt-sm=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-gt-sm=column]>[flex-gt-sm=\"20\"],[layout-gt-sm=column]>[flex=\"20\"],[layout=column]>[flex-gt-sm=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[layout-gt-sm=row]>[flex-gt-sm=\"25\"],[layout-gt-sm=row]>[flex=\"25\"],[layout=row]>[flex-gt-sm=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-gt-sm=column]>[flex-gt-sm=\"25\"],[layout-gt-sm=column]>[flex=\"25\"],[layout=column]>[flex-gt-sm=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[layout-gt-sm=row]>[flex-gt-sm=\"30\"],[layout-gt-sm=row]>[flex=\"30\"],[layout=row]>[flex-gt-sm=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-gt-sm=column]>[flex-gt-sm=\"30\"],[layout-gt-sm=column]>[flex=\"30\"],[layout=column]>[flex-gt-sm=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[layout-gt-sm=row]>[flex-gt-sm=\"35\"],[layout-gt-sm=row]>[flex=\"35\"],[layout=row]>[flex-gt-sm=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-gt-sm=column]>[flex-gt-sm=\"35\"],[layout-gt-sm=column]>[flex=\"35\"],[layout=column]>[flex-gt-sm=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[layout-gt-sm=row]>[flex-gt-sm=\"40\"],[layout-gt-sm=row]>[flex=\"40\"],[layout=row]>[flex-gt-sm=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-gt-sm=column]>[flex-gt-sm=\"40\"],[layout-gt-sm=column]>[flex=\"40\"],[layout=column]>[flex-gt-sm=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[layout-gt-sm=row]>[flex-gt-sm=\"45\"],[layout-gt-sm=row]>[flex=\"45\"],[layout=row]>[flex-gt-sm=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-gt-sm=column]>[flex-gt-sm=\"45\"],[layout-gt-sm=column]>[flex=\"45\"],[layout=column]>[flex-gt-sm=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[layout-gt-sm=row]>[flex-gt-sm=\"50\"],[layout-gt-sm=row]>[flex=\"50\"],[layout=row]>[flex-gt-sm=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-gt-sm=column]>[flex-gt-sm=\"50\"],[layout-gt-sm=column]>[flex=\"50\"],[layout=column]>[flex-gt-sm=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[layout-gt-sm=row]>[flex-gt-sm=\"55\"],[layout-gt-sm=row]>[flex=\"55\"],[layout=row]>[flex-gt-sm=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-gt-sm=column]>[flex-gt-sm=\"55\"],[layout-gt-sm=column]>[flex=\"55\"],[layout=column]>[flex-gt-sm=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[layout-gt-sm=row]>[flex-gt-sm=\"60\"],[layout-gt-sm=row]>[flex=\"60\"],[layout=row]>[flex-gt-sm=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-gt-sm=column]>[flex-gt-sm=\"60\"],[layout-gt-sm=column]>[flex=\"60\"],[layout=column]>[flex-gt-sm=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[layout-gt-sm=row]>[flex-gt-sm=\"65\"],[layout-gt-sm=row]>[flex=\"65\"],[layout=row]>[flex-gt-sm=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-gt-sm=column]>[flex-gt-sm=\"65\"],[layout-gt-sm=column]>[flex=\"65\"],[layout=column]>[flex-gt-sm=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[layout-gt-sm=row]>[flex-gt-sm=\"70\"],[layout-gt-sm=row]>[flex=\"70\"],[layout=row]>[flex-gt-sm=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-gt-sm=column]>[flex-gt-sm=\"70\"],[layout-gt-sm=column]>[flex=\"70\"],[layout=column]>[flex-gt-sm=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[layout-gt-sm=row]>[flex-gt-sm=\"75\"],[layout-gt-sm=row]>[flex=\"75\"],[layout=row]>[flex-gt-sm=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-gt-sm=column]>[flex-gt-sm=\"75\"],[layout-gt-sm=column]>[flex=\"75\"],[layout=column]>[flex-gt-sm=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[layout-gt-sm=row]>[flex-gt-sm=\"80\"],[layout-gt-sm=row]>[flex=\"80\"],[layout=row]>[flex-gt-sm=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-gt-sm=column]>[flex-gt-sm=\"80\"],[layout-gt-sm=column]>[flex=\"80\"],[layout=column]>[flex-gt-sm=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[layout-gt-sm=row]>[flex-gt-sm=\"85\"],[layout-gt-sm=row]>[flex=\"85\"],[layout=row]>[flex-gt-sm=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-gt-sm=column]>[flex-gt-sm=\"85\"],[layout-gt-sm=column]>[flex=\"85\"],[layout=column]>[flex-gt-sm=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[layout-gt-sm=row]>[flex-gt-sm=\"90\"],[layout-gt-sm=row]>[flex=\"90\"],[layout=row]>[flex-gt-sm=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-gt-sm=column]>[flex-gt-sm=\"90\"],[layout-gt-sm=column]>[flex=\"90\"],[layout=column]>[flex-gt-sm=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[layout-gt-sm=row]>[flex-gt-sm=\"95\"],[layout-gt-sm=row]>[flex=\"95\"],[layout=row]>[flex-gt-sm=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-gt-sm=column]>[flex-gt-sm=\"95\"],[layout-gt-sm=column]>[flex=\"95\"],[layout=column]>[flex-gt-sm=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[layout-gt-sm=row]>[flex-gt-sm=\"100\"],[layout-gt-sm=row]>[flex=\"100\"],[layout=row]>[flex-gt-sm=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-gt-sm=column]>[flex-gt-sm=\"100\"],[layout-gt-sm=column]>[flex=\"100\"],[layout=column]>[flex-gt-sm=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-gt-sm=row]>[flex-gt-sm=\"33\"],[layout-gt-sm=row]>[flex=\"33\"],[layout=row]>[flex-gt-sm=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-gt-sm=column]>[flex-gt-sm=\"33\"],[layout-gt-sm=column]>[flex=\"33\"],[layout=column]>[flex-gt-sm=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-gt-sm=row]>[flex-gt-sm=\"66\"],[layout-gt-sm=row]>[flex=\"66\"],[layout=row]>[flex-gt-sm=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-gt-sm=column]>[flex-gt-sm=\"66\"],[layout-gt-sm=column]>[flex=\"66\"],[layout=column]>[flex-gt-sm=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[hide-gt-sm]{display:none}}@media (min-width:600px) and (max-width:959px){[flex-offset-md=\"0\"]{margin-left:0}[flex-offset-md=\"5\"]{margin-left:5%}[flex-offset-md=\"10\"]{margin-left:10%}[flex-offset-md=\"15\"]{margin-left:15%}[flex-offset-md=\"20\"]{margin-left:20%}[flex-offset-md=\"25\"]{margin-left:25%}[flex-offset-md=\"30\"]{margin-left:30%}[flex-offset-md=\"35\"]{margin-left:35%}[flex-offset-md=\"40\"]{margin-left:40%}[flex-offset-md=\"45\"]{margin-left:45%}[flex-offset-md=\"50\"]{margin-left:50%}[flex-offset-md=\"55\"]{margin-left:55%}[flex-offset-md=\"60\"]{margin-left:60%}[flex-offset-md=\"65\"]{margin-left:65%}[flex-offset-md=\"70\"]{margin-left:70%}[flex-offset-md=\"75\"]{margin-left:75%}[flex-offset-md=\"80\"]{margin-left:80%}[flex-offset-md=\"85\"]{margin-left:85%}[flex-offset-md=\"90\"]{margin-left:90%}[flex-offset-md=\"95\"]{margin-left:95%}[flex-offset-md=\"33\"]{margin-left:33.33333%}[flex-offset-md=\"66\"]{margin-left:66.66667%}[flex-order-md=\"0\"]{-ms-flex-order:0;order:0}[flex-order-md=\"1\"]{-ms-flex-order:1;order:1}[flex-order-md=\"2\"]{-ms-flex-order:2;order:2}[flex-order-md=\"3\"]{-ms-flex-order:3;order:3}[flex-order-md=\"4\"]{-ms-flex-order:4;order:4}[flex-order-md=\"5\"]{-ms-flex-order:5;order:5}[flex-order-md=\"6\"]{-ms-flex-order:6;order:6}[flex-order-md=\"7\"]{-ms-flex-order:7;order:7}[flex-order-md=\"8\"]{-ms-flex-order:8;order:8}[flex-order-md=\"9\"]{-ms-flex-order:9;order:9}[flex-order-md=\"10\"]{-ms-flex-order:10;order:10}[flex-order-md=\"11\"]{-ms-flex-order:11;order:11}[flex-order-md=\"12\"]{-ms-flex-order:12;order:12}[flex-order-md=\"13\"]{-ms-flex-order:13;order:13}[flex-order-md=\"14\"]{-ms-flex-order:14;order:14}[flex-order-md=\"15\"]{-ms-flex-order:15;order:15}[flex-order-md=\"16\"]{-ms-flex-order:16;order:16}[flex-order-md=\"17\"]{-ms-flex-order:17;order:17}[flex-order-md=\"18\"]{-ms-flex-order:18;order:18}[flex-order-md=\"19\"]{-ms-flex-order:19;order:19}[flex-order-md=\"20\"]{-ms-flex-order:20;order:20}[layout-md]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}[layout-md]>*{box-sizing:border-box}[layout-md=column]{-ms-flex-direction:column;flex-direction:column}[layout-md=row]{-ms-flex-direction:row;flex-direction:row}[layout-align-md]{-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[layout-align-md^=start]{-ms-flex-pack:start;justify-content:flex-start}[layout-align-md^=center]{-ms-flex-pack:center;justify-content:center}[layout-align-md^=end]{-ms-flex-pack:end;justify-content:flex-end}[layout-align-md^=space-around]{-ms-flex-pack:distribute;justify-content:space-around}[layout-align-md^=space-between]{-ms-flex-pack:justify;justify-content:space-between}[layout-align-md$=start]{-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}[layout-align-md$=center]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%}[layout-align-md$=center]>*{max-width:100%}[layout-align-md$=end]{-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end;-ms-flex-line-pack:end;align-content:flex-end}[layout-align-md=center],[layout-align-md=end],[layout-align-md=space-around],[layout-align-md=space-between],[layout-align-md=start]{-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;-ms-flex-line-pack:stretch;align-content:stretch}[flex-md]{-ms-flex:1;flex:1}[flex-md-start]{margin-bottom:auto}[flex-md-end]{margin-top:auto}[flex-md-none]{-ms-flex:0 0 auto;flex:0 0 auto}[flex-md-initial]{-ms-flex:0 1 auto;flex:0 1 auto}[flex-md-noshrink]{-ms-flex:1 0 auto;flex:1 0 auto}[flex-md-auto]{-ms-flex:1 1 auto;flex:1 1 auto}[flex-md-grow]{-ms-flex:1 1 100%;flex:1 1 100%}[flex-md],[layout-md=row]>[flex-md],[layout=row]>[flex-md]{max-height:100%}[layout-md=column]>[flex-md],[layout=column]>[flex-md]{max-width:100%}[layout-md=row]>[flex-md=\"5\"],[layout-md=row]>[flex=\"5\"],[layout=row]>[flex-md=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-md=column]>[flex-md=\"5\"],[layout-md=column]>[flex=\"5\"],[layout=column]>[flex-md=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[layout-md=row]>[flex-md=\"10\"],[layout-md=row]>[flex=\"10\"],[layout=row]>[flex-md=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-md=column]>[flex-md=\"10\"],[layout-md=column]>[flex=\"10\"],[layout=column]>[flex-md=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[layout-md=row]>[flex-md=\"15\"],[layout-md=row]>[flex=\"15\"],[layout=row]>[flex-md=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-md=column]>[flex-md=\"15\"],[layout-md=column]>[flex=\"15\"],[layout=column]>[flex-md=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[layout-md=row]>[flex-md=\"20\"],[layout-md=row]>[flex=\"20\"],[layout=row]>[flex-md=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-md=column]>[flex-md=\"20\"],[layout-md=column]>[flex=\"20\"],[layout=column]>[flex-md=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[layout-md=row]>[flex-md=\"25\"],[layout-md=row]>[flex=\"25\"],[layout=row]>[flex-md=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-md=column]>[flex-md=\"25\"],[layout-md=column]>[flex=\"25\"],[layout=column]>[flex-md=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[layout-md=row]>[flex-md=\"30\"],[layout-md=row]>[flex=\"30\"],[layout=row]>[flex-md=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-md=column]>[flex-md=\"30\"],[layout-md=column]>[flex=\"30\"],[layout=column]>[flex-md=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[layout-md=row]>[flex-md=\"35\"],[layout-md=row]>[flex=\"35\"],[layout=row]>[flex-md=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-md=column]>[flex-md=\"35\"],[layout-md=column]>[flex=\"35\"],[layout=column]>[flex-md=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[layout-md=row]>[flex-md=\"40\"],[layout-md=row]>[flex=\"40\"],[layout=row]>[flex-md=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-md=column]>[flex-md=\"40\"],[layout-md=column]>[flex=\"40\"],[layout=column]>[flex-md=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[layout-md=row]>[flex-md=\"45\"],[layout-md=row]>[flex=\"45\"],[layout=row]>[flex-md=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-md=column]>[flex-md=\"45\"],[layout-md=column]>[flex=\"45\"],[layout=column]>[flex-md=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[layout-md=row]>[flex-md=\"50\"],[layout-md=row]>[flex=\"50\"],[layout=row]>[flex-md=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-md=column]>[flex-md=\"50\"],[layout-md=column]>[flex=\"50\"],[layout=column]>[flex-md=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[layout-md=row]>[flex-md=\"55\"],[layout-md=row]>[flex=\"55\"],[layout=row]>[flex-md=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-md=column]>[flex-md=\"55\"],[layout-md=column]>[flex=\"55\"],[layout=column]>[flex-md=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[layout-md=row]>[flex-md=\"60\"],[layout-md=row]>[flex=\"60\"],[layout=row]>[flex-md=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-md=column]>[flex-md=\"60\"],[layout-md=column]>[flex=\"60\"],[layout=column]>[flex-md=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[layout-md=row]>[flex-md=\"65\"],[layout-md=row]>[flex=\"65\"],[layout=row]>[flex-md=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-md=column]>[flex-md=\"65\"],[layout-md=column]>[flex=\"65\"],[layout=column]>[flex-md=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[layout-md=row]>[flex-md=\"70\"],[layout-md=row]>[flex=\"70\"],[layout=row]>[flex-md=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-md=column]>[flex-md=\"70\"],[layout-md=column]>[flex=\"70\"],[layout=column]>[flex-md=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[layout-md=row]>[flex-md=\"75\"],[layout-md=row]>[flex=\"75\"],[layout=row]>[flex-md=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-md=column]>[flex-md=\"75\"],[layout-md=column]>[flex=\"75\"],[layout=column]>[flex-md=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[layout-md=row]>[flex-md=\"80\"],[layout-md=row]>[flex=\"80\"],[layout=row]>[flex-md=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-md=column]>[flex-md=\"80\"],[layout-md=column]>[flex=\"80\"],[layout=column]>[flex-md=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[layout-md=row]>[flex-md=\"85\"],[layout-md=row]>[flex=\"85\"],[layout=row]>[flex-md=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-md=column]>[flex-md=\"85\"],[layout-md=column]>[flex=\"85\"],[layout=column]>[flex-md=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[layout-md=row]>[flex-md=\"90\"],[layout-md=row]>[flex=\"90\"],[layout=row]>[flex-md=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-md=column]>[flex-md=\"90\"],[layout-md=column]>[flex=\"90\"],[layout=column]>[flex-md=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[layout-md=row]>[flex-md=\"95\"],[layout-md=row]>[flex=\"95\"],[layout=row]>[flex-md=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-md=column]>[flex-md=\"95\"],[layout-md=column]>[flex=\"95\"],[layout=column]>[flex-md=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[layout-md=row]>[flex-md=\"100\"],[layout-md=row]>[flex=\"100\"],[layout=row]>[flex-md=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-md=column]>[flex-md=\"100\"],[layout-md=column]>[flex=\"100\"],[layout=column]>[flex-md=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-md=row]>[flex-md=\"33\"],[layout-md=row]>[flex=\"33\"],[layout=row]>[flex-md=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-md=column]>[flex-md=\"33\"],[layout-md=column]>[flex=\"33\"],[layout=column]>[flex-md=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-md=row]>[flex-md=\"66\"],[layout-md=row]>[flex=\"66\"],[layout=row]>[flex-md=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-md=column]>[flex-md=\"66\"],[layout-md=column]>[flex=\"66\"],[layout=column]>[flex-md=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[hide-md]{display:none}}@media (min-width:960px){[flex-offset-gt-md=\"0\"]{margin-left:0}[flex-offset-gt-md=\"5\"]{margin-left:5%}[flex-offset-gt-md=\"10\"]{margin-left:10%}[flex-offset-gt-md=\"15\"]{margin-left:15%}[flex-offset-gt-md=\"20\"]{margin-left:20%}[flex-offset-gt-md=\"25\"]{margin-left:25%}[flex-offset-gt-md=\"30\"]{margin-left:30%}[flex-offset-gt-md=\"35\"]{margin-left:35%}[flex-offset-gt-md=\"40\"]{margin-left:40%}[flex-offset-gt-md=\"45\"]{margin-left:45%}[flex-offset-gt-md=\"50\"]{margin-left:50%}[flex-offset-gt-md=\"55\"]{margin-left:55%}[flex-offset-gt-md=\"60\"]{margin-left:60%}[flex-offset-gt-md=\"65\"]{margin-left:65%}[flex-offset-gt-md=\"70\"]{margin-left:70%}[flex-offset-gt-md=\"75\"]{margin-left:75%}[flex-offset-gt-md=\"80\"]{margin-left:80%}[flex-offset-gt-md=\"85\"]{margin-left:85%}[flex-offset-gt-md=\"90\"]{margin-left:90%}[flex-offset-gt-md=\"95\"]{margin-left:95%}[flex-offset-gt-md=\"33\"]{margin-left:33.33333%}[flex-offset-gt-md=\"66\"]{margin-left:66.66667%}[flex-order-gt-md=\"0\"]{-ms-flex-order:0;order:0}[flex-order-gt-md=\"1\"]{-ms-flex-order:1;order:1}[flex-order-gt-md=\"2\"]{-ms-flex-order:2;order:2}[flex-order-gt-md=\"3\"]{-ms-flex-order:3;order:3}[flex-order-gt-md=\"4\"]{-ms-flex-order:4;order:4}[flex-order-gt-md=\"5\"]{-ms-flex-order:5;order:5}[flex-order-gt-md=\"6\"]{-ms-flex-order:6;order:6}[flex-order-gt-md=\"7\"]{-ms-flex-order:7;order:7}[flex-order-gt-md=\"8\"]{-ms-flex-order:8;order:8}[flex-order-gt-md=\"9\"]{-ms-flex-order:9;order:9}[flex-order-gt-md=\"10\"]{-ms-flex-order:10;order:10}[flex-order-gt-md=\"11\"]{-ms-flex-order:11;order:11}[flex-order-gt-md=\"12\"]{-ms-flex-order:12;order:12}[flex-order-gt-md=\"13\"]{-ms-flex-order:13;order:13}[flex-order-gt-md=\"14\"]{-ms-flex-order:14;order:14}[flex-order-gt-md=\"15\"]{-ms-flex-order:15;order:15}[flex-order-gt-md=\"16\"]{-ms-flex-order:16;order:16}[flex-order-gt-md=\"17\"]{-ms-flex-order:17;order:17}[flex-order-gt-md=\"18\"]{-ms-flex-order:18;order:18}[flex-order-gt-md=\"19\"]{-ms-flex-order:19;order:19}[flex-order-gt-md=\"20\"]{-ms-flex-order:20;order:20}[layout-gt-md]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}[layout-gt-md]>*{box-sizing:border-box}[layout-gt-md=column]{-ms-flex-direction:column;flex-direction:column}[layout-gt-md=row]{-ms-flex-direction:row;flex-direction:row}[layout-align-gt-md]{-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[layout-align-gt-md^=start]{-ms-flex-pack:start;justify-content:flex-start}[layout-align-gt-md^=center]{-ms-flex-pack:center;justify-content:center}[layout-align-gt-md^=end]{-ms-flex-pack:end;justify-content:flex-end}[layout-align-gt-md^=space-around]{-ms-flex-pack:distribute;justify-content:space-around}[layout-align-gt-md^=space-between]{-ms-flex-pack:justify;justify-content:space-between}[layout-align-gt-md$=start]{-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}[layout-align-gt-md$=center]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%}[layout-align-gt-md$=center]>*{max-width:100%}[layout-align-gt-md$=end]{-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end;-ms-flex-line-pack:end;align-content:flex-end}[layout-align-gt-md=center],[layout-align-gt-md=end],[layout-align-gt-md=space-around],[layout-align-gt-md=space-between],[layout-align-gt-md=start]{-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;-ms-flex-line-pack:stretch;align-content:stretch}[flex-gt-md]{-ms-flex:1;flex:1}[flex-gt-md-start]{margin-bottom:auto}[flex-gt-md-end]{margin-top:auto}[flex-gt-md-none]{-ms-flex:0 0 auto;flex:0 0 auto}[flex-gt-md-initial]{-ms-flex:0 1 auto;flex:0 1 auto}[flex-gt-md-noshrink]{-ms-flex:1 0 auto;flex:1 0 auto}[flex-gt-md-auto]{-ms-flex:1 1 auto;flex:1 1 auto}[flex-gt-md-grow]{-ms-flex:1 1 100%;flex:1 1 100%}[flex-gt-md],[layout-gt-md=row]>[flex-gt-md],[layout=row]>[flex-gt-md]{max-height:100%}[layout-gt-md=column]>[flex-gt-md],[layout=column]>[flex-gt-md]{max-width:100%}[layout-gt-md=row]>[flex-gt-md=\"5\"],[layout-gt-md=row]>[flex=\"5\"],[layout=row]>[flex-gt-md=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-gt-md=column]>[flex-gt-md=\"5\"],[layout-gt-md=column]>[flex=\"5\"],[layout=column]>[flex-gt-md=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[layout-gt-md=row]>[flex-gt-md=\"10\"],[layout-gt-md=row]>[flex=\"10\"],[layout=row]>[flex-gt-md=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-gt-md=column]>[flex-gt-md=\"10\"],[layout-gt-md=column]>[flex=\"10\"],[layout=column]>[flex-gt-md=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[layout-gt-md=row]>[flex-gt-md=\"15\"],[layout-gt-md=row]>[flex=\"15\"],[layout=row]>[flex-gt-md=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-gt-md=column]>[flex-gt-md=\"15\"],[layout-gt-md=column]>[flex=\"15\"],[layout=column]>[flex-gt-md=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[layout-gt-md=row]>[flex-gt-md=\"20\"],[layout-gt-md=row]>[flex=\"20\"],[layout=row]>[flex-gt-md=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-gt-md=column]>[flex-gt-md=\"20\"],[layout-gt-md=column]>[flex=\"20\"],[layout=column]>[flex-gt-md=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[layout-gt-md=row]>[flex-gt-md=\"25\"],[layout-gt-md=row]>[flex=\"25\"],[layout=row]>[flex-gt-md=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-gt-md=column]>[flex-gt-md=\"25\"],[layout-gt-md=column]>[flex=\"25\"],[layout=column]>[flex-gt-md=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[layout-gt-md=row]>[flex-gt-md=\"30\"],[layout-gt-md=row]>[flex=\"30\"],[layout=row]>[flex-gt-md=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-gt-md=column]>[flex-gt-md=\"30\"],[layout-gt-md=column]>[flex=\"30\"],[layout=column]>[flex-gt-md=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[layout-gt-md=row]>[flex-gt-md=\"35\"],[layout-gt-md=row]>[flex=\"35\"],[layout=row]>[flex-gt-md=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-gt-md=column]>[flex-gt-md=\"35\"],[layout-gt-md=column]>[flex=\"35\"],[layout=column]>[flex-gt-md=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[layout-gt-md=row]>[flex-gt-md=\"40\"],[layout-gt-md=row]>[flex=\"40\"],[layout=row]>[flex-gt-md=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-gt-md=column]>[flex-gt-md=\"40\"],[layout-gt-md=column]>[flex=\"40\"],[layout=column]>[flex-gt-md=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[layout-gt-md=row]>[flex-gt-md=\"45\"],[layout-gt-md=row]>[flex=\"45\"],[layout=row]>[flex-gt-md=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-gt-md=column]>[flex-gt-md=\"45\"],[layout-gt-md=column]>[flex=\"45\"],[layout=column]>[flex-gt-md=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[layout-gt-md=row]>[flex-gt-md=\"50\"],[layout-gt-md=row]>[flex=\"50\"],[layout=row]>[flex-gt-md=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-gt-md=column]>[flex-gt-md=\"50\"],[layout-gt-md=column]>[flex=\"50\"],[layout=column]>[flex-gt-md=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[layout-gt-md=row]>[flex-gt-md=\"55\"],[layout-gt-md=row]>[flex=\"55\"],[layout=row]>[flex-gt-md=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-gt-md=column]>[flex-gt-md=\"55\"],[layout-gt-md=column]>[flex=\"55\"],[layout=column]>[flex-gt-md=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[layout-gt-md=row]>[flex-gt-md=\"60\"],[layout-gt-md=row]>[flex=\"60\"],[layout=row]>[flex-gt-md=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-gt-md=column]>[flex-gt-md=\"60\"],[layout-gt-md=column]>[flex=\"60\"],[layout=column]>[flex-gt-md=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[layout-gt-md=row]>[flex-gt-md=\"65\"],[layout-gt-md=row]>[flex=\"65\"],[layout=row]>[flex-gt-md=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-gt-md=column]>[flex-gt-md=\"65\"],[layout-gt-md=column]>[flex=\"65\"],[layout=column]>[flex-gt-md=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[layout-gt-md=row]>[flex-gt-md=\"70\"],[layout-gt-md=row]>[flex=\"70\"],[layout=row]>[flex-gt-md=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-gt-md=column]>[flex-gt-md=\"70\"],[layout-gt-md=column]>[flex=\"70\"],[layout=column]>[flex-gt-md=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[layout-gt-md=row]>[flex-gt-md=\"75\"],[layout-gt-md=row]>[flex=\"75\"],[layout=row]>[flex-gt-md=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-gt-md=column]>[flex-gt-md=\"75\"],[layout-gt-md=column]>[flex=\"75\"],[layout=column]>[flex-gt-md=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[layout-gt-md=row]>[flex-gt-md=\"80\"],[layout-gt-md=row]>[flex=\"80\"],[layout=row]>[flex-gt-md=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-gt-md=column]>[flex-gt-md=\"80\"],[layout-gt-md=column]>[flex=\"80\"],[layout=column]>[flex-gt-md=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[layout-gt-md=row]>[flex-gt-md=\"85\"],[layout-gt-md=row]>[flex=\"85\"],[layout=row]>[flex-gt-md=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-gt-md=column]>[flex-gt-md=\"85\"],[layout-gt-md=column]>[flex=\"85\"],[layout=column]>[flex-gt-md=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[layout-gt-md=row]>[flex-gt-md=\"90\"],[layout-gt-md=row]>[flex=\"90\"],[layout=row]>[flex-gt-md=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-gt-md=column]>[flex-gt-md=\"90\"],[layout-gt-md=column]>[flex=\"90\"],[layout=column]>[flex-gt-md=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[layout-gt-md=row]>[flex-gt-md=\"95\"],[layout-gt-md=row]>[flex=\"95\"],[layout=row]>[flex-gt-md=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-gt-md=column]>[flex-gt-md=\"95\"],[layout-gt-md=column]>[flex=\"95\"],[layout=column]>[flex-gt-md=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[layout-gt-md=row]>[flex-gt-md=\"100\"],[layout-gt-md=row]>[flex=\"100\"],[layout=row]>[flex-gt-md=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-gt-md=column]>[flex-gt-md=\"100\"],[layout-gt-md=column]>[flex=\"100\"],[layout=column]>[flex-gt-md=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-gt-md=row]>[flex-gt-md=\"33\"],[layout-gt-md=row]>[flex=\"33\"],[layout=row]>[flex-gt-md=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-gt-md=column]>[flex-gt-md=\"33\"],[layout-gt-md=column]>[flex=\"33\"],[layout=column]>[flex-gt-md=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-gt-md=row]>[flex-gt-md=\"66\"],[layout-gt-md=row]>[flex=\"66\"],[layout=row]>[flex-gt-md=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-gt-md=column]>[flex-gt-md=\"66\"],[layout-gt-md=column]>[flex=\"66\"],[layout=column]>[flex-gt-md=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[hide-gt-md]{display:none}}@media (min-width:960px) and (max-width:1199px){[flex-offset-lg=\"0\"]{margin-left:0}[flex-offset-lg=\"5\"]{margin-left:5%}[flex-offset-lg=\"10\"]{margin-left:10%}[flex-offset-lg=\"15\"]{margin-left:15%}[flex-offset-lg=\"20\"]{margin-left:20%}[flex-offset-lg=\"25\"]{margin-left:25%}[flex-offset-lg=\"30\"]{margin-left:30%}[flex-offset-lg=\"35\"]{margin-left:35%}[flex-offset-lg=\"40\"]{margin-left:40%}[flex-offset-lg=\"45\"]{margin-left:45%}[flex-offset-lg=\"50\"]{margin-left:50%}[flex-offset-lg=\"55\"]{margin-left:55%}[flex-offset-lg=\"60\"]{margin-left:60%}[flex-offset-lg=\"65\"]{margin-left:65%}[flex-offset-lg=\"70\"]{margin-left:70%}[flex-offset-lg=\"75\"]{margin-left:75%}[flex-offset-lg=\"80\"]{margin-left:80%}[flex-offset-lg=\"85\"]{margin-left:85%}[flex-offset-lg=\"90\"]{margin-left:90%}[flex-offset-lg=\"95\"]{margin-left:95%}[flex-offset-lg=\"33\"]{margin-left:33.33333%}[flex-offset-lg=\"66\"]{margin-left:66.66667%}[flex-order-lg=\"0\"]{-ms-flex-order:0;order:0}[flex-order-lg=\"1\"]{-ms-flex-order:1;order:1}[flex-order-lg=\"2\"]{-ms-flex-order:2;order:2}[flex-order-lg=\"3\"]{-ms-flex-order:3;order:3}[flex-order-lg=\"4\"]{-ms-flex-order:4;order:4}[flex-order-lg=\"5\"]{-ms-flex-order:5;order:5}[flex-order-lg=\"6\"]{-ms-flex-order:6;order:6}[flex-order-lg=\"7\"]{-ms-flex-order:7;order:7}[flex-order-lg=\"8\"]{-ms-flex-order:8;order:8}[flex-order-lg=\"9\"]{-ms-flex-order:9;order:9}[flex-order-lg=\"10\"]{-ms-flex-order:10;order:10}[flex-order-lg=\"11\"]{-ms-flex-order:11;order:11}[flex-order-lg=\"12\"]{-ms-flex-order:12;order:12}[flex-order-lg=\"13\"]{-ms-flex-order:13;order:13}[flex-order-lg=\"14\"]{-ms-flex-order:14;order:14}[flex-order-lg=\"15\"]{-ms-flex-order:15;order:15}[flex-order-lg=\"16\"]{-ms-flex-order:16;order:16}[flex-order-lg=\"17\"]{-ms-flex-order:17;order:17}[flex-order-lg=\"18\"]{-ms-flex-order:18;order:18}[flex-order-lg=\"19\"]{-ms-flex-order:19;order:19}[flex-order-lg=\"20\"]{-ms-flex-order:20;order:20}[layout-lg]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}[layout-lg]>*{box-sizing:border-box}[layout-lg=column]{-ms-flex-direction:column;flex-direction:column}[layout-lg=row]{-ms-flex-direction:row;flex-direction:row}[layout-align-lg]{-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[layout-align-lg^=start]{-ms-flex-pack:start;justify-content:flex-start}[layout-align-lg^=center]{-ms-flex-pack:center;justify-content:center}[layout-align-lg^=end]{-ms-flex-pack:end;justify-content:flex-end}[layout-align-lg^=space-around]{-ms-flex-pack:distribute;justify-content:space-around}[layout-align-lg^=space-between]{-ms-flex-pack:justify;justify-content:space-between}[layout-align-lg$=start]{-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}[layout-align-lg$=center]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%}[layout-align-lg$=center]>*{max-width:100%}[layout-align-lg$=end]{-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end;-ms-flex-line-pack:end;align-content:flex-end}[layout-align-lg=center],[layout-align-lg=end],[layout-align-lg=space-around],[layout-align-lg=space-between],[layout-align-lg=start]{-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;-ms-flex-line-pack:stretch;align-content:stretch}[flex-lg]{-ms-flex:1;flex:1}[flex-lg-start]{margin-bottom:auto}[flex-lg-end]{margin-top:auto}[flex-lg-none]{-ms-flex:0 0 auto;flex:0 0 auto}[flex-lg-initial]{-ms-flex:0 1 auto;flex:0 1 auto}[flex-lg-noshrink]{-ms-flex:1 0 auto;flex:1 0 auto}[flex-lg-auto]{-ms-flex:1 1 auto;flex:1 1 auto}[flex-lg-grow]{-ms-flex:1 1 100%;flex:1 1 100%}[flex-lg],[layout-lg=row]>[flex-lg],[layout=row]>[flex-lg]{max-height:100%}[layout-lg=column]>[flex-lg],[layout=column]>[flex-lg]{max-width:100%}[layout-lg=row]>[flex-lg=\"5\"],[layout-lg=row]>[flex=\"5\"],[layout=row]>[flex-lg=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-lg=column]>[flex-lg=\"5\"],[layout-lg=column]>[flex=\"5\"],[layout=column]>[flex-lg=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[layout-lg=row]>[flex-lg=\"10\"],[layout-lg=row]>[flex=\"10\"],[layout=row]>[flex-lg=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-lg=column]>[flex-lg=\"10\"],[layout-lg=column]>[flex=\"10\"],[layout=column]>[flex-lg=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[layout-lg=row]>[flex-lg=\"15\"],[layout-lg=row]>[flex=\"15\"],[layout=row]>[flex-lg=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-lg=column]>[flex-lg=\"15\"],[layout-lg=column]>[flex=\"15\"],[layout=column]>[flex-lg=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[layout-lg=row]>[flex-lg=\"20\"],[layout-lg=row]>[flex=\"20\"],[layout=row]>[flex-lg=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-lg=column]>[flex-lg=\"20\"],[layout-lg=column]>[flex=\"20\"],[layout=column]>[flex-lg=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[layout-lg=row]>[flex-lg=\"25\"],[layout-lg=row]>[flex=\"25\"],[layout=row]>[flex-lg=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-lg=column]>[flex-lg=\"25\"],[layout-lg=column]>[flex=\"25\"],[layout=column]>[flex-lg=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[layout-lg=row]>[flex-lg=\"30\"],[layout-lg=row]>[flex=\"30\"],[layout=row]>[flex-lg=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-lg=column]>[flex-lg=\"30\"],[layout-lg=column]>[flex=\"30\"],[layout=column]>[flex-lg=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[layout-lg=row]>[flex-lg=\"35\"],[layout-lg=row]>[flex=\"35\"],[layout=row]>[flex-lg=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-lg=column]>[flex-lg=\"35\"],[layout-lg=column]>[flex=\"35\"],[layout=column]>[flex-lg=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[layout-lg=row]>[flex-lg=\"40\"],[layout-lg=row]>[flex=\"40\"],[layout=row]>[flex-lg=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-lg=column]>[flex-lg=\"40\"],[layout-lg=column]>[flex=\"40\"],[layout=column]>[flex-lg=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[layout-lg=row]>[flex-lg=\"45\"],[layout-lg=row]>[flex=\"45\"],[layout=row]>[flex-lg=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-lg=column]>[flex-lg=\"45\"],[layout-lg=column]>[flex=\"45\"],[layout=column]>[flex-lg=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[layout-lg=row]>[flex-lg=\"50\"],[layout-lg=row]>[flex=\"50\"],[layout=row]>[flex-lg=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-lg=column]>[flex-lg=\"50\"],[layout-lg=column]>[flex=\"50\"],[layout=column]>[flex-lg=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[layout-lg=row]>[flex-lg=\"55\"],[layout-lg=row]>[flex=\"55\"],[layout=row]>[flex-lg=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-lg=column]>[flex-lg=\"55\"],[layout-lg=column]>[flex=\"55\"],[layout=column]>[flex-lg=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[layout-lg=row]>[flex-lg=\"60\"],[layout-lg=row]>[flex=\"60\"],[layout=row]>[flex-lg=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-lg=column]>[flex-lg=\"60\"],[layout-lg=column]>[flex=\"60\"],[layout=column]>[flex-lg=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[layout-lg=row]>[flex-lg=\"65\"],[layout-lg=row]>[flex=\"65\"],[layout=row]>[flex-lg=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-lg=column]>[flex-lg=\"65\"],[layout-lg=column]>[flex=\"65\"],[layout=column]>[flex-lg=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[layout-lg=row]>[flex-lg=\"70\"],[layout-lg=row]>[flex=\"70\"],[layout=row]>[flex-lg=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-lg=column]>[flex-lg=\"70\"],[layout-lg=column]>[flex=\"70\"],[layout=column]>[flex-lg=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[layout-lg=row]>[flex-lg=\"75\"],[layout-lg=row]>[flex=\"75\"],[layout=row]>[flex-lg=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-lg=column]>[flex-lg=\"75\"],[layout-lg=column]>[flex=\"75\"],[layout=column]>[flex-lg=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[layout-lg=row]>[flex-lg=\"80\"],[layout-lg=row]>[flex=\"80\"],[layout=row]>[flex-lg=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-lg=column]>[flex-lg=\"80\"],[layout-lg=column]>[flex=\"80\"],[layout=column]>[flex-lg=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[layout-lg=row]>[flex-lg=\"85\"],[layout-lg=row]>[flex=\"85\"],[layout=row]>[flex-lg=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-lg=column]>[flex-lg=\"85\"],[layout-lg=column]>[flex=\"85\"],[layout=column]>[flex-lg=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[layout-lg=row]>[flex-lg=\"90\"],[layout-lg=row]>[flex=\"90\"],[layout=row]>[flex-lg=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-lg=column]>[flex-lg=\"90\"],[layout-lg=column]>[flex=\"90\"],[layout=column]>[flex-lg=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[layout-lg=row]>[flex-lg=\"95\"],[layout-lg=row]>[flex=\"95\"],[layout=row]>[flex-lg=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-lg=column]>[flex-lg=\"95\"],[layout-lg=column]>[flex=\"95\"],[layout=column]>[flex-lg=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[layout-lg=row]>[flex-lg=\"100\"],[layout-lg=row]>[flex=\"100\"],[layout=row]>[flex-lg=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-lg=column]>[flex-lg=\"100\"],[layout-lg=column]>[flex=\"100\"],[layout=column]>[flex-lg=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-lg=row]>[flex-lg=\"33\"],[layout-lg=row]>[flex=\"33\"],[layout=row]>[flex-lg=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-lg=column]>[flex-lg=\"33\"],[layout-lg=column]>[flex=\"33\"],[layout=column]>[flex-lg=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-lg=row]>[flex-lg=\"66\"],[layout-lg=row]>[flex=\"66\"],[layout=row]>[flex-lg=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-lg=column]>[flex-lg=\"66\"],[layout-lg=column]>[flex=\"66\"],[layout=column]>[flex-lg=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[hide-lg]{display:none}}@media (min-width:1200px){[flex-offset-gt-lg=\"0\"]{margin-left:0}[flex-offset-gt-lg=\"5\"]{margin-left:5%}[flex-offset-gt-lg=\"10\"]{margin-left:10%}[flex-offset-gt-lg=\"15\"]{margin-left:15%}[flex-offset-gt-lg=\"20\"]{margin-left:20%}[flex-offset-gt-lg=\"25\"]{margin-left:25%}[flex-offset-gt-lg=\"30\"]{margin-left:30%}[flex-offset-gt-lg=\"35\"]{margin-left:35%}[flex-offset-gt-lg=\"40\"]{margin-left:40%}[flex-offset-gt-lg=\"45\"]{margin-left:45%}[flex-offset-gt-lg=\"50\"]{margin-left:50%}[flex-offset-gt-lg=\"55\"]{margin-left:55%}[flex-offset-gt-lg=\"60\"]{margin-left:60%}[flex-offset-gt-lg=\"65\"]{margin-left:65%}[flex-offset-gt-lg=\"70\"]{margin-left:70%}[flex-offset-gt-lg=\"75\"]{margin-left:75%}[flex-offset-gt-lg=\"80\"]{margin-left:80%}[flex-offset-gt-lg=\"85\"]{margin-left:85%}[flex-offset-gt-lg=\"90\"]{margin-left:90%}[flex-offset-gt-lg=\"95\"]{margin-left:95%}[flex-offset-gt-lg=\"33\"]{margin-left:33.33333%}[flex-offset-gt-lg=\"66\"]{margin-left:66.66667%}[flex-order-gt-lg=\"0\"]{-ms-flex-order:0;order:0}[flex-order-gt-lg=\"1\"]{-ms-flex-order:1;order:1}[flex-order-gt-lg=\"2\"]{-ms-flex-order:2;order:2}[flex-order-gt-lg=\"3\"]{-ms-flex-order:3;order:3}[flex-order-gt-lg=\"4\"]{-ms-flex-order:4;order:4}[flex-order-gt-lg=\"5\"]{-ms-flex-order:5;order:5}[flex-order-gt-lg=\"6\"]{-ms-flex-order:6;order:6}[flex-order-gt-lg=\"7\"]{-ms-flex-order:7;order:7}[flex-order-gt-lg=\"8\"]{-ms-flex-order:8;order:8}[flex-order-gt-lg=\"9\"]{-ms-flex-order:9;order:9}[flex-order-gt-lg=\"10\"]{-ms-flex-order:10;order:10}[flex-order-gt-lg=\"11\"]{-ms-flex-order:11;order:11}[flex-order-gt-lg=\"12\"]{-ms-flex-order:12;order:12}[flex-order-gt-lg=\"13\"]{-ms-flex-order:13;order:13}[flex-order-gt-lg=\"14\"]{-ms-flex-order:14;order:14}[flex-order-gt-lg=\"15\"]{-ms-flex-order:15;order:15}[flex-order-gt-lg=\"16\"]{-ms-flex-order:16;order:16}[flex-order-gt-lg=\"17\"]{-ms-flex-order:17;order:17}[flex-order-gt-lg=\"18\"]{-ms-flex-order:18;order:18}[flex-order-gt-lg=\"19\"]{-ms-flex-order:19;order:19}[flex-order-gt-lg=\"20\"]{-ms-flex-order:20;order:20}[layout-gt-lg]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}[layout-gt-lg]>*{box-sizing:border-box}[layout-gt-lg=column]{-ms-flex-direction:column;flex-direction:column}[layout-gt-lg=row]{-ms-flex-direction:row;flex-direction:row}[layout-align-gt-lg]{-ms-flex-pack:start;justify-content:flex-start;-ms-flex-line-pack:stretch;align-content:stretch;-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch}[layout-align-gt-lg^=start]{-ms-flex-pack:start;justify-content:flex-start}[layout-align-gt-lg^=center]{-ms-flex-pack:center;justify-content:center}[layout-align-gt-lg^=end]{-ms-flex-pack:end;justify-content:flex-end}[layout-align-gt-lg^=space-around]{-ms-flex-pack:distribute;justify-content:space-around}[layout-align-gt-lg^=space-between]{-ms-flex-pack:justify;justify-content:space-between}[layout-align-gt-lg$=start]{-ms-flex-align:start;-ms-grid-row-align:flex-start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}[layout-align-gt-lg$=center]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-line-pack:center;align-content:center;max-width:100%}[layout-align-gt-lg$=center]>*{max-width:100%}[layout-align-gt-lg$=end]{-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end;-ms-flex-line-pack:end;align-content:flex-end}[layout-align-gt-lg=center],[layout-align-gt-lg=end],[layout-align-gt-lg=space-around],[layout-align-gt-lg=space-between],[layout-align-gt-lg=start]{-ms-flex-align:stretch;-ms-grid-row-align:stretch;align-items:stretch;-ms-flex-line-pack:stretch;align-content:stretch}[flex-gt-lg]{-ms-flex:1;flex:1}[flex-gt-lg-start]{margin-bottom:auto}[flex-gt-lg-end]{margin-top:auto}[flex-gt-lg-none]{-ms-flex:0 0 auto;flex:0 0 auto}[flex-gt-lg-initial]{-ms-flex:0 1 auto;flex:0 1 auto}[flex-gt-lg-noshrink]{-ms-flex:1 0 auto;flex:1 0 auto}[flex-gt-lg-auto]{-ms-flex:1 1 auto;flex:1 1 auto}[flex-gt-lg-grow]{-ms-flex:1 1 100%;flex:1 1 100%}[flex-gt-lg],[layout-gt-lg=row]>[flex-gt-lg],[layout=row]>[flex-gt-lg]{max-height:100%}[layout-gt-lg=column]>[flex-gt-lg],[layout=column]>[flex-gt-lg]{max-width:100%}[layout-gt-lg=row]>[flex-gt-lg=\"5\"],[layout-gt-lg=row]>[flex=\"5\"],[layout=row]>[flex-gt-lg=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-width:5%}[layout-gt-lg=column]>[flex-gt-lg=\"5\"],[layout-gt-lg=column]>[flex=\"5\"],[layout=column]>[flex-gt-lg=\"5\"]{-ms-flex:1 1 5%;flex:1 1 5%;max-height:5%}[layout-gt-lg=row]>[flex-gt-lg=\"10\"],[layout-gt-lg=row]>[flex=\"10\"],[layout=row]>[flex-gt-lg=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-width:10%}[layout-gt-lg=column]>[flex-gt-lg=\"10\"],[layout-gt-lg=column]>[flex=\"10\"],[layout=column]>[flex-gt-lg=\"10\"]{-ms-flex:1 1 10%;flex:1 1 10%;max-height:10%}[layout-gt-lg=row]>[flex-gt-lg=\"15\"],[layout-gt-lg=row]>[flex=\"15\"],[layout=row]>[flex-gt-lg=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-width:15%}[layout-gt-lg=column]>[flex-gt-lg=\"15\"],[layout-gt-lg=column]>[flex=\"15\"],[layout=column]>[flex-gt-lg=\"15\"]{-ms-flex:1 1 15%;flex:1 1 15%;max-height:15%}[layout-gt-lg=row]>[flex-gt-lg=\"20\"],[layout-gt-lg=row]>[flex=\"20\"],[layout=row]>[flex-gt-lg=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-width:20%}[layout-gt-lg=column]>[flex-gt-lg=\"20\"],[layout-gt-lg=column]>[flex=\"20\"],[layout=column]>[flex-gt-lg=\"20\"]{-ms-flex:1 1 20%;flex:1 1 20%;max-height:20%}[layout-gt-lg=row]>[flex-gt-lg=\"25\"],[layout-gt-lg=row]>[flex=\"25\"],[layout=row]>[flex-gt-lg=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-width:25%}[layout-gt-lg=column]>[flex-gt-lg=\"25\"],[layout-gt-lg=column]>[flex=\"25\"],[layout=column]>[flex-gt-lg=\"25\"]{-ms-flex:1 1 25%;flex:1 1 25%;max-height:25%}[layout-gt-lg=row]>[flex-gt-lg=\"30\"],[layout-gt-lg=row]>[flex=\"30\"],[layout=row]>[flex-gt-lg=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-width:30%}[layout-gt-lg=column]>[flex-gt-lg=\"30\"],[layout-gt-lg=column]>[flex=\"30\"],[layout=column]>[flex-gt-lg=\"30\"]{-ms-flex:1 1 30%;flex:1 1 30%;max-height:30%}[layout-gt-lg=row]>[flex-gt-lg=\"35\"],[layout-gt-lg=row]>[flex=\"35\"],[layout=row]>[flex-gt-lg=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-width:35%}[layout-gt-lg=column]>[flex-gt-lg=\"35\"],[layout-gt-lg=column]>[flex=\"35\"],[layout=column]>[flex-gt-lg=\"35\"]{-ms-flex:1 1 35%;flex:1 1 35%;max-height:35%}[layout-gt-lg=row]>[flex-gt-lg=\"40\"],[layout-gt-lg=row]>[flex=\"40\"],[layout=row]>[flex-gt-lg=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-width:40%}[layout-gt-lg=column]>[flex-gt-lg=\"40\"],[layout-gt-lg=column]>[flex=\"40\"],[layout=column]>[flex-gt-lg=\"40\"]{-ms-flex:1 1 40%;flex:1 1 40%;max-height:40%}[layout-gt-lg=row]>[flex-gt-lg=\"45\"],[layout-gt-lg=row]>[flex=\"45\"],[layout=row]>[flex-gt-lg=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-width:45%}[layout-gt-lg=column]>[flex-gt-lg=\"45\"],[layout-gt-lg=column]>[flex=\"45\"],[layout=column]>[flex-gt-lg=\"45\"]{-ms-flex:1 1 45%;flex:1 1 45%;max-height:45%}[layout-gt-lg=row]>[flex-gt-lg=\"50\"],[layout-gt-lg=row]>[flex=\"50\"],[layout=row]>[flex-gt-lg=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-width:50%}[layout-gt-lg=column]>[flex-gt-lg=\"50\"],[layout-gt-lg=column]>[flex=\"50\"],[layout=column]>[flex-gt-lg=\"50\"]{-ms-flex:1 1 50%;flex:1 1 50%;max-height:50%}[layout-gt-lg=row]>[flex-gt-lg=\"55\"],[layout-gt-lg=row]>[flex=\"55\"],[layout=row]>[flex-gt-lg=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-width:55%}[layout-gt-lg=column]>[flex-gt-lg=\"55\"],[layout-gt-lg=column]>[flex=\"55\"],[layout=column]>[flex-gt-lg=\"55\"]{-ms-flex:1 1 55%;flex:1 1 55%;max-height:55%}[layout-gt-lg=row]>[flex-gt-lg=\"60\"],[layout-gt-lg=row]>[flex=\"60\"],[layout=row]>[flex-gt-lg=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-width:60%}[layout-gt-lg=column]>[flex-gt-lg=\"60\"],[layout-gt-lg=column]>[flex=\"60\"],[layout=column]>[flex-gt-lg=\"60\"]{-ms-flex:1 1 60%;flex:1 1 60%;max-height:60%}[layout-gt-lg=row]>[flex-gt-lg=\"65\"],[layout-gt-lg=row]>[flex=\"65\"],[layout=row]>[flex-gt-lg=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-width:65%}[layout-gt-lg=column]>[flex-gt-lg=\"65\"],[layout-gt-lg=column]>[flex=\"65\"],[layout=column]>[flex-gt-lg=\"65\"]{-ms-flex:1 1 65%;flex:1 1 65%;max-height:65%}[layout-gt-lg=row]>[flex-gt-lg=\"70\"],[layout-gt-lg=row]>[flex=\"70\"],[layout=row]>[flex-gt-lg=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-width:70%}[layout-gt-lg=column]>[flex-gt-lg=\"70\"],[layout-gt-lg=column]>[flex=\"70\"],[layout=column]>[flex-gt-lg=\"70\"]{-ms-flex:1 1 70%;flex:1 1 70%;max-height:70%}[layout-gt-lg=row]>[flex-gt-lg=\"75\"],[layout-gt-lg=row]>[flex=\"75\"],[layout=row]>[flex-gt-lg=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-width:75%}[layout-gt-lg=column]>[flex-gt-lg=\"75\"],[layout-gt-lg=column]>[flex=\"75\"],[layout=column]>[flex-gt-lg=\"75\"]{-ms-flex:1 1 75%;flex:1 1 75%;max-height:75%}[layout-gt-lg=row]>[flex-gt-lg=\"80\"],[layout-gt-lg=row]>[flex=\"80\"],[layout=row]>[flex-gt-lg=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-width:80%}[layout-gt-lg=column]>[flex-gt-lg=\"80\"],[layout-gt-lg=column]>[flex=\"80\"],[layout=column]>[flex-gt-lg=\"80\"]{-ms-flex:1 1 80%;flex:1 1 80%;max-height:80%}[layout-gt-lg=row]>[flex-gt-lg=\"85\"],[layout-gt-lg=row]>[flex=\"85\"],[layout=row]>[flex-gt-lg=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-width:85%}[layout-gt-lg=column]>[flex-gt-lg=\"85\"],[layout-gt-lg=column]>[flex=\"85\"],[layout=column]>[flex-gt-lg=\"85\"]{-ms-flex:1 1 85%;flex:1 1 85%;max-height:85%}[layout-gt-lg=row]>[flex-gt-lg=\"90\"],[layout-gt-lg=row]>[flex=\"90\"],[layout=row]>[flex-gt-lg=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-width:90%}[layout-gt-lg=column]>[flex-gt-lg=\"90\"],[layout-gt-lg=column]>[flex=\"90\"],[layout=column]>[flex-gt-lg=\"90\"]{-ms-flex:1 1 90%;flex:1 1 90%;max-height:90%}[layout-gt-lg=row]>[flex-gt-lg=\"95\"],[layout-gt-lg=row]>[flex=\"95\"],[layout=row]>[flex-gt-lg=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-width:95%}[layout-gt-lg=column]>[flex-gt-lg=\"95\"],[layout-gt-lg=column]>[flex=\"95\"],[layout=column]>[flex-gt-lg=\"95\"]{-ms-flex:1 1 95%;flex:1 1 95%;max-height:95%}[layout-gt-lg=row]>[flex-gt-lg=\"100\"],[layout-gt-lg=row]>[flex=\"100\"],[layout=row]>[flex-gt-lg=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%}[layout-gt-lg=column]>[flex-gt-lg=\"100\"],[layout-gt-lg=column]>[flex=\"100\"],[layout=column]>[flex-gt-lg=\"100\"]{-ms-flex:1 1 100%;flex:1 1 100%;max-height:100%}[layout-gt-lg=row]>[flex-gt-lg=\"33\"],[layout-gt-lg=row]>[flex=\"33\"],[layout=row]>[flex-gt-lg=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-width:33.33%}[layout-gt-lg=column]>[flex-gt-lg=\"33\"],[layout-gt-lg=column]>[flex=\"33\"],[layout=column]>[flex-gt-lg=\"33\"]{-ms-flex:1 1 33.33%;flex:1 1 33.33%;max-height:33.33%}[layout-gt-lg=row]>[flex-gt-lg=\"66\"],[layout-gt-lg=row]>[flex=\"66\"],[layout=row]>[flex-gt-lg=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-width:66.66%}[layout-gt-lg=column]>[flex-gt-lg=\"66\"],[layout-gt-lg=column]>[flex=\"66\"],[layout=column]>[flex-gt-lg=\"66\"]{-ms-flex:1 1 66.66%;flex:1 1 66.66%;max-height:66.66%}[hide-gt-lg]{display:none}}[layout-padding]>[flex-sm]{padding:.25em}[layout-padding],[layout-padding]>[flex-gt-sm],[layout-padding]>[flex-md],[layout-padding]>[flex]{padding:.5em}[layout-padding]>[flex-gt-md],[layout-padding]>[flex-lg]{padding:1em}[layout-margin]>[flex-sm]{margin:.25em}[layout-margin],[layout-margin]>[flex-gt-sm],[layout-margin]>[flex-md],[layout-margin]>[flex]{margin:.5em}[layout-margin]>[flex-gt-md],[layout-margin]>[flex-lg]{margin:1em}[layout-nowrap]{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.button.outline{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto;margin-top:1em;border-radius:.1em;font-size:1em;cursor:pointer;line-height:1;text-transform:uppercase;transition:all .5s ease;font-family:Merriweather Sans,verdana;background-color:transparent;color:#f4f1f2;border:1px solid #f4f1f2}.button.outline:hover{background-color:#f4f1f2;color:#f04}.button.reverse{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto;margin-top:1em;border-radius:.1em;font-size:1em;cursor:pointer;line-height:1;text-transform:uppercase;transition:all .5s ease;font-family:Merriweather Sans,verdana;background-color:transparent;color:#f04;border:1px solid #f04}.button.reverse:hover{color:#f4f1f2;background-color:#f04}.stripe.fluid{padding:0}.stripe.fluid>*{width:100%}.stripe.medium{padding:2em 0;width:100%;padding-top:4em;padding-bottom:4em}.stripe.medium>*{margin-left:auto;margin-right:auto}@media screen and (max-width:600px){.stripe.medium>*{padding-left:5%;padding-right:5%}}@media screen and (min-width:600px){.stripe.medium>*{width:493.33333333px}}@media screen and (min-width:960px){.stripe.medium>*{width:800px}}@media screen and (min-width:1200px){.stripe.medium>*{width:880px}}.stripe.small{padding:2em 0;width:100%;padding-top:4em;padding-bottom:4em}.stripe.small>*{margin-left:auto;margin-right:auto}@media screen and (max-width:600px){.stripe.small>*{padding-left:5%;padding-right:5%}}@media screen and (min-width:600px){.stripe.small>*{width:386.66666667px}}@media screen and (min-width:960px){.stripe.small>*{width:640px}}@media screen and (min-width:1200px){.stripe.small>*{width:560px}}::-webkit-scrollbar{width:.5em}::-webkit-scrollbar-thumb{background:rgba(56,46,49,.5)}::-webkit-scrollbar-track{background:rgba(244,241,242,.5)}code,pre{font-family:Cousine,monospace}code{color:#f04}body,html{scroll-behavior:smooth;background-color:#f4f1f2;min-width:320px;font-family:Merriweather Sans,verdana;font-weight:300;font-size:16px;line-height:1.5em;color:#382e31;margin:0;padding:0}app,body,html{height:100%;width:100%}table{margin:1em 0 2em;border-spacing:0;width:100%}table th,table thead{background:#e8e3e4}table th{font-family:Merriweather Sans,verdana,sans-serif;font-weight:400;text-align:left;vertical-align:top}table tr td,table tr th{vertical-align:top;padding:.75em .75em .25em .5em;border-bottom:1px solid #ddd5d7}h1,h2,h3,h4,h5,h6{margin:0;margin:1em 0;line-height:1.25em;text-transform:none;font-family:Merriweather Sans,sans-serif;font-weight:400}h1,h2,h3,h4{position:relative}h1 a,h2 a,h3 a,h4 a{position:absolute;left:-1em;width:calc(100% + 1em);opacity:0;transition:all .33s ease}h1:hover a,h2:hover a,h3:hover a,h4:hover a{opacity:1}h1{font-size:2.5em;margin:0;padding-top:1.5em;text-transform:uppercase}h2{font-size:1.5em;color:#f04}h3,h3 a{font-size:1.15em;color:#f04}h4{font-size:1rem;color:#f04}hr{border:none;width:100%;height:.1rem;background-color:#baabaf}hr,p{margin:1em 0}p{padding:0;line-height:1.5em;word-wrap:break-word}p:first-child{margin-top:0}p:last-child{margin-bottom:0}a{position:relative;transition:all .5s ease;text-decoration:none;cursor:pointer;outline:0}a,a:hover{color:#f04}a img{border:none;outline:none}a p,a span{cursor:pointer}img{max-width:100%;height:auto}ul{list-style:square}ol,ul{padding:0 0 0 1em;margin-bottom:0}ol{list-style-type:decimal}ol ol{list-style-type:lower-alpha}b,strong{font-weight:700;font-family:Merriweather Sans,verdana,sans-serif}fieldset{margin:0;padding:0;border:0}input[type=submit]{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto;margin-top:1em;border-radius:.1em;font-size:1em;cursor:pointer;line-height:1;text-transform:uppercase;transition:all .5s ease;font-family:Merriweather Sans,verdana;background-color:transparent;color:#f04;border:1px solid #f04;margin:0}input[type=submit]:hover{color:#f4f1f2;background-color:#f04}*{box-sizing:border-box}.logo img{border:1px solid #f4f1f2;border-radius:2px}.logo a{color:#f4f1f2;padding-left:.5em}menu{position:fixed;margin:0;margin-left:10em;padding:0;background:rgba(56,46,49,.5);z-index:200;transition:all .33s ease;overflow-y:auto;max-height:100%}@media screen and (max-width:600px){menu{display:none}}menu b{color:#f04}menu a{font-size:.8em;color:#f4f1f2;display:block;padding:.25em .5em}menu a:hover{color:#f04;background:#f4f1f2}menu input{width:100%;padding:.25em .5em}header{background:#f04;color:#f4f1f2;padding:2em 0}@media screen and (max-width:600px){header{padding:2em 0;width:100%;padding-top:4em;padding-bottom:4em;text-align:center}header>*{margin-left:auto;margin-right:auto}}@media screen and (max-width:600px) and screen and (max-width:600px){header>*{padding-left:5%;padding-right:5%}}@media screen and (max-width:600px) and screen and (min-width:600px){header>*{width:493.33333333px}}@media screen and (max-width:600px) and screen and (min-width:960px){header>*{width:800px}}@media screen and (max-width:600px) and screen and (min-width:1200px){header>*{width:880px}}@media screen and (min-width:600px){header{position:fixed;width:10em;left:0;top:0;height:100%;box-shadow:inset -.125em 0 rgba(56,46,49,.5)}}header p{color:#382e31;background:#f4f1f2;box-shadow:inset -.125em 0 rgba(56,46,49,.5);padding:1em}header nav{padding-top:1em}header nav a{display:block;color:#f4f1f2;padding:1em;text-transform:uppercase}header nav a.active,header nav a:hover{background:#f4f1f2;color:#f04;box-shadow:inset -.125em 0 #f04}.top{transition:all 1s ease;opacity:0;border-radius:100%;position:fixed;background:rgba(56,46,49,.5);color:#f4f1f2;font-size:5em;left:calc(50% - .5em);bottom:-.5em;padding-top:.4em;height:1em;width:1em;z-index:200;text-align:center;vertical-align:bottom;box-shadow:0 0 .1em rgba(244,241,242,.5)}@media screen and (min-width:600px){.top{display:none}}.top.active{opacity:1}main{padding:2em 0;width:100%;background-color:#f4f1f2;color:#382e31;padding-top:4em;padding-bottom:4em}main>*{margin-left:auto;margin-right:auto}@media screen and (max-width:600px){main>*{padding-left:5%;padding-right:5%}}@media screen and (min-width:600px){main>*{width:440px}}@media screen and (min-width:960px){main>*{width:720px}}@media screen and (min-width:1200px){main>*{width:720px}}@media screen and (min-width:600px){main{width:calc(100% - 10em);margin-left:10em}}footer{padding:2em 0;width:100%;background-color:#382e31;padding-top:4em;padding-bottom:4em;color:#f4f1f2}footer>*{margin-left:auto;margin-right:auto}@media screen and (max-width:600px){footer>*{padding-left:5%;padding-right:5%}}@media screen and (min-width:600px){footer>*{width:440px}}@media screen and (min-width:960px){footer>*{width:720px}}@media screen and (min-width:1200px){footer>*{width:720px}}@media screen and (min-width:600px){footer{width:calc(100% - 10em);margin-left:10em}}article{padding:.5em}.github-corner{position:absolute;top:0;right:0}code[class*=language]{padding:0 .5em}pre[class*=language]{border-left-width:0}", ""]);
	
	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

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
		if(false) {
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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('app', '<a href="https://github.com/MartinMuzatko/riot-cheatsheet" class="github-corner"><svg width="80" height="80" viewbox="0 0 250 250" style="fill:#fff; color:#151513; position: absolute; top: 0; border: 0; right: 0;"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a> <header id="head" layout="column" layout-align="start"> <div class="logo" layout="row" layout-align="space-around center"> <a href="http://riotjs.com"><img src="http://riotjs.com/img/logo/riot60x.png" alt="RiotJS"></a> <a href="http://riotjs.com/release-notes/">{version}</a> </div> <p>Love this cheatsheet? <iframe style="vertical-align:middle" src="https://ghbtns.com/github-btn.html?user=MartinMuzatko&repo=riot-cheatsheet&type=star&count=true" frameborder="0" scrolling="0" width="90px" height="20px"></iframe> </p> <nav flex-auto layout="column"> <a onclick="{toggleItem}" href="#cheatsheet-{doc}" class="{active: name == doc}" each="{doc in docs}">{doc}</a> <a flex-end href="#credits">credits</a> </nav> </header> <menu> <input placeholder="find topic..." onfocus="{filterShortcuts}" oninput="{filterShortcuts}" type="text" name="filter"> <a onclick="{resetShortcuts}" if="{shortcut.active}" each="{shortcut in shortcuts}" href="#{shortcut.id}"> <highlight find="{filter.value}">{shortcut.name}</highlight> </a> </menu> <a onclick="{removeClass}" href="#head" name="top" class="top"> &DownBreve; </a> <main name="main"> <div> <article id="cheatsheet-{doc}" each="{doc in docs}"> <markdown file="{doc}"></markdown> </article> </div> </main> <footer id="credits"> <div> <p> Created with <span style="color: red">♥</span> by <a href="https://twitter.com/martinmuzatko">@MartinMuzatko</a> </p> <p> Learn how to use Riot in the real world. Visit <a href="http://happy-css.com">happy-css.com</a> </p> </div> </footer>', '.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}', '', function (opts) {
	    var _this2 = this;
	
	    this.shortcuts = [];
	
	    this.docs = ['templating', 'tag', 'riot', 'mixin', 'observable', 'router'];
	
	    this.name = this.docs[0];
	
	    this.version = riot.version;
	
	    this.filterShortcuts = function (e) {
	        var _this = this;
	
	        var value = this.filter.value.toUpperCase().replace(/\s$/g, '');
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
	        this.top.classList.remove('active');
	    }.bind(this);
	
	    this.toggleItem = function (e) {
	        this.name = e.item.doc;
	    }.bind(this);
	
	    this.resetShortcuts = function () {
	        _this2.shortcuts.map(function (shortcut) {
	            shortcut.active = false;
	        });
	    };
	
	    this.getGroupNames = function (node) {
	        var result = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
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
	
	    this.on('mount', function () {
	
	        document.body.addEventListener('keydown', function (event) {
	            if (event.code == 'Escape') {
	                if (document.activeElement == _this2.filter) {
	                    _this2.filter.blur();
	                    _this2.resetShortcuts();
	                    _this2.update();
	                } else {
	                    _this2.filter.focus();
	                }
	            }
	        });
	
	        new Waypoint({
	            element: _this2.main,
	            handler: function handler(event) {
	                if (event == 'down') {
	                    _this2.top.classList.add('active');
	                }
	            }
	        });
	
	        for (var doc in _this2.docs) {
	            doc = _this2.docs[doc];
	            new Waypoint({
	                element: _this2['cheatsheet-' + doc],
	                riot: _this2,
	                doc: doc,
	                handler: function handler() {
	                    this.options.riot.name = this.options.doc;
	                    this.options.riot.update();
	                }
	            });
	        }
	
	        _this2.tags.markdown[_this2.tags.markdown.length - 1].on('mount', function () {
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
	
	                // Generate group hirarchy based on heading level
	                if (_this2.shortcuts.length) {
	                    group = _this2.getGroupLevel(_this2.shortcuts[currentNode - 1], level - 1);
	                }
	                if (level > levelBefore) {
	                    // Recursively build group
	                    group = previousShortcut;
	                    currentNode = i;
	                }
	                _this2.shortcuts.push({
	                    id: id,
	                    name: shortcut.innerText.replace(/#/g, ''),
	                    active: false,
	                    level: level,
	                    group: group
	                });
	            }
	            _this2.update();
	        });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('markdown', '<div name="content"></div>', '', '', function (opts) {
	    var _this = this;
	
	    this.on('mount', function () {
	        _this.content.outerHTML = __webpack_require__(22)("./" + opts.file + '.md');
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./mixin.md": 23,
		"./observable.md": 24,
		"./riot.md": 25,
		"./router.md": 26,
		"./tag.md": 27,
		"./templating.md": 28
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 22;


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"mixins\">Mixins</h1>\n<h2 id=\"mixin-anatomy\">Mixin anatomy</h2>\n<p>A mixin can be a <code>function</code>, <code>object</code> or <code>class</code>\nMixins have, after initializing them, access to your tag</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >var</span> authService <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >{</span>\n    init<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n        <span class=\"token comment\" spellcheck=\"true\">// Called upon initializing the mixin</span>\n    <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>\n    login<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >(</span>user<span class=\"token punctuation\" >,</span> pass<span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span><span class=\"token comment\" spellcheck=\"true\">//...}</span>\n<span class=\"token punctuation\" >}</span></code></pre><h2 id=\"initializing\">Initializing</h2>\n<h3 id=\"inline-usage\">Inline Usage</h3>\n<p>For global objects or dynamic mixins within the tag</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >mixin</span><span class=\"token punctuation\" >(</span>authService<span class=\"token punctuation\" >)</span></code></pre><h3 id=\"shared-mixin\">Shared Mixin</h3>\n<p>Share your mixin across tags</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token comment\" spellcheck=\"true\">// In global scope</span>\nriot<span class=\"token punctuation\" >.</span><span class=\"token function\" >mixin</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'auth-service'</span><span class=\"token punctuation\" >,</span> authService<span class=\"token punctuation\" >)</span>\n<span class=\"token comment\" spellcheck=\"true\">// In your tag</span>\n<span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >mixin</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'auth-service'</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"global-mixin\">Global Mixin</h3>\n<p>Add mixin to every mounted tag</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token comment\" spellcheck=\"true\">// In global scope BEFORE mounting</span>\nriot<span class=\"token punctuation\" >.</span><span class=\"token function\" >mixin</span><span class=\"token punctuation\" >(</span>authService<span class=\"token punctuation\" >)</span></code></pre>";

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"observable\">Observable</h1>\n<p>Great to create tag-based API\nFor use outside tags, see <a href=\"#riot-observable\"></a></p>\n<h2 id=\"trigger\">Trigger</h2>\n<p>Trigger custom events similar <code>update</code></p>\n<h3 id=\"simple-trigger\">Simple trigger</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >trigger</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'selected'</span><span class=\"token punctuation\" >,</span> items<span class=\"token punctuation\" >)</span></code></pre><h3 id=\"trigger-with-data\">Trigger with data</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >trigger</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'selected'</span><span class=\"token punctuation\" >,</span> items<span class=\"token punctuation\" >)</span></code></pre><h2 id=\"listening-to-triggers\">Listening to triggers</h2>\n<p>From inside the tag or parent/child tag\nYou can use them for <a href=\"#tag-lifecycle-events\">lifecycle events</a> too.</p>\n<h3 id=\"always-listen\">Always listen</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >on</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'selected'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span>items<span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Do something with the selected items</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"listen-once\">Listen once</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >one</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'selected'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span>items<span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Do something with the selected items</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"stop-listening\">Stop listening</h3>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >off</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'selected'</span><span class=\"token punctuation\" >)</span></code></pre>";

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"riot\">Riot</h1>\n<h2 id=\"mount\">mount</h2>\n<p>Mounting a tag will make it appear on your webpage/app\nThere are various ways to mount your tags</p>\n<h3 id=\"all\">All</h3>\n<p>This will mount all tags and their children tags</p>\n<p><strong>Notice:</strong> This will not mount dynamically loaded tags such as with a router</p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >mount</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'*'</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"specific-with-options\">Specific with options</h3>\n<p>When mounting a tag, you can pass options, accessible as <code>opts</code></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>todo<span class=\"token operator\" >-</span>list<span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>todo<span class=\"token operator\" >-</span>list<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token keyword\" >var</span> items <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n        <span class=\"token string\" >'fork'</span><span class=\"token punctuation\" >,</span>\n        <span class=\"token string\" >'star'</span><span class=\"token punctuation\" >,</span>\n        <span class=\"token string\" >'contribute'</span>\n    <span class=\"token punctuation\" >]</span>\n    riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >mount</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'todo-list'</span><span class=\"token punctuation\" >,</span> items<span class=\"token punctuation\" >)</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h3 id=\"data-attribute\">Data attribute</h3>\n<p><strong>Notice:</strong> This feature is supported in <strong>Riot 2.3.17</strong> or later\nWith a <code>data</code> attribute, you can mount a tag into an element</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>ul data<span class=\"token operator\" >-</span>is<span class=\"token operator\" >=</span><span class=\"token string\" >\"todo-list\"</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>ul<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token comment\" spellcheck=\"true\">// You can mount all or with data too here</span>\n    riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >mount</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'todo-list'</span><span class=\"token punctuation\" >)</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h3 id=\"mount-to-dom-node\">Mount to DOM node</h3>\n<p>You can also use a DOM node to mount your tag</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>main name<span class=\"token operator\" >=</span><span class=\"token string\" >\"content\"</span><span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token comment\" spellcheck=\"true\">// At maximum, riot.mount takes three arguments</span>\n    riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >mount</span><span class=\"token punctuation\" >(</span><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>content<span class=\"token punctuation\" >,</span> <span class=\"token string\" >'todo-list'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >{</span>items<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'be nice'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'share your knowledge'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'give feedback'</span><span class=\"token punctuation\" >]</span><span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h2 id=\"observable\">observable</h2>\n<p>Turns a non-riot object/class into an observable, being capable of triggering and listening to events\nThis will add <code>trigger</code>, <code>on</code>, <code>one</code> and <code>off</code> to the provided object\nSee <a href=\"#observable\">Observable</a> for all methods</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >class</span> <span class=\"token class-name\" >AuthService</span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token function\" >constructor</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token punctuation\" >{</span>\n        riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >observable</span><span class=\"token punctuation\" >(</span><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >)</span>\n    <span class=\"token punctuation\" >}</span>\n<span class=\"token punctuation\" >}</span></code></pre>";

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"router\">Router</h1>\n<p>The router takes care of the history <code>pushState</code></p>\n<p>Depending on route, you can mount different tags, update data and so on.</p>\n<h2 id=\"minimal-setup\">Minimal setup</h2>\n<h3 id=\"setup\">Setup</h3>\n<p>The function works with any amount of parameters</p>\n<p><strong>Recommendation:</strong> Put your routing setup within <code>this.on(&#39;mount&#39;, () =&gt; {})</code> in your main tag, that controls everything (e.g. <code>app.html</code>)</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>main name<span class=\"token operator\" >=</span><span class=\"token string\" >\"content\"</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>main<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\nriot<span class=\"token punctuation\" >.</span><span class=\"token function\" >route</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >(</span>collection<span class=\"token punctuation\" >,</span> action<span class=\"token punctuation\" >,</span> id<span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Mount another tag, or do something with the data</span>\n    riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >mount</span><span class=\"token punctuation\" >(</span><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>content<span class=\"token punctuation\" >,</span> collection<span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >{</span>view<span class=\"token punctuation\" >:</span> action<span class=\"token punctuation\" >,</span> id<span class=\"token punctuation\" >:</span> id<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h3 id=\"go-to-route\">Go to Route</h3>\n<p>This will call the route method defined above\nWhere <code>customer</code> is <code>collection</code>, <code>edit</code> is <code>action</code> and <code>289</code> is <code>id</code></p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >route</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'customer/edit/289'</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"start-listening\">Start listening</h3>\n<p>This starts the router, and examines the hash that is already in place\n<strong>Notice:</strong> This feature is supported in <strong>Riot 2.3</strong> or later</p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\" >.</span>route<span class=\"token punctuation\" >.</span><span class=\"token function\" >start</span><span class=\"token punctuation\" >(</span><span class=\"token boolean\" >true</span><span class=\"token punctuation\" >)</span></code></pre><p>In earlier versions of riot, this was done with</p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\" >.</span>route<span class=\"token punctuation\" >.</span><span class=\"token function\" >start</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span>\nriot<span class=\"token punctuation\" >.</span>route<span class=\"token punctuation\" >.</span><span class=\"token function\" >exec</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span></code></pre><p>You can also separately set them up, if you like to</p>\n<h2 id=\"advanced-setup\">Advanced setup</h2>\n<p>In the advanced setup, you can set up a function per route call and you are more flexible with wildcard support</p>\n<p><strong>Notice:</strong> These features are only supported on <strong>Riot 2.3</strong> or later</p>\n<h3 id=\"route-without-wildcard\">Route without wildcard</h3>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >route</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'/index'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span><span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"route-with-wildcard\">Route with wildcard</h3>\n<p>Regex for wildcards:</p>\n<p>*  <code>([^/?#]+?)</code></p>\n<p>..  <code>.*</code></p>\n<p>This route will catch everything that is a subroute of <code>blog</code></p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >route</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'/blog/*'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span>entry<span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span><span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><p>You can setup more distinct variables, other than splitting <code>/</code></p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >route</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'/blog/*-*/*'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span>month<span class=\"token punctuation\" >,</span> year<span class=\"token punctuation\" >,</span> entry<span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// route might look like /blog/06-2012/give-me-lasagna</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><p>Everything after a keyword</p>\n<pre class=\"language-js\"><code class=\"language-js\">riot<span class=\"token punctuation\" >.</span><span class=\"token function\" >route</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'/old..'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Sorry, this page has been removed</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h2 id=\"subroutes\">Subroutes</h2>\n<p>Subroutes overwrite existing routes, based on context</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >var</span> subRoute <span class=\"token operator\" >=</span> riot<span class=\"token punctuation\" >.</span>route<span class=\"token punctuation\" >.</span><span class=\"token function\" >create</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span>\n<span class=\"token function\" >subRoute</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'/blog/tags'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n    <span class=\"token comment\" spellcheck=\"true\">// Instead of looking for a post named tags</span>\n    <span class=\"token comment\" spellcheck=\"true\">// List all tags used in posts</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre>";

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"tag\">Tag</h1>\n<h2 id=\"lifecycle-events\">Lifecycle events</h2>\n<h3 id=\"before-mount\">before-mount</h3>\n<p>Before the tag is mounted</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >on</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'before-mount'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"mount\">mount</h3>\n<p>After all expressions are evaluated on mount</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >on</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'mount'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"update\">update</h3>\n<p>Allows recalculation of data before updating</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >on</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'update'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"updated\">updated</h3>\n<p>After updates</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >on</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'updated'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"before-unmount\">before-unmount</h3>\n<p>Before the tag is removed</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >on</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'before-unmount'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"unmount\">unmount</h3>\n<p>After the tag is removed</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >on</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'unmount'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"all-events\">all events</h3>\n<p>Listen to all events\nYou can fetch the event name if desired</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >on</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'*'</span><span class=\"token punctuation\" >,</span> <span class=\"token punctuation\" >(</span>eventName<span class=\"token punctuation\" >)</span> <span class=\"token operator\" >=</span><span class=\"token operator\" >></span> <span class=\"token punctuation\" >{</span>\n<span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >)</span></code></pre><h2 id=\"tag-methods-properties\">Tag Methods &amp; Properties</h2>\n<h3 id=\"on-one-off-trigger\">on, one, off, trigger</h3>\n<p>A riot tag already implements a <code>riot.observable</code>\nSee <a href=\"#observable\">observable</a></p>\n<h3 id=\"update\">Update</h3>\n<p>Shortcut for <a href=\"#observable-trigger\">trigger</a> <code>this.trigger(&#39;update&#39;)</code></p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >update</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span></code></pre><h3 id=\"ismounted\">isMounted</h3>\n<p>Attribute to tell whether or not the tag is mounted</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>isMounted</code></pre><h3 id=\"root\">root</h3>\n<p>Points to it&#39;s own tag element</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>root <span class=\"token comment\" spellcheck=\"true\">// reference to riot tag</span></code></pre><h3 id=\"opts\">opts</h3>\n<p>Options passed via HTML or on mount, See <a href=\"#templating-options\">options</a></p>\n<h3 id=\"mixin\">mixin</h3>\n<p>See <a href=\"#mixins\">Mixins</a></p>\n<h3 id=\"tags\">tags</h3>\n<p>See <a href=\"#templating-child-tags\">Child tags</a></p>\n<h3 id=\"parent\">parent</h3>\n<p>Access the parent tag, if there is one</p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>parent <span class=\"token comment\" spellcheck=\"true\">// &lt;Tag></span></code></pre>";

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"templating\">Templating</h1>\n<h2 id=\"anatomy\">Anatomy</h2>\n<p>Everything is a component, Riot refers to them as tags\nTags have to be <a href=\"#riot-mount\">mounted</a></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>example<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span>b<span class=\"token operator\" >></span>Markup<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>b<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n        <span class=\"token comment\" spellcheck=\"true\">// Script</span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>example<span class=\"token operator\" >></span></code></pre><h2 id=\"expressions\">Expressions</h2>\n<h3 id=\"pure-javascript\">Pure JavaScript</h3>\n<p>Can contain any javascript except curly brackets</p>\n<pre class=\"language-html\"><code class=\"language-html\">Random number<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >{</span>Math<span class=\"token punctuation\" >.</span><span class=\"token function\" >random</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span> <span class=\"token operator\" >*</span> <span class=\"token number\" >10</span><span class=\"token punctuation\" >}</span>\n<span class=\"token operator\" >&amp;</span>copy<span class=\"token punctuation\" >;</span> <span class=\"token operator\" >&lt;</span>time datetime<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span><span class=\"token keyword\" >new</span> <span class=\"token class-name\" >Date</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >.</span><span class=\"token function\" >getFullYear</span><span class=\"token punctuation\" >(</span><span class=\"token punctuation\" >)</span><span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>time<span class=\"token operator\" >></span>\nHow long is a day <span class=\"token keyword\" >in</span> seconds<span class=\"token operator\" >?</span> <span class=\"token punctuation\" >{</span><span class=\"token number\" >60</span><span class=\"token operator\" >*</span><span class=\"token number\" >60</span><span class=\"token operator\" >*</span><span class=\"token number\" >24</span><span class=\"token punctuation\" >}</span></code></pre><h3 id=\"accessing-tag-properties\">Accessing tag properties</h3>\n<pre class=\"language-html\"><code class=\"language-html\">My name is <span class=\"token punctuation\" >{</span>author<span class=\"token punctuation\" >.</span>name<span class=\"token punctuation\" >}</span>\nand I'm <span class=\"token punctuation\" >{</span>author<span class=\"token punctuation\" >.</span>age<span class=\"token punctuation\" >}</span> <span class=\"token punctuation\" >{</span>unit<span class=\"token punctuation\" >}</span>s old\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>author <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >{</span>\n        name<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'Martin'</span><span class=\"token punctuation\" >,</span>\n        age<span class=\"token punctuation\" >:</span> <span class=\"token number\" >25</span>\n    <span class=\"token punctuation\" >}</span>\n<span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>unit <span class=\"token operator\" >=</span> <span class=\"token string\" >'year'</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h2 id=\"foreach-loop-data\">Foreach - loop data</h2>\n<h3 id=\"array\">Array</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>nav<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span>a href<span class=\"token operator\" >=</span><span class=\"token string\" >\"#{doc}\"</span> each<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>doc <span class=\"token keyword\" >in</span> docs<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span>\n        <span class=\"token punctuation\" >{</span>doc<span class=\"token punctuation\" >}</span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>a<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>nav<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>docs <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n        <span class=\"token string\" >'templating'</span><span class=\"token punctuation\" >,</span>\n        <span class=\"token string\" >'tag'</span><span class=\"token punctuation\" >,</span>\n        <span class=\"token string\" >'mixin'</span><span class=\"token punctuation\" >,</span>\n        <span class=\"token string\" >'observable'</span><span class=\"token punctuation\" >,</span>\n        <span class=\"token string\" >'router'</span>\n    <span class=\"token punctuation\" >]</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><p>You can access both index and value by providing a second argument</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>nav<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span>a href<span class=\"token operator\" >=</span><span class=\"token string\" >\"#{doc}\"</span> each<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>doc<span class=\"token punctuation\" >,</span> index <span class=\"token keyword\" >in</span> docs<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span>\n        <span class=\"token punctuation\" >{</span>index <span class=\"token operator\" >+</span> <span class=\"token number\" >1</span><span class=\"token punctuation\" >}</span> <span class=\"token operator\" >-</span> <span class=\"token punctuation\" >{</span>doc<span class=\"token punctuation\" >}</span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>a<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>nav<span class=\"token operator\" >></span></code></pre><h3 id=\"object\">Object</h3>\n<p>Used for more complex structures, where each item has a distinct key</p>\n<p>Objects use different order of <code>key, value</code> in the each statement</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>card size<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>card<span class=\"token punctuation\" >.</span>size<span class=\"token punctuation\" >}</span> name<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>title<span class=\"token punctuation\" >}</span>\n      each<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>title<span class=\"token punctuation\" >,</span> card <span class=\"token keyword\" >in</span> cards<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>card<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>cards <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >{</span>\n        analytics <span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >{</span>\n            size<span class=\"token punctuation\" >:</span> <span class=\"token number\" >1</span><span class=\"token punctuation\" >,</span>\n            toolbar<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'reset'</span><span class=\"token punctuation\" >]</span>\n        <span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>\n        posts<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >{</span>\n            size<span class=\"token punctuation\" >:</span> <span class=\"token number\" >2</span><span class=\"token punctuation\" >,</span>\n            toolbar<span class=\"token punctuation\" >:</span> <span class=\"token punctuation\" >[</span><span class=\"token string\" >'add'</span><span class=\"token punctuation\" >,</span> <span class=\"token string\" >'list'</span><span class=\"token punctuation\" >]</span>\n        <span class=\"token punctuation\" >}</span>\n    <span class=\"token punctuation\" >}</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h3 id=\"virtual\">Virtual</h3>\n<p>The virtual tag is used for loops that should generate no wrapper markup</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>dl<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span>virtual each<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>item <span class=\"token keyword\" >in</span> items<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span>\n        <span class=\"token operator\" >&lt;</span>dt<span class=\"token operator\" >></span><span class=\"token punctuation\" >{</span>item<span class=\"token punctuation\" >.</span>key<span class=\"token punctuation\" >}</span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>dt<span class=\"token operator\" >></span>\n        <span class=\"token operator\" >&lt;</span>dd<span class=\"token operator\" >></span><span class=\"token punctuation\" >{</span>item<span class=\"token punctuation\" >.</span>value<span class=\"token punctuation\" >}</span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>dd<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>virtual<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>dl<span class=\"token operator\" >></span></code></pre><h2 id=\"conditionals\">Conditionals</h2>\n<h3 id=\"shorthand-ternary\">Shorthand ternary</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>div <span class=\"token keyword\" >class</span><span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>active<span class=\"token punctuation\" >:</span> item<span class=\"token punctuation\" >.</span>active<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>div<span class=\"token operator\" >></span></code></pre><h3 id=\"ternary\">Ternary</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>div <span class=\"token keyword\" >class</span><span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>item<span class=\"token punctuation\" >.</span>active <span class=\"token operator\" >?</span> <span class=\"token string\" >'active'</span> <span class=\"token punctuation\" >:</span> <span class=\"token string\" >''</span><span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>div<span class=\"token operator\" >></span></code></pre><h3 id=\"blocklevel\">Blocklevel</h3>\n<p>Does not write HTML if condition is false</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>div <span class=\"token keyword\" >if</span><span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>shop<span class=\"token punctuation\" >.</span>items<span class=\"token punctuation\" >.</span>length<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>div<span class=\"token operator\" >></span></code></pre><h3 id=\"hide\">Hide</h3>\n<p>Writes HTML, just sets <code>display</code> style to <code>none</code> if condition is true</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>nav hide<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>mobile<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>nav<span class=\"token operator\" >></span></code></pre><h3 id=\"show\">Show</h3>\n<p>Opposite of Hide <code>display</code></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>nav show<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>mobile<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>nav<span class=\"token operator\" >></span></code></pre><h2 id=\"access-elements-and-tags\">Access elements and tags</h2>\n<h3 id=\"html-elements\">HTML Elements</h3>\n<p>You can also use <code>id</code> if you are not comfortable with <code>name</code></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>input name<span class=\"token operator\" >=</span><span class=\"token string\" >\"todo\"</span><span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>todo<span class=\"token punctuation\" >.</span>value <span class=\"token operator\" >=</span> <span class=\"token string\" >'write todolist'</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h3 id=\"child-tags\">Child tags</h3>\n<p>Access via <code>name</code> or <code>id</code></p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>todo<span class=\"token operator\" >-</span>item name<span class=\"token operator\" >=</span><span class=\"token string\" >\"first\"</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>todo<span class=\"token operator\" >-</span>item<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>tags<span class=\"token punctuation\" >.</span>first\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><p>If there are more instances, you get an array of tags</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>todo<span class=\"token operator\" >-</span>item<span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>todo<span class=\"token operator\" >-</span>item<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>todo<span class=\"token operator\" >-</span>item<span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>todo<span class=\"token operator\" >-</span>item<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>todo<span class=\"token operator\" >-</span>item name<span class=\"token operator\" >=</span><span class=\"token string\" >\"last\"</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>todo<span class=\"token operator\" >-</span>item<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>tags<span class=\"token punctuation\" >[</span><span class=\"token string\" >'todo-item'</span><span class=\"token punctuation\" >]</span> <span class=\"token comment\" spellcheck=\"true\">// Array&lt;Tag> - 2</span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>tags<span class=\"token punctuation\" >.</span>last <span class=\"token comment\" spellcheck=\"true\">// &lt;Tag> - 1</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h2 id=\"options\">Options</h2>\n<p>Options can be passed via html params or on mount</p>\n<p>Options only accept <code>boolean</code>, <code>number</code>, <code>string</code> or simple <code>array</code>, when passing directly</p>\n<h3 id=\"passing-values-per-html\">Passing values per HTML</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>todo<span class=\"token operator\" >-</span>item name<span class=\"token operator\" >=</span><span class=\"token string\" >\"Finish Cheatsheet\"</span> done<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span><span class=\"token boolean\" >false</span><span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>todo<span class=\"token operator\" >-</span>item<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token comment\" spellcheck=\"true\">// Script of todo-item</span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>opts<span class=\"token punctuation\" >.</span>name <span class=\"token comment\" spellcheck=\"true\">// 'Finish Cheatsheet'</span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>opts<span class=\"token punctuation\" >.</span>done <span class=\"token comment\" spellcheck=\"true\">// false</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h3 id=\"passing-vars-per-html\">Passing vars per HTML</h3>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>todo<span class=\"token operator\" >-</span>item item<span class=\"token operator\" >=</span><span class=\"token punctuation\" >{</span>item<span class=\"token punctuation\" >}</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>todo<span class=\"token operator\" >-</span>item<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span>script<span class=\"token operator\" >></span>\n    <span class=\"token keyword\" >this</span><span class=\"token punctuation\" >.</span>item <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >{</span>\n        name<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'Study riot'</span><span class=\"token punctuation\" >,</span>\n        done<span class=\"token punctuation\" >:</span> <span class=\"token boolean\" >true</span>\n    <span class=\"token punctuation\" >}</span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>script<span class=\"token operator\" >></span></code></pre><h3 id=\"passing-values-on-mount\">Passing values on Mount</h3>\n<p>On mount, we are more flexible, since we are in js\nSee <a href=\"#riot-mount\">mount</a></p>\n<pre class=\"language-js\"><code class=\"language-js\"><span class=\"token keyword\" >var</span> items <span class=\"token operator\" >=</span> <span class=\"token punctuation\" >[</span>\n    <span class=\"token punctuation\" >{</span>name<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'Share'</span><span class=\"token punctuation\" >,</span> done<span class=\"token punctuation\" >:</span> <span class=\"token boolean\" >true</span><span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >{</span>name<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'Star'</span><span class=\"token punctuation\" >,</span> done<span class=\"token punctuation\" >:</span> <span class=\"token boolean\" >true</span><span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>\n    <span class=\"token punctuation\" >{</span>name<span class=\"token punctuation\" >:</span> <span class=\"token string\" >'Work'</span><span class=\"token punctuation\" >,</span> done<span class=\"token punctuation\" >:</span> <span class=\"token boolean\" >false</span><span class=\"token punctuation\" >}</span><span class=\"token punctuation\" >,</span>\n<span class=\"token punctuation\" >]</span>\nriot<span class=\"token punctuation\" >.</span><span class=\"token function\" >mount</span><span class=\"token punctuation\" >(</span><span class=\"token string\" >'todo-list'</span><span class=\"token punctuation\" >,</span> items<span class=\"token punctuation\" >)</span></code></pre><h2 id=\"yield\">Yield</h2>\n<p>Yielding is like <a href=\"#templating-options\">options</a>, just that it accepts HTML and other riot tags</p>\n<p>Definition</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>popup<span class=\"token operator\" >-</span>body<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >yield</span><span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>popup<span class=\"token operator\" >-</span>body<span class=\"token operator\" >></span></code></pre><p>Usage</p>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>popup<span class=\"token operator\" >-</span>body<span class=\"token operator\" >></span>\n    Hi<span class=\"token operator\" >!</span> I'm supporting\n    <span class=\"token operator\" >&lt;</span>abbr title<span class=\"token operator\" >=</span><span class=\"token string\" >\"Hypertext Markup Language\"</span><span class=\"token operator\" >></span>HTML<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>abbr<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>popup<span class=\"token operator\" >-</span>body<span class=\"token operator\" >></span></code></pre><h3 id=\"multiple-yieldpoints\">Multiple Yieldpoints</h3>\n<p><strong>Notice:</strong> This feature is supported in <strong>Riot 2.3.12</strong> or later</p>\n<h4 id=\"usage\">Usage</h4>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>card<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >yield</span> to<span class=\"token operator\" >=</span><span class=\"token string\" >\"toolbar\"</span><span class=\"token operator\" >></span>\n        <span class=\"token operator\" >&lt;</span>a<span class=\"token operator\" >></span>Add post<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>a<span class=\"token operator\" >></span>\n        <span class=\"token operator\" >&lt;</span>a<span class=\"token operator\" >></span>Recently published<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>a<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span><span class=\"token keyword\" >yield</span><span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >yield</span> to<span class=\"token operator\" >=</span><span class=\"token string\" >\"header\"</span><span class=\"token operator\" >></span>\n        <span class=\"token operator\" >&lt;</span>i <span class=\"token keyword\" >class</span><span class=\"token operator\" >=</span><span class=\"token string\" >\"fa fa-text\"</span><span class=\"token operator\" >></span><span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>i<span class=\"token operator\" >></span> Posts\n    <span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span><span class=\"token keyword\" >yield</span><span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>card<span class=\"token operator\" >></span></code></pre><h4 id=\"definition\">Definition</h4>\n<pre class=\"language-html\"><code class=\"language-html\"><span class=\"token operator\" >&lt;</span>card<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span>h2<span class=\"token operator\" >></span>\n        <span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >yield</span> <span class=\"token keyword\" >from</span><span class=\"token operator\" >=</span><span class=\"token string\" >\"header\"</span> <span class=\"token operator\" >/</span><span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>h2<span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span>div <span class=\"token keyword\" >class</span><span class=\"token operator\" >=</span><span class=\"token string\" >\"toolbar\"</span><span class=\"token operator\" >></span>\n        <span class=\"token operator\" >&lt;</span><span class=\"token keyword\" >yield</span> <span class=\"token keyword\" >from</span><span class=\"token operator\" >=</span><span class=\"token string\" >\"toolbar\"</span> <span class=\"token operator\" >/</span><span class=\"token operator\" >></span>\n    <span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>div<span class=\"token operator\" >></span>\n<span class=\"token operator\" >&lt;</span><span class=\"token operator\" >/</span>card<span class=\"token operator\" >></span></code></pre>";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('highlight', '<div name="result"></div> <div style="display: none;" name="content"> <yield> </div>', '', '', function (opts) {
	    var _this = this;
	
	    this.on('update', function () {
	
	        var content = _this.content.innerText;
	        var searchQueries = _this.opts.find.toLowerCase().split(' ');
	
	        for (var searchQuery in searchQueries) {
	            searchQuery = searchQueries[searchQuery];
	            if (!!~content.toLowerCase().indexOf(searchQuery)) {
	                content = content.replace(new RegExp('(' + searchQuery + ')(?!</b>)', 'i'), '<b>$1</b>');
	            }
	        }
	        _this.result.innerHTML = content;
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map