

// Amicable Pair
// (A, B)  

let cache1 = {}
function getSum(num) {
  if (cache1[num]) {
    return cache1[num]
  }
  let sum = 0
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      sum += i
    }
  }
  cache1[num] = sum
  return sum
}

function judge(a, b) {
  if (a === b) return false
  let tmp1 = getSum(a)
  let tmp2 = getSum(b)
  return tmp1 === b && tmp2 === a
}

// let cache2 = {}
function f(n) {
  let res = []
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (judge(i, j)) {
        res.push([i, j])
        // if (!res.some(it => it[1] === i)) {
        // }
      }
    }
  }
  return res
}
// let a =judge(220,284)
console.log(f(5000))