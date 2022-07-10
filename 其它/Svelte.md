<!-- https://mp.weixin.qq.com/s/7GTTAYNf28IvIe2bpfVHuQ -->
Svelte 的核心思想在于『通过静态编译减少框架运行时的代码量』。

No Runtime —— 无运行时代码
Less-Code —— 写更少的代码
Hight-Performance —— 高性能


原理概览
  Svelte 在编译时，就已经分析好了数据 和 DOM 节点之间的对应关系，在数据发生变化时，可以非常高效的来更新DOM节点。

Rich Harris 在进行Svelte的设计的时候没有采用 Virtual DOM，主要是因为他觉得Virtual DOM Diff 的过程是非常低效的。具体可参考Virtual Dom 真的高效吗一文；Svelte 采用了Templates语法，在编译的过程中就进行优化操作；
Svelte 记录脏数据的方式：位掩码（bitMask）；
数据和DOM节点之间的对应关系：React 和 Vue 是通过 Virtual Dom 进行 diff 来算出来更新哪些 DOM 节点效率最高。Svelte 是在编译时候，就记录了数据 和 DOM 节点之间的对应关系，并且保存在 p 函数中。
