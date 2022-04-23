// https://github.com/liangbus/blogging/issues/34
// polyfill for requestanimationframe

if (!Date.now)
  Date.now = function () { return new Date().getTime(); };

(function () {
  'use strict';

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
      || window[vp + 'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function (callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      return setTimeout(function () { callback(lastTime = nextTime); },
        nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
}());




const framesMonitor = (() => {
  // const SIXTY_TIMES = 60;
  const requestAnimationFrame = window.requestAnimationFrame;
  if (requestAnimationFrame) {
    return (cb) => {
      const timer = requestAnimationFrame(() => {
        cb();
        window.cancelAnimationFrame(timer);
      });
    };
    // requestAnimationFrame 兼容实现
  }
})();
const ONE_SECOND = 1000

function stuck() {
  const stucksFPS = [];
  const startTime = Date.now();
  const loop = (startCountTime = Date.now(), lastFrameCount = 0) => {
    const now = Date.now();
    // 每一帧进来，计数+1，传参累计
    const accFrameCount = lastFrameCount + 1;
    // console.log('accFrameCount', accFrameCount)
    // 大于等于一秒钟为一个周期；比如如果是正常的fps： 那当第61次时，按最优1秒60帧，即(1/60)*61 = 1017毫秒，这里就满足
    if (now > ONE_SECOND + startCountTime) {
      // 计算经过的时间间隔值，换算成秒
      const timeInterval = (now - startCountTime) / ONE_SECOND;
      // 计算一秒钟的fps： 当前计数总次数 / 经过的时长；
      const fps = Math.round(accFrameCount / timeInterval);
      if (fps > 30) { // fps 小于30 判断为卡顿
        stucksFPS.pop();
      } else {
        stucksFPS.push(fps);
      }
      // 连续三次小于30 上报卡顿（还有一种特殊情况，前面2次卡顿，第三次不卡，接着再连续两次卡顿，也满足）
      if (stucksFPS.length === 3) {
        console.log(new Error(`Page Stuck captured: ${location.href} ${stucksFPS.join(',')} ${now - startTime}ms`));
        // 清空采集到的卡顿数据
        stucksFPS.length = 0;
      }
      // 避免持续采集，休息一个周期（这里定义的是一分钟），重新开启采样
      const timer = setTimeout(() => {
        loop();
        clearTimeout(timer);
      }, 60 * 1000);
      return;
    }
    framesMonitor(() => loop(startCountTime, accFrameCount));
  };
  loop();
};