// 判断对象是否有环
function hasLoop(obj) {
  // 判断对象内部是否有和源相同的属性
  function findLoop(target, src) {
    // 源数组，并将自身传入
    // 添加的操作在这里
    const source = src.slice().concat([target]);

    for (const key in target) {
      // 如果是对象才需要判断
      if (typeof target[key] === "object") {
        // 如果在源数组中找到
        const res1 = source.indexOf(target[key]) > -1;
        if (res1) {
          return true;
        }
        // 递归查找内部属性找到相同
        const res2 = findLoop(target[key], source);
        if (res2) {
          return true;
        }
        // 合并简写
        // if (source.indexOf(target[key]) > -1 || findLoop(target[key], source)) {
        //     return true
        // }
      }
    }
    return false;
  }
  // 如果传入值是对象，则执行判断，否则返回false
  return typeof obj === "object" ? findLoop(obj, []) : false;
}


function hasCycle(obj, objAry) {
  var objAry = objAry || [obj];
  var flag = false;
  for (var name in obj) {
    if (typeof obj[name] == "object" && obj[name] != null) {
      if (objAry.indexOf(obj[name]) != -1) {
        flag = true;
        break;
      } else {
        // 先push 后pop  添加的操作在这里
        objAry.push(obj[name]);
        flag = hsaCycle(obj[name], objAry);
        if (flag == true) {
          break;
        }
        objAry.pop();
      }
    }
  }
  return flag;
}


let tmp = { age: 18 };
let src = {
  a: 1,
  b: { bb: "bb" },
  // c: [3, 33, { cc: 333 }],
  d: tmp,
  e: tmp,
};
// src.f = src.b
// src.g = src  // loop1 res1===true
src.b.bbb = src.b; // loop2 res1===true 且 res2===true

console.log(hasLoop(src));
