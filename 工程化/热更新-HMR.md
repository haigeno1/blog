<!-- // https://juejin.cn/post/6844904020528594957 -->
<!-- // https://github.com/gracehui88/HMR -->
总体流程
1. 整个流程分为客户端和服务端
2. 通过 websocket 建立起 浏览器端 和 服务器端 之间的通信

3. 服务端主要分为四个关键点

通过webpack创建compiler实例，webpack在watch模式下编译
  compiler实例：监听本地文件的变化、文件改变自动编译、编译输出
  更改config中的entry属性：将lib/client/index.js、lib/client/hot/dev-server.js注入到打包输出的chunk文件中
  往compiler.hooks.done钩子（webpack编译完成后触发）注册事件：里面会向客户端发射hash和ok事件
调用webpack-dev-middleware：启动编译、设置文件为内存文件系统、里面有一个中间件负责返回编译的文件
创建webserver静态服务器：让浏览器可以请求编译生成的静态资源
创建websocket服务：建立本地服务和浏览器的双向通信；每当有新的编译，立马告知浏览器执行热更新逻辑

4. 客户端主要分为两个关键点

创建一个 websocket客户端 连接 websocket服务端，websocket客户端监听 hash 和 ok 事件
主要的热更新客户端实现逻辑，浏览器会接收服务器端推送的消息，如果需要热更新，浏览器发起http请求去服务器端获取新的模块资源解析并局部刷新页面（这本是HotModuleReplacementPlugin帮我们做了，他将HMR 运行时代码注入到chunk中了，但是我会带大家实现这个 HMR runtime）
