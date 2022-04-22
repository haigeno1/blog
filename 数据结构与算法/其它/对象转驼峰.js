// The TestCase is shown below
// Input : 1 2
// Output : 3
function replacer(match, p1, p2, p3, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
  return p1.toUpperCase();
}
function change(str) {
  return str.replace(/_(.)/g, replacer)
}

function transform(obj) {
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(it => transform(it))
  } else {
    let res = {}
    Object.keys(obj).forEach(key => {
      res[change(key)] = transform(obj[key])
    })
    return res
  }
}
var obj = {
  a_test_b: {
    hello_world: {
      _abc: {
      },
      def: {
        test_bili_1: [{
          inner_bili: 2
        }]
      }
    }
  }
}
console.log(JSON.stringify(transform(obj)))

