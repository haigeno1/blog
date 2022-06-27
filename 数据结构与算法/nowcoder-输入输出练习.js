1.
// let input
while (input = readline()) {
  let arr = input.split(" ").map(it => +it)
  console.log(arr[0] + arr[1])
}


const readline = require("readline")
const rl = readline.createInterface(process.stdin, process.stdout)
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })
rl.on('line', function (line) {
  let arr = line.split(" ").map(it => +it)
  console.log(arr[0] + arr[1]);
})




2.
let num = +readline()
for (let i = 0; i < num; i++) {
  let arr = readline().split(" ").map(it => +it)
  console.log(arr[0] + arr[1])
}


const readline = require("readline")
const rl = readline.createInterface(process.stdin, process.stdout)
let curLine = 0
rl.on('line', function (line) {
  curLine++
  if (curLine === 1) {

  } else {
    let arr = line.split(' ').map(it => +it)
    console.log(arr[0] + arr[1]);
  }
})





3.
while (input = readline()) {
  if (input === "0 0") continue
  let arr = input.split(" ").map(it => +it)
  console.log(arr[0] + arr[1])
}


const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
rl.on('line', function (line) {
  if (line !== '0 0') {
    let arr = line.split(" ").map(it => +it)
    console.log(arr[0] + arr[1]);
  }
})




4.
while (input = readline()) {
  if (input === "0") continue
  let arr = input.split(" ").map(it => +it)
  let num = arr[0]
  arr.shift()
  let res = 0
  for (let it of arr) {
    res += it
  }
  console.log(res)
}


const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
rl.on('line', function (line) {
  if (line !== '0') {
    let arr = line.split(" ").map(it => +it)
    arr.shift()
    let res = 0
    for (let it of arr) {
      res += it
    }
    console.log(res)
  }
})




5.
let lineNum = +readline()
for (let i = 0; i < lineNum; i++) {
  let arr = readline().split(" ").map(it => +it)
  let res = 0
  arr.shift()
  for (let it of arr) {
    res += it
  }
  console.log(res);
}


const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
let curLine = 0
rl.on('line', function (line) {
  curLine++
  if (curLine >= 2) {
    let arr = line.split(" ").map(it => +it)
    arr.shift()
    let res = 0
    for (let it of arr) {
      res += it
    }
    console.log(res)
  }
})




6.
while (line = readline()) {
  let arr = line.split(" ").map(it => +it)
  let n = arr.shift()
  let res = 0
  for (let it of arr) {
    res += it
  }
  console.log(res);
}


const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
rl.on('line', function (line) {
  let arr = line.split(" ").map(it => +it)
  arr.shift()
  let res = 0
  for (let it of arr) {
    res += it
  }
  console.log(res)
})




7.
while (line = readline()) {
  let arr = line.split(" ").map(it => +it)
  let sum = 0
  for (let it of arr) {
    sum += it
  }
  console.log(sum);
}


const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
rl.on('line', function (line) {
  let arr = line.split(" ").map(it => +it)
  let res = 0
  for (let it of arr) {
    res += it
  }
  console.log(res)
})




8.
let n = +readline()
let arr = readline().split(" ")
let res = arr.map((it, index) => [index, it]).sort((a, b) => {
  return a[1] < b[1]
    ? -1
    : a[1] > b[1]
      ? 1
      : a[0] - b[0]
}).map(it => it[1])
// let res = arr.sort((a,b) => a-b)
console.log(res.join(" "));


const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
let curLine = 0
rl.on('line', function (line) {
  curLine++
  if (curLine >= 2) {
    let arr = line.split(" ").sort()
    console.log(arr.join(" "))
  }
})




9.
while (line = readline()) {
  let arr = line.split(" ")
  let res = arr.sort().join(" ")
  console.log(res);
}


const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
rl.on('line', function (line) {
  let arr = line.split(" ")
  let res = [...arr].sort().join(" ")
  console.log(res)
})




10.
while (line = readline()) {
  let arr = line.split(",")
  let res = [...arr].sort().join(",")
  console.log(res);
}


const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
rl.on('line', function (line) {
  let arr = line.split(",")
  let res = [...arr].sort().join(",")
  console.log(res)
})




11.
while (line = readline()) {
  let arr = line.split(" ").map(it => +it)
  console.log(arr[0] + arr[1]);
}

const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
rl.on('line', function (line) {
  let arr = line.split(" ").map(it => +it)
  console.log(arr[0] + arr[1]);
})





// [编程题]简单错误记录

let obj = {}
let str;
while(str = readline()) {
    const [c, n] = str.split(" ");
    const s = c.substr(c.lastIndexOf('\\') + 1).substr(-16)
    // console.log(c.indexOf('\\'))
    obj[`${s} ${n}`] = (obj[`${s} ${n}`] || 0) + 1
}
Object.keys(obj).slice(-8).forEach(el => {
    print(`${el} ${obj[el]}`)
})



const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputs = [];
let handleData = [];

rl.on("line", function (line) {
  if (!inputs.includes(line)) {
    inputs.push(line);
    let arr = line.split("\\").slice(-1)[0].split(" ");
    if (arr[0].length > 16) {
      handleData.push(`${arr[0].slice(-16)} ${arr[1]}`);
    } else {
      handleData.push(`${arr[0]} ${arr[1]}`);
    }
  }
});
// 输入结束时，在 close 中对数据进行处理
rl.on("close", function () {
  let filterHandleData = Array.from(new Set(handleData));
  filterHandleData.slice(-8).forEach((item, index) => {
    let num = handleData.filter((data) => data === item).length;
    console.log(`${item} ${num}`);
  });
});

rl.on()
