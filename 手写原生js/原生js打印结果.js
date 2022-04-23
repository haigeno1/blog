// var a = 10 // 只有var在浏览器环境运行时 a才是全局变量且有window对象, 在vscode环境运行时没有全局变量没有window var和let效果一致
let a = 10 // let出来的a并不是全局变量 let的时候vscode环境与浏览器打印结果一样

var obj = {
  a: 20,
  say1() { console.log(this.a, this) },
  say2: () => { console.log(this.a, this) }
}

var foo = {
  xx1:'xx',
  xx2: obj
}

obj.say1() // 20 obj
foo.xx2.say1() // 20 obj
obj.say2() // undefined window/{}
foo.xx2.say2() // undefined window/{}
console.log('a:', a) // 10 // let的时候此处的a不是全局变量
var anotherObj = { a: 30 }

obj.say1.apply(anotherObj) // 30 anotherObj
obj.say2.apply(anotherObj) // undefined window/{}