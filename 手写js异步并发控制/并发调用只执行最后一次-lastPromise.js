
// 3
// 业务需求中，经常有 只需要最后一次请求的结果（比如搜索）编写一个高阶函数，传递旧请求方法（执行后返回 promise），返回一个新方法。
// 连续触发时，若上一次 promise 执行未结束则直接废弃，只有最后一次 promise 会触发then/reject。

/**
 * 只有最后一次promise会then与reject
 * @param {function} promiseFunction
 * promiseFunction 示例： () => fetch('data')
 */

function lastPromise(promiseFunction) {
  var queue = []
  return function f() {
    const fun = promiseFunction()
    queue.push(fun)
    return new Promise((resolve) => {
      // 下面似乎有问题？？总是为true
      if (queue.indexOf(fun) === queue.length - 1) {
        resolve(fun)
      }
    })
  }
}

// 示例
let count = 1
let promiseFunction = () =>
  new Promise((rs) =>
    window.setTimeout(() => {
      rs(count++)
    })
  )

let lastFn = lastPromise(promiseFunction)

lastFn().then(console.log) // 无输出
lastFn().then(console.log) // 无输出
lastFn().then(console.log) // 3





// https://github.com/slorber/awesome-only-resolves-last-promise
function createImperativePromise(promiseArg) {
  var resolve = null
  var reject = null
  var wrappedPromise = new Promise(function (_resolve, _reject) {
    resolve = _resolve
    reject = _reject
  })
  promiseArg &&
    promiseArg.then(
      function (val) {
        resolve && resolve(val)
      },
      function (error) {
        reject && reject(error)
      }
    )
  return {
    promise: wrappedPromise,
    resolve: function (value) {
      resolve && resolve(value)
    },
    reject: function (reason) {
      reject && reject(reason)
    },
    cancel: function () {
      resolve = null
      reject = null
    },
  }
}

// see https://stackoverflow.com/a/54825370/82609
function onlyResolvesLast(asyncFunction) {
  var cancelPrevious = null
  return function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    cancelPrevious && cancelPrevious()
    var initialPromise = asyncFunction.apply(void 0, args)
    var _a = createImperativePromise(initialPromise),
      promise = _a.promise,
      cancel = _a.cancel
    cancelPrevious = cancel
    return promise
  }
}
let count = 1
let promiseFunction = () =>
  new Promise((rs) =>
    window.setTimeout(() => {
      rs(count++)
    })
  )
let lastFn = onlyResolvesLast(promiseFunction)
lastFn().then(console.log) // 无输出
lastFn().then(console.log) // 无输出
lastFn().then(console.log) // 3

  // const delayPromise = (timeout: number) =>
  // new Promise(resolve => {
  //   setTimeout(resolve, timeout);
  // });
  //   const asyncFunction = async (arg: number, arg2: string) => {
  //   await delayPromise(delay);
  //   return `val ${arg} ${arg2}`;
  // };
  // const wrappedAsyncFunction = onlyResolvesLast(asyncFunction);
  // // When
  // const promise1 = wrappedAsyncFunction(1, '1');
  // const promise2 = wrappedAsyncFunction(2, '2');
  // const promise3 = wrappedAsyncFunction(3, '3');


