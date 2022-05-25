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