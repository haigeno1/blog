// 给你一个长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 res ，其中 res[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。
// 示例:
// 输入: [1,2,3,4]
// 输出: [24,12,8,6]

// 提示：题目数据保证数组之中任意元素的全部前缀元素和后缀（甚至是整个数组）的乘积都在 32 位整数范围内。
// 说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。

function f(nums) {
  let res = []
  let tmp1 = Array(nums.length).fill(1)
  let tmp2 = Array(nums.length).fill(1)
  for (let i = 1; i <= nums.length - 1; i++) {
    tmp1[i] = tmp1[i - 1] * nums[i - 1]
  }
  res[nums.length - 1] = tmp1[nums.length - 1]
  for (let j = nums.length - 2; j >= 0; j--) {
    tmp2[j] = tmp2[j + 1] * nums[j + 1]
    res[j] = tmp1[j] * tmp2[j]
  }
  return res
}
console.log(f([1, 2, 3, 4]))
console.log(f([0, 2, 6, 8]))
console.log(f([-1, -2, 3, 4]))
