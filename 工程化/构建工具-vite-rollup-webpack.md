vite 其实就是一个由原生 ES Module 驱动的新型 Web 开发前端构建工具。 
Vite 在开发环境冷启动无需打包，无需分析模块之间的依赖，同时也无需在启动开发服务器前进行编译，启动时还会使用 esbuild 来进行预构建；（如下图基于原生 ESM 的开发服务流程图）
Webpack 在启动后会做一堆事情，经历一条很长的编译打包链条，从入口开始需要逐步经历语法解析、依赖收集、代码转译、打包合并、代码优化，最终将高版本的、离散的源码编译打包成低版本、高兼容性的产物代码，这可满满都是 CPU、IO 操作啊，在 Node 运行时下性能必然是有问题。（如下图基于 bundle 的开发服务流程图）



webpack5主要新特性介绍
  资源模块；
  moduleIds & chunkIds 的优化；
  移除Node.js的polyfill；
  更强大的tree-shaking；
  持久化缓存提高性能；
  Module Federation 模块联邦；
    Module Federation是为了解决独立应用之间代码共享问题。可以在项目内动态加载其他项目的代码，同步可以共享依赖。

Loader: 因为前端项目中包含各种文件类型和数据, 需要将其进行相应的转换变成JS模块才能为打包工具使用并进行构建. JS的Compiler和其他类型文件的Loader可以统称为Transfomer.
Plugin: 可以更一步定制化构建流程, 对模块进行改造(比如压缩JS的Terser)
