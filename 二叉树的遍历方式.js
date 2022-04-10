// https://programmercarl.com/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E8%BF%AD%E4%BB%A3%E9%81%8D%E5%8E%86.html

// 递归遍历
var preorderTraversal1 = function (root) {
    let res = [];
    const dfs = function (root) {
        if (root === null) return;
        //先序遍历所以从父节点开始
        res.push(root.val);
        //递归左子树
        dfs(root.left);
        //递归右子树
        dfs(root.right);
    }
    //只使用一个参数 使用闭包进行存储结果
    dfs(root);
    return res;
};


var inorderTraversal1 = function (root) {
    let res = [];
    const dfs = function (root) {
        if (root === null) {
            return;
        }
        dfs(root.left);
        res.push(root.val);
        dfs(root.right);
    }
    dfs(root);
    return res;
};


var postorderTraversal1 = function (root) {
    let res = [];
    const dfs = function (root) {
        if (root === null) {
            return;
        }
        dfs(root.left);
        dfs(root.right);
        res.push(root.val);
    }
    dfs(root);
    return res;
};



// 非统一方式的迭代遍历
// 前序遍历:
// 入栈 右 -> 左
// 出栈 中 -> 左 -> 右
var preorderTraversal2 = function (root, res = []) {
    if (!root) return res;
    const stack = [root];
    let cur = null;
    while (stack.length) {
        cur = stack.pop();
        res.push(cur.val);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    }
    return res;
};


// 中序遍历:
// 入栈 左 -> 右
// 出栈 左 -> 中 -> 右

var inorderTraversal2 = function (root, res = []) {
    const stack = [];
    let cur = root;
    while (stack.length || cur) {
        if (cur) {
            stack.push(cur);
            // 左
            cur = cur.left;
        } else {
            // --> 弹出 中
            cur = stack.pop();
            res.push(cur.val);
            // 右
            cur = cur.right;
        }
    };
    return res;
};



// 后序遍历:
// 入栈 左 -> 右
// 出栈 中 -> 右 -> 左 结果翻转

var postorderTraversal2 = function (root, res = []) {
    if (!root) return res;
    const stack = [root];
    let cur = null;
    do {
        cur = stack.pop();
        res.push(cur.val);
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
    } while (stack.length);
    return res.reverse();
};




// 我们以中序遍历为例，在二叉树：听说递归能做的，栈也能做！中提到说使用栈的话，无法同时解决访问节点（遍历节点）和处理节点（将元素放进结果集）不一致的情况。
// 那我们就将访问的节点放入栈中，把要处理的节点也放入栈中但是要做标记。
// 如何标记呢，就是要处理的节点放入栈之后，紧接着放入一个空指针作为标记。 这种方法也可以叫做标记法。

// 前序遍历统一迭代法
// 前序遍历：中左右
// 压栈顺序：右左中

var preorderTraversal3 = function (root, res = []) {
    const stack = [];
    if (root) stack.push(root);
    while (stack.length) {
        const node = stack.pop();
        if (!node) {
            console.log("🚀 ~ file: 二叉树的遍历方式.js ~ line 127 ~ preorderTraversal3 ~ stack:", stack.map(it => it ? it.val : null))
            res.push(stack.pop().val);
            continue;
        }
        if (node.right) stack.push(node.right); // 右
        if (node.left) stack.push(node.left); // 左
        stack.push(node); // 中
        stack.push(null); // 中节点访问过，但是还没有处理，加入空节点做为标记。
    };
    return res;
};




//  中序遍历统一迭代法
//  中序遍历：左中右
//  压栈顺序：右中左

var inorderTraversal3 = function (root, res = []) {
    const stack = [];
    if (root) stack.push(root);
    while (stack.length) {
        const node = stack.pop();
        if (!node) {
            res.push(stack.pop().val);
            continue;
        }
        if (node.right) stack.push(node.right); // 右
        stack.push(node); // 中
        stack.push(null);
        if (node.left) stack.push(node.left); // 左
    };
    return res;
};




// 后序遍历统一迭代法
// 后续遍历：左右中
// 压栈顺序：中右左

var postorderTraversal3 = function (root, res = []) {
    const stack = [];
    if (root) stack.push(root);
    while (stack.length) {
        const node = stack.pop();
        if (!node) {
            res.push(stack.pop().val);
            continue;
        }
        stack.push(node); // 中
        stack.push(null);
        if (node.right) stack.push(node.right); // 右
        if (node.left) stack.push(node.left); // 左
    };
    return res;
};



// 层序遍历
var levelOrder = function (root) {
    //二叉树的层序遍历
    let res = [], queue = [];
    queue.push(root);
    if (root === null) {
        return res;
    }
    while (queue.length !== 0) {
        // 记录当前层级节点数
        let length = queue.length;
        //存放每一层的节点 
        let curLevel = [];
        for (let i = 0; i < length; i++) {
            let node = queue.shift();
            curLevel.push(node.val);
            // 存放当前层下一层的节点
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        //把每一层的结果放到结果数组
        res.push(curLevel);
    }
    return res;
};







// test
// * Definition for a binary tree node.
// * function TreeNode(val, left, right) {
// *     this.val = (val===undefined ? 0 : val)
// *     this.left = (left===undefined ? null : left)
// *     this.right = (right===undefined ? null : right)
// * }
var root = {
    val: 1,
    left: {
        val: 21,
        left: {
            val: 31,
            left: {
                val: 41,
                left: null,
                right: null
            },
            right: {
                val: 42,
                left: null,
                right: null
            },
        },
        right: {
            val: 32,
            left: null,
            right: null,
        },
    },
    right: {
        val: 22,
        left: {
            val: 33,
            left: null,
            right: null,
        },
        right: {
            val: 34,
            left: null,
            right: null,
        },
    },
}


// preorderTraversal1(root)
// inorderTraversal1(root)
// postorderTraversal1(root)
// preorderTraversal2(root)
// inorderTraversal2(root)
// postorderTraversal2(root)
preorderTraversal3(root)
// inorderTraversal3(root)
// postorderTraversal3(root)
// levelOrder(root)