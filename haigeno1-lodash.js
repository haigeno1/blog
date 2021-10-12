var haigeno1 = (function(){
  var chunk,difference,differenceBy,differenceWith,drop,dropRight,dropRightWhile,dropWhile,fill,findIndex,findLastIndex,flatten,flattenDeep,flattenDepth,fromPairs,head,indexOf,initial,intersection,intersectionBy,intersectionWith,join,last,lastIndexOf,nth,pull,pullAll,pullAllBy,pullAllWith,reverse,sortedIndex,sortedIndexBy,sortedIndexOf,sortedLastIndex,sortedLastIndexBy,sortedLastIndexOf,sortedUniq,sortedUniqBy,tail,take,takeRight,takeRightWhile,takeWhile,union,unionBy,unionWith,uniq,uniqBy,uniqWith,unzip,unzipWith,without,xor,xorBy,xorWith,zip,zipObject,zipObjectDeep,zipWith,countBy,every,filter,find,findLast,flatMap,flatMapDeep,flatMapDepth,forEach,forEachRight,groupBy,includes,invokeMap,keyBy,map,orderBy,partition,reduce,reduceRight,reject,sample,sampleSize,shuffle,size,some,sortBy,defer,delay,castArray,conformsTo,eq,gt,gte,isArguments,isArray,isArrayBuffer,isArrayLike,isArrayLikeObject,isBoolean,isDate,isElement,isEmpty,isEqual,isEqualWith,isError,isFinite,isFunction,isInteger,isLength,isMap,isMatch,isMatchWith,isNaN,isNative,isNil,isNull,isNumber,isObject,isObjectLike,isPlainObject,isRegExp,isSafeInteger,isSet,isString,isSymbol,isTypedArray,isUndefined,isWeakMap,isWeakSet,lt,lte,toArray,toFinite,toInteger,toLength,toNumber,assign,toSafeInteger,add,ceil,divide,floor,max,maxBy,mean,meanBy,min,minBy,multiply,round,subtract,sum,sumBy,clamp,inRange,random,assignIn,at,defaults,defaultsDeep,findKey,findLastKey,forIn,forInRight,forOwn,forOwnRight,functions,functionsIn,get,has,hasIn,invert,invertBy,invoke,keys,keysIn,mapKeys,mapValues,merge,mergeWith,omit,omitBy,pick,pickBy,result,set,setWith,toPairs,toPairsIn,transform,unset,update,updateWith,values,valuesIn,camelCase,capitalize,deburr,endsWith,escape,escapeRegExp,kebabCase,lowerCase,lowerFirst,pad,padEnd,padStart,parseInt,repeat,replace,snakeCase,split,startCase,startsWith,toLower,toUpper,trim,trimEnd,trimStart,truncate,unescape,upperCase,upperFirst,words,bindAll,defaultTo,range,rangeRight,mixin,times,toPath,uniqueId,cloneDeep,identity,concat,pullAt,matches,property,ary,unary,negate,once,spread,flip,conforms,constant,flow,method,methodOf,nthArg,propertyOf,arrayToLinkedList,parseJson,dellTo3355,isPrime,fibb,getType;
  return {
    chunk :chunk,
    differenceBy :differenceBy,
    difference :difference,
    differenceWith :differenceWith,
    drop :drop,
    dropRight :dropRight,
    dropRightWhile :dropRightWhile,
    dropWhile :dropWhile,
    fill :fill,
    findIndex :findIndex,
    findLastIndex :findLastIndex,
    flatten :flatten,
    flattenDeep :flattenDeep,
    flattenDepth :flattenDepth,
    fromPairs :fromPairs,
    head :head,
    indexOf :indexOf,
    initial :initial,
    intersection :intersection,
    intersectionBy :intersectionBy,
    intersectionWith :intersectionWith,
    join :join,
    last :last,
    lastIndexOf :lastIndexOf,
    nth :nth,
    pull :pull,
    pullAll :pullAll,
    pullAllBy :pullAllBy,
    pullAllWith :pullAllWith,
    reverse :reverse,
    sortedIndex :sortedIndex,
    sortedIndexBy :sortedIndexBy,
    sortedIndexOf :sortedIndexOf,
    sortedLastIndex :sortedLastIndex,
    sortedLastIndexBy :sortedLastIndexBy,
    sortedLastIndexOf :sortedLastIndexOf,
    sortedUniq :sortedUniq,
    sortedUniqBy :sortedUniqBy,
    tail :tail,
    take :take,
    takeRight :takeRight,
    takeRightWhile :takeRightWhile,
    takeWhile :takeWhile,
    union :union,
    unionBy :unionBy,
    unionWith :unionWith,
    uniq :uniq,
    uniqBy :uniqBy,
    uniqWith :uniqWith,
    unzip :unzip,
    unzipWith :unzipWith,
    without :without,
    xor :xor,
    xorBy :xorBy,
    xorWith :xorWith,
    zip :zip,
    zipObject :zipObject,
    zipObjectDeep :zipObjectDeep,
    zipWith :zipWith,
    countBy :countBy,
    every :every,
    filter :filter,
    find :find,
    findLast :findLast,
    flatMap :flatMap,
    flatMapDeep :flatMapDeep,
    flatMapDepth :flatMapDepth,
    forEach :forEach,
    forEachRight :forEachRight,
    groupBy :groupBy,
    includes :includes,
    invokeMap :invokeMap,
    keyBy :keyBy,
    map :map,
    orderBy :orderBy,
    partition :partition,
    reduce :reduce,
    reduceRight :reduceRight,
    reject :reject,
    sample :sample,
    sampleSize :sampleSize,
    shuffle :shuffle,
    size :size,
    some :some,
    sortBy :sortBy,
    defer :defer,
    delay :delay,
    castArray :castArray,
    conformsTo :conformsTo,
    eq :eq,
    gt :gt,
    gte :gte,
    isArguments :isArguments,
    isArray :isArray,
    isArrayBuffer :isArrayBuffer,
    isArrayLike :isArrayLike,
    isArrayLikeObject :isArrayLikeObject,
    isBoolean :isBoolean,
    isDate :isDate,
    isElement :isElement,
    isEmpty :isEmpty,
    isEqual :isEqual,
    isEqualWith :isEqualWith,
    isError :isError,
    isFinite :isFinite,
    isFunction :isFunction,
    isInteger :isInteger,
    isLength :isLength,
    isMap :isMap,
    isMatch :isMatch,
    isMatchWith :isMatchWith,
    isNaN :isNaN,
    isNative :isNative,
    isNil :isNil,
    isNull :isNull,
    isNumber :isNumber,
    isObject :isObject,
    isObjectLike :isObjectLike,
    isPlainObject :isPlainObject,
    isRegExp :isRegExp,
    isSafeInteger :isSafeInteger,
    isSet :isSet,
    isString :isString,
    isSymbol :isSymbol,
    isTypedArray :isTypedArray,
    isUndefined :isUndefined,
    isWeakMap :isWeakMap,
    isWeakSet :isWeakSet,
    lt :lt,
    lte :lte,
    toArray :toArray,
    toFinite :toFinite,
    toInteger :toInteger,
    toLength :toLength,
    toNumber :toNumber,
    assign :assign,
    toSafeInteger :toSafeInteger,
    add :add,
    ceil :ceil,
    divide :divide,
    floor :floor,
    max :max,
    maxBy :maxBy,
    mean :mean,
    meanBy :meanBy,
    min :min,
    minBy :minBy,
    multiply :multiply,
    round :round,
    subtract :subtract,
    sum :sum,
    sumBy :sumBy,
    clamp :clamp,
    inRange :inRange,
    random :random,
    assignIn :assignIn,
    at :at,
    defaults :defaults,
    defaultsDeep :defaultsDeep,
    findKey :findKey,
    findLastKey :findLastKey,
    forIn :forIn,
    forInRight :forInRight,
    forOwn :forOwn,
    forOwnRight :forOwnRight,
    functions :functions,
    functionsIn :functionsIn,
    get :get,
    has :has,
    hasIn :hasIn,
    invert :invert,
    invertBy :invertBy,
    invoke :invoke,
    keys :keys,
    keysIn :keysIn,
    mapKeys :mapKeys,
    mapValues :mapValues,
    merge :merge,
    mergeWith :mergeWith,
    omit :omit,
    omitBy :omitBy,
    pick :pick,
    pickBy :pickBy,
    result :result,
    set :set,
    setWith :setWith,
    toPairs :toPairs,
    toPairsIn :toPairsIn,
    transform :transform,
    unset :unset,
    update :update,
    updateWith :updateWith,
    values :values,
    valuesIn :valuesIn,
    camelCase :camelCase,
    capitalize :capitalize,
    deburr :deburr,
    endsWith :endsWith,
    escape :escape,
    escapeRegExp :escapeRegExp,
    kebabCase :kebabCase,
    lowerCase :lowerCase,
    lowerFirst :lowerFirst,
    pad :pad,
    padEnd :padEnd,
    padStart :padStart,
    parseInt :parseInt,
    repeat :repeat,
    replace :replace,
    snakeCase :snakeCase,
    split :split,
    startCase :startCase,
    startsWith :startsWith,
    toLower :toLower,
    toUpper :toUpper,
    trim :trim,
    trimEnd :trimEnd,
    trimStart :trimStart,
    truncate :truncate,
    unescape :unescape,
    upperCase :upperCase,
    upperFirst :upperFirst,
    words :words,
    bindAll :bindAll,
    defaultTo :defaultTo,
    range :range,
    rangeRight :rangeRight,
    mixin :mixin,
    times :times,
    toPath :toPath,
    uniqueId :uniqueId,
    cloneDeep :cloneDeep,
    identity :identity,
    concat :concat,
    pullAt :pullAt,
    matches :matches,
    property :property,
    ary :ary,
    unary :unary,
    negate :negate,
    once :once,
    spread :spread,
    flip :flip,
    conforms :conforms,
    constant :constant,
    flow :flow,
    method :method,
    methodOf :methodOf,
    nthArg :nthArg,
    propertyOf :propertyOf,
    arrayToLinkedList :arrayToLinkedList,
    parseJson :parseJson,
    dellTo3355 :dellTo3355,
    isPrime :isPrime,
    fibb :fibb,
    getType: getType,
    compact:compact,
  }


  function chunk(arr, size=1) {
    var res = []
    for (var i = 0; i < arr.length; i += size){
      res.push(arr.slice(i,i + size))
    }
    return res
  }


  function compact(arr){
    var res = []
    for (var i = 0; i < arr.length; i++){
      if(arr[i]){
        res.push(arr[i])
      }
    }
    return res
  }

  function concat(array,...values){
    var res = []
    for (var item of arguments) {
        if (Array.isArray(item)) res.push(...item)
        else res.push(item)
    }
    return res
  }

  function difference(array,...values){
    var res = []
    var newValues = [].concat(...values)
    for (var j = 0; j < array.length; j++){
      if (!newValues.includes(array[j])){
        res.push(array[j])
      }
    }
    return res
  }

  function differenceBy(array,...values){
    if (typeof values[values.length-1] === "string" || typeof values[values.length-1] === "function"){
      var prep = iteratee(values.pop())
    } else {
      var prep = identity
    }
    values = [].concat(...values)
    return array.filter(j => !values.map(i => prep(i)).includes(prep(j)))
  }

  function differenceWith(array, ...values){
    if (typeof values[values.length-1] === "string" || typeof values[values.length-1] === "function"){
      var comparator = iteratee(values.pop())
    }
    values = [].concat(...values)
    return array.filter(arr => !values.some(value => comparator(arr, value)))
  }

  function isEqual(a, b){
    if (a === b){
      return true
    }
    if (a !== a && b !== b) return true;
    if(a == null || b == null || typeof(a) != "object" || typeof(b) != "object" ) {
      return false
    }
    //if (Object.prototype.toString.call(value) !== Object.prototype.toString.call(other)) return false
    var keysA = Object.keys(a),keysB = Object.keys(b)
    if (keysA.length !== keysB.length){
      return false
    }
    for (var key of keysA){
      if (!keysB.includes(key) || !isEqual(a[key],b[key]) ){
        return false
      }
    }
    return true
  }
  // let obj1 = {
  //   a: 1,
  //   b: 2
  // }
  // let obj2 = {
  //   a: 1,
  //   c: 2
  // }
  
  
  // /**
  //  * @returns {boolean}
  //  */
  // function deepEqual(obj1, obj2) {
  //     if (typeof obj1 !== typeof obj2) return false
  //     if (Object.keys(obj1).length !== Object.keys.length) return false
      
  //   for (let key in obj1) {
  //       if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
  //           return deepEqual(obj1[key], obj2[key])
  //         } else if(obj1[key] !== obj2[key]) {
  //           return false
  //         }
  //     }
  //     return true
  // }


  function isEqualWith(value, other, customizer){
  // ?? If customizer returns undefined, comparisons are handled by the method instead. The customizer is invoked with up to six arguments: (objValue, othValue [, index|key, object, other, stack??]).
    if (typeof value !== typeof other) return false
    if (typeof value !== 'object' && typeof other !== 'object') return customizer(value, other)
    if (typeof value === 'object' && typeof other === 'object') {
      var val = Object.entries(value)
      var oth = Object.entries(other)
      if (val.length !== oth.length){
        return false
      }
      return val.every((v, i)=> isEqualWith(val[i][1], oth[i][1],cunstomizer))
    }
    return false
  }



  function getType(val){
    return Object.prototype.toString.call(val).slice(8, -1)
  }


  function isEmpty(obj){
    for (let i in obj){
      return false
    }
    return true
  }

  function isEmpty1(obj){
    return JSON.stringify(obj)==="{}"
  }

  function isEmpty2(obj){
    return !Object.keys(obj).length
  }

  function isBoolean(val){
    return getType(val) === "Boolean"
  }

  function isNumber(val){
    return getType(val) === 'Number'
  }

  function isString(val){
    return getType(val) === "String"
  }

  function isRegExp(val){
    return getType(val) === "RegExp"
  }

  function isFunction(){
    return getType(val) === "Function"
  }

  function isDate(value){
    return getType(value) === "Date"
  }

  function isError(value){
    return getType(value) === "Error"
  }

  function isMap(value){
    return getType(value) === "Map"
  }

  function isSet(value){
    return getType(value) === "Set"
  }

  function isSymbol(value){
    return getType(value) === "Symbol"
  }

  function isWeakMap(value){
    return getType(value) === "WeakMap"
  }

  function isWeakSet(value){
    return getType(value) === "WeakSet"
  }

  function isNaN(value) {
    return Object.prototype.toString.call(value) === '[object Number]' && isNaN(value)
  }
  function isNaN1(value) {
    if (value !== value) {
        return true
    } else if (typeof value === 'object') {
        return value.toString() === 'NaN'
    }
    return false
  }

  function isNull(val){
    return val === null
  }

  function isUndefined(val){
    return typeof val === Undefined
  }

  function isNil(val){
    return val === null || typeof val === undefined
  }

  function isArguments(value){
    return getType(value) === "[object Arguments]"
  }

  function isArray(x){
    return Array.isArray(x)
  }

  function isArrayBuffer(value){
    return getType(value) === 'ArrayBuffer'
  }

  function isSafeInteger(value){
    return  Number.isSafeInteger(value)
  }

  function isArrayLike(value){
    return typeof value!== "function" && Number.isSafeInteger(value.length)
  }

  function isTypedArray(value){
    return getType(value) === "Uint8Array"
  }

  function isArrayLikeObject(value){
    return typeof value === "object" && Number.isSafeInteger(value.length)
  }

  function isNative(value){
    return Function.prototype.toString.call(value).indexOf("[native code]") !== -1
  }

  function isPrimitive(val){
    var type = typeof val
    switch(type){
      case "number" :
      case "string" :
      case "boolean" :
      return true
    }
    return false
  }

  function isObject1(value){
    return value !== null && typeof value === 'object' || typeof value === 'function'
  }

  function isObject(value) {
    return value === Object(value);
  }

  function isObjectLike(value){
    return value !== null && typeof value === "object"
  }

  function isPlainObject(value){
    return value.constructor === null || value.constructor.name === "Object"
  }
  function isFinite(value){
    return Number.isFinite(value)
  }

  function isInteger(value){
    return Number.isInteger(value)
  }

  function isLength(value){
    return Number.isInteger(value) &&  value < 4294967295 && value >= 0
  }

  function isElement(value){
    return value instanceof Node
  }

  function isFloat(value){
    return parseFloat(value)-value === 0
  }


  function lt(val,other){
    return val < other
  }

  function lte(val,other){
    return val <= other
  }

  function toArray(val){
    if(!isNil(val)){
      return Object.values(val)
    } else {
      return []
    }
  }

  function toFinite(val){
    if (val === Infinity){
      return Number.MAX_VALUE
    }
    if (val === -Infinity){
      return Number.MIN_VALUE
    } else {
      return +val||0
    }
  }

  function toInteger(val){
    if (val === Infinity){
      return Number.MAX_VALUE
    }
    if (val === -Infinity){
      return Number.MIN_VALUE
    }
    return val>=0 ? Math.floor(val):Math.ceil(val)
  }

  function toLength(val){
    var res = toInteger(val) < 0 ? 0 : toInteger(val)
    return res < 4294967295 ? res : 4294967295
  }

  function toNumber(val){
    return Number(val)
  }

  function assigIn(object, ...sources){
    return sources.reduce((acc, cur, key) => {
        for (var key in cur) {acc[key] = cur[key]}
        return acc
    }, object)
  }

  function toSafeInteger(number) {
      if (number > Number.MAX_SAFE_INTEGER) {
        return Number.MAX_SAFE_INTEGER
      }
      if (number < Number.MIN_SAFE_INTEGER) {
        return Number.MIN_SAFE_INTEGER
      }
      if(isNil(number)){
        return 0
      }
      return parseInt(number)
  }

  function add(augend, addend){
    return augend+addend
  }

  function ceil(number, precision=0){
    return Math.ceil(number * 10 ** precision) / 10 ** precision
  }

  function divide(dividend, divisor){
    return dividend / divisor
  }

  function floor(number, precision=0){
    return Math.floor(number * 10 ** precision) / 10 ** precision
  }

  function max(array){
    return array && array.length ? Math.max(...array) : undefined
  }

  function maxBy(array,iter= identity){
    iter = iteratee(iter)
    return array.reduce((res,item,i,array) => {
      res = iter(res) > iter(item) ? res : item
      return res
    })
  }

  function sumBy(array,iteratee=identity){
    var res = 0
    for (var i=0; i < array.length; i++){
      res += iteratee(i)
    }
    return res
  }

  function sum(array){
    return sumBy(array,identity)
  }

  function mean(array){
    return meanBy(array,identity)
  }

  function meanBy(array,iter= identity){
    if(array.length === 0){
      return 0
    }
    return sumBy(iter) / array.length
  }

  function min(array){
    return array && array.length ? Math.min(...array) : undefined
  }

  function minBy(array, iter =identity){
    return sortBy(array,iter).shift()
  }

  function multiply(multiplier, multiplicand){
    return multiplier * multiplicand
  }

  function round(number, precision=0){
    return Math.round(number * 10 ** precision) / 10 ** precision
  }

  function subtract(minuend, subtrahend){
    return minuend - subtrahend
  }

  function clamp(number,...args){
    var upper = args.pop()
    var lower = args.pop()===undefined ? number : args.pop()
    if (number > upper) return upper
    if (number < lower) return lower
    return number
  }

  function inRange(number, start, end){
    if (end === undefined) {
        end = start
        start = 0
    }
    if (start > end)[start, end] = [end, start]
    return start <= number && number < end
  }

  function random(lower=0, upper=1, floating=false){
    if (isFloat(lower) || isFloat(upper)){
      floating = true
    }
    var res = Math.random() * (upper - lower) + lower
    if (!floating){
      return parseInt(res)
    }
    return res
  }


  function identity(...values){
    return values[0]
  }

  function drop(array,n=1) {
    var res = []
    for (var i = n; i < array.length; i++){
      res.push(array[i])
    }
    return res
  }

  function dropRight(array,n=1){
    var res = []
    for (var i = 0; i < array.length - n; i++){
      res.push(array[i])
    }
    return res
  }

  function dropWhile(array, predicate=identity) {
    predicate = iteratee(predicate)
    for (var i = 0; i < array.length; i++){
      if (!predicate(array[i],i,array)){
        return array.slice(i)
      }
    }
    return []
  }

  function dropRightWhile(array, predicate=identity){
    predicate = iteratee(predicate)
    for (var i = array.length-1; i >= 0; i--){
      if (!predicate(array[i])){
        return array.slice(0,i+1)
      }
    }
    return []
  }

  function fill(array,value,start=0,end=array.length){
    for (var i = start; i < end; i++){
      array[i] = value
    }
    return array
  }

  function fill2(array,value,start=0,end=array.length){
    return array.reduce(function(result, item, index, ary) {
      if (index >= start && index < end){
        result.push(value)
      } else{
        result.push(array[index])
      }
      return result
    },[])
  }

  function flatten(array){
    var res = [],t = 0
    for(var i = 0; i < array.length; i++){
      if (!Array.isArray(array[i])){
        res[t++] = array[i]
      } else {
        for (var j = 0; j < array[i].length; j++){
          res[t++] = array[i][j]
        }
      }
    }
    return res
  }
  // flatten1 = [].concat.apply.bind([].concat,[])
  // [].concat.apply([])
  // [].concat
  // function flatten(ary){return [].concat.apply([],ary)}
  //
  // Array.prototype.concat.apply.bind(Array.prototype.concat,[])
  // Array.prototype.concat.apply([])
  // [].concat

  function flattenDeep(array){
    var res = []
    var flattenDeepTmp = function(arr){
      for (var item of arr){
        if (Array.isArray(item)){
          flattenDeepTmp(item)
        } else {
          res.push(item)
        }
      }
    }
    flattenDeepTmp(array)
    return res
  }

  function flattenDepth(array, depth=1){
    var tmp = array
    while(depth--){
      var tmp = flatten(tmp)
    }
    return tmp
  }


  const flattern = arr=>{
    const res = [];
    arr.forEach((item)=>{
        if(Array.isArray(item)){
            res.push(...flattern(item));
        }else{
            res.push(item);
        }
    })
    return res;
  }
  flattern(arr);

  /**第五种方式：递归concat */
  function flattern2(arr){
      return [].concat(
          ...arr.map(item=>Array.isArray(item)? flattern2(item):item)
      )
  }

  function flattern2(arr){
    let res = []
    while(arr.some(Array.isArray)){
      res =  [].concat(...arr)
    }
    return res
  }




  function head(array){
    return array[0]
  }

  function initial(array){
    var res = array.slice()
    res.pop()
    return res
  }

  function fromPairs(pairs){
    var res = {}
    for (var item of pairs){
      res[item[0]] = item[1]
    }
    return res
  }

  function toPairs(object){
    var res = []
    for (var key in object){
      res.push([key,object[key]])
    }
    return res
  }

  // function cloneDeep(obj){
  //   if (obj == undefined || typeof obj[key] !== "object"){
  //     return obj
  //   }
  //   var res = Object.create(null)
  //   for (var key in obj){
  //     res[key] = cloneDeep(obj[key])
  //   }
  //   return res
  // }


  function cloneDeep(obj){
    //带环的对象的处理??
    //包含原型链的复制吗?
    var res = Object.create(null)
    for (var key in obj){
      if (Object.prototype.toString.call(obj[key]) !== "object Object"){
        res[key] = obj[key]
      } else {
        res[key] = cloneDeep(obj[key])
      }
    }
    return res
  }

  function deepClone(data) {
    var t = type(data), o, i, ni;
    
    if(t === 'array') {
      o = [];
    }else if( t === 'object') {
      o = {};
    }else {
      return data;
    }
    
    if(t === 'array') {
      for (i = 0, ni = data.length; i < ni; i++) {
        o.push(deepClone(data[i]));
      }
      return o;
    }else if( t === 'object') {
      for( i in data) {
        o[i] = deepClone(data[i]);
      }
      return o;
    }
  }


  function map(collection,iter=identity){
    iter = iteratee(iter)
    return collection.reduce((result,item,index,collection) => {
      return result.push(iter(item,index,collection))
    },[])
  }

  function reduce(collection,reducer=identity,accumulator){
    var keys = Object.keys(collection)
    var values = Object.values(collection)
    if (accumulator === undefined){
      accumulator = values.shift()
      keys.shift()
    }
    for (var i = 0; i < keys.length; i++){
      accumulator = reducer(accumulator,values[i],keys[i],collection)
    }
    return accumulator
  }

  function reduceRight(collection, reducer=identity, accumulator){
    var keys = Object.keys(collection)
    var values = Object.values(collection)
    if (accumulator === undefined){
      accumulator = values.pop()
      keys.pop()
    }
    for (var i = keys.length - 1; i >= 0 ; i--){
      accumulator = reducer(accumulator,values[i],keys[i],collection)
    }
    return accumulator
  }

  function filter(collection,predicate=identity){
    predicate = iteratee(predicate)
    return collection.reduce((res,item,i,collection) => {
      if(predicate(item,i,collection)){
        res.push(item)
      }
      return res
    },[])
  }

  function forEach(collection, it=identity){
    var action = iteratee(it)
    for (var i in collection){
      if (action(collection[i],i,collection) === false){
        break
      }
    }
    return collection
  }

  function forEachRight(collection, it=identity){
    var action = iteratee(it)
    var arrKeys = Object.keys(collection)
    var len = arrKeys.length
    for (var i = len - 1; i >= 0; i--){
      if (action(collection[arrKeys[i]],arrKeys[i],collection) === false){
        break
      }
    }
    return collection
  }

  function slice(array, start=0, end=array.length){
    var res = []
    for (var i = start; i < end; i++){
      res.push(array[i])
    }
    return res
  }

  function includes(collection, value, fromIndex=0){
    if (typeof collection === "string"){
      return collection.indexOf(value) !== -1
    } else if (Array.isArray(collection) ){
        if (fromIndex < 0) {
          fromIndex += collection.length
        }
        for (var i = fromIndex; i < collection.length; i++){
          if (isEqual(collection[i],value)){
            return true
          }
        return false
        }
    } else if (typeof collection === "object"){
        for (var i in collection){
          if (isEqual(collection[i],value)){
            return true
          }
        }
      return false
    }
  }

  // intersectionBy(...arrays){
  //   //if (!Array.isArray(arguments[-1]) {

  //  // }
  // }



  function indexOf(array, value, fromIndex = 0){
    while (fromIndex < 0) {
      fromIndex += array.length
    }
    for (var i = fromIndex; i < array.length; i++){
      if (array[i] === value){
        return i
      }
    }
    return -1
  }

  function lastIndexOf(array, value, fromIndex=array.length-1) {
    if (fromIndex < 0) {
      fromIndex += array.length
    }
    for (var i = fromIndex; i >= 0; i--){
      if (array[i] === value){
        return i
      }
    }
    return -1
  }

  function split(string='', separator, limit){

  }

  conforms = source =>
    obj => Object.entries(source).every(src => src[1](obj[src[0]]))

  conformsTo = (object, source) => {
    return conforms(source)(object)
  }

  function get(object, path, defaultValue){
    var path = toPath(path)
    var res = object
    for (var key of path){
      res = res[key]
      if (res === undefined){
        return defaultValue
      }
    }
    return res
  }

  function has(object, path){
    var path = toPath(path)
    //for of 循环会遍历至继承属性吗??
    for (var key of path){
      if (!object.hasOwnProperty(key)) {
        return false
      }
      object = object[key]
    }
    return true

    // var tmp = object.__proto__
    // object.__proto__ = null
    // var res = hasIn(object, path)
    // object.__proto__ = tmp
    // return res
  }

  function hasIn(object, path){
    var path = toPath(path)
    for (var key of path){
      if (!(key in object)) {
        return false
      }
      object = object[key]
    }
    return true
  }

  function invert(object){
    return Object.entries(object).reduce((acc, cur) => (acc[cur[1]] = cur[0], acc), {})
    //return fromPairs(toPairs(object).map(it => [String(it[1]),it[0]]))
  }

  function invertBy(object, iter = identity){
    iter = iteratee(iter)
    var res = Object.create(object.__proto__)
    var keys = Object.keys(object)
    var values = Object.values(object).map(iter)
    for (var i = 0; i < keys.length; i++){
      if (!(res[values[i]] in res)){
        res[values[i]] = [keys[i]]
      } else {
        res[values[i]].push(keys[i])
      }
    }
    return res
  }


  function toPath(value){
    if (Array.isArray(value)){
      return value
    }
    return value.match(/\w+/gi)
  }

  // _.get(object, path, [defaultValue]) 

  // var object = { 'a': [{ 'b': { 'c': 3 } }] }; 
  // _.get(object, 'a[0].b.c');  // => 3
  // _.get(object, 'a.b.c', 'default');  default


  // a[3].b -> a.3.b

  function get(source, path, defaultValue) {
    const paths = path.replace(/\[(\d+)\]/gm, '.$1').split('.')
    let result = source
    for (const p of paths) {
        result = Object(result)[p]
        if (result === undefined) {
            return defaultValue
        }
    }
    return result
  }


  property = path => obj => get(obj,path)
  propertyOf = obj => path => get(obj,path)

  function invoke(object, path, ...args){
    return get(object,path).apply(this,args)
    // path = toPath(path)
    // var func = path.pop()
    // return get(object, path)[func](...args)
  }

  function method(path,...args){
    var that = this
    return function(obj){
      return invoke(obj,path,args)
    }
  }

  function methodOf(obj,...args){
    return function(path){
      return invoke(obj,path,args)
    }
  }

  function matchesProperty(path, srcValue){
    return function(obj){
      return isEqual(get(obj,path), srcValue)
    }
  }

  function matches(source){
    return function(obj){
      for (var key in source){
        if (source.hasOwnProperty(key)){
          //is deep equal
          if(!isEqual(obj[key], source[key])){
            return false
          }
        }
      }
      return true
    }
  }

  function isMatch(object,source){
    for (var key in source){
      if (source.hasOwnProperty(key)){
        if (!isEqual(object[key], source[key])){
          return false
        }
      }
    }
    return true
  }

  function isMatchWith(object, source, customizer){
    for (var key in source){
      if (customizer(object[key]) !== customizer(source[key])){
        return false
      }
    }
    return true
  }

  function negate(predicate){
    return function(...args){
      return !predicate(...args)
    }
  }

  function size(collection){
    if (typeof collection === "string" || Array.isArray(collection)){
      return collection.length
    } else if (typeof collection === "object"){
      return Object.keys(collection).length
    }
  }

  function keys(object){
    var res = []
    for (var key in object){
      if (object.hasOwnProperty(key)){
        res.push(key)
      }
    }
    return res
  }

  function keyBy(collection,iter = identity){
    iter = iteratee(iter)
    return collection.reduce((res, cur)=>{
      var val = iter(cur)
      res[val] = cur
      return res
    },{})
  }

  function groupBy(collection,iter = identity){
    iter = iteratee(iter)
    var res = {}
    for (var key in collection){
      var val = iter(collection[key])
      if (!res[val]){
        res[val] = [collection[key]]
      } else {
        res[val].push(collection[key])
      }
    }
    return res
  }

  function bind(f,...fixedArgs){
    return function(...args){
      return f(...fixArgs,...args)
    }
  }

  function once(func){
    var c = 0
    var lastRes
    return function(...arg){
      c++
      if (c === 1){
        lastRes = func(...arg)
      }
      return lastRes
    }
  }

  function ary(func,n = func.length){
    return function(...args){
      return func(...args.slice(0,n))
    }
  }

  function unary(func){
    return function(x){
      return func(x)
    }
  }

  function flip(func){
    return function(...args){
      return func(...args.reverse())
    }
  }

  function spread(func,start = 0){
    return function(ary){
      return func.apply(null,ary)
    }
  }

  function memoize(fn){
    var cache = {}
    return function (...args){
      var key = JSON.stringify(args)
      if (!cache[key]){
        cache[key] = fn.apply(this, args)
      }
      return cache[key]
    }
  }

  function every(collection, predicate=identity){
    predicate = iteratee(predicate)
    for (var val of collection){
      if(!predicate(val)){
        return false
      }
    }
    return true
  }

  function some(collection, predicate=identity){
    predicate = iteratee(predicate)
    for (var val of collection){
      if (predicate(val)){
        return true
      }
    }
    return false
  }

  function iteratee(func=identity){
    var type = getType(func)
    if (type === 'Function') {
        return func
    } else if (type === 'String') {
        return property(func)
    } else if (type === 'Object') {
        return matches(func)
    } else if (type === 'Array') {
        return matchesProperty(func)
    }
  }

  function constant(value){
    return value
  }

  function times(n,iteratee=identity){
    var res = []
    for (var i = 0; i < n; i++){
      res.push(iteratee(i))
    }
    return res
  }

  function tail(array){
    return array.slice(1)
  }

  function take(array,n=1){
    return array.slice(0,n)
  }

  function takeRight(array,n=1){
    if(n > array.length){
      return array
    }
    return array.slice(array.length-n)
  }

  function takeWhile(array,predicate=identity){
    predicate = iteratee(predicate)
    for (var i = 0; i < array.length; i++){
      if(!predicate(array[i],i,array)){
        return array.slice(0,i)
      }
    }
    return array
  }

  function takeRightWhile(array,predicate=identity){
    predicate = iteratee(predicate)
    for(var i = array.length; i >=0; i++){
      if(!predicate(array[i],i,array)){
        return array.slice(i)
      }
    }
    return array
  }


  function find(collection, predicate=identity, fromIndex=0){
    predicate = iteratee(predicate)
    var keys = Object.keys(collection)
    for (var i = fromIndex ; i < keys.length; i++){
      if (predicate(collection[keys[i]],keys[i],collection)){
        return collection[keys[i]]
      }
    }
    return undefined
  }

  findLast = (collection, predicate = identity, fromIndex) => {
    predicate = iteratee(predicate)
    var keys = Object.keys(collection)
    fromIndex = keys.length
    for (var i = fromIndex ; i >= 0; i--){
      if (predicate(collection[keys[i]],keys[i],collection)){
        return collection[keys[i]]
      }
    }
    return undefined
  }

  findKey = (object, predicate = identity) => {
    predicate = iteratee(predicate)
    for (var key in object){
      if (object.hasOwnProperty(key)){
        if (predicate(key)){
          return key
        }
      }
    }
    return undefined
  }

  findLastKey = (object, predicate = identity) => {
    predicate = iteratee(predicate)
    var keys = Object.keys(collection)
    var fromIndex = keys.length
    for (var i = fromIndex ; i >= 0; i--){
      if (predicate(collection[keys[i]],keys[i],collection)){
        return keys[i]
      }
    }
    return undefined
  }

  function findIndex(array, predicate=identity, fromIndex=0){
    predicate = iteratee(predicate)
    for (var i = fromIndex ; i < array.length; i++){
      if (predicate(array[i])){
        return i
      }
    }
    return -1
  }

  function findLastIndex(array, predicate=identity, fromIndex=array.length-1){
    predicate = iteratee(predicate)
    for (var i = fromIndex ; i >= 0; i--){
      if (predicate(array[i])){
        return i
      }
    }
    return -1
  }

  function intersection(...arrays){
    var res = []
    var resArray = arrays.shift()
    for (var val of resArray){
      var flag = 0
      for (var value of arrays){
        if (!value.includes(val)){
          flag = 1;
          break
        }
      }
      if (flag === 0){
        res.push(val)
      }
    }
    return res
  }

  function test(...args){
    for (var i = 1; i < args.length; i++){
      console.log(args[0](args[i]))
    }
  }

  function uniq(array){
    // var res = []
    // for (var i = 0; i < array.length; i++){
    //   if (!res.includes(array[i])){
    //     res.push(array[i])
    //   }
    // }
    // return res
    return Array.from(new Set(array))
  }œ

  function uniqBy(array, predicate=identity){
    var prep = iteratee(predicate)
    var res = []
    array.forEach(i => res.some(j => prep(j)===prep(i)) ? res :res.push(i))
    return res
  }

  function uniqWith(array, comparator){
    var res = []
    array.forEach(i => res.some(j => comparator(i,j)) ? res :res.push(i))
    return res
  }

  function union1(...arrays){
    return arrays.reduce((res,item)=>item.forEach(val => {if(!res.includes(val)){res.push(val)}}),[])
  }

  function union(...arrays){
    var res = arrays[0]
    for (var i = 1; i < arrays.length; i++){
      for (var j = 0; j < arrays[i].length; j++){
        if (!res.includes(arrays[i][j])){
          res.push(arrays[i][j])
        }
      }
    }
    return res
  }

  function unionBy(...arrays){
    if (!Array.isArray(arrays[arrays.length - 1])){
      var prep = iteratee(arrays.pop())
    }
    return uniqBy([].concat(...arrays),prep)
  }

  function unionWith(...arrays){
    var comparator = arrays.pop();
    return uniqWith([].concat(...arrays),comparator)
  }

  function join(array, separator=','){
    return array.reduce((res,item)=> "" + res + separator + item)
  }

  function last(array){
    return array[array.length-1]
  }

  function lastIndexOf(array, value, fromIndex=array.length-1){
    if (fromIndex < 0) fromIndex += array.length
    for (var i = fromIndex; i >= 0; i--) {
        if (array[i] === value) return i
    }
    return -1
  }

  function nth(array,n=0){
    if (n < 0){
      n += array.length
    }
    return array[n]
  }

  function pull(array, ...values){
    for (var i = 0; i < array.length; i++){
      if (values.includes(array[i])){
        array.splice(i,1)
        i--
      }
    }
    return array
  }

  function pullAll(array, values){
    for (var i = 0; i < array.length; i++){
      if (values.includes(array[i])){
        array.splice(i,1)
        i--
      }
    }
    return array
  }

  function pullAllBy(array, values, predicate=identity){
    var prep = iteratee(predicate)
    var values1 = values.map(prep)
    for (var i = 0; i < array.length; i++){
      if (values1.includes(prep(array[i]))){
        array.splice(i,1)
        i--
      }
    }
    return array
  }


  function pullAllWith(array, values, comparator){
    for (var i = 0; i < array.length; i++){
      for (var j of values)
      if (comparator(array[i],j)){
        array.splice(i,1)
        i--
      }
    }
    return array
  }

  function reverse(array){
    function swap(array,i,j){
      var tmp = array[i]
      array[i] = array[j]
      array[j] = tmp
    }
    for (var i = 0; i < array.length / 2 - 1; i++){
      swap(array,i,array.length-1-i)
    }
    return array
  }

  function sortedIndex(array, value){
    if (array[0] >= value) {
        return 0
    }
    if (array[array.length - 1] < value) {
        return array.length
    }
    var left = 0,right = array.length - 1,mid = 0
    while (right > left){
      mid = Math.floor((left+right)/2)
      if (array[mid] < value){
        left = mid + 1
      } else if (array[mid] >= value) {
        right = mid
      }
    }
    return right
  }

  function sortedLastIndex(array, value){
    if (array[0] > value) {
        return 0
    }
    if (array[array.length - 1] <= value) {
        return array.length
    }
    var left = 0,right = array.length - 1,mid = -1
    while (left !== mid){
      mid = Math.floor((left+right)/2)
      if (array[mid] <= value){
        left = mid
      } else if (array[mid] > value) {
        right = mid
      }
    }
    return right
  }

  function without(array, ...values){
    return array.filter(item => !values.includes(item))
  }

  forIn = (object, iter = identity) => {
    iter = iteratee(iter)
    for (var key in object){
      if (iter(object[key], key, object) === false){
        return object
      }
    }
    return object
  }

  forInRight = (object, iter = identity) => {
    iter = iteratee(iter)
    var tmp = []
    for (var key in object){
      tmp.push(key)
    }
    while(tmp.length > 0){
      var key = tmp.pop()
      if (iter(object[key], key, object) === false){
        return object
      }
    }
    return object
  }


  function forOwn(object, iter = identity){
    var predicate = iteratee(iter)
    Object.keys(object).some(key => !predicate(object[key],key,object))
    return object
  }

  function forOwnRight(object, iter = identity){
    var predicate = iteratee(iter)
    Object.keys(object).reverse().some(key => !predicate(object[key],key,object))
    return object
  }

  assign = (object,...sources) =>{
    return sources.reduce((res, src) => {
      for (var key in src){
        if (src.hasOwnProperty(key)){
          res[key] = src[key]
        }
      }
      return res
    }, object)
  }

  assignIn = (object,...sources) => {
    return sources.reduce((res, src) => {
      for (var key in src){
        res[key] = src[key]
      }
      return res
    }, object)
  }


  defaults = (object, ...sources) => {
    sources.forEach(src => {
      for (var key in src){
        if (!(key in object)){
          object[key] = src[key]
        }
      }
    })
    return object
  }

  defaultsDeep = (object, ...sources) => {
    sources.reduce((res, src) => {
      for (var key in src){
        if (src[key] === null || typeof src[key] !== "object"){
          if (!(key in object)){
            object[key] = src[key]
          }
        } else {
          object[key] = Object.create(null)
          defaultsDeep(object[key],[src[key]])
        }
      }
    }, object)
  }

  merge = (object,...sources) => {
    sources.forEach(src => {
      for (var key in src){
        if (Array.isArray(src[key]) || isObject(src[key])){
          if (!(key in object)){
            object[key] = Object.create(null)
          }
          merge(object[key],[src[key]])
        } else {
          object[key] = src[key]
        }
      }
    })
    return object
  }

  mergeWith = (object, sources, customizer) => {

  }


  function keys(obj){
    var res = []
    for (var key in obj){
      if(obj.hasOwnProperty(key)){
        res.push(key)
      }
    }
    return res
    //return Object.keys(obj)
  }

  keysIn = obj => {
    var res = []
    for (var key in obj){
      res.push(key)
    }
    return res
  }

  function values(obj){
    var res = []
    for (var key in obj){
      if(obj.hasOwnProperty(key)){
        res.push(obj[key])
      }
    }
    return res
  }

  valuesIn = obj => {
    var res = []
    for (var key in obj){
      res.push(obj[key])
    }
    return res
  }

  function entries(obj){
    var res = []
    for (var key in obj){
      if(obj.hasOwnProperty(key)){
        var tmp = []
        tmp.push(String(key))
        tmp.push(obj[key])
        res.push(tmp)
      }
    }
    return res
  }

  functions = obj => Object.keys(obj).filter(key => isFunction(obj[key]))

  functionsIn = obj => keysIn(obj).filter(key => isFunction(obj[key]))

  function myFuncs(){

    function NEW(F, ...args) {
      var obj = {}
      obj.__proto__ = F.prototype
      var result = F.apply(obj, args)
      if (!result) {
        return obj
      }
      if (typeof result === 'object') {
        return result
      }
      return obj
    }

    function myCall(context){
      context = context || window
      context.tmp666666 = this
      var args = [...arguments].slice(1)
      var res = context.tmp666666(args)
      delete context.tmp666666
      return res
    }

    function myApply(context){
      context = context || window
      context.tmp666666 = this
      if (arguments[1]){
        var res = context.tmp666666(...arguments[1])
      } else {
        var res = context.tmp666666()
      }
      delete context.tmp666666
      return res
    }

    function myBind(context){
      if (typeof this !== "function"){
        throw new TypeError("errorerror")
      }
      var _this = this
      var args = [...arguments].slice(1)
      return function F(){
        if(this instanceof F){
          return _this.call(this,...args,...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
      }
    }

    Function.prototype.myBind = function(thisArg, ...bindedArgs) {
      var self = this
      return function f(...args) {
        if (this instanceof f) {
          Object.setPrototypeOf(this, self.prototype)
          return self.call(this, ...bindedArgs, ...args)
        }
        return self.call(thisArg, ...bindedArgs, ...args)
      }
    }

    function INSTANCEOF(val, fn) {
      if (!val) {
        return false
      }
      if (!val.__proto__) {
        return false
      }
      if (val.__proto__.constructor === fn) {
        return true
      } else {
        return INSTANCEOF(val.__proto__, fn)
      }
    }

    function baseConvent(a,x){
        if (x===2){
          return a.toString(2)
        }
        if (x===10){
          if (~~a - a === 0){
            return Number("0b"+a)
          } else {
            var inter = ~~a
            inter = Number("0b" + inter)
            var fl = String(a).slice(String(a).indexOf(".")+1).split("")
            var sum = 0
            while(fl.length > 0){
              sum += fl.pop() * 2**(-1-fl.length)
            }
            return inter + sum
          }
        }
    }

    //jQuery
    class queueFunction {
      constructor(){
        this.tasks=[]
        this.running = false
      }
      queue(f){
        if (this.running){
          this.tasks.push(f)
        } else {
          this.running = true
          var done
          f(done=()=>{
            if (this.tasks.length){
              var task = this.tasks.shift()
              task(done)
            } else {
              this.running = false
            }
          })
        }
        return this
      }
    }
      new queueFunction().queue(function(next){
        console.log(1)
          next()
      }).queue(function(next){
          setTimeout(next,3000)
          //Promise.resolve().then(next)
      }).queue(function(next){
          console.log(2)
          Promise.resolve().then(next)
      }).queue(function(next){
          console.log(3)
          next()
      })
      console.log(666)
      //甚至先于后面的同步代码执行

    var obj = {
      queueList: [],
      isFirst: true,
      next: function (){
        var func = obj.queueList.shift()
        if (func){
          func(obj.next)
        } else {
          obj.isFirst = true
        }
      },
      queue: function(f){
        obj.queueList.push(f)
        if (obj.isFirst){
          obj.isFirst = false
          setTimeout(obj.next,0)//
          //Promise.resolve().then(obj.next)====>3,1,2,undefined
        }
        return obj
      }
    }


    obj
    .queue(next => {console.log(1);next()})
    .queue(next => console.log(2))
    console.log(3)
    //3,undefined,1,2

    //async
    function asyncMap(ary, asyncMapper, callback) {
      var result = []
      var count = 0
      for(let i = 0; i < ary.length; i++) {
        asyncMapper(ary[i], function(err, val) {
          count++
          result[i] = val
          if (count === ary.length) {
            callback(null, result)
          }
        })
      }
    }
      // function square(x,cb){
      //   setTimeout(cb(null,x*x),2000)
      // }
      // //square(3,(x,y)=>{console.log(x,y)})

      // asyncMap([1,2,3,4],square,function(err,result){
      //   console.log(result)
      // })

    function asyncFilter(ary, asyncPredicate, callback) {
      var result = []
      var count = 0
      for(let i = 0; i<ary.length; i++) {
        asyncPredicate(ary[i], function(err, shouldSave) {
          count++
          if (shouldSave) {
            result[i] = ary[i]
          }
          if (count === ary.length) {
            result = result.filter(it => it)
            callback(null, result)
          }
        })
      }
    }
    function asyncEach(ary, asyncIterator, callback) {
      var count = 0
      for(var i = 0; i < ary.length; i++) {
        asyncIterator(ary[i], function(err) {
          count++
          if (count === ary.length) {
            callback(null)
          }
        })
      }
    }


    //promise
    Promise.resolve = function(value){
      return new Promise(function(resolved){
        resolved(value)
      })
    }

    Promise.all = function(promises){
      return new Promise(function(resolve,reject){
        var result = []
        var count = 0
        for (let i=0; i < promises.length; i++){
          promises[i].then(function(value){
            result[i] = value
            count++
            if (count === promises.length){
              resolve(result)
            }
          },reject)
        }

      })
    }

    Promise.race = function(promises){
      return new Promise(function(resolve,reject){
        for(let i = 0; i < promise.length; i++){
          promises[i].then(resolve,reject)
        }
      })
    }

    Promise.prototype.finally = function (callback) {
      let P = this.constructor;
      return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      );
    };
    // Promise.resolve(2).finally(() => {})
    // Promise.reject(3).finally(() => {})

    //node
    class EventEmitter {
      constructor() {
        this.eventMap = Object.create(null)
      }

      on(type, handler) {
        if (type in this.eventMap) {
          this.eventMap[type].push(handler)
        } else {
          this.eventMap[type] = [handler]
        }
        return this
      }

      off(type, handler) {
        if (type in this.eventMap) {
          this.eventMap[type] = this.eventMap[type].filter(it => it != handler)
        }
        return this
      }

      once(type, handler) {
        return this.on(type, function temp(...args) {
          handler.apply(this, args)
          this.off(type, temp)
        })
      }

      emit(type, ...args) {
        if (type in this.eventMap) {
          this.eventMap[type].forEach(handler => handler.apply(this, args))
        }
        return this
      }
    }
    function promisify(f) {
      return function(...args) {
        return new Promise((resolve, reject) => {
          f(...args, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        })
      }
    }
    function callbackify(f) {
      return function(...args){
        var callback = args.pop()

        f(...args).then(value => {
          callback(null, value)
        }, reason => {
          callback(reason, null)
        })
      }
    }



    //vue
    function observer(obj) {
      function isObject(val) {
        return Object.prototype.toString.call(val) === '[object Object]'
      }

      var copy = {}

      for(let key in obj) {
        if (isObject(obj[key])) {
          copy[key] = observer(obj[key])
        } else {
          copy[key] = obj[key]
        }

        Object.defineProperty(obj, key, {
          get: function(){
            return copy[key]
          },
          set: function(val){
            console.log('you are setting me!')
            if (isObject(val)) {
              val = observer(val)
            }
            copy[key] = val
          }
        })
      }
      return obj
    }


  }



  function objToString(val) {
    if (val === null) {
      return '[object Null]'
    }
    if (val === undefined) {
      return '[object Undefined]'
    }
    return '[object ' + val.constructor.name + ']'
  }

  // function parition(array,start,end){
  //   var pivotIndex = (end - start) * Math.random() | 0
  //   var pivot = ary[pivotIndex]
  //   swap (array,start,end)
  //   for (var i = start - 1,j = start; j < end; j++){
  //     if (ary[j] < pivot){
  //       i++
  //       swap (ary,j,i)
  //     }
  //   }
  //   return array
  // }

  function parition(collection, predicate=identity){
    var pred = iteratee(predicate)
    return reduce((res,item) => pred(item) === "true" ? res[0].push(item) : res[1].push(item)
    ,[[],[]])
  }

  function sortBy(collection, its){
    its = its.map(it => iteratee(it)).reverse()
    its.forEach(pred => collection.sort((a,b) => pred(a) > pred(b)))
    return collection
  }

  function orderBy(collection,its,orders){
    its = its.map(it => iteratee(it)).reverse()
    oeders = orders.reverse()
    its.forEach((pred,index) => {
      if (order[index] === "desc") {
        collection.sort((a,b) => pred(a) < pred(b))
      } else {
        collection.sort((a,b) => pred(a) > pred(b))
      }
    })
    return collection
  }

  function flow(...funcs){
    var fs = Array.prototype.slice.call(funcs)
    return function(...args){
      return fs.reduce((res,f)=> f(res),fs.shift()(...args))
    }
  }

  // function curry(func,arity=func.length){
  //   return function(...args){
  //     if (args.length >= arity){
  //       return func(...args)
  //     } else {
  //       return curry.bind(null,...args)
  //     }
  //   }
  // }

  function curry(func,arity=func.length) {
    var params = [];
    return function handler() {
      var args = Array.prototype.slice.call(arguments);
      Array.prototype.push.apply(params, args);
      // OR params.push.apply(this, args);
      if (params.length >= arity) {
        return func.apply(this, params);
      } else {
        return handler;
      }
    }
  }

  function curry(func,arity=func.length) {
    return (function resolver() {//??
      // 保存一份 resolver 函数接收到的参数，并转换为数组
      var memory = Array.prototype.slice.call(arguments);
      return function () {
        // 复制一份 memory，并将新参数 push 进去
        var local = memory.slice(), next;
        // 此时的 arguments 为返回的匿名函数接收到的参数
        Array.prototype.push.apply(local, arguments);
        // 所有参数的长度 >= fn 期待的参数个数时，调用 fn，否则递归
        next = local.length >= arity ? func : resolver;
        return next.apply(null, local);
      };
    }());
  }


  // const curry = (fn, ...args1) => (...args2) => (
  //   arg => arg.length === fn.length ? fn(...arg) : curry(fn, ...arg)
  //  )([...args1, ...args2]);
   
   // 调用
  //  const foo = (a, b, c) => a * b * c;
  //  curry(foo)(2, 3, 4); // -> 24
  //  curry(foo, 2)(3, 4); // -> 24
  //  curry(foo, 2, 3)(4); // -> 24
  //  curry(foo, 2, 3, 4)(); // -> 24
   

  function debounce(f,duration){
    var id
    return function(...args){
      clearTimeout(id)
      id = setTimeout(()=>{
        f.apply(this,args)
      },duration)
    }
  }

  function throttle(f,duration){
    var lastTime = 0
    return function(){
      var now = Date.now()
      if (now - lastTime > duration){
        f.apply(this,arguments)
        lastTime = now
      }
    }
  }


  function zip(...arrays){
    var res1 = [],res2 = []
    arrays.forEach(it => {
      res1.push(it[0])
      res2.push(it[1])
    })
    return [res1,res2]
  }

  function zipWith(...arrays){
    var iter = identity
    if (typeof arrays[arrays.length - 1] === 'function') {
      iter = arrays.pop()
    }
    return zip(...arrays).map(it => {
      iter(...it)
    })
  }

  function zipObject(props=[], values=[]){
    var res = {}
    for (var i = 0; i < props.length; i++){
      res[props[i]] = values[i]
    }
    return res
  }

  function zipObjectDeep(){

  }

  function countBy(collection, iter = identity){
    iter = iteratee(iter)
    collection.reduce((res, cur)=>{
      var val = iter(cur)
      if(!res[val]){
        res[val] = 1
      } else {
        res[val]++
      }
      return res
    },{})
  }

  function flatMap(collection,iter=identity){
    return flattencollection.map(iter).flatten()
  }

  function flatMapDeep(collection,iter=identity){
    return flattencollection.map(iter).flattenDeep()
  }

  function flatMapDepth(collection,iter=identity,depth=1){
    return flattencollection.map(iter).flattenDepth(depth)
  }

  function invokeMap(collection, path, ...args){
    if (typeof path === "string"){
      path = collection[0][path]
    }
    collection.map(it=>path.apply(it,args))
  }

  function partition(collection, prediate= identity){
    predicate = iteratee(predicate)
    collection.reduce((res, cur) => {
      if (predicate(cur)){
        res[0].push(cur)
      } else {
        res[1].push(cur)
      }
      return res
    },[[],[]])
  }

  function reject(collection, predicate=identity){
    predicate = iteratee(predicate)
    collection.reduce((res,cur)=>{
      if (!predicate(cur)){
        res.push(cur)
      }
      return res
    },[])
  }

  function sample(collection){
    var len = Object.keys(collection).length
    var n = Math.random() * len | 0
    return collection[n]
  }

  function sampleSize(collection,n = 1){
    var keys = Object.keys(collection)
    var len = keys.length
    n = Math.min(len,n)
    var set = new Set()
    while (n !== set.size){
      var it = Math.random() * len | 0
      set.add(it)
    }
    var res = []
    set.forEach(i => res.push(collection[keys[i]]))
    return res
  }

  function shuffle(collection){
    var keys = Object.keys(collection)
    var len = keys.length
    var set = new Set()
    while (len !== set.size){
      var it = Math.random() * len | 0
      set.add(it)
    }
    var res = []
    set.forEach(i => res.push(collection[keys[i]]))
    return res
  }

  function defer(func,...args){
    var that = this
    return setTimeout(func.apply(that,args))
  }

  function delay(func,wait,...args){
    var that = this
    return setTimeout(func.apply(that,args),wait)
  }

  castArray = (...value) => value

  eq = (value, other) => value === other || (value !== value && other !== other)
  gt = (value, other) => value > other
  gte = (value, other) => value >= other

  at = (object, ...paths) => paths.map(key => get(object,key))

  findkey = (object, predicate=identity) => {

  }



})()









