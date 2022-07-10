
/*
 * 订阅-发布模式：定义了对象之间的一种一对多的依赖关系，当一个对象的状态发生变化时，所有依赖它的对象都可以得到通知
 */


class EventEmitter {
  constructor() {
    this.eventMap = Object.create(null)
  }

  on(type, handler) {
    if (type in this.eventMap) {
      this.eventMap[type].push(handler)
    } else {
      this.eventMap[type] = [handler]
    }
    return this
  }

  off(type, handler) {
    if (type in this.eventMap) {
      this.eventMap[type] = this.eventMap[type].filter(it => it != handler)
    }
    return this
  }

  // once 实际是 on 的一个特殊版本，它只会触发一次，然后自动移除
  once(type, handler) {
    return this.on(type, function temp(...args) {
      handler.apply(this, args)
      this.off(type, temp)
    })
  }

  emit(type, ...args) {
    if (type in this.eventMap) {
      this.eventMap[type].forEach(handler => handler.apply(this, args))
    }
    return this
  }
}



var Pubsub = function () {
  var events = {};

  function on(type, handler) {
    events[type] = events[type] || [];
    events[type].push(handler);
  }

  function off(type, handler) {
    if (events[type]) {
      var index = evnets[type].indexOf(handler);

      events[type].splice(index, 1);
    }
  }

  function emit(type) {
    (events[type] || []).forEach(function (handler) {
      handler();
    });
  }

  return {
    on: on,
    off: off,
    emit: emit,
  };
};

var pubsub = Pubsub();

pubsub.on('hi', () => {
  console.log('hihihi');
});

pubsub.on('hi', () => {
  console.log('blabla');
});

pubsub.emit('hi');
// hihihi
// blabla





/*
 * 观察者模式：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都得到通知
 */
function Product(price) {
  this.price = price;
  this.actions = [];
}

Product.prototype.register = function (observer) {
  this.actions.push(observer);
};

Product.prototype.unregister = function (observer) {
  this.actions = this.actions.filter(function (action) {
    return observer !== action;
  });
};

Product.prototype.notify = function () {
  var self = this;

  this.actions.forEach(function (action) {
    action.update(self);
  });
};

var fees = {
  update: function (product) {
    product.price = product.price * 1.2;
  },
};

var proft = {
  update: function (product) {
    product.price = product.price * 2;
  },
};

var product = new Product(100);

product.register(fees);
product.register(proft);
product.notify();

console.log(product.price); // 240






/*
 * 单例模式：保证一个类仅有一个实例，并提供访问此实例的全局访问点
 */

var Singleton = (function () {
  var instance;

  function createInstance() {
    var object = { title: 'I am object' };

    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

var instance1 = Singleton.getInstance();
var instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true







/*
 * 代理模式：为一个对象提供一种代理以方便对它的访问
 */

function Car() {
  this.drive = function () {
    return 'driving';
  };
}

function CarProxy(driver) {
  this.drive = function () {
    if (driver.age < 18) return 'too young to drive';

    return new Car().drive();
  };
}

function Driver(age) {
  this.age = age;
}

var driver = new Driver(28),
  kid = new Driver(15);

var car = new CarProxy(driver);
console.log(car.drive()); // 'driving';

car = new CarProxy(kid);
console.log(car.drive()); // 'too young to drive';




/*
 * 装饰者模式
 * https://addyosmani.com/resources/essentialjsdesignpatterns/book/
 */

function MacBook() {
  this.cost = function () {
    return 10000;
  };
  this.screenSize = function () {
    return 13.3;
  };
}

function withProMemory(macbook) {
  var v = macbook.cost();

  macbook.cost = function () {
    return v + 2000;
  };
}

var mb = new MacBook();
withProMemory(mb);

console.log(mb.cost()); // 11500
console.log(mb.screenSize()); // 13.1





/*
 * 策略模式：就是能够把一系列“可互换的”算法封装起来，并根据用户需求来选择其中一种
 */

function ShoppingCart(discount, amount) {
  this.discount = discount;
  this.amount = amount;
}

ShoppingCart.prototype.checkout = function () {
  return this.discount(this.amount);
};

function guestStrategy(amount) {
  return amount;
}

function regularStrategy(amount) {
  return amount * 0.9;
}

function premiumStrategy(amount) {
  return amount * 0.8;
}

var guestCart = new ShoppingCart(guestStrategy, 100);
console.log(guestCart.checkout()); // 100

var regularCart = new ShoppingCart(regularStrategy, 100);
console.log(regularCart.checkout()); // 90

var premiumCart = new ShoppingCart(premiumStrategy, 100);
console.log(premiumCart.checkout()); // 80