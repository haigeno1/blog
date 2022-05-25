// 参考 https://github.com/mqyqingfeng/Blog/issues/42
// 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。每当函数被调用时，它仅仅接收一个参数并且返回带有一个参数的函数，直到传递完所有的参数。
// 第二版
function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}
// function partial(func, ...argsBound) {
//     return function(...args) {
//       return func.call(this, ...argsBound, ...args);
//     };
// }
function curry(fn, length) {
  length = length || fn.length;
  var slice = Array.prototype.slice;
  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments));
      return curry(partial.apply(this, combined), length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// 不使用partial
function curry(fn, ...args) {
  var length = fn.length;
  args = args || [];
  return function () {
    var _args = args.slice(0),
      arg,
      i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}

// 第三版
// 增加占位符
function curry(fn, args, holes) {
  length = fn.length;

  args = args || [];

  holes = holes || [];
  console.log("args, holes...", args, holes);
  debugger;
  return function () {
    var _args = args.slice(0),
      _holes = holes.slice(0),
      argsLen = args.length,
      holesLen = holes.length,
      arg,
      i,
      index = 0;

    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      // 处理类似 fn(1, _, _, 4)(_, 3) 这种情况，index 需要指向 holes 正确的下标
      if (arg === _ && holesLen) {
        index++;
        if (index > holesLen) {
          _args.push(arg);
          _holes.push(argsLen - 1 + index - holesLen);
        }
      }
      // 处理类似 fn(1)(_) 这种情况
      else if (arg === _) {
        _args.push(arg);
        _holes.push(argsLen + i);
      }
      // 处理类似 fn(_, 2)(1) 这种情况
      else if (holesLen) {
        // fn(_, 2)(_, 3)
        if (index >= holesLen) {
          _args.push(arg);
        }
        // fn(_, 2)(1) 用参数 1 替换占位符
        else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1);
        }
      } else {
        _args.push(arg);
      }
    }
    if (_holes.length || _args.length < length) {
      return curry.call(this, fn, _args, _holes);
    } else {
      return fn.apply(this, _args);
    }
  };
}

var _ = {};

var fn = curry(function (a, b, c, d, e) {
  console.log([a, b, c, d, e]);
});

// 验证 输出全部都是 [1, 2, 3, 4, 5]
// fn(1, 2, 3, 4, 5);
// fn(_, 2, 3, 4, 5)(1);
// fn(1, _, 3, 4, 5)(2);
// fn(1, _, 3)(_, 4)(2)(5);
// fn(1, _, _, 4)(_, 3)(2)(5);
// fn(_, 2)(_, _, 4)(1)(3)(5)

// 偏函数 (Partial application)
// 对原始函数预设参数作为一个新的函数。是指固定一个函数的一些参数，然后产生另一个更小元的函数。
var _ = {};
function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var position = 0,
      len = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while (position < arguments.length) args.push(arguments[position++]);
    return fn.apply(this, args);
  };
}

// var subtract = function(a, b) { return b - a; };
// subFrom20 = partial(subtract, _, 20);
// subFrom20(5);

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

// compose函数组合

const _pipe = (f, g) => (...args) => f(g(...args))
const compose = (...fns) => fns.reduce(_pipe)

// const _pipe = (f, g) => (...args) => g.call(null, f.apply(null, args))
// const compose = (...fns) => fns.reverse().reduce(_pipe)

// const _pipe = (f, g) => (...args) => g(f(...args))
// const compose = (...fns) => fns.reverse().reduce(_pipe)

function compose(...fns) {
  var start = fns.length - 1;
  return function () {
    var i = start;
    var result = fns[start].apply(this, arguments);
    while (i--) result = fns[i].call(this, result);
    return result;
  };
}

// test
// function f1(a, b) { return a + b }
// function f2(a) { return 2 * a }
// function f3(a) { return a * a }
// // let f = compose(f1, f2, f3)
// let f = compose(f3, f2, f1)
// console.log(f(1, 2)) // 36



// debounce 防抖:触发完事件 n 秒内不再触发事件才执行
// 第一版
function debounce(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// 将 this 指向正确的对象, event 对象
// 第三版
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

// 立刻执行， 立即取消
// 第六版
function debounce(func, wait, immediate) {
  var timeout, result;
  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}

// throttle 节流：持续触发事件，每隔一段时间，只执行一次事件
// 使用时间戳,事件会立刻执行,事件停止触发后没有办法再执行事件
function throttle(func, wait) {
  var context, args;
  var previous = 0;
  return function () {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}

// 设置定时器,事件会在 n 秒后第一次执行,事件停止触发后依然会再执行一次
function throttle(func, wait) {
  var timeout;
  return function (...args) {
    context = this;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

// 鼠标移入能立刻执行，停止触发的时候还能再执行一次
// 第三版
function throttle(func, wait) {
  var timeout, context, args, result;
  var previous = 0;
  var later = function () {
    previous = +new Date();
    timeout = null;
    func.apply(context, args);
  };
  var throttled = function () {
    var now = +new Date();
    //下次触发 func 剩余的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}

// 增加leading，trailing，cancel。
// leading：false 和 trailing: false 不能同时设置。
// 第四版
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };
  var throttled = function () {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };
  return throttled;
}



// lodash-es版
import isObject from './isObject.js';
import now from './now.js';
import toNumber from './toNumber.js';

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}









// 如何写出一个惊艳面试官的深拷贝?
// https://juejin.cn/post/6844903929705136141
function deepClone(p, c) {
  // c和p都是对象
  c = c || {};
  for (let i in p) {
    if (p.hasOwnProperty[i]) {
      // 排除继承属性
      if (typeof p[i] === "object") {
        // 解决引用类型
        c[i] = Array.isArray(p[i]) ? [] : {};
        deepCopy[(p[i], c[i])];
      } else {
        c[i] = p[i];
      }
    }
  }
  return c;
}

// nice
function deepClone(target) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
// 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
// WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
// let obj = { name : 'ConardLi'}
// const target = new WeakMap();
// target.set(obj,'code秘密花园');
// obj = null;
// 如果是WeakMap的话，target和obj存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

function deepClone(target, map = new WeakMap()) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// 最终版 https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

// 关系型数组转换成树形结构对象
function arrToTree(arr, pid = null) {
  let result = [];
  arr.forEach((item) => {
    if (item.parent === pid) {
      const children = arrToTree(arr, item.id);
      if (children.length > 0) {
        result.push({ ...item, children });
      } else {
        result.push({ ...item });
      }
    }
  });
  return result;
}
var obj = [
  { id: 3, parent: 2 },
  { id: 1, parent: null },
  { id: 2, parent: 1 },
];
arrToTree(obj);

// 数组全排列

function permutate(arr) {
  let res = arr[0].slice();
  for (let i = 1; i < arr.length; i++) {
    const pre = res.slice();
    res = [];
    pre.forEach((item) => {
      arr[i].forEach((curr) => {
        res.push(item + curr);
      });
    });
  }
  return res;
}
// permutate([
//   ["1", "2"],
//   ["3", "4", "5"],
// ]);
// [["1","3"],["1","4"],["1","5"],["2","3"],["2","4"],["2","5"]]

// 判断对象是否有环
function hasLoop(obj) {
  // 判断对象内部是否有和源相同的属性
  function findLoop(target, src) {
    // 源数组，并将自身传入
    // 添加的操作在这里
    const source = src.slice().concat([target]);

    for (const key in target) {
      // 如果是对象才需要判断
      if (typeof target[key] === "object") {
        // 如果在源数组中找到
        const res1 = source.indexOf(target[key]) > -1;
        if (res1) {
          return true;
        }
        // 递归查找内部属性找到相同
        const res2 = findLoop(target[key], source);
        if (res2) {
          return true;
        }
        // 合并简写
        // if (source.indexOf(target[key]) > -1 || findLoop(target[key], source)) {
        //     return true
        // }
      }
    }
    return false;
  }
  // 如果传入值是对象，则执行判断，否则返回false
  return typeof obj === "object" ? findLoop(obj, []) : false;
}


function hsaCycle(obj, objAry) {
  var objAry = objAry || [obj];
  var flag = false;
  for (var name in obj) {
    if (typeof obj[name] == "object" && obj[name] != null) {
      if (objAry.indexOf(obj[name]) != -1) {
        flag = true;
        break;
      } else {
        // 先push 后pop  添加的操作在这里
        objAry.push(obj[name]);
        flag = hsaCycle(obj[name], objAry);
        if (flag == true) {
          break;
        }
        objAry.pop();
      }
    }
  }
  return flag;
}


let tmp = { age: 18 };
let src = {
  a: 1,
  b: { bb: "bb" },
  // c: [3, 33, { cc: 333 }],
  d: tmp,
  e: tmp,
};
// src.f = src.b
// src.g = src  // loop1 res1===true
src.b.bbb = src.b; // loop2 res1===true 且 res2===true

console.log(hasLoop(src));
