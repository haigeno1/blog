// 惰性函数
var foo = (function () {
  var t;
  return function () {
    if (t) return t;
    t = new Date();
    return t;
  };
})();

function foo() {
  if (foo.t) return foo.t;
  foo.t = new Date();
  return foo.t;
}

// 惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。
var foo = function () {
  var t = new Date();
  foo = function () {
    return t;
  };
  return foo();
};

var foo = (function () {
  var t = new Date();
  return function () {
    return t;
  };
})();




// 函数记忆是指将上次的计算结果缓存起来，当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据。
// 第一版
function memoize(f) {
  var cache = {};
  return function () {
    var key = arguments.length + Array.prototype.join.call(arguments, ",");
    if (key in cache) {
      return cache[key];
    } else {
      return (cache[key] = f.apply(this, arguments));
    }
  };
}

// 第二版 (来自 underscore 的实现)
var memoize = function (func, hasher) {
  var memoize = function (key) {
    var cache = memoize.cache;
    var address = "" + (hasher ? hasher.apply(this, arguments) : key);
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments);
    }
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
};

