

// 主题：:限制最多同时异步并发请求数
// 是需要耗费额外空间slice原数组然后一个个shift 还是用全局index剩下额外的空间。是需要count还是根本就不需要关注这些自然会保持最高并发数。是一下子处理完原数组所有值还是没用到的暂时不处理。是否需要以及如何获得与原数组一一对应的结果数组。是否递归实质上都需要递归。是async还是纯promise。





// 15 行代码实现通用并发控制（javascript）
/**
 * @params list {Array} - 要迭代的数组
 * @params limit {Number} - 并发数量控制数
 * @params asyncHandle {Function} - 对`list`的每一个项的处理函数，参数为当前处理项，必须 return 一个Promise来确定是否继续进行迭代
 * @return {Promise} - 返回一个 Promise 值来确认所有数据是否迭代完成
 */

 let mapLimit = (list, limit, asyncHandle) => {
  let recursion = (arr) => {
    // shift代替全局index
    return asyncHandle(arr.shift()).then(() => {
      if (arr.length !== 0) return recursion(arr)
      // 数组还未迭代完，递归继续进行迭代,
      // 最终会打印finish次数为limit次
      else return "finish"
    })
  }

  let listCopy = [].concat(list)
  let asyncList = [] // 正在进行的所有并发异步操作,也保留了最终的结果
  while (limit--) {
    asyncList.push(recursion(listCopy))
  }
}

// test demo
var dataLists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 100, 123]
var count = 0
mapLimit(dataLists, 3, (curItem) => {
  return new Promise((resolve) => {
    count++
    setTimeout(() => {
      console.log(curItem, "当前并发量:", count--)
      resolve()
    }, Math.random() * 5000)
  })
})



// nice
// https://codepen.io/shanyue/pen/zYwZXPN?editors=1011
// 用currentIndex代替额外的数组shift
function pMap(list, mapper, concurrency = Infinity) {
  // list 为 Iterator，先转化为 Array
  list = Array.from(list)
  return new Promise((resolve, reject) => {
    let currentIndex = 0
    let result = []
    let resolveCount = 0
    let len = list.length
    function next() {
      const index = currentIndex
      currentIndex++
      Promise.resolve(list[index]).then(o => mapper(o, index)).then(o => {
        result[index] = o
        resolveCount++
        if (resolveCount === len) { resolve(result) }
        if (currentIndex < len) { next() }
      })
    }
    for (let i = 0; i < concurrency && i < len; i++) {
      next()
    }
  })
}

const sleep = (value = -1, seconds) => new Promise(resolve => setTimeout(() => resolve(value), seconds))
// const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds))


const now = Date.now()
console.log('Start')
pMap([1, 1, 1], x => sleep(x * 1000)).then(o => {
  console.log(o)
  console.log(Date.now() - now, 'seconds')
})

pMap([1, 2, 3], x => x * 3).then(o => console.log(o))



// https://blog.csdn.net/qq_34629352/article/details/105955188
// 将一个递归函数拆分成两个，一个函数只负责计数和发送请求，另外一个负责调度。

// 比较好的方法非常容易理解，没有用全局index用了count，拆分了多个不同职责的函数，用递归
var urls = Array.from({ length: 50 }).map((k, i) => "url" + i)
var asyncGet = (v) => {
  console.log("begin:", v)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("end:", v)
      resolve(v)
    }, 1000 * Math.random())
  })
}

var count = 0 //当前正在进行数
// 封装请求的异步函数,增加计数器功能
function request() {
  count++
  asyncGet(urls.shift())
    .then(() => {
      count--
    })
    .then(schedule)
}
// 负责调度的函数
function schedule() {
  // 这里的count有必要吗？是否只需要urls.length就够了
  if (urls.length > 0 && count <= 3) {
    request()
  }
}

function async1() {
  for (var i = 0; i < 3; i++) {
    request()
  }
}
async1()



// 比较好的方法容易理解，用了async一下子处理完了所有值也挂起了很多
// 采用async await制造阻塞block
var urls = Array.from({ length: 50 }).map((k, i) => "url" + i)
var asyncGet = (v) => {
  console.log("begin:", v)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("end:", v)
      resolve(v)
    }, 1000 * Math.random())
  })
}
// 计数器
var count = 0
// 全局锁
var lock = []
var l = urls.length
// 阻塞函数
function block() {
  // let _resolve
  return new Promise((resolve, reject) => {
    // resolve不执行,将其推入lock数组，这里不需要值，只是纯粹的阻塞用
    lock.push(resolve)
  })
}
// 叫号机
function next() {
  lock.length && lock.shift()()
}
async function bao() {
  if (count >= 3) {
    //超过限制利用await和promise进行阻塞，一下子执行了全部
    await block()
  }
  if (urls.length > 0) {
    // console.log(count)
    count++
    await asyncGet(urls.shift())
    count--
    next()
  }
}
for (let i = 0; i < l; i++) {
  bao()
}



// https://juejin.cn/post/6989103878436290568
// 没有用到当前运行的请求的最大index，用的是shift
function send() {
  let total = 100
  // 初始化数组
  let initList = Array.from({ length: total }).map((k, i) => i)
  // 最大并发次数
  const limit = 5
  // 最终结果
  let result = {}
  // 已经请求完的个数
  let resultLength = 0

  //定义异步函数
  const asyncGet = (v) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(v), 1000 * Math.random())
    })

  // 初始化100个异步请求函数，当闭包被执行的时候会执行一个请求，当请求执行完后，会获取下一个并执行
  // map后的每一项是一个未执行的函数
  let runningList = initList.map((item) => {
    return () => {
      return asyncGet(item).then((res) => {
        console.log("res:" + res)
        resultLength++
        result[item] = "final " + res
        let next = runningList.shift()
        if (next) {
          next()
        } else if (resultLength === total) {
          console.log(
            "全部执行完成",
            initList.map((it) => result[it]),
            result
          )
        }
      })
    }
  })
  const arr = []
  // 一次性取出最大并发数并执行
  for (let i = 0; i < limit; i++) {
    let fn = runningList.shift()
    arr.push(fn())
  }
}
send()




// 利用 Promise 封装一个异步加载图片的方法，并限制并发个数，即同时请求的个数不超过3个。
// 采用全局index，替代采用额外的数组shift
// let count = 0
let index = 0
let asyncGet = (v) => {
  console.log("begin:", v)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("end:", v)
      resolve(v)
    }, 1000 * Math.random())
  })
}
// 用的全局index
function loadControl(arr) {
  if (index >= arr.length) return
  console.log(index)
  // count++
  // console.log(count, index)
  asyncGet(arr[index])
    // .then(() => {
    //   count--
    // })
    .then(() => loadControl(arr, ++index))
}
let arr = Array.from({ length: 50 }).map((k, i) => "url" + i)
// 这里要同时调用limit次
loadControl(arr)
loadControl(arr)
loadControl(arr)



// https://github.com/rxaviers/async-pool
// es7版本 用 async await Promise.all Promise.race 还能得到与原数组对应的最终结果数组，不需要用全局index 不需要slice原数组又shift 不需要递归
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret);
}

const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
// Call iterator (i = 1000)
// Call iterator (i = 5000)
// Pool limit of 2 reached, wait for the quicker one to complete...
// 1000 finishes
// Call iterator (i = 3000)
// Pool limit of 2 reached, wait for the quicker one to complete...
// 3000 finishes
// Call iterator (i = 2000)
// Itaration is complete, wait until running ones complete...
// 5000 finishes
// 2000 finishes
// Resolves, results are passed in given array order `[1000, 5000, 3000, 2000]`.


// es6版本 用 then Promise.all Promise.race 需要全局index 需要递归但是并没有一下子执行了一大串then
function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  const enqueue = function () {
    if (i === array.length) {
      return Promise.resolve();
    }
    const item = array[i++]; // 获取新的任务项
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    let r = Promise.resolve();

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        r = Promise.race(executing);
      }
    }

    // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
    // 这里不是一下子接了一大串then而是递归一个个接上then方法，也会有race带来的长时间阻塞，后面的then串不需要接住前一个的res，如果一下子执行一串then方法则需要后面的接住前面的res
    return r.then(() => enqueue());
  };
  // all最先接上但是却是等递归结束后最后才执行
  return enqueue().then(() => Promise.all(ret));
}
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => { });


// 用 Promise.race来实现，先并发请求3个图片资源，这样可以得到 3 个 Promise实例，组成一个数组promises ，然后不断的调用 Promise.race 来返回最快改变状态的 Promise，然后从数组（promises ）中删掉这个 Promise 对象实例，再加入一个新的 Promise实例，直到全部的 url 被取完。

function limitLoad(urls, handler, limit) {
  // 对数组做一个拷贝
  const sequence = [].concat(urls)
  let promises = []

  //并发请求到最大数
  promises = sequence.splice(0, limit).map((url, index) => {
    // 这里返回的 index 是任务在 promises 的脚标，
    //用于在 Promise.race 之后找到完成的任务脚标
    return handler(url).then(() => {
      return index
    })
  })
    ; (async function loop() {
      let p = Promise.race(promises)
      for (let i = 0; i < sequence.length; i++) {
        // 一下子执行了一串所有的then方法 需要接住上一个的res
        p = p.then((res) => {
          promises[res] = handler(sequence[i]).then(() => {
            return res
          })
          return Promise.race(promises)
        })
      }
    })()
}
// limitLoad(dataLists, loadImg, 3)




