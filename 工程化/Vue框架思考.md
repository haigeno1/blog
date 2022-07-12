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



computed如何实现
  computed计算属性实际上是一个lazy的副作用函数，通过lazy的选项使得副作用函数可以懒执行，将方法getter作为参数传递给effect函数并且options.lazy设置为true，内部定义了一个obj对象，重写了get value的方法执行了副作用函数，最后返回整个obj对象，当计算属性中依赖的响应式数据发生变化，通过value拿到执行之后的结果值。为了避免多次计算设计一个缓存的开关 dirty ，当dirty 为真时才会计算，当数据发生改变时在set中会调用scheduler,这是将dirty设置为true，重新计算

watch如何实现
  watch本质上利用了副作用函数重新执行时的可调度性schedluer，在scheduler中执行用户通过watch函数注册的回调函数即可，scheduler指的是当trigger动作触发副作用函数重新执行，在effect函数中增加的第二个options参数



Vue reactive和ref的区别
    ref和reactive都可以做响应式
    ref:一般用在定义基本类型和引用类型，如果是引用类型底层会借助reactive形成proxy代理对象,可以直接复制整个对象，如table的数据请求回来，需要将数据整体赋值个响应对象这时如果使用的是reactive就无法进行响应。ref()定义的响应式数据需要通过.value来访问，而在模板中会进行一个拆箱的操作，不需要手动通过.value来访问。
    reactive：一般用在引用类型，如{}等,不能一次性修改整个对象，如我们后端请求table的数据数据，如果想一次性赋值的整个数组的话，就行不通，此时建议使用ref来定义数组。reactive()将不适用于原始值，reactive()获取一个对象并返回原始对象的响应式代理.reactive()函数返回的对象需要在模板里通过.操作符访问。reactive()函数返回的对象如果被解构的话，里面的数据将会失去响应式，可以通过toRefs把对象里面的每个属性转化成ref来使用。




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
