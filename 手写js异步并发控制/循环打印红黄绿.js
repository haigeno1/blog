// 1. 循环打印红黄绿
// 下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

// 三个亮灯函数：

// function red() {
//   console.log('red');
// }
// function green() {
//   console.log('green');
// }
// function yellow() {
//   console.log('yellow');
// }


// 用 async/await 实现
const taskRunner = async () => {
  await task(3000, 'red')
  await task(2000, 'green')
  await task(2100, 'yellow')
  taskRunner()
}
taskRunner()


// 用 promise 实现
const task = (timer, light) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === 'red') {
        red()
      }
      else if (light === 'green') {
        green()
      }
      else if (light === 'yellow') {
        yellow()
      }
      resolve()
    }, timer)
  })
const step = () => {
  task(3000, 'red')
    .then(() => task(2000, 'green'))
    .then(() => task(2100, 'yellow'))
    .then(step)
}
step()


// 用 callback 实现
const step = () => {
  task(3000, 'red', () => {
    task(2000, 'green', () => {
      task(1000, 'yellow', step)
    })
  })
}
step()
