//把输入的字符串4转为数字4
const num = 4;
// const num = Number(readline());
//定义开始第一列第一行的数值为1
let num_start = 1;
//定义一个空数组,用来接受每次输出的数值
let arr = [];
//第一层for循环,定义第一列的数值
for (let i = 0; i < num; i++) {
	//其值为每一列的第一个数值
	num_start += i;
    //让需要被push到数组中的第一个数值为num_start
	let num_end = num_start;
    //第二层for循环,用来完成每行的数值,并用arr接收,之所以j = i + 2是因为每一列的第一个数值已经被num_end接收了,所以先push,在加j。而这样就会导致遍历的次数少一次,故num + 1,让遍历次数达到要求
	for (let j = i + 2; j <= num + 1; j++) {
  		arr.push(num_end);
  		num_end += j;
	}
    //最后输出结果,并让数值清空,达到题目要求
	console.log(arr.join(' '));
	arr = [];
}
