const DoublyLinkedList = require("./doubly-linked-list");

describe("push", function () {
  it("appends node and increments length", function () {
    let dll = new DoublyLinkedList();

    dll.push(5);
    expect(dll.length).toBe(1);
    expect(dll.head.val).toBe(5);
    expect(dll.tail.val).toBe(5);
    expect(dll.tail.prev).toBe(null);

    dll.push(10);
    expect(dll.length).toBe(2);
    expect(dll.head.val).toBe(5);
    expect(dll.head.next.val).toBe(10);
    expect(dll.tail.val).toBe(10);
    expect(dll.tail.prev.val).toBe(5);

    dll.push(15);
    expect(dll.length).toBe(3);
    expect(dll.head.val).toBe(5);
    expect(dll.head.next.val).toBe(10);
    expect(dll.tail.val).toBe(15);
    expect(dll.tail.prev.val).toBe(10);
    expect(dll.tail.prev.prev.val).toBe(5);
  });
});

describe("unshift", function () {
  it("adds node at start and increments length", function () {
    let dll = new DoublyLinkedList();

    dll.unshift(5);
    expect(dll.length).toBe(1);
    expect(dll.head.val).toBe(5);
    expect(dll.tail.val).toBe(5);
    expect(dll.tail.prev).toBe(null);

    dll.unshift(10);
    expect(dll.length).toBe(2);
    expect(dll.head.val).toBe(10);
    expect(dll.tail.val).toBe(5);
    expect(dll.tail.prev.val).toBe(10);

    dll.unshift(15);
    expect(dll.length).toBe(3);
    expect(dll.head.val).toBe(15);
    expect(dll.head.next.val).toBe(10);
    expect(dll.tail.val).toBe(5);
    expect(dll.tail.prev.val).toBe(10);
    expect(dll.tail.prev.prev.val).toBe(15);
  });
});

describe("pop", function () {
  it("removes node at end and decrements length", function () {
    let dll = new DoublyLinkedList([5, 10]);

    expect(dll.pop()).toBe(10);
    expect(dll.head.val).toBe(5);
    expect(dll.tail.val).toBe(5);
    expect(dll.tail.prev).toBe(null);
    expect(dll.length).toBe(1);

    expect(dll.pop()).toBe(5);
    expect(dll.head).toBe(null);
    expect(dll.tail).toBe(null);
    expect(dll.length).toBe(0);
  });
});

describe("shift", function () {
  it("removes node at start and decrements length", function () {
    let dll = new DoublyLinkedList([1, 5, 10]);

    expect(dll.shift()).toBe(1);
    expect(dll.tail.val).toBe(10);
    expect(dll.head.val).toBe(5);
    expect(dll.head.prev).toBe(null);
    expect(dll.head.next.prev.val).toBe(5);
    expect(dll.length).toBe(2);

    expect(dll.shift()).toBe(5);
    expect(dll.tail.val).toBe(10);
    expect(dll.head.val).toBe(10);
    expect(dll.head.prev).toBe(null);
    expect(dll.length).toBe(1);

    expect(dll.shift()).toBe(10);
    expect(dll.head).toBe(null);
    expect(dll.tail).toBe(null);
    expect(dll.length).toBe(0);
  });
});

describe("getAt", function () {
  it("gets val at index", function () {
    let dll = new DoublyLinkedList([5, 10, 15, 20]);

    expect(dll.getAt(0)).toBe(5);
    expect(dll.getAt(1)).toBe(10);
    expect(dll.getAt(2)).toBe(15);
    expect(dll.getAt(3)).toBe(20);
  });

  it("throws an error when getAt index is out of range", function () {
    let dll = new DoublyLinkedList([5]);

    expect(() => dll.getAt(-1)).toThrow(Error);
    expect(() => dll.getAt(1)).toThrow(Error);

    dll.pop();
    expect(() => dll.getAt(0)).toThrow(Error);
  });
});

describe("setAt", function () {
  it("sets val at index", function () {
    let dll = new DoublyLinkedList([5, 10]);

    expect(dll.setAt(0, 1));
    expect(dll.head.val).toBe(1);
    expect(dll.head.next.val).toBe(10);
    expect(dll.tail.val).toBe(10);
    expect(dll.length).toBe(2);

    expect(dll.setAt(1, 2));
    expect(dll.head.val).toBe(1);
    expect(dll.head.next.val).toBe(2);
    expect(dll.tail.val).toBe(2);
    expect(dll.length).toBe(2);
  });

  it("throws an error when setAt index is out of range", function () {
    let dll = new DoublyLinkedList([5]);

    expect(() => dll.setAt(-1, 10)).toThrow(Error);
    expect(() => dll.setAt(1, 10)).toThrow(Error);
  });
});

describe("insertAt", function () {
  it("inserts node and adjusts nearby nodes", function () {
    let dll = new DoublyLinkedList([5, 15]);

    dll.insertAt(1, 10);
    expect(dll.head.val).toBe(5);
    expect(dll.head.next.val).toBe(10);
    expect(dll.head.next.prev.val).toBe(5);
    expect(dll.head.next.next.val).toBe(15);
    expect(dll.head.next.next.prev.val).toBe(10);
    expect(dll.tail.val).toBe(15);
    expect(dll.length).toBe(3);

    dll.insertAt(0, 1);
    expect(dll.head.val).toBe(1);
    expect(dll.tail.val).toBe(15);
    expect(dll.length).toBe(4);

    dll.insertAt(4, 20);
    expect(dll.head.val).toBe(1);
    expect(dll.tail.val).toBe(20);
    expect(dll.length).toBe(5);
  });

  it("inserts into empty list", function () {
    let dll = new DoublyLinkedList();

    dll.insertAt(0, 5);
    expect(dll.length).toBe(1);
    expect(dll.head.val).toBe(5);
    expect(dll.tail.val).toBe(5);
  });

  it("throws an error when insertAt index is out of range", function () {
    let dll = new DoublyLinkedList([5]);

    expect(() => dll.insertAt(-1, 0)).toThrow(Error);
    expect(() => dll.insertAt(2, 0)).toThrow(Error);
  });
});

describe("removeAt", function () {
  it("removes items from list", function () {
    let dll = new DoublyLinkedList([5, 10, 15, 20]);

    expect(dll.length).toBe(4);
    expect(dll.removeAt(2)).toBe(15);
    expect(dll.head.next.val).toBe(10);
    expect(dll.head.next.next.val).toBe(20);
    expect(dll.head.next.next.prev.val).toBe(10);
    expect(dll.length).toBe(3);

    expect(dll.removeAt(0)).toBe(5);
    expect(dll.head.val).toBe(10);
    expect(dll.head.prev).toBe(null);
    expect(dll.length).toBe(2);

    expect(dll.removeAt(1)).toBe(20);
    expect(dll.head.val).toBe(10);
    expect(dll.tail.val).toBe(10);
    expect(dll.head.prev).toBe(null);
    expect(dll.length).toBe(1);
  });

  it("removes from 1-item list", function () {
    let dll = new DoublyLinkedList(["a"]);

    dll.removeAt(0);
    expect(dll.length).toBe(0);
    expect(dll.head).toBe(null);
    expect(dll.tail).toBe(null);
  });

  it("throws an error when removeAt index is out of range", function () {
    let dll = new DoublyLinkedList([5]);

    expect(() => dll.removeAt(-1)).toThrow(Error);
    expect(() => dll.removeAt(1)).toThrow(Error);
  });
});
