// 如何写出一个惊艳面试官的深拷贝?
// https://juejin.cn/post/6844903929705136141
function deepClone(p, c) {
  // c和p都是对象
  c = c || {};
  for (let i in p) {
    if (p.hasOwnProperty[i]) {
      // 排除继承属性
      if (typeof p[i] === "object") {
        // 解决引用类型
        c[i] = Array.isArray(p[i]) ? [] : {};
        deepCopy[(p[i], c[i])];
      } else {
        c[i] = p[i];
      }
    }
  }
  return c;
}

// nice
function deepClone(target) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
// 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
// WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
// let obj = { name : 'ConardLi'}
// const target = new WeakMap();
// target.set(obj,'code秘密花园');
// obj = null;
// 如果是WeakMap的话，target和obj存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

function deepClone(target, map = new WeakMap()) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

// 最终版 https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}





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
        flag = hasCycle(obj[name], objAry);
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
