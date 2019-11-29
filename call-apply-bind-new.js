// 参考 https://github.com/mqyqingfeng/Blog/issues/11
// 参考 https://github.com/jawil/blog/issues/16

// call的实现
// call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
// 第一版
Function.prototype.call2 = function(context) {
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 测试
var foo = {
    value: 1
};
function bar() {
    console.log(this.value);
}
bar.call2(foo); // 1

//最终版
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    // 这里 args 会自动调用 Array.toString() 这个方法
    var result = eval('context.fn(' + args +')');
    delete context.fn
    return result;
}

// 测试
var value = 2;
var obj = {
    value: 1
}
function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2
console.log(bar.call2(obj, 'kevin', 18));


// apply的实现
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }
    delete context.fn
    return result;
}


// bind的实现
// bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。
// 第一版
Function.prototype.bind2 = function (context) {
    var self = this;
    return function () {
        return self.apply(context);
    }
}

// 第二版
Function.prototype.bind2 = function (context) {
    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }
}

// 第三版
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。也就是说当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。
// 最终代码
Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};
    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
    // if (this instanceof F) {
    //     return new _this(...args, ...arguments)
    //     } else {
    //     return _this.apply(context, args.concat(...arguments))
    // }
}

var value = 2;
var foo = {
    value: 1
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'Jack');
var obj = new bindFoo(20);
// undefined
// Jack
// 20

obj.habit;
// shopping

obj.friend;
// kevin



// new的实现
// new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
// 第一版代码
function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, arguments);
    return obj;
};

// 第二版的代码
// 需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么
function objectFactory() {
    var obj = new Object(),
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
};

// https://github.com/75team/w3c/blob/master/articles/20190724_%E7%BB%99%E4%BD%A0%E4%B8%80%E4%B8%AA%E5%A5%87%E8%88%9E%E5%9B%A2%E9%9D%A2%E8%AF%95%E7%A7%98%E7%B1%8D%EF%BC%88%E4%B8%8B%EF%BC%89.md
function newOps (ctor) {
    if(typeof ctor !== 'function') {
      throw new Error('the first param must be a function');
    }
    const newObj = Object.create(ctor.prototype);
    const args = [].slice.call(arguments, 1);
    const ctorReturnResult = ctor.apply(newObj, args);

    if((typeof ctorReturnResult === 'object' && typeof ctorReturnResult !== null) || typeof ctorReturnResult === 'function') {
      return ctorReturnResult;
    }
    return newObj;
  }

  // https://juejin.im/post/5d2ee123e51d4577614761f8
  function myNew (fun) {
    return function () {
      // 创建一个新对象且将其隐式原型指向构造函数原型
      let obj = {
        __proto__ : fun.prototype
      }
      // 执行构造函数
      fun.call(obj, ...arguments)
      // 返回该对象
      return obj
    }
  }

  function person(name, age) {
    this.name = name
    this.age = age
  }
// let obj = myNew(person)('chen', 18)
// {name: "chen", age: 18}


Object.create = function (o) {
    function f() { }
    f.prototype = o;
    return new f;
};

function instanceOf(left, right) {
    let leftValue = left.__proto__
    let rightValue = right.prototype
    while (true) {
      if (leftValue === null) {
        return false
      }
      if (leftValue === rightValue) {
        return true
      }
      leftValue = leftValue.__proto__
    }
  }


  // js实现一个继承方法,借用构造函数继承实例属性
  function Child () {
    Parent.call(this)
  }
  // 寄生继承原型属性
  (function () {
    let Tmp = function () {}
    Tmp.prototype = Parent.prototype
    Child.prototype = new Tmp()
  })()




