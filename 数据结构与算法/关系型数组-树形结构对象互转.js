

// 3. 关系型数组转换成树形结构对象
function arrToTree(arr, pid = null) {
  let result = []
  arr.forEach(item => {
      if (item.parent === pid) {
          const children = arrToTree(arr, item.id)
          if (children.length > 0) {
              result.push({ ...item, children })
          } else {
              result.push({ ...item })
          }
      }
  })
  return result
}
var obj = [
  { "id": 3, "parent": 2 },
  { "id": 1, "parent": null },
  { "id": 2, "parent": 1 }
]
arrToTree(obj)
// 这里最外层是数组而不是对象 如果需要时对象就处理下
// o = {
//     "obj": {
//         "id": 1,
//         "parent": null,
//         "children": [{
//             "id": 2,
//             "parent": 1,
//             "children": [{
//                 "id": 3,
//                 "parent": 2
//             }]
//         }]
//     }N
// }

