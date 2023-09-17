import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { useState, useEffect, useRef, createElement, useCallback } from 'react';
import { usePublicClient, useWalletClient, useAccount } from 'wagmi';
import { create } from 'zustand';
import { getContract, parseEther } from 'viem';
import { getPublicClient, getAccount, waitForTransaction } from '@wagmi/core';
import { ethers, providers } from 'ethers';
import { ConnectKitButton } from 'connectkit';
import { Framework } from '@superfluid-finance/sdk-core';
import { useContextDays, useContextCalendars, useContextDatePickerOffsetPropGetters, useContextDaysPropGetters, useContextTime, useContextTimePropGetters, DatePickerStateProvider } from '@rehookify/datepicker';

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
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
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var flowrates = [{
  label: "Total Amount",
  value: 3600,
  sublabel: "once"
}, {
  label: "Per Second",
  value: 1,
  sublabel: "sec"
}, {
  label: "Per Minute",
  value: 60,
  sublabel: "min"
}, {
  label: "Per Hour",
  value: 3600,
  sublabel: "hour"
}, {
  label: "Per Day",
  value: 3600 * 24,
  sublabel: "day"
}, {
  label: "Per Week",
  value: 3600 * 24 * 7,
  sublabel: "week"
}, {
  label: "Per Month",
  value: 3600 * 24 * 30,
  sublabel: "mon"
}, {
  label: "Per Year",
  value: 3600 * 24 * 365,
  sublabel: "year"
}];

var ETHxpfDAIxpPool = "0x1";
var fDAIxpETHxpPool = "0x2";
var fDAIxfUSDCxPool = "0x0794c89b0767d480965574Af38052aab32496E00";
var mumbaiChainId = 80001;
var DEFAULT_PAY_ONCE = 3600 * 24;

var CollapseState;
(function (CollapseState) {
  CollapseState["NONE"] = "NONE";
  CollapseState["TIMEFRAME_SELECT"] = "TIMEFRAME_SELECT";
  CollapseState["DATE_TIME_SELECT"] = "DATE_TIME_SELECT";
  CollapseState["OUTBOUND_TOKEN_SELECT"] = "OUTBOUND_TOKEN_SELECT";
  CollapseState["INBOUND_TOKEN_SELECT"] = "INBOUND_TOKEN_SELECT";
  CollapseState["WRAP_TOKENS"] = "WRAP_TOKENS";
  CollapseState["SWAP_APPROVE"] = "SWAP_APPROVE";
  CollapseState["SWAP_SUBMITTING"] = "SWAP_SUBMITTING";
  CollapseState["SWAP_SUCCESS"] = "SWAP_SUCCESS";
  CollapseState["SWAP_FAILURE"] = "SWAP_FAILURE";
})(CollapseState || (CollapseState = {}));

var getErc20Contract = function getErc20Contract(tokenAddress) {
  var publicClient = getPublicClient({
    chainId: 80001
  });
  if (!tokenAddress) {
    return;
  }
  var tokenABI = [{
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "int256",
      "name": "balance",
      "type": "int256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "name": "_owner",
      "type": "address"
    }, {
      "name": "_spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }];
  var contract = getContract({
    address: tokenAddress,
    abi: tokenABI,
    publicClient: publicClient
  });
  return contract;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
var decodeAllowanceRes = function decodeAllowanceRes(returnArray) {
  // return is actually not an array here, just a value because there is only 1 param
  var array = returnArray;
  if (!array) {
    return {
      allowance: 0
    };
  }
  return {
    allowance: parseFloat(ethers.utils.formatEther(array))
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
var decodeBalanceRes = function decodeBalanceRes(returnArray) {
  // return is actually not an array here, just a value because there is only 1 param
  var array = returnArray;
  if (!array) {
    return {
      balance: 0
    };
  }
  return {
    balance: parseFloat(ethers.utils.formatEther(array))
  };
};

// eslint-disable-next-line import/prefer-default-export
var useStore = create()(function (set, get) {
  var _setOutboundToken, _setInboundToken;
  return {
    swapAmount: 0,
    outboundToken: undefined,
    inboundToken: undefined,
    outboundTokenBalance: 0,
    underlyingOutboundTokenBalance: 0,
    underlyingOutboundTokenWrapperAllowance: 0,
    inboundTokenBalance: 0,
    underlyingInboundTokenBalance: 0,
    flowrateUnit: flowrates[0],
    payOnceLength: DEFAULT_PAY_ONCE,
    collapseState: CollapseState.NONE,
    lastSwapTx: '',
    setLastSwapTx: function setLastSwapTx(lastSwapTx) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          lastSwapTx: lastSwapTx
        });
      });
    },
    setOutboundToken: function setOutboundToken(_x) {
      return (_setOutboundToken = _setOutboundToken || _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(outboundToken) {
        var account, erc20Contract, _yield$Promise$all, _yield$Promise$all2, balanceRes, allowanceRes, balance, allowance;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              set(function (state) {
                return _objectSpread2(_objectSpread2({}, state), {}, {
                  outboundToken: outboundToken
                });
              });
              // when token changes, fetch the underlying token balance and wrapper allowance
              account = getAccount().address;
              if (!(!account || !outboundToken.underlyingToken)) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return");
            case 4:
              erc20Contract = getErc20Contract(outboundToken.underlyingToken.address);
              if (erc20Contract) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return");
            case 7:
              _context.next = 9;
              return Promise.all([erc20Contract.read.balanceOf([account]), erc20Contract.read.allowance([account, outboundToken.address])]);
            case 9:
              _yield$Promise$all = _context.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              balanceRes = _yield$Promise$all2[0];
              allowanceRes = _yield$Promise$all2[1];
              balance = decodeBalanceRes(balanceRes).balance;
              allowance = decodeAllowanceRes(allowanceRes).allowance;
              set(function (state) {
                return _objectSpread2(_objectSpread2({}, state), {}, {
                  underlyingOutboundTokenBalance: balance,
                  underlyingOutboundTokenWrapperAllowance: allowance
                });
              });
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))).apply(this, arguments);
    },
    setInboundToken: function setInboundToken(_x2) {
      return (_setInboundToken = _setInboundToken || _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(inboundToken) {
        var account, erc20Contract, _yield$Promise$all3, _yield$Promise$all4, balanceRes, balance;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              set(function (state) {
                return _objectSpread2(_objectSpread2({}, state), {}, {
                  inboundToken: inboundToken
                });
              });
              // when token changes, fetch the underlying token balance
              account = getAccount().address;
              if (!(!account || !inboundToken.underlyingToken)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return");
            case 4:
              erc20Contract = getErc20Contract(inboundToken.underlyingToken.address);
              if (erc20Contract) {
                _context2.next = 7;
                break;
              }
              return _context2.abrupt("return");
            case 7:
              _context2.next = 9;
              return Promise.all([erc20Contract.read.balanceOf([account])]);
            case 9:
              _yield$Promise$all3 = _context2.sent;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 1);
              balanceRes = _yield$Promise$all4[0];
              balance = decodeBalanceRes(balanceRes).balance;
              set(function (state) {
                return _objectSpread2(_objectSpread2({}, state), {}, {
                  underlyingInboundTokenBalance: balance
                });
              });
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))).apply(this, arguments);
    },
    setOutboundTokenBalance: function setOutboundTokenBalance(outboundTokenBalance) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          outboundTokenBalance: outboundTokenBalance
        });
      });
    },
    setUnderlyingOutboundTokenBalance: function setUnderlyingOutboundTokenBalance(underlyingOutboundTokenBalance) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          underlyingOutboundTokenBalance: underlyingOutboundTokenBalance
        });
      });
    },
    setUnderlyingOutboundTokenAllowance: function setUnderlyingOutboundTokenAllowance(underlyingOutboundTokenAllowance) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          underlyingOutboundTokenAllowance: underlyingOutboundTokenAllowance
        });
      });
    },
    setInboundTokenBalance: function setInboundTokenBalance(inboundTokenBalance) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          inboundTokenBalance: inboundTokenBalance
        });
      });
    },
    setUnderlyingInboundTokenBalance: function setUnderlyingInboundTokenBalance(underlyingInboundTokenBalance) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          underlyingInboundTokenBalance: underlyingInboundTokenBalance
        });
      });
    },
    setUpgradeDowngradeToken: function setUpgradeDowngradeToken(upgradeDowngradeToken) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          upgradeDowngradeToken: upgradeDowngradeToken
        });
      });
    },
    setSelectedToken: function setSelectedToken(selectedToken) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          selectedToken: selectedToken
        });
      });
    },
    setFlowrateUnit: function setFlowrateUnit(flowrateUnit) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          flowrateUnit: flowrateUnit
        });
      });
    },
    setPayOnceLength: function setPayOnceLength(payOnceLength) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          payOnceLength: payOnceLength
        });
      });
    },
    setCollapseState: function setCollapseState(collapseState) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          collapseState: collapseState
        });
      });
    },
    setSwapAmount: function setSwapAmount(swapAmount) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          swapAmount: swapAmount
        });
      });
    },
    incrementOutboundTokenBalance: function incrementOutboundTokenBalance(amount) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          outboundTokenBalance: get().outboundTokenBalance + amount
        });
      });
    },
    incrementInboundTokenBalance: function incrementInboundTokenBalance(amount) {
      return set(function (state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          inboundTokenBalance: get().inboundTokenBalance + amount
        });
      });
    },
    // helper functions
    getEffectiveFlowRateEther: function getEffectiveFlowRateEther() {
      var flowRate = get().flowrateUnit.sublabel == 'once' ? get().swapAmount / get().payOnceLength : get().swapAmount / get().flowrateUnit.value;
      var flowRate18Decimals = flowRate.toFixed(18);
      return parseEther(flowRate18Decimals).toString();
    },
    getEffectiveFlowRate: function getEffectiveFlowRate() {
      var flowRate = get().flowrateUnit.sublabel == 'once' ? get().swapAmount / get().payOnceLength : get().swapAmount / get().flowrateUnit.value;
      return flowRate.toString();
    },
    isBalanceUnderSwapAmount: function isBalanceUnderSwapAmount() {
      //const formattedUnderlyingBalance = get().underlyingOutboundTokenBalance && underlyingOutBalance.data ? parseFloat(underlyingOutBalance.data.formatted) : 0;
      var combinedBalances = get().underlyingOutboundTokenBalance + get().outboundTokenBalance;
      // balance should be greater than 10 hours of streaming (based on computed flowrate)
      var minimumBalance = parseFloat(get().getEffectiveFlowRate()) * 36000;
      return minimumBalance > combinedBalances;
    },
    isBalanceUnderBuffer: function isBalanceUnderBuffer() {
      return parseFloat(get().getEffectiveFlowRate()) * 3600 * 10 > get().outboundTokenBalance;
    },
    getExpectedDeposit: function getExpectedDeposit() {
      return parseFloat(get().getEffectiveFlowRate()) * 3600 * 4;
    },
    getCombinedOutboundBalance: function getCombinedOutboundBalance() {
      return get().outboundTokenBalance + get().underlyingOutboundTokenBalance;
    },
    getAmountNeededToWrap: function getAmountNeededToWrap() {
      // this should only be called if we know the user has enough combined balance
      // balance should be greater than 10 hours of streaming (based on computed flowrate)
      var minimumBalance = parseFloat(get().getEffectiveFlowRate()) * 36000;
      if (get().outboundTokenBalance > minimumBalance) {
        return 0;
      }
      return minimumBalance - get().outboundTokenBalance;
    },
    getAmountNeededToApproveForWrap: function getAmountNeededToApproveForWrap() {
      var amountNeededToWrap = get().getAmountNeededToWrap();
      var amountAlreadyApproved = get().underlyingOutboundTokenWrapperAllowance;
      var amountNeeded = amountNeededToWrap - amountAlreadyApproved;
      return amountNeeded > 0 ? amountNeeded : 0;
    },
    getCombinedInboundBalance: function getCombinedInboundBalance() {
      return get().inboundTokenBalance + get().underlyingInboundTokenBalance;
    },
    getSwapAmountAsString: function getSwapAmountAsString() {
      var amount = parseFloat(get().swapAmount.toString());
      var decimalPlaces = (amount.toString().split('.')[1] || []).length;
      return decimalPlaces > 5 ? amount.toFixed(5) : amount.toString();
    },
    getSwapAmountAsLocaleString: function getSwapAmountAsLocaleString() {
      var amount = parseFloat(get().swapAmount.toString());
      return amount.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5
      });
    }
  };
});

var defaultTheme = {
  TitleColor: "#ffffff",
  bgColor: "#000000",
  primaryBorderWidth: "2px",
  secondaryBorderWidth: "2px",
  primaryBorderRadius: "3rem",
  secondaryBorderRadius: "0.9rem",
  accentBorderRadius: "12px",
  borderColor: "#262626",
  plusBg: "rgb(255 255 255 / 0.1)",
  plusBorder: "rgb(255 255 255 / 0.25)",
  plusColor: "rgb(255 255 255 / 0.5)",
  useMaxButton: "#2A2A2A",
  useMaxText: "#ffffff",
  itemBorderRadius: "9999px",
  inputDot: "#FFFFFF",
  accentText: "rgb(255 255 255 / 0.5)",
  icons: "rgb(255 255 255 / 0.75)",
  streamLengthText: "rgb(255 255 255 / 0.75)",
  streamLengthBox: "#121212",
  tokenBox: "#121212",
  dataDisplayBg: "#0D0D0D",
  primaryText: "#FFFFFF",
  secondaryText: "#FFFFFF",
  primaryFontWeight: "500",
  secondaryFontWeight: "500",
  swapButton: "#0460CE",
  swapButtonText: "#FFFFFF",
  swapButtonFontSize: "22px",
  swapButtonPadding: "0.75rem",
  swapButtonRadius: "9999px",
  secondaryMain: "rgba(225, 123, 247, 0.6)",
  approveBox: "#121212",
  loaderInner: "rgb(255 255 255 / 0.5)",
  loaderOuter: "#E17BF7"
};

var TestTokens = [{
  name: "USD Coin",
  address: "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
  symbol: "USDCx",
  decimals: 18,
  chainId: 5,
  underlyingToken: {
    name: "USD Coin",
    address: "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2",
    symbol: "USDC",
    decimals: 18,
    chainId: 5,
    logoURI: "/usdc-logo.png"
  },
  logoURI: "/usdc-logo.png"
}, {
  name: "DAI Stablecoin",
  address: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
  symbol: "DAIx",
  decimals: 18,
  chainId: 5,
  underlyingToken: {
    name: "DAI Stablecoin",
    address: "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7",
    symbol: "DAI",
    decimals: 18,
    chainId: 5,
    logoURI: "/dai-logo.png"
  },
  logoURI: "/dai-logo.png"
}];

var ConnectWalletButton = function ConnectWalletButton(_ref) {
  var theme = _ref.theme;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  return jsx(ConnectKitButton.Custom, {
    children: function children(_ref2) {
      var show = _ref2.show;
      return jsx("button", {
        onClick: show,
        className: "rounded-full mt-4 w-full",
        style: {
          backgroundColor: swapTheme.swapButton,
          color: swapTheme.swapButtonText,
          fontSize: swapTheme.swapButtonFontSize,
          padding: swapTheme.swapButtonPadding,
          fontWeight: swapTheme.titleFontWeight
        },
        children: "Connect Wallet"
      });
    }
  });
};

var FlowRateSelect = function FlowRateSelect(_ref) {
  var dropdownValue = _ref.dropdownValue,
    theme = _ref.theme;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  return jsx("div", {
    className: "w-full flex flex-row py-3 items-center justify-center",
    style: {
      backgroundColor: swapTheme.streamLengthBox,
      borderRadius: swapTheme.secondaryBorderRadius,
      fontFamily: swapTheme.textFont,
      fontWeight: swapTheme.accentFontWeight
    },
    children: jsx("h1", {
      className: "text-xl opacity-75",
      style: {
        color: swapTheme.TitleColor
      },
      children: dropdownValue.label
    })
  });
};

var WidgetTitle = function WidgetTitle(_ref) {
  var swapTheme = _ref.swapTheme;
  return jsxs("div", {
    className: "flex md:pt-5",
    children: [jsx("p", {
      style: {
        color: swapTheme.TitleColor,
        fontWeight: swapTheme.titleFontWeight
      },
      className: "text-2xl ml-2",
      children: "Swap"
    }), jsx("div", {
      className: "flex grow"
    })]
  });
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React__default.createContext && React__default.createContext(DefaultContext);

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return React__default.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  // eslint-disable-next-line react/display-name
  return function (props) {
    return React__default.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return React__default.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React__default.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? React__default.createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function BsArrowLeftShort (props) {
  return GenIcon({"tag":"svg","attr":{"fill":"currentColor","viewBox":"0 0 16 16"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","d":"M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"}}]})(props);
}function BsCheckLg (props) {
  return GenIcon({"tag":"svg","attr":{"fill":"currentColor","viewBox":"0 0 16 16"},"child":[{"tag":"path","attr":{"d":"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"}}]})(props);
}function BsPlus (props) {
  return GenIcon({"tag":"svg","attr":{"fill":"currentColor","viewBox":"0 0 16 16"},"child":[{"tag":"path","attr":{"d":"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"}}]})(props);
}

var OutboundBox = function OutboundBox(_ref) {
  var swapTheme = _ref.swapTheme;
  var store = useStore();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2);
    _useState2[0];
    var setShowMaxAnimation = _useState2[1];
  var handleUseMaxClick = function handleUseMaxClick(e) {
    e.stopPropagation();
    var outboundBalance = store.outboundTokenBalance + store.underlyingOutboundTokenBalance;
    if (store.outboundToken && outboundBalance > 0) {
      store.setSwapAmount(outboundBalance);
    } else {
      setShowMaxAnimation(true);
      setTimeout(function () {
        setShowMaxAnimation(false);
      }, 300);
    }
  };
  return jsxs("div", {
    //type="button"
    className: "flex p-3 items-center transition-all w-full",
    style: {
      backgroundColor: swapTheme.tokenBox,
      borderRadius: swapTheme.secondaryBorderRadius,
      transitionDuration: swapTheme.accentDuration,
      fontFamily: swapTheme.textFont
    },
    children: [jsx("div", {
      className: "w-[40px] h-[40px]",
      children: store.outboundToken ? jsx("img", {
        src: store.outboundToken.logoURI,
        width: "40",
        height: "40",
        alt: "Token"
      }) : jsx("div", {
        style: {
          backgroundColor: swapTheme.plusBg,
          borderColor: swapTheme.plusBorder,
          color: swapTheme.plusColor,
          borderWidth: swapTheme.secondaryBorderWidth,
          borderRadius: swapTheme.itemBorderRadius
        },
        children: jsx(BsPlus, {
          className: "w-full h-full"
        })
      })
    }), jsxs("div", {
      className: "flex flex-col grow pl-3 space-y-1 items-start justify-center",
      children: [jsx("p", {
        className: "leading-none text-sm",
        style: {
          color: swapTheme.secondaryText,
          fontWeight: swapTheme.secondaryFontWeight,
          fontFamily: swapTheme.textFont
        },
        children: store.outboundToken ? store.outboundToken.name : "You pay with:"
      }), jsx("p", {
        className: "leading-none text-xs",
        style: {
          color: swapTheme.accentText,
          fontWeight: swapTheme.secondaryFontWeight,
          fontFamily: swapTheme.numberFont
        },
        children: store.getCombinedOutboundBalance() === 0 || !store.outboundToken ? "0.0" : store.getCombinedOutboundBalance().toFixed(5)
      })]
    }), jsx("div", {
      className: "text-xs h-8 px-4 hover:scale-110 hover:-translate-x-1 transition-all flex items-center justify-center ".concat(store.collapseState == CollapseState.OUTBOUND_TOKEN_SELECT ? 'opacity-0 pointer-events-none' : 'opacity-100'),
      style: {
        backgroundColor: swapTheme.useMaxButton,
        color: swapTheme.useMaxText,
        fontWeight: swapTheme.primaryFontWeight,
        borderRadius: swapTheme.itemBorderRadius,
        transitionDuration: swapTheme.accentDuration
      },
      onClick: handleUseMaxClick,
      children: "Use Max"
    })]
  });
};

// THIS FILE IS AUTO GENERATED
function HiArrowSmDown (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 20 20","fill":"currentColor","aria-hidden":"true"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","d":"M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z","clipRule":"evenodd"}}]})(props);
}function HiCheckCircle (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 20 20","fill":"currentColor","aria-hidden":"true"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","d":"M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clipRule":"evenodd"}}]})(props);
}

var ActivateSwapArrow = function ActivateSwapArrow(_ref) {
  var swapTheme = _ref.swapTheme;
  var store = useStore();
  var handleSwitch = function handleSwitch() {
    store.setOutboundToken(store.inboundToken);
    store.setInboundToken(store.outboundToken);
  };
  return jsx("div", {
    className: "flex w-full items-center justify-center",
    children: jsx("button", {
      className: "px-1.5 py-1.5 opacity-90 hover:opacity-100",
      onClick: handleSwitch,
      style: {
        backgroundColor: swapTheme.useMaxButton,
        borderRadius: swapTheme.accentBorderRadius
      },
      children: jsx(HiArrowSmDown, {
        className: "text-xl",
        style: {
          color: swapTheme.accentText
        }
      })
    })
  });
};

var InboundBox = function InboundBox(_ref) {
  var swapTheme = _ref.swapTheme;
  var store = useStore();
  return jsxs("div", {
    className: "flex p-3 items-center transition-all w-full",
    style: {
      backgroundColor: swapTheme.tokenBox,
      borderRadius: swapTheme.secondaryBorderRadius,
      transitionDuration: swapTheme.accentDuration
    },
    children: [jsx("div", {
      className: "w-[40px] h-[40px]",
      children: store.inboundToken ? jsx("img", {
        src: store.inboundToken.logoURI,
        width: "40",
        height: "40",
        alt: "token"
      }) : jsx("div", {
        style: {
          backgroundColor: swapTheme.plusBg,
          borderColor: swapTheme.plusBorder,
          borderWidth: swapTheme.secondaryBorderWidth,
          color: swapTheme.plusColor,
          borderRadius: swapTheme.itemBorderRadius
        },
        children: jsx(BsPlus, {
          className: "w-full h-full"
        })
      })
    }), jsxs("div", {
      className: "flex flex-col grow pl-3 space-y-1 items-start justify-center",
      children: [jsx("p", {
        className: "leading-none text-sm",
        style: {
          color: swapTheme.secondaryText,
          fontWeight: swapTheme.secondaryFontWeight,
          fontFamily: swapTheme.textFont
        },
        children: store.inboundToken ? store.inboundToken.name : "You receive:"
      }), jsx("p", {
        className: "leading-none text-xs",
        style: {
          color: swapTheme.accentText,
          fontWeight: swapTheme.secondaryFontWeight,
          fontFamily: swapTheme.numberFont
        },
        children: store.getCombinedInboundBalance() === 0 || !store.inboundToken ? "0.0" : store.getCombinedInboundBalance().toFixed(5)
      })]
    })]
  });
};

var Address;
(function (Address) {
  Address["ETHxp"] = "ETHxp";
  Address["ETH"] = "ETH";
  Address["fDAIx"] = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";
  Address["fDAI"] = "0x15F0Ca26781C3852f8166eD2ebce5D18265cceb7";
  Address["fUSDCx"] = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";
  Address["fUSDC"] = "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2";
  Address["fAMKT"] = "0x123";
  Address["fAMKTxp"] = "0x321";
  Address["unlisted"] = "unlisted";
})(Address || (Address = {}));
var Address$1 = Address;

var getPoolAddress = function getPoolAddress(outboundToken, inboundToken) {
  var pool;
  switch (true) {
    case inboundToken === Address$1.ETHxp && outboundToken === Address$1.fDAIx:
      pool = ETHxpfDAIxpPool;
      break;
    case inboundToken === Address$1.fDAIx && outboundToken === Address$1.ETHxp:
      pool = fDAIxpETHxpPool;
      break;
    case inboundToken === Address$1.fDAIx && outboundToken === Address$1.fUSDCx:
      pool = fDAIxfUSDCxPool;
      break;
    case inboundToken === Address$1.fUSDCx && outboundToken === Address$1.fDAIx:
      pool = fDAIxfUSDCxPool;
      break;
    default:
      throw new Error("Pool not found for tokens \"".concat(outboundToken, "\" and \"").concat(inboundToken, "\""));
  }
  return pool;
};

var SwapButton = function SwapButton(_ref) {
  var swapTheme = _ref.swapTheme;
  var store = useStore();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    poolExists = _useState2[0],
    setPoolExists = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2);
    _useState4[0];
    var setShowAnimation = _useState4[1];
  // helper function to get the text that should be shown in the swap button
  function getButtonText() {
    var _a;
    // order is intentional here
    if (!store.inboundToken || !store.outboundToken) {
      return 'Select tokens';
    }
    if (!poolExists) {
      return 'Pool does not exist';
    }
    if (store.swapAmount <= 0) {
      return 'Enter amount';
    }
    if (store.isBalanceUnderSwapAmount()) {
      return "Insufficient ".concat((_a = store.outboundToken) === null || _a === void 0 ? void 0 : _a.symbol, " balance");
    }
    return 'Swap';
  }
  var handleSwapClick = function handleSwapClick() {
    if (getButtonText() == 'Swap') {
      if (store.getAmountNeededToApproveForWrap() > 0) {
        store.setCollapseState(CollapseState.WRAP_TOKENS);
      } else {
        store.setCollapseState(CollapseState.SWAP_APPROVE);
      }
    } else {
      setShowAnimation(true);
      setTimeout(function () {
        setShowAnimation(false);
      }, 300);
    }
  };
  useEffect(function () {
    var _a, _b;
    try {
      getPoolAddress((_a = store.inboundToken) === null || _a === void 0 ? void 0 : _a.address, (_b = store.outboundToken) === null || _b === void 0 ? void 0 : _b.address);
      setPoolExists(true);
    } catch (err) {
      setPoolExists(false);
    }
  }, [store.inboundToken, store.outboundToken]);
  return jsx("button", {
    className: "".concat(getButtonText() != 'Swap' ? "opacity-50" : "", " mt-4 w-full"),
    onClick: handleSwapClick,
    style: {
      backgroundColor: swapTheme.swapButton,
      color: swapTheme.swapButtonText,
      fontSize: swapTheme.swapButtonFontSize,
      padding: swapTheme.swapButtonPadding,
      borderRadius: swapTheme.swapButtonRadius,
      fontWeight: swapTheme.titleFontWeight
    },
    children: getButtonText()
  });
};

var DynamicInputBox = function DynamicInputBox(_ref) {
  var swapTheme = _ref.swapTheme,
    dynamicInput = _ref.dynamicInput,
    paddingPercentage = _ref.paddingPercentage,
    setDynamicInput = _ref.setDynamicInput;
  var store = useStore();
  var inputRef = useRef(null);
  var parentRef = useRef(null);
  var _useState = useState(21.5),
    _useState2 = _slicedToArray(_useState, 2),
    divScrollLeft = _useState2[0],
    setDivScrollLeft = _useState2[1];
  var _useState3 = useState(72),
    _useState4 = _slicedToArray(_useState3, 2),
    dynamicFontSize = _useState4[0],
    setDynamicFontSize = _useState4[1]; // in px
  var START_SCROLL = 21.5;
  var activateInput = function activateInput() {
    inputRef.current.focus();
  };
  var regex = /\./g;
  useEffect(function () {
    // width computation + animation
    var dynamicInputString = dynamicInput ? dynamicInput.toString() : '';
    var computedStyle = window.getComputedStyle(inputRef.current);
    var getWidth = function getWidth(fontSize) {
      var div = document.createElement("div");
      div.innerText = dynamicInputString;
      div.style.fontSize = fontSize;
      div.style.fontWeight = computedStyle.fontWeight;
      div.style.fontFamily = computedStyle.fontFamily;
      div.style.width = "auto";
      div.style.display = "inline-block";
      div.style.visibility = "hidden";
      div.style.position = "fixed";
      div.style.overflow = "auto";
      document.body.append(div);
      var width = div.offsetWidth;
      div.remove();
      return width;
    };
    if (parentRef.current) {
      var newFontSize = dynamicFontSize * (parentRef.current.clientWidth * (1 - paddingPercentage) / getWidth("".concat(dynamicFontSize, "px")));
      newFontSize = parseFloat(newFontSize.toFixed(2));
      if (newFontSize > 72) {
        setDynamicFontSize(72);
        newFontSize = 72;
      } else {
        setDynamicFontSize(newFontSize);
      }
      if (dynamicInputString === "") {
        setDivScrollLeft(START_SCROLL);
        setDynamicFontSize(72);
      } else {
        setDivScrollLeft(getWidth("".concat(newFontSize, "px")) / 2);
      }
    }
  }, [dynamicInput, divScrollLeft]);
  var handleInput = function handleInput(e) {
    var inputValue = e.target.value;
    var numericValue = inputValue.replace(/[^0-9.]/g, "");
    if (inputValue === "") {
      setDivScrollLeft(START_SCROLL);
      setDynamicFontSize(72);
    }
    var periodsCount = (inputValue.match(regex) || []).length;
    if (periodsCount > 1) {
      return;
    }
    /*
            if (isNaN(numericValue)) {
                setDivScrollLeft(START_SCROLL)
                return;
            }
    */
    setDynamicInput(numericValue);
  };
  return jsx("div", {
    className: "w-full h-full",
    style: {
      color: swapTheme.primaryText
    },
    onClick: activateInput,
    children: jsxs("div", {
      ref: parentRef,
      className: "w-full h-full flex items-center justify-end overflow-hidden space-x-2",
      children: [jsx("div", {
        className: "w-[30px] h-[30px] mb-12 cursor-pointer z-10",
        children: store.outboundToken ? jsx("img", {
          src: store.outboundToken.logoURI,
          width: "40",
          height: "40",
          alt: "OutboundToken",
          onClick: function onClick() {
            store.setCollapseState(CollapseState.OUTBOUND_TOKEN_SELECT);
          }
        }) : jsx("div", {
          style: {
            backgroundColor: swapTheme.plusBg,
            borderColor: swapTheme.plusBorder,
            borderWidth: swapTheme.secondaryBorderWidth,
            color: swapTheme.plusColor,
            borderRadius: swapTheme.itemBorderRadius
          },
          children: jsx(BsPlus, {
            className: "w-full h-full",
            onClick: function onClick() {
              store.setCollapseState(CollapseState.OUTBOUND_TOKEN_SELECT);
            }
          })
        })
      }), jsx("input", {
        ref: inputRef,
        style: {
          width: "calc(50% + ".concat(divScrollLeft, "px)"),
          fontSize: "".concat(dynamicFontSize, "px"),
          fontFamily: swapTheme.numberFont,
          fontWeight: swapTheme.primaryFontWeight,
          backgroundColor: "transparent",
          color: swapTheme.primaryText,
          transitionDuration: swapTheme.accentDuration
        },
        type: "text",
        className: "outline-none transition-all",
        onChange: handleInput,
        value: dynamicInput,
        placeholder: "0"
      })]
    })
  });
};

var CollapsableModalWrapper = function CollapsableModalWrapper(_ref) {
  var defaultStyle = _ref.defaultStyle,
    openedStyle = _ref.openedStyle,
    collapseId = _ref.collapseId,
    buttonContent = _ref.buttonContent,
    modal = _ref.modal,
    customModalHeight = _ref.customModalHeight;
  var store = useStore();
  return jsxs("div", {
    className: "".concat(store.collapseState == collapseId ? openedStyle ? openedStyle : '' : store.collapseState == CollapseState.NONE ? defaultStyle ? defaultStyle : '' : '', " \n                transition-all duration-[550ms] -mx-2 px-2 overflow-hidden"),
    children: [jsxs("button", {
      onClick: function onClick() {
        var newCollapseState = store.collapseState == collapseId ? CollapseState.NONE : collapseId;
        store.setCollapseState(newCollapseState);
      },
      className: "".concat(store.collapseState == CollapseState.NONE || store.collapseState == collapseId ? 'max-h-96 opacity-100' : 'max-h-0 invisible opacity-0', " flex items-center w-full transition-all duration-[500ms] hover:scale-[1.02]"),
      children: [jsx("div", {
        className: "".concat(store.collapseState == collapseId ? 'max-w-xs opacity-100 duration-[2000ms]' : 'max-w-0 opacity-0 duration-[750ms]', " flex items-center w-12 h-8 text-white transition-all"),
        children: jsx("div", {
          className: "bg-white/10 rounded-full p-1 text-white/75 w-min text-2xl",
          children: jsx(BsArrowLeftShort, {})
        })
      }), buttonContent]
    }), jsx("div", {
      className: "".concat(store.collapseState == collapseId ? (customModalHeight ? customModalHeight : 'max-h-96') + ' opacity-100 duration-[550ms]' : 'max-h-0 invisible opacity-0 duration-[500ms]', " w-full transition-all"),
      children: modal
    })]
  });
};

var CollapsableWrapper = function CollapsableWrapper(_ref) {
  var defaultStyle = _ref.defaultStyle,
    children = _ref.children;
  var store = useStore();
  return jsx("div", {
    className: "".concat(store.collapseState == CollapseState.NONE ? 'max-h-96 opacity-100 duration-[550ms] ' + (defaultStyle ? defaultStyle : '') : 'max-h-0 invisible opacity-0 duration-[500ms]', " transition-all overflow-hidden -mx-2 px-2"),
    children: children
  });
};

var TokenRow = function TokenRow(_ref) {
  var item = _ref.item,
    index = _ref.index,
    isHover = _ref.isHover,
    swapTheme = _ref.swapTheme,
    handleMouseEnter = _ref.handleMouseEnter,
    handleMouseLeave = _ref.handleMouseLeave,
    setOutboundToken = _ref.setOutboundToken,
    setInboundToken = _ref.setInboundToken,
    outbound = _ref.outbound;
  var store = useStore();
  return jsxs("div", {
    className: "flex flex-row ease-in-out px-1 py-2 cursor-pointer",
    onMouseEnter: function onMouseEnter() {
      return handleMouseEnter(index);
    },
    onMouseLeave: function onMouseLeave() {
      return handleMouseLeave(index);
    },
    onClick: function onClick() {
      if (!outbound) {
        setInboundToken(item);
      } else {
        setOutboundToken(item);
      }
      store.setCollapseState(CollapseState.NONE);
    },
    style: {
      backgroundColor: isHover[index] ? swapTheme.streamLengthBox : 'transparent',
      borderRadius: swapTheme.accentBorderRadius,
      transitionDuration: swapTheme.secondaryDuration
    },
    children: [jsx("div", {
      className: "px-2 py-2 flex items-center justify-center",
      style: {
        borderRadius: swapTheme.itemBorderRadius
      },
      children: jsx("img", {
        src: item.logoURI,
        width: 50,
        height: 50,
        alt: "token-logo"
      })
    }), jsxs("div", {
      className: "flex flex-col w-full items-start px-1 justify-center",
      style: {
        fontFamily: swapTheme.textFont
      },
      children: [jsx("h1", {
        className: "text-lg h-1/2 mt-0.5",
        style: {
          color: swapTheme.primaryText
        },
        children: item.underlyingToken ? item.underlyingToken.symbol : item.symbol
      }), jsx("p", {
        className: "h-1/2",
        style: {
          color: swapTheme.accentText
        },
        children: item.underlyingToken ? item.underlyingToken.name : item.name
      })]
    })]
  }, item.name);
};

// THIS FILE IS AUTO GENERATED
function FiChevronLeft (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polyline","attr":{"points":"15 18 9 12 15 6"}}]})(props);
}function FiExternalLink (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}},{"tag":"polyline","attr":{"points":"15 3 21 3 21 9"}},{"tag":"line","attr":{"x1":"10","y1":"14","x2":"21","y2":"3"}}]})(props);
}function FiSearch (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"circle","attr":{"cx":"11","cy":"11","r":"8"}},{"tag":"line","attr":{"x1":"21","y1":"21","x2":"16.65","y2":"16.65"}}]})(props);
}

var TokenDisplay = function TokenDisplay(_ref) {
  var tokenOption = _ref.tokenOption,
    theme = _ref.theme,
    setOutboundToken = _ref.setOutboundToken,
    setInboundToken = _ref.setInboundToken,
    outbound = _ref.outbound;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  var _useState = useState(tokenOption.map(function () {
      return false;
    })),
    _useState2 = _slicedToArray(_useState, 2),
    isHover = _useState2[0],
    setIsHover = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    searchQuery = _useState4[0],
    setSearchQuery = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isInputHover = _useState6[0],
    setIsInputHover = _useState6[1];
  var filteredTokens = tokenOption.filter(function (token) {
    return token.name.toLowerCase().includes(searchQuery.toLowerCase()) || token.symbol.toLowerCase().includes(searchQuery.toLowerCase());
  });
  var tokensToRender = searchQuery ? filteredTokens : tokenOption;
  var handleMouseEnter = function handleMouseEnter(index) {
    setIsHover(function (prevStates) {
      return prevStates.map(function (state, i) {
        return i === index ? true : state;
      });
    });
  };
  var handleMouseLeave = function handleMouseLeave(index) {
    setIsHover(function (prevStates) {
      return prevStates.map(function (state, i) {
        return i === index ? false : state;
      });
    });
  };
  return jsxs("div", {
    children: [jsx("div", {
      className: "w-full flex flex-row items-center justify-between",
      children: jsxs("div", {
        className: "w-full h-14 items-center flex flex-row space-x-2 ease-in-out",
        style: {
          backgroundColor: swapTheme.streamLengthBox,
          borderColor: isInputHover ? "transparent" : swapTheme.borderColor,
          borderWidth: swapTheme.primaryBorderWidth,
          borderRadius: swapTheme.accentBorderRadius,
          transitionDuration: swapTheme.primaryDuration
        },
        onMouseEnter: function onMouseEnter() {
          setIsInputHover(true);
        },
        onMouseLeave: function onMouseLeave() {
          setIsInputHover(false);
        },
        children: [jsx(FiSearch, {
          className: "ml-2 h-6 w-6 cursor-text",
          style: {
            color: swapTheme.primaryText
          }
        }), jsx("input", {
          className: "w-full h-full focus:outline-none border-transparent",
          style: {
            backgroundColor: swapTheme.streamLengthBox,
            color: swapTheme.primaryText,
            borderRadius: swapTheme.accentBorderRadius
          },
          type: "text",
          placeholder: "Search tokens...",
          value: searchQuery,
          onChange: function onChange(e) {
            return setSearchQuery(e.target.value);
          }
        })]
      })
    }), jsx("div", {
      className: "w-full space-y-0 py-4",
      style: {
        backgroundColor: "transparent"
      },
      children: tokensToRender.map(function (item, index) {
        return jsx(TokenRow, {
          item: item,
          index: index,
          isHover: isHover,
          swapTheme: swapTheme,
          setOutboundToken: setOutboundToken,
          setInboundToken: setInboundToken,
          outbound: outbound,
          handleMouseEnter: handleMouseEnter,
          handleMouseLeave: handleMouseLeave
        }, item.name);
      })
    })]
  });
};

var OptionButton = function OptionButton(_ref) {
  var option = _ref.option,
    setDropdownValue = _ref.setDropdownValue,
    theme = _ref.theme,
    isSelected = _ref.isSelected;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  var store = useStore();
  return jsx("button", {
    className: "w-full px-3 py-2 flex items-center justify-center opacity-75 hover:opacity-100 transition-all duration-300  bg-white/10 ".concat(isSelected ? 'outline outline-2 outline-blue-500' : ''),
    onClick: function onClick() {
      setDropdownValue(option);
      store.setCollapseState(CollapseState.NONE);
    },
    style: {
      //backgroundColor: swapTheme.,
      color: swapTheme.primaryText,
      borderRadius: swapTheme.accentBorderRadius,
      fontWeight: swapTheme.accentFontWeight,
      fontFamily: swapTheme.textFont
    },
    children: jsx("h1", {
      className: "opacity-75",
      children: option.label
    })
  });
};
var FlowRateRow = function FlowRateRow(_ref2) {
  var options = _ref2.options,
    setDropdownValue = _ref2.setDropdownValue,
    theme = _ref2.theme;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  var store = useStore();
  var _options = _toArray(options),
    firstOption = _options[0],
    remainingOptions = _options.slice(1);
  return jsxs("div", {
    className: "pt-4",
    children: [jsxs("a", {
      href: "https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa",
      className: "group pl-5 pr-4 py-4 flex grow items-center justify-center space-x-2 rounded-xl text-white text-sm opacity-75 hover:opacity-100 bg-white/10 transition-all duration-300 hover:scale-[1.02]",
      target: "_blank",
      rel: "noopener noreferrer",
      children: [jsx("p", {
        className: "flex grow",
        children: "What is a stream?"
      }), jsx(FiExternalLink, {}), jsx("img", {
        src: '/superfluid-logo.png',
        width: "20",
        height: "20",
        alt: "superfluid logo",
        className: "2opacity-75 2group-hover:opacity-100 2transition-all 2duration-300"
      })]
    }), jsxs("div", {
      className: "border-[1px] p-3 space-y-2 rounded-[1.25rem] border-white/10 mt-6",
      children: [jsx("p", {
        className: "text-white/60 text-xs p-2",
        children: "For beginners - automatically wrap your tokens and calculate your flowrate based the selected duration"
      }), jsx(OptionButton, {
        option: firstOption,
        setDropdownValue: setDropdownValue,
        theme: theme,
        isSelected: store.flowrateUnit.label === firstOption.label
      }, firstOption.sublabel)]
    }), jsxs("div", {
      className: "border-[1px] p-3 space-y-2 rounded-[1.25rem] border-white/10 mt-4 2mb-2",
      children: [jsx("p", {
        className: "text-white/60 text-xs p-2",
        children: "For advanced users - manually set your flowrate"
      }), jsx("div", {
        //theme={swapTheme}
        //className="p-2"
        style: {
          //backgroundColor: swapTheme.streamLengthBox,
          borderRadius: swapTheme.secondaryBorderRadius
        },
        className: "2pb-2 grid grid-cols-2 gap-x-1 gap-y-1",
        children: remainingOptions.map(function (option) {
          return jsx(OptionButton, {
            option: option,
            setDropdownValue: setDropdownValue,
            theme: theme,
            isSelected: store.flowrateUnit.label === option.label
          }, option.sublabel);
        })
      })]
    })]
  });
};

var ApproveRow = function ApproveRow(_ref) {
  var item = _ref.item,
    index = _ref.index,
    swapTheme = _ref.swapTheme;
  return jsxs("div", {
    className: 'w-full flex flex-row items-start justify-start space-x-5',
    children: [jsxs("p", {
      className: 'font-light',
      style: {
        //fontWeight: swapTheme.accentFontWeight,
        color: swapTheme.accentText
      },
      children: [item.title, ":"]
    }), jsx("p", {
      style: {
        color: swapTheme.primaryText
      },
      children: item.data
    })]
  }, index);
};

function publicClientToProvider(publicClient) {
  var _a, _b;
  var chain = publicClient.chain,
    transport = publicClient.transport;
  var network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: (_b = (_a = chain.contracts) === null || _a === void 0 ? void 0 : _a.ensRegistry) === null || _b === void 0 ? void 0 : _b.address
  };
  var url = transport.type === 'fallback' ? transport.transports[0].value.url : transport.url;
  return new providers.JsonRpcProvider(url, network);
}
/** Hook to convert a viem Public Client to an ethers.js Provider. */
function useEthersProvider() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId = _ref.chainId;
  var publicClient = usePublicClient({
    chainId: chainId
  });
  return React.useMemo(function () {
    return publicClientToProvider(publicClient);
  }, [publicClient]);
}

/* eslint-enable @typescript-eslint/no-explicit-any */
function walletClientToSigner(walletClient) {
  var _a, _b;
  var account = walletClient.account,
    chain = walletClient.chain,
    transport = walletClient.transport;
  var network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: (_b = (_a = chain.contracts) === null || _a === void 0 ? void 0 : _a.ensRegistry) === null || _b === void 0 ? void 0 : _b.address
  };
  var provider = new providers.Web3Provider(transport, network);
  var signer = provider.getSigner(account.address);
  return signer;
}
/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
function useEthersSigner() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId = _ref.chainId;
  var _useWalletClient = useWalletClient({
      chainId: chainId
    }),
    walletClient = _useWalletClient.data;
  return React.useMemo(function () {
    return walletClient ? walletClientToSigner(walletClient) : undefined;
  }, [walletClient]);
}

function toLocale(num) {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5
  });
}

var BufferMessage = function BufferMessage(_ref) {
  var swapTheme = _ref.swapTheme,
    isBufferAccepted = _ref.isBufferAccepted,
    setIsBufferAccepted = _ref.setIsBufferAccepted;
  var _a;
  var store = useStore();
  return jsxs("div", {
    className: "flex flex-col rounded-3xl bg-red-500/50 p-6 text-sm space-y-4 items-center justify-center",
    style: {
      //borderRadius: swapTheme.primaryBorderRadius
      backgroundColor: swapTheme.streamLengthBox,
      color: swapTheme.accentText
    },
    children: [
    /*
        automated stream cancellation not added yet - once we are sure that deposits won't be lost, display this for 'Total Amount'
         store.flowrateUnit.sublabel == 'once' ?
            <p className="text-xs leading-5">
                {`${toLocale(store.getExpectedDeposit())} ${store.outboundToken?.symbol} will be locked by Superfluid as a deposit, which you will get back at the end of your swap. If you unwrap your tokens early, you may lose this deposit.`}
            </p>
            :
    */
    jsx("p", {
      className: "text-xs leading-5",
      children: "If you do not cancel your swap before your balance reaches zero, you will lose your ".concat(store.getExpectedDeposit().toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5
      }), " ").concat((_a = store.outboundToken) === null || _a === void 0 ? void 0 : _a.symbol, " deposit.")
    }), jsxs("div", {
      className: "flex items-end justify-between w-full",
      children: [jsx("p", {
        className: "opacity-80",
        style: {
          color: swapTheme.primaryText,
          fontWeight: swapTheme.accentFontWeight
        },
        children: "Yes, I understand."
      }), jsx("button", {
        className: "w-[25px] h-[25px] border-[1px] focus:outline-none ease-in-out",
        style: {
          backgroundColor: isBufferAccepted ? "white" : "transparent",
          borderColor: "white",
          borderRadius: swapTheme.checkBorderRadius,
          transitionDuration: swapTheme.primaryDuration
        },
        onClick: function onClick() {
          setIsBufferAccepted(!isBufferAccepted);
        },
        children: isBufferAccepted && jsx(BsCheckLg, {
          style: {
            color: swapTheme.swapButton
          },
          className: "w-full h-full"
        })
      })]
    })]
  });
};
var Approve = function Approve(_ref2) {
  var _ref3;
  var theme = _ref2.theme;
  var _a, _b, _c;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isBufferAccepted = _useState2[0],
    setIsBufferAccepted = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2);
    _useState4[0];
    var setShowAnimation = _useState4[1];
  var provider = useEthersProvider();
  var signer = useEthersSigner();
  var store = useStore();
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  var options = [{
    title: "Spending",
    data: store.getSwapAmountAsLocaleString() + " " + ((_a = store.outboundToken) === null || _a === void 0 ? void 0 : _a.symbol) + (store.flowrateUnit.sublabel != 'once' ? " /" + store.flowrateUnit.sublabel : '')
  }, {
    title: "Receiving",
    data: (_b = store.inboundToken) === null || _b === void 0 ? void 0 : _b.symbol
  }, {
    title: "Flowrate",
    data: parseFloat(store.getEffectiveFlowRate()).toFixed(8) + " /s"
  }, {
    title: "Wrapping",
    data: toLocale(store.getAmountNeededToWrap()) + ' ' + ((_c = store.outboundToken) === null || _c === void 0 ? void 0 : _c.underlyingToken.symbol)
  }
  /*{ title: "Start Date", data: startDate },
  { title: "Start Time", data: startTime },
  { title: "End Date", data: endDate },
  { title: "End Time", data: endTime },
  { title: "Auto Wrap", data: autoWrap ? "On" : "Off" },*/];

  var filteredOptions = options.filter(function (option) {
    return !(option.title === "End Date" && option.data === "Not scheduled" || option.title === "End Time" && option.data === "");
  });
  var swap = function swap() {
    return (_ref3 = _ref3 || _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _a, _b, pool, token, superfluid, sender, swapFlowRate, currentFlowRate, amountNeededToWrap, superToken, upgradeOperation, flowOperation, superfluidCall, result, transactionReceipt;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            pool = getPoolAddress((_a = store.inboundToken) === null || _a === void 0 ? void 0 : _a.address, (_b = store.outboundToken) === null || _b === void 0 ? void 0 : _b.address);
            token = store.outboundToken.address;
            _context.prev = 2;
            _context.next = 5;
            return Framework.create({
              chainId: mumbaiChainId,
              provider: provider
            });
          case 5:
            superfluid = _context.sent;
            _context.next = 8;
            return signer.getAddress();
          case 8:
            sender = _context.sent;
            swapFlowRate = store.getEffectiveFlowRateEther(); //parseEther(`${parseFloat(store.getEffectiveFlowRate())}`).toString()
            _context.t0 = parseFloat;
            _context.next = 13;
            return superfluid.cfaV1.getFlow({
              superToken: token,
              sender: sender,
              receiver: pool,
              providerOrSigner: signer
            });
          case 13:
            _context.t1 = _context.sent.flowRate;
            currentFlowRate = (0, _context.t0)(_context.t1);
            amountNeededToWrap = parseEther("".concat(store.getAmountNeededToWrap())).toString();
            _context.next = 18;
            return superfluid.loadSuperToken(token);
          case 18:
            superToken = _context.sent;
            upgradeOperation = superToken.upgrade({
              amount: amountNeededToWrap
            });
            flowOperation = currentFlowRate > 0 ? superfluid.cfaV1.updateFlow({
              receiver: pool,
              flowRate: swapFlowRate,
              superToken: token,
              sender: sender
            }) : superfluid.cfaV1.createFlow({
              receiver: pool,
              flowRate: swapFlowRate,
              superToken: token,
              sender: sender
            }); // magical batch call
            superfluidCall = store.getAmountNeededToWrap() > 0 ? superfluid.batchCall([upgradeOperation, flowOperation]) : flowOperation;
            _context.next = 24;
            return superfluidCall.exec(signer);
          case 24:
            result = _context.sent;
            _context.next = 27;
            return result.wait();
          case 27:
            transactionReceipt = _context.sent;
            console.log(transactionReceipt.transactionHash);
            store.setLastSwapTx(transactionReceipt.transactionHash);
            store.setCollapseState(CollapseState.SWAP_SUCCESS);
            _context.next = 37;
            break;
          case 33:
            _context.prev = 33;
            _context.t2 = _context["catch"](2);
            store.setCollapseState(CollapseState.SWAP_FAILURE);
            console.log(_context.t2);
          case 37:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 33]]);
    }))).apply(this, arguments);
  };
  var handleApproveClick = function handleApproveClick() {
    if (isBufferAccepted) {
      store.setCollapseState(CollapseState.SWAP_SUBMITTING);
      setIsBufferAccepted(false);
      swap();
    } else {
      setShowAnimation(true);
      setTimeout(function () {
        setShowAnimation(false);
      }, 600);
    }
  };
  return jsxs("div", {
    className: "flex flex-col w-full items-start justify-start 2px-2 2md:px-6 2py-5 space-y-8 ",
    style: {
      transitionDuration: swapTheme.primaryDuration
    },
    children: [jsxs("div", {
      className: "px-2 md:px-6 pt-5 space-y-8 w-full",
      children: [jsxs("div", {
        className: "w-full flex flex-col 2flex-row 2items-center justify-between text-2xl",
        style: {
          color: swapTheme.TitleColor,
          fontWeight: swapTheme.accentFontWeight
        },
        children: [jsxs("button", {
          className: "flex items-center justify-center space-x-1 text-xs w-min pr-4 pl-3 py-2 rounded-full -ml-2 mb-2 hover:scale-105 duration-300 transition-all",
          onClick: function onClick() {
            store.setCollapseState(CollapseState.NONE);
            setIsBufferAccepted(false);
          },
          style: {
            backgroundColor: swapTheme.streamLengthBox,
            color: swapTheme.accentText
          },
          children: [jsx(FiChevronLeft, {}), jsx("p", {
            children: "back"
          })]
        }), jsx("h1", {
          children: "Confirm Swap"
        })]
      }), jsxs("div", {
        className: "space-y-4",
        children: [jsx("div", {
          className: "w-full flex flex-col space-y-3 px-8 py-6 rounded-3xl text-sm",
          style: {
            //borderRadius: swapTheme.primaryBorderRadius
            backgroundColor: swapTheme.streamLengthBox,
            color: swapTheme.accentText
          },
          children: filteredOptions.map(function (option, index) {
            return jsx(ApproveRow, {
              item: option,
              index: index,
              swapTheme: swapTheme
            }, index);
          })
        }), jsx(BufferMessage, {
          swapTheme: swapTheme,
          isBufferAccepted: isBufferAccepted,
          setIsBufferAccepted: setIsBufferAccepted
        })]
      })]
    }), jsx("button", {
      className: "".concat(isBufferAccepted ? '' : 'opacity-60', " w-full "),
      onClick: handleApproveClick,
      style: {
        backgroundColor: swapTheme.swapButton,
        color: swapTheme.swapButtonText,
        fontSize: swapTheme.swapButtonFontSize,
        padding: swapTheme.swapButtonPadding,
        fontWeight: swapTheme.secondaryFontWeight,
        borderRadius: swapTheme.itemBorderRadius,
        transitionDuration: swapTheme.primaryDuration
      },
      children: "Confirm Swap"
    })]
  });
};

var ReverseCollapsableWrapper = function ReverseCollapsableWrapper(_ref) {
  var style = _ref.style,
    children = _ref.children,
    collapseId = _ref.collapseId,
    expectedMaxHeight = _ref.expectedMaxHeight;
  var store = useStore();
  return jsx("div", {
    className: "".concat(store.collapseState == collapseId ? (expectedMaxHeight ? expectedMaxHeight : 'max-h-96') + ' opacity-100 duration-[600ms] ' + (style ? style : '') : 'max-h-0 invisible opacity-0 duration-500', " transition-all overflow-hidden -mx-2 px-2"),
    children: children
  });
};

// THIS FILE IS AUTO GENERATED
function AiOutlineInfoCircle (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 1024 1024"},"child":[{"tag":"path","attr":{"d":"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{"tag":"path","attr":{"d":"M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"}}]})(props);
}

var useErc20Contract = function useErc20Contract(tokenAddress) {
  var publicClient = usePublicClient({
    chainId: 80001
  });
  var _useWalletClient = useWalletClient({
      chainId: 80001
    }),
    walletClientData = _useWalletClient.data;
  var walletClient = walletClientData;
  if (!tokenAddress) {
    return;
  }
  var tokenABI = [{
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "int256",
      "name": "balance",
      "type": "int256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_spender",
      "type": "address"
    }, {
      "name": "_value",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }];
  var contract = getContract({
    address: tokenAddress,
    abi: tokenABI,
    publicClient: publicClient,
    walletClient: walletClient
  });
  return contract;
};

var WrapTokensMessage = function WrapTokensMessage(_ref) {
  var swapTheme = _ref.swapTheme;
  var _a, _b, _c;
  var store = useStore();
  return jsxs("div", {
    className: "flex rounded-2xl bg-red-500/50 p-4 text-sm space-x-4 items-center justify-center",
    style: {
      //borderRadius: swapTheme.primaryBorderRadius
      backgroundColor: swapTheme.streamLengthBox,
      color: swapTheme.accentText
    },
    children: [jsx("div", {
      className: "text-white/30",
      children: jsx(AiOutlineInfoCircle, {
        size: 20
      })
    }), jsx("p", {
      className: "",
      children: "You need to wrap at least ".concat(store.getAmountNeededToWrap().toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 5
      }), " ").concat((_b = (_a = store.outboundToken) === null || _a === void 0 ? void 0 : _a.underlyingToken) === null || _b === void 0 ? void 0 : _b.symbol, " into ").concat((_c = store.outboundToken) === null || _c === void 0 ? void 0 : _c.symbol, " to cover ").concat(store.flowrateUnit.sublabel == 'once' ? 'your swap.' : '10 hours of streaming.', " To avoid this step in the future, approve the max amount.")
    })]
  });
};
var WrapTokens = function WrapTokens(_ref2) {
  var _ref3;
  var theme = _ref2.theme;
  var _a, _b, _c;
  var store = useStore();
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  var underlyingTokenContract = useErc20Contract((_b = (_a = store.outboundToken) === null || _a === void 0 ? void 0 : _a.underlyingToken) === null || _b === void 0 ? void 0 : _b.address);
  //const tokenContract = useSuperToken(store.outboundToken?.address);
  var handleApproveClick = function handleApproveClick() {
    return (_ref3 = _ref3 || _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var upgradeTokenAddress, minAmountToWrap, formattedMinAmountToWrap, approvedTransactionHash;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(underlyingTokenContract && store.outboundToken)) {
              _context.next = 17;
              break;
            }
            _context.prev = 1;
            // approve tokens
            upgradeTokenAddress = store.outboundToken.address;
            minAmountToWrap = store.getAmountNeededToWrap();
            formattedMinAmountToWrap = "".concat(minAmountToWrap);
            _context.next = 7;
            return underlyingTokenContract.write.approve([upgradeTokenAddress, parseEther(formattedMinAmountToWrap)]);
          case 7:
            approvedTransactionHash = _context.sent;
            _context.next = 10;
            return waitForTransaction({
              hash: approvedTransactionHash
            });
          case 10:
            // if successful, update allowance and move to next step
            store.setUnderlyingOutboundTokenAllowance(minAmountToWrap);
            store.setCollapseState(CollapseState.SWAP_APPROVE);
            _context.next = 17;
            break;
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 14]]);
    }))).apply(this, arguments);
  };
  return jsxs("div", {
    className: "flex flex-col w-full items-start justify-start 2px-2 2md:px-6 2py-5 space-y-10 ",
    style: {
      transitionDuration: swapTheme.primaryDuration
    },
    children: [jsxs("div", {
      className: "px-2 md:px-6 pt-5 space-y-3 w-full",
      children: [jsxs("div", {
        className: "w-full flex flex-col 2flex-row 2items-center justify-between text-2xl pb-6",
        style: {
          color: swapTheme.TitleColor,
          fontWeight: swapTheme.accentFontWeight
        },
        children: [jsxs("button", {
          className: "flex items-center justify-center space-x-1 text-xs w-min pr-4 pl-3 py-2 rounded-full -ml-2 mb-2 hover:scale-105 duration-300 transition-all",
          onClick: function onClick() {
            return store.setCollapseState(CollapseState.NONE);
          },
          style: {
            backgroundColor: swapTheme.streamLengthBox,
            color: swapTheme.accentText
          },
          children: [jsx(FiChevronLeft, {}), jsx("p", {
            children: "back"
          })]
        }), jsx("h1", {
          children: "Approve Wrapper"
        })]
      }), jsxs("a", {
        href: "https://docs.superfluid.finance/superfluid/developers/super-tokens",
        className: "group pl-5 pr-4 py-4 flex grow items-center justify-center space-x-2 rounded-xl text-white text-sm opacity-75 hover:opacity-100 bg-white/10 transition-all duration-300 hover:scale-[1.02]",
        target: "_blank",
        rel: "noopener noreferrer",
        children: [jsx("p", {
          className: "flex grow",
          children: "What is a super token?"
        }), jsx(FiExternalLink, {}), jsx("img", {
          src: '/superfluid-logo.png',
          width: "20",
          height: "20",
          alt: "superfluid logo",
          className: "2opacity-75 2group-hover:opacity-100 2transition-all 2duration-300"
        })]
      }), jsx(WrapTokensMessage, {
        swapTheme: swapTheme
      })]
    }), jsxs("button", {
      className: "w-full ",
      onClick: handleApproveClick,
      style: {
        backgroundColor: swapTheme.swapButton,
        color: swapTheme.swapButtonText,
        fontSize: swapTheme.swapButtonFontSize,
        padding: swapTheme.swapButtonPadding,
        fontWeight: swapTheme.secondaryFontWeight,
        borderRadius: swapTheme.itemBorderRadius,
        transitionDuration: swapTheme.primaryDuration
      },
      children: ["Approve ", (_c = store.outboundToken) === null || _c === void 0 ? void 0 : _c.symbol]
    })]
  });
};

var TransactionSuccess = function TransactionSuccess(_ref) {
  var _ref2, _ref3;
  var swapTheme = _ref.swapTheme;
  var _a, _b;
  var store = useStore();
  var _useAccount = useAccount(),
    address = _useAccount.address;
  var tx = store.lastSwapTx;
  var importOutbound = function importOutbound() {
    return (_ref2 = _ref2 || _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _a, _b, _c, ethereum;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            ethereum = window.ethereum;
            try {
              ethereum.request({
                method: "wallet_watchAsset",
                params: {
                  type: "ERC20",
                  options: {
                    address: (_a = store.outboundToken) === null || _a === void 0 ? void 0 : _a.address,
                    symbol: (_b = store.outboundToken) === null || _b === void 0 ? void 0 : _b.symbol,
                    decimals: (_c = store.outboundToken) === null || _c === void 0 ? void 0 : _c.decimals,
                    image: "https://foo.io/token-image.svg"
                  }
                }
              });
            } catch (err) {
              console.log(err);
            }
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))).apply(this, arguments);
  };
  var importInbound = function importInbound() {
    return (_ref3 = _ref3 || _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _a, _b, _c, ethereum;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            ethereum = window.ethereum;
            try {
              ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20',
                  options: {
                    address: (_a = store.inboundToken) === null || _a === void 0 ? void 0 : _a.address,
                    symbol: (_b = store.inboundToken) === null || _b === void 0 ? void 0 : _b.symbol,
                    decimals: (_c = store.inboundToken) === null || _c === void 0 ? void 0 : _c.decimals,
                    image: 'https://foo.io/token-image.svg'
                  }
                }
              });
            } catch (err) {
              console.log(err);
            }
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))).apply(this, arguments);
  };
  var etherScanBaseUrl = 'https://mumbai.polygonscan.com/tx';
  var userTX = "".concat(etherScanBaseUrl, "/").concat(tx);
  var aqueductUrl = "https://demo.aqueduct.fi/pair/mumbai/".concat(address, "/").concat((_a = store.outboundToken) === null || _a === void 0 ? void 0 : _a.address, "/").concat((_b = store.inboundToken) === null || _b === void 0 ? void 0 : _b.address);
  return jsxs("div", {
    className: "w-full h-full flex flex-col items-center justify-center",
    style: {
      fontFamily: swapTheme.textFont
    },
    children: [jsx("div", {
      className: 'px-2 pt-4 w-full',
      children: jsxs("button", {
        className: "flex items-center justify-center space-x-1 text-xs w-min pr-4 pl-3 py-2 rounded-full mb-2 hover:scale-105 duration-300 transition-all",
        onClick: function onClick() {
          return store.setCollapseState(CollapseState.NONE);
        },
        style: {
          backgroundColor: swapTheme.streamLengthBox,
          color: swapTheme.accentText
        },
        children: [jsx(FiChevronLeft, {}), jsx("p", {
          children: "back"
        })]
      })
    }), jsx("div", {
      className: "flex items-center justify-center h-44 w-full mt-6",
      children: jsx(HiCheckCircle, {
        className: "w-5/6 h-5/6",
        style: {
          color: swapTheme.successColor
        }
      })
    }), jsx("div", {
      className: "w-full flex items-center justify-center",
      style: {
        color: swapTheme.primaryText,
        fontWeight: swapTheme.primaryFontWeight
      },
      children: jsx("h1", {
        className: "text-2xl",
        children: "Transaction Submitted"
      })
    }), jsx("div", {
      className: "flex items-center justify-center w-full pt-2",
      children: jsx("a", {
        href: userTX,
        target: "_blank",
        rel: "noopener noreferrer",
        children: jsx("p", {
          className: "hover:underline",
          style: {
            color: swapTheme.embeddedLink
          },
          children: "View on block explorer"
        })
      })
    }), jsxs("div", {
      className: 'px-8 pt-6 pb-10 w-full space-x-2 flex',
      children: [store.outboundToken && jsxs("button", {
        className: 'flex space-x-3 items-center justify-center p-4 w-1/2 text-xs hover:scale-[1.02] duration-300 transition-all',
        style: {
          backgroundColor: swapTheme.streamLengthBox,
          color: swapTheme.accentText,
          borderRadius: swapTheme.secondaryBorderRadius
        },
        onClick: importOutbound,
        children: [jsx("img", {
          src: store.outboundToken.logoURI,
          width: "20",
          height: "20",
          alt: "token",
          className: 'opacity-80'
        }), jsxs("p", {
          children: ["Import ", store.outboundToken.symbol]
        })]
      }), store.inboundToken && jsxs("button", {
        className: 'flex space-x-3 items-center justify-center p-4 w-1/2 text-xs hover:scale-[1.02] duration-300 transition-all',
        style: {
          backgroundColor: swapTheme.streamLengthBox,
          color: swapTheme.accentText,
          borderRadius: swapTheme.secondaryBorderRadius
        },
        onClick: importInbound,
        children: [jsx("img", {
          src: store.inboundToken.logoURI,
          width: "20",
          height: "20",
          alt: "token",
          className: 'opacity-80'
        }), jsxs("p", {
          children: ["Import ", store.inboundToken.symbol]
        })]
      })]
    }), jsx("a", {
      href: aqueductUrl,
      className: "w-full ease-in-out text-center",
      style: {
        backgroundColor: swapTheme.swapButton,
        color: swapTheme.swapButtonText,
        fontSize: swapTheme.swapButtonFontSize,
        padding: swapTheme.swapButtonPadding,
        fontWeight: swapTheme.primaryFontWeight,
        transitionDuration: swapTheme.primaryDuration,
        borderRadius: swapTheme.itemBorderRadius
      },
      children: "View Position"
    })]
  });
};

// THIS FILE IS AUTO GENERATED
function BiMessageAltError (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"d":"M5 2c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.586L12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5zm14 14h-4.414L12 18.586 9.414 16H5V4h14v12z"}},{"tag":"path","attr":{"d":"M11 6h2v6h-2zm0 7h2v2h-2z"}}]})(props);
}

var TransactionFailed = function TransactionFailed(_ref) {
  var swapTheme = _ref.swapTheme;
  var store = useStore();
  return jsxs("div", {
    className: "w-full h-full flex flex-col items-center justify-end",
    style: {
      fontFamily: swapTheme.textFont
    },
    children: [jsx("div", {
      className: "flex items-center justify-center h-48 w-full",
      children: jsx(BiMessageAltError, {
        className: "w-2/3 h-2/3",
        style: {
          color: swapTheme.errorColor
        }
      })
    }), jsx("div", {
      className: "w-full flex items-center justify-center",
      style: {
        color: swapTheme.primaryText,
        fontWeight: swapTheme.primaryFontWeight
      },
      children: jsx("h1", {
        className: "text-2xl",
        children: "Something went wrong."
      })
    }), jsx("div", {
      className: "flex items-center text-center justify-center w-full py-4",
      children: jsxs("p", {
        style: {
          color: swapTheme.secondaryText
        },
        children: ["Ensure you have enough super tokens to fulfill the buffer period. Learn more about buffers and super tokens", " ", jsx("a", {
          href: "https://docs.aqueduct.fi/docs/superfluid-concepts/super-tokens",
          target: "_blank",
          rel: "noopener noreferrer",
          children: jsx("span", {
            className: "hover:underline",
            style: {
              color: swapTheme.embeddedLink
            },
            children: "here."
          })
        })]
      })
    }), jsx("div", {
      className: 'flex grow'
    }), jsx("button", {
      className: "w-full rounded-full ease-in-out",
      onClick: function onClick() {
        /*setSwapActive(false)
        setIsBufferAccepted(false)
        setIsApproved(false)
        setIsSwapFinished(false)*/
        store.setCollapseState(CollapseState.NONE);
      },
      style: {
        backgroundColor: swapTheme.errorColor,
        color: swapTheme.swapButtonText,
        fontSize: swapTheme.swapButtonFontSize,
        padding: swapTheme.swapButtonPadding,
        fontWeight: swapTheme.primaryFontWeight,
        borderRadius: swapTheme.itemBorderRadius,
        transitionDuration: swapTheme.primaryDuration
      },
      children: "Dismiss"
    })]
  });
};

var SubmittingSwap = function SubmittingSwap(_ref) {
  var theme = _ref.theme;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  return jsxs("div", {
    className: "flex flex-col items-center justify-center w-full h-full duration-300 px-4 pt-32 pb-40",
    children: [jsx("div", {
      className: "w-full flex items-center justify-center h-40",
      children: jsx("div", {
        className: "h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent",
        style: {
          borderLeftColor: swapTheme.swapButton,
          borderTopColor: swapTheme.swapButton,
          borderBottomColor: swapTheme.swapButton
        },
        role: "status"
      })
    }), jsx("div", {
      className: "w-full text-white text-2xl flex justify-center items-center font-semibold",
      children: jsx("h1", {
        children: "Submitting transaction"
      })
    })]
  });
};

var DateTimeSelectButton = function DateTimeSelectButton(_ref) {
  var theme = _ref.theme;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  var _useContextDays = useContextDays(),
    formattedDates = _useContextDays.formattedDates;
  return jsxs("div", {
    className: "w-full flex items-center space-x-2 px-5 py-3",
    style: {
      backgroundColor: swapTheme.tokenBox,
      borderRadius: swapTheme.secondaryBorderRadius
    },
    children: [jsx("p", {
      style: {
        color: swapTheme.accentText,
        fontWeight: swapTheme.accentFontWeight,
        fontFamily: swapTheme.textFont
      },
      className: "flex grow text-sm opacity-75",
      children: "End date/time:"
    }), jsx("p", {
      style: {
        color: swapTheme.accentText,
        fontWeight: swapTheme.accentFontWeight,
        fontFamily: swapTheme.textFont
      },
      className: "text-sm",
      children: formattedDates && formattedDates[0] && formattedDates[0].toString()
    })]
  });
};

// THIS FILE IS AUTO GENERATED
function IoChevronBack (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"fill":"none","strokeLinecap":"round","strokeLinejoin":"round","strokeWidth":"48","d":"M328 112L184 256l144 144"}}]})(props);
}function IoChevronForward (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"fill":"none","strokeLinecap":"round","strokeLinejoin":"round","strokeWidth":"48","d":"M184 112l144 144-144 144"}}]})(props);
}

var getDayClassName = function getDayClassName(className, _ref) {
  var selected = _ref.selected,
    disabled = _ref.disabled,
    inCurrentMonth = _ref.inCurrentMonth,
    now = _ref.now;
  if (now) className += ' outline outline-white/50 outline-[1px]';
  if (disabled) return className + ' opacity-10 cursor-not-allowed';
  if (selected) return className + ' bg-aqueductBlue/75 ring ring-inset ring-aqueductBlue text-white opacity-100';
  if (!inCurrentMonth) return className + ' opacity-30';
  return className;
};
var getTimesClassName = function getTimesClassName(className, _ref2) {
  var selected = _ref2.selected,
    disabled = _ref2.disabled;
  if (disabled) return className + ' opacity-25 cursor-not-allowed';
  if (selected) return className + ' text-white opacity-100';
  return className + ' opacity-20';
};
var DatePicker = function DatePicker(_ref3) {
  var prevButton = _ref3.prevButton,
    nextButton = _ref3.nextButton,
    calendar = _ref3.calendar,
    theme = _ref3.theme;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  var _useContextDays = useContextDays(),
    selectedDates = _useContextDays.selectedDates;
  var _useContextCalendars = useContextCalendars(),
    weekDays = _useContextCalendars.weekDays;
  var _useContextDaysPropGe = useContextDaysPropGetters(),
    dayButton = _useContextDaysPropGe.dayButton;
  var days = calendar.days,
    month = calendar.month,
    year = calendar.year;
  var _useContextTime = useContextTime(),
    time = _useContextTime.time;
  var _useContextTimePropGe = useContextTimePropGetters(),
    timeButton = _useContextTimePropGe.timeButton;
  return jsxs("div", {
    className: 'space-y-2',
    children: [jsxs("div", {
      className: 'bg-white/5 pt-8 p-4 text-white',
      style: {
        borderRadius: swapTheme.secondaryBorderRadius
      },
      children: [jsxs("div", {
        className: 'flex grow items-center justify-center pb-8',
        children: [prevButton, jsx("p", {
          className: "text-center text-sm w-48 font-medium",
          children: month + ' ' + year
        }), nextButton]
      }), jsx("div", {
        className: "grid grid-cols-7 gap-y-2 mb-2 items-center h-8",
        children: weekDays.map(function (d) {
          return jsx("p", {
            className: "text-xs text-center",
            children: d
          }, d);
        })
      }), jsx("main", {
        className: "grid grid-cols-7 gap-x-1 gap-y-1",
        children: days.map(function (d) {
          return jsx("button", _objectSpread2(_objectSpread2({
            className: getDayClassName("py-2 px-2 text-sm", d),
            style: {
              borderRadius: swapTheme.accentBorderRadius
            }
          }, dayButton(d)), {}, {
            children: d.day
          }), d.$date.toString());
        })
      })]
    }), jsx("div", {
      className: 'relative bg-white/5 2pt-8 px-6 py-3 text-white',
      style: {
        borderTopLeftRadius: swapTheme.secondaryBorderRadius,
        borderTopRightRadius: swapTheme.secondaryBorderRadius,
        borderBottomLeftRadius: swapTheme.timeSelectBottomBorderRadius,
        borderBottomRightRadius: swapTheme.timeSelectBottomBorderRadius
      },
      children: jsxs("div", {
        className: 'flex space-x-4 fade-edges',
        children: [jsx("div", {
          className: 'flex flex-col w-full items-end overflow-y-scroll h-36 snap-y hide-scrollbar py-16 pr-3',
          children: time.filter(function (t) {
            return selectedDates[0] && t.$date.getMinutes() === selectedDates[0].getMinutes();
          }).map(function (t) {
            return /*#__PURE__*/createElement("button", _objectSpread2(_objectSpread2({
              className: getTimesClassName("snap-center text-3xl font-medium monospace-font", t)
            }, timeButton(t)), {}, {
              key: t.$date.toString()
            }), t.$date.getHours());
          })
        }), jsx("p", {
          className: 'flex grow items-center justify-center text-3xl font-medium opacity-50',
          children: ":"
        }), jsx("div", {
          className: 'flex flex-col w-full items-start overflow-y-scroll h-36 snap-y hide-scrollbar py-16 pl-3',
          children: time.filter(function (t) {
            return selectedDates[0] && t.$date.getHours() === selectedDates[0].getHours();
          }).map(function (t) {
            return /*#__PURE__*/createElement("button", _objectSpread2(_objectSpread2({
              className: getTimesClassName("snap-center text-3xl font-medium monospace-font", t)
            }, timeButton(t)), {}, {
              key: t.$date.toString()
            }), t.$date.getMinutes() < 10 ? '0' + t.$date.getMinutes() : t.$date.getMinutes());
          })
        })]
      })
    })]
  });
};
var DateTimeSelect = function DateTimeSelect(_ref4) {
  var theme = _ref4.theme;
  var _useContextCalendars2 = useContextCalendars(),
    calendars = _useContextCalendars2.calendars;
  var _useContextDatePicker = useContextDatePickerOffsetPropGetters(),
    subtractOffset = _useContextDatePicker.subtractOffset,
    addOffset = _useContextDatePicker.addOffset;
  return jsx("div", {
    className: "pt-4",
    children: jsx(DatePicker, {
      prevButton: jsx("button", _objectSpread2(_objectSpread2({}, subtractOffset({
        months: 1
      })), {}, {
        children: jsx(IoChevronBack, {})
      })),
      nextButton: jsx("button", _objectSpread2(_objectSpread2({}, addOffset({
        months: 1
      })), {}, {
        children: jsx(IoChevronForward, {})
      })),
      calendar: calendars[0],
      theme: theme
    })
  });
};

var SwapWidget = function SwapWidget(_ref) {
  var theme = _ref.theme,
    tokenOption = _ref.tokenOption,
    _ref$defaultTokens = _ref.defaultTokens,
    defaultTokens = _ref$defaultTokens === void 0 ? true : _ref$defaultTokens,
    _ref$width = _ref.width,
    width = _ref$width === void 0 ? "27rem" : _ref$width;
  var _a;
  var swapTheme = _objectSpread2(_objectSpread2({}, defaultTheme), theme);
  var tokenList = defaultTokens ? tokenOption ? [].concat(_toConsumableArray(TestTokens), _toConsumableArray(tokenOption)) : _toConsumableArray(TestTokens) : tokenOption ? _toConsumableArray(tokenOption) : [];
  var store = useStore();
  var _useAccount = useAccount(),
    address = _useAccount.address,
    isConnected = _useAccount.isConnected;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  useEffect(function () {
    if (address) {
      setIsLoading(false);
    }
  }, [address]);
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedDates = _useState4[0],
    setSelectedDates = _useState4[1];
  var onDatesChange = function onDatesChange(d) {
    setSelectedDates(d);
    if (d && d.length > 0) {
      var now = new Date();
      var diff = (d[0].getTime() - now.getTime()) / 1000; // in milliseconds, convert to seconds
      store.setPayOnceLength(diff);
    }
  };
  return jsx(DatePickerStateProvider, {
    config: {
      selectedDates: selectedDates,
      onDatesChange: onDatesChange,
      time: {
        interval: 1
      },
      dates: {
        mode: 'single',
        minDate: new Date()
      },
      locale: {
        options: {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        }
      }
    },
    children: jsxs("div", {
      className: "relative flex flex-col p-3 md:p-5 z-10 overflow-hidden bg-transparent md:bg-current border-none md:border-solid w=[".concat(width, "]"),
      style: {
        fontFamily: swapTheme.textFont,
        color: swapTheme.bgColor,
        borderColor: swapTheme.borderColor,
        borderWidth: swapTheme.primaryBorderWidth,
        borderRadius: swapTheme.primaryBorderRadius
      },
      children: [jsxs(CollapsableWrapper, {
        children: [jsx(WidgetTitle, {
          swapTheme: swapTheme
        }), jsx("div", {
          className: "h-[104px] flex items-center justify-center monospace-font font-bold mt-8",
          children: jsx(DynamicInputBox, {
            swapTheme: swapTheme,
            paddingPercentage: 0.15,
            setDynamicInput: store.setSwapAmount,
            dynamicInput: store.swapAmount
          })
        })]
      }), jsx(CollapsableModalWrapper, {
        collapseId: CollapseState.TIMEFRAME_SELECT,
        defaultStyle: "pt-6",
        openedStyle: "space-y-2 pt-2",
        buttonContent: jsx(FlowRateSelect, {
          dropdownValue: store.flowrateUnit,
          theme: swapTheme
        }),
        modal: jsx(FlowRateRow, {
          theme: swapTheme,
          setDropdownValue: store.setFlowrateUnit,
          options: flowrates
        }),
        customModalHeight: 'max-h-[30rem]'
      }), ((_a = store.flowrateUnit) === null || _a === void 0 ? void 0 : _a.label) === "Total Amount" && jsx(CollapsableModalWrapper, {
        collapseId: CollapseState.DATE_TIME_SELECT,
        defaultStyle: "pt-2",
        openedStyle: "space-y-2 pt-2",
        buttonContent: jsx(DateTimeSelectButton, {
          theme: swapTheme
        }),
        modal: jsx(DateTimeSelect, {
          theme: swapTheme
        }),
        customModalHeight: 'max-h-[36rem]'
      }), jsx(CollapsableModalWrapper, {
        collapseId: CollapseState.OUTBOUND_TOKEN_SELECT,
        defaultStyle: "pt-2",
        openedStyle: "space-y-4 pt-2",
        buttonContent: jsx(OutboundBox, {
          swapTheme: swapTheme
        }),
        modal: jsx("div", {
          className: "h-96 overflow-y-auto",
          children: jsx(TokenDisplay, {
            tokenOption: tokenList,
            theme: swapTheme,
            setOutboundToken: store.setOutboundToken,
            setInboundToken: store.setInboundToken,
            outbound: true
          })
        })
      }), jsx(CollapsableWrapper, {
        defaultStyle: "relative z-50 -my-3",
        children: jsx(ActivateSwapArrow, {
          swapTheme: swapTheme,
          overBalance: store.isBalanceUnderSwapAmount()
        })
      }), jsx(CollapsableModalWrapper, {
        collapseId: CollapseState.INBOUND_TOKEN_SELECT,
        defaultStyle: "",
        openedStyle: "space-y-4 pt-2",
        buttonContent: jsx(InboundBox, {
          swapTheme: swapTheme
        }),
        modal: jsx("div", {
          className: "h-96 overflow-y-auto",
          children: jsx(TokenDisplay, {
            tokenOption: tokenList,
            theme: swapTheme,
            setOutboundToken: store.setOutboundToken,
            setInboundToken: store.setInboundToken,
            outbound: false
          })
        })
      }), jsx(CollapsableWrapper, {
        children: !isLoading && isConnected ? jsx(SwapButton, {
          swapTheme: swapTheme
        }) : jsx(ConnectWalletButton, {
          theme: theme
        })
      }), jsx(ReverseCollapsableWrapper, {
        collapseId: CollapseState.WRAP_TOKENS,
        expectedMaxHeight: 'max-h-[30rem]',
        children: jsx(WrapTokens, {
          theme: swapTheme
        })
      }), jsx(ReverseCollapsableWrapper, {
        collapseId: CollapseState.SWAP_APPROVE,
        expectedMaxHeight: 'max-h-[36rem]',
        children: jsx(Approve, {
          theme: swapTheme
        })
      }), jsx(ReverseCollapsableWrapper, {
        collapseId: CollapseState.SWAP_SUBMITTING,
        expectedMaxHeight: 'max-h-[30rem]',
        children: jsx(SubmittingSwap, {
          theme: swapTheme
        })
      }), jsx(ReverseCollapsableWrapper, {
        collapseId: CollapseState.SWAP_SUCCESS,
        expectedMaxHeight: 'max-h-[35rem]',
        children: jsx(TransactionSuccess, {
          swapTheme: swapTheme
        })
      }), jsx(ReverseCollapsableWrapper, {
        collapseId: CollapseState.SWAP_FAILURE,
        expectedMaxHeight: 'max-h-[35rem]',
        children: jsx(TransactionFailed, {
          swapTheme: swapTheme
        })
      })]
    })
  });
};

var useSuperToken = function useSuperToken(tokenAddress) {
  var publicClient = usePublicClient({
    chainId: 80001
  });
  if (!tokenAddress) {
    return;
  }
  var superTokenABI = [{
    "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "timestamp",
      "type": "uint256"
    }],
    "name": "realtimeBalanceOf",
    "outputs": [{
      "internalType": "int256",
      "name": "availableBalance",
      "type": "int256"
    }, {
      "internalType": "uint256",
      "name": "deposit",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "owedDeposit",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }];
  var contract = getContract({
    address: tokenAddress,
    abi: superTokenABI,
    publicClient: publicClient
  });
  return contract;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
var decodeRealTimeBalanceRes = function decodeRealTimeBalanceRes(returnArray) {
  var array = returnArray;
  if (!array || array.length < 3) {
    return {
      availableBalance: 0,
      deposit: 0,
      owedDeposit: 0
    };
  }
  return {
    availableBalance: parseFloat(ethers.utils.formatEther(array[0])),
    deposit: parseFloat(ethers.utils.formatEther(array[1])),
    owedDeposit: parseFloat(ethers.utils.formatEther(array[2]))
  };
};

// add exports here
// import Theme should be import { Theme } from '@aqueductFinance/widget/theme
// so should be exported from index
var lightTheme = {
  TitleColor: "#000000",
  bgColor: "#FFFFFF",
  primaryBorderWidth: "2px",
  secondaryBorderWidth: "2px",
  primaryBorderRadius: "3rem",
  secondaryBorderRadius: "0.9rem",
  accentBorderRadius: "12px",
  borderColor: "#262626",
  plusBg: "rgb(255 255 255 / 0.1)",
  plusBorder: "rgb(255 255 255 / 0.25)",
  plusColor: "rgb(255 255 255 / 0.5)",
  useMaxButton: "#2A2A2A",
  useMaxText: "#ffffff",
  itemBorderRadius: "9999px",
  inputDot: "#FFFFFF",
  accentText: "rgb(255 255 255 / 0.5)",
  icons: "rgb(255 255 255 / 0.75)",
  streamLengthText: "rgb(255 255 255 / 0.75)",
  streamLengthBox: "#121212",
  tokenBox: "#121212",
  dataDisplayBg: "#0D0D0D",
  primaryText: "#FFFFFF",
  secondaryText: "#FFFFFF",
  primaryFontWeight: "500",
  secondaryFontWeight: "500",
  swapButton: "#0460CE",
  swapButtonText: "#FFFFFF",
  swapButtonFontSize: "22px",
  swapButtonPadding: "0.75rem",
  secondaryMain: "rgba(225, 123, 247, 0.6)",
  approveBox: "#121212",
  loaderInner: "rgb(255 255 255 / 0.5)",
  loaderOuter: "#E17BF7"
};
var darkTheme = {
  TitleColor: "#ffffff",
  bgColor: "#000000",
  primaryBorderWidth: "2px",
  secondaryBorderWidth: "2px",
  primaryBorderRadius: "3rem",
  secondaryBorderRadius: "0.9rem",
  accentBorderRadius: "8px",
  checkBorderRadius: "6px",
  borderColor: "#262626",
  plusBg: "rgb(255 255 255 / 0.1)",
  plusBorder: "rgb(255 255 255 / 0.25)",
  plusColor: "rgb(255 255 255 / 0.5)",
  useMaxButton: "#2A2A2A",
  useMaxText: "#ffffff",
  itemBorderRadius: "9999px",
  inputDot: "#FFFFFF",
  accentText: "rgb(255 255 255 / 0.5)",
  icons: "rgb(255 255 255 / 0.75)",
  streamLengthText: "rgb(255 255 255 / 0.75)",
  streamLengthBox: "#121212",
  tokenBox: "#121212",
  dataDisplayBg: "#00000090",
  primaryText: "#FFFFFF",
  secondaryText: "#FFFFFF",
  primaryFontWeight: "700",
  titleFontWeight: "500",
  secondaryFontWeight: "500",
  accentFontWeight: "500",
  swapButton: "#0460CE",
  swapButtonText: "#FFFFFF",
  swapButtonFontSize: "22px",
  swapButtonPadding: "0.75rem",
  secondaryMain: "rgba(225, 123, 247, 0.6)",
  approveBox: "#121212",
  loaderInner: "rgb(255 255 255 / 0.5)",
  loaderOuter: "#E17BF7",
  textFont: "'Poppins', sans-serif",
  numberFont: "'Red Hat Mono', monospace",
  primaryDuration: "300ms",
  secondaryDuration: "100ms",
  accentDuration: "200ms",
  errorColor: "#EF4444",
  successColor: "#49DE80",
  embeddedLink: "#3B82F6"
};

var TWAMMWidget = function TWAMMWidget(_ref) {
  var _ref$theme = _ref.theme,
    theme = _ref$theme === void 0 ? darkTheme : _ref$theme,
    tokenOption = _ref.tokenOption,
    defaultTokens = _ref.defaultTokens,
    width = _ref.width,
    outboundToken = _ref.outboundToken,
    inboundToken = _ref.inboundToken;
  var _a, _b;
  // init store
  var store = useStore();
  // if specific tokens are specified, select those
  var outboundTokenWithAddress = TestTokens.find(function (token) {
    return token.address === outboundToken;
  }) || tokenOption && tokenOption.find(function (token) {
    return token.address === outboundToken;
  });
  var inboundTokenWithAddress = TestTokens.find(function (token) {
    return token.address === inboundToken;
  }) || tokenOption && tokenOption.find(function (token) {
    return token.address === inboundToken;
  });
  useEffect(function () {
    if (outboundTokenWithAddress) {
      store.setOutboundToken(outboundTokenWithAddress);
    }
    if (inboundTokenWithAddress) {
      store.setInboundToken(inboundTokenWithAddress);
    }
  }, [outboundTokenWithAddress, inboundTokenWithAddress]);
  // get account
  var _useAccount = useAccount(),
    address = _useAccount.address;
  // realtime balance
  var tokenContractInbound = useSuperToken((_a = store.inboundToken) === null || _a === void 0 ? void 0 : _a.address);
  var tokenContractOutbound = useSuperToken((_b = store.outboundToken) === null || _b === void 0 ? void 0 : _b.address);
  var inboundFlowRate = useRef(0);
  var outboundFlowRate = useRef(0);
  /*const underlyingTokenContractInbound = useBalance({ address: address, token: token?.underlyingToken?.address, })//useToken(store.inboundToken?.underlyingToken?.address);
  const underlyingTokenContractOutbound = useToken(store.outboundToken?.underlyingToken?.address);*/
  //const underlyingInBalance = useBalance({ address: address, token: store.inboundToken?.underlyingToken?.address, });
  //const underlyingOutBalance = useBalance({ address: address, token: store.outboundToken?.underlyingToken?.address, });
  var ANIMATION_MINIMUM_STEP_TIME = 100;
  var REFRESH_INTERVAL = 300; // 300 * 100 = 30000 ms = 30 s
  var updateTokenPairRealTimeBalanceCallback = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var currentTimestampBigNumber, currentTimestamp, futureTimestamp, _yield$Promise$all, _yield$Promise$all2, presentBalIn, futureBalIn, presentBalOut, futureBalOut, decodedPresentBalIn, decodedFutureBalIn, decodedPresentBalOut, decodedFutureBalOut, initialBalanceIn, futureBalanceIn, initialBalanceOut, futureBalanceOut;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(address && ((tokenContractInbound === null || tokenContractInbound === void 0 ? void 0 : tokenContractInbound.read) || (tokenContractOutbound === null || tokenContractOutbound === void 0 ? void 0 : tokenContractOutbound.read)))) {
            _context.next = 24;
            break;
          }
          currentTimestampBigNumber = ethers.BigNumber.from(new Date().valueOf() // Milliseconds elapsed since UTC epoch, disregards timezone.
          );
          currentTimestamp = currentTimestampBigNumber.div(1000).toString();
          futureTimestamp = currentTimestampBigNumber.div(1000).add(REFRESH_INTERVAL * ANIMATION_MINIMUM_STEP_TIME / 1000).toString(); // batch call: get present and future balance for both tokens
          _context.next = 6;
          return Promise.all([tokenContractInbound === null || tokenContractInbound === void 0 ? void 0 : tokenContractInbound.read.realtimeBalanceOf([address, currentTimestamp]), tokenContractInbound === null || tokenContractInbound === void 0 ? void 0 : tokenContractInbound.read.realtimeBalanceOf([address, futureTimestamp]), tokenContractOutbound === null || tokenContractOutbound === void 0 ? void 0 : tokenContractOutbound.read.realtimeBalanceOf([address, currentTimestamp]), tokenContractOutbound === null || tokenContractOutbound === void 0 ? void 0 : tokenContractOutbound.read.realtimeBalanceOf([address, futureTimestamp])]);
        case 6:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 4);
          presentBalIn = _yield$Promise$all2[0];
          futureBalIn = _yield$Promise$all2[1];
          presentBalOut = _yield$Promise$all2[2];
          futureBalOut = _yield$Promise$all2[3];
          decodedPresentBalIn = decodeRealTimeBalanceRes(presentBalIn);
          decodedFutureBalIn = decodeRealTimeBalanceRes(futureBalIn);
          decodedPresentBalOut = decodeRealTimeBalanceRes(presentBalOut);
          decodedFutureBalOut = decodeRealTimeBalanceRes(futureBalOut); // set token0 state
          initialBalanceIn = decodedPresentBalIn.availableBalance;
          futureBalanceIn = decodedFutureBalIn.availableBalance;
          store.setInboundTokenBalance(initialBalanceIn);
          inboundFlowRate.current = (futureBalanceIn - initialBalanceIn) / REFRESH_INTERVAL;
          // set token1 state
          initialBalanceOut = decodedPresentBalOut.availableBalance;
          futureBalanceOut = decodedFutureBalOut.availableBalance;
          store.setOutboundTokenBalance(initialBalanceOut);
          outboundFlowRate.current = (futureBalanceOut - initialBalanceOut) / REFRESH_INTERVAL;
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), [address, tokenContractInbound === null || tokenContractInbound === void 0 ? void 0 : tokenContractInbound.address, tokenContractOutbound === null || tokenContractOutbound === void 0 ? void 0 : tokenContractOutbound.address]);
  // REFRESH(in milliseconds) = REFRESH_INTERVAL * ANIMATION_MINIMUM_STEP_TIME
  var _useState = useState(REFRESH_INTERVAL),
    _useState2 = _slicedToArray(_useState, 2),
    time = _useState2[0],
    setTime = _useState2[1];
  useEffect(function () {
    var timer = setTimeout(function () {
      setTime(time + 1);
      if (time >= REFRESH_INTERVAL) {
        setTime(0);
        updateTokenPairRealTimeBalanceCallback();
      }
      // animate frame
      store.incrementOutboundTokenBalance(outboundFlowRate.current);
      store.incrementInboundTokenBalance(inboundFlowRate.current);
    }, ANIMATION_MINIMUM_STEP_TIME);
    return function () {
      clearTimeout(timer);
    };
  }, [inboundFlowRate, outboundFlowRate, time, updateTokenPairRealTimeBalanceCallback]);
  useEffect(function () {
    updateTokenPairRealTimeBalanceCallback();
  }, [address, tokenContractInbound === null || tokenContractInbound === void 0 ? void 0 : tokenContractInbound.address, tokenContractOutbound === null || tokenContractOutbound === void 0 ? void 0 : tokenContractOutbound.address, updateTokenPairRealTimeBalanceCallback]);
  useEffect(function () {
    if (store.outboundToken) {
      store.setOutboundToken(store.outboundToken);
    }
    if (store.inboundToken) {
      store.setInboundToken(store.inboundToken);
    }
  }, [address]);
  return jsx("div", {
    className: "aqueduct-widget",
    children: jsx(SwapWidget, {
      theme: theme,
      tokenOption: tokenOption,
      defaultTokens: defaultTokens,
      width: width
    })
  });
};

export { darkTheme, TWAMMWidget as default, lightTheme };
//# sourceMappingURL=index.es.js.map
