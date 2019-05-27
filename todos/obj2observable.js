//定义一个Set集合存放要执行的 【函数方法（观察者）】，即这是一个观察者列表集合
const ObserversList = new Set();

//定义一个函数 将 【函数方法（观察者）】放入Set集合中，即这是一个添加观察者到Set集合中的函数
const observe = fn => ObserversList.add(fn);

//定义一个函数，返回原始对象的【Proxy代理（观察者目标）】，拦截赋值操作，触发各个函数
//在这里面，set方法会自动执行所有观察者
const observable = obj => new Proxy(obj, {
    set:function(target, key, value, receiver){
        //Reflect赋值操作
        const result = Reflect.set(target, key, value, receiver);

        //遍历Set集合，并执行集合中的对象函数方法
　　　　 //一旦Proxy代理对象（观察者目标）属性发生改变，就会立即执行观察者
        ObserversList.forEach(observer => observer());

        //返回Proxy代理对象（观察者目标）
        return result;
    }
});

//定义一个观察者目标person对象，
const person = observable({
  name: '张三',
  age: 20
});

//定义一个观察者函数 print
function print() {
  console.log(`${person.name}, ${person.age}`)
}

//注册观察者到观察者目标中
observe(print);

//改变观察者目标的属性值
person.name = '李四';

// 输出
// 李四, 20