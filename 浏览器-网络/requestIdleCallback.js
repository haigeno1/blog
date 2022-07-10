// https://juejin.cn/post/6844903848981577735
// 通过上图可看到，一帧内需要完成如下六个步骤的任务：

// 处理用户的交互
// JS 解析执行
// 帧开始。窗口尺寸变更，页面滚去等的处理
// requestAnimationFrame(rAF)
// 布局
// 绘制


requestIdleCallback(myNonEssentialWork, { timeout: 2000 });

// 任务队列
const tasks = [
  () => {
    console.log("第一个任务");
  },
  () => {
    console.log("第二个任务");
  },
  () => {
    console.log("第三个任务");
  },
];

function myNonEssentialWork(deadline) {
  // 如果帧内有富余的时间，或者超时
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
    work();
  }

  if (tasks.length > 0)
    requestIdleCallback(myNonEssentialWork);
}

function work() {
  tasks.shift()();
  console.log('执行任务');
}



let offsetTop = 0;
const div = document.querySelector(".div");
const run = () => {
 div.style.transform = `translate3d(0, ${offsetTop += 10}px, 0)`;
 window.requestAnimationFrame(run);
};
run();




var tasksNum = 10000

requestIdleCallback(unImportWork)

function unImportWork(deadline) {
  while (deadline.timeRemaining() && tasksNum > 0) {
    console.log(`执行了${10000 - tasksNum + 1}个任务`)
    tasksNum--
  }
  if (tasksNum > 0) { // 在未来的帧中继续执行
    requestIdleCallback(unImportWork)
  }
}
