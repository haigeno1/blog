<!-- https://juejin.cn/post/7075491793642455077 -->
pinia(vuex5)相比于vuex4改进点
Pinia 核心特性
  完整的 typescript 的支持；
  足够轻量，压缩后的体积只有1.6kb;
  去除 mutations，只有 state，getters，actions ,    actions 支持同步和异步
  没有模块嵌套，只有 store 的概念，store 之间可以自由使用，很好的代码自动分割；Pinia 通过设计提供扁平结构，就是说每个 store 都是互相独立的，谁也不属于谁，也就是扁平化了，更好的代码分割且没有命名空间。当然你也可以通过在一个模块中导入另一个模块来隐式嵌套 store，甚至可以拥有 store 的循环依赖关系
  无需手动添加 store，store 一旦创建便会自动添加；
  Vue2 和 Vue3 都支持, 除了初始化安装和SSR配置之外，两者使用上的API都是相同的
  支持 Vue DevTools
    跟踪 actions, mutations 的时间线
    在使用了模块的组件中就可以观察到模块本身
    支持 time-travel 更容易调试
    在 Vue2 中 Pinia 会使用 Vuex 的所有接口，所以它俩不能一起使用
    但是针对 Vue3 的调试工具支持还不够完美，比如还没有 time-travel 功能
  模块热更新
    无需重新加载页面就可以修改模块
    热更新的时候会保持任何现有状态
  支持使用插件扩展 Pinia 功能
  支持服务端渲染







redux
Redux 的设计思想很简单，就两句话。
（1）Web 应用是一个状态机，视图与状态是一一对应的。
（2）所有的状态，保存在一个对象里面。
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。当前时刻的 State，可以通过store.getState().  Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同 反之亦然。
State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 描述当前发生的事情   Action  就是 View 发出的通知，表示 State 应该要发生变化了。
store.dispatch()是 View 发出 Action 的唯一方法。
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象??最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。
Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。


const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};



中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
整个异步操作的思路就很清楚了。操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染
异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch。
另一种异步操作的解决方案，就是让 Action Creator 返回一个 Promise 对象。这就需要使用redux-promise中间件。




React-Redux
UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
import { connect } from 'react-redux'
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。React-Redux 提供Provider组件，可以让容器组件拿到state。它的原理是React组件的context属性.Provider的唯一功能就是传入store对象。






