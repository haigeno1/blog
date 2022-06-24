


// class Node {
//   children: Nodes[] = [];
//   reference?: Node;
// }

/**
 * deep clone对象及关系
 *
 * - 白板中有多层级的图层，图层可以包含其他图层或对象
 * - 每个对象或者图层会有0到1个跟它关联的对象或图层
 * 
 * 因此数据以树的形式呈现，并且对象中会有一个reference字段指向任意一个节点
 * 深度clone这些数据
 * 
 * @param root 数据根
 */
function clone(src, m = new WeakMap()) {
  if (typeof src !== 'object' || src === null) return src
  if (m.get(src)) return m.get(src)
  if (Array.isArray(src)) {
    let res = src.map(it => clone(it, m))
    m.set(src, res)
    return res
  } else {
    let res = {}
    Object.keys(src).forEach(key => {
      res[key] = clone(src[key], m)
    })
    m.set(src, res)
    return res
  }
}
// function deepClone(root) {

// }

var a = { children: [b, c], reference: null };
var b = { children: [], reference: c };
var c = { children: [], reference: a };

console.log(deepClone(a))