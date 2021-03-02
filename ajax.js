function ajax(params) {
  params = params || {};
  params.data = params.data || {};
  var json = params.jsonp ? jsonp(params) : json(params);
  // ajax请求
  function json(params) {
    params.type = (params.type || 'GET').toUpperCase();
    params.data = formatParams(params.data);
    var xhr = null;

    // 实例化XMLHttpRequest对象
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else {
      // IE6及其以下版本
      xhr = new ActiveXObjcet('Microsoft.XMLHTTP');
    };

    // 监听事件
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var status = xhr.status;
        if (status >= 200 && status < 300) {
          var response = '';
          var type = xhr.getResponseHeader('Content-type');
          if (type.indexOf('xml') !== -1 && xhr.responseXML) {
            response = xhr.responseXML; //Document对象响应
          } else if (type === 'application/json') {
            response = JSON.parse(xhr.responseText); //JSON响应
          } else {
            response = xhr.responseText; //字符串响应
          };
          params.success && params.success(response);
        } else {
          params.error && params.error(status);
        }
      }
    };

    // 连接和传输数据
    if (params.type == 'GET') {
      xhr.open(params.type, params.url + '?' + params.data, true);
      xhr.send(null);
    } else {
      xhr.open(params.type, params.url, true);
      //设置提交时的内容类型
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      xhr.send(params.data);
    }
  }

  // 一个简单的jsonp实现，其实就是拼接url，然后将动态添加一个script元素到头部。

  function jsonp(req){
      var script = document.createElement('script');
      var url = req.url + '?callback=' + req.callback.name;
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script); 
  }

  function hello(res){
      alert('hello ' + res.data);
  }
  jsonp({
      url : '',
      callback : hello 
  });

  var http = require('http');
  var urllib = require('url');

  var port = 8080;
  var data = {'data':'world'};

  http.createServer(function(req,res){
      var params = urllib.parse(req.url,true);
      if(params.query.callback){
          console.log(params.query.callback);
          //jsonp
          var str = params.query.callback + '(' + JSON.stringify(data) + ')';
          res.end(str);
      } else {
          res.end();
      }
      
  }).listen(port,function(){
      console.log('jsonp server is on');
  });


  // jsonp请求
  function jsonp(params) {
    //创建script标签并加入到页面中
    var callbackName = params.jsonp;
    var head = document.getElementsByTagName('head')[0];
    // 设置传递给后台的回调参数名
    params.data['callback'] = callbackName;
    var data = formatParams(params.data);
    var script = document.createElement('script');
    head.appendChild(script);

    //创建jsonp回调函数
    window[callbackName] = function (json) {
      head.removeChild(script);
      clearTimeout(script.timer);
      window[callbackName] = null;
      params.success && params.success(json);
    };

    //发送请求
    script.src = params.url + '?' + data;

    //超时处理
    if (params.time) {
      script.timer = setTimeout(function () {
        window[callbackName] = null;
        head.removeChild(script);
        params.error && params.error({
          message: '超时'
        });
      }, time);
    }
  };
  //格式化参数
  function formatParams(data) {
    var arr = [];
    for (var name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    };
    // 添加一个随机数，防止缓存
    arr.push('v=' + random());
    return arr.join('&');
  }
  // 获取随机数
  function random() {
    return Math.floor(Math.random() * 10000 + 500);
  }
}

/*
ajax({
  url: 'test.php',   // 请求地址
  type: 'POST',   // 请求类型，默认"GET"，还可以是"POST"
  jsonp: 'jsonpCallback',
  data: {'b': '异步请求'},   // 传输数据
  success: function(res){   // 请求成功的回调函数
    console.log(JSON.parse(res));
  },
  error: function(error) {}   // 请求失败的回调函数
});
*/


// https://juejin.im/post/5d2ee123e51d4577614761f8
// 1. 简单流程

// 实例化
let xhr = new XMLHttpRequest()
// 初始化
xhr.open(method, url, async)
// 发送请求
xhr.send(data)
// 设置状态变化回调处理请求结果
xhr.onreadystatechange = () => {
  if (xhr.readyStatus === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}

// 2. 基于promise实现

function ajax (options) {
  // 请求地址
  const url = options.url
  // 请求方法
  const method = options.method.toLocaleLowerCase() || 'get'
  // 默认为异步true
  const async = options.async
  // 请求参数
  const data = options.data
  // 实例化
  const xhr = new XMLHttpRequest()
  // 请求超时
  if (options.timeout && options.timeout > 0) {
    xhr.timeout = options.timeout
  }
  // 返回一个Promise实例
  return new Promise ((resolve, reject) => {
    xhr.ontimeout = () => reject && reject('请求超时')
    // 监听状态变化回调
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        // 200-300 之间表示请求成功，304资源未变，取缓存
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          resolve && resolve(xhr.responseText)
        } else {
          reject && reject()
        }
      }
    }
    // 错误回调
    xhr.onerror = err => reject && reject(err)
    let paramArr = []
    let encodeData
    // 处理请求参数
    if (data instanceof Object) {
      for (let key in data) {
        // 参数拼接需要通过 encodeURIComponent 进行编码
        paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      }
      encodeData = paramArr.join('&')
    }
    // get请求拼接参数
    if (method === 'get') {
      // 检测url中是否已存在 ? 及其位置
      const index = url.indexOf('?')
      if (index === -1) url += '?'
      else if (index !== url.length -1) url += '&'
      // 拼接url
      url += encodeData
    }
    // 初始化
    xhr.open(method, url, async)
    // 发送请求
    if (method === 'get') xhr.send(null)
    else {
      // post 方式需要设置请求头
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
      xhr.send(encodeData)
    }
  })
}
