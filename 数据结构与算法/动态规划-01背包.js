/*
 * @Author: haigeno1 2276765922@qq.com
 * @Date: 2022-07-19 21:43:49
 * @LastEditors: haigeno1 2276765922@qq.com
 * @LastEditTime: 2022-07-19 21:53:47
 * @FilePath: /js-snippets/数据结构与算法/动态规划-01背包.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// https://programmercarl.com/
// 依然动规五部曲分析一波。

// 1.确定dp数组以及下标的含义
//   对于背包问题，有一种写法， 是使用二维数组，即dp[i][j] 表示从下标为[0-i]的物品里任意取，放进容量为j的背包，价值总和最大是多少。
// 2.确定递推公式
//   dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
// 3.dp数组如何初始化.关于初始化，一定要和dp数组的定义吻合，否则到递推公式的时候就会越来越乱。
// 4.确定遍历顺序
//   先遍历 物品还是先遍历背包重量呢？其实都可以！！ 但是先遍历物品更好理解。
// 5.举例推导dp数组.做动态规划的题目，最好的过程就是自己在纸上举一个例子把对应的dp数组的数值推导一下，然后在动手写代码！
function testWeightBagProblem(weight, value, size) {
  // 定义 dp 数组
  const len = weight.length,
    dp = Array(len).fill().map(() => Array(size + 1).fill(0));

  // 初始化
  for (let j = weight[0]; j <= size; j++) {
    dp[0][j] = value[0];
  }

  // weight 数组的长度len 就是物品个数
  for (let i = 1; i < len; i++) { // 遍历物品
    for (let j = 0; j <= size; j++) { // 遍历背包容量
      if (j < weight[i]) dp[i][j] = dp[i - 1][j];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
    }
  }

  console.table(dp)

  return dp[len - 1][size];
}

function test() {
  console.log(testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6));
}

test();