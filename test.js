// export {}
// "use strict";
// exports.__esModule = true;


// A Famous Saying: Much Ado About Nothing (2012/8).
// A aaAAbc dFgghh: iimM nNn oooos Sttuuuy (2012/8).
// let input = 'A Famous Saying: Much Ado About Nothing (2012/8).'
let input = readline()
let reg = /[A-Za-z]/
const arr0 = [...input]
const arr1 = arr0.filter(str => reg.test(str))
const arr2 = [...arr1].map((it, index) => [index, it]).sort((a, b) => {
	let x = a[1].toLowerCase().codePointAt()
	let y = b[1].toLowerCase().codePointAt()
	return x < y
		? -1
		: x > y
			? 1
			: a[0] - b[0]
}).map(it => it[1])
let index = 0
let res = [...input]
for (let i = 0; i < input.length; i++) {
	if (reg.test(input[i])) {
		res[i] = arr2[index]
		index++
	}
}
const res1 = res.join("")
console.log(res1)
