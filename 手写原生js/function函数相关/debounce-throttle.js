
// JavaScript专题系列二十篇正式完结！
// https://github.com/mqyqingfeng/Blog/issues/53

// JavaScript深入系列15篇正式完结！
// https://github.com/mqyqingfeng/Blog/issues/17


// debounce 防抖:触发完事件 n 秒内不再触发事件才执行
// 第一版
function debounce(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// 将 this 指向正确的对象, event 对象
// 第三版
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}


// 第五版
// immediate 参数判断是否是立刻执行
function debounce(func, wait, immediate) {
  var timeout, result;
  return function () {
      var context = this;
      var args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
          // 如果已经执行过，不再执行
          var callNow = !timeout;
          timeout = setTimeout(function(){
              timeout = null;
          }, wait)
          if (callNow) result = func.apply(context, args)
      }
      else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
      return result;
  }
}


// 立刻执行， 立即取消
// 第六版
function debounce(func, wait, immediate) {
  var timeout, result;
  var debounced = function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}











// throttle 节流：持续触发事件，每隔一段时间，只执行一次事件
// 使用时间戳,事件会立刻执行,事件停止触发后没有办法再执行事件
function throttle(func, wait) {
  var context, args;
  var previous = 0;
  return function () {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}

// 设置定时器,事件会在 n 秒后第一次执行,事件停止触发后依然会再执行一次
function throttle(func, wait) {
  var timeout;
  return function (...args) {
    context = this;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

// 鼠标移入能立刻执行，停止触发的时候还能再执行一次
// 第三版
function throttle(func, wait) {
  var timeout, context, args, result;
  var previous = 0;
  var later = function () {
    previous = +new Date();
    timeout = null;
    func.apply(context, args);
  };
  var throttled = function () {
    var now = +new Date();
    //下次触发 func 剩余的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}

// 增加leading，trailing，cancel。
// leading：false 和 trailing: false 不能同时设置。
// 第四版
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };
  var throttled = function () {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };
  return throttled;
}




/*
* Prevents function execution if call frequency is more than one per set period of time
*/
// 有leading 有trailing
const throttle = (cb, delay = 1000) => {
  let shouldWait = false;
  let waitingArgs = null;
  const timeoutFunc = () => {
      if (waitingArgs === null) {
          shouldWait = false;
      } else {
          cb(...waitingArgs);
          waitingArgs = null;
          setTimeout(timeoutFunc, delay);
      }
  };
  return (...args) => {
      if (shouldWait) {
          waitingArgs = args;
          return;
      }
      cb(...args);
      shouldWait = true;
      setTimeout(timeoutFunc, delay);
  };
};




function test() {
  console.log('testtest')
}
var f = debounce(test, 3000)
f()
setTimeout(f, 1000)
setTimeout(f, 4000)
setTimeout(f, 5000)
setTimeout(f, 7000)
setTimeout(f, 9000)
setTimeout(f, 10000)