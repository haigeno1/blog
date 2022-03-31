// https://segmentfault.com/a/1190000022342164
// 我们可以捋捋思路了，根据上文，Map底层使用了Hash毋庸置疑，但保持顺序这个特性，我猜测Map的底层使用了链表数据结构（链表是前一个结点的next指针指向后一个结点），所以Map的底层数据结构，使用了Hash + 链表实现。
// Map可以保证顺序，也可以使用O(1)的时间复杂度来找到某个元素，所以我们初步方案，Hash的散列表存储Map中的数据，同时每个结点存入的先后顺序使用链表的形式表示。
// https://segmentfault.com/img/remote/1460000022342167

// 简版1 可以直接把key JSON.stringfiy下。
// 简版2 用两个数组 一个存放keys 另一个存放values，但这样get的效率不是O1

class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null; //记录插入顺序
    this.ne = null; //记录Hash碰撞后的结点
  }
}

function myMap() {
  this.init();
}
myMap.prototype.init = function () {
  this.collection = new Array(6); //map底层用了hash算法。假如使用collection容器存放map中的数据
  for (let i = 0; i < this.collection.length; i++) {
    this.collection[i] = Object.create(null);
    this.collection[i].ne = null;
    this.collection[i].next = null;
  }
  this.size = 0;
  this.head = null; //头指针，总是指向第一个
  this.tail = null; //尾指针，总是指向最后一个
};

//插入或更新key结点
myMap.prototype.set = function (key, value) {
  let index = this.hash(key); //获取容器中的位置
  let node = this.collection[index]; //获得index位置处的对象
  while (node.ne) {
    if (node.ne.key === key) {
      node.ne.value = value; //更新
      return this; //注意返回当前对象this
    } else {
      node = node.ne;
    }
  }
  //map中没有该key，就在链表尾部插入
  let new_node = new ListNode(key, value);
  node.ne = new_node;
  if (!this.tail) {
    this.tail = new_node;
  }

  if (!this.head) {
    this.head = new_node; //如果是第一个结点，头指针指向它
  }

  this.tail.next = new_node; //尾指针
  this.tail = new_node;

  this.size++;
  return this; //注意返回当前对象this
};

//获取key结点的值
myMap.prototype.get = function (key) {
  let index = this.hash(key);
  let node = this.collection[index]; //获取容器相应位置处的对象
  while (node) {
    if (node.key === key) {
      return node.value;
    } else {
      node = node.ne;
    }
  }
  return undefined;
};

//删掉key结点
myMap.prototype.delete = function (key) {
  if (!this.head) {
    return false;
  }

  //从容器中删除
  let index = this.hash(key);
  let node = this.collection[index];
  let pre = null;
  while (node.ne) {
    if (node.ne.key === key) {
      let _prev = node; //从链表中删除，需要前置结点
      let _node = node.ne; //保存要删除的结点
      _prev.ne = node.ne.ne; //从容器中删除，前置结点的指针指向要删除结点的指针
      //从链表中删除
      if (this.head === _node) {
        //如果要删除的结点是头结点
        this.head = _node.next;
      } else if (this.tail === _node) {
        //如果要删除的结点时尾结点
        this.tail = _prev; //将尾指针指为前置结点
        _prev.next = null; //将前置结点的指针置为空
      } else {
        let cur = this.head;
        while (cur) {
          if (cur.key !== key) {
            pre = cur;
            cur = cur.next;
          } else {
            break;
          }
        }
        pre.next = cur.next;
      }
      this.size--;
      return true;
    } else {
      node = node.ne;
    }
  }
  return false;
};

myMap.prototype.has = function (key) {
  let index = this.hash(key);
  let node = this.collection[index];
  while (node.ne) {
    if (node.ne.key === key) {
      return true;
    } else {
      node = node.ne;
    }
  }
  return false;
};

//返回键名的遍历器
myMap.prototype.keys = function* () {
  let head = this.head;
  // 遍历链表，把链表中所有Key放入生成器中
  while (head) {
    if (head.key) {
      yield head.key;
    }
    head = head.next;
  }
};

//返回键值的遍历器
myMap.prototype.values = function* () {
  let head = this.head;
  while (head) {
    if (head.value) {
      yield head.value;
    }
    head = head.next;
  }
};

//返回所有成员 遍历器
myMap.prototype.entries = function* () {
  let head = this.head;
  while (head) {
    if (head.key) {
      yield [head.key, head.value];
    }
    head = head.next;
  }
};
myMap.prototype[Symbol.iterator] = myMap.prototype.entries; //默认遍历器接口，for of使用

//返回Map的所有成员，接受一个函数作为第一个参数，第二个参数是thisArg 如果省略了 thisArg 参数，或者其值为 null 或 undefined，this 则指向全局对象。
myMap.prototype.forEach = function (callbackFn, thisArg) {
  let head = this.head;
  while (head) {
    if (head.key) {
      callbackFn.call(thisArg, head.key, head.value, this);
      head = head.next;
    }
  }
};

myMap.prototype.clear = function () {
  this.init();
};

/**
 * @param  any key
 * @return {number}
 */

//Hash 方法，Hash的速算法我自己模拟一个，真正实践中的Hash算法肯定十分复杂
myMap.prototype.hash = function (key) {
  let index = 0;
  if (typeof key === "string") {
    //字符串的话取前10位，也没必要全部遍历完字符串，会影响性能、计算时间
    for (let i = 0; i < 10; i++) {
      index += isNaN(key.charCodeAt(i)) ? 0 : key.charCodeAt(i);
    }
  } else if (typeof key === "number") {
    index = isNaN(key)
      ? this.collection.length - 1
      : key % this.collection.length;
  } else if (typeof key === "object") {
    //    如果传入的是一个对象作为键，es6中的Map，底层Hash算法一定跟它的内存地址有关，因为取值时，比较的是是否是同一个引用。就算给了一个字面量相同的值，也不能取到值，必须试试引用相同的值才能取到
    //    这里我只能模拟key为对象时，经Hash算法得到的都是index=0了
    index = 0;
  } else if (typeof key === "undefined") {
    index = 1;
  } else if (typeof key === "boolean") {
    index = 2;
  }
  return index % this.collection.length;
};







let m = new myMap();
m.set("a", 1).set("b", 2);
console.log(m.get("a"), m.get("b")); //1 2

let obj = { name: "lolita" };
let obj2 = { name: "obj2" };
m.set(obj, "obj");
m.set(obj2, "obj2");

console.log(m.get(obj)); //obj
console.log(m.size); //4
console.log(m.delete("a")); //true
console.log(m.delete("a")); //false,因为'a'已经被删除过了

console.log(m.delete(obj)); //true
console.log(m.get(obj2)); //  obj2

for (let key of m.keys()) {
  console.log("key:", key); //key: b   key: { name: 'obj2' }
}

for (let value of m.values()) {
  console.log("value:", value); //value: 2  value: obj2
}
for (let item of m.entries()) {
  console.log(item[0], item[1]); //b 2    { name: 'obj2' } 'obj2'
}

for (let [key, value] of m) {
  console.log(key, value); //b 2    { name: 'obj2' } 'obj2'
}

let ooo = { name: "Jack" };
m.forEach(function (key, value, map) {
  console.log("key: %s, value: %s", key, value);
  console.log(this); //forEach第二个参数不写或者null或者undefined，this都会是全局对象
}, ooo);
//key: b, value: 2  { name: 'Jack' }
//   key: [object Object], value: obj2  { name: 'Jack' }

console.log(m.clear()); //undefined
