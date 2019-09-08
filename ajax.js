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
