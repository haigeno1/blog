// 1.1 使用setTimeout实现一个mySetInterval;
// https://juejin.cn/post/6844903839934447629
function mySetInterval(callback, t) {
  callback()
  setTimeout(() => mySetInterval(callback, t), t)
}

var id
function mySetInterval(callback, t) {
  // callback()
  // setTimeout(()=>mySetInterval(callback, t), t)

  // function f() {
  //   callback()
  //   setTimeout(f,t)
  // }
  // setTimeout(f, t)

  function f() {
    callback()
    id = setTimeout(f, t)
  }
  id = setTimeout(f, t)
  return id
}

var id = 1
var obj = {}
function mySetInterval(callback, t) {
  // callback()
  // setTimeout(()=>mySetInterval(callback, t), t)

  // function f() {
  //   callback()
  //   setTimeout(f,t)
  // }
  // setTimeout(f, t)

  // var id
  id++
  function f() {
    callback()
    obj[id] = setTimeout(f, t)
  }
  obj[id] = setTimeout(f, t)
  return id
}

// 使下面的调用每1000毫秒打印字符串'x'
mySetInterval(() => {
  console.log("x")
}, 1000)

// 1.2 实现一个myClearInterval,可以终止一个mySetInterval的执行;
// 提示：使用clearTimeout
function myClearInterval(timer) {
  clearTimeout(obj[timer])
}

// usage:
const timer = mySetInterval(() => {
  console.log("x")
}, 1000)

myClearInterval(timer)


