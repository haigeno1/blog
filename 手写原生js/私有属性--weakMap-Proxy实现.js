// https://juejin.cn/post/6844903666302844941

// https://juejin.cn/post/7080131411503972366
// class 用于定义围绕某个概念的一系列属性和方法，这些属性和方法有的是内部用的，有的是对外的。只有内部用的属性、方法需要实现私有化。
// 实现私有属性方法，我树立了 6 种方式：

// 通过下划线 _prop 从命名上区分
// 通过 Proxy 来定义 get、set、ownKeys 的逻辑
// 通过 Symbol 来定义唯一的属性名，不能通过 keys 拿到
// 通过 WeakMap 来保存所有对象的私有属性和方法
// 通过 #prop 的 es 新语法实现私有，babel 和 tsc 会把它们编译成 WeakMap 的方式
// 通过 ts 的 private 在编译时约束

// 这六种方式，有三种只是伪私有，比如 _prop（依然可以访问）、ts 的 private（运行时可访问）、Symbol（可以通过 Object.getOwnSymbols 拿到 symbol 来访问）。
// 另外三种是真正的私有，包括 Proxy、WeakMap、#prop（目前是编译为 WeakMap 的方式）。
// 有的是从属性名上想办法，比如 _prop 和 Symbol，有的是从 this 上想办法，比如 Proxy（包一层） 和 WeakMap（不挂到 this），有的是从语言本身想办法，比如 ts 的 private 或者 es 新语法的 #prop。






// 所以这种方式实现的私有属性，实际上是被所有实例共享的，如果需要每个实例单独拥有自己的私有属性，这种方法就不行了。
const Person = (function() {
  let name;
  function Person(n) {
      name = n;
  }
  Person.prototype.getName = function() {
      return name;
  };
  return Person;
}());
let person1 = new Person('小明');
let person2 = new Person('大明');
console.log(person1.getName()); // 大明





// 即便Person的某个实例对象被垃圾回收了，private对象里存储的它的全部私有属性依旧不会被回收，这会导致内存泄漏问题
// 每个实例对象多出了一个_privateId属性，而且该方法不够直观优雅
const Person = (function() {
  const private = {};
  let privateId = 0;

  function Person(name) {
    Object.defineProperty(this, '_privateId', {
      value: privateId++,
      writable: false, // 设为不可写，_privateId就不会被更改了（其实默认就是false）
    });
    this._privateId = privateId++;
    private[this._privateId] = {};
    private[this._privateId].name = name;    
  }

  Person.prototype.getName = function() {
      return private[this._privateId].name;
  };

  return Person;
}());

let person1 = new Person('小明');
let person2 = new Person('大明');
console.log(person1.getName()); // 小明








// 既然我们不想多造一个单独的_privateId属性去实现私有属性的存储，那还有什么值可以作为该实例对象的唯一标识呢？它的内存地址？可是js似乎不允许直接获取一个对象的地址。
// 我们不再需要额外的id去标识每个实例，那内存泄漏问题呢？这就是为何要用WeakMap而不是Map了，WeakMap对key对象仅有“弱引用”，当没有其它引用指向该key对象时，该对象即可被垃圾回收，WeakMap不会阻止回收。
const Person = (function() {
  const private = new WeakMap();

  function Person(name) {
    private.set(this, {});
    private.get(this).name = name;
  }

  Person.prototype.getName = function() {
      return private.get(this).name;
  };

  return Person;
}());

let person1 = new Person('小明');
let person2 = new Person('大明');
console.log(person1.getName()); // 小明




// Proxy方式实现
class Dong {
  constructor() {
      this._name = 'dong';
      this._age = 20;
      this.friend = 'guang';
  }
  hello() {
      return 'I\'m ' + this._name + ', '  + this._age + ' years old';
  }
}
const dong = new Dong();
const handler = {
    get(target, prop) {
        if (prop.startsWith('_')) {
            return;
        }
        return target[prop];
   },
   set(target, prop, value) {
    if (prop.startsWith('_')) {
        return;
     }
     target[prop] = value;
   },
   ownKeys(target, prop) {
      return Object.keys(target).filter(key => !key.startsWith('_'))
   },
 }
const proxy = new Proxy(dong, handler)


