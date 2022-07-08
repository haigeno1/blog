
// batch 一个函数，让它在并发调用时只被执行一次
// https://www.qiyuandi.com/zhanzhang/zonghe/13965.html

let executeCount = 0
const targetFn = async (nums) => {
  executeCount++
  return nums.map((num) => 2 * num + 1)
}

// const batcher = (fn) => {
//   // todo batch logic
//   let queue = []
//   let len = []
//   // let obj = {}
//   return function f(arr) {
//     queue.push(arr)
//     len.push(arr.length)
//     // queue = queue.concat(...arr)
//     return new Promise((resolve) => {
//       if (queue.indexOf(arr) === queue.length - 1) {
//         let res = fn([].concat(...queue))
//         for (let i = 0; i < len.length; i++) {
//           // res.slice(len[i]
//         }
//         resolve(res)
//       }
//     })
//   }
// }

const batcher = (f) => {
  let nums = []
  const p = Promise.resolve().then((_) => f(nums))

  return (arr) => {
    let start = nums.length
    nums = nums.concat(arr)
    let end = nums.length
    return p.then((ret) => ret.slice(start, end))
  }
}

const batchedFn = batcher(targetFn)

const main = async () => {
  const [result1, result2, result3] = await Promise.all([
    batchedFn([1, 2, 3]),
    batchedFn([4, 5]),
    batchedFn([6, 7]),
  ])

  console.log(result1, result2, result3) //
  console.log(executeCount) // 预期为 1
}

main()

const fn = (...args) => {
  for (const arg of args) {
    console.log(arg)
  }
  let res = ""
  let res0 = args[0]
  for (let i = 1; i < args.length; i++) {
    res += res0[i - 1] + args[i]
  }
  return (res += res0[res0.length - 1])
}
const [a, b] = [1, 2]
fn`111${a} + ${b} = ${a + b}222`

fn("1+2=3")
  ; ("1+2=3")









  // 定义了一个同步函数对传入的数组进行遍历乘二操作，同时每执行一次就会给 executeCount 累加。最终我们需要实现一个 batcher 函数，使用其对该同步函数包装后，实现每次调用依旧返回预期的二倍结果，同时还需要保证 executeCount 执行次数为1。
  let executeCount = 0
  const fn = (nums) => {
    executeCount++
    return nums.map((x) => x * 2)
  }

  const batcher = (f) => {
    // todo 实现 batcher 函数
  }

  const batchedFn = batcher(fn)

  const main = async () => {
    const [r1, r2, r3] = await Promise.all([
      batchedFn([1, 2, 3]),
      batchedFn([4, 5]),
      batchedFn([7, 8, 9]),
    ])

    //满足以下 test case
    assert(r1).tobe([2, 4, 6])
    assert(r2).tobe([8, 10])
    assert(r3).tobe([14, 16, 18])
    assert(executeCount).tobe(1)
  }

  // setTimeout 解法
  const batcher = (f) => {
    let nums = []
    const p = new Promise((resolve) =>
      setTimeout((_) => resolve(f(nums)), 100)
    )

    return (arr) => {
      let start = nums.length
      nums = nums.concat(arr)
      let end = nums.length
      return p.then((ret) => ret.slice(start, end))
    }
  }

  // Promise 解法
  const batcher = (f) => {
    let nums = []
    const p = Promise.resolve().then((_) => f(nums))

    return (arr) => {
      let start = nums.length
      nums = nums.concat(arr)
      let end = nums.length
      return p.then((ret) => ret.slice(start, end))
    }
  }
