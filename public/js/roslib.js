!(function n(r, s, o) {
  function a(t, e) {
    if (!s[t]) {
      if (!r[t]) {
        var i = "function" == typeof require && require;
        if (!e && i) return i(t, !0);
        if (c) return c(t, !0);
        throw (
          (((e = new Error("Cannot find module '" + t + "'")).code =
            "MODULE_NOT_FOUND"),
          e)
        );
      }
      (i = s[t] = { exports: {} }),
        r[t][0].call(
          i.exports,
          function (e) {
            return a(r[t][1][e] || e);
          },
          i,
          i.exports,
          n,
          r,
          s,
          o
        );
    }
    return s[t].exports;
  }
  for (
    var c = "function" == typeof require && require, e = 0;
    e < o.length;
    e++
  )
    a(o[e]);
  return a;
})(
  {
    1: [
      function (e, i, t) {
        !(function (e, A) {
          "use strict";
          var U = Math.pow(2, -24),
            r = Math.pow(2, 32),
            v = Math.pow(2, 53);
          var t = {
            encode: function (e) {
              var o,
                a = new ArrayBuffer(256),
                c = new DataView(a),
                l = 0;
              function u(e) {
                for (var t = a.byteLength, i = l + e; t < i; ) t *= 2;
                if (t !== a.byteLength)
                  for (
                    var n = c,
                      r =
                        ((a = new ArrayBuffer(t)),
                        (c = new DataView(a)),
                        (l + 3) >> 2),
                      s = 0;
                    s < r;
                    ++s
                  )
                    c.setUint32(4 * s, n.getUint32(4 * s));
                return (o = e), c;
              }
              function h() {
                l += o;
              }
              function f(e) {
                h(u(1).setUint8(l, e));
              }
              function p(e) {
                for (var t = u(e.length), i = 0; i < e.length; ++i)
                  t.setUint8(l + i, e[i]);
                h();
              }
              function m(e, t) {
                var i, n;
                t < 24
                  ? f((e << 5) | t)
                  : t < 256
                  ? (f((e << 5) | 24), f(t))
                  : t < 65536
                  ? (f((e << 5) | 25), (n = t), h(u(2).setUint16(l, n)))
                  : t < 4294967296
                  ? (f((e << 5) | 26), (n = t), h(u(4).setUint32(l, n)))
                  : (f((e << 5) | 27),
                    (e = ((e = t) - (t = t % r)) / r),
                    (i = u(8)).setUint32(l, e),
                    i.setUint32(l + 4, t),
                    h());
              }
              if (
                (!(function e(t) {
                  var i;
                  if (!1 === t) return f(244);
                  if (!0 === t) return f(245);
                  if (null === t) return f(246);
                  if (t === A) return f(247);
                  switch (typeof t) {
                    case "number":
                      if (Math.floor(t) === t) {
                        if (0 <= t && t <= v) return m(0, t);
                        if (-v <= t && t < 0) return m(1, -(t + 1));
                      }
                      return f(251), (i = t), h(u(8).setFloat64(l, i));
                    case "string":
                      for (var n = [], r = 0; r < t.length; ++r) {
                        var s = t.charCodeAt(r);
                        s < 128
                          ? n.push(s)
                          : (s < 2048
                              ? n.push(192 | (s >> 6))
                              : (s < 55296
                                  ? n.push(224 | (s >> 12))
                                  : ((s =
                                      65536 +
                                      ((s = (1023 & s) << 10) |
                                        (1023 & t.charCodeAt(++r)))),
                                    n.push(240 | (s >> 18)),
                                    n.push(128 | ((s >> 12) & 63))),
                                n.push(128 | ((s >> 6) & 63))),
                            n.push(128 | (63 & s)));
                      }
                      return m(3, n.length), p(n);
                    default:
                      if (Array.isArray(t))
                        for (m(4, (o = t.length)), r = 0; r < o; ++r) e(t[r]);
                      else if (t instanceof Uint8Array) m(2, t.length), p(t);
                      else {
                        var o,
                          a = Object.keys(t);
                        for (m(5, (o = a.length)), r = 0; r < o; ++r) {
                          var c = a[r];
                          e(c), e(t[c]);
                        }
                      }
                  }
                })(e),
                "slice" in a)
              )
                return a.slice(0, l);
              for (
                var e = new ArrayBuffer(l), t = new DataView(e), i = 0;
                i < l;
                ++i
              )
                t.setUint8(i, c.getUint8(i));
              return e;
            },
            decode: function (t, d, y) {
              var g = new DataView(t),
                b = 0;
              function w(e, t) {
                return (b += t), e;
              }
              function _(e) {
                return w(new Uint8Array(t, b, e), e);
              }
              function x() {
                return w(g.getUint8(b), 1);
              }
              function T() {
                return w(g.getUint16(b), 2);
              }
              function i() {
                return w(g.getUint32(b), 4);
              }
              function k() {
                return 255 === g.getUint8(b) && ((b += 1), 1);
              }
              function S(e) {
                if (e < 24) return e;
                if (24 === e) return x();
                if (25 === e) return T();
                if (26 === e) return i();
                if (27 === e) return i() * r + i();
                if (31 === e) return -1;
                throw "Invalid length encoding";
              }
              function L(e) {
                var t = x();
                if (255 === t) return -1;
                var i = S(31 & t);
                if (i < 0 || t >> 5 !== e)
                  throw "Invalid indefinite length element";
                return i;
              }
              function M(e, t) {
                for (var i = 0; i < t; ++i) {
                  var n = x();
                  128 & n &&
                    (n < 224
                      ? ((n = ((31 & n) << 6) | (63 & x())), --t)
                      : n < 240
                      ? ((n =
                          ((15 & n) << 12) | ((63 & x()) << 6) | (63 & x())),
                        (t -= 2))
                      : ((n =
                          ((15 & n) << 18) |
                          ((63 & x()) << 12) |
                          ((63 & x()) << 6) |
                          (63 & x())),
                        (t -= 3))),
                    n < 65536
                      ? e.push(n)
                      : ((n -= 65536),
                        e.push(55296 | (n >> 10)),
                        e.push(56320 | (1023 & n)));
                }
              }
              "function" != typeof d &&
                (d = function (e) {
                  return e;
                }),
                "function" != typeof y &&
                  (y = function () {
                    return A;
                  });
              var e = (function e() {
                var t,
                  i,
                  n = x(),
                  r = n >> 5,
                  n = 31 & n;
                if (7 == r)
                  switch (n) {
                    case 25:
                      var s = new ArrayBuffer(4),
                        s = new DataView(s),
                        o = T(),
                        a = 31744 & o,
                        c = 1023 & o;
                      if (31744 === a) a = 261120;
                      else if (0 !== a) a += 114688;
                      else if (0 != c) return c * U;
                      return (
                        s.setUint32(
                          0,
                          ((32768 & o) << 16) | (a << 13) | (c << 13)
                        ),
                        s.getFloat32(0)
                      );
                    case 26:
                      return w(g.getFloat32(b), 4);
                    case 27:
                      return w(g.getFloat64(b), 8);
                  }
                if ((t = S(n)) < 0 && (r < 2 || 6 < r)) throw "Invalid length";
                switch (r) {
                  case 0:
                    return t;
                  case 1:
                    return -1 - t;
                  case 2:
                    if (t < 0) {
                      for (var l = [], u = 0; 0 <= (t = L(r)); )
                        (u += t), l.push(_(t));
                      for (
                        var h = new Uint8Array(u), f = 0, p = 0;
                        p < l.length;
                        ++p
                      )
                        h.set(l[p], f), (f += l[p].length);
                      return h;
                    }
                    return _(t);
                  case 3:
                    var m = [];
                    if (t < 0) for (; 0 <= (t = L(r)); ) M(m, t);
                    else M(m, t);
                    return String.fromCharCode.apply(null, m);
                  case 4:
                    if (t < 0) for (i = []; !k(); ) i.push(e());
                    else for (i = new Array(t), p = 0; p < t; ++p) i[p] = e();
                    return i;
                  case 5:
                    var v = {};
                    for (p = 0; p < t || (t < 0 && !k()); ++p) v[e()] = e();
                    return v;
                  case 6:
                    return d(e(), t);
                  case 7:
                    switch (t) {
                      case 20:
                        return !1;
                      case 21:
                        return !0;
                      case 22:
                        return null;
                      case 23:
                        return A;
                      default:
                        return y(t);
                    }
                }
              })();
              if (b !== t.byteLength) throw "Remaining bytes";
              return e;
            },
          };
          "function" == typeof define && define.amd
            ? define("cbor/cbor", t)
            : void 0 !== i && i.exports
            ? (i.exports = t)
            : e.CBOR || (e.CBOR = t);
        })(this);
      },
      {},
    ],
    2: [
      function (e, U, E) {
        !function (M, A) {
          !function () {
            function h() {
              (this._events = {}), this._conf && t.call(this, this._conf);
            }
            function t(e) {
              e &&
                ((this._conf = e).delimiter && (this.delimiter = e.delimiter),
                e.maxListeners !== g && (this._maxListeners = e.maxListeners),
                e.wildcard && (this.wildcard = e.wildcard),
                e.newListener && (this._newListener = e.newListener),
                e.removeListener && (this._removeListener = e.removeListener),
                e.verboseMemoryLeak &&
                  (this.verboseMemoryLeak = e.verboseMemoryLeak),
                e.ignoreErrors && (this.ignoreErrors = e.ignoreErrors),
                this.wildcard && (this.listenerTree = {}));
            }
            function f(e, t) {
              var i =
                "(node) warning: possible EventEmitter memory leak detected. " +
                e +
                " listeners added. Use emitter.setMaxListeners() to increase limit.";
              this.verboseMemoryLeak && (i += " Event name: " + t + "."),
                void 0 !== M && M.emitWarning
                  ? (((t = new Error(i)).name = "MaxListenersExceededWarning"),
                    (t.emitter = this),
                    (t.count = e),
                    M.emitWarning(t))
                  : (console.error(i), console.trace && console.trace());
            }
            function l(e, t, i) {
              var n = arguments.length;
              switch (n) {
                case 0:
                  return [];
                case 1:
                  return [e];
                case 2:
                  return [e, t];
                case 3:
                  return [e, t, i];
                default:
                  for (var r = new Array(n); n--; ) r[n] = arguments[n];
                  return r;
              }
            }
            function i(e, t) {
              for (
                var i = {}, n = e.length, r = t ? value.length : 0, s = 0;
                s < n;
                s++
              )
                i[e[s]] = s < r ? t[s] : g;
              return i;
            }
            function p(e, t, i) {
              var n, r;
              if (
                ((this._emitter = e),
                (this._target = t),
                (this._listeners = {}),
                (this._listenersCount = 0),
                (i.on || i.off) && ((n = i.on), (r = i.off)),
                t.addEventListener
                  ? ((n = t.addEventListener), (r = t.removeEventListener))
                  : t.addListener
                  ? ((n = t.addListener), (r = t.removeListener))
                  : t.on && ((n = t.on), (r = t.off)),
                !n && !r)
              )
                throw Error("target does not implement any known event API");
              if ("function" != typeof n)
                throw TypeError("on method must be a function");
              if ("function" != typeof r)
                throw TypeError("off method must be a function");
              (this._on = n), (this._off = r);
              i = e._observers;
              i ? i.push(this) : (e._observers = [this]);
            }
            function m(e, t, i, n) {
              var r = Object.assign({}, t);
              if (!e) return r;
              if ("object" != typeof e)
                throw TypeError("options must be an object");
              var s,
                o,
                a,
                c = Object.keys(e),
                l = c.length;
              function u(e) {
                throw Error(
                  'Invalid "' +
                    s +
                    '" option value' +
                    (e ? ". Reason: " + e : "")
                );
              }
              for (var h = 0; h < l; h++) {
                if (((s = c[h]), !n && !b.call(t, s)))
                  throw Error('Unknown "' + s + '" option');
                (o = e[s]) !== g && ((a = i[s]), (r[s] = a ? a(o, u) : o));
              }
              return r;
            }
            function n(e, t) {
              return (
                ("function" == typeof e && e.hasOwnProperty("prototype")) ||
                  t("value must be a constructor"),
                e
              );
            }
            function e(r) {
              var s = "value must be type of " + r.join("|"),
                o = r.length,
                n = r[0],
                a = r[1];
              return 1 === o
                ? function (e, t) {
                    if (typeof e === n) return e;
                    t(s);
                  }
                : 2 === o
                ? function (e, t) {
                    var i = typeof e;
                    if (i === n || i === a) return e;
                    t(s);
                  }
                : function (e, t) {
                    for (var i = typeof e, n = o; 0 < n--; )
                      if (i === r[n]) return e;
                    t(s);
                  };
            }
            function c(o, a, c) {
              var l,
                u,
                h,
                f = 0,
                p = new o(function (t, i, e) {
                  function n() {
                    (u = u && null), f && (clearTimeout(f), (f = 0));
                  }
                  (c = m(
                    c,
                    { timeout: 0, overload: !1 },
                    {
                      timeout: function (e, t) {
                        return (
                          ("number" != typeof (e *= 1) ||
                            e < 0 ||
                            !Number.isFinite(e)) &&
                            t("timeout must be a positive number"),
                          e
                        );
                      },
                    }
                  )),
                    (l =
                      !c.overload &&
                      "function" == typeof o.prototype.cancel &&
                      "function" == typeof e);
                  function r(e) {
                    n(), t(e);
                  }
                  function s(e) {
                    n(), i(e);
                  }
                  l
                    ? a(r, s, e)
                    : ((u = [
                        function (e) {
                          s(e || Error("canceled"));
                        },
                      ]),
                      a(r, s, function (e) {
                        if (h)
                          throw Error(
                            "Unable to subscribe on cancel event asynchronously"
                          );
                        if ("function" != typeof e)
                          throw TypeError(
                            "onCancel callback must be a function"
                          );
                        u.push(e);
                      }),
                      (h = !0)),
                    0 < c.timeout &&
                      (f = setTimeout(function () {
                        var e = Error("timeout");
                        (e.code = "ETIMEDOUT"), (f = 0), p.cancel(e), i(e);
                      }, c.timeout));
                });
              return (
                l ||
                  (p.cancel = function (e) {
                    if (u) {
                      for (var t = u.length, i = 1; i < t; i++) u[i](e);
                      u[0](e), (u = null);
                    }
                  }),
                p
              );
            }
            function v(e) {
              var t = this._observers;
              if (!t) return -1;
              for (var i = t.length, n = 0; n < i; n++)
                if (t[n]._target === e) return n;
              return -1;
            }
            function _(e, t, i, n, r) {
              if (!i) return null;
              if (0 === n) {
                var s = typeof t;
                if ("string" == s) {
                  var o,
                    a,
                    c = 0,
                    l = 0,
                    u = this.delimiter,
                    h = u.length;
                  if (-1 !== (a = t.indexOf(u))) {
                    for (
                      o = new Array(5);
                      (o[c++] = t.slice(l, a)),
                        -1 !== (a = t.indexOf(u, (l = a + h)));

                    );
                    (o[c++] = t.slice(l)), (t = o), (r = c);
                  } else (t = [t]), (r = 1);
                } else r = "object" == s ? t.length : ((t = [t]), 1);
              }
              var f,
                p,
                m,
                v,
                d,
                y,
                g = null,
                b = t[n],
                w = t[n + 1];
              if (n === r)
                i._listeners &&
                  (g =
                    ("function" == typeof i._listeners
                      ? e && e.push(i._listeners)
                      : e && e.push.apply(e, i._listeners),
                    [i]));
              else {
                if ("*" === b) {
                  for (a = (d = S(i)).length; 0 < a--; )
                    "_listeners" !== (f = d[a]) &&
                      (y = _(e, t, i[f], n + 1, r)) &&
                      (g ? g.push.apply(g, y) : (g = y));
                  return g;
                }
                if ("**" === b) {
                  for (
                    (v = n + 1 === r || (n + 2 === r && "*" === w)) &&
                      i._listeners &&
                      (g = _(e, t, i, r, r)),
                      a = (d = S(i)).length;
                    0 < a--;

                  )
                    "_listeners" !== (f = d[a]) &&
                      (y =
                        "*" === f || "**" === f
                          ? (i[f]._listeners &&
                              !v &&
                              (y = _(e, t, i[f], r, r)) &&
                              (g ? g.push.apply(g, y) : (g = y)),
                            _(e, t, i[f], n, r))
                          : _(e, t, i[f], f === w ? n + 2 : n, r)) &&
                      (g ? g.push.apply(g, y) : (g = y));
                  return g;
                }
                i[b] && (g = _(e, t, i[b], n + 1, r));
              }
              if (((s = i["*"]) && _(e, t, s, n + 1, r), (p = i["**"])))
                if (n < r)
                  for (
                    p._listeners && _(e, t, p, r, r), a = (d = S(p)).length;
                    0 < a--;

                  )
                    "_listeners" !== (f = d[a]) &&
                      (f === w
                        ? _(e, t, p[f], n + 2, r)
                        : f === b
                        ? _(e, t, p[f], n + 1, r)
                        : (((m = {})[f] = p[f]),
                          _(e, t, { "**": m }, n + 1, r)));
                else
                  p._listeners
                    ? _(e, t, p, r, r)
                    : p["*"] && p["*"]._listeners && _(e, t, p["*"], r, r);
              return g;
            }
            function u(e, t, i, n) {
              for (
                var r, s, o, a = S(e), c = a.length, l = e._listeners;
                0 < c--;

              )
                (r = e[(o = a[c])]),
                  (s = "_listeners" === o ? i : i ? i.concat(o) : [o]),
                  (o = n || "symbol" == typeof o),
                  l && t.push(o ? s : s.join(this.delimiter)),
                  "object" == typeof r && u.call(this, r, t, s, o);
              return t;
            }
            function d(e) {
              for (var t, i, n, r = S(e), s = r.length; 0 < s--; )
                (t = e[(i = r[s])]) &&
                  ((n = !0), "_listeners" === i || d(t) || delete e[i]);
              return n;
            }
            function y(e, t, i) {
              (this.emitter = e), (this.event = t), (this.listener = i);
            }
            function r(e) {
              (this._events = {}),
                (this._newListener = !1),
                (this._removeListener = !1),
                (this.verboseMemoryLeak = !1),
                t.call(this, e);
            }
            var g, b, w, x, T, s, k, S, a, o, L;
            (b = Object.hasOwnProperty),
              (w =
                Array.isArray ||
                function (e) {
                  return "[object Array]" === Object.prototype.toString.call(e);
                }),
              (x = "object" == typeof M && "function" == typeof M.nextTick),
              (T = "function" == typeof Symbol),
              (s = "object" == typeof Reflect),
              (k = "function" == typeof A ? A : setTimeout),
              (S = T
                ? s && "function" == typeof Reflect.ownKeys
                  ? Reflect.ownKeys
                  : function (e) {
                      var t = Object.getOwnPropertyNames(e);
                      return (
                        t.push.apply(t, Object.getOwnPropertySymbols(e)), t
                      );
                    }
                : Object.keys),
              Object.assign(p.prototype, {
                subscribe: function (i, n, r) {
                  function t() {
                    var e = l.apply(null, arguments),
                      t = { data: e, name: n, original: i };
                    r
                      ? !1 !== r.call(o, t) &&
                        a.emit.apply(a, [t.name].concat(e))
                      : a.emit.apply(a, [n].concat(e));
                  }
                  var s = this,
                    o = this._target,
                    a = this._emitter,
                    c = this._listeners;
                  if (c[i])
                    throw Error("Event '" + i + "' is already listening");
                  this._listenersCount++,
                    a._newListener && a._removeListener && !s._onNewListener
                      ? ((this._onNewListener = function (e) {
                          e === n &&
                            null === c[i] &&
                            ((c[i] = t), s._on.call(o, i, t));
                        }),
                        a.on("newListener", this._onNewListener),
                        (this._onRemoveListener = function (e) {
                          e === n &&
                            !a.hasListeners(e) &&
                            c[i] &&
                            ((c[i] = null), s._off.call(o, i, t));
                        }),
                        (c[i] = null),
                        a.on("removeListener", this._onRemoveListener))
                      : ((c[i] = t), s._on.call(o, i, t));
                },
                unsubscribe: function (e) {
                  var t,
                    i,
                    n,
                    r = this,
                    s = this._listeners,
                    o = this._emitter,
                    a = this._off,
                    c = this._target;
                  if (e && "string" != typeof e)
                    throw TypeError("event must be a string");
                  function l() {
                    r._onNewListener &&
                      (o.off("newListener", r._onNewListener),
                      o.off("removeListener", r._onRemoveListener),
                      (r._onNewListener = null),
                      (r._onRemoveListener = null));
                    var e = v.call(o, r);
                    o._observers.splice(e, 1);
                  }
                  if (e)
                    (t = s[e]) &&
                      (a.call(c, e, t),
                      delete s[e],
                      --this._listenersCount || l());
                  else {
                    for (n = (i = S(s)).length; 0 < n--; )
                      (e = i[n]), a.call(c, e, s[e]);
                    (this._listeners = {}), (this._listenersCount = 0), l();
                  }
                },
              }),
              (a = e(["function"])),
              (o = e(["object", "function"])),
              (y.prototype.off = function () {
                return this.emitter.off(this.event, this.listener), this;
              }),
              ((r.EventEmitter2 = r).prototype.listenTo = function (l, e, u) {
                if ("object" != typeof l)
                  throw TypeError("target musts be an object");
                var h = this;
                function t(e) {
                  if ("object" != typeof e)
                    throw TypeError("events must be an object");
                  for (
                    var t,
                      i = u.reducers,
                      n = v.call(h, l),
                      r = -1 === n ? new p(h, l, u) : h._observers[n],
                      s = S(e),
                      o = s.length,
                      a = "function" == typeof i,
                      c = 0;
                    c < o;
                    c++
                  )
                    (t = s[c]), r.subscribe(t, e[t] || t, a ? i : i && i[t]);
                }
                return (
                  (u = m(
                    u,
                    { on: g, off: g, reducers: g },
                    { on: a, off: a, reducers: o }
                  )),
                  w(e)
                    ? t(i(e))
                    : t("string" == typeof e ? i(e.split(/\s+/)) : e),
                  this
                );
              }),
              (r.prototype.stopListeningTo = function (e, t) {
                var i = this._observers;
                if (!i) return !1;
                var n,
                  r = i.length,
                  s = !1;
                if (e && "object" != typeof e)
                  throw TypeError("target should be an object");
                for (; 0 < r--; )
                  (n = i[r]),
                    (e && n._target !== e) || (n.unsubscribe(t), (s = !0));
                return s;
              }),
              (r.prototype.delimiter = "."),
              (r.prototype.setMaxListeners = function (e) {
                e !== g &&
                  ((this._maxListeners = e),
                  this._conf || (this._conf = {}),
                  (this._conf.maxListeners = e));
              }),
              (r.prototype.getMaxListeners = function () {
                return this._maxListeners;
              }),
              (r.prototype.event = ""),
              (r.prototype.once = function (e, t, i) {
                return this._once(e, t, !1, i);
              }),
              (r.prototype.prependOnceListener = function (e, t, i) {
                return this._once(e, t, !0, i);
              }),
              (r.prototype._once = function (e, t, i, n) {
                return this._many(e, 1, t, i, n);
              }),
              (r.prototype.many = function (e, t, i, n) {
                return this._many(e, t, i, !1, n);
              }),
              (r.prototype.prependMany = function (e, t, i, n) {
                return this._many(e, t, i, !0, n);
              }),
              (r.prototype._many = function (e, t, i, n, r) {
                var s = this;
                if ("function" != typeof i)
                  throw new Error("many only accepts instances of Function");
                function o() {
                  return 0 == --t && s.off(e, o), i.apply(this, arguments);
                }
                return (o._origin = i), this._on(e, o, n, r);
              }),
              (r.prototype.emit = function () {
                if (!this._events && !this._all) return !1;
                this._events || h.call(this);
                var e,
                  t,
                  i,
                  n,
                  r,
                  s,
                  o = arguments[0],
                  a = this.wildcard;
                if (
                  "newListener" === o &&
                  !this._newListener &&
                  !this._events.newListener
                )
                  return !1;
                if (
                  a &&
                  "newListener" !== (e = o) &&
                  "removeListener" !== o &&
                  "object" == typeof o
                ) {
                  if (((i = o.length), T))
                    for (n = 0; n < i; n++)
                      if ("symbol" == typeof o[n]) {
                        s = !0;
                        break;
                      }
                  s || (o = o.join(this.delimiter));
                }
                var c,
                  l = arguments.length;
                if (this._all && this._all.length)
                  for (n = 0, i = (c = this._all.slice()).length; n < i; n++)
                    switch (((this.event = o), l)) {
                      case 1:
                        c[n].call(this, o);
                        break;
                      case 2:
                        c[n].call(this, o, arguments[1]);
                        break;
                      case 3:
                        c[n].call(this, o, arguments[1], arguments[2]);
                        break;
                      default:
                        c[n].apply(this, arguments);
                    }
                if (a) _.call(this, (c = []), e, this.listenerTree, 0, i);
                else {
                  if ("function" == typeof (c = this._events[o])) {
                    switch (((this.event = o), l)) {
                      case 1:
                        c.call(this);
                        break;
                      case 2:
                        c.call(this, arguments[1]);
                        break;
                      case 3:
                        c.call(this, arguments[1], arguments[2]);
                        break;
                      default:
                        for (t = new Array(l - 1), r = 1; r < l; r++)
                          t[r - 1] = arguments[r];
                        c.apply(this, t);
                    }
                    return !0;
                  }
                  c = c && c.slice();
                }
                if (c && c.length) {
                  if (3 < l)
                    for (t = new Array(l - 1), r = 1; r < l; r++)
                      t[r - 1] = arguments[r];
                  for (n = 0, i = c.length; n < i; n++)
                    switch (((this.event = o), l)) {
                      case 1:
                        c[n].call(this);
                        break;
                      case 2:
                        c[n].call(this, arguments[1]);
                        break;
                      case 3:
                        c[n].call(this, arguments[1], arguments[2]);
                        break;
                      default:
                        c[n].apply(this, t);
                    }
                  return !0;
                }
                if (this.ignoreErrors || this._all || "error" !== o)
                  return !!this._all;
                throw arguments[1] instanceof Error
                  ? arguments[1]
                  : new Error("Uncaught, unspecified 'error' event.");
              }),
              (r.prototype.emitAsync = function () {
                if (!this._events && !this._all) return !1;
                this._events || h.call(this);
                var e,
                  t,
                  i,
                  n,
                  r,
                  s,
                  o = arguments[0],
                  a = this.wildcard;
                if (
                  "newListener" === o &&
                  !this._newListener &&
                  !this._events.newListener
                )
                  return Promise.resolve([!1]);
                if (
                  a &&
                  "newListener" !== (e = o) &&
                  "removeListener" !== o &&
                  "object" == typeof o
                ) {
                  if (((n = o.length), T))
                    for (r = 0; r < n; r++)
                      if ("symbol" == typeof o[r]) {
                        t = !0;
                        break;
                      }
                  t || (o = o.join(this.delimiter));
                }
                var c,
                  l = [],
                  u = arguments.length;
                if (this._all)
                  for (r = 0, n = this._all.length; r < n; r++)
                    switch (((this.event = o), u)) {
                      case 1:
                        l.push(this._all[r].call(this, o));
                        break;
                      case 2:
                        l.push(this._all[r].call(this, o, arguments[1]));
                        break;
                      case 3:
                        l.push(
                          this._all[r].call(this, o, arguments[1], arguments[2])
                        );
                        break;
                      default:
                        l.push(this._all[r].apply(this, arguments));
                    }
                if (
                  (a
                    ? _.call(this, (c = []), e, this.listenerTree, 0)
                    : (c = this._events[o]),
                  "function" == typeof c)
                )
                  switch (((this.event = o), u)) {
                    case 1:
                      l.push(c.call(this));
                      break;
                    case 2:
                      l.push(c.call(this, arguments[1]));
                      break;
                    case 3:
                      l.push(c.call(this, arguments[1], arguments[2]));
                      break;
                    default:
                      for (i = new Array(u - 1), s = 1; s < u; s++)
                        i[s - 1] = arguments[s];
                      l.push(c.apply(this, i));
                  }
                else if (c && c.length) {
                  if (((c = c.slice()), 3 < u))
                    for (i = new Array(u - 1), s = 1; s < u; s++)
                      i[s - 1] = arguments[s];
                  for (r = 0, n = c.length; r < n; r++)
                    switch (((this.event = o), u)) {
                      case 1:
                        l.push(c[r].call(this));
                        break;
                      case 2:
                        l.push(c[r].call(this, arguments[1]));
                        break;
                      case 3:
                        l.push(c[r].call(this, arguments[1], arguments[2]));
                        break;
                      default:
                        l.push(c[r].apply(this, i));
                    }
                } else if (!this.ignoreErrors && !this._all && "error" === o)
                  return arguments[1] instanceof Error
                    ? Promise.reject(arguments[1])
                    : Promise.reject("Uncaught, unspecified 'error' event.");
                return Promise.all(l);
              }),
              (r.prototype.on = function (e, t, i) {
                return this._on(e, t, !1, i);
              }),
              (r.prototype.prependListener = function (e, t, i) {
                return this._on(e, t, !0, i);
              }),
              (r.prototype.onAny = function (e) {
                return this._onAny(e, !1);
              }),
              (r.prototype.prependAny = function (e) {
                return this._onAny(e, !0);
              }),
              (r.prototype.addListener = r.prototype.on),
              (r.prototype._onAny = function (e, t) {
                if ("function" != typeof e)
                  throw new Error("onAny only accepts instances of Function");
                return (
                  this._all || (this._all = []),
                  t ? this._all.unshift(e) : this._all.push(e),
                  this
                );
              }),
              (r.prototype._on = function (e, t, i, n) {
                if ("function" == typeof e) return this._onAny(e, t), this;
                if ("function" != typeof t)
                  throw new Error("on only accepts instances of Function");
                this._events || h.call(this);
                var r = this;
                return (
                  n !== g &&
                    ((t = (n = function (e, t, i) {
                      if (!0 === i) r = !0;
                      else if (!1 === i) n = !0;
                      else {
                        if (!i || "object" != typeof i)
                          throw TypeError(
                            "options should be an object or true"
                          );
                        var n = i.async,
                          r = i.promisify,
                          s = i.nextTick,
                          o = i.objectify;
                      }
                      if (n || s || r) {
                        var a = t,
                          i = t._origin || t;
                        if (s && !x)
                          throw Error("process.nextTick is not supported");
                        r === g && (r = "AsyncFunction" === t.constructor.name),
                          ((t = function () {
                            var e = arguments,
                              t = this,
                              i = this.event;
                            return r
                              ? s
                                ? Promise.resolve()
                                : new Promise(function (e) {
                                    k(e);
                                  }).then(function () {
                                    return (t.event = i), a.apply(t, e);
                                  })
                              : (s ? M.nextTick : k)(function () {
                                  (t.event = i), a.apply(t, e);
                                });
                          })._async = !0),
                          (t._origin = i);
                      }
                      return [t, o ? new y(this, e, t) : this];
                    }.call(this, e, t, n))[0]),
                    (r = n[1])),
                  this._newListener && this.emit("newListener", e, t),
                  this.wildcard
                    ? function (e, t, i) {
                        var n,
                          r = 0,
                          s = 0,
                          o = this.delimiter,
                          a = o.length;
                        if ("string" == typeof e)
                          if (-1 !== (u = e.indexOf(o))) {
                            for (
                              n = new Array(5);
                              (n[r++] = e.slice(s, u)),
                                -1 !== (u = e.indexOf(o, (s = u + a)));

                            );
                            n[r++] = e.slice(s);
                          } else (n = [e]), (r = 1);
                        else r = (n = e).length;
                        if (1 < r)
                          for (u = 0; u + 1 < r; u++)
                            if ("**" === n[u] && "**" === n[u + 1]) return;
                        for (var c, l = this.listenerTree, u = 0; u < r; u++)
                          if (((l = l[(c = n[u])] || (l[c] = {})), u === r - 1))
                            return (
                              l._listeners
                                ? ("function" == typeof l._listeners &&
                                    (l._listeners = [l._listeners]),
                                  i
                                    ? l._listeners.unshift(t)
                                    : l._listeners.push(t),
                                  !l._listeners.warned &&
                                    0 < this._maxListeners &&
                                    l._listeners.length > this._maxListeners &&
                                    ((l._listeners.warned = !0),
                                    f.call(this, l._listeners.length, c)))
                                : (l._listeners = t),
                              !0
                            );
                        return !0;
                      }.call(this, e, t, i)
                    : this._events[e]
                    ? ("function" == typeof this._events[e] &&
                        (this._events[e] = [this._events[e]]),
                      i ? this._events[e].unshift(t) : this._events[e].push(t),
                      !this._events[e].warned &&
                        0 < this._maxListeners &&
                        this._events[e].length > this._maxListeners &&
                        ((this._events[e].warned = !0),
                        f.call(this, this._events[e].length, e)))
                    : (this._events[e] = t),
                  r
                );
              }),
              (r.prototype.off = function (e, t) {
                if ("function" != typeof t)
                  throw new Error(
                    "removeListener only takes instances of Function"
                  );
                var i = [];
                if (this.wildcard) {
                  var n =
                    "string" == typeof e ? e.split(this.delimiter) : e.slice();
                  if (!(i = _.call(this, null, n, this.listenerTree, 0)))
                    return this;
                } else {
                  if (!this._events[e]) return this;
                  (o = this._events[e]), i.push({ _listeners: o });
                }
                for (var r = 0; r < i.length; r++) {
                  var s = i[r],
                    o = s._listeners;
                  if (w(o)) {
                    for (var a = -1, c = 0, l = o.length; c < l; c++)
                      if (
                        o[c] === t ||
                        (o[c].listener && o[c].listener === t) ||
                        (o[c]._origin && o[c]._origin === t)
                      ) {
                        a = c;
                        break;
                      }
                    if (!(a < 0))
                      return (
                        (this.wildcard ? s._listeners : this._events[e]).splice(
                          a,
                          1
                        ),
                        0 === o.length &&
                          (this.wildcard
                            ? delete s._listeners
                            : delete this._events[e]),
                        this._removeListener &&
                          this.emit("removeListener", e, t),
                        this
                      );
                  } else
                    (o === t ||
                      (o.listener && o.listener === t) ||
                      (o._origin && o._origin === t)) &&
                      (this.wildcard
                        ? delete s._listeners
                        : delete this._events[e],
                      this._removeListener &&
                        this.emit("removeListener", e, t));
                }
                return this.listenerTree && d(this.listenerTree), this;
              }),
              (r.prototype.offAny = function (e) {
                var t,
                  i = 0,
                  n = 0;
                if (e && this._all && 0 < this._all.length) {
                  for (i = 0, n = (t = this._all).length; i < n; i++)
                    if (e === t[i])
                      return (
                        t.splice(i, 1),
                        this._removeListener &&
                          this.emit("removeListenerAny", e),
                        this
                      );
                } else {
                  if (((t = this._all), this._removeListener))
                    for (i = 0, n = t.length; i < n; i++)
                      this.emit("removeListenerAny", t[i]);
                  this._all = [];
                }
                return this;
              }),
              (r.prototype.removeListener = r.prototype.off),
              (r.prototype.removeAllListeners = function (e) {
                if (e === g) return this._events && h.call(this), this;
                if (this.wildcard) {
                  var t,
                    i = _.call(this, null, e, this.listenerTree, 0);
                  if (!i) return this;
                  for (t = 0; t < i.length; t++) i[t]._listeners = null;
                  this.listenerTree && d(this.listenerTree);
                } else this._events && (this._events[e] = null);
                return this;
              }),
              (r.prototype.listeners = function (e) {
                var t,
                  i,
                  n,
                  r,
                  s,
                  o = this._events;
                if (e === g) {
                  if (this.wildcard)
                    throw Error("event name required for wildcard emitter");
                  if (!o) return [];
                  for (r = (t = S(o)).length, n = []; 0 < r--; )
                    "function" == typeof (i = o[t[r]])
                      ? n.push(i)
                      : n.push.apply(n, i);
                  return n;
                }
                if (this.wildcard) {
                  if (!(s = this.listenerTree)) return [];
                  var a = [],
                    c =
                      "string" == typeof e
                        ? e.split(this.delimiter)
                        : e.slice();
                  return _.call(this, a, c, s, 0), a;
                }
                return o && (i = o[e])
                  ? "function" == typeof i
                    ? [i]
                    : i
                  : [];
              }),
              (r.prototype.eventNames = function (e) {
                var t = this._events;
                return this.wildcard
                  ? u.call(this, this.listenerTree, [], null, e)
                  : t
                  ? S(t)
                  : [];
              }),
              (r.prototype.listenerCount = function (e) {
                return this.listeners(e).length;
              }),
              (r.prototype.hasListeners = function (e) {
                if (this.wildcard)
                  return (
                    (i = []),
                    (t =
                      "string" == typeof e
                        ? e.split(this.delimiter)
                        : e.slice()),
                    _.call(this, i, t, this.listenerTree, 0),
                    0 < i.length
                  );
                var t = this._events,
                  i = this._all;
                return !!(
                  (i && i.length) ||
                  (t && (e === g ? S(t).length : t[e]))
                );
              }),
              (r.prototype.listenersAny = function () {
                return this._all || [];
              }),
              (r.prototype.waitFor = function (r, s) {
                var o = this,
                  e = typeof s;
                return (
                  "number" == e
                    ? (s = { timeout: s })
                    : "function" == e && (s = { filter: s }),
                  c(
                    (s = m(
                      s,
                      {
                        timeout: 0,
                        filter: g,
                        handleError: !1,
                        Promise: Promise,
                        overload: !1,
                      },
                      { filter: a, Promise: n }
                    )).Promise,
                    function (t, i, e) {
                      function n() {
                        var e = s.filter;
                        (e && !e.apply(o, arguments)) ||
                          (o.off(r, n),
                          s.handleError
                            ? (e = arguments[0])
                              ? i(e)
                              : t(l.apply(null, arguments).slice(1))
                            : t(l.apply(null, arguments)));
                      }
                      e(function () {
                        o.off(r, n);
                      }),
                        o._on(r, n, !1);
                    },
                    { timeout: s.timeout, overload: s.overload }
                  )
                );
              }),
              (L = r.prototype),
              Object.defineProperties(r, {
                defaultMaxListeners: {
                  get: function () {
                    return L._maxListeners;
                  },
                  set: function (e) {
                    if ("number" != typeof e || e < 0 || Number.isNaN(e))
                      throw TypeError("n must be a non-negative number");
                    L._maxListeners = e;
                  },
                  enumerable: !0,
                },
                once: {
                  value: function (o, a, e) {
                    return c(
                      (e = m(
                        e,
                        { Promise: Promise, timeout: 0, overload: !1 },
                        { Promise: n }
                      )).Promise,
                      function (e, t, i) {
                        var n;
                        if ("function" == typeof o.addEventListener)
                          return (
                            (n = function () {
                              e(l.apply(null, arguments));
                            }),
                            i(function () {
                              o.removeEventListener(a, n);
                            }),
                            void o.addEventListener(a, n, { once: !0 })
                          );
                        var r,
                          s = function () {
                            r && o.removeListener("error", r),
                              e(l.apply(null, arguments));
                          };
                        "error" !== a &&
                          ((r = function (e) {
                            o.removeListener(a, s), t(e);
                          }),
                          o.once("error", r)),
                          i(function () {
                            r && o.removeListener("error", r),
                              o.removeListener(a, s);
                          }),
                          o.once(a, s);
                      },
                      { timeout: e.timeout, overload: e.overload }
                    );
                  },
                  writable: !0,
                  configurable: !0,
                },
              }),
              Object.defineProperties(L, {
                _maxListeners: { value: 10, writable: !0, configurable: !0 },
                _observers: { value: null, writable: !0, configurable: !0 },
              }),
              "function" == typeof define && define.amd
                ? define(function () {
                    return r;
                  })
                : "object" == typeof E
                ? (U.exports = r)
                : (new Function("", "return this")().EventEmitter2 = r);
          }.call(this);
        }.call(this, e("_process"), e("timers").setImmediate);
      },
      { _process: 4, timers: 5 },
    ],
    3: [
      function (e, t, i) {
        "use strict";
        var c = Object.getOwnPropertySymbols,
          l = Object.prototype.hasOwnProperty,
          u = Object.prototype.propertyIsEnumerable;
        t.exports = (function () {
          try {
            if (!Object.assign) return;
            var e = new String("abc");
            if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
              return;
            for (var t = {}, i = 0; i < 10; i++)
              t["_" + String.fromCharCode(i)] = i;
            if (
              "0123456789" !==
              Object.getOwnPropertyNames(t)
                .map(function (e) {
                  return t[e];
                })
                .join("")
            )
              return;
            var n = {};
            return (
              "abcdefghijklmnopqrst".split("").forEach(function (e) {
                n[e] = e;
              }),
              "abcdefghijklmnopqrst" !==
              Object.keys(Object.assign({}, n)).join("")
                ? void 0
                : 1
            );
          } catch (e) {
            return;
          }
        })()
          ? Object.assign
          : function (e, t) {
              for (
                var i,
                  n = (function (e) {
                    if (null == e)
                      throw new TypeError(
                        "Object.assign cannot be called with null or undefined"
                      );
                    return Object(e);
                  })(e),
                  r = 1;
                r < arguments.length;
                r++
              ) {
                for (var s in (i = Object(arguments[r])))
                  l.call(i, s) && (n[s] = i[s]);
                if (c)
                  for (var o = c(i), a = 0; a < o.length; a++)
                    u.call(i, o[a]) && (n[o[a]] = i[o[a]]);
              }
              return n;
            };
      },
      {},
    ],
    4: [
      function (e, t, i) {
        var n,
          r,
          t = (t.exports = {});
        function s() {
          throw new Error("setTimeout has not been defined");
        }
        function o() {
          throw new Error("clearTimeout has not been defined");
        }
        try {
          n = "function" == typeof setTimeout ? setTimeout : s;
        } catch (e) {
          n = s;
        }
        try {
          r = "function" == typeof clearTimeout ? clearTimeout : o;
        } catch (e) {
          r = o;
        }
        function a(t) {
          if (n === setTimeout) return setTimeout(t, 0);
          if ((n === s || !n) && setTimeout) return (n = setTimeout)(t, 0);
          try {
            return n(t, 0);
          } catch (e) {
            try {
              return n.call(null, t, 0);
            } catch (e) {
              return n.call(this, t, 0);
            }
          }
        }
        var c,
          l = [],
          u = !1,
          h = -1;
        function f() {
          u &&
            c &&
            ((u = !1),
            c.length ? (l = c.concat(l)) : (h = -1),
            l.length && p());
        }
        function p() {
          if (!u) {
            for (var e = a(f), t = ((u = !0), l.length); t; ) {
              for (c = l, l = []; ++h < t; ) c && c[h].run();
              (h = -1), (t = l.length);
            }
            (c = null),
              (u = !1),
              !(function (t) {
                if (r === clearTimeout) return clearTimeout(t);
                if ((r === o || !r) && clearTimeout)
                  return (r = clearTimeout)(t);
                try {
                  r(t);
                } catch (e) {
                  try {
                    return r.call(null, t);
                  } catch (e) {
                    return r.call(this, t);
                  }
                }
              })(e);
          }
        }
        function m(e, t) {
          (this.fun = e), (this.array = t);
        }
        function v() {}
        (t.nextTick = function (e) {
          var t = new Array(arguments.length - 1);
          if (1 < arguments.length)
            for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
          l.push(new m(e, t)), 1 !== l.length || u || a(p);
        }),
          (m.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (t.title = "browser"),
          (t.browser = !0),
          (t.env = {}),
          (t.argv = []),
          (t.version = ""),
          (t.versions = {}),
          (t.on = v),
          (t.addListener = v),
          (t.once = v),
          (t.off = v),
          (t.removeListener = v),
          (t.removeAllListeners = v),
          (t.emit = v),
          (t.prependListener = v),
          (t.prependOnceListener = v),
          (t.listeners = function (e) {
            return [];
          }),
          (t.binding = function (e) {
            throw new Error("process.binding is not supported");
          }),
          (t.cwd = function () {
            return "/";
          }),
          (t.chdir = function (e) {
            throw new Error("process.chdir is not supported");
          }),
          (t.umask = function () {
            return 0;
          });
      },
      {},
    ],
    5: [
      function (c, e, l) {
        !function (i, a) {
          !function () {
            var n = c("process/browser.js").nextTick,
              e = Function.prototype.apply,
              r = Array.prototype.slice,
              s = {},
              o = 0;
            function t(e, t) {
              (this._id = e), (this._clearFn = t);
            }
            (l.setTimeout = function () {
              return new t(e.call(setTimeout, window, arguments), clearTimeout);
            }),
              (l.setInterval = function () {
                return new t(
                  e.call(setInterval, window, arguments),
                  clearInterval
                );
              }),
              (l.clearTimeout = l.clearInterval =
                function (e) {
                  e.close();
                }),
              (t.prototype.unref = t.prototype.ref = function () {}),
              (t.prototype.close = function () {
                this._clearFn.call(window, this._id);
              }),
              (l.enroll = function (e, t) {
                clearTimeout(e._idleTimeoutId), (e._idleTimeout = t);
              }),
              (l.unenroll = function (e) {
                clearTimeout(e._idleTimeoutId), (e._idleTimeout = -1);
              }),
              (l._unrefActive = l.active =
                function (e) {
                  clearTimeout(e._idleTimeoutId);
                  var t = e._idleTimeout;
                  0 <= t &&
                    (e._idleTimeoutId = setTimeout(function () {
                      e._onTimeout && e._onTimeout();
                    }, t));
                }),
              (l.setImmediate =
                "function" == typeof i
                  ? i
                  : function (e) {
                      var t = o++,
                        i = !(arguments.length < 2) && r.call(arguments, 1);
                      return (
                        (s[t] = !0),
                        n(function () {
                          s[t] &&
                            (i ? e.apply(null, i) : e.call(null),
                            l.clearImmediate(t));
                        }),
                        t
                      );
                    }),
              (l.clearImmediate =
                "function" == typeof a
                  ? a
                  : function (e) {
                      delete s[e];
                    });
          }.call(this);
        }.call(this, c("timers").setImmediate, c("timers").clearImmediate);
      },
      { "process/browser.js": 4, timers: 5 },
    ],
    6: [
      function (e, t, i) {
        function s(i) {
          var n = {};
          function r(e) {
            if (n[e]) return n[e].exports;
            var t = (n[e] = { i: e, l: !1, exports: {} });
            return i[e].call(t.exports, t, t.exports, r), (t.l = !0), t.exports;
          }
          (r.m = i),
            (r.c = n),
            (r.i = function (e) {
              return e;
            }),
            (r.d = function (e, t, i) {
              r.o(e, t) ||
                Object.defineProperty(e, t, {
                  configurable: !1,
                  enumerable: !0,
                  get: i,
                });
            }),
            (r.r = function (e) {
              Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (r.n = function (e) {
              var t =
                e && e.__esModule
                  ? function () {
                      return e.default;
                    }
                  : function () {
                      return e;
                    };
              return r.d(t, "a", t), t;
            }),
            (r.o = function (e, t) {
              return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.p = "/"),
            (r.oe = function (e) {
              throw (console.error(e), e);
            });
          var e = r((r.s = ENTRY_MODULE));
          return e.default || e;
        }
        var h = "[\\.|\\-|\\+|\\w|/|@]+",
          f = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?(" + h + ").*?\\)";
        function p(e) {
          return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        }
        function m(e, t, i) {
          var n = {},
            r = ((n[i] = []), t.toString()),
            t = r.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
          if (!t) return n;
          for (
            var s, t = t[1], o = new RegExp("(\\\\n|\\W)" + p(t) + f, "g");
            (s = o.exec(r));

          )
            "dll-reference" !== s[3] && n[i].push(s[3]);
          for (
            o = new RegExp(
              "\\(" + p(t) + '\\("(dll-reference\\s(' + h + '))"\\)\\)' + f,
              "g"
            );
            (s = o.exec(r));

          )
            e[s[2]] ||
              (n[i].push(s[1]), (e[s[2]] = __webpack_require__(s[1]).m)),
              (n[s[2]] = n[s[2]] || []),
              n[s[2]].push(s[4]);
          for (var a, c = Object.keys(n), l = 0; l < c.length; l++)
            for (var u = 0; u < n[c[l]].length; u++)
              (a = n[c[l]][u]), isNaN(+a) || (n[c[l]][u] = +n[c[l]][u]);
          return n;
        }
        function o(e, t) {
          for (
            var i = { main: [t] }, n = { main: [] }, r = { main: {} };
            (function (i) {
              return Object.keys(i).reduce(function (e, t) {
                return e || 0 < i[t].length;
              }, !1);
            })(i);

          )
            for (var s = Object.keys(i), o = 0; o < s.length; o++) {
              var a = s[o],
                c = i[a].pop();
              if (((r[a] = r[a] || {}), !r[a][c] && e[a][c])) {
                (r[a][c] = !0), (n[a] = n[a] || []), n[a].push(c);
                for (
                  var l = m(e, e[a][c], a), u = Object.keys(l), h = 0;
                  h < u.length;
                  h++
                )
                  (i[u[h]] = i[u[h]] || []),
                    (i[u[h]] = i[u[h]].concat(l[u[h]]));
              }
            }
          return n;
        }
        t.exports = function (e, t) {
          t = t || {};
          var i = { main: __webpack_modules__ },
            n = t.all ? { main: Object.keys(i.main) } : o(i, e),
            r = "",
            e =
              (Object.keys(n)
                .filter(function (e) {
                  return "main" !== e;
                })
                .forEach(function (t) {
                  for (var e = 0; n[t][e]; ) e++;
                  n[t].push(e),
                    (i[t][e] =
                      "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })"),
                    (r =
                      r +
                      "var " +
                      t +
                      " = (" +
                      s.toString().replace("ENTRY_MODULE", JSON.stringify(e)) +
                      ")({" +
                      n[t]
                        .map(function (e) {
                          return JSON.stringify(e) + ": " + i[t][e].toString();
                        })
                        .join(",") +
                      "});\n");
                }),
              (r =
                r +
                "new ((" +
                s.toString().replace("ENTRY_MODULE", JSON.stringify(e)) +
                ")({" +
                n.main
                  .map(function (e) {
                    return JSON.stringify(e) + ": " + i.main[e].toString();
                  })
                  .join(",") +
                "}))(self);"),
              new window.Blob([r], { type: "text/javascript" }));
          if (t.bare) return e;
          (t = (
            window.URL ||
            window.webkitURL ||
            window.mozURL ||
            window.msURL
          ).createObjectURL(e)),
            (e = new window.Worker(t));
          return (e.objectURL = t), e;
        };
      },
      {},
    ],
    7: [
      function (e, t, i) {
        var f = arguments[3],
          p = arguments[4],
          m = arguments[5],
          v = JSON.stringify;
        t.exports = function (e, t) {
          for (var i = Object.keys(m), n = 0, r = i.length; n < r; n++) {
            var s = i[n],
              o = m[s].exports;
            if (o === e || (o && o.default === e)) {
              a = s;
              break;
            }
          }
          if (!a) {
            for (
              var a = Math.floor(Math.pow(16, 8) * Math.random()).toString(16),
                c = {},
                n = 0,
                r = i.length;
              n < r;
              n++
            )
              c[(s = i[n])] = s;
            p[a] = ["function(require,module,exports){" + e + "(self); }", c];
          }
          var l = Math.floor(Math.pow(16, 8) * Math.random()).toString(16),
            u = {},
            h =
              ((u[a] = a),
              (p[l] = [
                "function(require,module,exports){var f = require(" +
                  v(a) +
                  ");(f.default ? f.default : f)(self);}",
                u,
              ]),
              {});
          !(function e(t) {
            h[t] = !0;
            for (var i in p[t][1]) {
              i = p[t][1][i];
              h[i] || e(i);
            }
          })(l);
          (u =
            "(" +
            f +
            ")({" +
            Object.keys(h)
              .map(function (e) {
                return v(e) + ":[" + p[e][0] + "," + v(p[e][1]) + "]";
              })
              .join(",") +
            "},{},[" +
            v(l) +
            "])"),
            (l =
              window.URL || window.webkitURL || window.mozURL || window.msURL),
            (u = new Blob([u], { type: "text/javascript" }));
          if (t && t.bare) return u;
          (t = l.createObjectURL(u)), (l = new Worker(t));
          return (l.objectURL = t), l;
        };
      },
      {},
    ],
    8: [
      function (e, t, i) {
        var n = this.ROSLIB || { REVISION: "1.3.0" },
          r = e("object-assign");
        r(n, e("./core")),
          r(n, e("./actionlib")),
          r(n, e("./math")),
          r(n, e("./tf")),
          r(n, e("./urdf")),
          (t.exports = n);
      },
      {
        "./actionlib": 14,
        "./core": 23,
        "./math": 28,
        "./tf": 31,
        "./urdf": 43,
        "object-assign": 3,
      },
    ],
    9: [
      function (t, e, i) {
        !function (e) {
          !function () {
            e.ROSLIB = t("./RosLib");
          }.call(this);
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        );
      },
      { "./RosLib": 8 },
    ],
    10: [
      function (e, t, i) {
        var n = e("../core/Topic"),
          r = e("../core/Message"),
          e = e("eventemitter2").EventEmitter2;
        function s(e) {
          var i = this,
            t =
              ((this.ros = (e = e || {}).ros),
              (this.serverName = e.serverName),
              (this.actionName = e.actionName),
              (this.timeout = e.timeout),
              (this.omitFeedback = e.omitFeedback),
              (this.omitStatus = e.omitStatus),
              (this.omitResult = e.omitResult),
              !(this.goals = {}));
          (this.feedbackListener = new n({
            ros: this.ros,
            name: this.serverName + "/feedback",
            messageType: this.actionName + "Feedback",
          })),
            (this.statusListener = new n({
              ros: this.ros,
              name: this.serverName + "/status",
              messageType: "actionlib_msgs/GoalStatusArray",
            })),
            (this.resultListener = new n({
              ros: this.ros,
              name: this.serverName + "/result",
              messageType: this.actionName + "Result",
            })),
            (this.goalTopic = new n({
              ros: this.ros,
              name: this.serverName + "/goal",
              messageType: this.actionName + "Goal",
            })),
            (this.cancelTopic = new n({
              ros: this.ros,
              name: this.serverName + "/cancel",
              messageType: "actionlib_msgs/GoalID",
            })),
            this.goalTopic.advertise(),
            this.cancelTopic.advertise(),
            this.omitStatus ||
              this.statusListener.subscribe(function (e) {
                (t = !0),
                  e.status_list.forEach(function (e) {
                    var t = i.goals[e.goal_id.id];
                    t && t.emit("status", e);
                  });
              }),
            this.omitFeedback ||
              this.feedbackListener.subscribe(function (e) {
                var t = i.goals[e.status.goal_id.id];
                t &&
                  (t.emit("status", e.status), t.emit("feedback", e.feedback));
              }),
            this.omitResult ||
              this.resultListener.subscribe(function (e) {
                var t = i.goals[e.status.goal_id.id];
                t && (t.emit("status", e.status), t.emit("result", e.result));
              }),
            this.timeout &&
              setTimeout(function () {
                t || i.emit("timeout");
              }, this.timeout);
        }
        (s.prototype.__proto__ = e.prototype),
          (s.prototype.cancel = function () {
            var e = new r();
            this.cancelTopic.publish(e);
          }),
          (s.prototype.dispose = function () {
            this.goalTopic.unadvertise(),
              this.cancelTopic.unadvertise(),
              this.omitStatus || this.statusListener.unsubscribe(),
              this.omitFeedback || this.feedbackListener.unsubscribe(),
              this.omitResult || this.resultListener.unsubscribe();
          }),
          (t.exports = s);
      },
      { "../core/Message": 15, "../core/Topic": 22, eventemitter2: 2 },
    ],
    11: [
      function (e, t, i) {
        var s = e("../core/Topic"),
          e = (e("../core/Message"), e("eventemitter2").EventEmitter2);
        function n(e) {
          var t = this,
            e =
              ((this.ros = (e = e || {}).ros),
              (this.serverName = e.serverName),
              (this.actionName = e.actionName),
              (this.timeout = e.timeout),
              (this.omitFeedback = e.omitFeedback),
              (this.omitStatus = e.omitStatus),
              (this.omitResult = e.omitResult),
              new s({
                ros: this.ros,
                name: this.serverName + "/goal",
                messageType: this.actionName + "Goal",
              })),
            i = new s({
              ros: this.ros,
              name: this.serverName + "/feedback",
              messageType: this.actionName + "Feedback",
            }),
            n = new s({
              ros: this.ros,
              name: this.serverName + "/status",
              messageType: "actionlib_msgs/GoalStatusArray",
            }),
            r = new s({
              ros: this.ros,
              name: this.serverName + "/result",
              messageType: this.actionName + "Result",
            });
          e.subscribe(function (e) {
            t.emit("goal", e);
          }),
            n.subscribe(function (e) {
              e.status_list.forEach(function (e) {
                t.emit("status", e);
              });
            }),
            i.subscribe(function (e) {
              t.emit("status", e.status), t.emit("feedback", e.feedback);
            }),
            r.subscribe(function (e) {
              t.emit("status", e.status), t.emit("result", e.result);
            });
        }
        (n.prototype.__proto__ = e.prototype), (t.exports = n);
      },
      { "../core/Message": 15, "../core/Topic": 22, eventemitter2: 2 },
    ],
    12: [
      function (e, t, i) {
        var n = e("../core/Message"),
          e = e("eventemitter2").EventEmitter2;
        function r(e) {
          var t = this,
            e =
              ((this.actionClient = e.actionClient),
              (this.goalMessage = e.goalMessage),
              (this.isFinished = !1),
              new Date());
          (this.goalID = "goal_" + Math.random() + "_" + e.getTime()),
            (this.goalMessage = new n({
              goal_id: { stamp: { secs: 0, nsecs: 0 }, id: this.goalID },
              goal: this.goalMessage,
            })),
            this.on("status", function (e) {
              t.status = e;
            }),
            this.on("result", function (e) {
              (t.isFinished = !0), (t.result = e);
            }),
            this.on("feedback", function (e) {
              t.feedback = e;
            }),
            (this.actionClient.goals[this.goalID] = this);
        }
        (r.prototype.__proto__ = e.prototype),
          (r.prototype.send = function (e) {
            var t = this;
            t.actionClient.goalTopic.publish(t.goalMessage),
              e &&
                setTimeout(function () {
                  t.isFinished || t.emit("timeout");
                }, e);
          }),
          (r.prototype.cancel = function () {
            var e = new n({ id: this.goalID });
            this.actionClient.cancelTopic.publish(e);
          }),
          (t.exports = r);
      },
      { "../core/Message": 15, eventemitter2: 2 },
    ],
    13: [
      function (e, t, i) {
        var s = e("../core/Topic"),
          o = e("../core/Message"),
          e = e("eventemitter2").EventEmitter2;
        function n(e) {
          function t(e, t) {
            return !(e.secs > t.secs) && (e.secs < t.secs || e.nsecs < t.nsecs);
          }
          var i = this,
            n =
              ((this.ros = (e = e || {}).ros),
              (this.serverName = e.serverName),
              (this.actionName = e.actionName),
              (this.feedbackPublisher = new s({
                ros: this.ros,
                name: this.serverName + "/feedback",
                messageType: this.actionName + "Feedback",
              })),
              this.feedbackPublisher.advertise(),
              new s({
                ros: this.ros,
                name: this.serverName + "/status",
                messageType: "actionlib_msgs/GoalStatusArray",
              })),
            e =
              (n.advertise(),
              (this.resultPublisher = new s({
                ros: this.ros,
                name: this.serverName + "/result",
                messageType: this.actionName + "Result",
              })),
              this.resultPublisher.advertise(),
              new s({
                ros: this.ros,
                name: this.serverName + "/goal",
                messageType: this.actionName + "Goal",
              })),
            r = new s({
              ros: this.ros,
              name: this.serverName + "/cancel",
              messageType: "actionlib_msgs/GoalID",
            });
          (this.statusMessage = new o({
            header: { stamp: { secs: 0, nsecs: 100 }, frame_id: "" },
            status_list: [],
          })),
            (this.currentGoal = null),
            (this.nextGoal = null),
            e.subscribe(function (e) {
              i.currentGoal
                ? ((i.nextGoal = e), i.emit("cancel"))
                : ((i.statusMessage.status_list = [
                    { goal_id: e.goal_id, status: 1 },
                  ]),
                  (i.currentGoal = e),
                  i.emit("goal", e.goal));
            }),
            r.subscribe(function (e) {
              0 === e.stamp.secs && 0 === e.stamp.secs && "" === e.id
                ? ((i.nextGoal = null), i.currentGoal && i.emit("cancel"))
                : (i.currentGoal && e.id === i.currentGoal.goal_id.id
                    ? i.emit("cancel")
                    : i.nextGoal &&
                      e.id === i.nextGoal.goal_id.id &&
                      (i.nextGoal = null),
                  i.nextGoal &&
                    t(i.nextGoal.goal_id.stamp, e.stamp) &&
                    (i.nextGoal = null),
                  i.currentGoal &&
                    t(i.currentGoal.goal_id.stamp, e.stamp) &&
                    i.emit("cancel"));
            }),
            setInterval(function () {
              var e = new Date(),
                t = Math.floor(e.getTime() / 1e3),
                e = Math.round(1e9 * (e.getTime() / 1e3 - t));
              (i.statusMessage.header.stamp.secs = t),
                (i.statusMessage.header.stamp.nsecs = e),
                n.publish(i.statusMessage);
            }, 500);
        }
        (n.prototype.__proto__ = e.prototype),
          (n.prototype.setSucceeded = function (e) {
            e = new o({
              status: { goal_id: this.currentGoal.goal_id, status: 3 },
              result: e,
            });
            this.resultPublisher.publish(e),
              (this.statusMessage.status_list = []),
              this.nextGoal
                ? ((this.currentGoal = this.nextGoal),
                  (this.nextGoal = null),
                  this.emit("goal", this.currentGoal.goal))
                : (this.currentGoal = null);
          }),
          (n.prototype.setAborted = function (e) {
            e = new o({
              status: { goal_id: this.currentGoal.goal_id, status: 4 },
              result: e,
            });
            this.resultPublisher.publish(e),
              (this.statusMessage.status_list = []),
              this.nextGoal
                ? ((this.currentGoal = this.nextGoal),
                  (this.nextGoal = null),
                  this.emit("goal", this.currentGoal.goal))
                : (this.currentGoal = null);
          }),
          (n.prototype.sendFeedback = function (e) {
            e = new o({
              status: { goal_id: this.currentGoal.goal_id, status: 1 },
              feedback: e,
            });
            this.feedbackPublisher.publish(e);
          }),
          (n.prototype.setPreempted = function () {
            this.statusMessage.status_list = [];
            var e = new o({
              status: { goal_id: this.currentGoal.goal_id, status: 2 },
            });
            this.resultPublisher.publish(e),
              this.nextGoal
                ? ((this.currentGoal = this.nextGoal),
                  (this.nextGoal = null),
                  this.emit("goal", this.currentGoal.goal))
                : (this.currentGoal = null);
          }),
          (t.exports = n);
      },
      { "../core/Message": 15, "../core/Topic": 22, eventemitter2: 2 },
    ],
    14: [
      function (e, t, i) {
        var n = e("../core/Ros");
        e("../mixin")(
          n,
          ["ActionClient", "SimpleActionServer"],
          (t.exports = {
            ActionClient: e("./ActionClient"),
            ActionListener: e("./ActionListener"),
            Goal: e("./Goal"),
            SimpleActionServer: e("./SimpleActionServer"),
          })
        );
      },
      {
        "../core/Ros": 17,
        "../mixin": 29,
        "./ActionClient": 10,
        "./ActionListener": 11,
        "./Goal": 12,
        "./SimpleActionServer": 13,
      },
    ],
    15: [
      function (e, t, i) {
        var n = e("object-assign");
        t.exports = function (e) {
          n(this, e);
        };
      },
      { "object-assign": 3 },
    ],
    16: [
      function (e, t, i) {
        var n = e("./Service"),
          r = e("./ServiceRequest");
        function s(e) {
          (this.ros = (e = e || {}).ros), (this.name = e.name);
        }
        (s.prototype.get = function (t) {
          var e = new n({
              ros: this.ros,
              name: "/rosapi/get_param",
              serviceType: "rosapi/GetParam",
            }),
            i = new r({ name: this.name });
          e.callService(i, function (e) {
            e = JSON.parse(e.value);
            t(e);
          });
        }),
          (s.prototype.set = function (e, t) {
            var i = new n({
                ros: this.ros,
                name: "/rosapi/set_param",
                serviceType: "rosapi/SetParam",
              }),
              e = new r({ name: this.name, value: JSON.stringify(e) });
            i.callService(e, t);
          }),
          (s.prototype.delete = function (e) {
            var t = new n({
                ros: this.ros,
                name: "/rosapi/delete_param",
                serviceType: "rosapi/DeleteParam",
              }),
              i = new r({ name: this.name });
            t.callService(i, e);
          }),
          (t.exports = s);
      },
      { "./Service": 18, "./ServiceRequest": 19 },
    ],
    17: [
      function (e, t, i) {
        var n = e("ws"),
          r = e("../util/workerSocket"),
          s = e("./SocketAdapter.js"),
          o = e("./Service"),
          a = e("./ServiceRequest"),
          c = e("object-assign"),
          e = e("eventemitter2").EventEmitter2;
        function l(e) {
          e = e || {};
          var t = this;
          (this.socket = null),
            (this.idCounter = 0),
            (this.isConnected = !1),
            (this.transportLibrary = e.transportLibrary || "websocket"),
            (this.transportOptions = e.transportOptions || {}),
            (this._sendFunc = function (e) {
              t.sendEncodedMessage(e);
            }),
            void 0 === e.groovyCompatibility
              ? (this.groovyCompatibility = !0)
              : (this.groovyCompatibility = e.groovyCompatibility),
            this.setMaxListeners(0),
            e.url && this.connect(e.url);
        }
        (l.prototype.__proto__ = e.prototype),
          (l.prototype.connect = function (e) {
            if ("socket.io" === this.transportLibrary)
              (this.socket = c(io(e, { "force new connection": !0 }), s(this))),
                this.socket.on("connect", this.socket.onopen),
                this.socket.on("data", this.socket.onmessage),
                this.socket.on("close", this.socket.onclose),
                this.socket.on("error", this.socket.onerror);
            else if (
              "RTCPeerConnection" === this.transportLibrary.constructor.name
            )
              this.socket = c(
                this.transportLibrary.createDataChannel(
                  e,
                  this.transportOptions
                ),
                s(this)
              );
            else if ("websocket" === this.transportLibrary) {
              var t;
              (this.socket && this.socket.readyState !== n.CLOSED) ||
                (((t = new n(e)).binaryType = "arraybuffer"),
                (this.socket = c(t, s(this))));
            } else {
              if ("workersocket" !== this.transportLibrary)
                throw (
                  "Unknown transportLibrary: " +
                  this.transportLibrary.toString()
                );
              this.socket = c(new r(e), s(this));
            }
          }),
          (l.prototype.close = function () {
            this.socket && this.socket.close();
          }),
          (l.prototype.authenticate = function (e, t, i, n, r, s, o) {
            this.callOnConnection({
              op: "auth",
              mac: e,
              client: t,
              dest: i,
              rand: n,
              t: r,
              level: s,
              end: o,
            });
          }),
          (l.prototype.sendEncodedMessage = function (e) {
            var t = null,
              i = this,
              t =
                "socket.io" === this.transportLibrary
                  ? function (e) {
                      i.socket.emit("operation", e);
                    }
                  : function (e) {
                      i.socket.send(e);
                    };
            this.isConnected
              ? t(e)
              : i.once("connection", function () {
                  t(e);
                });
          }),
          (l.prototype.callOnConnection = function (e) {
            this.transportOptions.encoder
              ? this.transportOptions.encoder(e, this._sendFunc)
              : this._sendFunc(JSON.stringify(e));
          }),
          (l.prototype.setStatusLevel = function (e, t) {
            this.callOnConnection({ op: "set_level", level: e, id: t });
          }),
          (l.prototype.getActionServers = function (t, i) {
            var e = new o({
                ros: this,
                name: "/rosapi/action_servers",
                serviceType: "rosapi/GetActionServers",
              }),
              n = new a({});
            "function" == typeof i
              ? e.callService(
                  n,
                  function (e) {
                    t(e.action_servers);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : e.callService(n, function (e) {
                  t(e.action_servers);
                });
          }),
          (l.prototype.getTopics = function (t, i) {
            var e = new o({
                ros: this,
                name: "/rosapi/topics",
                serviceType: "rosapi/Topics",
              }),
              n = new a();
            "function" == typeof i
              ? e.callService(
                  n,
                  function (e) {
                    t(e);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : e.callService(n, function (e) {
                  t(e);
                });
          }),
          (l.prototype.getTopicsForType = function (e, t, i) {
            var n = new o({
                ros: this,
                name: "/rosapi/topics_for_type",
                serviceType: "rosapi/TopicsForType",
              }),
              e = new a({ type: e });
            "function" == typeof i
              ? n.callService(
                  e,
                  function (e) {
                    t(e.topics);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : n.callService(e, function (e) {
                  t(e.topics);
                });
          }),
          (l.prototype.getServices = function (t, i) {
            var e = new o({
                ros: this,
                name: "/rosapi/services",
                serviceType: "rosapi/Services",
              }),
              n = new a();
            "function" == typeof i
              ? e.callService(
                  n,
                  function (e) {
                    t(e.services);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : e.callService(n, function (e) {
                  t(e.services);
                });
          }),
          (l.prototype.getServicesForType = function (e, t, i) {
            var n = new o({
                ros: this,
                name: "/rosapi/services_for_type",
                serviceType: "rosapi/ServicesForType",
              }),
              e = new a({ type: e });
            "function" == typeof i
              ? n.callService(
                  e,
                  function (e) {
                    t(e.services);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : n.callService(e, function (e) {
                  t(e.services);
                });
          }),
          (l.prototype.getServiceRequestDetails = function (e, t, i) {
            var n = new o({
                ros: this,
                name: "/rosapi/service_request_details",
                serviceType: "rosapi/ServiceRequestDetails",
              }),
              e = new a({ type: e });
            "function" == typeof i
              ? n.callService(
                  e,
                  function (e) {
                    t(e);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : n.callService(e, function (e) {
                  t(e);
                });
          }),
          (l.prototype.getServiceResponseDetails = function (e, t, i) {
            var n = new o({
                ros: this,
                name: "/rosapi/service_response_details",
                serviceType: "rosapi/ServiceResponseDetails",
              }),
              e = new a({ type: e });
            "function" == typeof i
              ? n.callService(
                  e,
                  function (e) {
                    t(e);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : n.callService(e, function (e) {
                  t(e);
                });
          }),
          (l.prototype.getNodes = function (t, i) {
            var e = new o({
                ros: this,
                name: "/rosapi/nodes",
                serviceType: "rosapi/Nodes",
              }),
              n = new a();
            "function" == typeof i
              ? e.callService(
                  n,
                  function (e) {
                    t(e.nodes);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : e.callService(n, function (e) {
                  t(e.nodes);
                });
          }),
          (l.prototype.getNodeDetails = function (e, t, i) {
            var n = new o({
                ros: this,
                name: "/rosapi/node_details",
                serviceType: "rosapi/NodeDetails",
              }),
              e = new a({ node: e });
            "function" == typeof i
              ? n.callService(
                  e,
                  function (e) {
                    t(e.subscribing, e.publishing, e.services);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : n.callService(e, function (e) {
                  t(e);
                });
          }),
          (l.prototype.getParams = function (t, i) {
            var e = new o({
                ros: this,
                name: "/rosapi/get_param_names",
                serviceType: "rosapi/GetParamNames",
              }),
              n = new a();
            "function" == typeof i
              ? e.callService(
                  n,
                  function (e) {
                    t(e.names);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : e.callService(n, function (e) {
                  t(e.names);
                });
          }),
          (l.prototype.getTopicType = function (e, t, i) {
            var n = new o({
                ros: this,
                name: "/rosapi/topic_type",
                serviceType: "rosapi/TopicType",
              }),
              e = new a({ topic: e });
            "function" == typeof i
              ? n.callService(
                  e,
                  function (e) {
                    t(e.type);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : n.callService(e, function (e) {
                  t(e.type);
                });
          }),
          (l.prototype.getServiceType = function (e, t, i) {
            var n = new o({
                ros: this,
                name: "/rosapi/service_type",
                serviceType: "rosapi/ServiceType",
              }),
              e = new a({ service: e });
            "function" == typeof i
              ? n.callService(
                  e,
                  function (e) {
                    t(e.type);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : n.callService(e, function (e) {
                  t(e.type);
                });
          }),
          (l.prototype.getMessageDetails = function (e, t, i) {
            var n = new o({
                ros: this,
                name: "/rosapi/message_details",
                serviceType: "rosapi/MessageDetails",
              }),
              e = new a({ type: e });
            "function" == typeof i
              ? n.callService(
                  e,
                  function (e) {
                    t(e.typedefs);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : n.callService(e, function (e) {
                  t(e.typedefs);
                });
          }),
          (l.prototype.decodeTypeDefs = function (e) {
            function u(e, t) {
              for (var i = {}, n = 0; n < e.fieldnames.length; n++) {
                var r = e.fieldarraylen[n],
                  s = e.fieldnames[n],
                  o = e.fieldtypes[n];
                if (-1 === o.indexOf("/")) i[s] = -1 === r ? o : [o];
                else {
                  for (var a, c = !1, l = 0; l < t.length; l++)
                    if (t[l].type.toString() === o.toString()) {
                      c = t[l];
                      break;
                    }
                  c
                    ? ((a = u(c, t)), -1 !== r && (i[s] = [a]))
                    : h.emit(
                        "error",
                        "Cannot find " + o + " in decodeTypeDefs"
                      );
                }
              }
              return i;
            }
            var h = this;
            return u(e[0], e);
          }),
          (l.prototype.getTopicsAndRawTypes = function (t, i) {
            var e = new o({
                ros: this,
                name: "/rosapi/topics_and_raw_types",
                serviceType: "rosapi/TopicsAndRawTypes",
              }),
              n = new a();
            "function" == typeof i
              ? e.callService(
                  n,
                  function (e) {
                    t(e);
                  },
                  function (e) {
                    i(e);
                  }
                )
              : e.callService(n, function (e) {
                  t(e);
                });
          }),
          (t.exports = l);
      },
      {
        "../util/workerSocket": 49,
        "./Service": 18,
        "./ServiceRequest": 19,
        "./SocketAdapter.js": 21,
        eventemitter2: 2,
        "object-assign": 3,
        ws: 46,
      },
    ],
    18: [
      function (e, t, i) {
        var r = e("./ServiceResponse"),
          e = (e("./ServiceRequest"), e("eventemitter2").EventEmitter2);
        function n(e) {
          (this.ros = (e = e || {}).ros),
            (this.name = e.name),
            (this.serviceType = e.serviceType),
            (this.isAdvertised = !1),
            (this._serviceCallback = null);
        }
        (n.prototype.__proto__ = e.prototype),
          (n.prototype.callService = function (e, t, i) {
            var n;
            this.isAdvertised ||
              ((n = "call_service:" + this.name + ":" + ++this.ros.idCounter),
              (t || i) &&
                this.ros.once(n, function (e) {
                  void 0 !== e.result && !1 === e.result
                    ? "function" == typeof i && i(e.values)
                    : "function" == typeof t && t(new r(e.values));
                }),
              (n = {
                op: "call_service",
                id: n,
                service: this.name,
                type: this.serviceType,
                args: e,
              }),
              this.ros.callOnConnection(n));
          }),
          (n.prototype.advertise = function (e) {
            this.isAdvertised ||
              "function" != typeof e ||
              ((this._serviceCallback = e),
              this.ros.on(this.name, this._serviceResponse.bind(this)),
              this.ros.callOnConnection({
                op: "advertise_service",
                type: this.serviceType,
                service: this.name,
              }),
              (this.isAdvertised = !0));
          }),
          (n.prototype.unadvertise = function () {
            this.isAdvertised &&
              (this.ros.callOnConnection({
                op: "unadvertise_service",
                service: this.name,
              }),
              (this.isAdvertised = !1));
          }),
          (n.prototype._serviceResponse = function (e) {
            var t = {},
              i = this._serviceCallback(e.args, t),
              t = {
                op: "service_response",
                service: this.name,
                values: new r(t),
                result: i,
              };
            e.id && (t.id = e.id), this.ros.callOnConnection(t);
          }),
          (t.exports = n);
      },
      { "./ServiceRequest": 19, "./ServiceResponse": 20, eventemitter2: 2 },
    ],
    19: [
      function (e, t, i) {
        var n = e("object-assign");
        t.exports = function (e) {
          n(this, e);
        };
      },
      { "object-assign": 3 },
    ],
    20: [
      function (e, t, i) {
        var n = e("object-assign");
        t.exports = function (e) {
          n(this, e);
        };
      },
      { "object-assign": 3 },
    ],
    21: [
      function (e, t, i) {
        "use strict";
        var n = e("../util/decompressPng"),
          a = e("cbor-js"),
          c = e("../util/cborTypedArrayTags"),
          l = null;
        "undefined" != typeof bson && (l = bson().BSON),
          (t.exports = function (t) {
            var r = null;
            function s(e) {
              "publish" === e.op
                ? t.emit(e.topic, e.msg)
                : "service_response" === e.op
                ? t.emit(e.id, e)
                : "call_service" === e.op
                ? t.emit(e.service, e)
                : "status" === e.op &&
                  (e.id ? t.emit("status:" + e.id, e) : t.emit("status", e));
            }
            function o(e, t) {
              "png" === e.op ? n(e.data, t) : t(e);
            }
            return (
              t.transportOptions.decoder && (r = t.transportOptions.decoder),
              {
                onopen: function (e) {
                  (t.isConnected = !0), t.emit("connection", e);
                },
                onclose: function (e) {
                  (t.isConnected = !1), t.emit("close", e);
                },
                onerror: function (e) {
                  t.emit("error", e);
                },
                onmessage: function (e) {
                  if (r)
                    r(e.data, function (e) {
                      s(e);
                    });
                  else if (
                    "undefined" != typeof Blob &&
                    e.data instanceof Blob
                  ) {
                    var t = e.data,
                      i = function (e) {
                        o(e, s);
                      };
                    if (!l)
                      throw "Cannot process BSON encoded message without BSON header.";
                    var n = new FileReader();
                    (n.onload = function () {
                      var e = new Uint8Array(this.result),
                        e = l.deserialize(e);
                      i(e);
                    }),
                      n.readAsArrayBuffer(t);
                  } else
                    e.data instanceof ArrayBuffer
                      ? s(a.decode(e.data, c))
                      : o(JSON.parse("string" == typeof e ? e : e.data), s);
                },
              }
            );
          });
      },
      {
        "../util/cborTypedArrayTags": 44,
        "../util/decompressPng": 48,
        "cbor-js": 1,
      },
    ],
    22: [
      function (e, t, i) {
        var n = e("eventemitter2").EventEmitter2,
          r = e("./Message");
        function s(e) {
          (this.ros = (e = e || {}).ros),
            (this.name = e.name),
            (this.messageType = e.messageType),
            (this.isAdvertised = !1),
            (this.compression = e.compression || "none"),
            (this.throttle_rate = e.throttle_rate || 0),
            (this.latch = e.latch || !1),
            (this.queue_size = e.queue_size || 100),
            (this.queue_length = e.queue_length || 0),
            (this.reconnect_on_close =
              void 0 === e.reconnect_on_close || e.reconnect_on_close),
            this.compression &&
              "png" !== this.compression &&
              "cbor" !== this.compression &&
              "cbor-raw" !== this.compression &&
              "none" !== this.compression &&
              (this.emit(
                "warning",
                this.compression +
                  " compression is not supported. No compression will be used."
              ),
              (this.compression = "none")),
            this.throttle_rate < 0 &&
              (this.emit(
                "warning",
                this.throttle_rate + " is not allowed. Set to 0"
              ),
              (this.throttle_rate = 0));
          var t = this;
          this.reconnect_on_close
            ? (this.callForSubscribeAndAdvertise = function (e) {
                t.ros.callOnConnection(e),
                  (t.waitForReconnect = !1),
                  (t.reconnectFunc = function () {
                    t.waitForReconnect ||
                      ((t.waitForReconnect = !0),
                      t.ros.callOnConnection(e),
                      t.ros.once("connection", function () {
                        t.waitForReconnect = !1;
                      }));
                  }),
                  t.ros.on("close", t.reconnectFunc);
              })
            : (this.callForSubscribeAndAdvertise = this.ros.callOnConnection),
            (this._messageCallback = function (e) {
              t.emit("message", new r(e));
            });
        }
        (s.prototype.__proto__ = n.prototype),
          (s.prototype.subscribe = function (e) {
            "function" == typeof e && this.on("message", e),
              this.subscribeId ||
                (this.ros.on(this.name, this._messageCallback),
                (this.subscribeId =
                  "subscribe:" + this.name + ":" + ++this.ros.idCounter),
                this.callForSubscribeAndAdvertise({
                  op: "subscribe",
                  id: this.subscribeId,
                  type: this.messageType,
                  topic: this.name,
                  compression: this.compression,
                  throttle_rate: this.throttle_rate,
                  queue_length: this.queue_length,
                }));
          }),
          (s.prototype.unsubscribe = function (e) {
            (e && (this.off("message", e), this.listeners("message").length)) ||
              (this.subscribeId &&
                (this.ros.off(this.name, this._messageCallback),
                this.reconnect_on_close &&
                  this.ros.off("close", this.reconnectFunc),
                this.emit("unsubscribe"),
                this.ros.callOnConnection({
                  op: "unsubscribe",
                  id: this.subscribeId,
                  topic: this.name,
                }),
                (this.subscribeId = null)));
          }),
          (s.prototype.advertise = function () {
            var e;
            this.isAdvertised ||
              ((this.advertiseId =
                "advertise:" + this.name + ":" + ++this.ros.idCounter),
              this.callForSubscribeAndAdvertise({
                op: "advertise",
                id: this.advertiseId,
                type: this.messageType,
                topic: this.name,
                latch: this.latch,
                queue_size: this.queue_size,
              }),
              (this.isAdvertised = !0),
              this.reconnect_on_close ||
                (e = this).ros.on("close", function () {
                  e.isAdvertised = !1;
                }));
          }),
          (s.prototype.unadvertise = function () {
            this.isAdvertised &&
              (this.reconnect_on_close &&
                this.ros.off("close", this.reconnectFunc),
              this.emit("unadvertise"),
              this.ros.callOnConnection({
                op: "unadvertise",
                id: this.advertiseId,
                topic: this.name,
              }),
              (this.isAdvertised = !1));
          }),
          (s.prototype.publish = function (e) {
            this.isAdvertised || this.advertise(), this.ros.idCounter++;
            e = {
              op: "publish",
              id: "publish:" + this.name + ":" + this.ros.idCounter,
              topic: this.name,
              msg: e,
              latch: this.latch,
            };
            this.ros.callOnConnection(e);
          }),
          (t.exports = s);
      },
      { "./Message": 15, eventemitter2: 2 },
    ],
    23: [
      function (e, t, i) {
        var n = e("../mixin"),
          t = (t.exports = {
            Ros: e("./Ros"),
            Topic: e("./Topic"),
            Message: e("./Message"),
            Param: e("./Param"),
            Service: e("./Service"),
            ServiceRequest: e("./ServiceRequest"),
            ServiceResponse: e("./ServiceResponse"),
          });
        n(t.Ros, ["Param", "Service", "Topic"], t);
      },
      {
        "../mixin": 29,
        "./Message": 15,
        "./Param": 16,
        "./Ros": 17,
        "./Service": 18,
        "./ServiceRequest": 19,
        "./ServiceResponse": 20,
        "./Topic": 22,
      },
    ],
    24: [
      function (e, t, i) {
        var n = e("./Vector3"),
          r = e("./Quaternion");
        function s(e) {
          (this.position = new n((e = e || {}).position)),
            (this.orientation = new r(e.orientation));
        }
        (s.prototype.applyTransform = function (e) {
          this.position.multiplyQuaternion(e.rotation),
            this.position.add(e.translation);
          e = e.rotation.clone();
          e.multiply(this.orientation), (this.orientation = e);
        }),
          (s.prototype.clone = function () {
            return new s(this);
          }),
          (s.prototype.multiply = function (e) {
            e = e.clone();
            return (
              e.applyTransform({
                rotation: this.orientation,
                translation: this.position,
              }),
              e
            );
          }),
          (s.prototype.getInverse = function () {
            var e = this.clone();
            return (
              e.orientation.invert(),
              e.position.multiplyQuaternion(e.orientation),
              (e.position.x *= -1),
              (e.position.y *= -1),
              (e.position.z *= -1),
              e
            );
          }),
          (t.exports = s);
      },
      { "./Quaternion": 25, "./Vector3": 27 },
    ],
    25: [
      function (e, t, i) {
        function n(e) {
          (this.x = (e = e || {}).x || 0),
            (this.y = e.y || 0),
            (this.z = e.z || 0),
            (this.w = "number" == typeof e.w ? e.w : 1);
        }
        (n.prototype.conjugate = function () {
          (this.x *= -1), (this.y *= -1), (this.z *= -1);
        }),
          (n.prototype.norm = function () {
            return Math.sqrt(
              this.x * this.x +
                this.y * this.y +
                this.z * this.z +
                this.w * this.w
            );
          }),
          (n.prototype.normalize = function () {
            var e = Math.sqrt(
              this.x * this.x +
                this.y * this.y +
                this.z * this.z +
                this.w * this.w
            );
            0 === e
              ? ((this.x = 0), (this.y = 0), (this.z = 0), (this.w = 1))
              : ((this.x = this.x * (e = 1 / e)),
                (this.y = this.y * e),
                (this.z = this.z * e),
                (this.w = this.w * e));
          }),
          (n.prototype.invert = function () {
            this.conjugate(), this.normalize();
          }),
          (n.prototype.multiply = function (e) {
            var t = this.x * e.w + this.y * e.z - this.z * e.y + this.w * e.x,
              i = -this.x * e.z + this.y * e.w + this.z * e.x + this.w * e.y,
              n = this.x * e.y - this.y * e.x + this.z * e.w + this.w * e.z,
              e = -this.x * e.x - this.y * e.y - this.z * e.z + this.w * e.w;
            (this.x = t), (this.y = i), (this.z = n), (this.w = e);
          }),
          (n.prototype.clone = function () {
            return new n(this);
          }),
          (t.exports = n);
      },
      {},
    ],
    26: [
      function (e, t, i) {
        var n = e("./Vector3"),
          r = e("./Quaternion");
        function s(e) {
          (this.translation = new n((e = e || {}).translation)),
            (this.rotation = new r(e.rotation));
        }
        (s.prototype.clone = function () {
          return new s(this);
        }),
          (t.exports = s);
      },
      { "./Quaternion": 25, "./Vector3": 27 },
    ],
    27: [
      function (e, t, i) {
        function n(e) {
          (this.x = (e = e || {}).x || 0),
            (this.y = e.y || 0),
            (this.z = e.z || 0);
        }
        (n.prototype.add = function (e) {
          (this.x += e.x), (this.y += e.y), (this.z += e.z);
        }),
          (n.prototype.subtract = function (e) {
            (this.x -= e.x), (this.y -= e.y), (this.z -= e.z);
          }),
          (n.prototype.multiplyQuaternion = function (e) {
            var t = e.w * this.x + e.y * this.z - e.z * this.y,
              i = e.w * this.y + e.z * this.x - e.x * this.z,
              n = e.w * this.z + e.x * this.y - e.y * this.x,
              r = -e.x * this.x - e.y * this.y - e.z * this.z;
            (this.x = t * e.w + r * -e.x + i * -e.z - n * -e.y),
              (this.y = i * e.w + r * -e.y + n * -e.x - t * -e.z),
              (this.z = n * e.w + r * -e.z + t * -e.y - i * -e.x);
          }),
          (n.prototype.clone = function () {
            return new n(this);
          }),
          (t.exports = n);
      },
      {},
    ],
    28: [
      function (e, t, i) {
        t.exports = {
          Pose: e("./Pose"),
          Quaternion: e("./Quaternion"),
          Transform: e("./Transform"),
          Vector3: e("./Vector3"),
        };
      },
      { "./Pose": 24, "./Quaternion": 25, "./Transform": 26, "./Vector3": 27 },
    ],
    29: [
      function (e, t, i) {
        t.exports = function (i, e, n) {
          e.forEach(function (e) {
            var t = n[e];
            i.prototype[e] = function (e) {
              return (e.ros = this), new t(e);
            };
          });
        };
      },
      {},
    ],
    30: [
      function (e, t, i) {
        var n = e("../actionlib/ActionClient"),
          r = e("../actionlib/Goal"),
          s = e("../core/Service.js"),
          o = e("../core/ServiceRequest.js"),
          a = e("../core/Topic.js"),
          c = e("../math/Transform");
        function l(e) {
          (this.ros = (e = e || {}).ros),
            (this.fixedFrame = e.fixedFrame || "/base_link"),
            (this.angularThres = e.angularThres || 2),
            (this.transThres = e.transThres || 0.01),
            (this.rate = e.rate || 10),
            (this.updateDelay = e.updateDelay || 50);
          var t = e.topicTimeout || 2,
            i = Math.floor(t),
            t = Math.floor(1e9 * (t - i));
          (this.topicTimeout = { secs: i, nsecs: t }),
            (this.serverName = e.serverName || "/tf2_web_republisher"),
            (this.repubServiceName = e.repubServiceName || "/republish_tfs"),
            (this.currentGoal = !1),
            (this.currentTopic = !1),
            (this.frameInfos = {}),
            (this.republisherUpdateRequested = !1),
            (this._subscribeCB = null),
            (this._isDisposed = !1),
            (this.actionClient = new n({
              ros: e.ros,
              serverName: this.serverName,
              actionName: "tf2_web_republisher/TFSubscriptionAction",
              omitStatus: !0,
              omitResult: !0,
            })),
            (this.serviceClient = new s({
              ros: e.ros,
              name: this.repubServiceName,
              serviceType: "tf2_web_republisher/RepublishTFs",
            }));
        }
        (l.prototype.processTFArray = function (e) {
          e.transforms.forEach(function (e) {
            var t = e.child_frame_id,
              i = ("/" === t[0] && (t = t.substring(1)), this.frameInfos[t]);
            i &&
              ((i.transform = new c({
                translation: e.transform.translation,
                rotation: e.transform.rotation,
              })),
              i.cbs.forEach(function (e) {
                e(i.transform);
              }));
          }, this);
        }),
          (l.prototype.updateGoal = function () {
            var e = {
              source_frames: Object.keys(this.frameInfos),
              target_frame: this.fixedFrame,
              angular_thres: this.angularThres,
              trans_thres: this.transThres,
              rate: this.rate,
            };
            this.ros.groovyCompatibility
              ? (this.currentGoal && this.currentGoal.cancel(),
                (this.currentGoal = new r({
                  actionClient: this.actionClient,
                  goalMessage: e,
                })),
                this.currentGoal.on("feedback", this.processTFArray.bind(this)),
                this.currentGoal.send())
              : ((e.timeout = this.topicTimeout),
                (e = new o(e)),
                this.serviceClient.callService(
                  e,
                  this.processResponse.bind(this)
                )),
              (this.republisherUpdateRequested = !1);
          }),
          (l.prototype.processResponse = function (e) {
            this._isDisposed ||
              (this.currentTopic &&
                this.currentTopic.unsubscribe(this._subscribeCB),
              (this.currentTopic = new a({
                ros: this.ros,
                name: e.topic_name,
                messageType: "tf2_web_republisher/TFArray",
              })),
              (this._subscribeCB = this.processTFArray.bind(this)),
              this.currentTopic.subscribe(this._subscribeCB));
          }),
          (l.prototype.subscribe = function (e, t) {
            "/" === e[0] && (e = e.substring(1)),
              this.frameInfos[e]
                ? this.frameInfos[e].transform &&
                  t(this.frameInfos[e].transform)
                : ((this.frameInfos[e] = { cbs: [] }),
                  this.republisherUpdateRequested ||
                    (setTimeout(this.updateGoal.bind(this), this.updateDelay),
                    (this.republisherUpdateRequested = !0))),
              this.frameInfos[e].cbs.push(t);
          }),
          (l.prototype.unsubscribe = function (e, t) {
            "/" === e[0] && (e = e.substring(1));
            for (
              var i = this.frameInfos[e], n = (i && i.cbs) || [], r = n.length;
              r--;

            )
              n[r] === t && n.splice(r, 1);
            (t && 0 !== n.length) || delete this.frameInfos[e];
          }),
          (l.prototype.dispose = function () {
            (this._isDisposed = !0),
              this.actionClient.dispose(),
              this.currentTopic &&
                this.currentTopic.unsubscribe(this._subscribeCB);
          }),
          (t.exports = l);
      },
      {
        "../actionlib/ActionClient": 10,
        "../actionlib/Goal": 12,
        "../core/Service.js": 18,
        "../core/ServiceRequest.js": 19,
        "../core/Topic.js": 22,
        "../math/Transform": 26,
      },
    ],
    31: [
      function (e, t, i) {
        var n = e("../core/Ros");
        e("../mixin")(
          n,
          ["TFClient"],
          (t.exports = { TFClient: e("./TFClient") })
        );
      },
      { "../core/Ros": 17, "../mixin": 29, "./TFClient": 30 },
    ],
    32: [
      function (e, t, i) {
        var n = e("../math/Vector3"),
          r = e("./UrdfTypes");
        t.exports = function (e) {
          (this.dimension = null),
            (this.type = r.URDF_BOX),
            (e = e.xml.getAttribute("size").split(" ")),
            (this.dimension = new n({
              x: parseFloat(e[0]),
              y: parseFloat(e[1]),
              z: parseFloat(e[2]),
            }));
        };
      },
      { "../math/Vector3": 27, "./UrdfTypes": 41 },
    ],
    33: [
      function (e, t, i) {
        t.exports = function (e) {
          (e = e.xml.getAttribute("rgba").split(" ")),
            (this.r = parseFloat(e[0])),
            (this.g = parseFloat(e[1])),
            (this.b = parseFloat(e[2])),
            (this.a = parseFloat(e[3]));
        };
      },
      {},
    ],
    34: [
      function (e, t, i) {
        var n = e("./UrdfTypes");
        t.exports = function (e) {
          (this.type = n.URDF_CYLINDER),
            (this.length = parseFloat(e.xml.getAttribute("length"))),
            (this.radius = parseFloat(e.xml.getAttribute("radius")));
        };
      },
      { "./UrdfTypes": 41 },
    ],
    35: [
      function (e, t, i) {
        var c = e("../math/Pose"),
          l = e("../math/Vector3"),
          u = e("../math/Quaternion");
        t.exports = function (e) {
          (this.name = e.xml.getAttribute("name")),
            (this.type = e.xml.getAttribute("type"));
          var t,
            i,
            n,
            r,
            s,
            o,
            a = e.xml.getElementsByTagName("parent");
          0 < a.length && (this.parent = a[0].getAttribute("link")),
            0 < (a = e.xml.getElementsByTagName("child")).length &&
              (this.child = a[0].getAttribute("link")),
            0 < (a = e.xml.getElementsByTagName("limit")).length &&
              ((this.minval = parseFloat(a[0].getAttribute("lower"))),
              (this.maxval = parseFloat(a[0].getAttribute("upper")))),
            0 === (a = e.xml.getElementsByTagName("origin")).length
              ? (this.origin = new c())
              : ((e = a[0].getAttribute("xyz")),
                (t = new l()),
                e &&
                  ((e = e.split(" ")),
                  (t = new l({
                    x: parseFloat(e[0]),
                    y: parseFloat(e[1]),
                    z: parseFloat(e[2]),
                  }))),
                (e = a[0].getAttribute("rpy")),
                (a = new u()),
                e &&
                  ((e = e.split(" ")),
                  (o = parseFloat(e[0]) / 2),
                  (i = parseFloat(e[1]) / 2),
                  (e = parseFloat(e[2]) / 2),
                  (n =
                    Math.sin(o) * Math.cos(i) * Math.cos(e) -
                    Math.cos(o) * Math.sin(i) * Math.sin(e)),
                  (r =
                    Math.cos(o) * Math.sin(i) * Math.cos(e) +
                    Math.sin(o) * Math.cos(i) * Math.sin(e)),
                  (s =
                    Math.cos(o) * Math.cos(i) * Math.sin(e) -
                    Math.sin(o) * Math.sin(i) * Math.cos(e)),
                  (o =
                    Math.cos(o) * Math.cos(i) * Math.cos(e) +
                    Math.sin(o) * Math.sin(i) * Math.sin(e)),
                  (a = new u({ x: n, y: r, z: s, w: o })).normalize()),
                (this.origin = new c({ position: t, orientation: a })));
        };
      },
      { "../math/Pose": 24, "../math/Quaternion": 25, "../math/Vector3": 27 },
    ],
    36: [
      function (e, t, i) {
        var n = e("./UrdfVisual");
        t.exports = function (e) {
          (this.name = e.xml.getAttribute("name")), (this.visuals = []);
          for (
            var t = e.xml.getElementsByTagName("visual"), i = 0;
            i < t.length;
            i++
          )
            this.visuals.push(new n({ xml: t[i] }));
        };
      },
      { "./UrdfVisual": 42 },
    ],
    37: [
      function (e, t, i) {
        var n = e("./UrdfColor");
        function r(e) {
          (this.textureFilename = null),
            (this.color = null),
            (this.name = e.xml.getAttribute("name"));
          var t = e.xml.getElementsByTagName("texture"),
            t =
              (0 < t.length &&
                (this.textureFilename = t[0].getAttribute("filename")),
              e.xml.getElementsByTagName("color"));
          0 < t.length && (this.color = new n({ xml: t[0] }));
        }
        r.prototype.isLink = function () {
          return null === this.color && null === this.textureFilename;
        };
        var s = e("object-assign");
        (r.prototype.assign = function (e) {
          return s(this, e);
        }),
          (t.exports = r);
      },
      { "./UrdfColor": 33, "object-assign": 3 },
    ],
    38: [
      function (e, t, i) {
        var n = e("../math/Vector3"),
          r = e("./UrdfTypes");
        t.exports = function (e) {
          (this.scale = null),
            (this.type = r.URDF_MESH),
            (this.filename = e.xml.getAttribute("filename")),
            (e = e.xml.getAttribute("scale")) &&
              ((e = e.split(" ")),
              (this.scale = new n({
                x: parseFloat(e[0]),
                y: parseFloat(e[1]),
                z: parseFloat(e[2]),
              })));
        };
      },
      { "../math/Vector3": 27, "./UrdfTypes": 41 },
    ],
    39: [
      function (e, t, i) {
        var l = e("./UrdfMaterial"),
          u = e("./UrdfLink"),
          h = e("./UrdfJoint"),
          f = e("@xmldom/xmldom").DOMParser;
        t.exports = function (e) {
          var t = (e = e || {}).xml,
            e = e.string,
            e =
              ((this.materials = {}),
              (this.links = {}),
              (this.joints = {}),
              (t = e ? new f().parseFromString(e, "text/xml") : t)
                .documentElement);
          this.name = e.getAttribute("name");
          for (var i = e.childNodes, n = 0; n < i.length; n++) {
            var r = i[n];
            if ("material" === r.tagName) {
              var s = new l({ xml: r });
              void 0 !== this.materials[s.name]
                ? this.materials[s.name].isLink()
                  ? this.materials[s.name].assign(s)
                  : console.warn("Material " + s.name + "is not unique.")
                : (this.materials[s.name] = s);
            } else if ("link" === r.tagName) {
              var o = new u({ xml: r });
              if (void 0 !== this.links[o.name])
                console.warn("Link " + o.name + " is not unique.");
              else {
                for (var a = 0; a < o.visuals.length; a++) {
                  var c = o.visuals[a].material;
                  null !== c &&
                    c.name &&
                    (void 0 !== this.materials[c.name]
                      ? (o.visuals[a].material = this.materials[c.name])
                      : (this.materials[c.name] = c));
                }
                this.links[o.name] = o;
              }
            } else
              "joint" === r.tagName &&
                ((s = new h({ xml: r })), (this.joints[s.name] = s));
          }
        };
      },
      {
        "./UrdfJoint": 35,
        "./UrdfLink": 36,
        "./UrdfMaterial": 37,
        "@xmldom/xmldom": 45,
      },
    ],
    40: [
      function (e, t, i) {
        var n = e("./UrdfTypes");
        t.exports = function (e) {
          (this.type = n.URDF_SPHERE),
            (this.radius = parseFloat(e.xml.getAttribute("radius")));
        };
      },
      { "./UrdfTypes": 41 },
    ],
    41: [
      function (e, t, i) {
        t.exports = {
          URDF_SPHERE: 0,
          URDF_BOX: 1,
          URDF_CYLINDER: 2,
          URDF_MESH: 3,
        };
      },
      {},
    ],
    42: [
      function (e, t, i) {
        var p = e("../math/Pose"),
          m = e("../math/Vector3"),
          v = e("../math/Quaternion"),
          d = e("./UrdfCylinder"),
          y = e("./UrdfBox"),
          g = e("./UrdfMaterial"),
          b = e("./UrdfMesh"),
          w = e("./UrdfSphere");
        t.exports = function (e) {
          var t,
            i,
            n,
            r,
            s = e.xml;
          (this.origin = null),
            (this.geometry = null),
            (this.material = null),
            (this.name = e.xml.getAttribute("name"));
          0 === (e = s.getElementsByTagName("origin")).length
            ? (this.origin = new p())
            : ((h = e[0].getAttribute("xyz")),
              (t = new m()),
              h &&
                ((h = h.split(" ")),
                (t = new m({
                  x: parseFloat(h[0]),
                  y: parseFloat(h[1]),
                  z: parseFloat(h[2]),
                }))),
              (h = e[0].getAttribute("rpy")),
              (e = new v()),
              h &&
                ((h = h.split(" ")),
                (r = parseFloat(h[0]) / 2),
                (o = parseFloat(h[1]) / 2),
                (h = parseFloat(h[2]) / 2),
                (f =
                  Math.sin(r) * Math.cos(o) * Math.cos(h) -
                  Math.cos(r) * Math.sin(o) * Math.sin(h)),
                (i =
                  Math.cos(r) * Math.sin(o) * Math.cos(h) +
                  Math.sin(r) * Math.cos(o) * Math.sin(h)),
                (n =
                  Math.cos(r) * Math.cos(o) * Math.sin(h) -
                  Math.sin(r) * Math.sin(o) * Math.cos(h)),
                (r =
                  Math.cos(r) * Math.cos(o) * Math.cos(h) +
                  Math.sin(r) * Math.sin(o) * Math.sin(h)),
                (e = new v({ x: f, y: i, z: n, w: r })).normalize()),
              (this.origin = new p({ position: t, orientation: e })));
          var o = s.getElementsByTagName("geometry");
          if (0 < o.length) {
            for (var a = o[0], c = null, l = 0; l < a.childNodes.length; l++) {
              var u = a.childNodes[l];
              if (1 === u.nodeType) {
                c = u;
                break;
              }
            }
            var h = c.nodeName;
            "sphere" === h
              ? (this.geometry = new w({ xml: c }))
              : "box" === h
              ? (this.geometry = new y({ xml: c }))
              : "cylinder" === h
              ? (this.geometry = new d({ xml: c }))
              : "mesh" === h
              ? (this.geometry = new b({ xml: c }))
              : console.warn("Unknown geometry type " + h);
          }
          var f = s.getElementsByTagName("material");
          0 < f.length && (this.material = new g({ xml: f[0] }));
        };
      },
      {
        "../math/Pose": 24,
        "../math/Quaternion": 25,
        "../math/Vector3": 27,
        "./UrdfBox": 32,
        "./UrdfCylinder": 34,
        "./UrdfMaterial": 37,
        "./UrdfMesh": 38,
        "./UrdfSphere": 40,
      },
    ],
    43: [
      function (e, t, i) {
        t.exports = e("object-assign")(
          {
            UrdfBox: e("./UrdfBox"),
            UrdfColor: e("./UrdfColor"),
            UrdfCylinder: e("./UrdfCylinder"),
            UrdfLink: e("./UrdfLink"),
            UrdfMaterial: e("./UrdfMaterial"),
            UrdfMesh: e("./UrdfMesh"),
            UrdfModel: e("./UrdfModel"),
            UrdfSphere: e("./UrdfSphere"),
            UrdfVisual: e("./UrdfVisual"),
          },
          e("./UrdfTypes")
        );
      },
      {
        "./UrdfBox": 32,
        "./UrdfColor": 33,
        "./UrdfCylinder": 34,
        "./UrdfLink": 36,
        "./UrdfMaterial": 37,
        "./UrdfMesh": 38,
        "./UrdfModel": 39,
        "./UrdfSphere": 40,
        "./UrdfTypes": 41,
        "./UrdfVisual": 42,
        "object-assign": 3,
      },
    ],
    44: [
      function (e, t, i) {
        "use strict";
        var u = Math.pow(2, 32),
          n = !1;
        function h() {
          n ||
            ((n = !0),
            console.warn(
              "CBOR 64-bit integer array values may lose precision. No further warnings."
            ));
        }
        var r = {
            64: Uint8Array,
            69: Uint16Array,
            70: Uint32Array,
            72: Int8Array,
            77: Int16Array,
            78: Int32Array,
            85: Float32Array,
            86: Float64Array,
          },
          s = {
            71: function (e) {
              h();
              for (
                var t = e.byteLength,
                  i = e.byteOffset,
                  n = t / 8,
                  e = e.buffer.slice(i, i + t),
                  r = new Uint32Array(e),
                  s = new Array(n),
                  o = 0;
                o < n;
                o++
              ) {
                var a = 2 * o,
                  c = r[a],
                  a = r[1 + a];
                s[o] = c + u * a;
              }
              return s;
            },
            79: function (e) {
              h();
              for (
                var t = e.byteLength,
                  i = e.byteOffset,
                  n = t / 8,
                  e = e.buffer.slice(i, i + t),
                  r = new Uint32Array(e),
                  s = new Int32Array(e),
                  o = new Array(n),
                  a = 0;
                a < n;
                a++
              ) {
                var c = 2 * a,
                  l = r[c],
                  c = s[1 + c];
                o[a] = l + u * c;
              }
              return o;
            },
          };
        void 0 !== t &&
          t.exports &&
          (t.exports = function (e, t) {
            var i, n;
            return t in r
              ? ((i = e.byteLength),
                (n = e.byteOffset),
                new r[t](e.buffer.slice(n, n + i)))
              : t in s
              ? s[t](e)
              : e;
          });
      },
      {},
    ],
    45: [
      function (e, t, i) {
        (i.DOMImplementation = window.DOMImplementation),
          (i.XMLSerializer = window.XMLSerializer),
          (i.DOMParser = window.DOMParser);
      },
      {},
    ],
    46: [
      function (e, t, i) {
        t.exports = "undefined" != typeof window ? window.WebSocket : WebSocket;
      },
      {},
    ],
    47: [
      function (e, t, i) {
        t.exports = function () {
          return document.createElement("canvas");
        };
      },
      {},
    ],
    48: [
      function (e, t, i) {
        "use strict";
        var a = e("canvas"),
          n = a.Image || window.Image;
        t.exports = function (e, s) {
          var o = new n();
          (o.onload = function () {
            for (
              var e = new a(),
                t = e.getContext("2d"),
                i =
                  ((e.width = o.width),
                  (e.height = o.height),
                  (t.imageSmoothingEnabled = !1),
                  (t.webkitImageSmoothingEnabled = !1),
                  (t.mozImageSmoothingEnabled = !1),
                  t.drawImage(o, 0, 0),
                  t.getImageData(0, 0, o.width, o.height).data),
                n = "",
                r = 0;
              r < i.length;
              r += 4
            )
              n += String.fromCharCode(i[r], i[r + 1], i[r + 2]);
            s(JSON.parse(n));
          }),
            (o.src = "data:image/png;base64," + e);
        };
      },
      { canvas: 47 },
    ],
    49: [
      function (t, e, i) {
        try {
          var n = t("webworkify");
        } catch (e) {
          n = t("webworkify-webpack");
        }
        var r = t("./workerSocketImpl");
        function s(e) {
          (this.socket_ = n(r)),
            this.socket_.addEventListener(
              "message",
              this.handleWorkerMessage_.bind(this)
            ),
            this.socket_.postMessage({ uri: e });
        }
        (s.prototype.handleWorkerMessage_ = function (e) {
          var t = e.data;
          if (t instanceof ArrayBuffer || "string" == typeof t)
            this.onmessage(e);
          else {
            e = t.type;
            if ("close" === e) this.onclose(null);
            else if ("open" === e) this.onopen(null);
            else {
              if ("error" !== e) throw "Unknown message from workersocket";
              this.onerror(null);
            }
          }
        }),
          (s.prototype.send = function (e) {
            this.socket_.postMessage(e);
          }),
          (s.prototype.close = function () {
            this.socket_.postMessage({ close: !0 });
          }),
          (e.exports = s);
      },
      { "./workerSocketImpl": 50, webworkify: 7, "webworkify-webpack": 6 },
    ],
    50: [
      function (e, t, i) {
        var s = e("ws");
        t.exports = function (t) {
          var i = null;
          function n(e) {
            e = e.data;
            e instanceof ArrayBuffer ? t.postMessage(e, [e]) : t.postMessage(e);
          }
          function r(e) {
            t.postMessage({ type: e.type });
          }
          t.addEventListener("message", function (e) {
            e = e.data;
            if ("string" == typeof e) i.send(e);
            else if (e.hasOwnProperty("close")) i.close(), (i = null);
            else {
              if (!e.hasOwnProperty("uri"))
                throw "Unknown message to WorkerSocket";
              e = e.uri;
              ((i = new s(e)).binaryType = "arraybuffer"),
                (i.onmessage = n),
                (i.onclose = r),
                (i.onopen = r),
                (i.onerror = r);
            }
          });
        };
      },
      { ws: 46 },
    ],
  },
  {},
  [9]
);
