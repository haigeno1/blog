历史大版本的changelog
  React 16.8后引入hooks
  v17
  v18
    并发模式
fiber
hooks
hooks对比class
  class才有生命周期,hooks的没有??

钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应。 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。函数式编程将那些跟数据计算无关的操作，都称为 "副效应" （side effect）

组件传参方式
  父组件 => 子组件：
    Props
    Instance Methods 父组件可以通过使用refs来直接调用子组件实例的方法
  子组件 => 父组件：
    Callback Functions
    Event Bubbling 这种方法其实跟react本身没有关系，我们利用的是原生dom元素的事件冒泡机制。
  兄弟组件之间：
    Parent Component 它们就可以通过父组件作为中间层来实现数据互通了。
  不太相关的组件之间：
    Context
    Portals Portals的主要应用场景是：当两个组件在react项目中是父子组件的关系，但在HTML DOM里并不想是父子元素的关系。
    Global Variables
    Observer Pattern
    Redux等


React的缺点?
  虚拟DOM的结构复杂无疑带来很多开销


diff算法
  React主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。


无状态组件函数式组件 纯组件 React.purecomponent
  无状态函数式组件 它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到state状态的操作 组件不会被实例化，整体渲染性能得到提升，不能访问this对象，不能访问生命周期的方法
  PureComponent表示一个纯组件，可以用来优化React程序，减少render函数执行的次数，从而提高组件的性能。在React中，当prop或者state发生变化时，可以通过在shouldComponentUpdate生命周期函数中执行return false来阻止页面的更新，从而减少不必要的render执行。React.PureComponent会自动执行 shouldComponentUpdate。
  React.memo 是 React 16.6 新的一个 API，用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似，但不同的是， React.memo只能用于函数组件。

  由于函数组件没有实例，因此不能在函数组件上直接使用 ref
  官方更推崇“组合优于继承”


React推崇函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其稳定性（无副作用）和可测试性（输入相同，输出一定相同），所以通常大家说的React适合大型应用，根本原因还是在于其函数式编程。
React推崇JSX、HOC、all in js



如何理解可变状态与不可变状态?
组合模式的组件
