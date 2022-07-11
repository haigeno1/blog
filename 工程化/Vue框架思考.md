历史大版本的changelog,v3比v2升级了什么?
  在体验Vue3之前，我们先来了解一下Vue3到底有哪些亮点之处
  总共有6大点：
  1. Performance（性能比vue2的runtime快2倍左右）
  2. Tree shaking support（按需打包模块）
  3. Better TypeScript support（更好的TS代码支持）
  4. Composition API（组合API）
  5. Custom Renderer API（自定义渲染API）
  6. Fragment, Teleport, Suspense
setup为什么没有this?
<!-- 生命周期 -->
<!-- 组件传参方式 -->
vue3的缺点
  自动化程度太高带来的调试问题
  准备替换掉虚拟dom?


pinia(vuex5)相比于vuex4改进点?
  Vuex的优点
    支持调试功能，如时间旅行和编辑
    适用于大型、高复杂度的Vue.js项目

  Vuex的缺点
    从 Vue 3 开始，getter 的结果不会像计算属性那样缓存
    Vuex 4有一些与类型安全相关的问题

  Pinia的优点
    完整的 TypeScript 支持：与在 Vuex 中添加 TypeScript 相比，添加 TypeScript 更容易
    极其轻巧（体积约 1KB）
    store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或 MapAction 辅助函数，这在 Vuex 中很常见
    支持多个Store
    支持 Vue devtools、SSR 和 webpack 代码拆分

  Pinia的缺点
    不支持时间旅行和编辑等调试功能



diff算法
  递增法
  双端比较
  最长递增子序列
