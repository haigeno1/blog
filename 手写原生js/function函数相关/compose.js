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