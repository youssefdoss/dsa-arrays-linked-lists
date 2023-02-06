/** Node: node for a singly linked list. */

class Node {
  val = null;
  next = null;

  constructor(val) {
    this.val = val;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  head = null;
  tail = null;
  length = 0;

  constructor(vals = []) {
    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) this.head = newNode;

    if (this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) this.tail = this.head;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0) throw new Error('Cannot pop from empty list');

    if (this.length === 1) {
      let val = this.head.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return val;
    } else if (this.length === 2) {
      let val = this.tail.val;
      this.tail = this.head;
      this.length--;
      return val;
    }
    let prev = this._getNode(this.length - 2);

    let val = prev.next.val;
    prev.next = null;
    this.tail = prev;
    this.length--;
    return val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) throw new Error('Cannot shift on empty list');

    if (this.length === 1) {
      let val = this.head.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return val;
    }
    let val = this.head.val;
    this.head = this.head.next;
    this.length--;
    return val;
  }

  /** _getNode(): returns node at a given index */

  _getNode(idx) {
    let currNode = this.head;
    let counter = 0;

    while (currNode !== null && counter !== idx) {
      counter++;
      currNode = currNode.next;
    }

    return currNode;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length - 1 || idx < 0) throw new Error('Invalid Index');

    return this._getNode(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1 || idx < 0) throw new Error('Invalid Index');

    let selectedNode = this._getNode(idx);
    selectedNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) throw new Error('Invalid Index');

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let prev = this._getNode(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;
    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx > this.length - 1 || idx < 0) throw new Error("Invalid index");

    if (idx === 0) return this.shift();
    if (idx === this.length - 1) return this.pop();

    let prev = this._getNode(idx - 1);

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length--;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;
    if (this.length === 1) return this.head.val;

    let currNode = this.head;
    let total = 0;

    while (currNode) {
      total += currNode.val;
      currNode = currNode.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
