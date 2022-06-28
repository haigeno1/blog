// 每本书的长l宽w, 如果l w均大于另一本书的l w,那么可以叠放,给出数组 求最大可叠放的数的数量
// 以下代码只通过了 90% 的测试用例



// console.log(4)

// let line = readline()
let line = "[[20,16],[15,11],[10,10],[9,10]]"

let arr0 = JSON.parse(line)
let arr = [...arr0].sort((a, b) => b[0] - a[0])

let max = 1
for (let i = 1; i < arr.length; i++) {
  if (arr[i][0] < arr[i - 1][0] && arr[i][1] < arr[i - 1][1]) {
    max++
  }
}
console.log(max);



// const readline = require("readline")
// const rl = readline.createInterface(process.stdin, process.stdout) 
// rl.on("line", function(line) {
//   // let line = "[[20,16],[15,11],[10,10],[9,10]]"
//   let arr0 = JSON.parse(line)
//   let arr = [...arr0].sort((a, b) => b[0] - a[0])
  
//   let max = 1
//   let cur = 1
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i][0] < arr[i - 1][0] && arr[i][1] < arr[i - 1][1]) {
//       cur++
//     } else {
//       cur = 1
//     }
//     max = Math.max(cur, max)
//   }
//   console.log(max);
// })