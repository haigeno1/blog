

// 3. 关系型数组转换成树形结构对象
// 递归 时间换空间 时间复杂度高空间复杂度低
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
  { "id": 1, "parent": null },
  { "id": 2, "parent": 1 },
  { "id": 3, "parent": 2 },
  { "id": 4, "parent": 1 },
]
arrToTree(obj)

// [
//   {
//       "id": 1,
//       "parent": null,
//       "children": [
//           {
//               "id": 2,
//               "parent": 1,
//               "children": [
//                   {
//                       "id": 3,
//                       "parent": 2
//                   }
//               ]
//           },
//           {
//               "id": 4,
//               "parent": 1
//           }
//       ]
//   }
// ]

// 这里最外层是数组而不是对象 如果需要时对象就处理下


// 一次遍历 用itemMap额外空间换取时间
// 链接：https://juejin.cn/post/6983904373508145189
function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  // 
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}


