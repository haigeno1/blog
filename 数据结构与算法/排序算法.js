// https://www.cnblogs.com/onepixel/p/7674659.html


// 1、冒泡排序（Bubble Sort）
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
              var temp = arr[j+1];        // 元素交换
              arr[j+1] = arr[j];
              arr[j] = temp;
          }
      }
  }
  return arr;
}


// 2、选择排序（Selection Sort）
function selectionSort(arr) {
  var len = arr.length;
  var minIndex, temp;
  for (var i = 0; i < len - 1; i++) {
      minIndex = i;
      for (var j = i + 1; j < len; j++) {
          if (arr[j] < arr[minIndex]) {     // 寻找最小的数
              minIndex = j;                 // 将最小数的索引保存
          }
      }
      temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
  }
  return arr;
}


// 3、插入排序（Insertion Sort）
function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for (var i = 1; i < len; i++) {
      preIndex = i - 1;
      current = arr[i];
      while (preIndex >= 0 && arr[preIndex] > current) {
          arr[preIndex + 1] = arr[preIndex];
          preIndex--;
      }
      arr[preIndex + 1] = current;
  }
  return arr;
}


// 4、希尔排序（Shell Sort）
// 每组长度 len/2 len/4 len/8 ... 1, 每组的第i个值都是递增的,当每组长度为1时，就是最终结果
function shellSort(arr) {
  var len = arr.length;
  for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
      // 注意：这里和动图演示的不一样，动图是分组执行，实际操作是多个分组交替执行
      for (var i = gap; i < len; i++) {
          var j = i;
          var current = arr[i];
          while (j - gap >= 0 && current < arr[j - gap]) {
               arr[j] = arr[j - gap];
               j = j - gap;
          }
          arr[j] = current;
      }
  }
  return arr;
}

// 5、归并排序（Merge Sort）
function mergeSort(arr) {
  var len = arr.length;
  if (len < 2) {
      return arr;
  }
  var middle = Math.floor(len / 2),
      left = arr.slice(0, middle),
      right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];

  while (left.length>0 && right.length>0) {
      if (left[0] <= right[0]) {
          result.push(left.shift());
      } else {
          result.push(right.shift());
      }
  }

  while (left.length)
      result.push(left.shift());

  while (right.length)
      result.push(right.shift());

  return result;
}

// 6、快速排序（Quick Sort）
function quickSort(arr, left, right) {
  var len = arr.length,
      partitionIndex,
      left = typeof left != 'number' ? 0 : left,
      right = typeof right != 'number' ? len - 1 : right;

  if (left < right) {
      partitionIndex = partition(arr, left, right);
      quickSort(arr, left, partitionIndex-1);
      quickSort(arr, partitionIndex+1, right);
  }
  return arr;
}

function partition(arr, left ,right) {     // 分区操作
  var pivot = left,                      // 设定基准值（pivot）且一直没有变过
      index = pivot + 1; // index 始终是pivot及其后面比pivot小的元素索引的右面一个
  for (var i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) { // 这里是与pivot对比
          swap(arr, i, index); // 这里是和index交换
          index++;
      }
  }
  swap(arr, pivot, index - 1);
  return index-1;
}

function partition1(nums, start, end) {
    const povit = nums[start];
    while (start < end) {
        while (start < end && nums[end] >= povit) {
            end--;
        }
        nums[start] = nums[end];
        while (start < end && nums[start] < povit) {
            start++;
        }
        nums[end] = nums[start];
    }
    nums[start] = povit;
    return start;
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}



/**
 * 快速排序
 * @param  num 待排序数组
 */
 function quickSort(num) {
    _quickSort(num, 0, num.length - 1); // 将整个num数组快速排序，left和right分别指向数组左右两端。
}
/**
 * 快速排序(递归)
 * @param num 待排序数组
 * @param left 左指针
 * @param right 右指针
 */
function _quickSort(num, left, right) {
    if (left >= right) return; // 若左右指针相遇，待排序数组长度小宇1，即递归的终点，return(注意不能写成left==right，这里left是有可能大于right的)。
    var i = left, j = right, flag = left; // 定义可移动的左右指针 i，j，定义flag为基数下标。
    while (i < j) { // 在i<j时不断循环，i一旦与j碰头，则跳出循环。
        while (num[j] >= num[flag] && j > flag) j--; // j不断左移，找到在num[flag]右侧且比它大的数。
        if (i >= j) {
            break; // 由于j可能已被改变，需再次判断i与j是否碰头。
        }
        while (num[i] <= num[flag] && i < j) i++; // i不断右移，找到且比基数小的数，且i不能与j碰头。(由于两次交换已合并，此处不需要使得i在flag左侧)
        // num[flag] num[j] num[i]三者换位，可用ES6语法糖[num[flag],num[j],num[i]] = [num[j],num[i],num[flag]];
        let temp = num[flag]; 
        num[flag] = num[j];
        num[j] = num[i];
        num[i] = temp
        flag = i; // 基数已经在原num[i]的位置，flag同时也要赋值成i。
    }
    _quickSort(num, left, flag - 1); // 将flag左边数组作为待排序数组，递归调用。
    _quickSort(num, flag + 1, right); // 将flag右边数组作为待排序数组，递归调用。
}

function quickSort(num) {
    _quickSort(num, 0, num.length - 1); // 将整个num数组快速排序，left和right分别指向数组左右两端。
}


/**
 * 快速排序(迭代，非递归)
 */
 
function _quickSort(num, left, right) {
    var list = [[left, right]]; // 将[left,right]存入数组中，类似于递归入栈
    while (list.length > 0) { // 若list不为空，循环弹出list最后一个数组进行快排
        var now = list.pop(); // 弹出list末尾。(也可用list.shift()取出list第一个数组，但在数据量较大时，这种方式效率较低)
        if (now[0] >= now[1]) { // 若左右指针相遇，待排序数组长度小宇1，则无需进行快排(注意不能写成now[0]==now[1]，这里now[0]是有可能大于now[1]的
            continue;
        }
        var i = now[0], j = now[1], flag = now[0]; // 以下与递归方法相同，请参考上面的递归详解
        while (i < j) {
            while (num[j] >= num[flag] && j > flag) j--;
            if (i >= j) {
                break;
            }
            while (num[i] <= num[flag] && i < j) i++;
            let temp = num[flag];
            num[flag] = num[j];
            num[j] = num[i];
            num[i] = temp;
            flag = i;
        }
        list.push([now[0], flag - 1]); // 将flag左边数组作为待排序数组，只需将左右指针放入list即可。
        list.push([flag + 1, now[1]]); // 将flag右边数组作为待排序数组，只需将左右指针放入list即可。
    }
}


// 7、堆排序（Heap Sort）
var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapSort(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}


// 8、计数排序（Counting Sort）
function countingSort(arr, maxValue) {
  var bucket = new Array(maxValue + 1),
      sortedIndex = 0;
      arrLen = arr.length,
      bucketLen = maxValue + 1;

  for (var i = 0; i < arrLen; i++) {
      if (!bucket[arr[i]]) {
          bucket[arr[i]] = 0;
      }
      bucket[arr[i]]++;
  }

  for (var j = 0; j < bucketLen; j++) {
      while(bucket[j] > 0) {
          arr[sortedIndex++] = j;
          bucket[j]--;
      }
  }

  return arr;
}


// 9、桶排序（Bucket Sort）
function bucketSort(arr, bucketSize) {
  if (arr.length === 0) {
    return arr;
  }

  var i;
  var minValue = arr[0];
  var maxValue = arr[0];
  for (i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
        minValue = arr[i];                // 输入数据的最小值
    } else if (arr[i] > maxValue) {
        maxValue = arr[i];                // 输入数据的最大值
    }
  }

  // 桶的初始化
  var DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  var buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
      buckets[i] = [];
  }

  // 利用映射函数将数据分配到各个桶中
  for (i = 0; i < arr.length; i++) {
      buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }

  arr.length = 0;
  for (i = 0; i < buckets.length; i++) {
      insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
      for (var j = 0; j < buckets[i].length; j++) {
          arr.push(buckets[i][j]);
      }
  }

  return arr;
}


// 10、基数排序（Radix Sort）
var counter = [];
function radixSort(arr, maxDigit) {
    var mod = 10;
    var dev = 1;
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for(var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod) / dev);
            if(counter[bucket]==null) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        var pos = 0;
        for(var j = 0; j < counter.length; j++) {
            var value = null;
            if(counter[j]!=null) {
                while ((value = counter[j].shift()) != null) {
                      arr[pos++] = value;
                }
          }
        }
    }
    return arr;
}
