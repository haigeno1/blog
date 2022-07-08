// https://juejin.cn/post/6844903585268891662
// JavaScript 调用 Native 的方式，主要有两种：注入 API 和 拦截 URL SCHEME。
// Native 调用 JavaScript，其实就是执行拼接 JavaScript 字符串，从外部调用 JavaScript 中的方法，因此 JavaScript 的方法必须在全局的 window 上。

(function () {
  var id = 0,
    callbacks = {},
    registerFuncs = {};

  window.JSBridge = {
    // 调用 Native
    invoke: function (bridgeName, callback, data) {
      // 判断环境，获取不同的 nativeBridge
      var thisId = id++; // 获取唯一 id
      callbacks[thisId] = callback; // 存储 Callback
      nativeBridge.postMessage({
        bridgeName: bridgeName,
        data: data || {},
        callbackId: thisId // 传到 Native 端
      });
    },
    receiveMessage: function (msg) {
      var bridgeName = msg.bridgeName,
        data = msg.data || {},
        callbackId = msg.callbackId, // Native 将 callbackId 原封不动传回
        responstId = msg.responstId;
      // 具体逻辑
      // bridgeName 和 callbackId 不会同时存在
      if (callbackId) {
        if (callbacks[callbackId]) { // 找到相应句柄
          callbacks[callbackId](msg.data); // 执行调用
        }
      } else if (bridgeName) {
        if (registerFuncs[bridgeName]) { // 通过 bridgeName 找到句柄
          var ret = {},
            flag = false;
          registerFuncs[bridgeName].forEach((callback) => {
            callback(data, function (r) {
              flag = true;
              ret = Object.assign(ret, r);
            });
          });
          if (flag) {
            nativeBridge.postMessage({ // 回调 Native
              responstId: responstId,
              ret: ret
            });
          }
        }
      }
    },
    register: function (bridgeName, callback) {
      if (!registerFuncs[bridgeName]) {
        registerFuncs[bridgeName] = [];
      }
      registerFuncs[bridgeName].push(callback); // 存储回调
    }
  }
})();
