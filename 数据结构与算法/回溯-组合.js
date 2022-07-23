/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const res = [];
  const dfs = (cur, temp) => {
    if (cur > n + 1) return
    // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
    // if (temp.length + (n - cur + 1) < k) {
    //   return;
    // }
    // 记录合法的答案
    if (temp.length == k) {
      res.push(temp);
      return;
    }
    // 考虑选择当前位置
    dfs(cur + 1, [...temp, cur]);
    // 考虑不选择当前位置
    dfs(cur + 1, temp);
  };
  dfs(1, []);
  return res;
};
combine(5, 2)