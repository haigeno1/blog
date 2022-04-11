/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 用小顶堆实现优先队列
class MinHeap {
    constructor() {
        this.heap = [];
    }
    // 交换节点位置
    swap(i1, i2) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }
    // 获得父节点
    getParentIndex(i) {
        return (i - 1) >> 1;
    }
    // 获得左节点
    getleftIndex(i) {
        return 2 * i + 1;
    }
    // 获得右节点
    getrightIndex(i) {
        return 2 * i + 2;
    }
    // 上移
    shiftUp(index) {
        if (index === 0) return;

        const parentIndex = this.getParentIndex(index);
        if (this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);
        }
    }
    // 下移
    shiftDown(index) {
        const leftIndex = this.getleftIndex(index);
        const rightIndex = this.getrightIndex(index);
        if (this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex);
        }
        if (this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index);
            this.shiftDown(rightIndex);
        }
    }
    // 插入
    insert(value) {
        this.heap.push(value);
        this.shiftUp(this.heap.length - 1);
    }
    // 删除堆顶
    pop() {
        // pop()方法删除数组最后一个元素并返回，赋值给堆顶
        this.heap[0] = this.heap.pop();
        // 对堆顶重新排序
        this.shiftDown(0);
    }
    // 获取堆顶
    peek() {
        return this.heap[0];
    }
    // 获取堆的大小
    size() {
        return this.heap.length;
    }
}

const findKthLargest = (nums, k) => {
    const minHeap = new MinHeap();
    nums.forEach(n => {
        // 将数组元素依次插入堆中
        minHeap.insert(n);
        // 如果堆大小超过k， 开始裁员， 将堆顶(最小) 的去掉
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    })
    // 返回堆顶，此时就是第k大的元素
    return minHeap.peek();
};








// 用数组实现优先队列
// 实现方式1：入队O(1), 出队O(n);
class Pq {
    constructor(arr) {
        if (arr.length) {
            this.tree = arr;
            return;
        }
        this.tree = [];
    }

    // 入队
    enqueue(val) {
        this.tree.push(val);
    }

    // 出队
    dequeue() {
        let maxIndex = 0;
        for (let i = 1; i < this.tree.length; i++) {
            if (this.tree[i] > this.tree[maxIndex]) {
                maxIndex = i;
            }
        }
        this.tree.splice(maxIndex, 1);
    }

    // 取队首
    getFirst() {
        return this.tree[0];
    }
}







// 实现方式2： 入队O(n), 出队O(1);
class Pq2 {
    constructor(arr) {
        if (arr.length) {
            this.tree = arr;
            this.tree.sort((a, b) => {
                return b - a;
            });
            return;
        }
        this.tree = [];
    }

    // 入队
    enqueue(val) {
        let t = this.tree;
        if (val > t[0]) { t.unshift(val); return; }
        if (val <= t[t.length - 1]) { t.push(val); return; }
        for (let i = 0; i <= t.length - 2; i++) {
            if (t[i] >= val && val > t[i + 1]) {
                t.splice(i + 1, 0, val); // 插入
                return;
            }
        }
    }

    // 出队
    dequeue() {
        this.tree.shift();
    }

    // 取队首
    getFirst() {
        return this.tree[0];
    }
}

let q = new Pq2([1, 3, 6, 4, 2])
q.enqueue(5)
console.log(q.tree)
