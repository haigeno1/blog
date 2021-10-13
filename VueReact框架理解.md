<!-- https://juejin.cn/post/7007048306438176799 -->
Vue React对比
    vue template 和 react jsx
        vue 是实现了一套 template 的 DSL，引入了插值、指令、过滤器等模版语法，相对于 jsx 来说更简洁，template 的编译器由 vue 实现。vue template 是受限制的，只能访问 data，prop、method，可以静态的分析和优化。因为和 js 上下文割裂开来，引入 typescript 做类型推导的时候就比较困难，需要单独把所有 prop、method、data 的类型声明一遍才行。
        react 是给 js 扩展了 jsx 的语法，由 babel 实现，可以在描述视图的时候直接用 js 来写逻辑，没啥新语法。 react 的 jsx 因为直接是 js 的语法，动态逻辑比较多，没法静态的做分析和优化。而 react 的 jsx 本来就是和 js 同一个上下文，结合 typescript 就很自然。
    前端框架的数据驱动视图变化的三种思路。watch、脏检查、不检查
        vue 是组件级别的数据 watch，vue 是组件级别的数据监听的方案，问题可能出现在一个属性太多 watcher 的时候，所以优化思路就是大组件拆分成小组件，保证每个属性不要有太多 watcher。
        react 不监听、不检查数据变化，每次都渲染生成 vdom，然后进行 vdom 的对比，那么优化的思路就是 shouldComponentUpdate 来跳过部分组件的 render，而且 react 内部也做了组件树的链表化（fiber）来把递归改成可打断的渲染，按照时间片来逐渐生成整个 vdom。组件树的渲染就是深度优先的，一般是通过递归来做，但是如果能通过链表记录下路径，就可以变成循环。这个通过把组件树改成链表，把 vdom 的生成从递归改循环的功能就是 react fiber。
    组件之间难免要有逻辑的复用（fiber 是解决性能问题的，而 hooks 是解决逻辑复用问题的）
        vue2 的组件内逻辑复用方案就是 mixin，但是 mixin 很难区分混入的属性、方法的来源，比较乱，代码维护性差。
        react 通过 function 组件的 hooks api 解决了 class 组件的逻辑复用方案的问题。react 的组件是 class 和 function 两种形式。HOC 和 render props 是 react 的 class 组件支持的两种逻辑复用方案。react 的组件是 class 和 function 两种形式，那么类似高阶函数的高阶组件（high order component）的方式就比较自然，也就是组件套组件，在父组件里面执行一部分逻辑，然后渲染子组件。除了多加一层组件的 HOC 方式以外，没有逻辑的部分可以直接把那部分 jsx 作为 props 传入另一个组件来复用，也就是 render props。
        function 组件要支持 state，于是 react 就在 function 组件的 fiber 节点中加入了 memorizedState 属性用来存储数据，然后在 function 组件里面通过 api 来使用这些数据，这些 api 被叫做 hooks api。
    domdiff
        Vue基于snabbdom库，它有较好的速度以及模块机制。Vue Diff使用双向指针，边对比，边更新DOM。
        React主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。
    事件机制不同
        Vue原生事件使用标准Web事件，Vue组件自定义事件机制，是父子组件通信基础
        React原生事件被包装，所有事件都冒泡到顶层document监听，然后在这里合成事件下发。基于这套，可以跨端使用事件机制，而不是和Web DOM强绑定。React组件上无事件，父子组件通信使用props