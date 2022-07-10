`IntersectionObserver`通过启动一个观察器，以一种异步的方式检查目标元素是否出现于视窗（viewport）中，它返回的数据里面包含了两个重要的信息：

* time：元素可见性发生变化的时间，一个高精度时间戳，单位毫秒；
* intersectionRatio：目标元素的可见比例，介于0.0-1.0，为0时表示元素不可见，为1时表示元素完全可见。

接下来我们需要给每一个元素添加一个intersection观察器，`MutationObserver`可以帮助我们，它提供了监视dom树变更的能力，我们使用它监视 `document`根节点的子树的变化，为新增的每一个子节点注册一个 `IntersectionObserver`，参考如下代码：

作者：Lostvita
// 链接：https://juejin.cn/post/6962742206692065287
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---

---
