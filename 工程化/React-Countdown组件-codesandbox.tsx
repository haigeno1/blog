// react countdown 组件

// https://codesandbox.io/s/elegant-galileo-qe8szd
// 含各种错误case
// https://codesandbox.io/s/f9bz9


// 别人的codesanbox模板<https://codesandbox.io/s/react-hook-async-example-forked-veq0l0?file=/src/App.js>
// <https://playcode.io/react/>
// <https://codesandbox.io/s/new>


import { useState, useEffect, useRef } from "react";


// count变成useRef
var Timer = () => {
  const [count, setCount] = useState(10)
  const latestCount = useRef(count) // 定义一个ref，初始值是10
  const otherFn = () => {
      console.log('otherFn')
  }
  useEffect(() => {
      latestCount.current = count // 更新
  })
  useEffect(() => {
      const timer = setInterval(() => {
          if (latestCount.current === 0) { // 此处判断latestCount.current，而不是count
              clearInterval(timer)
              return
          }
          console.log('count', count)
          setCount(c => c - 1)
      }, 1000)
      otherFn()
      return () => {
          clearInterval(timer)
      }
  }, [])
  return <div>{count}</div>
}


// count变成useRef
var Timer = () => {
  const [count, setCount] = useState(10);
  const latestCount = useValuesRef(count); // useValuesRef
  const otherFn = () => {
    console.log("otherFn");
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (latestCount.current === 0) {
        clearInterval(timer);
        return;
      }
      setCount((c) => c - 1);
    }, 1000);
    otherFn();
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <div>{count}</div>;
};


// timer变成useRef 直接let timer 也是错误的
var Timer = () => {
  const [count, setCount] = useState(10)
  const timer = useRef(null)
  const otherFn = () => {
    console.log("otherFn");
  };
  useEffect(() => {
      otherFn()
      timer.current = setInterval(() => {
          setCount(c => c - 1)
      }, 1000)
      return () => {
          clearInterval(timer.current)
      }
  }, [])

  useEffect(() => {
      if (count === 0) {
          clearInterval(timer.current) // 这里可以成功清除定时器
          return
      }
  }, [count])
  return <div>{count}</div>;
};


var Timer = () => {
  const [count, setCount] = useState(10);
  const otherFn = () => {
    console.log("otherFn");
  };
  useInterval(
    () => {
      console.log("count", count);
      setCount(count - 1); // 每次渲染都会走这里，所以count值为最新
    },
    count === 0 ? null : 1000
  );
  useEffect(() => {
    otherFn();
  }, []);

  return <div>{count}</div>;
};
