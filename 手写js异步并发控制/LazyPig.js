// 评测题目2: 实现一个LazyPig，可以按照以下方式调用:
/* LazyPig("Peggy")输出:
Hello，I'm Peggy！
 
LazyPig("Peggy").sleep(10).eat("dinner")输出
Hello，I'm Peggy！
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyPig("Peggy").eat("dinner").eat("supper")输出
Hello，I'm Peggy！
Eat dinner~
Eat supper~
 
以此类推。
*/

// 利用promise
function LazyPig(v) {
  return new F(v)
}
function F(v) {
  console.log(`Hello，I'm ${v}！`)
  this.tmp = Promise.resolve()
}
F.prototype = {
  sleep(t) {
    this.tmp = this.tmp.then(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, t * 1000)
        })
    )
    return this
  },
  eat(v) {
    this.tmp = this.tmp.then(() => {
      console.log(`Eat ${v}`)
    })
    return this
  },
}
LazyPig("Peggy").sleep(3).eat("dinner").sleep(1).eat("supper")

// 手动构建任务数组
function LazyPig(name) {
  return new Lazy(name)
}
function Lazy(name) {
  this.name = name
  this.task = []
  console.log("Hi, 我是" + name)
  let _this = this
  let fn = (function () {
    return function () {
      _this.next()
    }
  })()
  this.task.push(fn)
  setTimeout(() => {
    _this.next()
  }, 0)
}
Lazy.prototype = {
  next: function () {
    var fn = this.task.shift()
    fn && fn()
  },
  sleep: function (time) {
    let _this = this
    let fn = (function (time) {
      return function () {
        setTimeout(() => {
          console.log(_this.name + " Wake up !")
          _this.next()
        }, time * 1000)
      }
    })(time)
    this.task.push(fn)
    return this
  },
  eat: function (smt) {
    let _this = this
    let fn = (function (smt) {
      return function () {
        console.log(_this.name + " is eating " + smt)
        _this.next()
      }
    })(smt)
    this.task.push(fn)
    return this
  },
}
LazyPig("Peggy").sleep(3).eat("dinner").sleep(1).eat("supper")

// 用while同步阻塞
function LazyPig(name) {
  console.log(`Hello,I'm ${name}`)
  var fn = {}
  fn.sleep = function (time) {
    console.log(`Wake up ${time}s`)
    let start = Date.now()
    while (Date.now() - start <= time * 1000) { }
    console.log(`Wake up down`)
    return fn
  }
  fn.eat = function (food) {
    console.log(`Eat ${food}`)
    return fn
  }
  return fn
}
LazyPig("Peggy").sleep(3).eat("dinner").sleep(1).eat("supper")

function LazyPig(name) {
  console.log(`Hello, I\'m ${name}！`)
  var arr = new Array()
  var isRec = false
  var isSteep = false
  this.sleep = function (n) {
    isSteep = true
    arr.push({
      fun: "sleep",
      val: n,
    })
    if (!isRec) {
      recursive()
    }
    return this
  }
  this.eat = function (input) {
    if (isSteep) {
      arr.push({
        fun: "eat",
        val: input,
      })
    } else {
      _eat(input)
    }
    return this
  }
  function _eat(input) {
    console.log(`Eat ${input}`)
  }
  function recursive() {
    isRec = true
    if (!!arr) {
      var obj = arr.shift()
      if (!obj) return
      if (obj.fun === "sleep") {
        console.log(`Wake up after  ${obj.val}`)
        setTimeout(function () {
          recursive()
        }, obj.val * 1000)
      } else {
        _eat(obj.val)
        recursive()
      }
    }
  }
  return this
}
LazyPig("Peggy").sleep(3).eat("dinner").sleep(1).eat("supper")

