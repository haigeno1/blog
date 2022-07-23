// https://programmercarl.com/0015.%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC
// https://leetcode.cn/problems/3sum/
/**
 *  nsum通用解法，支持2sum，3sum，4sum...等等
 *  时间复杂度分析：
 *  1. n = 2时，时间复杂度O(NlogN)，排序所消耗的时间。、
 *  2. n > 2时，时间复杂度为O(N^n-1)，即N的n-1次方，至少是2次方，此时可省略排序所消耗的时间。举例：3sum为O(n^2)，4sum为O(n^3)
 * @param {number[]} nums
 * @return {number[][]}
 */
// N数之和 nsum通用解法核心方法
function nSumTarget(nums, n, start, target) {
  // 前提：nums要先排序好
  let res = [];
  if (n === 2) {
    res = towSumTarget(nums, start, target);
    console.log('🚀 f~~ ~ file: nSum通用解法.js ~ line 17 ~ nSumTarget ~ res', res)
  } else {
    for (let i = start; i < nums.length; i++) {
      // 递归求(n - 1)sum
      let subRes = nSumTarget(
        nums,
        n - 1,
        i + 1,
        target - nums[i]
      );
      for (let j = 0; j < subRes.length; j++) {
        res.push([nums[i], ...subRes[j]]);
      }
      // 跳过相同元素
      while (nums[i] === nums[i + 1]) i++;
    }
  }
  return res;
}

function towSumTarget(nums, start, target) {
  // 前提：nums要先排序好
  let res = [];
  let len = nums.length;
  let left = start;
  let right = len - 1;
  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum < target) {
      while (nums[left] === nums[left + 1]) left++;
      left++;
    } else if (sum > target) {
      while (nums[right] === nums[right - 1]) right--;
      right--;
    } else {
      // 相等
      res.push([nums[left], nums[right]]);
      // 跳过相同元素
      while (nums[left] === nums[left + 1]) left++;
      while (nums[right] === nums[right - 1]) right--;
      left++;
      right--;
    }
  }
  return res;
}
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  // n = 3，此时求3sum之和
  return nSumTarget(nums, 3, 0, 0);
};

threeSum([-1, 0, 1, 2, -1, -4])