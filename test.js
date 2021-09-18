function mockP(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}
async function fa() {
    console.log("fa running")
    const res = await mockP(2000)
    console.log("fa end res")
    return res
}
async function fb() {
    console.log("fb running")
    const res = await mockP(3000)
    console.log("fb end res")
}
function main1() {
    console.log("main1 row1")
    fa();
    console.log("main1 row2")
    fb();
    console.log("main1 row3")
}
async function main2() {
    console.log("main2 row1")
    await fa();
    console.log("main2 row2")
    await fb();
    console.log("main2 row3")
}
main2()
main1()