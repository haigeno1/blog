// export {}
// "use strict";
// exports.__esModule = true;


// A Famous Saying: Much Ado About Nothing (2012/8).
// A aaAAbc dFgghh: iimM nNn oooos Sttuuuy (2012/8).
const readline = require("readline")
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})
rl.on("line", function(input){
	// let input = 'A Famous Saying: Much Ado About Nothing (2012/8).'
	// let input = readline()
	let reg = /[A-Za-z]/
	const arr0 = [...input]
	const arr1 = arr0.filter(str => reg.test(str))
	const arr2 = arr1.sort((a, b) => a.toLowerCase().charCodeAt() - b.toLowerCase().charCodeAt())
	
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
})
