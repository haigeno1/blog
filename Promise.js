// 代码来源于https://github.com/xieranmaya/Promise3
// 测试 npm install -g promises-aplus-tests
// promises-aplus-tests ./Promise3.js

var Promise = (function () {
  function Promise(resolver) {
    if (typeof resolver !== "function") {
      throw new TypeError("Promise resolver " + resolver + " is not a function")
    }
    if (!(this instanceof Promise)) return new Promise(resolver)

    var self = this
    self.callbacks = []
    self.status = "pending"

    function resolve(value) {
      setTimeout(function () {
        if (self.status !== "pending") {
          return
        }
        self.status = "resolved"
        self.data = value

        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onResolved(value)
        }
      })
    }

    function reject(reason) {
      setTimeout(function () {
        if (self.status !== "pending") {
          return
        }
        self.status = "rejected"
        self.data = reason

        for (var i = 0; i < self.callbacks.length; i++) {
          self.callbacks[i].onRejected(reason)
        }
      })
    }

    try {
      resolver(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  function resolvePromise(promise, x, resolve, reject) {
    var then
    var thenCalledOrThrow = false

    if (promise === x) {
      return reject(new TypeError("Chaining cycle detected for promise!"))
    }

    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      try {
        then = x.then
        if (typeof then === "function") {
          then.call(
            x,
            function rs(y) {
              if (thenCalledOrThrow) return
              thenCalledOrThrow = true
              return resolvePromise(promise, y, resolve, reject)
            },
            function rj(r) {
              if (thenCalledOrThrow) return
              thenCalledOrThrow = true
              return reject(r)
            }
          )
        } else {
          return resolve(x)
        }
      } catch (e) {
        if (thenCalledOrThrow) return
        thenCalledOrThrow = true
        return reject(e)
      }
    } else {
      return resolve(x)
    }
  }

  Promise.prototype.then = function (onResolved, onRejected) {
    onResolved =
      typeof onResolved === "function"
        ? onResolved
        : function (v) {
            return v
          }
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : function (r) {
            throw r
          }
    var self = this
    var promise2

    if (self.status === "resolved") {
      return (promise2 = new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var x = onResolved(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            return reject(e)
          }
        })
      }))
    }

    if (self.status === "rejected") {
      return (promise2 = new Promise(function (resolve, reject) {
        setTimeout(function () {
          try {
            var x = onRejected(self.data)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            return reject(e)
          }
        })
      }))
    }

    if (self.status === "pending") {
      return (promise2 = new Promise(function (resolve, reject) {
        self.callbacks.push({
          onResolved: function (value) {
            try {
              var x = onResolved(value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              return reject(e)
            }
          },
          onRejected: function (reason) {
            try {
              var x = onRejected(reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              return reject(e)
            }
          },
        })
      }))
    }
  }

  Promise.prototype.valueOf = function () {
    return this.data
  }

  Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
  }

  Promise.prototype.finally = function (fn) {
    // 为什么这里可以呢，因为所有的then调用是一起的，但是这个then里调用fn又异步了一次，所以它总是最后调用的。
    // 当然这里只能保证在已添加的函数里是最后一次，不过这也是必然。
    // 不过看起来比其它的实现要简单以及容易理解的多。
    // 貌似对finally的行为没有一个公认的定义，所以这个实现目前是跟Q保持一致，会返回一个新的Promise而不是原来那个。
    return this.then(
      function (v) {
        setTimeout(fn)
        return v
      },
      function (r) {
        setTimeout(fn)
        throw r
      }
    )
  }

  Promise.prototype.spread = function (fn, onRejected) {
    return this.then(function (values) {
      return fn.apply(null, values)
    }, onRejected)
  }

  Promise.prototype.inject = function (fn, onRejected) {
    return this.then(function (v) {
      return fn.apply(
        null,
        fn
          .toString()
          .match(/\((.*?)\)/)[1]
          .split(",")
          .map(function (key) {
            return v[key]
          })
      )
    }, onRejected)
  }

  Promise.prototype.delay = function (duration) {
    return this.then(
      function (value) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve(value)
          }, duration)
        })
      },
      function (reason) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(reason)
          }, duration)
        })
      }
    )
  }

  Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
      var resolvedCounter = 0
      var promiseNum = promises.length
      var resolvedValues = new Array(promiseNum)
      for (var i = 0; i < promiseNum; i++) {
        ;(function (i) {
          Promise.resolve(promises[i]).then(
            function (value) {
              resolvedCounter++
              resolvedValues[i] = value
              if (resolvedCounter == promiseNum) {
                return resolve(resolvedValues)
              }
            },
            function (reason) {
              return reject(reason)
            }
          )
        })(i)
      }
    })
  }

  Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          function (value) {
            return resolve(value)
          },
          function (reason) {
            return reject(reason)
          }
        )
      }
    })
  }

  //   Promise.allSettled 的规则是这样：
  // 所有 Promise 的状态都变化了，那么新返回一个状态是 fulfilled 的 Promise，且它的值是一个数组，数组的每项由所有 Promise 的值和状态组成的对象；
  // 如果有一个是 pending 的 Promise，则返回一个状态是 pending 的新实例；
  Promise.allSettled = function(promiseArr) {
    let result = []
        
    return new Promise((resolve, reject) => {
        promiseArr.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                result.push({
                    status: 'fulfilled',
                    value: val
                })
                if (result.length === promiseArr.length) {
                    resolve(result) 
                }
            }, err => {
                result.push({
                    status: 'rejected',
                    reason: err
                })
                if (result.length === promiseArr.length) {
                    resolve(result) 
                }
            })
        })  
    })   
  }
  // Promise.any 的规则是这样：
  // 空数组或者所有 Promise 都是 rejected，则返回状态是 rejected 的新 Promsie，且值为 AggregateError 的错误；
  // 只要有一个是 fulfilled 状态的，则返回第一个是 fulfilled 的新实例；
  // 其他情况都会返回一个 pending 的新实例；
  // 作者：大海我来了
  // 链接：https://juejin.cn/post/6946022649768181774
  Promise.any = function(promiseArr) {
    let index = 0
    return new Promise((resolve, reject) => {
        if (promiseArr.length === 0) return 
        promiseArr.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                resolve(val)
            }, err => {
                index++
                if (index === promiseArr.length) {
                  reject(new AggregateError('All promises were rejected'))
                }
            })
        })
    })
  }

  Promise.resolve = function (value) {
    var promise = new Promise(function (resolve, reject) {
      resolvePromise(promise, value, resolve, reject)
    })
    return promise
  }

  Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
      reject(reason)
    })
  }

  Promise.fcall = function (fn) {
    // 虽然fn可以接收到上一层then里传来的参数，但是其实是undefined，所以跟没有是一样的，因为resolve没参数啊
    return Promise.resolve().then(fn)
  }

  Promise.done = Promise.stop = function () {
    return new Promise(function () {})
  }

  Promise.deferred = Promise.defer = function () {
    var dfd = {}
    dfd.promise = new Promise(function (resolve, reject) {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }

  try {
    // CommonJS compliance
    module.exports = Promise
  } catch (e) {}

  return Promise
})()

// https://juejin.im/post/5cd113f7f265da03b57b6dd6

// class PromiseA {
//   constructor(init) {
//     this.PromiseStatus = 'pending';
//     var resolve=(val)=>{
//         if(this.resolveCallback){
//             this.PromiseStatus="fulfilled"
//             this.resolveCallback(val);
//         }
//     }
//     if(init){
//         init(resolve,reject);
//     }
//   }
//   then(onFulfill,onReject) {
//     this.resolveCallback=onFulfill;
//     this.rejectCallback=onReject;
//     return this;
//   }
// }

// new PromiseA(function (resolve){
//   setTimeout(function (){
//       resolve("hello,from promise 1");
//   },2000)
// }).then(function (msg){
//     console.log(msg);
// })

// 简版promise
function Promise(callback) {
  const pending = "pending"
  const fulfilled = "fulfilled"
  const rejected = "rejected"
  // 当前状态
  this.state = pending
  // 当前值
  this.value = null
  // 失败原因
  this.reason = null
  // 成功和失败数组对象
  this.fulfilledCallback = []
  this.rejectedCallback = []

  // 成功处理
  this.resolve = (data) => {
    setTimeout(() => {
      if (this.state == pending) {
        this.state = fulfilled
        this.value = data
        this.fulfilledCallback.map((fn) => fn(this.value))
      }
    })
  }
  // 失败处理
  this.reject = (reason) => {
    setTimeout(() => {
      if (this.state == pending) {
        this.state = rejected
        this.reason = reason
        this.rejectedCallback.map((fn) => fn(this.reason))
      }
    })
  }
  // 捕获成功和失败，扔到成功和失败数组
  this.then = function (succesFn, errorFn) {
    this.fulfilledCallback.push(succesFn)
    this.rejectedCallback.push(errorFn)
  }
  // 捕获异常，直接扔到异常数组中
  this.catch = (errorFn) => {
    this.rejectedCallback.push(errorFn)
  }
  // 默认需要执行一次resolve和reject
  callback(this.resolve, this.reject)
}

// 验证结果
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10)
  }, 1000)
}).then(
  (data) => {
    console.log(data)
  },
  (error) => {
    console.log(error)
  }
)
