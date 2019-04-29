// ES6 Set Map方法。原数组去重。利用新数组。排序。利用对象


var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]

// ES6 Set Map方法方法
function unique(arr) {
    return Array.from(new Set(arr))
}

function unique(arr) {
    return [...new Set(arr)]
}

function unique(arr) {
    let map = new Map()
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], true)
        } else {
            map.set(arr[i], false)
            res.push(arr[i])
        }
    }
    return res
}

// 原数组去重

function unique(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

function unique(arr) {
    return arr.filter(function (item, index, arr) {
        return arr.indexOf(item, 0) === index;
    });
}

// 利用新数组

function unique(arr) {
    return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
}

function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i])
        }
    }
    return array;
}

// 排序
function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return;
    }
    arr = arr.sort()
    var arrry = [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1]) {
            // if( !array.includes( arr[i]) ) {
            arrry.push(arr[i]);
        }
    }
    return arrry;
}

function unique(arr) {
    var array = arr;
    var len = array.length;
    array.sort(function (a, b) {   //排序后更加方便去重
        return a - b;
    })

    function loop(index) {
        if (index >= 1) {
            if (array[index] === array[index - 1]) {
                array.splice(index, 1);
            }
            loop(index - 1);    //递归loop，然后数组去重
        }
    }
    loop(len - 1);
    return array;
}


// 利用对象

function unique(arr) {
    var obj = {};
    return arr.filter(function (item, index, arr) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}