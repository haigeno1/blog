// https://leetcode.com/problems/reverse-linked-list/
/**
 * @param {ListNode} head
 * @return {ListNode}
 */


function reverse(head) {
  let prev = null;
  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}

var reverseList = function (head) {
  let prevNode = null;
  let currNode = head;
  while (currNode) [currNode.next, prevNode, currNode] = [prevNode, currNode, currNode.next];
  return prevNode;
}

var reverseList = function (head) {
  let prev = null;
  let next = null;
  while (head != null) {
    next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
};

var reverseList = function (head) {
  let curr = head;
  let prev = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev; // reverse pointers
    prev = curr;
    curr = next;
  }
  return prev;
};

// if (!head) return head
// let newHead = new ListNode(head.val, null)
// while (head.next) {
//   head = head.next
//   newHead = new ListNode(head.val, newHead)
// }
// return newHead

// 反转链表 https://blog.csdn.net/weixin_36769175/article/details/81165741
// var reverseList = function (head) {
//   var list = head;
//   var p = list;
//   var q = null;

//   if (p == null)
//     return null;

//   while (p.next !== null) {
//     q = p.next;
//     p.next = q.next;
//     q.next = list;
//     list = q;
//   }
//   return list;
// };


// 递归  Recursive solution

var reverseList = function (head, previous = null) {
  if (head === null) return previous;
  let next = head.next;
  head.next = previous;
  return reverseList(next, head);
};

var reverseList = function (head) {
  if (!head) return null;
  function reverse(node, prev) {
    const next = node.next;
    node.next = prev;
    if (!next) return node;
    return reverse(next, node);
  }
  return reverse(head, null);
};

var reverseList = function (head) {
  let prev = null, next = null;
  return reverse(head, prev, next);
};
var reverse = function (head, prev, next) {
  if (head == null)
    return prev;
  next = head.next;
  head.next = prev;
  return reverse(next, head, next);
}

var reverseList = function (head) {
  if (!head || !head.next) return head;
  const tail = reverseList(head.next);
  head.next.next = head; // reverse pointers
  head.next = null; // avoid circular loop
  return tail; // new head
};
