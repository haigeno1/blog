<!-- https://juejin.cn/post/6947335144894103583 -->
<!-- http://www.ruanyifeng.com/blog/2016/06/css_modules.html -->
CSS 命名方法论：通过人工的方式来约定命名规则。BEM、OOCSS、SMACSS、ITCSS、SUITCSS、Atomic CSS
CSS Modules：一个 CSS 文件就是一个独立的模块。
  功能很单纯，只加入了局部作用域和模块依赖
  CSS Modules 允许我们像 import 一个 JS Module 一样去 import 一个 CSS Module。每一个 CSS 文件都是一个独立的模块，每一个类名都是该模块所导出对象的一个属性。通过这种方式，便可在使用时明确指定所引用的 CSS 样式。并且，CSS Modules 在打包时会自动将 id 和 class 混淆成全局唯一的 hash 值，从而避免发生命名冲突问题。
CSS-in-JS：在 JS 中写 CSS。
  React 的出现，打破了以前“关注点分离”的网页开发原则，因其采用组件结构，而组件又强制要求将 HTML、CSS 和 JS 代码写在一起。表面上看是技术的倒退，实际上并不是。
  React 是在  JS 中实现了对 HTML 和 CSS 的封装，赋予了 HTML 和 CSS 全新的“编程能力”。对于 HTML，衍生了 JSX 这种 JS 的语法扩展，你可以将其理解为 HTML-in-JS；对于 CSS，衍生出一系列的第三方库，用来加强在 JS 中操作 CSS 的能力，它们被称为 CSS-in-JS。React 对 CSS 封装非常简单，就是沿用了 DOM 的 style 属性对象，
  典型的 styled-components

CSS Modules 与 styled-components 是两种截然不同的 CSS 模块化方案，它们最本质的区别是：前者是在外部管理 CSS，后者是在组件中管理 CSS。两者没有孰好孰坏，如果你能接受 CSS-in-JS 这种编程模式，更推荐使用 styled-components。

在 Vue 中编写 CSS 的正确姿势. 为 style 区块添加 scoped 属性即可开启“组件样式作用域（Scoped CSS）”
React 并没有给我们提供与 Vue scoped 类似的特性，我们需要通过其他方式来实现 CSS 模块化。
为何react中没有scoped??