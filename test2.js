var a = Promise.resolve(111)



var b = Promise.resolve(a)
var c = Promise.resolve(a)
console.log(b === c, a === b, a, b, c) // true true


var b1 = new Promise(resolve => resolve(a))
var c1 = new Promise(resolve => resolve(a))
console.log(b1 === c1, b1 === a, a, b1, c1) // false false


var b11
var c11
b1.then(res => console.log('b1then', res === 111, res)) // 111
b1.then(res => b11 = res)
c1.then(res => c11 = res)
console.log(b11 === c11, b11 === a, a, b11 === undefined, c11) // true false


var sleep = (value=-1, seconds) => new Promise(resolve => setTimeout(() => resolve(value), seconds))
// 调了resolve并不是立即就fulfilled了, 举例: 调了resolve并传参一个pending的Promise,那么这个调了resolve的Promise还是pending状态,但是resolve后面的log还是能正常log出来.
Promise.resolve(1).then(()=>new Promise(resovle => {
  resovle(sleep(11, 5000))
  console.log(111)
}))
Promise.resolve(1).then(()=>new Promise(resovle => resovle(sleep(11, 5000)))).then(res => console.log(res))