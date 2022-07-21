/*
 * @Author: haigeno1 2276765922@qq.com
 * @Date: 2022-06-26 17:41:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-21 12:28:25
 * @FilePath: /js-snippets/test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const change = (amount, coins) => {
  let dp = Array(amount + 1).fill(0);   


  
  dp[0] = 1;   


  let res = Array(amount + 1).fill(0).map(() => [])

  for (let j = 0; j <= amount; j++) {
    for (let i = 0; i < coins.length; i++) {
      if (j >= coins[i]) {
        dp[j] += dp[j - coins[i]];
        console.log(i, j, coins[i], dp);

        let toBeAdd
        if (j - coins[i] > 0) {
          toBeAdd = res[j - coins[i]].map(it => [...it, coins[i]])
        } else if (j - coins[i] === 0) {
          toBeAdd = [[coins[i]]]
        }
        res[j] = [...res[j], ...toBeAdd]
        // res[j] = res[j-coins[i]].concat(res[j-coins[i]].map(it => [...it, coins[i]]))
      }
    }
  }

  return dp[amount];
}
change(5, [1, 2, 5])