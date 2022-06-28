// 是否是回文字符串
const isPalindrome = (s, l, r) => {
  for (let i = l, j = r; i < j; i++, j--) {
      if(s[i] !== s[j]) return false;
  }
  return true;
}