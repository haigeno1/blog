// 小火柴的蓝色理想
// https://www.cnblogs.com/xiaohuochai/p/7978752.html

// 【寄生组合继承】
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