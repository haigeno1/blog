// https://github.com/mqyqingfeng/ScrollToTop/blob/master/scrollToTop.js
// requestAnimationFrame 兼容到 IE6
var lastTime = 0;
var vendors = ['webkit', 'moz'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
    window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}

// bind 函数在 IE7-8 不能使用
Function.prototype.bind = Function.prototype.bind || function (context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () { };

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
  }

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}


const ajax = {};
ajax.httpRequest = () => {
  //判断是否支持XMLHttpRequest对象
  // Chrome, Firefox, Opera 8.0+, Safari
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
  //兼容IE浏览器
  const versions = [
    "MSXML2.XmlHttp.6.0",
    "MSXML2.XmlHttp.5.0",
    "MSXML2.XmlHttp.4.0",
    "MSXML2.XmlHttp.3.0",
    "MSXML2.XmlHttp.2.0",
    "Microsoft.XmlHttp"
  ];
  //定义局部变量xhr,储存IE浏览器的ActiveXObject对象
  let xhr;
  for (let i = 0; i < versions.length; i++) {
    try {
      xhr = new ActiveXObject(versions[i]);
      break;
    } catch (e) { }
  }
  return xhr;
};

ajax.send = (url, callback, method, data, async) => {
  //默认异步
  if (async === undefined) {
    async = true;
  }
  let httpRequest = ajax.httpRequest();
  //初始化HTTP请求
  httpRequest.open(method, url, async);
  //onreadystatechange函数对象
  httpRequest.onreadystatechange = () => {
    //readyState 的值等于4，从服务器拿到了数据
    if (httpRequest.readyState == 4) {
      //回调服务器响应数据
      callback(httpRequest.responseText);
    }
  };
  if (method == "POST") {
    //给指定的HTTP请求头赋值
    httpRequest.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
  }
  //发送HTTP请求
  httpRequest.send(data);
};
//实现GET请求
ajax.get = (url, data, callback, async) => {
  const query = [];
  for (let key in data) {
    query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  }
  ajax.send(
    `${url}${query.length ? `?${query.join("&")}` : ""}`,
    callback,
    "GET",
    null,
    async
  );
};
//实现POST请求
ajax.post = (url, data, callback, async) => {
  const query = [];
  for (let key in data) {
    query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
  }
  ajax.send(url, callback, "POST", query.join("&"), async);
};

// https://mqyqingfeng.github.io/LazyLoad/
mergeDebounceAndThrottle = function () {
  var self = this;

  if (!opts.useDebounce && !!timer) {
    return;
  }

  clearTimeout(timer);

  timer = setTimeout(function () {
    timer = null;
    self.render();
  }, this.opts.delay);
};


// https://www.cnblogs.com/xiaohuochai/p/7978752.html
function Super(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Super.prototype.sayName = function () {
  return this.name;
};

function Sub(name, age) {
  Super.call(this, name);
  this.age = age;
}
if (!Object.create) {
  Object.create = function (proto) {
    function F() { };
    F.prototype = proto;
    return new F;
  }
}
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

var instance1 = new Sub("bai", 29);
instance1.colors.push("black");
console.log(instance1.colors);//['red','blue','green','black']
instance1.sayName();//"bai"

var instance2 = new Sub("hu", 27);
console.log(instance2.colors);//['red','blue','green']
instance2.sayName();//"hu"
