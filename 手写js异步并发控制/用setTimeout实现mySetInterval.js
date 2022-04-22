// 1.1 使用setTimeout实现一个mySetInterval;
// https://juejin.cn/post/6844903839934447629


// var id // id必须在外面，因为里面return的是一个数字 且不会更新
// function mySetInterval(callback, t) {
//   // f递归调用f，而不是 mySetInterval 递归
//   function f() {
//     callback()
//     id = setTimeout(f, t)
//   }
//   id = setTimeout(f, t)
//   // 这个return的数字只是第一次的timeoutID 没什么用
//   // return id
// }



// var id = 1
// var obj = {} // 调用多次mySetInterval时区分每个
// function mySetInterval(callback, t) {
//   id++
//   function f() {
//     callback()
//     obj[id] = setTimeout(f, t)
//   }
//   obj[id] = setTimeout(f, t)
//   // id变成了 1 2 3 这样的固定的数字 每个 mySetInterval 唯一 通过全局 obj[id] 取真实的 timeoutID
//   return id
// }


// 这样就不用全局变量了 mySetInterval只被调用1次 里面的函数f递归自己
// 整体感觉这种方式比下面的方式更好 mySetInterval调用一次好于 mySetInterval递归自己
function mySetInterval(callback, t) {
  var res = {} // 写到参数里也可以
  function f() {
    callback()
    res.id = setTimeout(f, t)
  }
  res.id = setTimeout(f, t)
  return res
}


// 此方法完全ok mySetInterval递归自己 里面没有多余的辅助函数 且没有多余的全局变量挺香的
// 且这种情况似乎不能改成全局变量的形式 因为mySetInterval递归自己没法区分不同的mySetInterval调用
function mySetInterval(callback, t, res = {}) {
  res.id = setTimeout(() => {
    callback()
    mySetInterval(callback, t, res)
  }, t)
  return res
}

// wrong 尝试改为全局变量发现不行
// var xx = {}
// function mySetInterval(callback, t ) {
//   xx.id = setTimeout(() => {
//     callback()
//     mySetInterval(callback, t)
//   }, t)
//   return xx
// }



// 1.2 实现一个myClearInterval,可以终止一个mySetInterval的执行;
// 提示：使用clearTimeout
// function myClearInterval(timer) {
//   clearTimeout(obj[timer])
// }

function myClearInterval(obj) {
  clearTimeout(obj.id)
}

// usage:
const timer = mySetInterval(() => {
  console.log("x")
}, 1000)

setTimeout(() => myClearInterval(timer), 5100)


