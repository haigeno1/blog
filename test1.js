// 1-100循环报数 报到m的人退出,输出最后留下的人的序号
// 以下代码通过80%测试用例, 剩下的某些case提示超时



// let m = +readline()
let m = 4
if (m <= 1 || m >= 100) {
  console.log('ERROR')
}

let arr = Array(100).fill(0).map((it, index) => index + 1)


// let count = 0
// for (let i = 0; i < arr.length && arr.length >= m; i++) {
//   count++
//   if (count === m) {
//     arr.splice(i,1)
//     i--
//     count = 0
//   }
//   if (i >= arr.length-1 && arr.length >= m) {
//     i = -1
//   }
// }
// console.log(arr.join(","))



let count = 0
let index = -1
while (arr.length >= m) {
  count++
  index++
  if (count === m) {
    arr.splice(index, 1)
    index--
    count = 0
  }
  if (index >= arr.length - 1) {
    index = -1
  }
  // if (arr.length < m) break
}
console.log(arr.join(","));



function circle(arr, interval, final = 1, index = 0, delCount = 0) {
  while (arr.length > final) {
    index += interval - 1
    // if (index >= arr.length) {
    //   console.log(`index长度${index}>=数组长度${arr.length}`);
    // }
    index %= arr.length
    const deleted = arr.splice(index, 1)
    delCount++
    console.log(`每隔${interval},第${delCount}次删除的下标为${index},值为${deleted},此时数组长度为${arr.length},值为${arr}`);
  }
}
let res = circle(Array(50).fill(0).map((it, index) => index + 1), 3)
console.log(res);










// let count = m
// while (arr.length >= m) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] % m === 0) {
//       arr.splice(i, 1)
//     }
//   }
//   while ()
// }
// const res = arr
// let i = 1
// let count = m
// let index = 0
// while (arr.length >= m) {
//   if (i === m) {
//     arr.splice(i-1, 1)
//   } else {
//     i++
//   }
//   if (index === arr.length - 1) {
//     index = 0
//   }

// }
// return arr.join(",")