var obj = {
  say: function () {
    var f1 = () => {
      console.log("1111", this);
    }
    f1();
  },
  pro: {
    a: () => {
      console.log(this);
    },
    aa() {
      console.log(this);
    },
    b: {
      c: () => { console.log(this) },
      cc() {
        console.log(this);
      }
    },

  }
}
var o = obj.say;
o();
obj.say();
obj.pro.a();
obj.pro.aa();
obj.pro.b.c();
obj.pro.b.cc();