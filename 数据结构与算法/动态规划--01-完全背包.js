/*
 * @Author: haigeno1 2276765922@qq.com
 * @Date: 2022-07-19 21:43:49
 * @LastEditors: haigeno1 2276765922@qq.com
 * @LastEditTime: 2022-07-20 23:05:05
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
  console.log(testWeightBagProblem([2, 3, 1, 5], [12, 20, 5, 55], 7));
}

test();


// 滚动数组
// 在一维dp数组中，dp[j]表示：容量为j的背包，所背的物品价值可以最大为dp[j]。
// 递归公式：dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
// 倒序遍历是为了保证物品i只被放入一次！。但如果一旦正序遍历了，那么物品0就会被重复加入多次！为什么倒序遍历，就可以保证物品只放入一次呢？从后往前循环，每次取得状态不会和之前取得状态重合，这样每种物品就只取一次了。倒序遍历的原因是，本质上还是一个对二维数组的遍历，并且右下角的值依赖上一层左上角的值，因此需要保证左边的值仍然是上一层的，从右向左覆盖。
// 再来看看两个嵌套for循环的顺序，代码中是先遍历物品嵌套遍历背包容量，那可不可以先遍历背包容量嵌套遍历物品呢？不可以！因为一维dp的写法，背包容量一定是要倒序遍历（原因上面已经讲了），如果遍历背包容量放在上一层，那么每个dp[j]就只会放入一个物品，即：背包里只放入了一个物品
function testWeightBagProblem(weight, value, size) {
  const len = weight.length;
  const dp = Array(size + 1).fill(0);
  for (let i = 0; i < len; i++) {
    // 这里可以直接 j >= weight[i] 因为j是有序递减的可以提前跳出,  也可以 j>=0再在下面判断 j >= weight[i]
    for (let j = size; j >= weight[i]; j--) {
      dp[j] = Math.max(dp[j], value[i] + dp[j - weight[i]]);
    }
  }

  // wrong 正序遍历 导致 会重复添加物品
  // for (let i = 0; i < len; i++) {
  //   for (let j = weight[i]; j <= size ; j++) {
  //     dp[j] = Math.max(dp[j], value[i] + dp[j - weight[i]]);
  //   }
  // }


  // wrong 先遍历背包容量嵌套遍历物品 导致 每个背包只添加了一个物品
  // // for (let j = 0; j <= size; j++) {
  // for (let j = size; j >= 0; j--) {
  //   for (let i = 0; i < len; i++) {
  //     if (j >= weight[i]) {
  //       dp[j] = Math.max(dp[j], value[i] + dp[j - weight[i]]);
  //     } 
  //   }
  // }

  return dp[size];
}


function test() {
  console.log(testWeightBagProblem([2, 3, 1, 5], [12, 20, 5, 55], 7));
}

test();





// 完全背包 遍历顺序都可以
// 求装满背包有几种方法，一般递推公式都是：dp[j] += dp[j - nums[i]];
// 在求装满背包有几种方案的时候，认清遍历顺序是非常关键的。如果求组合数就是外层for循环遍历物品，内层for遍历背包。如果求排列数就是外层for遍历背包，内层for循环遍历物品。


// 先遍历物品，再遍历背包容量
function test_completePack1(weight, value, bagWeight) {
  let dp = new Array(bagWeight + 1).fill(0)
  for (let i = 0; i <= weight.length - 1; i++) {
    for (let j = weight[i]; j <= bagWeight; j++) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    }
  }
  console.table(dp)
}
test_completePack1([2, 3, 1, 5], [12, 20, 5, 55], 7)



// 先遍历背包容量，再遍历物品
function test_completePack2(weight, value, bagWeight) {
  let dp = new Array(bagWeight + 1).fill(0)
  for (let j = 0; j <= bagWeight; j++) {
    for (let i = 0; i <= weight.length - 1; i++) {
      if (j >= weight[i]) {
        dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
      }
    }
  }
}
test_completePack2([2, 3, 1, 5], [12, 20, 5, 55], 7)




// 二维数组
function test_completePack3(weight, value, size) {
  // const len = weight.length,
  //   dp = Array(len).fill().map(() => Array(size + 1).fill(0));
  // // 为了第一行进行的特殊处理
  // for (let j = 1; j <= size; j++) {
  //   if (j >= weight[0]) {
  //     dp[0][j] = Math.max(dp[0][j - 1], dp[0][j - weight[0]] + value[0]);
  //   } else {
  //     dp[0][j] = dp[0][j - 1];
  //   }
  // }

  // // weight 数组的长度len 就是物品个数
  // for (let i = 1; i <= len - 1; i++) { // 遍历物品
  //   for (let j = 1; j <= size; j++) { // 遍历背包容量
  //     if (j >= weight[i]) {
  //       dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weight[i]] + value[i]);
  //     } else {
  //       dp[i][j] = dp[i - 1][j];
  //     }
  //   }
  // }
  // console.table(dp)
  // return dp[len - 1][size]





  // // ok dp的i与weight value的i 一致
  // weight = [0, ...weight]
  // value = [0, ...value]
  // const len = weight.length,
  //   dp = Array(len).fill().map(() => Array(size + 1).fill(0));

  // for (let i = 1; i <= len - 1; i++) { // 遍历物品
  //   for (let j = 1; j <= size; j++) { // 遍历背包容量
  //     if (j >= weight[i]) {
  //       dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weight[i]] + value[i]);
  //     } else {
  //       dp[i][j] = dp[i - 1][j];
  //     }
  //   }
  // }
  // console.table(dp)
  // return dp[len][size];



  // ok  dp的i与weight value的i 不一致
  const len = weight.length,
    dp = Array(len + 1).fill().map(() => Array(size + 1).fill(0));

  for (let i = 1; i <= len; i++) { // 遍历物品
    for (let j = 1; j <= size; j++) { // 遍历背包容量
      if (j >= weight[i - 1]) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weight[i - 1]] + value[i - 1]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  console.table(dp)

  return dp[len][size];

}
test_completePack3([2, 3, 1, 5], [12, 20, 5, 55], 7)



// 零钱兑换 LeetCode 518 https://leetcode.cn/problems/coin-change-2/
const change = (amount, coins) => {
  let dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  let res = Array(amount + 1).fill(0).map(() => [])

  // 先遍历物品再遍历背包是组合, 先遍历背包再遍历物品是排列
  for (let i = 0; i < coins.length; i++) {
    for (let j = 0; j <= amount; j++) {
      if (j >= coins[i]) {
        dp[j] += dp[j - coins[i]];
        console.log(i, j, coins[i], dp);

        let toBeAdd
        if (j - coins[i] > 0) {
          toBeAdd = res[j - coins[i]].map(it => [...it, coins[i]])
        } else if (j - coins[i] === 0) {
          toBeAdd = [[coins[i]]]
        }
        // res保存了所有的组合或排列的结果
        res[j] = [...res[j], ...toBeAdd]
      }
    }
  }

  return dp[amount];
}
change(5, [1, 2, 5])
