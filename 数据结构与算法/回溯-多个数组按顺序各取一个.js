// 数组排列组合。
// var arr = [
// ["a","b","c","d"],
// [1,2],
// ["A","B","C"],
//   ...
// ]
// 输出 a1A, a1b, a1c

// let result = []
// function back(arr, cur, i) {
//   if (i >= arr.length) return
//   arr[i].forEach((it) => {
//     // cur.push(it);
//     if (cur.length === arr.length) {
//       result.push([...cur])
//     } else {
//       back(arr, [...cur, it], i + 1);
//     }
//     // cur.pop();
//   });
//   return result
// }
// back(
//   [
//     ["a", "b", "c", "d"],
//     [1, 2],
//     ["A", "B", "C"],
//   ],
//   [],
//   0
// );

function f(arr) {
  let len = arr.length;
  let res = [];
  // function dfs(cur, curIndex, selected) {
  //   if (cur.length === len) {
  //     res.push([...cur]);
  //   }
  //   if (curIndex >= len) return;
  //   for (let outer = curIndex; outer < len; outer++) {
  //     arr[outer].forEach((it) => {
  //       let newSelected = selected.map((sele, seleIndex) =>
  //         seleIndex === outer ? true : sele
  //       );
  //       slice 这里保证outer的顺序
  //       selected.slice(0, outer).every((it) => it) &&
  //         dfs([...cur, it], curIndex + 1, newSelected);
  //     });
  //   }
  // }


  function dfs(cur, i) {
    if (cur.length === len) {
      res.push(cur)
      return
    }
    // if (i >= len) return
    arr[i].forEach(it => {
      dfs([...cur, it], i + 1)
    })
    // for (let j = 0; j < arr[i].length; j++) {
    //   dfs([...cur, arr[i][j]], i + 1)
    // }
  }

  dfs([], 0, Array(len).fill(false));
  return res;
}

f([
  ["a", "b", "c"],
  [1, 2],
  ["X", "Y"],
]);






// 4. 数组全排列
// var arr = [["1","2"],["3","4","5"]];
// 预期结果
// [["1","3"],["1","4"],["1","5"],["2","3"],["2","4"],["2","5"]]

function permutate(arr) {
  let res = arr[0].slice();
  for (let i = 1; i < arr.length; i++) {
    const pre = res.slice();
    res = [];
    pre.forEach((item) => {
      arr[i].forEach((curr) => {
        res.push(item + curr);
      });
    });
  }
  return res;
}
permutate([
  ["1", "2"],
  ["3", "4", "5"],
]);
