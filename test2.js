// 考语言基础和命名规范的题,字母多但是不难, 用代码描述三组不等式
// 以下代码通过 100% 的测试用例


let line = readline()
// let line = '2.3,3,5.6,7,6;11,3,8.6,25,1;0.3,9,5.3,66,7.8;1,3,2,7,5;340,670,80.6;<=,<=,<='
// let line = '2.36,3,6,7.1,6;1,30,8.6,2.5,21;0.3,69,5.3,6.6,7.8;1,13,2,17,5;340,67,300.6;<=,>=,<='
let arr = line.split(";")
let [a11, a12, a13, a14, a15] = arr[0].split(",").map(parseFloat)
let [a21, a22, a23, a24, a25] = arr[1].split(",").map(parseFloat)
let [a31, a32, a33, a34, a35] = arr[2].split(",").map(parseFloat)
let [x1, x2, x3, x4, x5] = arr[3].split(",").map(parseFloat)
let [b1, b2, b3] = arr[4].split(",").map(parseFloat)
let [jj1, jj2, jj3] = arr[5].split(",")

let resB1 = a11 * x1 + a12 * x2 + a13 * x3 + a14 * x4 + a15 * x5 - b1
let resB2 = a21 * x1 + a22 * x2 + a23 * x3 + a24 * x4 + a25 * x5 - b2
let resB3 = a31 * x1 + a32 * x2 + a33 * x3 + a34 * x4 + a35 * x5 - b3

function judge(v, j) {
  if (j === ">") {
    return v > 0
  } else if (j === ">=") {
    return v >= 0
  } else if (j === "<") {
    return v < 0
  } else if (j === "<=") {
    return v <= 0
  } else if (j === "=") {
    return v === 0
  }
}


let resM1 = judge(resB1, jj1)
let resM2 = judge(resB2, jj2)
let resM3 = judge(resB3, jj3)
let resM = resM1 && resM2 && resM3

let resN = Math.max(resB1, resB2, resB3)
let resNN = resN > 0 ? Math.floor(resN) : Math.floor(resN) + 1
console.log(`${resM} ${resNN}`)