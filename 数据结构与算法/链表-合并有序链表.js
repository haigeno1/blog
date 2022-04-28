// 合并有序链表 递归 非递归
// https://blog.csdn.net/seu_lxy/article/details/89162397


var mergeTwoLists = function (l1, l2) {
  if (l1 === null) return l2
  if (l2 === null) return l1
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}

function ListNode(val) {
  this.val = val;
  this.next = null;
}

let a = new ListNode(1)
a.next = new ListNode(3)
a.next.next = new ListNode(5)

let b = new ListNode(2)
b.next = new ListNode(4)
console.log(JSON.stringify(mergeTwoLists(a, b)))

function Merge(pHead1, pHead2)//每次参加递归的头指针
{
  var p = null;   //每次链接到新链表的节点，初始化为空 
  if (pHead1 === null) {
    return pHead2;   //特殊情况，递归出口
  }
  if (pHead2 === null) {
    return pHead1;
  }
  if (pHead1.val < pHead2.val) {
    p = pHead1;
    p.next = Merge(pHead1.next, pHead2);
  } else {
    p = pHead2;
    p.next = Merge(pHead1, pHead2.next);
  }
  return p; //回溯后，这个p就是pHead1或者pHead2，链表头指针
}

function Merge(pHead1, pHead2) {
  var res;
  var p1 = pHead1;
  var p2 = pHead2;
  if (p1 === null) { return p2; }
  if (p2 === null) { return p1; }
  //确定新链表头指针，链表要以头指针返回
  if (p1.val < p2.val) {
    res = p1;
    p1 = p1.next;
  } else {
    res = p2;   //res为合并后链表的头,接下来只要依次将元素链接上即可
    p2 = p2.next;
  }
  var cur = res;//当前链表的结尾节点
  while (p1 !== null && p2 !== null) {
    if (p1.val < p2.val) {
      cur.next = p1;//将p1链接到当前链表末尾
      cur = p1;//末尾更新，后移
      p1 = p1.next;//需要合并的节点后移
    } else {
      cur.next = p2;
      cur = p2;
      p2 = p2.next;
    }
  }
  if (p1 !== null) { //p2已经空了，跳出while循环，将p1为头指针的后续链表连接上
    cur.next = p1;
  }
  if (p2 !== null) {  //p1已经空了，跳出while循环，将p2为头指针的后续链表连接上
    cur.next = p2;
  }
  return res;
}
