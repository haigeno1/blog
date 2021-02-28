source ~/.bashrc


// https://juejin.cn/post/6844903657264136200
微任务
#	浏览器	Node
process.nextTick	❌	✅
MutationObserver	✅	❌
Promise.then catch finally	✅	✅

宏任务
#	浏览器	Node
I/O	✅	✅
setTimeout	✅	✅
setInterval	✅	✅
setImmediate	❌	✅
requestAnimationFrame	✅	❌