function f(arr, target) {
  let res = []
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    obj[target - arr[i]] = arr[i]
    if (obj[arr[i]] !== undefined) {
      res.push([arr[i], obj[arr[i]]])
    }
  }
  return res.length === 1
}
console.log(f([0, 1, 2, 3, 4, 8, 10, 12], 3));
