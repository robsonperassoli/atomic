(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.AbsintheSocketApolloLink = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.0' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document) && _isObject(document.createElement);
	var _domCreate = function (it) {
	  return is ? document.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };
	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


	_export(_export.P, 'Function', { bind: _bind });

	function _newArrowCheck(innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	}

	var newArrowCheck = _newArrowCheck;

	var Observable_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// === Symbol Support ===

	var hasSymbols = function () {
	  return typeof Symbol === 'function';
	};
	var hasSymbol = function (name) {
	  return hasSymbols() && Boolean(Symbol[name]);
	};
	var getSymbol = function (name) {
	  return hasSymbol(name) ? Symbol[name] : '@@' + name;
	};

	if (hasSymbols() && !hasSymbol('observable')) {
	  Symbol.observable = Symbol('observable');
	}

	var SymbolIterator = getSymbol('iterator');
	var SymbolObservable = getSymbol('observable');
	var SymbolSpecies = getSymbol('species');

	// === Abstract Operations ===

	function getMethod(obj, key) {
	  var value = obj[key];

	  if (value == null) return undefined;

	  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');

	  return value;
	}

	function getSpecies(obj) {
	  var ctor = obj.constructor;
	  if (ctor !== undefined) {
	    ctor = ctor[SymbolSpecies];
	    if (ctor === null) {
	      ctor = undefined;
	    }
	  }
	  return ctor !== undefined ? ctor : Observable;
	}

	function isObservable(x) {
	  return x instanceof Observable; // SPEC: Brand check
	}

	function hostReportError(e) {
	  if (hostReportError.log) {
	    hostReportError.log(e);
	  } else {
	    setTimeout(function () {
	      throw e;
	    });
	  }
	}

	function enqueue(fn) {
	  Promise.resolve().then(function () {
	    try {
	      fn();
	    } catch (e) {
	      hostReportError(e);
	    }
	  });
	}

	function cleanupSubscription(subscription) {
	  var cleanup = subscription._cleanup;
	  if (cleanup === undefined) return;

	  subscription._cleanup = undefined;

	  if (!cleanup) {
	    return;
	  }

	  try {
	    if (typeof cleanup === 'function') {
	      cleanup();
	    } else {
	      var unsubscribe = getMethod(cleanup, 'unsubscribe');
	      if (unsubscribe) {
	        unsubscribe.call(cleanup);
	      }
	    }
	  } catch (e) {
	    hostReportError(e);
	  }
	}

	function closeSubscription(subscription) {
	  subscription._observer = undefined;
	  subscription._queue = undefined;
	  subscription._state = 'closed';
	}

	function flushSubscription(subscription) {
	  var queue = subscription._queue;
	  if (!queue) {
	    return;
	  }
	  subscription._queue = undefined;
	  subscription._state = 'ready';
	  for (var i = 0; i < queue.length; ++i) {
	    notifySubscription(subscription, queue[i].type, queue[i].value);
	    if (subscription._state === 'closed') break;
	  }
	}

	function notifySubscription(subscription, type, value) {
	  subscription._state = 'running';

	  var observer = subscription._observer;

	  try {
	    var m = getMethod(observer, type);
	    switch (type) {
	      case 'next':
	        if (m) m.call(observer, value);
	        break;
	      case 'error':
	        closeSubscription(subscription);
	        if (m) m.call(observer, value);else throw value;
	        break;
	      case 'complete':
	        closeSubscription(subscription);
	        if (m) m.call(observer);
	        break;
	    }
	  } catch (e) {
	    hostReportError(e);
	  }

	  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
	}

	function onNotify(subscription, type, value) {
	  if (subscription._state === 'closed') return;

	  if (subscription._state === 'buffering') {
	    subscription._queue.push({ type: type, value: value });
	    return;
	  }

	  if (subscription._state !== 'ready') {
	    subscription._state = 'buffering';
	    subscription._queue = [{ type: type, value: value }];
	    enqueue(function () {
	      return flushSubscription(subscription);
	    });
	    return;
	  }

	  notifySubscription(subscription, type, value);
	}

	var Subscription = function () {
	  function Subscription(observer, subscriber) {
	    _classCallCheck(this, Subscription);

	    // ASSERT: observer is an object
	    // ASSERT: subscriber is callable

	    this._cleanup = undefined;
	    this._observer = observer;
	    this._queue = undefined;
	    this._state = 'initializing';

	    var subscriptionObserver = new SubscriptionObserver(this);

	    try {
	      this._cleanup = subscriber.call(undefined, subscriptionObserver);
	    } catch (e) {
	      subscriptionObserver.error(e);
	    }

	    if (this._state === 'initializing') this._state = 'ready';
	  }

	  _createClass(Subscription, [{
	    key: 'unsubscribe',
	    value: function unsubscribe() {
	      if (this._state !== 'closed') {
	        closeSubscription(this);
	        cleanupSubscription(this);
	      }
	    }
	  }, {
	    key: 'closed',
	    get: function () {
	      return this._state === 'closed';
	    }
	  }]);

	  return Subscription;
	}();

	var SubscriptionObserver = function () {
	  function SubscriptionObserver(subscription) {
	    _classCallCheck(this, SubscriptionObserver);

	    this._subscription = subscription;
	  }

	  _createClass(SubscriptionObserver, [{
	    key: 'next',
	    value: function next(value) {
	      onNotify(this._subscription, 'next', value);
	    }
	  }, {
	    key: 'error',
	    value: function error(value) {
	      onNotify(this._subscription, 'error', value);
	    }
	  }, {
	    key: 'complete',
	    value: function complete() {
	      onNotify(this._subscription, 'complete');
	    }
	  }, {
	    key: 'closed',
	    get: function () {
	      return this._subscription._state === 'closed';
	    }
	  }]);

	  return SubscriptionObserver;
	}();

	var Observable = exports.Observable = function () {
	  function Observable(subscriber) {
	    _classCallCheck(this, Observable);

	    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');

	    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');

	    this._subscriber = subscriber;
	  }

	  _createClass(Observable, [{
	    key: 'subscribe',
	    value: function subscribe(observer) {
	      if (typeof observer !== 'object' || observer === null) {
	        observer = {
	          next: observer,
	          error: arguments[1],
	          complete: arguments[2]
	        };
	      }
	      return new Subscription(observer, this._subscriber);
	    }
	  }, {
	    key: 'forEach',
	    value: function forEach(fn) {
	      var _this = this;

	      return new Promise(function (resolve, reject) {
	        if (typeof fn !== 'function') {
	          reject(new TypeError(fn + ' is not a function'));
	          return;
	        }

	        function done() {
	          subscription.unsubscribe();
	          resolve();
	        }

	        var subscription = _this.subscribe({
	          next: function (value) {
	            try {
	              fn(value, done);
	            } catch (e) {
	              reject(e);
	              subscription.unsubscribe();
	            }
	          },

	          error: reject,
	          complete: resolve
	        });
	      });
	    }
	  }, {
	    key: 'map',
	    value: function map(fn) {
	      var _this2 = this;

	      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

	      var C = getSpecies(this);

	      return new C(function (observer) {
	        return _this2.subscribe({
	          next: function (value) {
	            try {
	              value = fn(value);
	            } catch (e) {
	              return observer.error(e);
	            }
	            observer.next(value);
	          },
	          error: function (e) {
	            observer.error(e);
	          },
	          complete: function () {
	            observer.complete();
	          }
	        });
	      });
	    }
	  }, {
	    key: 'filter',
	    value: function filter(fn) {
	      var _this3 = this;

	      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

	      var C = getSpecies(this);

	      return new C(function (observer) {
	        return _this3.subscribe({
	          next: function (value) {
	            try {
	              if (!fn(value)) return;
	            } catch (e) {
	              return observer.error(e);
	            }
	            observer.next(value);
	          },
	          error: function (e) {
	            observer.error(e);
	          },
	          complete: function () {
	            observer.complete();
	          }
	        });
	      });
	    }
	  }, {
	    key: 'reduce',
	    value: function reduce(fn) {
	      var _this4 = this;

	      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

	      var C = getSpecies(this);
	      var hasSeed = arguments.length > 1;
	      var hasValue = false;
	      var seed = arguments[1];
	      var acc = seed;

	      return new C(function (observer) {
	        return _this4.subscribe({
	          next: function (value) {
	            var first = !hasValue;
	            hasValue = true;

	            if (!first || hasSeed) {
	              try {
	                acc = fn(acc, value);
	              } catch (e) {
	                return observer.error(e);
	              }
	            } else {
	              acc = value;
	            }
	          },
	          error: function (e) {
	            observer.error(e);
	          },
	          complete: function () {
	            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));

	            observer.next(acc);
	            observer.complete();
	          }
	        });
	      });
	    }
	  }, {
	    key: 'concat',
	    value: function concat() {
	      var _this5 = this;

	      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	        sources[_key] = arguments[_key];
	      }

	      var C = getSpecies(this);

	      return new C(function (observer) {
	        var subscription = void 0;
	        var index = 0;

	        function startNext(next) {
	          subscription = next.subscribe({
	            next: function (v) {
	              observer.next(v);
	            },
	            error: function (e) {
	              observer.error(e);
	            },
	            complete: function () {
	              if (index === sources.length) {
	                subscription = undefined;
	                observer.complete();
	              } else {
	                startNext(C.from(sources[index++]));
	              }
	            }
	          });
	        }

	        startNext(_this5);

	        return function () {
	          if (subscription) {
	            subscription.unsubscribe();
	            subscription = undefined;
	          }
	        };
	      });
	    }
	  }, {
	    key: 'flatMap',
	    value: function flatMap(fn) {
	      var _this6 = this;

	      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

	      var C = getSpecies(this);

	      return new C(function (observer) {
	        var subscriptions = [];

	        var outer = _this6.subscribe({
	          next: function (value) {
	            if (fn) {
	              try {
	                value = fn(value);
	              } catch (e) {
	                return observer.error(e);
	              }
	            }

	            var inner = C.from(value).subscribe({
	              next: function (value) {
	                observer.next(value);
	              },
	              error: function (e) {
	                observer.error(e);
	              },
	              complete: function () {
	                var i = subscriptions.indexOf(inner);
	                if (i >= 0) subscriptions.splice(i, 1);
	                completeIfDone();
	              }
	            });

	            subscriptions.push(inner);
	          },
	          error: function (e) {
	            observer.error(e);
	          },
	          complete: function () {
	            completeIfDone();
	          }
	        });

	        function completeIfDone() {
	          if (outer.closed && subscriptions.length === 0) observer.complete();
	        }

	        return function () {
	          subscriptions.forEach(function (s) {
	            return s.unsubscribe();
	          });
	          outer.unsubscribe();
	        };
	      });
	    }
	  }, {
	    key: SymbolObservable,
	    value: function () {
	      return this;
	    }
	  }], [{
	    key: 'from',
	    value: function from(x) {
	      var C = typeof this === 'function' ? this : Observable;

	      if (x == null) throw new TypeError(x + ' is not an object');

	      var method = getMethod(x, SymbolObservable);
	      if (method) {
	        var observable = method.call(x);

	        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');

	        if (isObservable(observable) && observable.constructor === C) return observable;

	        return new C(function (observer) {
	          return observable.subscribe(observer);
	        });
	      }

	      if (hasSymbol('iterator')) {
	        method = getMethod(x, SymbolIterator);
	        if (method) {
	          return new C(function (observer) {
	            enqueue(function () {
	              if (observer.closed) return;
	              var _iteratorNormalCompletion = true;
	              var _didIteratorError = false;
	              var _iteratorError = undefined;

	              try {
	                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                  var item = _step.value;

	                  observer.next(item);
	                  if (observer.closed) return;
	                }
	              } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                  }
	                } finally {
	                  if (_didIteratorError) {
	                    throw _iteratorError;
	                  }
	                }
	              }

	              observer.complete();
	            });
	          });
	        }
	      }

	      if (Array.isArray(x)) {
	        return new C(function (observer) {
	          enqueue(function () {
	            if (observer.closed) return;
	            for (var i = 0; i < x.length; ++i) {
	              observer.next(x[i]);
	              if (observer.closed) return;
	            }
	            observer.complete();
	          });
	        });
	      }

	      throw new TypeError(x + ' is not observable');
	    }
	  }, {
	    key: 'of',
	    value: function of() {
	      for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        items[_key2] = arguments[_key2];
	      }

	      var C = typeof this === 'function' ? this : Observable;

	      return new C(function (observer) {
	        enqueue(function () {
	          if (observer.closed) return;
	          for (var i = 0; i < items.length; ++i) {
	            observer.next(items[i]);
	            if (observer.closed) return;
	          }
	          observer.complete();
	        });
	      });
	    }
	  }, {
	    key: SymbolSpecies,
	    get: function () {
	      return this;
	    }
	  }]);

	  return Observable;
	}();

	if (hasSymbols()) {
	  Object.defineProperty(Observable, Symbol('extensions'), {
	    value: {
	      symbol: SymbolObservable,
	      hostReportError: hostReportError
	    },
	    configurable: true
	  });
	}
	});

	unwrapExports(Observable_1);
	var Observable_2 = Observable_1.Observable;

	var zenObservable = Observable_1.Observable;

	/* tslint:disable */
	var Observable$1 = zenObservable;

	var __assign = (undefined && undefined.__assign) || function () {
	    __assign = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign.apply(this, arguments);
	};

	var __assign$1 = (undefined && undefined.__assign) || function () {
	    __assign$1 = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign$1.apply(this, arguments);
	};

	function getOperationName(doc) {
	    return (doc.definitions
	        .filter(function (definition) {
	        return definition.kind === 'OperationDefinition' && definition.name;
	    })
	        .map(function (x) { return x.name.value; })[0] || null);
	}

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Used to print values in error messages.
	 */
	function inspect(value) {
	  switch (_typeof(value)) {
	    case 'string':
	      return JSON.stringify(value);

	    case 'function':
	      return value.name ? "[function ".concat(value.name, "]") : '[function]';

	    case 'object':
	      if (value) {
	        if (typeof value.inspect === 'function') {
	          return value.inspect();
	        } else if (Array.isArray(value)) {
	          return '[' + value.map(inspect).join(', ') + ']';
	        }

	        var properties = Object.keys(value).map(function (k) {
	          return "".concat(k, ": ").concat(inspect(value[k]));
	        }).join(', ');
	        return properties ? '{ ' + properties + ' }' : '{}';
	      }

	      return String(value);

	    default:
	      return String(value);
	  }
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */
	var QueryDocumentKeys = {
	  Name: [],
	  Document: ['definitions'],
	  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
	  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
	  Variable: ['name'],
	  SelectionSet: ['selections'],
	  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
	  Argument: ['name', 'value'],
	  FragmentSpread: ['name', 'directives'],
	  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
	  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
	  // or removed in the future.
	  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
	  IntValue: [],
	  FloatValue: [],
	  StringValue: [],
	  BooleanValue: [],
	  NullValue: [],
	  EnumValue: [],
	  ListValue: ['values'],
	  ObjectValue: ['fields'],
	  ObjectField: ['name', 'value'],
	  Directive: ['name', 'arguments'],
	  NamedType: ['name'],
	  ListType: ['type'],
	  NonNullType: ['type'],
	  SchemaDefinition: ['directives', 'operationTypes'],
	  OperationTypeDefinition: ['type'],
	  ScalarTypeDefinition: ['description', 'name', 'directives'],
	  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
	  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
	  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
	  InterfaceTypeDefinition: ['description', 'name', 'directives', 'fields'],
	  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
	  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
	  EnumValueDefinition: ['description', 'name', 'directives'],
	  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
	  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
	  SchemaExtension: ['directives', 'operationTypes'],
	  ScalarTypeExtension: ['name', 'directives'],
	  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
	  InterfaceTypeExtension: ['name', 'directives', 'fields'],
	  UnionTypeExtension: ['name', 'directives', 'types'],
	  EnumTypeExtension: ['name', 'directives', 'values'],
	  InputObjectTypeExtension: ['name', 'directives', 'fields']
	};
	var BREAK = {};
	/**
	 * visit() will walk through an AST using a depth first traversal, calling
	 * the visitor's enter function at each node in the traversal, and calling the
	 * leave function after visiting that node and all of its child nodes.
	 *
	 * By returning different values from the enter and leave functions, the
	 * behavior of the visitor can be altered, including skipping over a sub-tree of
	 * the AST (by returning false), editing the AST by returning a value or null
	 * to remove the value, or to stop the whole traversal by returning BREAK.
	 *
	 * When using visit() to edit an AST, the original AST will not be modified, and
	 * a new version of the AST with the changes applied will be returned from the
	 * visit function.
	 *
	 *     const editedAST = visit(ast, {
	 *       enter(node, key, parent, path, ancestors) {
	 *         // @return
	 *         //   undefined: no action
	 *         //   false: skip visiting this node
	 *         //   visitor.BREAK: stop visiting altogether
	 *         //   null: delete this node
	 *         //   any value: replace this node with the returned value
	 *       },
	 *       leave(node, key, parent, path, ancestors) {
	 *         // @return
	 *         //   undefined: no action
	 *         //   false: no action
	 *         //   visitor.BREAK: stop visiting altogether
	 *         //   null: delete this node
	 *         //   any value: replace this node with the returned value
	 *       }
	 *     });
	 *
	 * Alternatively to providing enter() and leave() functions, a visitor can
	 * instead provide functions named the same as the kinds of AST nodes, or
	 * enter/leave visitors at a named key, leading to four permutations of
	 * visitor API:
	 *
	 * 1) Named visitors triggered when entering a node a specific kind.
	 *
	 *     visit(ast, {
	 *       Kind(node) {
	 *         // enter the "Kind" node
	 *       }
	 *     })
	 *
	 * 2) Named visitors that trigger upon entering and leaving a node of
	 *    a specific kind.
	 *
	 *     visit(ast, {
	 *       Kind: {
	 *         enter(node) {
	 *           // enter the "Kind" node
	 *         }
	 *         leave(node) {
	 *           // leave the "Kind" node
	 *         }
	 *       }
	 *     })
	 *
	 * 3) Generic visitors that trigger upon entering and leaving any node.
	 *
	 *     visit(ast, {
	 *       enter(node) {
	 *         // enter any node
	 *       },
	 *       leave(node) {
	 *         // leave any node
	 *       }
	 *     })
	 *
	 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
	 *
	 *     visit(ast, {
	 *       enter: {
	 *         Kind(node) {
	 *           // enter the "Kind" node
	 *         }
	 *       },
	 *       leave: {
	 *         Kind(node) {
	 *           // leave the "Kind" node
	 *         }
	 *       }
	 *     })
	 */

	function visit(root, visitor) {
	  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

	  /* eslint-disable no-undef-init */
	  var stack = undefined;
	  var inArray = Array.isArray(root);
	  var keys = [root];
	  var index = -1;
	  var edits = [];
	  var node = undefined;
	  var key = undefined;
	  var parent = undefined;
	  var path = [];
	  var ancestors = [];
	  var newRoot = root;
	  /* eslint-enable no-undef-init */

	  do {
	    index++;
	    var isLeaving = index === keys.length;
	    var isEdited = isLeaving && edits.length !== 0;

	    if (isLeaving) {
	      key = ancestors.length === 0 ? undefined : path[path.length - 1];
	      node = parent;
	      parent = ancestors.pop();

	      if (isEdited) {
	        if (inArray) {
	          node = node.slice();
	        } else {
	          var clone = {};

	          for (var k in node) {
	            if (node.hasOwnProperty(k)) {
	              clone[k] = node[k];
	            }
	          }

	          node = clone;
	        }

	        var editOffset = 0;

	        for (var ii = 0; ii < edits.length; ii++) {
	          var editKey = edits[ii][0];
	          var editValue = edits[ii][1];

	          if (inArray) {
	            editKey -= editOffset;
	          }

	          if (inArray && editValue === null) {
	            node.splice(editKey, 1);
	            editOffset++;
	          } else {
	            node[editKey] = editValue;
	          }
	        }
	      }

	      index = stack.index;
	      keys = stack.keys;
	      edits = stack.edits;
	      inArray = stack.inArray;
	      stack = stack.prev;
	    } else {
	      key = parent ? inArray ? index : keys[index] : undefined;
	      node = parent ? parent[key] : newRoot;

	      if (node === null || node === undefined) {
	        continue;
	      }

	      if (parent) {
	        path.push(key);
	      }
	    }

	    var result = void 0;

	    if (!Array.isArray(node)) {
	      if (!isNode(node)) {
	        throw new Error('Invalid AST Node: ' + inspect(node));
	      }

	      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

	      if (visitFn) {
	        result = visitFn.call(visitor, node, key, parent, path, ancestors);

	        if (result === BREAK) {
	          break;
	        }

	        if (result === false) {
	          if (!isLeaving) {
	            path.pop();
	            continue;
	          }
	        } else if (result !== undefined) {
	          edits.push([key, result]);

	          if (!isLeaving) {
	            if (isNode(result)) {
	              node = result;
	            } else {
	              path.pop();
	              continue;
	            }
	          }
	        }
	      }
	    }

	    if (result === undefined && isEdited) {
	      edits.push([key, node]);
	    }

	    if (isLeaving) {
	      path.pop();
	    } else {
	      stack = {
	        inArray: inArray,
	        index: index,
	        keys: keys,
	        edits: edits,
	        prev: stack
	      };
	      inArray = Array.isArray(node);
	      keys = inArray ? node : visitorKeys[node.kind] || [];
	      index = -1;
	      edits = [];

	      if (parent) {
	        ancestors.push(parent);
	      }

	      parent = node;
	    }
	  } while (stack !== undefined);

	  if (edits.length !== 0) {
	    newRoot = edits[edits.length - 1][1];
	  }

	  return newRoot;
	}

	function isNode(maybeNode) {
	  return Boolean(maybeNode && typeof maybeNode.kind === 'string');
	}
	/**
	 * Creates a new visitor instance which maintains a provided TypeInfo instance
	 * along with visiting visitor.
	 */

	function visitWithTypeInfo(typeInfo, visitor) {
	  return {
	    enter: function enter(node) {
	      typeInfo.enter(node);
	      var fn = getVisitFn(visitor, node.kind,
	      /* isLeaving */
	      false);

	      if (fn) {
	        var result = fn.apply(visitor, arguments);

	        if (result !== undefined) {
	          typeInfo.leave(node);

	          if (isNode(result)) {
	            typeInfo.enter(result);
	          }
	        }

	        return result;
	      }
	    },
	    leave: function leave(node) {
	      var fn = getVisitFn(visitor, node.kind,
	      /* isLeaving */
	      true);
	      var result;

	      if (fn) {
	        result = fn.apply(visitor, arguments);
	      }

	      typeInfo.leave(node);
	      return result;
	    }
	  };
	}
	/**
	 * Given a visitor instance, if it is leaving or not, and a node kind, return
	 * the function the visitor runtime should call.
	 */

	function getVisitFn(visitor, kind, isLeaving) {
	  var kindVisitor = visitor[kind];

	  if (kindVisitor) {
	    if (!isLeaving && typeof kindVisitor === 'function') {
	      // { Kind() {} }
	      return kindVisitor;
	    }

	    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

	    if (typeof kindSpecificVisitor === 'function') {
	      // { Kind: { enter() {}, leave() {} } }
	      return kindSpecificVisitor;
	    }
	  } else {
	    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

	    if (specificVisitor) {
	      if (typeof specificVisitor === 'function') {
	        // { enter() {}, leave() {} }
	        return specificVisitor;
	      }

	      var specificKindVisitor = specificVisitor[kind];

	      if (typeof specificKindVisitor === 'function') {
	        // { enter: { Kind() {} }, leave: { Kind() {} } }
	        return specificKindVisitor;
	      }
	    }
	  }
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	/**
	 * Converts an AST into a string, using one set of reasonable
	 * formatting rules.
	 */

	function print(ast) {
	  return visit(ast, {
	    leave: printDocASTReducer
	  });
	}
	var printDocASTReducer = {
	  Name: function Name(node) {
	    return node.value;
	  },
	  Variable: function Variable(node) {
	    return '$' + node.name;
	  },
	  // Document
	  Document: function Document(node) {
	    return join(node.definitions, '\n\n') + '\n';
	  },
	  OperationDefinition: function OperationDefinition(node) {
	    var op = node.operation;
	    var name = node.name;
	    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
	    var directives = join(node.directives, ' ');
	    var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
	    // the query short form.

	    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
	  },
	  VariableDefinition: function VariableDefinition(_ref) {
	    var variable = _ref.variable,
	        type = _ref.type,
	        defaultValue = _ref.defaultValue,
	        directives = _ref.directives;
	    return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
	  },
	  SelectionSet: function SelectionSet(_ref2) {
	    var selections = _ref2.selections;
	    return block(selections);
	  },
	  Field: function Field(_ref3) {
	    var alias = _ref3.alias,
	        name = _ref3.name,
	        args = _ref3.arguments,
	        directives = _ref3.directives,
	        selectionSet = _ref3.selectionSet;
	    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
	  },
	  Argument: function Argument(_ref4) {
	    var name = _ref4.name,
	        value = _ref4.value;
	    return name + ': ' + value;
	  },
	  // Fragments
	  FragmentSpread: function FragmentSpread(_ref5) {
	    var name = _ref5.name,
	        directives = _ref5.directives;
	    return '...' + name + wrap(' ', join(directives, ' '));
	  },
	  InlineFragment: function InlineFragment(_ref6) {
	    var typeCondition = _ref6.typeCondition,
	        directives = _ref6.directives,
	        selectionSet = _ref6.selectionSet;
	    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
	  },
	  FragmentDefinition: function FragmentDefinition(_ref7) {
	    var name = _ref7.name,
	        typeCondition = _ref7.typeCondition,
	        variableDefinitions = _ref7.variableDefinitions,
	        directives = _ref7.directives,
	        selectionSet = _ref7.selectionSet;
	    return (// Note: fragment variable definitions are experimental and may be changed
	      // or removed in the future.
	      "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
	    );
	  },
	  // Value
	  IntValue: function IntValue(_ref8) {
	    var value = _ref8.value;
	    return value;
	  },
	  FloatValue: function FloatValue(_ref9) {
	    var value = _ref9.value;
	    return value;
	  },
	  StringValue: function StringValue(_ref10, key) {
	    var value = _ref10.value,
	        isBlockString = _ref10.block;
	    return isBlockString ? printBlockString(value, key === 'description') : JSON.stringify(value);
	  },
	  BooleanValue: function BooleanValue(_ref11) {
	    var value = _ref11.value;
	    return value ? 'true' : 'false';
	  },
	  NullValue: function NullValue() {
	    return 'null';
	  },
	  EnumValue: function EnumValue(_ref12) {
	    var value = _ref12.value;
	    return value;
	  },
	  ListValue: function ListValue(_ref13) {
	    var values = _ref13.values;
	    return '[' + join(values, ', ') + ']';
	  },
	  ObjectValue: function ObjectValue(_ref14) {
	    var fields = _ref14.fields;
	    return '{' + join(fields, ', ') + '}';
	  },
	  ObjectField: function ObjectField(_ref15) {
	    var name = _ref15.name,
	        value = _ref15.value;
	    return name + ': ' + value;
	  },
	  // Directive
	  Directive: function Directive(_ref16) {
	    var name = _ref16.name,
	        args = _ref16.arguments;
	    return '@' + name + wrap('(', join(args, ', '), ')');
	  },
	  // Type
	  NamedType: function NamedType(_ref17) {
	    var name = _ref17.name;
	    return name;
	  },
	  ListType: function ListType(_ref18) {
	    var type = _ref18.type;
	    return '[' + type + ']';
	  },
	  NonNullType: function NonNullType(_ref19) {
	    var type = _ref19.type;
	    return type + '!';
	  },
	  // Type System Definitions
	  SchemaDefinition: function SchemaDefinition(_ref20) {
	    var directives = _ref20.directives,
	        operationTypes = _ref20.operationTypes;
	    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
	  },
	  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
	    var operation = _ref21.operation,
	        type = _ref21.type;
	    return operation + ': ' + type;
	  },
	  ScalarTypeDefinition: addDescription(function (_ref22) {
	    var name = _ref22.name,
	        directives = _ref22.directives;
	    return join(['scalar', name, join(directives, ' ')], ' ');
	  }),
	  ObjectTypeDefinition: addDescription(function (_ref23) {
	    var name = _ref23.name,
	        interfaces = _ref23.interfaces,
	        directives = _ref23.directives,
	        fields = _ref23.fields;
	    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
	  }),
	  FieldDefinition: addDescription(function (_ref24) {
	    var name = _ref24.name,
	        args = _ref24.arguments,
	        type = _ref24.type,
	        directives = _ref24.directives;
	    return name + (args.every(function (arg) {
	      return arg.indexOf('\n') === -1;
	    }) ? wrap('(', join(args, ', '), ')') : wrap('(\n', indent(join(args, '\n')), '\n)')) + ': ' + type + wrap(' ', join(directives, ' '));
	  }),
	  InputValueDefinition: addDescription(function (_ref25) {
	    var name = _ref25.name,
	        type = _ref25.type,
	        defaultValue = _ref25.defaultValue,
	        directives = _ref25.directives;
	    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
	  }),
	  InterfaceTypeDefinition: addDescription(function (_ref26) {
	    var name = _ref26.name,
	        directives = _ref26.directives,
	        fields = _ref26.fields;
	    return join(['interface', name, join(directives, ' '), block(fields)], ' ');
	  }),
	  UnionTypeDefinition: addDescription(function (_ref27) {
	    var name = _ref27.name,
	        directives = _ref27.directives,
	        types = _ref27.types;
	    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
	  }),
	  EnumTypeDefinition: addDescription(function (_ref28) {
	    var name = _ref28.name,
	        directives = _ref28.directives,
	        values = _ref28.values;
	    return join(['enum', name, join(directives, ' '), block(values)], ' ');
	  }),
	  EnumValueDefinition: addDescription(function (_ref29) {
	    var name = _ref29.name,
	        directives = _ref29.directives;
	    return join([name, join(directives, ' ')], ' ');
	  }),
	  InputObjectTypeDefinition: addDescription(function (_ref30) {
	    var name = _ref30.name,
	        directives = _ref30.directives,
	        fields = _ref30.fields;
	    return join(['input', name, join(directives, ' '), block(fields)], ' ');
	  }),
	  DirectiveDefinition: addDescription(function (_ref31) {
	    var name = _ref31.name,
	        args = _ref31.arguments,
	        locations = _ref31.locations;
	    return 'directive @' + name + (args.every(function (arg) {
	      return arg.indexOf('\n') === -1;
	    }) ? wrap('(', join(args, ', '), ')') : wrap('(\n', indent(join(args, '\n')), '\n)')) + ' on ' + join(locations, ' | ');
	  }),
	  SchemaExtension: function SchemaExtension(_ref32) {
	    var directives = _ref32.directives,
	        operationTypes = _ref32.operationTypes;
	    return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
	  },
	  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
	    var name = _ref33.name,
	        directives = _ref33.directives;
	    return join(['extend scalar', name, join(directives, ' ')], ' ');
	  },
	  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
	    var name = _ref34.name,
	        interfaces = _ref34.interfaces,
	        directives = _ref34.directives,
	        fields = _ref34.fields;
	    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
	  },
	  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
	    var name = _ref35.name,
	        directives = _ref35.directives,
	        fields = _ref35.fields;
	    return join(['extend interface', name, join(directives, ' '), block(fields)], ' ');
	  },
	  UnionTypeExtension: function UnionTypeExtension(_ref36) {
	    var name = _ref36.name,
	        directives = _ref36.directives,
	        types = _ref36.types;
	    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
	  },
	  EnumTypeExtension: function EnumTypeExtension(_ref37) {
	    var name = _ref37.name,
	        directives = _ref37.directives,
	        values = _ref37.values;
	    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
	  },
	  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
	    var name = _ref38.name,
	        directives = _ref38.directives,
	        fields = _ref38.fields;
	    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
	  }
	};

	function addDescription(cb) {
	  return function (node) {
	    return join([node.description, cb(node)], '\n');
	  };
	}
	/**
	 * Given maybeArray, print an empty string if it is null or empty, otherwise
	 * print all items together separated by separator if provided
	 */


	function join(maybeArray, separator) {
	  return maybeArray ? maybeArray.filter(function (x) {
	    return x;
	  }).join(separator || '') : '';
	}
	/**
	 * Given array, print each item on its own line, wrapped in an
	 * indented "{ }" block.
	 */


	function block(array) {
	  return array && array.length !== 0 ? '{\n' + indent(join(array, '\n')) + '\n}' : '';
	}
	/**
	 * If maybeString is not null or empty, then wrap with start and end, otherwise
	 * print an empty string.
	 */


	function wrap(start, maybeString, end) {
	  return maybeString ? start + maybeString + (end || '') : '';
	}

	function indent(maybeString) {
	  return maybeString && '  ' + maybeString.replace(/\n/g, '\n  ');
	}
	/**
	 * Print a block string in the indented block form by adding a leading and
	 * trailing blank line. However, if a block string starts with whitespace and is
	 * a single-line, adding a leading blank line would strip that whitespace.
	 */


	function printBlockString(value, isDescription) {
	  var escaped = value.replace(/"""/g, '\\"""');
	  return (value[0] === ' ' || value[0] === '\t') && value.indexOf('\n') === -1 ? "\"\"\"".concat(escaped.replace(/"$/, '"\n'), "\"\"\"") : "\"\"\"\n".concat(isDescription ? escaped : indent(escaped), "\n\"\"\"");
	}

	var __extends = (undefined && undefined.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign$2 = (undefined && undefined.__assign) || function () {
	    __assign$2 = Object.assign || function(t) {
	        for (var s, i = 1, n = arguments.length; i < n; i++) {
	            s = arguments[i];
	            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	        }
	        return t;
	    };
	    return __assign$2.apply(this, arguments);
	};
	function validateOperation(operation) {
	    var OPERATION_FIELDS = [
	        'query',
	        'operationName',
	        'variables',
	        'extensions',
	        'context',
	    ];
	    for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
	        var key = _a[_i];
	        if (OPERATION_FIELDS.indexOf(key) < 0) {
	            throw new Error("illegal argument: " + key);
	        }
	    }
	    return operation;
	}
	var LinkError = /** @class */ (function (_super) {
	    __extends(LinkError, _super);
	    function LinkError(message, link) {
	        var _this = _super.call(this, message) || this;
	        _this.link = link;
	        return _this;
	    }
	    return LinkError;
	}(Error));
	function isTerminating(link) {
	    return link.request.length <= 1;
	}
	function transformOperation(operation) {
	    var transformedOperation = {
	        variables: operation.variables || {},
	        extensions: operation.extensions || {},
	        operationName: operation.operationName,
	        query: operation.query,
	    };
	    // best guess at an operation name
	    if (!transformedOperation.operationName) {
	        transformedOperation.operationName =
	            typeof transformedOperation.query !== 'string'
	                ? getOperationName(transformedOperation.query)
	                : '';
	    }
	    return transformedOperation;
	}
	function createOperation(starting, operation) {
	    var context = __assign$2({}, starting);
	    var setContext = function (next) {
	        if (typeof next === 'function') {
	            context = __assign$2({}, context, next(context));
	        }
	        else {
	            context = __assign$2({}, context, next);
	        }
	    };
	    var getContext = function () { return (__assign$2({}, context)); };
	    Object.defineProperty(operation, 'setContext', {
	        enumerable: false,
	        value: setContext,
	    });
	    Object.defineProperty(operation, 'getContext', {
	        enumerable: false,
	        value: getContext,
	    });
	    Object.defineProperty(operation, 'toKey', {
	        enumerable: false,
	        value: function () { return getKey(operation); },
	    });
	    return operation;
	}
	function getKey(operation) {
	    // XXX we're assuming here that variables will be serialized in the same order.
	    // that might not always be true
	    return print(operation.query) + "|" + JSON.stringify(operation.variables) + "|" + operation.operationName;
	}

	var passthrough = function (op, forward) { return (forward ? forward(op) : Observable$1.of()); };
	var toLink = function (handler) {
	    return typeof handler === 'function' ? new ApolloLink(handler) : handler;
	};
	var empty = function () {
	    return new ApolloLink(function (op, forward) { return Observable$1.of(); });
	};
	var from = function (links) {
	    if (links.length === 0)
	        return empty();
	    return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
	};
	var split = function (test, left, right) {
	    if (right === void 0) { right = new ApolloLink(passthrough); }
	    var leftLink = toLink(left);
	    var rightLink = toLink(right);
	    if (isTerminating(leftLink) && isTerminating(rightLink)) {
	        return new ApolloLink(function (operation) {
	            return test(operation)
	                ? leftLink.request(operation) || Observable$1.of()
	                : rightLink.request(operation) || Observable$1.of();
	        });
	    }
	    else {
	        return new ApolloLink(function (operation, forward) {
	            return test(operation)
	                ? leftLink.request(operation, forward) || Observable$1.of()
	                : rightLink.request(operation, forward) || Observable$1.of();
	        });
	    }
	};
	// join two Links together
	var concat = function (first, second) {
	    var firstLink = toLink(first);
	    if (isTerminating(firstLink)) {
	        console.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
	        return firstLink;
	    }
	    var nextLink = toLink(second);
	    if (isTerminating(nextLink)) {
	        return new ApolloLink(function (operation) {
	            return firstLink.request(operation, function (op) { return nextLink.request(op) || Observable$1.of(); }) || Observable$1.of();
	        });
	    }
	    else {
	        return new ApolloLink(function (operation, forward) {
	            return (firstLink.request(operation, function (op) {
	                return nextLink.request(op, forward) || Observable$1.of();
	            }) || Observable$1.of());
	        });
	    }
	};
	var ApolloLink = /** @class */ (function () {
	    function ApolloLink(request) {
	        if (request)
	            this.request = request;
	    }
	    ApolloLink.prototype.split = function (test, left, right) {
	        if (right === void 0) { right = new ApolloLink(passthrough); }
	        return this.concat(split(test, left, right));
	    };
	    ApolloLink.prototype.concat = function (next) {
	        return concat(this, next);
	    };
	    ApolloLink.prototype.request = function (operation, forward) {
	        throw new Error('request is not implemented');
	    };
	    ApolloLink.empty = empty;
	    ApolloLink.from = from;
	    ApolloLink.split = split;
	    ApolloLink.execute = execute;
	    return ApolloLink;
	}());
	function execute(link, operation) {
	    return (link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable$1.of());
	}

	var toString$1 = {}.toString;

	var _cof = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $indexOf = _arrayIncludes(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find$1 = _arrayMethods(6);
	var KEY$1 = 'findIndex';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	_export(_export.P + _export.F * forced$1, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators = {};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$1 = _global.document;
	var _html = document$1 && document$1.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR$1 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	    _iterators[NAME] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	_export(_export.P + _export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var dP$1 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// 19.2.4.2 name
	NAME$1 in FProto || _descriptors && dP$1(FProto, NAME$1, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var newArrowCheck$1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (innerThis, boundThis) {
	  if (innerThis !== boundThis) {
	    throw new TypeError("Cannot instantiate an arrow function");
	  }
	};
	});

	var _newArrowCheck$1 = unwrapExports(newArrowCheck$1);

	var Fun = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flip = flip;
	exports.constant = constant;
	exports.on = on;
	exports.compose = compose;
	exports.pipe = pipe;
	exports.curry = curry;
	// eslint-disable-line no-redeclare

	// Flips the order of the arguments to a function of two arguments.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	function flip(f) {
	  return function (b, a) {
	    return f(a, b);
	  };
	}

	// Returns its first argument and ignores its second.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	function constant(a) {
	  return function () {
	    return a;
	  };
	}

	// The `on` function is used to change the domain of a binary operator.
	function on(o, f) {
	  return function (x, y) {
	    return o(f(x), f(y));
	  };
	}

	function compose() {
	  var _this = this;

	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i = len; _i > -1; _i--) {
	      y = fns[_i].call(_this, y);
	    }
	    return y;
	  };
	}

	function pipe() {
	  var _this2 = this;

	  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fns[_key2] = arguments[_key2];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i2 = 0; _i2 <= len; _i2++) {
	      y = fns[_i2].call(_this2, y);
	    }
	    return y;
	  };
	}

	function curried(f, length, acc) {
	  return function () {
	    var combined = acc.concat(Array.prototype.slice.call(arguments));
	    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
	  };
	}

	function curry(f) {
	  // eslint-disable-line no-redeclare
	  return curried(f, f.length, []);
	}
	});

	unwrapExports(Fun);
	var Fun_1 = Fun.flip;
	var Fun_2 = Fun.constant;
	var Fun_3 = Fun.on;
	var Fun_4 = Fun.compose;
	var Fun_5 = Fun.pipe;
	var Fun_6 = Fun.curry;

	// 7.1.4 ToInteger
	var ceil$1 = Math.ceil;
	var floor$1 = Math.floor;
	var _toInteger$1 = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined$1 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined$1(that));
	    var i = _toInteger$1(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _library$1 = true;

	var _global$1 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core$1 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$1.version;

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$2 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject$1(document$2) && _isObject$1(document$2.createElement);
	var _domCreate$1 = function (it) {
	  return is$1 ? document$2.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$2 = Object.defineProperty;

	var f$1 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) try {
	    return dP$2(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$1 = {
		f: f$1
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var PROTOTYPE$2 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var IS_WRAP = type & $export$1.W;
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$2];
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$2];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx$1(out, _global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE$2] = C[PROTOTYPE$2];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export$1.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$1 = $export$1;

	var _redefine$1 = _hide$1;

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var _iterators$1 = {};

	var toString$2 = {}.toString;

	var _cof$1 = function (it) {
	  return toString$2.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof$1(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject$1 = function (it) {
	  return _iobject$1(_defined$1(it));
	};

	// 7.1.15 ToLength

	var min$2 = Math.min;
	var _toLength$1 = function (it) {
	  return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max$1 = Math.max;
	var min$3 = Math.min;
	var _toAbsoluteIndex$1 = function (index, length) {
	  index = _toInteger$1(index);
	  return index < 0 ? max$1(index + length, 0) : min$3(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject$1($this);
	    var length = _toLength$1(O.length);
	    var index = _toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var SHARED = '__core-js_shared__';
	var store = _global$1[SHARED] || (_global$1[SHARED] = {});
	var _shared$1 = function (key) {
	  return store[key] || (store[key] = {});
	};

	var id$1 = 0;
	var px$1 = Math.random();
	var _uid$1 = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px$1).toString(36));
	};

	var shared$1 = _shared$1('keys');

	var _sharedKey$1 = function (key) {
	  return shared$1[key] || (shared$1[key] = _uid$1(key));
	};

	var arrayIndexOf$1 = _arrayIncludes$1(false);
	var IE_PROTO$3 = _sharedKey$1('IE_PROTO');

	var _objectKeysInternal$1 = function (object, names) {
	  var O = _toIobject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$3) _has$1(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has$1(O, key = names[i++])) {
	    ~arrayIndexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys$1 = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys$1 = Object.keys || function keys(O) {
	  return _objectKeysInternal$1(O, _enumBugKeys$1);
	};

	var _objectDps$1 = _descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject$1(O);
	  var keys = _objectKeys$1(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp$1.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$3 = _global$1.document;
	var _html$1 = document$3 && document$3.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$4 = _sharedKey$1('IE_PROTO');
	var Empty$1 = function () { /* empty */ };
	var PROTOTYPE$3 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict$1 = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate$1('iframe');
	  var i = _enumBugKeys$1.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html$1.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict$1 = iframeDocument.F;
	  while (i--) delete createDict$1[PROTOTYPE$3][_enumBugKeys$1[i]];
	  return createDict$1();
	};

	var _objectCreate$1 = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty$1[PROTOTYPE$3] = _anObject$1(O);
	    result = new Empty$1();
	    Empty$1[PROTOTYPE$3] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$4] = O;
	  } else result = createDict$1();
	  return Properties === undefined ? result : _objectDps$1(result, Properties);
	};

	var _wks$1 = createCommonjsModule(function (module) {
	var store = _shared$1('wks');

	var Symbol = _global$1.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid$1)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def$1 = _objectDp$1.f;

	var TAG$1 = _wks$1('toStringTag');

	var _setToStringTag$1 = function (it, tag, stat) {
	  if (it && !_has$1(it = stat ? it : it.prototype, TAG$1)) def$1(it, TAG$1, { configurable: true, value: tag });
	};

	var IteratorPrototype$1 = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide$1(IteratorPrototype$1, _wks$1('iterator'), function () { return this; });

	var _iterCreate$1 = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate$1(IteratorPrototype$1, { next: _propertyDesc$1(1, next) });
	  _setToStringTag$1(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject$1 = function (it) {
	  return Object(_defined$1(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$5 = _sharedKey$1('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo$1 = Object.getPrototypeOf || function (O) {
	  O = _toObject$1(O);
	  if (_has$1(O, IE_PROTO$5)) return O[IE_PROTO$5];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto$1 : null;
	};

	var ITERATOR$2 = _wks$1('iterator');
	var BUGGY$1 = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR$1 = '@@iterator';
	var KEYS$1 = 'keys';
	var VALUES$1 = 'values';

	var returnThis$1 = function () { return this; };

	var _iterDefine$1 = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate$1(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY$1 && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS$1: return function keys() { return new Constructor(this, kind); };
	      case VALUES$1: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES$1;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$2] || proto[FF_ITERATOR$1] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo$1($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag$1(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library$1 && !_has$1(IteratorPrototype, ITERATOR$2)) _hide$1(IteratorPrototype, ITERATOR$2, returnThis$1);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES$1) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library$1 || FORCED) && (BUGGY$1 || VALUES_BUG || !proto[ITERATOR$2])) {
	    _hide$1(proto, ITERATOR$2, $default);
	  }
	  // Plug for library
	  _iterators$1[NAME] = $default;
	  _iterators$1[TAG] = returnThis$1;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES$1),
	      keys: IS_SET ? $default : getMethod(KEYS$1),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine$1(proto, key, methods[key]);
	    } else _export$1(_export$1.P + _export$1.F * (BUGGY$1 || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine$1(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _iterStep$1 = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator$1 = _iterDefine$1(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject$1(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep$1(1);
	  }
	  if (kind == 'keys') return _iterStep$1(0, index);
	  if (kind == 'values') return _iterStep$1(0, O[index]);
	  return _iterStep$1(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators$1.Arguments = _iterators$1.Array;

	var TO_STRING_TAG$1 = _wks$1('toStringTag');

	var DOMIterables$1 = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i$1 = 0; i$1 < DOMIterables$1.length; i$1++) {
	  var NAME$2 = DOMIterables$1[i$1];
	  var Collection$1 = _global$1[NAME$2];
	  var proto$1 = Collection$1 && Collection$1.prototype;
	  if (proto$1 && !proto$1[TO_STRING_TAG$1]) _hide$1(proto$1, TO_STRING_TAG$1, NAME$2);
	  _iterators$1[NAME$2] = _iterators$1.Array;
	}

	var f$2 = _wks$1;

	var _wksExt = {
		f: f$2
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	unwrapExports(iterator$1);

	var _meta = createCommonjsModule(function (module) {
	var META = _uid$1('meta');


	var setDesc = _objectDp$1.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails$1(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has$1(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has$1(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has$1(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty = _objectDp$1.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core$1.Symbol || (_core$1.Symbol = {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	var f$3 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$3
	};

	var f$4 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$4
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys$1(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray$1 = Array.isArray || function isArray(arg) {
	  return _cof$1(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys$1.concat('length', 'prototype');

	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal$1(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$5
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$3 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$3.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject$1(it));
	};

	var _objectGopnExt = {
		f: f$6
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$7 = _descriptors$1 ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject$1(O);
	  P = _toPrimitive$1(P, true);
	  if (_ie8DomDefine$1) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has$1(O, P)) return _propertyDesc$1(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$7
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;


















	var gOPD$1 = _objectGopd.f;
	var dP$3 = _objectDp$1.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global$1.Symbol;
	var $JSON = _global$1.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$4 = 'prototype';
	var HIDDEN = _wks$1('_hidden');
	var TO_PRIMITIVE = _wks$1('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared$1('symbol-registry');
	var AllSymbols = _shared$1('symbols');
	var OPSymbols = _shared$1('op-symbols');
	var ObjectProto$2 = Object[PROTOTYPE$4];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global$1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$4] || !QObject[PROTOTYPE$4].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors$1 && _fails$1(function () {
	  return _objectCreate$1(dP$3({}, 'a', {
	    get: function () { return dP$3(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$2, key);
	  if (protoDesc) delete ObjectProto$2[key];
	  dP$3(it, key, D);
	  if (protoDesc && it !== ObjectProto$2) dP$3(ObjectProto$2, key, protoDesc);
	} : dP$3;

	var wrap$1 = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate$1($Symbol[PROTOTYPE$4]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$2) $defineProperty(OPSymbols, key, D);
	  _anObject$1(it);
	  key = _toPrimitive$1(key, true);
	  _anObject$1(D);
	  if (_has$1(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has$1(it, HIDDEN)) dP$3(it, HIDDEN, _propertyDesc$1(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has$1(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate$1(D, { enumerable: _propertyDesc$1(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$3(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject$1(it);
	  var keys = _enumKeys(P = _toIobject$1(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate$1(it) : $defineProperties(_objectCreate$1(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive$1(key, true));
	  if (this === ObjectProto$2 && _has$1(AllSymbols, key) && !_has$1(OPSymbols, key)) return false;
	  return E || !_has$1(this, key) || !_has$1(AllSymbols, key) || _has$1(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject$1(it);
	  key = _toPrimitive$1(key, true);
	  if (it === ObjectProto$2 && _has$1(AllSymbols, key) && !_has$1(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has$1(AllSymbols, key) && !(_has$1(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject$1(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has$1(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$2;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject$1(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has$1(AllSymbols, key = names[i++]) && (IS_OP ? _has$1(ObjectProto$2, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid$1(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$2) $set.call(OPSymbols, value);
	      if (_has$1(this, HIDDEN) && _has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc$1(1, value));
	    };
	    if (_descriptors$1 && setter) setSymbolDesc(ObjectProto$2, tag, { configurable: true, set: $set });
	    return wrap$1(tag);
	  };
	  _redefine$1($Symbol[PROTOTYPE$4], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp$1.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors$1 && !_library$1) {
	    _redefine$1(ObjectProto$2, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap$1(_wks$1(name));
	  };
	}

	_export$1(_export$1.G + _export$1.W + _export$1.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks$1(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys$1(_wks$1.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export$1(_export$1.S + _export$1.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has$1(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export$1(_export$1.S + _export$1.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export$1(_export$1.S + _export$1.F * (!USE_NATIVE || _fails$1(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !_isArray$1(replacer)) replacer = function (key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$4][TO_PRIMITIVE] || _hide$1($Symbol[PROTOTYPE$4], TO_PRIMITIVE, $Symbol[PROTOTYPE$4].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag$1($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag$1(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag$1(_global$1.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core$1.Symbol;

	var symbol$1 = createCommonjsModule(function (module) {
	module.exports = { "default": symbol, __esModule: true };
	});

	var _Symbol = unwrapExports(symbol$1);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol$1);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof$1 = unwrapExports(_typeof_1);

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject$1(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject$1(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$3 = _wks$1('iterator');
	var ArrayProto$1 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators$1.Array === it || ArrayProto$1[ITERATOR$3] === it);
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp$1.f(object, index, _propertyDesc$1(0, value));
	  else object[index] = value;
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$2 = _wks$1('toStringTag');
	// ES3 wrong here
	var ARG = _cof$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$2)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof$1(O)
	    // ES3 arguments fallback
	    : (B = _cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$4 = _wks$1('iterator');

	var core_getIteratorMethod = _core$1.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$4]
	    || it['@@iterator']
	    || _iterators$1[_classof(it)];
	};

	var ITERATOR$5 = _wks$1('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$5]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$5]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$5] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	_export$1(_export$1.S + _export$1.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject$1(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx$1(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength$1(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from_1 = _core$1.Array.from;

	var from_1$1 = createCommonjsModule(function (module) {
	module.exports = { "default": from_1, __esModule: true };
	});

	var _Array$from = unwrapExports(from_1$1);

	var toConsumableArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _from2 = _interopRequireDefault(from_1$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};
	});

	var _toConsumableArray = unwrapExports(toConsumableArray);

	var Fun$2 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flip = flip;
	exports.constant = constant;
	exports.on = on;
	exports.compose = compose;
	exports.pipe = pipe;
	exports.curry = curry;
	// eslint-disable-line no-redeclare

	// Flips the order of the arguments to a function of two arguments.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	function flip(f) {
	  return function (b, a) {
	    return f(a, b);
	  };
	}

	// Returns its first argument and ignores its second.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	function constant(a) {
	  return function () {
	    return a;
	  };
	}

	// The `on` function is used to change the domain of a binary operator.
	function on(o, f) {
	  return function (x, y) {
	    return o(f(x), f(y));
	  };
	}

	function compose() {
	  var _this = this;

	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i = len; _i > -1; _i--) {
	      y = fns[_i].call(_this, y);
	    }
	    return y;
	  };
	}

	function pipe() {
	  var _this2 = this;

	  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fns[_key2] = arguments[_key2];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i2 = 0; _i2 <= len; _i2++) {
	      y = fns[_i2].call(_this2, y);
	    }
	    return y;
	  };
	}

	function curried(f, length, acc) {
	  return function () {
	    var combined = acc.concat(Array.prototype.slice.call(arguments));
	    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
	  };
	}

	function curry(f) {
	  // eslint-disable-line no-redeclare
	  return curried(f, f.length, []);
	}
	});

	unwrapExports(Fun$2);
	var Fun_1$1 = Fun$2.flip;
	var Fun_2$1 = Fun$2.constant;
	var Fun_3$1 = Fun$2.on;
	var Fun_4$1 = Fun$2.compose;
	var Fun_5$1 = Fun$2.pipe;
	var Fun_6$1 = Fun$2.curry;

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails$1(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject$1(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject$1(arguments[index++]);
	    var keys = getSymbols ? _objectKeys$1(S).concat(getSymbols(S)) : _objectKeys$1(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export$1(_export$1.S + _export$1.F, 'Object', { assign: _objectAssign });

	var assign$1 = _core$1.Object.assign;

	var assign$2 = createCommonjsModule(function (module) {
	module.exports = { "default": assign$1, __esModule: true };
	});

	unwrapExports(assign$2);

	var _extends = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _assign2 = _interopRequireDefault(assign$2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};
	});

	var _extends$1 = unwrapExports(_extends);

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core$1.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export$1(_export$1.S + _export$1.F * _fails$1(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys$1(_toObject$1(it));
	  };
	});

	var keys = _core$1.Object.keys;

	var keys$1 = createCommonjsModule(function (module) {
	module.exports = { "default": keys, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$1);

	// 20.1.2.3 Number.isInteger(number)

	var floor$2 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject$1(it) && isFinite(it) && floor$2(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export$1(_export$1.S, 'Number', { isInteger: _isInteger });

	var isInteger = _core$1.Number.isInteger;

	var isInteger$1 = createCommonjsModule(function (module) {
	module.exports = { "default": isInteger, __esModule: true };
	});

	var _Number$isInteger = unwrapExports(isInteger$1);

	var objectWithoutProperties = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};
	});

	var _objectWithoutProperties = unwrapExports(objectWithoutProperties);

	var _this = undefined;

	/**
	 * Returns a new Array with elements appended to the one given.
	 */
	var append = function (elements, array) {
	  _newArrowCheck$1(this, _this);

	  return [].concat(_toConsumableArray(array), _toConsumableArray(elements));
	}.bind(undefined);

	var append$1 = Fun_6$1(append);

	var _this$1 = undefined;

	/**
	 * Returns input if it is an Array or returns a new Array with input inside if
	 * it is not.
	 */
	var convertIfNot = function (input) {
	  _newArrowCheck$1(this, _this$1);

	  return Array.isArray(input) ? input : [input];
	}.bind(undefined);

	var _this$3 = undefined;

	/**
	 * Returns true if given index is the last one or false otherwise.
	 */
	var isLastIndex = function (array, index) {
	  _newArrowCheck$1(this, _this$3);

	  return index === array.length - 1;
	}.bind(undefined);

	var isLastIndex$1 = Fun_6$1(isLastIndex);

	var _this$2 = undefined;

	/**
	 * Returns 0 if current index is the last one, or returns next if it is not.
	 */
	var cycleNext = function (array, currentIndex) {
	  _newArrowCheck$1(this, _this$2);

	  return isLastIndex$1(array, currentIndex) ? 0 : currentIndex + 1;
	}.bind(undefined);

	var cycleNext$1 = Fun_6$1(cycleNext);

	var _this$4 = undefined;

	var getObjectLength = function (object) {
	  _newArrowCheck$1(this, _this$4);

	  return Math.max.apply(Math, _toConsumableArray(_Object$keys(object))) + 1;
	}.bind(undefined);

	/**
	 * Creates a new array using the given object
	 * If all of its entries are array keys.
	 * 
	 * (it could also have a property length with its size)
	 */
	var fromObject = function (object) {
	  _newArrowCheck$1(this, _this$4);

	  return _Array$from("length" in object ? object : _extends$1({}, object, { length: getObjectLength(object) }));
	}.bind(undefined);

	var _this$5 = undefined;

	/**
	 * Returns a new Array with the result of having inserted the given elements at
	 * the specified index.
	 */
	var insert = function (index, elements, array) {
	  _newArrowCheck$1(this, _this$5);

	  return [].concat(_toConsumableArray(array.slice(0, index)), _toConsumableArray(elements), _toConsumableArray(array.slice(index + 1)));
	}.bind(undefined);

	var insert$1 = Fun_6$1(insert);

	var _this$6 = undefined;

	var isIntGreaterThan = function (number, other) {
	  _newArrowCheck$1(this, _this$6);

	  return _Number$isInteger(number) && number >= other;
	}.bind(undefined);

	/**
	 * Returns true if the given string is an Array key or false otherwise.
	 */
	var isKey = function (string) {
	  _newArrowCheck$1(this, _this$6);

	  return isIntGreaterThan(Number(string), 0);
	}.bind(undefined);

	var _this$7 = undefined;

	/**
	 * Returns true if an Array can be created from the given Object, or in other
	 * words, if it has or not a length property, and the rest of its keys are Array
	 * ones.
	 */
	var isPossibleFromObject = function (_ref) {
	  var length = _ref.length,
	      rest = _objectWithoutProperties(_ref, ["length"]);

	  _newArrowCheck$1(this, _this$7);

	  return _Object$keys(rest).every(isKey);
	}.bind(undefined);

	var _this$8 = undefined;

	/**
	 * Returns a new Array with elements prepended to the one given.
	 */
	var prepend = function (elements, array) {
	  _newArrowCheck$1(this, _this$8);

	  return [].concat(_toConsumableArray(elements), _toConsumableArray(array));
	}.bind(undefined);

	var prepend$1 = Fun_6$1(prepend);

	var _this$9 = undefined;

	/**
	 * Reduce the given array applying reduce function only to elements filtered.
	 */
	var reduceIf = function (filter, reduce, resultInitial, array) {
	  _newArrowCheck$1(this, _this$9);

	  return array.reduce(function (result, element, index) {
	    _newArrowCheck$1(this, _this$9);

	    return filter(element, index, result) ? reduce(result, element, index) : result;
	  }.bind(this), resultInitial);
	}.bind(undefined);

	var reduceIf$1 = Fun_6$1(reduceIf);

	var _this$10 = undefined;

	/**
	 * Reduce the given array applying reduce function while shouldProceed function
	 * returns true.
	 */
	var reduceWhile = function (shouldProceed, reduce, resultInitial, array) {
	  _newArrowCheck$1(this, _this$10);

	  var result = resultInitial;

	  array.every(function (element, index) {
	    _newArrowCheck$1(this, _this$10);

	    var proceed = shouldProceed(element, index, result);

	    if (proceed) {
	      result = reduce(result, element, index);
	    }

	    return proceed;
	  }.bind(this));

	  return result;
	}.bind(undefined);

	var reduceWhile$1 = Fun_6$1(reduceWhile);

	var _this$11 = undefined;

	/**
	 * Returns a new Array with the result of having removed the specified amount
	 * (count) of elements at the given index.
	 */
	var remove = function (index, count, array) {
	  _newArrowCheck$1(this, _this$11);

	  return [].concat(_toConsumableArray(array.slice(0, index)), _toConsumableArray(array.slice(index + count)));
	}.bind(undefined);

	var remove$1 = Fun_6$1(remove);

	var _this$12 = undefined;

	/**
	 * Returns a new Array with the given size (count) filled with the specified
	 * element.
	 */
	var repeat = function (count, element) {
	  _newArrowCheck$1(this, _this$12);

	  return [].concat(_toConsumableArray(Array(count))).map(function () {
	    _newArrowCheck$1(this, _this$12);

	    return element;
	  }.bind(this));
	}.bind(undefined);

	var repeat$1 = Fun_6$1(repeat);

	var _this$13 = undefined;

	/**
	 * Returns a new Array with the result of having replaced the elements at the
	 * given index with the ones specified.
	 */
	var replace = function (index, elements, array) {
	  _newArrowCheck$1(this, _this$13);

	  return [].concat(_toConsumableArray(array.slice(0, index)), _toConsumableArray(elements), _toConsumableArray(array.slice(index + elements.length)));
	}.bind(undefined);

	var replace$1 = Fun_6$1(replace);

	var _this$14 = undefined;

	/**
	 * Returns an absolute index from a relative one.
	 * 
	 * Relative indexes differ from absolute ones in that they can be negative and
	 * in those cases it would be as simple as substracting them from the length of
	 * the array from where they belong to obtain their absolute counterparts.
	 */
	var resolveIndex = function (array, relativeIndex) {
	  _newArrowCheck$1(this, _this$14);

	  return relativeIndex < 0 ? array.length - relativeIndex : relativeIndex;
	}.bind(undefined);

	var resolveIndex$1 = Fun_6$1(resolveIndex);

	var fastDeepEqual = function equal(a, b) {
	  if (a === b) return true;

	  var arrA = Array.isArray(a)
	    , arrB = Array.isArray(b)
	    , i;

	  if (arrA && arrB) {
	    if (a.length != b.length) return false;
	    for (i = 0; i < a.length; i++)
	      if (!equal(a[i], b[i])) return false;
	    return true;
	  }

	  if (arrA != arrB) return false;

	  if (a && b && typeof a === 'object' && typeof b === 'object') {
	    var keys = Object.keys(a);
	    if (keys.length !== Object.keys(b).length) return false;

	    var dateA = a instanceof Date
	      , dateB = b instanceof Date;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    if (dateA != dateB) return false;

	    var regexpA = a instanceof RegExp
	      , regexpB = b instanceof RegExp;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    if (regexpA != regexpB) return false;

	    for (i = 0; i < keys.length; i++)
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

	    for (i = 0; i < keys.length; i++)
	      if(!equal(a[keys[i]], b[keys[i]])) return false;

	    return true;
	  }

	  return false;
	};

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export$1(_export$1.S + _export$1.F * !_descriptors$1, 'Object', { defineProperty: _objectDp$1.f });

	var $Object = _core$1.Object;
	var defineProperty$1 = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$2 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty$1, __esModule: true };
	});

	unwrapExports(defineProperty$2);

	var defineProperty$4 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};
	});

	var _defineProperty = unwrapExports(defineProperty$4);

	var ITERATOR$6 = _wks$1('iterator');

	var core_isIterable = _core$1.isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$6] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || _iterators$1.hasOwnProperty(_classof(O));
	};

	var isIterable = core_isIterable;

	var isIterable$1 = createCommonjsModule(function (module) {
	module.exports = { "default": isIterable, __esModule: true };
	});

	unwrapExports(isIterable$1);

	var core_getIterator = _core$1.getIterator = function (it) {
	  var iterFn = core_getIteratorMethod(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return _anObject$1(iterFn.call(it));
	};

	var getIterator = core_getIterator;

	var getIterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getIterator, __esModule: true };
	});

	unwrapExports(getIterator$1);

	var slicedToArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _isIterable3 = _interopRequireDefault(isIterable$1);



	var _getIterator3 = _interopRequireDefault(getIterator$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();
	});

	var _slicedToArray = unwrapExports(slicedToArray);

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject$1(it);
	    var keys = _objectKeys$1(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export$1(_export$1.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core$1.Object.entries;

	var entries$1 = createCommonjsModule(function (module) {
	module.exports = { "default": entries, __esModule: true };
	});

	var _Object$entries = unwrapExports(entries$1);

	var _this$a=void 0,get=function(e,r){return _newArrowCheck$1(this,_this$a),r[e]}.bind(void 0),get$1=Fun_6(get),_this$2$1=void 0,isObject=function(e){return _newArrowCheck$1(this,_this$2$1),null!==e&&"object"===(void 0===e?"undefined":_typeof$1(e))}.bind(void 0),is$2=function(e){return _newArrowCheck$1(this,_this$2$1),Array.isArray(e)||isObject(e)}.bind(void 0),_this$1$1=void 0,getInIfNeeded=function(e,r,t){return _newArrowCheck$1(this,_this$1$1),isLastIndex$1(r,e)?t:getInRecur(e+1,r,t)}.bind(void 0),getNotCompositeErrorMessage=function(e,r,t){return _newArrowCheck$1(this,_this$1$1),"Expected to find a composite at ["+String(r.join(", "))+"]["+String(e)+"], but instead got: "+(void 0===t?"undefined":_typeof$1(t))}.bind(void 0),ensureIsComposite=function(e,r,t){if(_newArrowCheck$1(this,_this$1$1),is$2(t))return t;throw new Error(getNotCompositeErrorMessage(e,r,t))}.bind(void 0),getInRecur=function(e,r,t){return _newArrowCheck$1(this,_this$1$1),void 0===t?void 0:getInIfNeeded(e,r,get$1(r[e],ensureIsComposite(e,r,t)))}.bind(void 0),getIn=function(e,r){return _newArrowCheck$1(this,_this$1$1),0===e.length?void 0:getInRecur(0,e,r)}.bind(void 0),getIn$1=Fun_6(getIn),_this$3$1=void 0,getKeys=function(e){return _newArrowCheck$1(this,_this$3$1),Array.isArray(e)?[].concat(_toConsumableArray(e.keys())):_Object$keys(e)}.bind(void 0),_this$4$1=void 0,hasIn=function(e,r,t){return _newArrowCheck$1(this,_this$4$1),fastDeepEqual(getIn$1(e,t),r)}.bind(void 0),hasIn$1=Fun_6(hasIn),_this$5$1=void 0,hasKey=function(e,r){return _newArrowCheck$1(this,_this$5$1),Object.prototype.hasOwnProperty.call(r,e)}.bind(void 0),hasKey$1=Fun_6(hasKey),_this$6$1=void 0,haveSameProps=function(e,r){_newArrowCheck$1(this,_this$6$1);var t=getKeys(e);return t.length===getKeys(r).length&&t.every(function(t){return _newArrowCheck$1(this,_this$6$1),hasKey$1(t,r)&&get$1(t,e)===get$1(t,r)}.bind(this))}.bind(void 0),haveSameProps$1=Fun_6(haveSameProps),_this$7$1=void 0,isEmpty=function(e){return _newArrowCheck$1(this,_this$7$1),0===getKeys(e).length}.bind(void 0),_this$8$1=void 0,mapObject=function(e,r){return _newArrowCheck$1(this,_this$8$1),_Object$entries(r).reduce(function(t,i){var n=_slicedToArray(i,2),o=n[0],s=n[1];return _newArrowCheck$1(this,_this$8$1),_extends$1({},t,_defineProperty({},o,e(s,o,r)))}.bind(this),{})}.bind(void 0),map=function(e,r){return _newArrowCheck$1(this,_this$8$1),Array.isArray(r)?r.map(e):mapObject(e,r)}.bind(void 0),map$1=Fun_6(map),_this$9$1=void 0,objectRemove=function(e,r){r[e];var t=_objectWithoutProperties(r,[e]);return _newArrowCheck$1(this,_this$9$1),t}.bind(void 0),remove$1$1=function(e,r){return _newArrowCheck$1(this,_this$9$1),Array.isArray(r)?remove$1(e,1,r):objectRemove(e,r)}.bind(void 0),remove$2=Fun_6(remove$1$1),_this$12$1=void 0,shallowCopy=function(e){return _newArrowCheck$1(this,_this$12$1),Array.isArray(e)?[].concat(_toConsumableArray(e)):_extends$1({},e)}.bind(void 0),_this$11$1=void 0,createReduceContext=function(e){_newArrowCheck$1(this,_this$11$1);var r=shallowCopy(e);return {origin:r,current:r,previous:void 0}}.bind(void 0),set=function(e,r,t){return _newArrowCheck$1(this,_this$11$1),t[e]=r,get$1(e,t)}.bind(void 0),updateSet=function(e,r,t,i){return _newArrowCheck$1(this,_this$11$1),_extends$1({},i,{current:set(e[r],t,i.current),previous:i.current})}.bind(void 0),updateRemove=function(e,r,t){_newArrowCheck$1(this,_this$11$1);var i=remove$2(e[r],t.current);return 0===r?_extends$1({},t,{current:i,origin:i}):_extends$1({},t,{previous:set(e[r-1],i,t.previous)})}.bind(void 0),removeAction=_Symbol("composite.updateIn.removeAction"),update=function(e,r,t,i){return _newArrowCheck$1(this,_this$11$1),t===removeAction?updateRemove(e,r,i):updateSet(e,r,t,i)}.bind(void 0),createSupporting=function(e){return _newArrowCheck$1(this,_this$11$1),"number"==typeof e?[]:{}}.bind(void 0),copyOrCreate=function(e,r,t){return _newArrowCheck$1(this,_this$11$1),hasKey$1(e,t)?shallowCopy(get$1(e,t)):createSupporting(r)}.bind(void 0),getNext=function(e,r,t,i){return _newArrowCheck$1(this,_this$11$1),isLastIndex$1(e,t)?r(get$1(e[t],i)):copyOrCreate(e[t],e[t+1],i)}.bind(void 0),getReducer=function(e,r){return _newArrowCheck$1(this,_this$11$1),function(t,i,n){return _newArrowCheck$1(this,_this$11$1),update(e,n,getNext(e,r,n,t.current),t)}.bind(this)}.bind(void 0),updateIn=function(e,r,t){return _newArrowCheck$1(this,_this$11$1),0===e.length?t:e.reduce(getReducer(e,r),createReduceContext(t)).origin}.bind(void 0),updateInCurried=Fun_6(updateIn);updateInCurried.remove=removeAction;var _this$10$1=void 0,remove$3=function(){return _newArrowCheck$1(this,_this$10$1),updateInCurried.remove}.bind(void 0),removeIn=function(e,r){return _newArrowCheck$1(this,_this$10$1),updateInCurried(e,remove$3,r)}.bind(void 0),removeIn$1=Fun_6(removeIn),_this$13$1=void 0,set$1=function(e,r,t){_newArrowCheck$1(this,_this$13$1);var i=shallowCopy(t);return i[e]=r,i}.bind(void 0),set$2=Fun_6(set$1),_this$14$1=void 0,setIn=function(e,r,t){return _newArrowCheck$1(this,_this$14$1),updateInCurried(e,function(){return _newArrowCheck$1(this,_this$14$1),r}.bind(this),t)}.bind(void 0),setIn$1=Fun_6(setIn),_this$15=void 0,xor=function(e,r){return _newArrowCheck$1(this,_this$15),Boolean(Number(e)^Number(r))}.bind(void 0),shallowEqual=function(e,r){return _newArrowCheck$1(this,_this$15),e===r||!xor(Array.isArray(e),Array.isArray(r))&&haveSameProps$1(e,r)}.bind(void 0),shallowEqual$1=Fun_6(shallowEqual),_this$16=void 0,toUndefinedIfEmpty=function(e){return _newArrowCheck$1(this,_this$16),isEmpty(e)?void 0:e}.bind(void 0);

	var phoenix = createCommonjsModule(function (module, exports) {
	!function(e,t){module.exports=t();}(commonjsGlobal,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(t){e.exports=t.Phoenix=n(2);}).call(this,n(1));},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0, eval)("this");}catch(e){"object"==typeof window&&(n=window);}e.exports=n;},function(e,t,n){function i(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(e){return (o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],i=!0,o=!1,r=void 0;try{for(var s,a=e[Symbol.iterator]();!(i=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);i=!0);}catch(e){o=!0,r=e;}finally{try{i||null==a.return||a.return();}finally{if(o)throw r}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);}}function c(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}n.r(t),n.d(t,"Channel",function(){return b}),n.d(t,"Socket",function(){return R}),n.d(t,"LongPoll",function(){return w}),n.d(t,"Ajax",function(){return C}),n.d(t,"Presence",function(){return S});var u="undefined"!=typeof self?self:null,h="undefined"!=typeof window?window:null,l=u||h||void 0,f={connecting:0,open:1,closing:2,closed:3},p=1e4,d={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},v={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},y=[v.close,v.error,v.join,v.reply,v.leave],g={longpoll:"longpoll",websocket:"websocket"},m=function(e){if("function"==typeof e)return e;return function(){return e}},k=function(){function e(t,n,i,o){s(this,e),this.channel=t,this.event=n,this.payload=i||function(){return {}},this.receivedResp=null,this.timeout=o,this.timeoutTimer=null,this.recHooks=[],this.sent=!1;}return c(e,[{key:"resend",value:function(e){this.timeout=e,this.reset(),this.send();}},{key:"send",value:function(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}));}},{key:"receive",value:function(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}},{key:"reset",value:function(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1;}},{key:"matchReceive",value:function(e){var t=e.status,n=e.response;e.ref;this.recHooks.filter(function(e){return e.status===t}).forEach(function(e){return e.callback(n)});}},{key:"cancelRefEvent",value:function(){this.refEvent&&this.channel.off(this.refEvent);}},{key:"cancelTimeout",value:function(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null;}},{key:"startTimeout",value:function(){var e=this;this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,function(t){e.cancelRefEvent(),e.cancelTimeout(),e.receivedResp=t,e.matchReceive(t);}),this.timeoutTimer=setTimeout(function(){e.trigger("timeout",{});},this.timeout);}},{key:"hasReceived",value:function(e){return this.receivedResp&&this.receivedResp.status===e}},{key:"trigger",value:function(e,t){this.channel.trigger(this.refEvent,{status:e,response:t});}}]),e}(),b=function(){function e(t,n,i){var o=this;s(this,e),this.state=d.closed,this.topic=t,this.params=m(n||{}),this.socket=i,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new k(this,v.join,this.params,this.timeout),this.pushBuffer=[],this.rejoinTimer=new T(function(){return o.rejoinUntilConnected()},this.socket.reconnectAfterMs),this.joinPush.receive("ok",function(){o.state=d.joined,o.rejoinTimer.reset(),o.pushBuffer.forEach(function(e){return e.send()}),o.pushBuffer=[];}),this.onClose(function(){o.rejoinTimer.reset(),o.socket.hasLogger()&&o.socket.log("channel","close ".concat(o.topic," ").concat(o.joinRef())),o.state=d.closed,o.socket.remove(o);}),this.onError(function(e){o.isLeaving()||o.isClosed()||(o.socket.hasLogger()&&o.socket.log("channel","error ".concat(o.topic),e),o.state=d.errored,o.rejoinTimer.scheduleTimeout());}),this.joinPush.receive("timeout",function(){o.isJoining()&&(o.socket.hasLogger()&&o.socket.log("channel","timeout ".concat(o.topic," (").concat(o.joinRef(),")"),o.joinPush.timeout),new k(o,v.leave,m({}),o.timeout).send(),o.state=d.errored,o.joinPush.reset(),o.rejoinTimer.scheduleTimeout());}),this.on(v.reply,function(e,t){o.trigger(o.replyEventName(t),e);});}return c(e,[{key:"rejoinUntilConnected",value:function(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this.rejoin();}},{key:"join",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.joinedOnce=!0,this.rejoin(e),this.joinPush}},{key:"onClose",value:function(e){this.on(v.close,e);}},{key:"onError",value:function(e){return this.on(v.error,function(t){return e(t)})}},{key:"on",value:function(e,t){var n=this.bindingRef++;return this.bindings.push({event:e,ref:n,callback:t}),n}},{key:"off",value:function(e,t){this.bindings=this.bindings.filter(function(n){return !(n.event===e&&(void 0===t||t===n.ref))});}},{key:"canPush",value:function(){return this.socket.isConnected()&&this.isJoined()}},{key:"push",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.timeout;if(!this.joinedOnce)throw new Error("tried to push '".concat(e,"' to '").concat(this.topic,"' before joining. Use channel.join() before pushing events"));var i=new k(this,e,function(){return t},n);return this.canPush()?i.send():(i.startTimeout(),this.pushBuffer.push(i)),i}},{key:"leave",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;this.state=d.leaving;var n=function(){e.socket.hasLogger()&&e.socket.log("channel","leave ".concat(e.topic)),e.trigger(v.close,"leave");},i=new k(this,v.leave,m({}),t);return i.receive("ok",function(){return n()}).receive("timeout",function(){return n()}),i.send(),this.canPush()||i.trigger("ok",{}),i}},{key:"onMessage",value:function(e,t,n){return t}},{key:"isLifecycleEvent",value:function(e){return y.indexOf(e)>=0}},{key:"isMember",value:function(e,t,n,i){return this.topic===e&&(!i||i===this.joinRef()||!this.isLifecycleEvent(t)||(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:e,event:t,payload:n,joinRef:i}),!1))}},{key:"joinRef",value:function(){return this.joinPush.ref}},{key:"sendJoin",value:function(e){this.state=d.joining,this.joinPush.resend(e);}},{key:"rejoin",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.timeout;this.isLeaving()||this.sendJoin(e);}},{key:"trigger",value:function(e,t,n,i){var o=this.onMessage(e,t,n,i);if(t&&!o)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");for(var r=0;r<this.bindings.length;r++){var s=this.bindings[r];s.event===e&&s.callback(o,n,i||this.joinRef());}}},{key:"replyEventName",value:function(e){return "chan_reply_".concat(e)}},{key:"isClosed",value:function(){return this.state===d.closed}},{key:"isErrored",value:function(){return this.state===d.errored}},{key:"isJoined",value:function(){return this.state===d.joined}},{key:"isJoining",value:function(){return this.state===d.joining}},{key:"isLeaving",value:function(){return this.state===d.leaving}}]),e}(),j={encode:function(e,t){var n=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(n))},decode:function(e,t){var n=r(JSON.parse(e),5);return t({join_ref:n[0],ref:n[1],topic:n[2],event:n[3],payload:n[4]})}},R=function(){function e(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,e),this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.timeout=i.timeout||p,this.transport=i.transport||l.WebSocket||w,this.defaultEncoder=j.encode,this.defaultDecoder=j.decode,this.transport!==w?(this.encode=i.encode||this.defaultEncoder,this.decode=i.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder),this.heartbeatIntervalMs=i.heartbeatIntervalMs||3e4,this.reconnectAfterMs=i.reconnectAfterMs||function(e){return [1e3,2e3,5e3,1e4][e-1]||1e4},this.logger=i.logger||null,this.longpollerTimeout=i.longpollerTimeout||2e4,this.params=m(i.params||{}),this.endPoint="".concat(t,"/").concat(g.websocket),this.heartbeatTimer=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new T(function(){n.teardown(function(){return n.connect()});},this.reconnectAfterMs);}return c(e,[{key:"protocol",value:function(){return location.protocol.match(/^https/)?"wss":"ws"}},{key:"endPointURL",value:function(){var e=C.appendParams(C.appendParams(this.endPoint,this.params()),{vsn:"2.0.0"});return "/"!==e.charAt(0)?e:"/"===e.charAt(1)?"".concat(this.protocol(),":").concat(e):"".concat(this.protocol(),"://").concat(location.host).concat(e)}},{key:"disconnect",value:function(e,t,n){this.reconnectTimer.reset(),this.teardown(e,t,n);}},{key:"connect",value:function(e){var t=this;e&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=m(e)),this.conn||(this.conn=new this.transport(this.endPointURL()),this.conn.timeout=this.longpollerTimeout,this.conn.onopen=function(){return t.onConnOpen()},this.conn.onerror=function(e){return t.onConnError(e)},this.conn.onmessage=function(e){return t.onConnMessage(e)},this.conn.onclose=function(e){return t.onConnClose(e)});}},{key:"log",value:function(e,t,n){this.logger(e,t,n);}},{key:"hasLogger",value:function(){return null!==this.logger}},{key:"onOpen",value:function(e){this.stateChangeCallbacks.open.push(e);}},{key:"onClose",value:function(e){this.stateChangeCallbacks.close.push(e);}},{key:"onError",value:function(e){this.stateChangeCallbacks.error.push(e);}},{key:"onMessage",value:function(e){this.stateChangeCallbacks.message.push(e);}},{key:"onConnOpen",value:function(){this.hasLogger()&&this.log("transport","connected to ".concat(this.endPointURL())),this.flushSendBuffer(),this.reconnectTimer.reset(),this.resetHeartbeat(),this.stateChangeCallbacks.open.forEach(function(e){return e()});}},{key:"resetHeartbeat",value:function(){var e=this;this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(function(){return e.sendHeartbeat()},this.heartbeatIntervalMs));}},{key:"teardown",value:function(e,t,n){this.conn&&(this.conn.onclose=function(){},t?this.conn.close(t,n||""):this.conn.close(),this.conn=null),e&&e();}},{key:"onConnClose",value:function(e){this.hasLogger()&&this.log("transport","close",e),this.triggerChanError(),clearInterval(this.heartbeatTimer),e&&1e3!==e.code&&this.reconnectTimer.scheduleTimeout(),this.stateChangeCallbacks.close.forEach(function(t){return t(e)});}},{key:"onConnError",value:function(e){this.hasLogger()&&this.log("transport",e),this.triggerChanError(),this.stateChangeCallbacks.error.forEach(function(t){return t(e)});}},{key:"triggerChanError",value:function(){this.channels.forEach(function(e){return e.trigger(v.error)});}},{key:"connectionState",value:function(){switch(this.conn&&this.conn.readyState){case f.connecting:return "connecting";case f.open:return "open";case f.closing:return "closing";default:return "closed"}}},{key:"isConnected",value:function(){return "open"===this.connectionState()}},{key:"remove",value:function(e){this.channels=this.channels.filter(function(t){return t.joinRef()!==e.joinRef()});}},{key:"channel",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new b(e,t,this);return this.channels.push(n),n}},{key:"push",value:function(e){var t=this;if(this.hasLogger()){var n=e.topic,i=e.event,o=e.payload,r=e.ref,s=e.join_ref;this.log("push","".concat(n," ").concat(i," (").concat(s,", ").concat(r,")"),o);}this.isConnected()?this.encode(e,function(e){return t.conn.send(e)}):this.sendBuffer.push(function(){return t.encode(e,function(e){return t.conn.send(e)})});}},{key:"makeRef",value:function(){var e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}},{key:"sendHeartbeat",value:function(){if(this.isConnected()){if(this.pendingHeartbeatRef)return this.pendingHeartbeatRef=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection"),void this.conn.close(1e3,"hearbeat timeout");this.pendingHeartbeatRef=this.makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});}}},{key:"flushSendBuffer",value:function(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(function(e){return e()}),this.sendBuffer=[]);}},{key:"onConnMessage",value:function(e){var t=this;this.decode(e.data,function(e){var n=e.topic,i=e.event,o=e.payload,r=e.ref,s=e.join_ref;r&&r===t.pendingHeartbeatRef&&(t.pendingHeartbeatRef=null),t.hasLogger()&&t.log("receive","".concat(o.status||""," ").concat(n," ").concat(i," ").concat(r&&"("+r+")"||""),o);for(var a=0;a<t.channels.length;a++){var c=t.channels[a];c.isMember(n,i,o,s)&&c.trigger(i,o,r,s);}for(var u=0;u<t.stateChangeCallbacks.message.length;u++)t.stateChangeCallbacks.message[u](e);});}}]),e}(),w=function(){function e(t){s(this,e),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=f.connecting,this.poll();}return c(e,[{key:"normalizeEndpoint",value:function(e){return e.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+g.websocket),"$1/"+g.longpoll)}},{key:"endpointURL",value:function(){return C.appendParams(this.pollEndpoint,{token:this.token})}},{key:"closeAndRetry",value:function(){this.close(),this.readyState=f.connecting;}},{key:"ontimeout",value:function(){this.onerror("timeout"),this.closeAndRetry();}},{key:"poll",value:function(){var e=this;this.readyState!==f.open&&this.readyState!==f.connecting||C.request("GET",this.endpointURL(),"application/json",null,this.timeout,this.ontimeout.bind(this),function(t){if(t){var n=t.status,i=t.token,o=t.messages;e.token=i;}else n=0;switch(n){case 200:o.forEach(function(t){return e.onmessage({data:t})}),e.poll();break;case 204:e.poll();break;case 410:e.readyState=f.open,e.onopen(),e.poll();break;case 0:case 500:e.onerror(),e.closeAndRetry();break;default:throw new Error("unhandled poll status ".concat(n))}});}},{key:"send",value:function(e){var t=this;C.request("POST",this.endpointURL(),"application/json",e,this.timeout,this.onerror.bind(this,"timeout"),function(e){e&&200===e.status||(t.onerror(e&&e.status),t.closeAndRetry());});}},{key:"close",value:function(e,t){this.readyState=f.closed,this.onclose();}}]),e}(),C=function(){function e(){s(this,e);}return c(e,null,[{key:"request",value:function(e,t,n,i,o,r,s){if(l.XDomainRequest){var a=new XDomainRequest;this.xdomainRequest(a,e,t,i,o,r,s);}else{var c=l.XMLHttpRequest?new l.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");this.xhrRequest(c,e,t,n,i,o,r,s);}}},{key:"xdomainRequest",value:function(e,t,n,i,o,r,s){var a=this;e.timeout=o,e.open(t,n),e.onload=function(){var t=a.parseJSON(e.responseText);s&&s(t);},r&&(e.ontimeout=r),e.onprogress=function(){},e.send(i);}},{key:"xhrRequest",value:function(e,t,n,i,o,r,s,a){var c=this;e.open(t,n,!0),e.timeout=r,e.setRequestHeader("Content-Type",i),e.onerror=function(){a&&a(null);},e.onreadystatechange=function(){if(e.readyState===c.states.complete&&a){var t=c.parseJSON(e.responseText);a(t);}},s&&(e.ontimeout=s),e.send(o);}},{key:"parseJSON",value:function(e){if(!e||""===e)return null;try{return JSON.parse(e)}catch(t){return console&&console.log("failed to parse JSON response",e),null}}},{key:"serialize",value:function(e,t){var n=[];for(var i in e)if(e.hasOwnProperty(i)){var r=t?"".concat(t,"[").concat(i,"]"):i,s=e[i];"object"===o(s)?n.push(this.serialize(s,r)):n.push(encodeURIComponent(r)+"="+encodeURIComponent(s));}return n.join("&")}},{key:"appendParams",value:function(e,t){if(0===Object.keys(t).length)return e;var n=e.match(/\?/)?"&":"?";return "".concat(e).concat(n).concat(this.serialize(t))}}]),e}();C.states={complete:4};var S=function(){function e(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};s(this,e);var o=i.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(o.state,function(t){var i=n.caller,o=i.onJoin,r=i.onLeave,s=i.onSync;n.joinRef=n.channel.joinRef(),n.state=e.syncState(n.state,t,o,r),n.pendingDiffs.forEach(function(t){n.state=e.syncDiff(n.state,t,o,r);}),n.pendingDiffs=[],s();}),this.channel.on(o.diff,function(t){var i=n.caller,o=i.onJoin,r=i.onLeave,s=i.onSync;n.inPendingSyncState()?n.pendingDiffs.push(t):(n.state=e.syncDiff(n.state,t,o,r),s());});}return c(e,[{key:"onJoin",value:function(e){this.caller.onJoin=e;}},{key:"onLeave",value:function(e){this.caller.onLeave=e;}},{key:"onSync",value:function(e){this.caller.onSync=e;}},{key:"list",value:function(t){return e.list(this.state,t)}},{key:"inPendingSyncState",value:function(){return !this.joinRef||this.joinRef!==this.channel.joinRef()}}],[{key:"syncState",value:function(e,t,n,i){var o=this,r=this.clone(e),s={},a={};return this.map(r,function(e,n){t[e]||(a[e]=n);}),this.map(t,function(e,t){var n=r[e];if(n){var i=t.metas.map(function(e){return e.phx_ref}),c=n.metas.map(function(e){return e.phx_ref}),u=t.metas.filter(function(e){return c.indexOf(e.phx_ref)<0}),h=n.metas.filter(function(e){return i.indexOf(e.phx_ref)<0});u.length>0&&(s[e]=t,s[e].metas=u),h.length>0&&(a[e]=o.clone(n),a[e].metas=h);}else s[e]=t;}),this.syncDiff(r,{joins:s,leaves:a},n,i)}},{key:"syncDiff",value:function(e,t,n,o){var r=t.joins,s=t.leaves,a=this.clone(e);return n||(n=function(){}),o||(o=function(){}),this.map(r,function(e,t){var o=a[e];if(a[e]=t,o){var r,s=a[e].metas.map(function(e){return e.phx_ref}),c=o.metas.filter(function(e){return s.indexOf(e.phx_ref)<0});(r=a[e].metas).unshift.apply(r,i(c));}n(e,o,t);}),this.map(s,function(e,t){var n=a[e];if(n){var i=t.metas.map(function(e){return e.phx_ref});n.metas=n.metas.filter(function(e){return i.indexOf(e.phx_ref)<0}),o(e,n,t),0===n.metas.length&&delete a[e];}}),a}},{key:"list",value:function(e,t){return t||(t=function(e,t){return t}),this.map(e,function(e,n){return t(e,n)})}},{key:"map",value:function(e,t){return Object.getOwnPropertyNames(e).map(function(n){return t(n,e[n])})}},{key:"clone",value:function(e){return JSON.parse(JSON.stringify(e))}}]),e}(),T=function(){function e(t,n){s(this,e),this.callback=t,this.timerCalc=n,this.timer=null,this.tries=0;}return c(e,[{key:"reset",value:function(){this.tries=0,clearTimeout(this.timer);}},{key:"scheduleTimeout",value:function(){var e=this;clearTimeout(this.timer),this.timer=setTimeout(function(){e.tries=e.tries+1,e.callback();},this.timerCalc(this.tries+1));}}]),e}();}])});
	});

	unwrapExports(phoenix);
	var phoenix_1 = phoenix.Ajax;
	var phoenix_2 = phoenix.Channel;
	var phoenix_3 = phoenix.LongPoll;
	var phoenix_4 = phoenix.Presence;
	var phoenix_5 = phoenix.Socket;
	var phoenix_6 = phoenix.Phoenix;

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray$1(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray$1 = _toConsumableArray$1;

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt$1 = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var at = _stringAt$1(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$3 = _wks('toStringTag');
	// ES3 wrong here
	var ARG$1 = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet$1 = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof$1 = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet$1(O = Object(it), TAG$3)) == 'string' ? T
	    // builtinTag case
	    : ARG$1 ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof$1(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES$1 = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$1] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      if (!rx.global) return _regexpExecAbstract(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = _regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var $some = _arrayMethods(3);

	_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

	var _this$b = undefined;

	var locationsToString = function locationsToString(locations) {
	  var _this2 = this;

	  newArrowCheck(this, _this$b);

	  return locations.map(function (_ref) {
	    var column = _ref.column,
	        line = _ref.line;

	    newArrowCheck(this, _this2);

	    return "".concat(line, ":").concat(column);
	  }.bind(this)).join("; ");
	}.bind(undefined);

	var errorToString = function errorToString(_ref2) {
	  var message = _ref2.message,
	      locations = _ref2.locations;

	  newArrowCheck(this, _this$b);

	  return message + (locations ? " (".concat(locationsToString(locations), ")") : "");
	}.bind(undefined);
	/**
	 * Transforms an array of GqlError into a string.
	 *
	 * @example
	 *
	 * const gqlRespose = {
	 *   errors: [
	 *     {message: "First Error", locations: [{column: 10, line: 2}]},
	 *     {message: "Second Error", locations: [{column: 2, line: 4}]}
	 *   ]
	 * }
	 *
	 * const error = errorsToString(gqlRespose.errors);
	 * // string with the following:
	 * // First Error (2:10)
	 * // Second Error (4:2)
	 */


	var errorsToString = function errorsToString(gqlErrors) {
	  newArrowCheck(this, _this$b);

	  return gqlErrors.map(errorToString).join("\n");
	}.bind(undefined);

	var _this$1$2 = undefined;

	var operationTypeRe = /^\s*(query|mutation|subscription|\{)/;

	var getOperationTypeFromMatched = function getOperationTypeFromMatched(matched) {
	  newArrowCheck(this, _this$1$2);

	  return matched === "{" ? "query" : matched;
	}.bind(undefined);
	/**
	 * Returns the type (query, mutation, or subscription) of the given operation
	 *
	 * @example
	 *
	 * const operation = `
	 *   subscription userSubscription($userId: ID!) {
	 *     user(userId: $userId) {
	 *       id
	 *       name
	 *     }
	 *   }
	 * `;
	 *
	 * const operationType = getOperationType(operation);
	 *
	 * console.log(operationType); // "subscription"
	 */


	var getOperationType = function getOperationType(operation) {
	  newArrowCheck(this, _this$1$2);

	  var result = operation.match(operationTypeRe);

	  if (!result) {
	    throw new TypeError("Invalid operation:\n".concat(operation));
	  }

	  return getOperationTypeFromMatched(result[1]);
	}.bind(undefined);

	var _this$2$2 = undefined;

	var isSubscription = function isSubscription(definition) {
	  newArrowCheck(this, _this$2$2);

	  return definition.kind === "OperationDefinition" && definition.operation === "subscription";
	}.bind(undefined);
	/**
	 * Returns true if documentNode has a subscription or false otherwise
	 */


	var hasSubscription = function hasSubscription(documentNode) {
	  newArrowCheck(this, _this$2$2);

	  return documentNode.definitions.some(isSubscription);
	}.bind(undefined);

	var _this$3$2 = undefined;

	/**
	 * Creates a GqlRequest using given GqlRequestCompat
	 *
	 * @param {GqlRequestCompat<Variables>} gqlRequestCompat
	 *
	 * @return {GqlRequest<Variables>} 
	 *
	 * @example
	 * const query = `
	 *   query userQuery($userId: ID!) {
	 *     user(userId: $userId) {
	 *       id
	 *       email
	 *     }
	 *   }
	 * `;
	 * 
	 * console.log(requestFromCompat({query, variables: {userId: 10}}));
	 * // {operation: "...", variables: {userId: 10}}
	 */
	var requestFromCompat = function requestFromCompat(_ref) {
	  var operation = _ref.query,
	      variables = _ref.variables;

	  newArrowCheck(this, _this$3$2);

	  return variables ? {
	    operation: operation,
	    variables: variables
	  } : {
	    operation: operation
	  };
	}.bind(undefined);

	var _this$4$2 = undefined;

	/**
	 * Creates a GqlRequest using given GqlRequestCompat
	 *
	 * @param {GqlRequest<Variables>} gqlRequest
	 *
	 * @return {GqlRequestCompat<Variables>}
	 * 
	 * @example
	 * const operation = `
	 *   query userQuery($userId: ID!) {
	 *     user(userId: $userId) {
	 *       id
	 *       email
	 *     }
	 *   }
	 * `;
	 * 
	 * console.log(requestToCompat({operation, variables: {userId: 10}}));
	 * // {query: "...", variables: {userId: 10}}
	 */
	var requestToCompat = function requestToCompat(_ref) {
	  var query = _ref.operation,
	      variables = _ref.variables;

	  newArrowCheck(this, _this$4$2);

	  return variables ? {
	    query: query,
	    variables: variables
	  } : {
	    query: query
	  };
	}.bind(undefined);

	function _defineProperty$1(obj, key, value) {
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

	var defineProperty$5 = _defineProperty$1;

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      defineProperty$5(target, key, source[key]);
	    });
	  }

	  return target;
	}

	var objectSpread = _objectSpread;

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

	function _objectWithoutProperties$1(source, excluded) {
	  if (source == null) return {};
	  var target = objectWithoutPropertiesLoose(source, excluded);
	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	var objectWithoutProperties$1 = _objectWithoutProperties$1;

	var _this$c = undefined;

	var cancel = function cancel(_ref) {
	  var activeObservers = _ref.activeObservers,
	      canceledObservers = _ref.canceledObservers,
	      rest = objectWithoutProperties$1(_ref, ["activeObservers", "canceledObservers"]);

	  newArrowCheck(this, _this$c);

	  return objectSpread({}, rest, {
	    isActive: false,
	    activeObservers: [],
	    canceledObservers: toConsumableArray$1(activeObservers).concat(toConsumableArray$1(canceledObservers))
	  });
	}.bind(undefined);

	var _this$1$3 = undefined;

	var getNotifier = function getNotifier(handlerName, payload) {
	  var _this2 = this;

	  newArrowCheck(this, _this$1$3);

	  return function (observer) {
	    newArrowCheck(this, _this2);

	    return observer[handlerName] && observer[handlerName](payload);
	  }.bind(this);
	}.bind(undefined);

	var getHandlerName = function getHandlerName(_ref) {
	  var name = _ref.name;

	  newArrowCheck(this, _this$1$3);

	  return "on".concat(name);
	}.bind(undefined);

	var notifyAll = function notifyAll(observers, event) {
	  newArrowCheck(this, _this$1$3);

	  return observers.forEach(getNotifier(getHandlerName(event), event.payload));
	}.bind(undefined);

	var _this$2$3 = undefined;

	var notifyCanceled = function notifyCanceled(notifier, event) {
	  newArrowCheck(this, _this$2$3);

	  notifyAll(notifier.canceledObservers, event);
	  return notifier;
	}.bind(undefined);

	var eventNames = {
	  abort: "Abort",
	  cancel: "Cancel",
	  error: "Error",
	  result: "Result",
	  start: "Start"
	};
	var _this$3$3 = undefined;

	var createStartEvent = function createStartEvent(payload) {
	  newArrowCheck(this, _this$3$3);

	  return {
	    payload: payload,
	    name: eventNames.start
	  };
	}.bind(undefined);

	var createResultEvent = function createResultEvent(payload) {
	  newArrowCheck(this, _this$3$3);

	  return {
	    payload: payload,
	    name: eventNames.result
	  };
	}.bind(undefined);

	var createErrorEvent = function createErrorEvent(payload) {
	  newArrowCheck(this, _this$3$3);

	  return {
	    payload: payload,
	    name: eventNames.error
	  };
	}.bind(undefined);

	var createCancelEvent = function createCancelEvent() {
	  newArrowCheck(this, _this$3$3);

	  return {
	    name: eventNames.cancel,
	    payload: undefined
	  };
	}.bind(undefined);

	var createAbortEvent = function createAbortEvent(payload) {
	  newArrowCheck(this, _this$3$3);

	  return {
	    payload: payload,
	    name: eventNames.abort
	  };
	}.bind(undefined);

	var _this$4$3 = undefined;

	var clearCanceled = function clearCanceled(notifier) {
	  newArrowCheck(this, _this$4$3);

	  return objectSpread({}, notifier, {
	    canceledObservers: []
	  });
	}.bind(undefined);

	var flushCanceled = function flushCanceled(notifier) {
	  newArrowCheck(this, _this$4$3);

	  return notifier.canceledObservers.length > 0 ? clearCanceled(notifyCanceled(notifier, createCancelEvent())) : notifier;
	}.bind(undefined);

	var _this$5$2 = undefined;

	var findIndex = function findIndex(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
	) {
	  newArrowCheck(this, _this$5$2);

	  return notifiers.findIndex(hasIn$1([key], value));
	}.bind(undefined);

	var _this$6$2 = undefined;

	var refresh = function refresh(notifier) {
	  var _this2 = this;

	  newArrowCheck(this, _this$6$2);

	  return function (notifiers) {
	    newArrowCheck(this, _this2);

	    return replace$1(findIndex(notifiers, "request", notifier.request), [notifier], notifiers);
	  }.bind(this);
	}.bind(undefined);

	var _this$7$2 = undefined;

	var remove$1$2 = function remove$$1(notifier) {
	  var _this2 = this;

	  newArrowCheck(this, _this$7$2);

	  return function (notifiers) {
	    newArrowCheck(this, _this2);

	    return remove$1(findIndex(notifiers, "request", notifier.request), 1, notifiers);
	  }.bind(this);
	}.bind(undefined);

	var _this$8$2 = undefined;

	var updateNotifiers = function updateNotifiers(absintheSocket, updater) {
	  newArrowCheck(this, _this$8$2);

	  absintheSocket.notifiers = updater(absintheSocket.notifiers);
	  return absintheSocket;
	}.bind(undefined);

	var _this$9$2 = undefined;

	var refreshNotifier = function refreshNotifier(absintheSocket, notifier) {
	  newArrowCheck(this, _this$9$2);

	  updateNotifiers(absintheSocket, refresh(notifier));
	  return notifier;
	}.bind(undefined);

	var requestStatuses = {
	  canceled: "canceled",
	  canceling: "canceling",
	  pending: "pending",
	  sent: "sent",
	  sending: "sending"
	};
	var _this$a$1 = undefined;

	var getObservers = function getObservers(_ref) {
	  var activeObservers = _ref.activeObservers,
	      canceledObservers = _ref.canceledObservers;

	  newArrowCheck(this, _this$a$1);

	  return toConsumableArray$1(activeObservers).concat(toConsumableArray$1(canceledObservers));
	}.bind(undefined);

	var notify = function notify(notifier, event) {
	  newArrowCheck(this, _this$a$1);

	  notifyAll(getObservers(notifier), event);
	  return notifier;
	}.bind(undefined);

	var _this$b$1 = undefined;

	var abortNotifier = function abortNotifier(absintheSocket, notifier, error) {
	  newArrowCheck(this, _this$b$1);

	  return updateNotifiers(absintheSocket, remove$1$2(notify(notifier, createAbortEvent(error))));
	}.bind(undefined);

	var _this$c$1 = undefined;

	var find = function find(notifiers, key, value // $FlowFixMe: flow is having some troubles to match hasIn signature (curry)
	) {
	  newArrowCheck(this, _this$c$1);

	  return notifiers.find(hasIn$1([key], value));
	}.bind(undefined);

	var _this$d = undefined;

	var notifyActive = function notifyActive(notifier, event) {
	  newArrowCheck(this, _this$d);

	  notifyAll(notifier.activeObservers, event);
	  return notifier;
	}.bind(undefined);

	var _this$e = undefined;

	var notifyResultEvent = function notifyResultEvent(notifier, result) {
	  newArrowCheck(this, _this$e);

	  return notifyActive(notifier, createResultEvent(result));
	}.bind(undefined);

	var _this$f = undefined;

	var notifyStartEvent = function notifyStartEvent(notifier) {
	  newArrowCheck(this, _this$f);

	  return notifyActive(notifier, createStartEvent(notifier));
	}.bind(undefined);

	var _this$g = undefined;

	var reset = function reset(notifier) {
	  newArrowCheck(this, _this$g);

	  return flushCanceled(objectSpread({}, notifier, {
	    isActive: true,
	    requestStatus: requestStatuses.pending,
	    subscriptionId: undefined
	  }));
	}.bind(undefined);

	var _this$h = undefined;

	var handlePush = function handlePush(push, handler) {
	  newArrowCheck(this, _this$h);

	  return push.receive("ok", handler.onSucceed).receive("error", handler.onError).receive("timeout", handler.onTimeout);
	}.bind(undefined);

	var _this$i = undefined;

	var getPushHandlerMethodGetter = function getPushHandlerMethodGetter(absintheSocket, request) {
	  var _this2 = this;

	  newArrowCheck(this, _this$i);

	  return function (handle) {
	    var _this3 = this;

	    newArrowCheck(this, _this2);

	    return function () {
	      newArrowCheck(this, _this3);

	      var notifier = find(absintheSocket.notifiers, "request", request);

	      if (notifier) {
	        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        handle.apply(void 0, [absintheSocket, notifier].concat(args));
	      }
	    }.bind(this);
	  }.bind(this);
	}.bind(undefined);

	var getPushHandler = function getPushHandler(absintheSocket, request, notifierPushHandler) {
	  newArrowCheck(this, _this$i);

	  return map$1(getPushHandlerMethodGetter(absintheSocket, request), notifierPushHandler);
	}.bind(undefined);

	var pushAbsintheEvent = function pushAbsintheEvent(absintheSocket, request, notifierPushHandler, absintheEvent) {
	  newArrowCheck(this, _this$i);

	  handlePush(absintheSocket.channel.push(absintheEvent.name, absintheEvent.payload), getPushHandler(absintheSocket, request, notifierPushHandler));
	  return absintheSocket;
	}.bind(undefined);

	var absintheEventNames = {
	  doc: "doc",
	  unsubscribe: "unsubscribe"
	};
	var _this$j = undefined;

	var createAbsintheUnsubscribeEvent = function createAbsintheUnsubscribeEvent(payload) {
	  newArrowCheck(this, _this$j);

	  return {
	    payload: payload,
	    name: absintheEventNames.unsubscribe
	  };
	}.bind(undefined);

	var createAbsintheDocEvent = function createAbsintheDocEvent(payload) {
	  newArrowCheck(this, _this$j);

	  return {
	    payload: payload,
	    name: absintheEventNames.doc
	  };
	}.bind(undefined);

	var _this$k = undefined;

	var pushAbsintheDocEvent = function pushAbsintheDocEvent(absintheSocket, _ref, notifierPushHandler) {
	  var request = _ref.request;

	  newArrowCheck(this, _this$k);

	  return pushAbsintheEvent(absintheSocket, request, notifierPushHandler, createAbsintheDocEvent(requestToCompat(request)));
	}.bind(undefined);

	var setNotifierRequestStatusSending = function setNotifierRequestStatusSending(absintheSocket, notifier) {
	  newArrowCheck(this, _this$k);

	  return refreshNotifier(absintheSocket, objectSpread({}, notifier, {
	    requestStatus: requestStatuses.sending
	  }));
	}.bind(undefined);

	var createRequestError = function createRequestError(message) {
	  newArrowCheck(this, _this$k);

	  return new Error("request: ".concat(message));
	}.bind(undefined);

	var onTimeout = function onTimeout(absintheSocket, notifier) {
	  newArrowCheck(this, _this$k);

	  return notifyActive(notifier, createErrorEvent(createRequestError("timeout")));
	}.bind(undefined);

	var onError = function onError(absintheSocket, notifier, errorMessage) {
	  newArrowCheck(this, _this$k);

	  return abortNotifier(absintheSocket, notifier, createRequestError(errorMessage));
	}.bind(undefined);

	var getNotifierPushHandler = function getNotifierPushHandler(onSucceed) {
	  newArrowCheck(this, _this$k);

	  return {
	    onError: onError,
	    onSucceed: onSucceed,
	    onTimeout: onTimeout
	  };
	}.bind(undefined);

	var pushRequestUsing = function pushRequestUsing(absintheSocket, notifier, onSucceed) {
	  newArrowCheck(this, _this$k);

	  return pushAbsintheDocEvent(absintheSocket, setNotifierRequestStatusSending(absintheSocket, notifier), getNotifierPushHandler(onSucceed));
	}.bind(undefined);

	var _this$l = undefined;

	var onUnsubscribeSucceedCanceled = function onUnsubscribeSucceedCanceled(absintheSocket, notifier) {
	  newArrowCheck(this, _this$l);

	  return updateNotifiers(absintheSocket, remove$1$2(flushCanceled(notifier)));
	}.bind(undefined);

	var onUnsubscribeSucceedActive = function onUnsubscribeSucceedActive(absintheSocket, notifier) {
	  newArrowCheck(this, _this$l);

	  return subscribe(absintheSocket, refreshNotifier(absintheSocket, reset(notifier)));
	}.bind(undefined);

	var createUnsubscribeError = function createUnsubscribeError(message) {
	  newArrowCheck(this, _this$l);

	  return new Error("unsubscribe: ".concat(message));
	}.bind(undefined);

	var unsubscribeHandler = {
	  onError: function onError$$1(absintheSocket, notifier, errorMessage) {
	    newArrowCheck(this, _this$l);

	    return abortNotifier(absintheSocket, notifier, createUnsubscribeError(errorMessage));
	  }.bind(undefined),
	  onTimeout: function onTimeout(absintheSocket, notifier) {
	    newArrowCheck(this, _this$l);

	    return notifyCanceled(notifier, createErrorEvent(createUnsubscribeError("timeout")));
	  }.bind(undefined),
	  onSucceed: function onSucceed(absintheSocket, notifier) {
	    newArrowCheck(this, _this$l);

	    if (notifier.isActive) {
	      onUnsubscribeSucceedActive(absintheSocket, notifier);
	    } else {
	      onUnsubscribeSucceedCanceled(absintheSocket, notifier);
	    }
	  }.bind(undefined)
	};

	var pushAbsintheUnsubscribeEvent = function pushAbsintheUnsubscribeEvent(absintheSocket, _ref) {
	  var request = _ref.request,
	      subscriptionId = _ref.subscriptionId;

	  newArrowCheck(this, _this$l);

	  return pushAbsintheEvent(absintheSocket, request, unsubscribeHandler, createAbsintheUnsubscribeEvent({
	    subscriptionId: subscriptionId
	  }));
	}.bind(undefined);

	var unsubscribe = function unsubscribe(absintheSocket, notifier) {
	  newArrowCheck(this, _this$l);

	  return pushAbsintheUnsubscribeEvent(absintheSocket, refreshNotifier(absintheSocket, objectSpread({}, notifier, {
	    requestStatus: requestStatuses.canceling
	  })));
	}.bind(undefined);

	var onSubscribeSucceed = function onSubscribeSucceed(absintheSocket, notifier, _ref2) {
	  var subscriptionId = _ref2.subscriptionId;

	  newArrowCheck(this, _this$l);

	  var subscribedNotifier = refreshNotifier(absintheSocket, objectSpread({}, notifier, {
	    subscriptionId: subscriptionId,
	    requestStatus: requestStatuses.sent
	  }));

	  if (subscribedNotifier.isActive) {
	    notifyStartEvent(subscribedNotifier);
	  } else {
	    unsubscribe(absintheSocket, subscribedNotifier);
	  }
	}.bind(undefined);

	var onSubscribe = function onSubscribe(absintheSocket, notifier, response) {
	  newArrowCheck(this, _this$l);

	  if (response.errors) {
	    onError(absintheSocket, notifier, errorsToString(response.errors));
	  } else {
	    onSubscribeSucceed(absintheSocket, notifier, response);
	  }
	}.bind(undefined);

	var subscribe = function subscribe(absintheSocket, notifier) {
	  newArrowCheck(this, _this$l);

	  return pushRequestUsing(absintheSocket, notifier, onSubscribe);
	}.bind(undefined);

	var onDataMessage = function onDataMessage(absintheSocket, _ref3) {
	  var payload = _ref3.payload;

	  newArrowCheck(this, _this$l);

	  var notifier = find(absintheSocket.notifiers, "subscriptionId", payload.subscriptionId);

	  if (notifier) {
	    notifyResultEvent(notifier, payload.result);
	  }
	}.bind(undefined);

	var dataMessageEventName = "subscription:data";

	var isDataMessage = function isDataMessage(message) {
	  newArrowCheck(this, _this$l);

	  return message.event === dataMessageEventName;
	}.bind(undefined);

	var _this$m = undefined;

	var cancelQueryOrMutationSending = function cancelQueryOrMutationSending(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return updateNotifiers(absintheSocket, refresh(flushCanceled(cancel(notifier))));
	}.bind(undefined);

	var cancelQueryOrMutationIfSending = function cancelQueryOrMutationIfSending(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return notifier.requestStatus === requestStatuses.sending ? cancelQueryOrMutationSending(absintheSocket, notifier) : absintheSocket;
	}.bind(undefined);

	var cancelPending = function cancelPending(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return updateNotifiers(absintheSocket, remove$1$2(flushCanceled(cancel(notifier))));
	}.bind(undefined);

	var cancelQueryOrMutation = function cancelQueryOrMutation(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return notifier.requestStatus === requestStatuses.pending ? cancelPending(absintheSocket, notifier) : cancelQueryOrMutationIfSending(absintheSocket, notifier);
	}.bind(undefined);

	var unsubscribeIfNeeded = function unsubscribeIfNeeded(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return notifier.requestStatus === requestStatuses.sent ? unsubscribe(absintheSocket, notifier) : absintheSocket;
	}.bind(undefined);

	var cancelNonPendingSubscription = function cancelNonPendingSubscription(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return unsubscribeIfNeeded(absintheSocket, refreshNotifier(absintheSocket, cancel(notifier)));
	}.bind(undefined);

	var cancelSubscription = function cancelSubscription(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return notifier.requestStatus === requestStatuses.pending ? cancelPending(absintheSocket, notifier) : cancelNonPendingSubscription(absintheSocket, notifier);
	}.bind(undefined);

	var cancelActive = function cancelActive(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return notifier.operationType === "subscription" ? cancelSubscription(absintheSocket, notifier) : cancelQueryOrMutation(absintheSocket, notifier);
	}.bind(undefined);
	/**
	 * Cancels a notifier sending a Cancel event to all its observers and
	 * unsubscribing in case it holds a subscription request
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * withAbsintheSocket.cancel(absintheSocket, notifier);
	 */


	var cancel$1 = function cancel$$1(absintheSocket, notifier) {
	  newArrowCheck(this, _this$m);

	  return notifier.isActive ? cancelActive(absintheSocket, notifier) : absintheSocket;
	}.bind(undefined);

	var _this$n = undefined;

	var setNotifierRequestStatusSent = function setNotifierRequestStatusSent(absintheSocket, notifier) {
	  newArrowCheck(this, _this$n);

	  return refreshNotifier(absintheSocket, objectSpread({}, notifier, {
	    requestStatus: requestStatuses.sent
	  }));
	}.bind(undefined);

	var onQueryOrMutationSucceed = function onQueryOrMutationSucceed(absintheSocket, notifier, response) {
	  newArrowCheck(this, _this$n);

	  return updateNotifiers(absintheSocket, remove$1$2(notifyResultEvent(setNotifierRequestStatusSent(absintheSocket, notifier), response)));
	}.bind(undefined);

	var pushQueryOrMutation = function pushQueryOrMutation(absintheSocket, notifier) {
	  newArrowCheck(this, _this$n);

	  return pushRequestUsing(absintheSocket, notifyStartEvent(notifier), onQueryOrMutationSucceed);
	}.bind(undefined);

	var pushRequest = function pushRequest(absintheSocket, notifier) {
	  newArrowCheck(this, _this$n);

	  if (notifier.operationType === "subscription") {
	    subscribe(absintheSocket, notifier);
	  } else {
	    pushQueryOrMutation(absintheSocket, notifier);
	  }
	}.bind(undefined);

	var _this$o = undefined;

	var createChannelJoinError = function createChannelJoinError(message) {
	  newArrowCheck(this, _this$o);

	  return new Error("channel join: ".concat(message));
	}.bind(undefined);

	var notifyErrorToAllActive = function notifyErrorToAllActive(absintheSocket, errorMessage) {
	  var _this2 = this;

	  newArrowCheck(this, _this$o);

	  return absintheSocket.notifiers.forEach(function (notifier) {
	    newArrowCheck(this, _this2);

	    return notifyActive(notifier, createErrorEvent(createChannelJoinError(errorMessage)));
	  }.bind(this));
	}.bind(undefined); // join Push is reused and so the handler
	// https://github.com/phoenixframework/phoenix/blob/master/assets/js/phoenix.js#L356


	var createChannelJoinHandler = function createChannelJoinHandler(absintheSocket) {
	  var _this3 = this;

	  newArrowCheck(this, _this$o);

	  return {
	    onError: function onError(errorMessage) {
	      newArrowCheck(this, _this3);

	      return notifyErrorToAllActive(absintheSocket, errorMessage);
	    }.bind(this),
	    onSucceed: function onSucceed() {
	      var _this4 = this;

	      newArrowCheck(this, _this3);

	      return absintheSocket.notifiers.forEach(function (notifier) {
	        newArrowCheck(this, _this4);

	        return pushRequest(absintheSocket, notifier);
	      }.bind(this));
	    }.bind(this),
	    onTimeout: function onTimeout() {
	      newArrowCheck(this, _this3);

	      return notifyErrorToAllActive(absintheSocket, "timeout");
	    }.bind(this)
	  };
	}.bind(undefined);

	var joinChannel = function joinChannel(absintheSocket) {
	  newArrowCheck(this, _this$o);

	  handlePush(absintheSocket.channel.join(), createChannelJoinHandler(absintheSocket));
	  absintheSocket.channelJoinCreated = true;
	  return absintheSocket;
	}.bind(undefined);

	var _this$p = undefined;

	var onMessage = function onMessage(absintheSocket) {
	  var _this2 = this;

	  newArrowCheck(this, _this$p);

	  return function (message) {
	    newArrowCheck(this, _this2);

	    if (isDataMessage(message)) {
	      onDataMessage(absintheSocket, message);
	    }
	  }.bind(this);
	}.bind(undefined);

	var createConnectionCloseError = function createConnectionCloseError() {
	  newArrowCheck(this, _this$p);

	  return new Error("connection: close");
	}.bind(undefined);

	var notifyConnectionCloseError = function notifyConnectionCloseError(notifier) {
	  newArrowCheck(this, _this$p);

	  return notify(notifier, createErrorEvent(createConnectionCloseError()));
	}.bind(undefined);

	var notifierOnConnectionCloseCanceled = function notifierOnConnectionCloseCanceled(absintheSocket, notifier) {
	  newArrowCheck(this, _this$p);

	  return updateNotifiers(absintheSocket, remove$1$2(notifyConnectionCloseError(notifier)));
	}.bind(undefined);

	var notifierOnConnectionCloseActive = function notifierOnConnectionCloseActive(absintheSocket, notifier) {
	  newArrowCheck(this, _this$p);

	  if (notifier.operationType === "mutation") {
	    abortNotifier(absintheSocket, notifier, createConnectionCloseError());
	  } else {
	    refreshNotifier(absintheSocket, reset(notifyConnectionCloseError(notifier)));
	  }
	}.bind(undefined);

	var notifierOnConnectionClose = function notifierOnConnectionClose(absintheSocket) {
	  var _this3 = this;

	  newArrowCheck(this, _this$p);

	  return function (notifier) {
	    newArrowCheck(this, _this3);

	    if (notifier.isActive) {
	      notifierOnConnectionCloseActive(absintheSocket, notifier);
	    } else {
	      notifierOnConnectionCloseCanceled(absintheSocket, notifier);
	    }
	  }.bind(this);
	}.bind(undefined);

	var onConnectionClose = function onConnectionClose(absintheSocket) {
	  var _this4 = this;

	  newArrowCheck(this, _this$p);

	  return function () {
	    newArrowCheck(this, _this4);

	    return absintheSocket.notifiers.forEach(notifierOnConnectionClose(absintheSocket));
	  }.bind(this);
	}.bind(undefined);

	var shouldJoinChannel = function shouldJoinChannel(absintheSocket) {
	  newArrowCheck(this, _this$p);

	  return !absintheSocket.channelJoinCreated && absintheSocket.notifiers.length > 0;
	}.bind(undefined);

	var onConnectionOpen = function onConnectionOpen(absintheSocket) {
	  var _this5 = this;

	  newArrowCheck(this, _this$p);

	  return function () {
	    newArrowCheck(this, _this5);

	    if (shouldJoinChannel(absintheSocket)) {
	      joinChannel(absintheSocket);
	    }
	  }.bind(this);
	}.bind(undefined);

	var absintheChannelName = "__absinthe__:control";
	/**
	 * Creates an Absinthe Socket using the given Phoenix Socket instance
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 * import {Socket as PhoenixSocket} from "phoenix";

	 * const absintheSocket = withAbsintheSocket.create(
	 *   new PhoenixSocket("ws://localhost:4000/socket")
	 * );
	 */

	var create = function create(phoenixSocket) {
	  newArrowCheck(this, _this$p);

	  var absintheSocket = {
	    phoenixSocket: phoenixSocket,
	    channel: phoenixSocket.channel(absintheChannelName),
	    channelJoinCreated: false,
	    notifiers: []
	  };
	  phoenixSocket.onOpen(onConnectionOpen(absintheSocket));
	  phoenixSocket.onClose(onConnectionClose(absintheSocket));
	  phoenixSocket.onMessage(onMessage(absintheSocket));
	  return absintheSocket;
	}.bind(undefined);

	var _this$q = undefined;

	var observe = function observe(_ref, observer) {
	  var activeObservers = _ref.activeObservers,
	      rest = objectWithoutProperties$1(_ref, ["activeObservers"]);

	  newArrowCheck(this, _this$q);

	  return objectSpread({}, rest, {
	    activeObservers: toConsumableArray$1(activeObservers).concat([observer]),
	    isActive: true
	  });
	}.bind(undefined);

	var _this$r = undefined;
	/**
	 * Observes given notifier using the provided observer
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket"
	 *
	 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
	 *
	 * const updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
	 *   onAbort: logEvent("abort"),
	 *   onError: logEvent("error"),
	 *   onStart: logEvent("open"),
	 *   onResult: logEvent("result")
	 * });
	 */

	var observe$1 = function observe$$1(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$r);

	  return refreshNotifier(absintheSocket, observe(notifier, observer));
	}.bind(undefined);

	var _this$s = undefined;

	var createUsing = function createUsing(request, operationType) {
	  newArrowCheck(this, _this$s);

	  return {
	    operationType: operationType,
	    request: request,
	    activeObservers: [],
	    canceledObservers: [],
	    isActive: true,
	    requestStatus: requestStatuses.pending,
	    subscriptionId: undefined
	  };
	}.bind(undefined);

	var create$1 = function create(request) {
	  newArrowCheck(this, _this$s);

	  return createUsing(request, getOperationType(request.operation));
	}.bind(undefined);

	var _this$t = undefined;

	var reactivate = function reactivate(notifier) {
	  newArrowCheck(this, _this$t);

	  return notifier.isActive ? notifier : objectSpread({}, notifier, {
	    isActive: true
	  });
	}.bind(undefined);

	var _this$u = undefined;

	var connectOrJoinChannel = function connectOrJoinChannel(absintheSocket) {
	  newArrowCheck(this, _this$u);

	  if (absintheSocket.phoenixSocket.isConnected()) {
	    joinChannel(absintheSocket);
	  } else {
	    // socket ignores connect calls if a connection has already been created
	    absintheSocket.phoenixSocket.connect();
	  }
	}.bind(undefined);

	var sendNew = function sendNew(absintheSocket, request) {
	  newArrowCheck(this, _this$u);

	  var notifier = create$1(request);
	  updateNotifiers(absintheSocket, append$1([notifier]));

	  if (absintheSocket.channelJoinCreated) {
	    pushRequest(absintheSocket, notifier);
	  } else {
	    connectOrJoinChannel(absintheSocket);
	  }

	  return notifier;
	}.bind(undefined);

	var updateCanceledReactivate = function updateCanceledReactivate(absintheSocket, notifier) {
	  newArrowCheck(this, _this$u);

	  return refreshNotifier(absintheSocket, reactivate(notifier));
	}.bind(undefined);

	var updateCanceled = function updateCanceled(absintheSocket, notifier) {
	  newArrowCheck(this, _this$u);

	  return notifier.requestStatus === requestStatuses.sending ? updateCanceledReactivate(absintheSocket, flushCanceled(notifier)) : updateCanceledReactivate(absintheSocket, notifier);
	}.bind(undefined);

	var updateIfCanceled = function updateIfCanceled(absintheSocket, notifier) {
	  newArrowCheck(this, _this$u);

	  return notifier.isActive ? notifier : updateCanceled(absintheSocket, notifier);
	}.bind(undefined);

	var getExistentIfAny = function getExistentIfAny(absintheSocket, request) {
	  newArrowCheck(this, _this$u);

	  var notifier = find(absintheSocket.notifiers, "request", request);
	  return notifier && updateIfCanceled(absintheSocket, notifier);
	}.bind(undefined);
	/**
	 * Sends given request and returns an object (notifier) to track its progress
	 * (see observe function)
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * const operation = `
	 *   subscription userSubscription($userId: ID!) {
	 *     user(userId: $userId) {
	 *       id
	 *       name
	 *     }
	 *   }
	 * `;
	 *
	 * // This example uses a subscription, but the functionallity is the same for
	 * // all operation types (queries, mutations and subscriptions)
	 *
	 * const notifier = withAbsintheSocket.send(absintheSocket, {
	 *   operation,
	 *   variables: {userId: 10}
	 * });
	 */


	var send = function send(absintheSocket, request) {
	  newArrowCheck(this, _this$u);

	  return getExistentIfAny(absintheSocket, request) || sendNew(absintheSocket, request);
	}.bind(undefined);

	var _this$v = undefined; // prettier-ignore

	var getUnsubscriber = function getUnsubscriber(absintheSocket, _ref, observer, unsubscribe) {
	  var _this2 = this;

	  var request = _ref.request;

	  newArrowCheck(this, _this$v);

	  return function () {
	    newArrowCheck(this, _this2);

	    var notifier = find(absintheSocket.notifiers, "request", request);
	    unsubscribe(absintheSocket, notifier, notifier ? observer : undefined);
	  }.bind(this);
	}.bind(undefined);

	var onResult = function onResult(_ref2, observableObserver) {
	  var _this3 = this;

	  var operationType = _ref2.operationType;

	  newArrowCheck(this, _this$v);

	  return function (result) {
	    newArrowCheck(this, _this3);

	    observableObserver.next(result);

	    if (operationType !== "subscription") {
	      observableObserver.complete();
	    }
	  }.bind(this);
	}.bind(undefined);

	var createObserver = function createObserver(notifier, handlers, observableObserver) {
	  newArrowCheck(this, _this$v);

	  return objectSpread({}, handlers, {
	    onAbort: observableObserver.error.bind(observableObserver),
	    onResult: onResult(notifier, observableObserver)
	  });
	}.bind(undefined);
	/**
	 * Creates an Observable that will follow the given notifier
	 *
	 * @param {AbsintheSocket} absintheSocket
	 * @param {Notifier<Result, Variables>} notifier
	 * @param {Object} [options]
	 * @param {function(error: Error): undefined} [options.onError]
	 * @param {function(notifier: Notifier<Result, Variables>): undefined} [options.onStart]
	 * @param {function(): undefined} [options.unsubscribe]
	 *
	 * @return {Observable}
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * const unobserveOrCancelIfNeeded = (absintheSocket, notifier, observer) => {
	 *   if (notifier && observer) {
	 *     withAbsintheSocket.unobserveOrCancel(absintheSocket, notifier, observer);
	 *   }
	 * };
	 *
	 * const logEvent = eventName => (...args) => console.log(eventName, ...args);
	 *
	 * const observable = withAbsintheSocket.toObservable(absintheSocket, notifier, {
	 *   onError: logEvent("error"),
	 *   onStart: logEvent("open"),
	 *   unsubscribe: unobserveOrCancelIfNeeded
	 * });
	 */


	var toObservable = function toObservable(absintheSocket, notifier) {
	  var _this4 = this;

	  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      unsubscribe = _ref3.unsubscribe,
	      handlers = objectWithoutProperties$1(_ref3, ["unsubscribe"]);

	  newArrowCheck(this, _this$v);

	  return new zenObservable(function (observableObserver) {
	    newArrowCheck(this, _this4);

	    var observer = createObserver(notifier, handlers, observableObserver);
	    observe$1(absintheSocket, notifier, observer);
	    return unsubscribe && getUnsubscriber(absintheSocket, notifier, observer, unsubscribe);
	  }.bind(this));
	}.bind(undefined);

	var _this$w = undefined;

	var removeObserver = function removeObserver(observers, observer) {
	  newArrowCheck(this, _this$w);

	  return remove$1(observers.indexOf(observer), 1, observers);
	}.bind(undefined);

	var unobserve = function unobserve(_ref, observer) {
	  var activeObservers = _ref.activeObservers,
	      rest = objectWithoutProperties$1(_ref, ["activeObservers"]);

	  newArrowCheck(this, _this$w);

	  return objectSpread({}, rest, {
	    activeObservers: removeObserver(activeObservers, observer)
	  });
	}.bind(undefined);

	var _this$x = undefined;

	var ensureHasActiveObserver = function ensureHasActiveObserver(notifier, observer) {
	  newArrowCheck(this, _this$x);

	  if (notifier.activeObservers.includes(observer)) return notifier;
	  throw new Error("Observer is not attached to notifier");
	}.bind(undefined);
	/**
	 * Detaches observer from notifier
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
	 */


	var unobserve$1 = function unobserve$$1(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$x);

	  return updateNotifiers(absintheSocket, refresh(unobserve(ensureHasActiveObserver(notifier, observer), observer)));
	}.bind(undefined);

	var _this$y = undefined;

	var doUnobserveOrCancel = function doUnobserveOrCancel(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$y);

	  return notifier.activeObservers.length === 1 ? cancel$1(absintheSocket, notifier) : unobserve$1(absintheSocket, notifier, observer);
	}.bind(undefined);
	/**
	 * Cancels notifier if there are no more observers apart from the one given, or
	 * detaches given observer from notifier otherwise
	 *
	 * @example
	 * import * as withAbsintheSocket from "@absinthe/socket";
	 *
	 * withAbsintheSocket.unobserve(absintheSocket, notifier, observer);
	 */


	var unobserveOrCancel = function unobserveOrCancel(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$y);

	  return notifier.isActive ? doUnobserveOrCancel(absintheSocket, notifier, observer) : absintheSocket;
	}.bind(undefined);

	var Fun$4 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flip = flip;
	exports.constant = constant;
	exports.on = on;
	exports.compose = compose;
	exports.pipe = pipe;
	exports.curry = curry;
	// eslint-disable-line no-redeclare

	// Flips the order of the arguments to a function of two arguments.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	function flip(f) {
	  return function (b, a) {
	    return f(a, b);
	  };
	}

	// Returns its first argument and ignores its second.
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare
	// eslint-disable-line no-redeclare

	function constant(a) {
	  return function () {
	    return a;
	  };
	}

	// The `on` function is used to change the domain of a binary operator.
	function on(o, f) {
	  return function (x, y) {
	    return o(f(x), f(y));
	  };
	}

	function compose() {
	  var _this = this;

	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i = len; _i > -1; _i--) {
	      y = fns[_i].call(_this, y);
	    }
	    return y;
	  };
	}

	function pipe() {
	  var _this2 = this;

	  for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fns[_key2] = arguments[_key2];
	  }

	  // eslint-disable-line no-redeclare
	  var len = fns.length - 1;
	  return function (x) {
	    var y = x;
	    for (var _i2 = 0; _i2 <= len; _i2++) {
	      y = fns[_i2].call(_this2, y);
	    }
	    return y;
	  };
	}

	function curried(f, length, acc) {
	  return function () {
	    var combined = acc.concat(Array.prototype.slice.call(arguments));
	    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
	  };
	}

	function curry(f) {
	  // eslint-disable-line no-redeclare
	  return curried(f, f.length, []);
	}
	});

	unwrapExports(Fun$4);
	var Fun_1$2 = Fun$4.flip;
	var Fun_2$2 = Fun$4.constant;
	var Fun_3$2 = Fun$4.on;
	var Fun_4$2 = Fun$4.compose;
	var Fun_5$2 = Fun$4.pipe;
	var Fun_6$2 = Fun$4.curry;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * The `applyToJSON()` function defines toJSON() and inspect() prototype
	 * methods which are aliases for toString().
	 */
	function applyToJSON(classObject) {
	  classObject.prototype.toJSON = classObject.prototype.inspect = classObject.prototype.toString;
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * The `applyToStringTag()` function checks first to see if the runtime
	 * supports the `Symbol` class and then if the `Symbol.toStringTag` constant
	 * is defined as a `Symbol` instance. If both conditions are met, the
	 * Symbol.toStringTag property is defined as a getter that returns the
	 * supplied class constructor's name.
	 *
	 * @method applyToStringTag
	 *
	 * @param {Class<any>} classObject a class such as Object, String, Number but
	 * typically one of your own creation through the class keyword; `class A {}`,
	 * for example.
	 */
	function applyToStringTag(classObject) {
	  if (typeof Symbol === 'function' && Symbol.toStringTag) {
	    Object.defineProperty(classObject.prototype, Symbol.toStringTag, {
	      get: function get() {
	        return this.constructor.name;
	      }
	    });
	  }
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * A replacement for instanceof which includes an error warning when multi-realm
	 * constructors are detected.
	 */
	// See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
	// See: https://webpack.js.org/guides/production/
	var instanceOf = process.env.NODE_ENV === 'production' ? // eslint-disable-next-line no-shadow
	function instanceOf(value, constructor) {
	  return value instanceof constructor;
	} : // eslint-disable-next-line no-shadow
	function instanceOf(value, constructor) {
	  if (value instanceof constructor) {
	    return true;
	  }

	  if (value) {
	    var valueClass = value.constructor;
	    var className = constructor.name;

	    if (className && valueClass && valueClass.name === className) {
	      throw new Error("Cannot use ".concat(className, " \"").concat(value, "\" from another module or realm.\n\nEnsure that there is only one instance of \"graphql\" in the node_modules\ndirectory. If different versions of \"graphql\" are the dependencies of other\nrelied on modules, use \"resolutions\" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate \"graphql\" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results."));
	    }
	  }

	  return false;
	};

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */
	function invariant(condition, message) {
	  /* istanbul ignore else */
	  if (!condition) {
	    throw new Error(message);
	  }
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Creates a keyed JS object from an array, given a function to produce the keys
	 * for each value in the array.
	 *
	 * This provides a convenient lookup for the array items if the key function
	 * produces unique results.
	 *
	 *     const phoneBook = [
	 *       { name: 'Jon', num: '555-1234' },
	 *       { name: 'Jenny', num: '867-5309' }
	 *     ]
	 *
	 *     // { Jon: { name: 'Jon', num: '555-1234' },
	 *     //   Jenny: { name: 'Jenny', num: '867-5309' } }
	 *     const entriesByName = keyMap(
	 *       phoneBook,
	 *       entry => entry.name
	 *     )
	 *
	 *     // { name: 'Jenny', num: '857-6309' }
	 *     const jennyEntry = entriesByName['Jenny']
	 *
	 */
	function keyMap(list, keyFn) {
	  return list.reduce(function (map, item) {
	    return map[keyFn(item)] = item, map;
	  }, Object.create(null));
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * The set of allowed kind values for AST nodes.
	 */
	var Kind = Object.freeze({
	  // Name
	  NAME: 'Name',
	  // Document
	  DOCUMENT: 'Document',
	  OPERATION_DEFINITION: 'OperationDefinition',
	  VARIABLE_DEFINITION: 'VariableDefinition',
	  SELECTION_SET: 'SelectionSet',
	  FIELD: 'Field',
	  ARGUMENT: 'Argument',
	  // Fragments
	  FRAGMENT_SPREAD: 'FragmentSpread',
	  INLINE_FRAGMENT: 'InlineFragment',
	  FRAGMENT_DEFINITION: 'FragmentDefinition',
	  // Values
	  VARIABLE: 'Variable',
	  INT: 'IntValue',
	  FLOAT: 'FloatValue',
	  STRING: 'StringValue',
	  BOOLEAN: 'BooleanValue',
	  NULL: 'NullValue',
	  ENUM: 'EnumValue',
	  LIST: 'ListValue',
	  OBJECT: 'ObjectValue',
	  OBJECT_FIELD: 'ObjectField',
	  // Directives
	  DIRECTIVE: 'Directive',
	  // Types
	  NAMED_TYPE: 'NamedType',
	  LIST_TYPE: 'ListType',
	  NON_NULL_TYPE: 'NonNullType',
	  // Type System Definitions
	  SCHEMA_DEFINITION: 'SchemaDefinition',
	  OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
	  // Type Definitions
	  SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
	  OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
	  FIELD_DEFINITION: 'FieldDefinition',
	  INPUT_VALUE_DEFINITION: 'InputValueDefinition',
	  INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
	  UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
	  ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
	  ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
	  INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
	  // Directive Definitions
	  DIRECTIVE_DEFINITION: 'DirectiveDefinition',
	  // Type System Extensions
	  SCHEMA_EXTENSION: 'SchemaExtension',
	  // Type Extensions
	  SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
	  OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
	  INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
	  UNION_TYPE_EXTENSION: 'UnionTypeExtension',
	  ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
	  INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
	});
	/**
	 * The enum type representing the possible kind values of AST nodes.
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Creates a keyed JS object from an array, given a function to produce the keys
	 * and a function to produce the values from each item in the array.
	 *
	 *     const phoneBook = [
	 *       { name: 'Jon', num: '555-1234' },
	 *       { name: 'Jenny', num: '867-5309' }
	 *     ]
	 *
	 *     // { Jon: '555-1234', Jenny: '867-5309' }
	 *     const phonesByName = keyValMap(
	 *       phoneBook,
	 *       entry => entry.name,
	 *       entry => entry.num
	 *     )
	 *
	 */
	function keyValMap(list, keyFn, valFn) {
	  return list.reduce(function (map, item) {
	    return map[keyFn(item)] = valFn(item), map;
	  }, Object.create(null));
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Returns true if a value is undefined, or NaN.
	 */
	function isInvalid(value) {
	  return value === undefined || value !== value;
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Produces a JavaScript value given a GraphQL Value AST.
	 *
	 * Unlike `valueFromAST()`, no type is provided. The resulting JavaScript value
	 * will reflect the provided GraphQL value AST.
	 *
	 * | GraphQL Value        | JavaScript Value |
	 * | -------------------- | ---------------- |
	 * | Input Object         | Object           |
	 * | List                 | Array            |
	 * | Boolean              | Boolean          |
	 * | String / Enum        | String           |
	 * | Int / Float          | Number           |
	 * | Null                 | null             |
	 *
	 */
	function valueFromASTUntyped(valueNode, variables) {
	  switch (valueNode.kind) {
	    case Kind.NULL:
	      return null;

	    case Kind.INT:
	      return parseInt(valueNode.value, 10);

	    case Kind.FLOAT:
	      return parseFloat(valueNode.value);

	    case Kind.STRING:
	    case Kind.ENUM:
	    case Kind.BOOLEAN:
	      return valueNode.value;

	    case Kind.LIST:
	      return valueNode.values.map(function (node) {
	        return valueFromASTUntyped(node, variables);
	      });

	    case Kind.OBJECT:
	      return keyValMap(valueNode.fields, function (field) {
	        return field.name.value;
	      }, function (field) {
	        return valueFromASTUntyped(field.value, variables);
	      });

	    case Kind.VARIABLE:
	      var variableName = valueNode.name.value;
	      return variables && !isInvalid(variables[variableName]) ? variables[variableName] : undefined;
	  }
	  /* istanbul ignore next */


	  throw new Error('Unexpected value kind: ' + valueNode.kind);
	}

	function _typeof$2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }

	function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	function isType(type) {
	  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
	}
	function assertType(type) {
	  !isType(type) ? invariant(0, "Expected ".concat(inspect(type), " to be a GraphQL type.")) : void 0;
	  return type;
	}
	/**
	 * There are predicates for each kind of GraphQL type.
	 */

	// eslint-disable-next-line no-redeclare
	function isScalarType(type) {
	  return instanceOf(type, GraphQLScalarType);
	}
	// eslint-disable-next-line no-redeclare
	function isObjectType(type) {
	  return instanceOf(type, GraphQLObjectType);
	}
	// eslint-disable-next-line no-redeclare
	function isInterfaceType(type) {
	  return instanceOf(type, GraphQLInterfaceType);
	}
	// eslint-disable-next-line no-redeclare
	function isUnionType(type) {
	  return instanceOf(type, GraphQLUnionType);
	}
	// eslint-disable-next-line no-redeclare
	function isEnumType(type) {
	  return instanceOf(type, GraphQLEnumType);
	}
	// eslint-disable-next-line no-redeclare
	function isInputObjectType(type) {
	  return instanceOf(type, GraphQLInputObjectType);
	}
	// eslint-disable-next-line no-redeclare
	function isListType(type) {
	  return instanceOf(type, GraphQLList);
	}
	// eslint-disable-next-line no-redeclare
	function isNonNullType(type) {
	  return instanceOf(type, GraphQLNonNull);
	}
	/**
	 * These types may be used as input types for arguments and directives.
	 */

	function isInputType(type) {
	  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
	}
	/**
	 * These types may be used as output types as the result of fields.
	 */

	function isOutputType(type) {
	  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isWrappingType(type) && isOutputType(type.ofType);
	}
	/**
	 * These types may describe the parent context of a selection set.
	 */

	function isCompositeType(type) {
	  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
	}
	/**
	 * These types may describe the parent context of a selection set.
	 */

	function isAbstractType(type) {
	  return isInterfaceType(type) || isUnionType(type);
	}
	/**
	 * List Type Wrapper
	 *
	 * A list is a wrapping type which points to another type.
	 * Lists are often created within the context of defining the fields of
	 * an object type.
	 *
	 * Example:
	 *
	 *     const PersonType = new GraphQLObjectType({
	 *       name: 'Person',
	 *       fields: () => ({
	 *         parents: { type: GraphQLList(PersonType) },
	 *         children: { type: GraphQLList(PersonType) },
	 *       })
	 *     })
	 *
	 */

	// eslint-disable-next-line no-redeclare
	function GraphQLList(ofType) {
	  if (this instanceof GraphQLList) {
	    this.ofType = assertType(ofType);
	  } else {
	    return new GraphQLList(ofType);
	  }
	} // Need to cast through any to alter the prototype.

	GraphQLList.prototype.toString = function toString() {
	  return '[' + String(this.ofType) + ']';
	};

	applyToJSON(GraphQLList);
	/**
	 * Non-Null Type Wrapper
	 *
	 * A non-null is a wrapping type which points to another type.
	 * Non-null types enforce that their values are never null and can ensure
	 * an error is raised if this ever occurs during a request. It is useful for
	 * fields which you can make a strong guarantee on non-nullability, for example
	 * usually the id field of a database row will never be null.
	 *
	 * Example:
	 *
	 *     const RowType = new GraphQLObjectType({
	 *       name: 'Row',
	 *       fields: () => ({
	 *         id: { type: GraphQLNonNull(GraphQLString) },
	 *       })
	 *     })
	 *
	 * Note: the enforcement of non-nullability occurs within the executor.
	 */

	// eslint-disable-next-line no-redeclare
	function GraphQLNonNull(ofType) {
	  if (this instanceof GraphQLNonNull) {
	    this.ofType = assertNullableType(ofType);
	  } else {
	    return new GraphQLNonNull(ofType);
	  }
	} // Need to cast through any to alter the prototype.

	GraphQLNonNull.prototype.toString = function toString() {
	  return String(this.ofType) + '!';
	};

	applyToJSON(GraphQLNonNull);
	/**
	 * These types wrap and modify other types
	 */

	function isWrappingType(type) {
	  return isListType(type) || isNonNullType(type);
	}
	/**
	 * These types can all accept null as a value.
	 */

	function isNullableType(type) {
	  return isType(type) && !isNonNullType(type);
	}
	function assertNullableType(type) {
	  !isNullableType(type) ? invariant(0, "Expected ".concat(inspect(type), " to be a GraphQL nullable type.")) : void 0;
	  return type;
	}
	/* eslint-disable no-redeclare */

	function getNullableType(type) {
	  /* eslint-enable no-redeclare */
	  if (type) {
	    return isNonNullType(type) ? type.ofType : type;
	  }
	}
	/* eslint-disable no-redeclare */

	function getNamedType(type) {
	  /* eslint-enable no-redeclare */
	  if (type) {
	    var unwrappedType = type;

	    while (isWrappingType(unwrappedType)) {
	      unwrappedType = unwrappedType.ofType;
	    }

	    return unwrappedType;
	  }
	}
	/**
	 * Used while defining GraphQL types to allow for circular references in
	 * otherwise immutable type definitions.
	 */

	function resolveThunk(thunk) {
	  return typeof thunk === 'function' ? thunk() : thunk;
	}
	/**
	 * Scalar Type Definition
	 *
	 * The leaf values of any request and input values to arguments are
	 * Scalars (or Enums) and are defined with a name and a series of functions
	 * used to parse input from ast or variables and to ensure validity.
	 *
	 * If a type's serialize function does not return a value (i.e. it returns
	 * `undefined`) then an error will be raised and a `null` value will be returned
	 * in the response. If the serialize function returns `null`, then no error will
	 * be included in the response.
	 *
	 * Example:
	 *
	 *     const OddType = new GraphQLScalarType({
	 *       name: 'Odd',
	 *       serialize(value) {
	 *         if (value % 2 === 1) {
	 *           return value;
	 *         }
	 *       }
	 *     });
	 *
	 */


	var GraphQLScalarType =
	/*#__PURE__*/
	function () {
	  function GraphQLScalarType(config) {
	    _defineProperty$2(this, "name", void 0);

	    _defineProperty$2(this, "description", void 0);

	    _defineProperty$2(this, "serialize", void 0);

	    _defineProperty$2(this, "parseValue", void 0);

	    _defineProperty$2(this, "parseLiteral", void 0);

	    _defineProperty$2(this, "astNode", void 0);

	    _defineProperty$2(this, "extensionASTNodes", void 0);

	    this.name = config.name;
	    this.description = config.description;
	    this.serialize = config.serialize;

	    this.parseValue = config.parseValue || function (value) {
	      return value;
	    };

	    this.parseLiteral = config.parseLiteral || valueFromASTUntyped;
	    this.astNode = config.astNode;
	    this.extensionASTNodes = config.extensionASTNodes;
	    !(typeof config.name === 'string') ? invariant(0, 'Must provide name.') : void 0;
	    !(typeof config.serialize === 'function') ? invariant(0, "".concat(this.name, " must provide \"serialize\" function. If this custom Scalar ") + 'is also used as an input type, ensure "parseValue" and "parseLiteral" ' + 'functions are also provided.') : void 0;

	    if (config.parseValue || config.parseLiteral) {
	      !(typeof config.parseValue === 'function' && typeof config.parseLiteral === 'function') ? invariant(0, "".concat(this.name, " must provide both \"parseValue\" and \"parseLiteral\" ") + 'functions.') : void 0;
	    }
	  }

	  var _proto = GraphQLScalarType.prototype;

	  _proto.toString = function toString() {
	    return this.name;
	  };

	  return GraphQLScalarType;
	}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(GraphQLScalarType);
	applyToJSON(GraphQLScalarType);

	/**
	 * Object Type Definition
	 *
	 * Almost all of the GraphQL types you define will be object types. Object types
	 * have a name, but most importantly describe their fields.
	 *
	 * Example:
	 *
	 *     const AddressType = new GraphQLObjectType({
	 *       name: 'Address',
	 *       fields: {
	 *         street: { type: GraphQLString },
	 *         number: { type: GraphQLInt },
	 *         formatted: {
	 *           type: GraphQLString,
	 *           resolve(obj) {
	 *             return obj.number + ' ' + obj.street
	 *           }
	 *         }
	 *       }
	 *     });
	 *
	 * When two types need to refer to each other, or a type needs to refer to
	 * itself in a field, you can use a function expression (aka a closure or a
	 * thunk) to supply the fields lazily.
	 *
	 * Example:
	 *
	 *     const PersonType = new GraphQLObjectType({
	 *       name: 'Person',
	 *       fields: () => ({
	 *         name: { type: GraphQLString },
	 *         bestFriend: { type: PersonType },
	 *       })
	 *     });
	 *
	 */
	var GraphQLObjectType =
	/*#__PURE__*/
	function () {
	  function GraphQLObjectType(config) {
	    _defineProperty$2(this, "name", void 0);

	    _defineProperty$2(this, "description", void 0);

	    _defineProperty$2(this, "astNode", void 0);

	    _defineProperty$2(this, "extensionASTNodes", void 0);

	    _defineProperty$2(this, "isTypeOf", void 0);

	    _defineProperty$2(this, "_fields", void 0);

	    _defineProperty$2(this, "_interfaces", void 0);

	    this.name = config.name;
	    this.description = config.description;
	    this.astNode = config.astNode;
	    this.extensionASTNodes = config.extensionASTNodes;
	    this.isTypeOf = config.isTypeOf;
	    this._fields = defineFieldMap.bind(undefined, config);
	    this._interfaces = defineInterfaces.bind(undefined, config);
	    !(typeof config.name === 'string') ? invariant(0, 'Must provide name.') : void 0;
	    !(config.isTypeOf == null || typeof config.isTypeOf === 'function') ? invariant(0, "".concat(this.name, " must provide \"isTypeOf\" as a function, ") + "but got: ".concat(inspect(config.isTypeOf), ".")) : void 0;
	  }

	  var _proto2 = GraphQLObjectType.prototype;

	  _proto2.getFields = function getFields() {
	    if (typeof this._fields === 'function') {
	      this._fields = this._fields();
	    }

	    return this._fields;
	  };

	  _proto2.getInterfaces = function getInterfaces() {
	    if (typeof this._interfaces === 'function') {
	      this._interfaces = this._interfaces();
	    }

	    return this._interfaces;
	  };

	  _proto2.toString = function toString() {
	    return this.name;
	  };

	  return GraphQLObjectType;
	}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(GraphQLObjectType);
	applyToJSON(GraphQLObjectType);

	function defineInterfaces(config) {
	  var interfaces = resolveThunk(config.interfaces) || [];
	  !Array.isArray(interfaces) ? invariant(0, "".concat(config.name, " interfaces must be an Array or a function which returns ") + 'an Array.') : void 0;
	  return interfaces;
	}

	function defineFieldMap(config) {
	  var fieldMap = resolveThunk(config.fields) || {};
	  !isPlainObj(fieldMap) ? invariant(0, "".concat(config.name, " fields must be an object with field names as keys or a ") + 'function which returns such an object.') : void 0;
	  var resultFieldMap = Object.create(null);

	  var _arr = Object.keys(fieldMap);

	  var _loop = function _loop() {
	    var fieldName = _arr[_i];
	    var fieldConfig = fieldMap[fieldName];
	    !isPlainObj(fieldConfig) ? invariant(0, "".concat(config.name, ".").concat(fieldName, " field config must be an object")) : void 0;
	    !!fieldConfig.hasOwnProperty('isDeprecated') ? invariant(0, "".concat(config.name, ".").concat(fieldName, " should provide \"deprecationReason\" ") + 'instead of "isDeprecated".') : void 0;

	    var field = _objectSpread$1({}, fieldConfig, {
	      isDeprecated: Boolean(fieldConfig.deprecationReason),
	      name: fieldName
	    });

	    !(field.resolve == null || typeof field.resolve === 'function') ? invariant(0, "".concat(config.name, ".").concat(fieldName, " field resolver must be a function if ") + "provided, but got: ".concat(inspect(field.resolve), ".")) : void 0;
	    var argsConfig = fieldConfig.args;

	    if (!argsConfig) {
	      field.args = [];
	    } else {
	      !isPlainObj(argsConfig) ? invariant(0, "".concat(config.name, ".").concat(fieldName, " args must be an object with argument ") + 'names as keys.') : void 0;
	      field.args = Object.keys(argsConfig).map(function (argName) {
	        var arg = argsConfig[argName];
	        return {
	          name: argName,
	          description: arg.description === undefined ? null : arg.description,
	          type: arg.type,
	          defaultValue: arg.defaultValue,
	          astNode: arg.astNode
	        };
	      });
	    }

	    resultFieldMap[fieldName] = field;
	  };

	  for (var _i = 0; _i < _arr.length; _i++) {
	    _loop();
	  }

	  return resultFieldMap;
	}

	function isPlainObj(obj) {
	  return obj && _typeof$2(obj) === 'object' && !Array.isArray(obj);
	}

	/**
	 * Interface Type Definition
	 *
	 * When a field can return one of a heterogeneous set of types, a Interface type
	 * is used to describe what types are possible, what fields are in common across
	 * all types, as well as a function to determine which type is actually used
	 * when the field is resolved.
	 *
	 * Example:
	 *
	 *     const EntityType = new GraphQLInterfaceType({
	 *       name: 'Entity',
	 *       fields: {
	 *         name: { type: GraphQLString }
	 *       }
	 *     });
	 *
	 */
	var GraphQLInterfaceType =
	/*#__PURE__*/
	function () {
	  function GraphQLInterfaceType(config) {
	    _defineProperty$2(this, "name", void 0);

	    _defineProperty$2(this, "description", void 0);

	    _defineProperty$2(this, "astNode", void 0);

	    _defineProperty$2(this, "extensionASTNodes", void 0);

	    _defineProperty$2(this, "resolveType", void 0);

	    _defineProperty$2(this, "_fields", void 0);

	    this.name = config.name;
	    this.description = config.description;
	    this.astNode = config.astNode;
	    this.extensionASTNodes = config.extensionASTNodes;
	    this.resolveType = config.resolveType;
	    this._fields = defineFieldMap.bind(undefined, config);
	    !(typeof config.name === 'string') ? invariant(0, 'Must provide name.') : void 0;
	    !(config.resolveType == null || typeof config.resolveType === 'function') ? invariant(0, "".concat(this.name, " must provide \"resolveType\" as a function, ") + "but got: ".concat(inspect(config.resolveType), ".")) : void 0;
	  }

	  var _proto3 = GraphQLInterfaceType.prototype;

	  _proto3.getFields = function getFields() {
	    if (typeof this._fields === 'function') {
	      this._fields = this._fields();
	    }

	    return this._fields;
	  };

	  _proto3.toString = function toString() {
	    return this.name;
	  };

	  return GraphQLInterfaceType;
	}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(GraphQLInterfaceType);
	applyToJSON(GraphQLInterfaceType);

	/**
	 * Union Type Definition
	 *
	 * When a field can return one of a heterogeneous set of types, a Union type
	 * is used to describe what types are possible as well as providing a function
	 * to determine which type is actually used when the field is resolved.
	 *
	 * Example:
	 *
	 *     const PetType = new GraphQLUnionType({
	 *       name: 'Pet',
	 *       types: [ DogType, CatType ],
	 *       resolveType(value) {
	 *         if (value instanceof Dog) {
	 *           return DogType;
	 *         }
	 *         if (value instanceof Cat) {
	 *           return CatType;
	 *         }
	 *       }
	 *     });
	 *
	 */
	var GraphQLUnionType =
	/*#__PURE__*/
	function () {
	  function GraphQLUnionType(config) {
	    _defineProperty$2(this, "name", void 0);

	    _defineProperty$2(this, "description", void 0);

	    _defineProperty$2(this, "astNode", void 0);

	    _defineProperty$2(this, "extensionASTNodes", void 0);

	    _defineProperty$2(this, "resolveType", void 0);

	    _defineProperty$2(this, "_types", void 0);

	    this.name = config.name;
	    this.description = config.description;
	    this.astNode = config.astNode;
	    this.extensionASTNodes = config.extensionASTNodes;
	    this.resolveType = config.resolveType;
	    this._types = defineTypes.bind(undefined, config);
	    !(typeof config.name === 'string') ? invariant(0, 'Must provide name.') : void 0;
	    !(config.resolveType == null || typeof config.resolveType === 'function') ? invariant(0, "".concat(this.name, " must provide \"resolveType\" as a function, ") + "but got: ".concat(inspect(config.resolveType), ".")) : void 0;
	  }

	  var _proto4 = GraphQLUnionType.prototype;

	  _proto4.getTypes = function getTypes() {
	    if (typeof this._types === 'function') {
	      this._types = this._types();
	    }

	    return this._types;
	  };

	  _proto4.toString = function toString() {
	    return this.name;
	  };

	  return GraphQLUnionType;
	}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(GraphQLUnionType);
	applyToJSON(GraphQLUnionType);

	function defineTypes(config) {
	  var types = resolveThunk(config.types) || [];
	  !Array.isArray(types) ? invariant(0, 'Must provide Array of types or a function which returns ' + "such an array for Union ".concat(config.name, ".")) : void 0;
	  return types;
	}

	/**
	 * Enum Type Definition
	 *
	 * Some leaf values of requests and input values are Enums. GraphQL serializes
	 * Enum values as strings, however internally Enums can be represented by any
	 * kind of type, often integers.
	 *
	 * Example:
	 *
	 *     const RGBType = new GraphQLEnumType({
	 *       name: 'RGB',
	 *       values: {
	 *         RED: { value: 0 },
	 *         GREEN: { value: 1 },
	 *         BLUE: { value: 2 }
	 *       }
	 *     });
	 *
	 * Note: If a value is not provided in a definition, the name of the enum value
	 * will be used as its internal value.
	 */
	var GraphQLEnumType
	/* <T> */
	=
	/*#__PURE__*/
	function () {
	  function GraphQLEnumType(config
	  /* <T> */
	  ) {
	    _defineProperty$2(this, "name", void 0);

	    _defineProperty$2(this, "description", void 0);

	    _defineProperty$2(this, "astNode", void 0);

	    _defineProperty$2(this, "extensionASTNodes", void 0);

	    _defineProperty$2(this, "_values", void 0);

	    _defineProperty$2(this, "_valueLookup", void 0);

	    _defineProperty$2(this, "_nameLookup", void 0);

	    this.name = config.name;
	    this.description = config.description;
	    this.astNode = config.astNode;
	    this.extensionASTNodes = config.extensionASTNodes;
	    this._values = defineEnumValues(this, config.values);
	    this._valueLookup = new Map(this._values.map(function (enumValue) {
	      return [enumValue.value, enumValue];
	    }));
	    this._nameLookup = keyMap(this._values, function (value) {
	      return value.name;
	    });
	    !(typeof config.name === 'string') ? invariant(0, 'Must provide name.') : void 0;
	  }

	  var _proto5 = GraphQLEnumType.prototype;

	  _proto5.getValues = function getValues() {
	    return this._values;
	  };

	  _proto5.getValue = function getValue(name) {
	    return this._nameLookup[name];
	  };

	  _proto5.serialize = function serialize(value
	  /* T */
	  ) {
	    var enumValue = this._valueLookup.get(value);

	    if (enumValue) {
	      return enumValue.name;
	    }
	  };

	  _proto5.parseValue = function parseValue(value)
	  /* T */
	  {
	    if (typeof value === 'string') {
	      var enumValue = this.getValue(value);

	      if (enumValue) {
	        return enumValue.value;
	      }
	    }
	  };

	  _proto5.parseLiteral = function parseLiteral(valueNode, _variables)
	  /* T */
	  {
	    // Note: variables will be resolved to a value before calling this function.
	    if (valueNode.kind === Kind.ENUM) {
	      var enumValue = this.getValue(valueNode.value);

	      if (enumValue) {
	        return enumValue.value;
	      }
	    }
	  };

	  _proto5.toString = function toString() {
	    return this.name;
	  };

	  return GraphQLEnumType;
	}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(GraphQLEnumType);
	applyToJSON(GraphQLEnumType);

	function defineEnumValues(type, valueMap
	/* <T> */
	) {
	  !isPlainObj(valueMap) ? invariant(0, "".concat(type.name, " values must be an object with value names as keys.")) : void 0;
	  return Object.keys(valueMap).map(function (valueName) {
	    var value = valueMap[valueName];
	    !isPlainObj(value) ? invariant(0, "".concat(type.name, ".").concat(valueName, " must refer to an object with a \"value\" key ") + "representing an internal value but got: ".concat(inspect(value), ".")) : void 0;
	    !!value.hasOwnProperty('isDeprecated') ? invariant(0, "".concat(type.name, ".").concat(valueName, " should provide \"deprecationReason\" instead ") + 'of "isDeprecated".') : void 0;
	    return {
	      name: valueName,
	      description: value.description,
	      isDeprecated: Boolean(value.deprecationReason),
	      deprecationReason: value.deprecationReason,
	      astNode: value.astNode,
	      value: value.hasOwnProperty('value') ? value.value : valueName
	    };
	  });
	}

	/**
	 * Input Object Type Definition
	 *
	 * An input object defines a structured collection of fields which may be
	 * supplied to a field argument.
	 *
	 * Using `NonNull` will ensure that a value must be provided by the query
	 *
	 * Example:
	 *
	 *     const GeoPoint = new GraphQLInputObjectType({
	 *       name: 'GeoPoint',
	 *       fields: {
	 *         lat: { type: GraphQLNonNull(GraphQLFloat) },
	 *         lon: { type: GraphQLNonNull(GraphQLFloat) },
	 *         alt: { type: GraphQLFloat, defaultValue: 0 },
	 *       }
	 *     });
	 *
	 */
	var GraphQLInputObjectType =
	/*#__PURE__*/
	function () {
	  function GraphQLInputObjectType(config) {
	    _defineProperty$2(this, "name", void 0);

	    _defineProperty$2(this, "description", void 0);

	    _defineProperty$2(this, "astNode", void 0);

	    _defineProperty$2(this, "extensionASTNodes", void 0);

	    _defineProperty$2(this, "_fields", void 0);

	    this.name = config.name;
	    this.description = config.description;
	    this.astNode = config.astNode;
	    this.extensionASTNodes = config.extensionASTNodes;
	    this._fields = defineInputFieldMap.bind(undefined, config);
	    !(typeof config.name === 'string') ? invariant(0, 'Must provide name.') : void 0;
	  }

	  var _proto6 = GraphQLInputObjectType.prototype;

	  _proto6.getFields = function getFields() {
	    if (typeof this._fields === 'function') {
	      this._fields = this._fields();
	    }

	    return this._fields;
	  };

	  _proto6.toString = function toString() {
	    return this.name;
	  };

	  return GraphQLInputObjectType;
	}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(GraphQLInputObjectType);
	applyToJSON(GraphQLInputObjectType);

	function defineInputFieldMap(config) {
	  var fieldMap = resolveThunk(config.fields) || {};
	  !isPlainObj(fieldMap) ? invariant(0, "".concat(config.name, " fields must be an object with field names as keys or a ") + 'function which returns such an object.') : void 0;
	  var resultFieldMap = Object.create(null);

	  var _arr2 = Object.keys(fieldMap);

	  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
	    var fieldName = _arr2[_i2];

	    var field = _objectSpread$1({}, fieldMap[fieldName], {
	      name: fieldName
	    });

	    !!field.hasOwnProperty('resolve') ? invariant(0, "".concat(config.name, ".").concat(fieldName, " field has a resolve property, but ") + 'Input Types cannot define resolvers.') : void 0;
	    resultFieldMap[fieldName] = field;
	  }

	  return resultFieldMap;
	}

	/**
	 * Copyright (c) 2018-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/* eslint-disable no-redeclare */
	// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/4441
	var isFinite$1 = Number.isFinite || function (value) {
	  return typeof value === 'number' && isFinite$1(value);
	};

	/**
	 * Copyright (c) 2018-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/* eslint-disable no-redeclare */
	// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/4441
	var isInteger$2 = Number.isInteger || function (value) {
	  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
	};

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */
	// 32-bit signed integer, providing the broadest support across platforms.
	//
	// n.b. JavaScript's integers are safe between -(2^53 - 1) and 2^53 - 1 because
	// they are internally represented as IEEE 754 doubles.

	var MAX_INT = 2147483647;
	var MIN_INT = -2147483648;

	function serializeInt(value) {
	  if (typeof value === 'boolean') {
	    return value ? 1 : 0;
	  }

	  var num = value;

	  if (typeof value === 'string' && value !== '') {
	    num = Number(value);
	  }

	  if (!isInteger$2(num)) {
	    throw new TypeError("Int cannot represent non-integer value: ".concat(inspect(value)));
	  }

	  if (num > MAX_INT || num < MIN_INT) {
	    throw new TypeError("Int cannot represent non 32-bit signed integer value: ".concat(inspect(value)));
	  }

	  return num;
	}

	function coerceInt(value) {
	  if (!isInteger$2(value)) {
	    throw new TypeError("Int cannot represent non-integer value: ".concat(inspect(value)));
	  }

	  if (value > MAX_INT || value < MIN_INT) {
	    throw new TypeError("Int cannot represent non 32-bit signed integer value: ".concat(inspect(value)));
	  }

	  return value;
	}

	var GraphQLInt = new GraphQLScalarType({
	  name: 'Int',
	  description: 'The `Int` scalar type represents non-fractional signed whole numeric ' + 'values. Int can represent values between -(2^31) and 2^31 - 1. ',
	  serialize: serializeInt,
	  parseValue: coerceInt,
	  parseLiteral: function parseLiteral(ast) {
	    if (ast.kind === Kind.INT) {
	      var num = parseInt(ast.value, 10);

	      if (num <= MAX_INT && num >= MIN_INT) {
	        return num;
	      }
	    }

	    return undefined;
	  }
	});

	function serializeFloat(value) {
	  if (typeof value === 'boolean') {
	    return value ? 1 : 0;
	  }

	  var num = value;

	  if (typeof value === 'string' && value !== '') {
	    num = Number(value);
	  }

	  if (!isFinite$1(num)) {
	    throw new TypeError("Float cannot represent non numeric value: ".concat(inspect(value)));
	  }

	  return num;
	}

	function coerceFloat(value) {
	  if (!isFinite$1(value)) {
	    throw new TypeError("Float cannot represent non numeric value: ".concat(inspect(value)));
	  }

	  return value;
	}

	var GraphQLFloat = new GraphQLScalarType({
	  name: 'Float',
	  description: 'The `Float` scalar type represents signed double-precision fractional ' + 'values as specified by ' + '[IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). ',
	  serialize: serializeFloat,
	  parseValue: coerceFloat,
	  parseLiteral: function parseLiteral(ast) {
	    return ast.kind === Kind.FLOAT || ast.kind === Kind.INT ? parseFloat(ast.value) : undefined;
	  }
	});

	function serializeString(value) {
	  // Support serializing objects with custom valueOf() functions - a common way
	  // to represent an complex value which can be represented as a string
	  // (ex: MongoDB id objects).
	  var result = value && typeof value.valueOf === 'function' ? value.valueOf() : value; // Serialize string, boolean and number values to a string, but do not
	  // attempt to coerce object, function, symbol, or other types as strings.

	  if (typeof result === 'string') {
	    return result;
	  }

	  if (typeof result === 'boolean') {
	    return result ? 'true' : 'false';
	  }

	  if (isFinite$1(result)) {
	    return result.toString();
	  }

	  throw new TypeError("String cannot represent value: ".concat(inspect(value)));
	}

	function coerceString(value) {
	  if (typeof value !== 'string') {
	    throw new TypeError("String cannot represent a non string value: ".concat(inspect(value)));
	  }

	  return value;
	}

	var GraphQLString = new GraphQLScalarType({
	  name: 'String',
	  description: 'The `String` scalar type represents textual data, represented as UTF-8 ' + 'character sequences. The String type is most often used by GraphQL to ' + 'represent free-form human-readable text.',
	  serialize: serializeString,
	  parseValue: coerceString,
	  parseLiteral: function parseLiteral(ast) {
	    return ast.kind === Kind.STRING ? ast.value : undefined;
	  }
	});

	function serializeBoolean(value) {
	  if (typeof value === 'boolean') {
	    return value;
	  }

	  if (isFinite$1(value)) {
	    return value !== 0;
	  }

	  throw new TypeError("Boolean cannot represent a non boolean value: ".concat(inspect(value)));
	}

	function coerceBoolean(value) {
	  if (typeof value !== 'boolean') {
	    throw new TypeError("Boolean cannot represent a non boolean value: ".concat(inspect(value)));
	  }

	  return value;
	}

	var GraphQLBoolean = new GraphQLScalarType({
	  name: 'Boolean',
	  description: 'The `Boolean` scalar type represents `true` or `false`.',
	  serialize: serializeBoolean,
	  parseValue: coerceBoolean,
	  parseLiteral: function parseLiteral(ast) {
	    return ast.kind === Kind.BOOLEAN ? ast.value : undefined;
	  }
	});

	function serializeID(value) {
	  // Support serializing objects with custom valueOf() functions - a common way
	  // to represent an object identifier (ex. MongoDB).
	  var result = value && typeof value.valueOf === 'function' ? value.valueOf() : value;

	  if (typeof result === 'string') {
	    return result;
	  }

	  if (isInteger$2(result)) {
	    return String(result);
	  }

	  throw new TypeError("ID cannot represent value: ".concat(inspect(value)));
	}

	function coerceID(value) {
	  if (typeof value === 'string') {
	    return value;
	  }

	  if (isInteger$2(value)) {
	    return value.toString();
	  }

	  throw new TypeError("ID cannot represent value: ".concat(inspect(value)));
	}

	var GraphQLID = new GraphQLScalarType({
	  name: 'ID',
	  description: 'The `ID` scalar type represents a unique identifier, often used to ' + 'refetch an object or as key for a cache. The ID type appears in a JSON ' + 'response as a String; however, it is not intended to be human-readable. ' + 'When expected as an input type, any string (such as `"4"`) or integer ' + '(such as `4`) input value will be accepted as an ID.',
	  serialize: serializeID,
	  parseValue: coerceID,
	  parseLiteral: function parseLiteral(ast) {
	    return ast.kind === Kind.STRING || ast.kind === Kind.INT ? ast.value : undefined;
	  }
	});

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * The set of allowed directive location values.
	 */
	var DirectiveLocation = Object.freeze({
	  // Request Definitions
	  QUERY: 'QUERY',
	  MUTATION: 'MUTATION',
	  SUBSCRIPTION: 'SUBSCRIPTION',
	  FIELD: 'FIELD',
	  FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
	  FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
	  INLINE_FRAGMENT: 'INLINE_FRAGMENT',
	  VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
	  // Type System Definitions
	  SCHEMA: 'SCHEMA',
	  SCALAR: 'SCALAR',
	  OBJECT: 'OBJECT',
	  FIELD_DEFINITION: 'FIELD_DEFINITION',
	  ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
	  INTERFACE: 'INTERFACE',
	  UNION: 'UNION',
	  ENUM: 'ENUM',
	  ENUM_VALUE: 'ENUM_VALUE',
	  INPUT_OBJECT: 'INPUT_OBJECT',
	  INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
	});
	/**
	 * The enum type representing the directive location values.
	 */

	function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	/**
	 * Test if the given value is a GraphQL directive.
	 */

	// eslint-disable-next-line no-redeclare
	function isDirective(directive) {
	  return instanceOf(directive, GraphQLDirective);
	}
	/**
	 * Directives are used by the GraphQL runtime as a way of modifying execution
	 * behavior. Type system creators will usually not create these directly.
	 */

	var GraphQLDirective =
	/*#__PURE__*/
	function () {
	  function GraphQLDirective(config) {
	    _defineProperty$3(this, "name", void 0);

	    _defineProperty$3(this, "description", void 0);

	    _defineProperty$3(this, "locations", void 0);

	    _defineProperty$3(this, "args", void 0);

	    _defineProperty$3(this, "astNode", void 0);

	    this.name = config.name;
	    this.description = config.description;
	    this.locations = config.locations;
	    this.astNode = config.astNode;
	    !config.name ? invariant(0, 'Directive must be named.') : void 0;
	    !Array.isArray(config.locations) ? invariant(0, 'Must provide locations for directive.') : void 0;
	    var args = config.args;

	    if (!args) {
	      this.args = [];
	    } else {
	      !!Array.isArray(args) ? invariant(0, "@".concat(config.name, " args must be an object with argument names as keys.")) : void 0;
	      this.args = Object.keys(args).map(function (argName) {
	        var arg = args[argName];
	        return {
	          name: argName,
	          description: arg.description === undefined ? null : arg.description,
	          type: arg.type,
	          defaultValue: arg.defaultValue,
	          astNode: arg.astNode
	        };
	      });
	    }
	  }

	  var _proto = GraphQLDirective.prototype;

	  _proto.toString = function toString() {
	    return '@' + this.name;
	  };

	  return GraphQLDirective;
	}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(GraphQLDirective);
	applyToJSON(GraphQLDirective);

	/**
	 * Used to conditionally include fields or fragments.
	 */
	var GraphQLIncludeDirective = new GraphQLDirective({
	  name: 'include',
	  description: 'Directs the executor to include this field or fragment only when ' + 'the `if` argument is true.',
	  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
	  args: {
	    if: {
	      type: GraphQLNonNull(GraphQLBoolean),
	      description: 'Included when true.'
	    }
	  }
	});
	/**
	 * Used to conditionally skip (exclude) fields or fragments.
	 */

	var GraphQLSkipDirective = new GraphQLDirective({
	  name: 'skip',
	  description: 'Directs the executor to skip this field or fragment when the `if` ' + 'argument is true.',
	  locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
	  args: {
	    if: {
	      type: GraphQLNonNull(GraphQLBoolean),
	      description: 'Skipped when true.'
	    }
	  }
	});
	/**
	 * Constant string used for default reason for a deprecation.
	 */

	var DEFAULT_DEPRECATION_REASON = 'No longer supported';
	/**
	 * Used to declare element of a GraphQL schema as deprecated.
	 */

	var GraphQLDeprecatedDirective = new GraphQLDirective({
	  name: 'deprecated',
	  description: 'Marks an element of a GraphQL schema as no longer supported.',
	  locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.ENUM_VALUE],
	  args: {
	    reason: {
	      type: GraphQLString,
	      description: 'Explains why this element was deprecated, usually also including a ' + 'suggestion for how to access supported similar data. Formatted using ' + 'the Markdown syntax (as specified by [CommonMark](https://commonmark.org/).',
	      defaultValue: DEFAULT_DEPRECATION_REASON
	    }
	  }
	});
	/**
	 * The full list of specified directives.
	 */

	var specifiedDirectives = [GraphQLIncludeDirective, GraphQLSkipDirective, GraphQLDeprecatedDirective];

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/* eslint-disable no-redeclare */
	// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/2221
	var objectValues = Object.values || function (obj) {
	  return Object.keys(obj).map(function (key) {
	    return obj[key];
	  });
	};

	/**
	 * Copyright (c) 2016, Lee Byron
	 * All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @flow
	 * @ignore
	 */

	/**
	 * [Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)
	 * is a *protocol* which describes a standard way to produce a sequence of
	 * values, typically the values of the Iterable represented by this Iterator.
	 *
	 * While described by the [ES2015 version of JavaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-iterator-interface)
	 * it can be utilized by any version of JavaScript.
	 *
	 * @external Iterator
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator|MDN Iteration protocols}
	 */

	/**
	 * [Iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
	 * is a *protocol* which when implemented allows a JavaScript object to define
	 * their iteration behavior, such as what values are looped over in a
	 * [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
	 * loop or `iterall`'s `forEach` function. Many [built-in types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Builtin_iterables)
	 * implement the Iterable protocol, including `Array` and `Map`.
	 *
	 * While described by the [ES2015 version of JavaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-iterable-interface)
	 * it can be utilized by any version of JavaScript.
	 *
	 * @external Iterable
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable|MDN Iteration protocols}
	 */

	// In ES2015 environments, Symbol exists
	var SYMBOL /*: any */ = typeof Symbol === 'function' ? Symbol : void 0;

	// In ES2015 (or a polyfilled) environment, this will be Symbol.iterator
	var SYMBOL_ITERATOR = SYMBOL && SYMBOL.iterator;

	/**
	 * Returns true if the provided object implements the Iterator protocol via
	 * either implementing a `Symbol.iterator` or `"@@iterator"` method.
	 *
	 * @example
	 *
	 * var isIterable = require('iterall').isIterable
	 * isIterable([ 1, 2, 3 ]) // true
	 * isIterable('ABC') // true
	 * isIterable({ length: 1, 0: 'Alpha' }) // false
	 * isIterable({ key: 'value' }) // false
	 * isIterable(new Map()) // true
	 *
	 * @param obj
	 *   A value which might implement the Iterable protocol.
	 * @return {boolean} true if Iterable.
	 */
	/*:: declare export function isIterable(obj: any): boolean; */
	function isIterable$3(obj) {
	  return !!getIteratorMethod(obj)
	}

	/**
	 * Returns true if the provided object implements the Array-like protocol via
	 * defining a positive-integer `length` property.
	 *
	 * @example
	 *
	 * var isArrayLike = require('iterall').isArrayLike
	 * isArrayLike([ 1, 2, 3 ]) // true
	 * isArrayLike('ABC') // true
	 * isArrayLike({ length: 1, 0: 'Alpha' }) // true
	 * isArrayLike({ key: 'value' }) // false
	 * isArrayLike(new Map()) // false
	 *
	 * @param obj
	 *   A value which might implement the Array-like protocol.
	 * @return {boolean} true if Array-like.
	 */
	/*:: declare export function isArrayLike(obj: any): boolean; */
	function isArrayLike(obj) {
	  var length = obj != null && obj.length;
	  return typeof length === 'number' && length >= 0 && length % 1 === 0
	}

	/**
	 * Returns true if the provided object is an Object (i.e. not a string literal)
	 * and is either Iterable or Array-like.
	 *
	 * This may be used in place of [Array.isArray()][isArray] to determine if an
	 * object should be iterated-over. It always excludes string literals and
	 * includes Arrays (regardless of if it is Iterable). It also includes other
	 * Array-like objects such as NodeList, TypedArray, and Buffer.
	 *
	 * @example
	 *
	 * var isCollection = require('iterall').isCollection
	 * isCollection([ 1, 2, 3 ]) // true
	 * isCollection('ABC') // false
	 * isCollection({ length: 1, 0: 'Alpha' }) // true
	 * isCollection({ key: 'value' }) // false
	 * isCollection(new Map()) // true
	 *
	 * @example
	 *
	 * var forEach = require('iterall').forEach
	 * if (isCollection(obj)) {
	 *   forEach(obj, function (value) {
	 *     console.log(value)
	 *   })
	 * }
	 *
	 * @param obj
	 *   An Object value which might implement the Iterable or Array-like protocols.
	 * @return {boolean} true if Iterable or Array-like Object.
	 */
	/*:: declare export function isCollection(obj: any): boolean; */
	function isCollection(obj) {
	  return Object(obj) === obj && (isArrayLike(obj) || isIterable$3(obj))
	}

	/**
	 * If the provided object implements the Iterator protocol, its Iterator object
	 * is returned. Otherwise returns undefined.
	 *
	 * @example
	 *
	 * var getIterator = require('iterall').getIterator
	 * var iterator = getIterator([ 1, 2, 3 ])
	 * iterator.next() // { value: 1, done: false }
	 * iterator.next() // { value: 2, done: false }
	 * iterator.next() // { value: 3, done: false }
	 * iterator.next() // { value: undefined, done: true }
	 *
	 * @template T the type of each iterated value
	 * @param {Iterable<T>} iterable
	 *   An Iterable object which is the source of an Iterator.
	 * @return {Iterator<T>} new Iterator instance.
	 */
	/*:: declare export var getIterator:
	  & (<+TValue>(iterable: Iterable<TValue>) => Iterator<TValue>)
	  & ((iterable: mixed) => void | Iterator<mixed>); */
	function getIterator$3(iterable) {
	  var method = getIteratorMethod(iterable);
	  if (method) {
	    return method.call(iterable)
	  }
	}

	/**
	 * If the provided object implements the Iterator protocol, the method
	 * responsible for producing its Iterator object is returned.
	 *
	 * This is used in rare cases for performance tuning. This method must be called
	 * with obj as the contextual this-argument.
	 *
	 * @example
	 *
	 * var getIteratorMethod = require('iterall').getIteratorMethod
	 * var myArray = [ 1, 2, 3 ]
	 * var method = getIteratorMethod(myArray)
	 * if (method) {
	 *   var iterator = method.call(myArray)
	 * }
	 *
	 * @template T the type of each iterated value
	 * @param {Iterable<T>} iterable
	 *   An Iterable object which defines an `@@iterator` method.
	 * @return {function(): Iterator<T>} `@@iterator` method.
	 */
	/*:: declare export var getIteratorMethod:
	  & (<+TValue>(iterable: Iterable<TValue>) => (() => Iterator<TValue>))
	  & ((iterable: mixed) => (void | (() => Iterator<mixed>))); */
	function getIteratorMethod(iterable) {
	  if (iterable != null) {
	    var method =
	      (SYMBOL_ITERATOR && iterable[SYMBOL_ITERATOR]) || iterable['@@iterator'];
	    if (typeof method === 'function') {
	      return method
	    }
	  }
	}

	/**
	 * Given an object which either implements the Iterable protocol or is
	 * Array-like, iterate over it, calling the `callback` at each iteration.
	 *
	 * Use `forEach` where you would expect to use a `for ... of` loop in ES6.
	 * However `forEach` adheres to the behavior of [Array#forEach][] described in
	 * the ECMAScript specification, skipping over "holes" in Array-likes. It will
	 * also delegate to a `forEach` method on `collection` if one is defined,
	 * ensuring native performance for `Arrays`.
	 *
	 * Similar to [Array#forEach][], the `callback` function accepts three
	 * arguments, and is provided with `thisArg` as the calling context.
	 *
	 * Note: providing an infinite Iterator to forEach will produce an error.
	 *
	 * [Array#forEach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	 *
	 * @example
	 *
	 * var forEach = require('iterall').forEach
	 *
	 * forEach(myIterable, function (value, index, iterable) {
	 *   console.log(value, index, iterable === myIterable)
	 * })
	 *
	 * @example
	 *
	 * // ES6:
	 * for (let value of myIterable) {
	 *   console.log(value)
	 * }
	 *
	 * // Any JavaScript environment:
	 * forEach(myIterable, function (value) {
	 *   console.log(value)
	 * })
	 *
	 * @template T the type of each iterated value
	 * @param {Iterable<T>|{ length: number }} collection
	 *   The Iterable or array to iterate over.
	 * @param {function(T, number, object)} callback
	 *   Function to execute for each iteration, taking up to three arguments
	 * @param [thisArg]
	 *   Optional. Value to use as `this` when executing `callback`.
	 */
	/*:: declare export var forEach:
	  & (<+TValue, TCollection: Iterable<TValue>>(
	      collection: TCollection,
	      callbackFn: (value: TValue, index: number, collection: TCollection) => any,
	      thisArg?: any
	    ) => void)
	  & (<TCollection: {length: number}>(
	      collection: TCollection,
	      callbackFn: (value: mixed, index: number, collection: TCollection) => any,
	      thisArg?: any
	    ) => void); */
	function forEach(collection, callback, thisArg) {
	  if (collection != null) {
	    if (typeof collection.forEach === 'function') {
	      return collection.forEach(callback, thisArg)
	    }
	    var i = 0;
	    var iterator = getIterator$3(collection);
	    if (iterator) {
	      var step;
	      while (!(step = iterator.next()).done) {
	        callback.call(thisArg, step.value, i++, collection);
	        // Infinite Iterators could cause forEach to run forever.
	        // After a very large number of iterations, produce an error.
	        /* istanbul ignore if */
	        if (i > 9999999) {
	          throw new TypeError('Near-infinite iteration.')
	        }
	      }
	    } else if (isArrayLike(collection)) {
	      for (; i < collection.length; i++) {
	        if (collection.hasOwnProperty(i)) {
	          callback.call(thisArg, collection[i], i, collection);
	        }
	      }
	    }
	  }
	}

	/////////////////////////////////////////////////////
	//                                                 //
	//                 ASYNC ITERATORS                 //
	//                                                 //
	/////////////////////////////////////////////////////

	/**
	 * [AsyncIterable](https://tc39.github.io/proposal-async-iteration/#sec-asynciterable-interface)
	 * is a *protocol* which when implemented allows a JavaScript object to define
	 * an asynchronous iteration behavior, such as what values are looped over in
	 * a [`for-await-of`](https://tc39.github.io/proposal-async-iteration/#sec-for-in-and-for-of-statements)
	 * loop or `iterall`'s {@link forAwaitEach} function.
	 *
	 * While described as a proposed addition to the [ES2017 version of JavaScript](https://tc39.github.io/proposal-async-iteration/)
	 * it can be utilized by any version of JavaScript.
	 *
	 * @external AsyncIterable
	 * @see {@link https://tc39.github.io/proposal-async-iteration/#sec-asynciterable-interface|Async Iteration Proposal}
	 * @template T The type of each iterated value
	 * @property {function (): AsyncIterator<T>} Symbol.asyncIterator
	 *   A method which produces an AsyncIterator for this AsyncIterable.
	 */

	/**
	 * [AsyncIterator](https://tc39.github.io/proposal-async-iteration/#sec-asynciterator-interface)
	 * is a *protocol* which describes a standard way to produce and consume an
	 * asynchronous sequence of values, typically the values of the
	 * {@link AsyncIterable} represented by this {@link AsyncIterator}.
	 *
	 * AsyncIterator is similar to Observable or Stream. Like an {@link Iterator} it
	 * also as a `next()` method, however instead of an IteratorResult,
	 * calling this method returns a {@link Promise} for a IteratorResult.
	 *
	 * While described as a proposed addition to the [ES2017 version of JavaScript](https://tc39.github.io/proposal-async-iteration/)
	 * it can be utilized by any version of JavaScript.
	 *
	 * @external AsyncIterator
	 * @see {@link https://tc39.github.io/proposal-async-iteration/#sec-asynciterator-interface|Async Iteration Proposal}
	 */

	// In ES2017 (or a polyfilled) environment, this will be Symbol.asyncIterator
	var SYMBOL_ASYNC_ITERATOR = SYMBOL && SYMBOL.asyncIterator;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Returns true if a value is null, undefined, or NaN.
	 */
	function isNullish(value) {
	  return value === null || value === undefined || value !== value;
	}

	function _typeof$3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }
	/**
	 * Produces a GraphQL Value AST given a JavaScript value.
	 *
	 * A GraphQL type must be provided, which will be used to interpret different
	 * JavaScript values.
	 *
	 * | JSON Value    | GraphQL Value        |
	 * | ------------- | -------------------- |
	 * | Object        | Input Object         |
	 * | Array         | List                 |
	 * | Boolean       | Boolean              |
	 * | String        | String / Enum Value  |
	 * | Number        | Int / Float          |
	 * | Mixed         | Enum Value           |
	 * | null          | NullValue            |
	 *
	 */

	function astFromValue(value, type) {
	  if (isNonNullType(type)) {
	    var astValue = astFromValue(value, type.ofType);

	    if (astValue && astValue.kind === Kind.NULL) {
	      return null;
	    }

	    return astValue;
	  } // only explicit null, not undefined, NaN


	  if (value === null) {
	    return {
	      kind: Kind.NULL
	    };
	  } // undefined, NaN


	  if (isInvalid(value)) {
	    return null;
	  } // Convert JavaScript array to GraphQL list. If the GraphQLType is a list, but
	  // the value is not an array, convert the value using the list's item type.


	  if (isListType(type)) {
	    var itemType = type.ofType;

	    if (isCollection(value)) {
	      var valuesNodes = [];
	      forEach(value, function (item) {
	        var itemNode = astFromValue(item, itemType);

	        if (itemNode) {
	          valuesNodes.push(itemNode);
	        }
	      });
	      return {
	        kind: Kind.LIST,
	        values: valuesNodes
	      };
	    }

	    return astFromValue(value, itemType);
	  } // Populate the fields of the input object by creating ASTs from each value
	  // in the JavaScript object according to the fields in the input type.


	  if (isInputObjectType(type)) {
	    if (value === null || _typeof$3(value) !== 'object') {
	      return null;
	    }

	    var fields = objectValues(type.getFields());
	    var fieldNodes = [];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var field = _step.value;
	        var fieldValue = astFromValue(value[field.name], field.type);

	        if (fieldValue) {
	          fieldNodes.push({
	            kind: Kind.OBJECT_FIELD,
	            name: {
	              kind: Kind.NAME,
	              value: field.name
	            },
	            value: fieldValue
	          });
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return != null) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return {
	      kind: Kind.OBJECT,
	      fields: fieldNodes
	    };
	  }

	  if (isScalarType(type) || isEnumType(type)) {
	    // Since value is an internally represented value, it must be serialized
	    // to an externally represented value before converting into an AST.
	    var serialized = type.serialize(value);

	    if (isNullish(serialized)) {
	      return null;
	    } // Others serialize based on their corresponding JavaScript scalar types.


	    if (typeof serialized === 'boolean') {
	      return {
	        kind: Kind.BOOLEAN,
	        value: serialized
	      };
	    } // JavaScript numbers can be Int or Float values.


	    if (typeof serialized === 'number') {
	      var stringNum = String(serialized);
	      return integerStringRegExp.test(stringNum) ? {
	        kind: Kind.INT,
	        value: stringNum
	      } : {
	        kind: Kind.FLOAT,
	        value: stringNum
	      };
	    }

	    if (typeof serialized === 'string') {
	      // Enum types use Enum literals.
	      if (isEnumType(type)) {
	        return {
	          kind: Kind.ENUM,
	          value: serialized
	        };
	      } // ID types can use Int literals.


	      if (type === GraphQLID && integerStringRegExp.test(serialized)) {
	        return {
	          kind: Kind.INT,
	          value: serialized
	        };
	      }

	      return {
	        kind: Kind.STRING,
	        value: serialized
	      };
	    }

	    throw new TypeError("Cannot convert value to AST: ".concat(inspect(serialized)));
	  }
	  /* istanbul ignore next */


	  throw new Error("Unknown type: ".concat(type, "."));
	}
	/**
	 * IntValue:
	 *   - NegativeSign? 0
	 *   - NegativeSign? NonZeroDigit ( Digit+ )?
	 */

	var integerStringRegExp = /^-?(0|[1-9][0-9]*)$/;

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */
	var __Schema = new GraphQLObjectType({
	  name: '__Schema',
	  description: 'A GraphQL Schema defines the capabilities of a GraphQL server. It ' + 'exposes all available types and directives on the server, as well as ' + 'the entry points for query, mutation, and subscription operations.',
	  fields: function fields() {
	    return {
	      types: {
	        description: 'A list of all types supported by this server.',
	        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__Type))),
	        resolve: function resolve(schema) {
	          return objectValues(schema.getTypeMap());
	        }
	      },
	      queryType: {
	        description: 'The type that query operations will be rooted at.',
	        type: GraphQLNonNull(__Type),
	        resolve: function resolve(schema) {
	          return schema.getQueryType();
	        }
	      },
	      mutationType: {
	        description: 'If this server supports mutation, the type that ' + 'mutation operations will be rooted at.',
	        type: __Type,
	        resolve: function resolve(schema) {
	          return schema.getMutationType();
	        }
	      },
	      subscriptionType: {
	        description: 'If this server support subscription, the type that ' + 'subscription operations will be rooted at.',
	        type: __Type,
	        resolve: function resolve(schema) {
	          return schema.getSubscriptionType();
	        }
	      },
	      directives: {
	        description: 'A list of all directives supported by this server.',
	        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__Directive))),
	        resolve: function resolve(schema) {
	          return schema.getDirectives();
	        }
	      }
	    };
	  }
	});
	var __Directive = new GraphQLObjectType({
	  name: '__Directive',
	  description: 'A Directive provides a way to describe alternate runtime execution and ' + 'type validation behavior in a GraphQL document.' + "\n\nIn some cases, you need to provide options to alter GraphQL's " + 'execution behavior in ways field arguments will not suffice, such as ' + 'conditionally including or skipping a field. Directives provide this by ' + 'describing additional information to the executor.',
	  fields: function fields() {
	    return {
	      name: {
	        type: GraphQLNonNull(GraphQLString),
	        resolve: function resolve(obj) {
	          return obj.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.description;
	        }
	      },
	      locations: {
	        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__DirectiveLocation))),
	        resolve: function resolve(obj) {
	          return obj.locations;
	        }
	      },
	      args: {
	        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__InputValue))),
	        resolve: function resolve(directive) {
	          return directive.args || [];
	        }
	      }
	    };
	  }
	});
	var __DirectiveLocation = new GraphQLEnumType({
	  name: '__DirectiveLocation',
	  description: 'A Directive can be adjacent to many parts of the GraphQL language, a ' + '__DirectiveLocation describes one such possible adjacencies.',
	  values: {
	    QUERY: {
	      value: DirectiveLocation.QUERY,
	      description: 'Location adjacent to a query operation.'
	    },
	    MUTATION: {
	      value: DirectiveLocation.MUTATION,
	      description: 'Location adjacent to a mutation operation.'
	    },
	    SUBSCRIPTION: {
	      value: DirectiveLocation.SUBSCRIPTION,
	      description: 'Location adjacent to a subscription operation.'
	    },
	    FIELD: {
	      value: DirectiveLocation.FIELD,
	      description: 'Location adjacent to a field.'
	    },
	    FRAGMENT_DEFINITION: {
	      value: DirectiveLocation.FRAGMENT_DEFINITION,
	      description: 'Location adjacent to a fragment definition.'
	    },
	    FRAGMENT_SPREAD: {
	      value: DirectiveLocation.FRAGMENT_SPREAD,
	      description: 'Location adjacent to a fragment spread.'
	    },
	    INLINE_FRAGMENT: {
	      value: DirectiveLocation.INLINE_FRAGMENT,
	      description: 'Location adjacent to an inline fragment.'
	    },
	    VARIABLE_DEFINITION: {
	      value: DirectiveLocation.VARIABLE_DEFINITION,
	      description: 'Location adjacent to a variable definition.'
	    },
	    SCHEMA: {
	      value: DirectiveLocation.SCHEMA,
	      description: 'Location adjacent to a schema definition.'
	    },
	    SCALAR: {
	      value: DirectiveLocation.SCALAR,
	      description: 'Location adjacent to a scalar definition.'
	    },
	    OBJECT: {
	      value: DirectiveLocation.OBJECT,
	      description: 'Location adjacent to an object type definition.'
	    },
	    FIELD_DEFINITION: {
	      value: DirectiveLocation.FIELD_DEFINITION,
	      description: 'Location adjacent to a field definition.'
	    },
	    ARGUMENT_DEFINITION: {
	      value: DirectiveLocation.ARGUMENT_DEFINITION,
	      description: 'Location adjacent to an argument definition.'
	    },
	    INTERFACE: {
	      value: DirectiveLocation.INTERFACE,
	      description: 'Location adjacent to an interface definition.'
	    },
	    UNION: {
	      value: DirectiveLocation.UNION,
	      description: 'Location adjacent to a union definition.'
	    },
	    ENUM: {
	      value: DirectiveLocation.ENUM,
	      description: 'Location adjacent to an enum definition.'
	    },
	    ENUM_VALUE: {
	      value: DirectiveLocation.ENUM_VALUE,
	      description: 'Location adjacent to an enum value definition.'
	    },
	    INPUT_OBJECT: {
	      value: DirectiveLocation.INPUT_OBJECT,
	      description: 'Location adjacent to an input object type definition.'
	    },
	    INPUT_FIELD_DEFINITION: {
	      value: DirectiveLocation.INPUT_FIELD_DEFINITION,
	      description: 'Location adjacent to an input object field definition.'
	    }
	  }
	});
	var __Type = new GraphQLObjectType({
	  name: '__Type',
	  description: 'The fundamental unit of any GraphQL Schema is the type. There are ' + 'many kinds of types in GraphQL as represented by the `__TypeKind` enum.' + '\n\nDepending on the kind of a type, certain fields describe ' + 'information about that type. Scalar types provide no information ' + 'beyond a name and description, while Enum types provide their values. ' + 'Object and Interface types provide the fields they describe. Abstract ' + 'types, Union and Interface, provide the Object types possible ' + 'at runtime. List and NonNull types compose other types.',
	  fields: function fields() {
	    return {
	      kind: {
	        type: GraphQLNonNull(__TypeKind),
	        resolve: function resolve(type) {
	          if (isScalarType(type)) {
	            return TypeKind.SCALAR;
	          } else if (isObjectType(type)) {
	            return TypeKind.OBJECT;
	          } else if (isInterfaceType(type)) {
	            return TypeKind.INTERFACE;
	          } else if (isUnionType(type)) {
	            return TypeKind.UNION;
	          } else if (isEnumType(type)) {
	            return TypeKind.ENUM;
	          } else if (isInputObjectType(type)) {
	            return TypeKind.INPUT_OBJECT;
	          } else if (isListType(type)) {
	            return TypeKind.LIST;
	          } else if (isNonNullType(type)) {
	            return TypeKind.NON_NULL;
	          }

	          throw new Error('Unknown kind of type: ' + type);
	        }
	      },
	      name: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.description;
	        }
	      },
	      fields: {
	        type: GraphQLList(GraphQLNonNull(__Field)),
	        args: {
	          includeDeprecated: {
	            type: GraphQLBoolean,
	            defaultValue: false
	          }
	        },
	        resolve: function resolve(type, _ref) {
	          var includeDeprecated = _ref.includeDeprecated;

	          if (isObjectType(type) || isInterfaceType(type)) {
	            var fields = objectValues(type.getFields());

	            if (!includeDeprecated) {
	              fields = fields.filter(function (field) {
	                return !field.deprecationReason;
	              });
	            }

	            return fields;
	          }

	          return null;
	        }
	      },
	      interfaces: {
	        type: GraphQLList(GraphQLNonNull(__Type)),
	        resolve: function resolve(type) {
	          if (isObjectType(type)) {
	            return type.getInterfaces();
	          }
	        }
	      },
	      possibleTypes: {
	        type: GraphQLList(GraphQLNonNull(__Type)),
	        resolve: function resolve(type, args, context, _ref2) {
	          var schema = _ref2.schema;

	          if (isAbstractType(type)) {
	            return schema.getPossibleTypes(type);
	          }
	        }
	      },
	      enumValues: {
	        type: GraphQLList(GraphQLNonNull(__EnumValue)),
	        args: {
	          includeDeprecated: {
	            type: GraphQLBoolean,
	            defaultValue: false
	          }
	        },
	        resolve: function resolve(type, _ref3) {
	          var includeDeprecated = _ref3.includeDeprecated;

	          if (isEnumType(type)) {
	            var values = type.getValues();

	            if (!includeDeprecated) {
	              values = values.filter(function (value) {
	                return !value.deprecationReason;
	              });
	            }

	            return values;
	          }
	        }
	      },
	      inputFields: {
	        type: GraphQLList(GraphQLNonNull(__InputValue)),
	        resolve: function resolve(type) {
	          if (isInputObjectType(type)) {
	            return objectValues(type.getFields());
	          }
	        }
	      },
	      ofType: {
	        type: __Type,
	        resolve: function resolve(obj) {
	          return obj.ofType;
	        }
	      }
	    };
	  }
	});
	var __Field = new GraphQLObjectType({
	  name: '__Field',
	  description: 'Object and Interface types are described by a list of Fields, each of ' + 'which has a name, potentially a list of arguments, and a return type.',
	  fields: function fields() {
	    return {
	      name: {
	        type: GraphQLNonNull(GraphQLString),
	        resolve: function resolve(obj) {
	          return obj.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.description;
	        }
	      },
	      args: {
	        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(__InputValue))),
	        resolve: function resolve(field) {
	          return field.args || [];
	        }
	      },
	      type: {
	        type: GraphQLNonNull(__Type),
	        resolve: function resolve(obj) {
	          return obj.type;
	        }
	      },
	      isDeprecated: {
	        type: GraphQLNonNull(GraphQLBoolean),
	        resolve: function resolve(obj) {
	          return obj.isDeprecated;
	        }
	      },
	      deprecationReason: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.deprecationReason;
	        }
	      }
	    };
	  }
	});
	var __InputValue = new GraphQLObjectType({
	  name: '__InputValue',
	  description: 'Arguments provided to Fields or Directives and the input fields of an ' + 'InputObject are represented as Input Values which describe their type ' + 'and optionally a default value.',
	  fields: function fields() {
	    return {
	      name: {
	        type: GraphQLNonNull(GraphQLString),
	        resolve: function resolve(obj) {
	          return obj.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.description;
	        }
	      },
	      type: {
	        type: GraphQLNonNull(__Type),
	        resolve: function resolve(obj) {
	          return obj.type;
	        }
	      },
	      defaultValue: {
	        type: GraphQLString,
	        description: 'A GraphQL-formatted string representing the default value for this ' + 'input value.',
	        resolve: function resolve(inputVal) {
	          return isInvalid(inputVal.defaultValue) ? null : print(astFromValue(inputVal.defaultValue, inputVal.type));
	        }
	      }
	    };
	  }
	});
	var __EnumValue = new GraphQLObjectType({
	  name: '__EnumValue',
	  description: 'One possible value for a given Enum. Enum values are unique values, not ' + 'a placeholder for a string or numeric value. However an Enum value is ' + 'returned in a JSON response as a string.',
	  fields: function fields() {
	    return {
	      name: {
	        type: GraphQLNonNull(GraphQLString),
	        resolve: function resolve(obj) {
	          return obj.name;
	        }
	      },
	      description: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.description;
	        }
	      },
	      isDeprecated: {
	        type: GraphQLNonNull(GraphQLBoolean),
	        resolve: function resolve(obj) {
	          return obj.isDeprecated;
	        }
	      },
	      deprecationReason: {
	        type: GraphQLString,
	        resolve: function resolve(obj) {
	          return obj.deprecationReason;
	        }
	      }
	    };
	  }
	});
	var TypeKind = {
	  SCALAR: 'SCALAR',
	  OBJECT: 'OBJECT',
	  INTERFACE: 'INTERFACE',
	  UNION: 'UNION',
	  ENUM: 'ENUM',
	  INPUT_OBJECT: 'INPUT_OBJECT',
	  LIST: 'LIST',
	  NON_NULL: 'NON_NULL'
	};
	var __TypeKind = new GraphQLEnumType({
	  name: '__TypeKind',
	  description: 'An enum describing what kind of type a given `__Type` is.',
	  values: {
	    SCALAR: {
	      value: TypeKind.SCALAR,
	      description: 'Indicates this type is a scalar.'
	    },
	    OBJECT: {
	      value: TypeKind.OBJECT,
	      description: 'Indicates this type is an object. ' + '`fields` and `interfaces` are valid fields.'
	    },
	    INTERFACE: {
	      value: TypeKind.INTERFACE,
	      description: 'Indicates this type is an interface. ' + '`fields` and `possibleTypes` are valid fields.'
	    },
	    UNION: {
	      value: TypeKind.UNION,
	      description: 'Indicates this type is a union. `possibleTypes` is a valid field.'
	    },
	    ENUM: {
	      value: TypeKind.ENUM,
	      description: 'Indicates this type is an enum. `enumValues` is a valid field.'
	    },
	    INPUT_OBJECT: {
	      value: TypeKind.INPUT_OBJECT,
	      description: 'Indicates this type is an input object. ' + '`inputFields` is a valid field.'
	    },
	    LIST: {
	      value: TypeKind.LIST,
	      description: 'Indicates this type is a list. `ofType` is a valid field.'
	    },
	    NON_NULL: {
	      value: TypeKind.NON_NULL,
	      description: 'Indicates this type is a non-null. `ofType` is a valid field.'
	    }
	  }
	});
	/**
	 * Note that these are GraphQLField and not GraphQLFieldConfig,
	 * so the format for args is different.
	 */

	var SchemaMetaFieldDef = {
	  name: '__schema',
	  type: GraphQLNonNull(__Schema),
	  description: 'Access the current type schema of this server.',
	  args: [],
	  resolve: function resolve(source, args, context, _ref4) {
	    var schema = _ref4.schema;
	    return schema;
	  }
	};
	var TypeMetaFieldDef = {
	  name: '__type',
	  type: __Type,
	  description: 'Request the type information of a single type.',
	  args: [{
	    name: 'name',
	    type: GraphQLNonNull(GraphQLString)
	  }],
	  resolve: function resolve(source, _ref5, context, _ref6) {
	    var name = _ref5.name;
	    var schema = _ref6.schema;
	    return schema.getType(name);
	  }
	};
	var TypeNameMetaFieldDef = {
	  name: '__typename',
	  type: GraphQLNonNull(GraphQLString),
	  description: 'The name of the current Object type at runtime.',
	  args: [],
	  resolve: function resolve(source, args, context, _ref7) {
	    var parentType = _ref7.parentType;
	    return parentType.name;
	  }
	};

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */
	function find$1(list, predicate) {
	  for (var i = 0; i < list.length; i++) {
	    if (predicate(list[i])) {
	      return list[i];
	    }
	  }
	}

	function _typeof$4(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

	function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	/**
	 * Schema Definition
	 *
	 * A Schema is created by supplying the root types of each type of operation,
	 * query and mutation (optional). A schema definition is then supplied to the
	 * validator and executor.
	 *
	 * Example:
	 *
	 *     const MyAppSchema = new GraphQLSchema({
	 *       query: MyAppQueryRootType,
	 *       mutation: MyAppMutationRootType,
	 *     })
	 *
	 * Note: If an array of `directives` are provided to GraphQLSchema, that will be
	 * the exact list of directives represented and allowed. If `directives` is not
	 * provided then a default set of the specified directives (e.g. @include and
	 * @skip) will be used. If you wish to provide *additional* directives to these
	 * specified directives, you must explicitly declare them. Example:
	 *
	 *     const MyAppSchema = new GraphQLSchema({
	 *       ...
	 *       directives: specifiedDirectives.concat([ myCustomDirective ]),
	 *     })
	 *
	 */

	var GraphQLSchema =
	/*#__PURE__*/
	function () {
	  // Used as a cache for validateSchema().
	  // Referenced by validateSchema().
	  function GraphQLSchema(config) {
	    _defineProperty$4(this, "astNode", void 0);

	    _defineProperty$4(this, "extensionASTNodes", void 0);

	    _defineProperty$4(this, "_queryType", void 0);

	    _defineProperty$4(this, "_mutationType", void 0);

	    _defineProperty$4(this, "_subscriptionType", void 0);

	    _defineProperty$4(this, "_directives", void 0);

	    _defineProperty$4(this, "_typeMap", void 0);

	    _defineProperty$4(this, "_implementations", void 0);

	    _defineProperty$4(this, "_possibleTypeMap", void 0);

	    _defineProperty$4(this, "__validationErrors", void 0);

	    _defineProperty$4(this, "__allowedLegacyNames", void 0);

	    // If this schema was built from a source known to be valid, then it may be
	    // marked with assumeValid to avoid an additional type system validation.
	    if (config && config.assumeValid) {
	      this.__validationErrors = [];
	    } else {
	      // Otherwise check for common mistakes during construction to produce
	      // clear and early error messages.
	      !(_typeof$4(config) === 'object') ? invariant(0, 'Must provide configuration object.') : void 0;
	      !(!config.types || Array.isArray(config.types)) ? invariant(0, "\"types\" must be Array if provided but got: ".concat(inspect(config.types), ".")) : void 0;
	      !(!config.directives || Array.isArray(config.directives)) ? invariant(0, '"directives" must be Array if provided but got: ' + "".concat(inspect(config.directives), ".")) : void 0;
	      !(!config.allowedLegacyNames || Array.isArray(config.allowedLegacyNames)) ? invariant(0, '"allowedLegacyNames" must be Array if provided but got: ' + "".concat(inspect(config.allowedLegacyNames), ".")) : void 0;
	    }

	    this.__allowedLegacyNames = config.allowedLegacyNames || [];
	    this._queryType = config.query;
	    this._mutationType = config.mutation;
	    this._subscriptionType = config.subscription; // Provide specified directives (e.g. @include and @skip) by default.

	    this._directives = config.directives || specifiedDirectives;
	    this.astNode = config.astNode;
	    this.extensionASTNodes = config.extensionASTNodes; // Build type map now to detect any errors within this schema.

	    var initialTypes = [this.getQueryType(), this.getMutationType(), this.getSubscriptionType(), __Schema];
	    var types = config.types;

	    if (types) {
	      initialTypes = initialTypes.concat(types);
	    } // Keep track of all types referenced within the schema.


	    var typeMap = Object.create(null); // First by deeply visiting all initial types.

	    typeMap = initialTypes.reduce(typeMapReducer, typeMap); // Then by deeply visiting all directive types.

	    typeMap = this._directives.reduce(typeMapDirectiveReducer, typeMap); // Storing the resulting map for reference by the schema.

	    this._typeMap = typeMap; // Keep track of all implementations by interface name.

	    this._implementations = Object.create(null);

	    var _arr = Object.keys(this._typeMap);

	    for (var _i = 0; _i < _arr.length; _i++) {
	      var typeName = _arr[_i];
	      var type = this._typeMap[typeName];

	      if (isObjectType(type)) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = type.getInterfaces()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var iface = _step.value;

	            if (isInterfaceType(iface)) {
	              var impls = this._implementations[iface.name];

	              if (impls) {
	                impls.push(type);
	              } else {
	                this._implementations[iface.name] = [type];
	              }
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return != null) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      } else if (isAbstractType(type) && !this._implementations[type.name]) {
	        this._implementations[type.name] = [];
	      }
	    }
	  }

	  var _proto = GraphQLSchema.prototype;

	  _proto.getQueryType = function getQueryType() {
	    return this._queryType;
	  };

	  _proto.getMutationType = function getMutationType() {
	    return this._mutationType;
	  };

	  _proto.getSubscriptionType = function getSubscriptionType() {
	    return this._subscriptionType;
	  };

	  _proto.getTypeMap = function getTypeMap() {
	    return this._typeMap;
	  };

	  _proto.getType = function getType(name) {
	    return this.getTypeMap()[name];
	  };

	  _proto.getPossibleTypes = function getPossibleTypes(abstractType) {
	    if (isUnionType(abstractType)) {
	      return abstractType.getTypes();
	    }

	    return this._implementations[abstractType.name];
	  };

	  _proto.isPossibleType = function isPossibleType(abstractType, possibleType) {
	    var possibleTypeMap = this._possibleTypeMap;

	    if (!possibleTypeMap) {
	      this._possibleTypeMap = possibleTypeMap = Object.create(null);
	    }

	    if (!possibleTypeMap[abstractType.name]) {
	      var possibleTypes = this.getPossibleTypes(abstractType);
	      possibleTypeMap[abstractType.name] = possibleTypes.reduce(function (map, type) {
	        return map[type.name] = true, map;
	      }, Object.create(null));
	    }

	    return Boolean(possibleTypeMap[abstractType.name][possibleType.name]);
	  };

	  _proto.getDirectives = function getDirectives() {
	    return this._directives;
	  };

	  _proto.getDirective = function getDirective(name) {
	    return find$1(this.getDirectives(), function (directive) {
	      return directive.name === name;
	    });
	  };

	  return GraphQLSchema;
	}(); // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(GraphQLSchema);

	function typeMapReducer(map, type) {
	  if (!type) {
	    return map;
	  }

	  if (isWrappingType(type)) {
	    return typeMapReducer(map, type.ofType);
	  }

	  if (map[type.name]) {
	    !(map[type.name] === type) ? invariant(0, 'Schema must contain unique named types but contains multiple ' + "types named \"".concat(type.name, "\".")) : void 0;
	    return map;
	  }

	  map[type.name] = type;
	  var reducedMap = map;

	  if (isUnionType(type)) {
	    reducedMap = type.getTypes().reduce(typeMapReducer, reducedMap);
	  }

	  if (isObjectType(type)) {
	    reducedMap = type.getInterfaces().reduce(typeMapReducer, reducedMap);
	  }

	  if (isObjectType(type) || isInterfaceType(type)) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = objectValues(type.getFields())[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var field = _step2.value;

	        if (field.args) {
	          var fieldArgTypes = field.args.map(function (arg) {
	            return arg.type;
	          });
	          reducedMap = fieldArgTypes.reduce(typeMapReducer, reducedMap);
	        }

	        reducedMap = typeMapReducer(reducedMap, field.type);
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }
	  }

	  if (isInputObjectType(type)) {
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	      for (var _iterator3 = objectValues(type.getFields())[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var _field = _step3.value;
	        reducedMap = typeMapReducer(reducedMap, _field.type);
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }
	  }

	  return reducedMap;
	}

	function typeMapDirectiveReducer(map, directive) {
	  // Directives are not validated until validateSchema() is called.
	  if (!isDirective(directive)) {
	    return map;
	  }

	  return directive.args.reduce(function (_map, arg) {
	    return typeMapReducer(_map, arg.type);
	  }, map);
	}

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * A representation of source input to GraphQL.
	 * `name` and `locationOffset` are optional. They are useful for clients who
	 * store GraphQL documents in source files; for example, if the GraphQL input
	 * starts at line 40 in a file named Foo.graphql, it might be useful for name to
	 * be "Foo.graphql" and location to be `{ line: 40, column: 0 }`.
	 * line and column in locationOffset are 1-indexed
	 */
	var Source = function Source(body, name, locationOffset) {
	  _defineProperty$6(this, "body", void 0);

	  _defineProperty$6(this, "name", void 0);

	  _defineProperty$6(this, "locationOffset", void 0);

	  this.body = body;
	  this.name = name || 'GraphQL request';
	  this.locationOffset = locationOffset || {
	    line: 1,
	    column: 1
	  };
	  !(this.locationOffset.line > 0) ? invariant(0, 'line in locationOffset is 1-indexed and must be positive') : void 0;
	  !(this.locationOffset.column > 0) ? invariant(0, 'column in locationOffset is 1-indexed and must be positive') : void 0;
	}; // Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported

	applyToStringTag(Source);

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */
	/**
	 * The return type of createLexer.
	 */


	/**
	 * An exported enum describing the different kinds of tokens that the
	 * lexer emits.
	 */
	var TokenKind = Object.freeze({
	  SOF: '<SOF>',
	  EOF: '<EOF>',
	  BANG: '!',
	  DOLLAR: '$',
	  AMP: '&',
	  PAREN_L: '(',
	  PAREN_R: ')',
	  SPREAD: '...',
	  COLON: ':',
	  EQUALS: '=',
	  AT: '@',
	  BRACKET_L: '[',
	  BRACKET_R: ']',
	  BRACE_L: '{',
	  PIPE: '|',
	  BRACE_R: '}',
	  NAME: 'Name',
	  INT: 'Int',
	  FLOAT: 'Float',
	  STRING: 'String',
	  BLOCK_STRING: 'BlockString',
	  COMMENT: 'Comment'
	});

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */
	function typeFromAST(schema, typeNode) {
	  /* eslint-enable no-redeclare */
	  var innerType;

	  if (typeNode.kind === Kind.LIST_TYPE) {
	    innerType = typeFromAST(schema, typeNode.type);
	    return innerType && GraphQLList(innerType);
	  }

	  if (typeNode.kind === Kind.NON_NULL_TYPE) {
	    innerType = typeFromAST(schema, typeNode.type);
	    return innerType && GraphQLNonNull(innerType);
	  }

	  if (typeNode.kind === Kind.NAMED_TYPE) {
	    return schema.getType(typeNode.name.value);
	  }
	  /* istanbul ignore next */


	  throw new Error("Unexpected type kind: ".concat(typeNode.kind, "."));
	}

	function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	/**
	 * TypeInfo is a utility class which, given a GraphQL schema, can keep track
	 * of the current field and type definitions at any point in a GraphQL document
	 * AST during a recursive descent by calling `enter(node)` and `leave(node)`.
	 */

	var TypeInfo =
	/*#__PURE__*/
	function () {
	  function TypeInfo(schema, // NOTE: this experimental optional second parameter is only needed in order
	  // to support non-spec-compliant codebases. You should never need to use it.
	  getFieldDefFn, // Initial type may be provided in rare cases to facilitate traversals
	  initialType) {
	    _defineProperty$7(this, "_schema", void 0);

	    _defineProperty$7(this, "_typeStack", void 0);

	    _defineProperty$7(this, "_parentTypeStack", void 0);

	    _defineProperty$7(this, "_inputTypeStack", void 0);

	    _defineProperty$7(this, "_fieldDefStack", void 0);

	    _defineProperty$7(this, "_defaultValueStack", void 0);

	    _defineProperty$7(this, "_directive", void 0);

	    _defineProperty$7(this, "_argument", void 0);

	    _defineProperty$7(this, "_enumValue", void 0);

	    _defineProperty$7(this, "_getFieldDef", void 0);

	    this._schema = schema;
	    this._typeStack = [];
	    this._parentTypeStack = [];
	    this._inputTypeStack = [];
	    this._fieldDefStack = [];
	    this._defaultValueStack = [];
	    this._directive = null;
	    this._argument = null;
	    this._enumValue = null;
	    this._getFieldDef = getFieldDefFn || getFieldDef;

	    if (initialType) {
	      if (isInputType(initialType)) {
	        this._inputTypeStack.push(initialType);
	      }

	      if (isCompositeType(initialType)) {
	        this._parentTypeStack.push(initialType);
	      }

	      if (isOutputType(initialType)) {
	        this._typeStack.push(initialType);
	      }
	    }
	  }

	  var _proto = TypeInfo.prototype;

	  _proto.getType = function getType() {
	    if (this._typeStack.length > 0) {
	      return this._typeStack[this._typeStack.length - 1];
	    }
	  };

	  _proto.getParentType = function getParentType() {
	    if (this._parentTypeStack.length > 0) {
	      return this._parentTypeStack[this._parentTypeStack.length - 1];
	    }
	  };

	  _proto.getInputType = function getInputType() {
	    if (this._inputTypeStack.length > 0) {
	      return this._inputTypeStack[this._inputTypeStack.length - 1];
	    }
	  };

	  _proto.getParentInputType = function getParentInputType() {
	    if (this._inputTypeStack.length > 1) {
	      return this._inputTypeStack[this._inputTypeStack.length - 2];
	    }
	  };

	  _proto.getFieldDef = function getFieldDef() {
	    if (this._fieldDefStack.length > 0) {
	      return this._fieldDefStack[this._fieldDefStack.length - 1];
	    }
	  };

	  _proto.getDefaultValue = function getDefaultValue() {
	    if (this._defaultValueStack.length > 0) {
	      return this._defaultValueStack[this._defaultValueStack.length - 1];
	    }
	  };

	  _proto.getDirective = function getDirective() {
	    return this._directive;
	  };

	  _proto.getArgument = function getArgument() {
	    return this._argument;
	  };

	  _proto.getEnumValue = function getEnumValue() {
	    return this._enumValue;
	  };

	  _proto.enter = function enter(node) {
	    var schema = this._schema; // Note: many of the types below are explicitly typed as "mixed" to drop
	    // any assumptions of a valid schema to ensure runtime types are properly
	    // checked before continuing since TypeInfo is used as part of validation
	    // which occurs before guarantees of schema and document validity.

	    switch (node.kind) {
	      case Kind.SELECTION_SET:
	        var namedType = getNamedType(this.getType());

	        this._parentTypeStack.push(isCompositeType(namedType) ? namedType : undefined);

	        break;

	      case Kind.FIELD:
	        var parentType = this.getParentType();
	        var fieldDef;
	        var fieldType;

	        if (parentType) {
	          fieldDef = this._getFieldDef(schema, parentType, node);

	          if (fieldDef) {
	            fieldType = fieldDef.type;
	          }
	        }

	        this._fieldDefStack.push(fieldDef);

	        this._typeStack.push(isOutputType(fieldType) ? fieldType : undefined);

	        break;

	      case Kind.DIRECTIVE:
	        this._directive = schema.getDirective(node.name.value);
	        break;

	      case Kind.OPERATION_DEFINITION:
	        var type;

	        if (node.operation === 'query') {
	          type = schema.getQueryType();
	        } else if (node.operation === 'mutation') {
	          type = schema.getMutationType();
	        } else if (node.operation === 'subscription') {
	          type = schema.getSubscriptionType();
	        }

	        this._typeStack.push(isObjectType(type) ? type : undefined);

	        break;

	      case Kind.INLINE_FRAGMENT:
	      case Kind.FRAGMENT_DEFINITION:
	        var typeConditionAST = node.typeCondition;
	        var outputType = typeConditionAST ? typeFromAST(schema, typeConditionAST) : getNamedType(this.getType());

	        this._typeStack.push(isOutputType(outputType) ? outputType : undefined);

	        break;

	      case Kind.VARIABLE_DEFINITION:
	        var inputType = typeFromAST(schema, node.type);

	        this._inputTypeStack.push(isInputType(inputType) ? inputType : undefined);

	        break;

	      case Kind.ARGUMENT:
	        var argDef;
	        var argType;
	        var fieldOrDirective = this.getDirective() || this.getFieldDef();

	        if (fieldOrDirective) {
	          argDef = find$1(fieldOrDirective.args, function (arg) {
	            return arg.name === node.name.value;
	          });

	          if (argDef) {
	            argType = argDef.type;
	          }
	        }

	        this._argument = argDef;

	        this._defaultValueStack.push(argDef ? argDef.defaultValue : undefined);

	        this._inputTypeStack.push(isInputType(argType) ? argType : undefined);

	        break;

	      case Kind.LIST:
	        var listType = getNullableType(this.getInputType());
	        var itemType = isListType(listType) ? listType.ofType : listType; // List positions never have a default value.

	        this._defaultValueStack.push(undefined);

	        this._inputTypeStack.push(isInputType(itemType) ? itemType : undefined);

	        break;

	      case Kind.OBJECT_FIELD:
	        var objectType = getNamedType(this.getInputType());
	        var inputFieldType;
	        var inputField;

	        if (isInputObjectType(objectType)) {
	          inputField = objectType.getFields()[node.name.value];

	          if (inputField) {
	            inputFieldType = inputField.type;
	          }
	        }

	        this._defaultValueStack.push(inputField ? inputField.defaultValue : undefined);

	        this._inputTypeStack.push(isInputType(inputFieldType) ? inputFieldType : undefined);

	        break;

	      case Kind.ENUM:
	        var enumType = getNamedType(this.getInputType());
	        var enumValue;

	        if (isEnumType(enumType)) {
	          enumValue = enumType.getValue(node.value);
	        }

	        this._enumValue = enumValue;
	        break;
	    }
	  };

	  _proto.leave = function leave(node) {
	    switch (node.kind) {
	      case Kind.SELECTION_SET:
	        this._parentTypeStack.pop();

	        break;

	      case Kind.FIELD:
	        this._fieldDefStack.pop();

	        this._typeStack.pop();

	        break;

	      case Kind.DIRECTIVE:
	        this._directive = null;
	        break;

	      case Kind.OPERATION_DEFINITION:
	      case Kind.INLINE_FRAGMENT:
	      case Kind.FRAGMENT_DEFINITION:
	        this._typeStack.pop();

	        break;

	      case Kind.VARIABLE_DEFINITION:
	        this._inputTypeStack.pop();

	        break;

	      case Kind.ARGUMENT:
	        this._argument = null;

	        this._defaultValueStack.pop();

	        this._inputTypeStack.pop();

	        break;

	      case Kind.LIST:
	      case Kind.OBJECT_FIELD:
	        this._defaultValueStack.pop();

	        this._inputTypeStack.pop();

	        break;

	      case Kind.ENUM:
	        this._enumValue = null;
	        break;
	    }
	  };

	  return TypeInfo;
	}();
	/**
	 * Not exactly the same as the executor's definition of getFieldDef, in this
	 * statically evaluated environment we do not always have an Object type,
	 * and need to handle Interface and Union types.
	 */

	function getFieldDef(schema, parentType, fieldNode) {
	  var name = fieldNode.name.value;

	  if (name === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
	    return SchemaMetaFieldDef;
	  }

	  if (name === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
	    return TypeMetaFieldDef;
	  }

	  if (name === TypeNameMetaFieldDef.name && isCompositeType(parentType)) {
	    return TypeNameMetaFieldDef;
	  }

	  if (isObjectType(parentType) || isInterfaceType(parentType)) {
	    return parentType.getFields()[name];
	  }
	}

	/**
	 * Copyright (c) 2018-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2018-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

	function _defineProperty$b(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * An instance of this class is passed as the "this" context to all validators,
	 * allowing access to commonly useful contextual information from within a
	 * validation rule.
	 */
	var ASTValidationContext =
	/*#__PURE__*/
	function () {
	  function ASTValidationContext(ast) {
	    _defineProperty$b(this, "_ast", void 0);

	    _defineProperty$b(this, "_errors", void 0);

	    this._ast = ast;
	    this._errors = [];
	  }

	  var _proto = ASTValidationContext.prototype;

	  _proto.reportError = function reportError(error) {
	    this._errors.push(error);
	  };

	  _proto.getErrors = function getErrors() {
	    return this._errors;
	  };

	  _proto.getDocument = function getDocument() {
	    return this._ast;
	  };

	  return ASTValidationContext;
	}();
	var SDLValidationContext =
	/*#__PURE__*/
	function (_ASTValidationContext) {
	  _inheritsLoose(SDLValidationContext, _ASTValidationContext);

	  function SDLValidationContext(ast, schema) {
	    var _this;

	    _this = _ASTValidationContext.call(this, ast) || this;

	    _defineProperty$b(_assertThisInitialized(_assertThisInitialized(_this)), "_schema", void 0);

	    _this._schema = schema;
	    return _this;
	  }

	  var _proto2 = SDLValidationContext.prototype;

	  _proto2.getSchema = function getSchema() {
	    return this._schema;
	  };

	  return SDLValidationContext;
	}(ASTValidationContext);
	var ValidationContext =
	/*#__PURE__*/
	function (_ASTValidationContext2) {
	  _inheritsLoose(ValidationContext, _ASTValidationContext2);

	  function ValidationContext(schema, ast, typeInfo) {
	    var _this2;

	    _this2 = _ASTValidationContext2.call(this, ast) || this;

	    _defineProperty$b(_assertThisInitialized(_assertThisInitialized(_this2)), "_schema", void 0);

	    _defineProperty$b(_assertThisInitialized(_assertThisInitialized(_this2)), "_typeInfo", void 0);

	    _defineProperty$b(_assertThisInitialized(_assertThisInitialized(_this2)), "_fragments", void 0);

	    _defineProperty$b(_assertThisInitialized(_assertThisInitialized(_this2)), "_fragmentSpreads", void 0);

	    _defineProperty$b(_assertThisInitialized(_assertThisInitialized(_this2)), "_recursivelyReferencedFragments", void 0);

	    _defineProperty$b(_assertThisInitialized(_assertThisInitialized(_this2)), "_variableUsages", void 0);

	    _defineProperty$b(_assertThisInitialized(_assertThisInitialized(_this2)), "_recursiveVariableUsages", void 0);

	    _this2._schema = schema;
	    _this2._typeInfo = typeInfo;
	    _this2._fragmentSpreads = new Map();
	    _this2._recursivelyReferencedFragments = new Map();
	    _this2._variableUsages = new Map();
	    _this2._recursiveVariableUsages = new Map();
	    return _this2;
	  }

	  var _proto3 = ValidationContext.prototype;

	  _proto3.getSchema = function getSchema() {
	    return this._schema;
	  };

	  _proto3.getFragment = function getFragment(name) {
	    var fragments = this._fragments;

	    if (!fragments) {
	      this._fragments = fragments = this.getDocument().definitions.reduce(function (frags, statement) {
	        if (statement.kind === Kind.FRAGMENT_DEFINITION) {
	          frags[statement.name.value] = statement;
	        }

	        return frags;
	      }, Object.create(null));
	    }

	    return fragments[name];
	  };

	  _proto3.getFragmentSpreads = function getFragmentSpreads(node) {
	    var spreads = this._fragmentSpreads.get(node);

	    if (!spreads) {
	      spreads = [];
	      var setsToVisit = [node];

	      while (setsToVisit.length !== 0) {
	        var set = setsToVisit.pop();

	        for (var i = 0; i < set.selections.length; i++) {
	          var selection = set.selections[i];

	          if (selection.kind === Kind.FRAGMENT_SPREAD) {
	            spreads.push(selection);
	          } else if (selection.selectionSet) {
	            setsToVisit.push(selection.selectionSet);
	          }
	        }
	      }

	      this._fragmentSpreads.set(node, spreads);
	    }

	    return spreads;
	  };

	  _proto3.getRecursivelyReferencedFragments = function getRecursivelyReferencedFragments(operation) {
	    var fragments = this._recursivelyReferencedFragments.get(operation);

	    if (!fragments) {
	      fragments = [];
	      var collectedNames = Object.create(null);
	      var nodesToVisit = [operation.selectionSet];

	      while (nodesToVisit.length !== 0) {
	        var node = nodesToVisit.pop();
	        var spreads = this.getFragmentSpreads(node);

	        for (var i = 0; i < spreads.length; i++) {
	          var fragName = spreads[i].name.value;

	          if (collectedNames[fragName] !== true) {
	            collectedNames[fragName] = true;
	            var fragment = this.getFragment(fragName);

	            if (fragment) {
	              fragments.push(fragment);
	              nodesToVisit.push(fragment.selectionSet);
	            }
	          }
	        }
	      }

	      this._recursivelyReferencedFragments.set(operation, fragments);
	    }

	    return fragments;
	  };

	  _proto3.getVariableUsages = function getVariableUsages(node) {
	    var usages = this._variableUsages.get(node);

	    if (!usages) {
	      var newUsages = [];
	      var typeInfo = new TypeInfo(this._schema);
	      visit(node, visitWithTypeInfo(typeInfo, {
	        VariableDefinition: function VariableDefinition() {
	          return false;
	        },
	        Variable: function Variable(variable) {
	          newUsages.push({
	            node: variable,
	            type: typeInfo.getInputType(),
	            defaultValue: typeInfo.getDefaultValue()
	          });
	        }
	      }));
	      usages = newUsages;

	      this._variableUsages.set(node, usages);
	    }

	    return usages;
	  };

	  _proto3.getRecursiveVariableUsages = function getRecursiveVariableUsages(operation) {
	    var usages = this._recursiveVariableUsages.get(operation);

	    if (!usages) {
	      usages = this.getVariableUsages(operation);
	      var fragments = this.getRecursivelyReferencedFragments(operation);

	      for (var i = 0; i < fragments.length; i++) {
	        Array.prototype.push.apply(usages, this.getVariableUsages(fragments[i]));
	      }

	      this._recursiveVariableUsages.set(operation, usages);
	    }

	    return usages;
	  };

	  _proto3.getType = function getType() {
	    return this._typeInfo.getType();
	  };

	  _proto3.getParentType = function getParentType() {
	    return this._typeInfo.getParentType();
	  };

	  _proto3.getInputType = function getInputType() {
	    return this._typeInfo.getInputType();
	  };

	  _proto3.getParentInputType = function getParentInputType() {
	    return this._typeInfo.getParentInputType();
	  };

	  _proto3.getFieldDef = function getFieldDef() {
	    return this._typeInfo.getFieldDef();
	  };

	  _proto3.getDirective = function getDirective() {
	    return this._typeInfo.getDirective();
	  };

	  _proto3.getArgument = function getArgument() {
	    return this._typeInfo.getArgument();
	  };

	  return ValidationContext;
	}(ASTValidationContext);

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2017-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2017-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2017-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */
	function getIntrospectionQuery(options) {
	  var descriptions = !(options && options.descriptions === false);
	  return "\n    query IntrospectionQuery {\n      __schema {\n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          ".concat(descriptions ? 'description' : '', "\n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      ").concat(descriptions ? 'description' : '', "\n      fields(includeDeprecated: true) {\n        name\n        ").concat(descriptions ? 'description' : '', "\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        ").concat(descriptions ? 'description' : '', "\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      ").concat(descriptions ? 'description' : '', "\n      type { ...TypeRef }\n      defaultValue\n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ");
	}
	/**
	 * Deprecated, call getIntrospectionQuery directly.
	 *
	 * This function will be removed in v15
	 */

	var introspectionQuery = getIntrospectionQuery();

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2016-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 *  strict
	 */

	var _this$z = undefined;

	var unobserveOrCancelIfNeeded = function unobserveOrCancelIfNeeded(absintheSocket, notifier, observer) {
	  newArrowCheck(this, _this$z);

	  if (notifier && observer) {
	    unobserveOrCancel(absintheSocket, notifier, observer);
	  }
	}.bind(undefined);

	var notifierToObservable = function notifierToObservable(absintheSocket, onError, onStart) {
	  var _this2 = this;

	  newArrowCheck(this, _this$z);

	  return function (notifier) {
	    newArrowCheck(this, _this2);

	    return toObservable(absintheSocket, notifier, {
	      onError: onError,
	      onStart: onStart,
	      unsubscribe: unobserveOrCancelIfNeeded
	    });
	  }.bind(this);
	}.bind(undefined);

	var getRequest = function getRequest(_ref) {
	  var query = _ref.query,
	      variables = _ref.variables;

	  newArrowCheck(this, _this$z);

	  return {
	    operation: print(query),
	    variables: variables
	  };
	}.bind(undefined);
	/**
	 * Creates a terminating ApolloLink to request operations using given
	 * AbsintheSocket instance
	 */


	var createAbsintheSocketLink = function createAbsintheSocketLink(absintheSocket, onError, onStart) {
	  var _this3 = this;

	  newArrowCheck(this, _this$z);

	  return new ApolloLink(Fun_4$2(notifierToObservable(absintheSocket, onError, onStart), function (request) {
	    newArrowCheck(this, _this3);

	    return send(absintheSocket, request);
	  }.bind(this), getRequest));
	}.bind(undefined);

	exports.createAbsintheSocketLink = createAbsintheSocketLink;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
