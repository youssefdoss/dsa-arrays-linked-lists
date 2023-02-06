const LinkedList = require("./linked-list");

describe("push", function() {
  it("appends node and increments length", function() {
    let lst = new LinkedList();

    lst.push(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.push(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.tail.val).toBe(10);

    lst.push(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.tail.val).toBe(15);
  });
});

describe("unshift", function() {
  it("adds node at start and increments length", function() {
    let lst = new LinkedList();

    lst.unshift(5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);

    lst.unshift(10);
    expect(lst.length).toBe(2);
    expect(lst.head.val).toBe(10);
    expect(lst.tail.val).toBe(5);

    lst.unshift(15);
    expect(lst.length).toBe(3);
    expect(lst.head.val).toBe(15);
    expect(lst.head.next.val).toBe(10);
    expect(lst.tail.val).toBe(5);
  });
});

describe("pop", function() {
  it("removes node at end and decrements length", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.pop()).toBe(10);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
    expect(lst.length).toBe(1);

    expect(lst.pop()).toBe(5);
    expect(lst.head).toBe(null);
    expect(lst.tail).toBe(null);
    expect(lst.length).toBe(0);
  });
});

describe("shift", function() {
  it("removes node at start and decrements length", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.shift()).toBe(5);
    expect(lst.tail.val).toBe(10);
    expect(lst.head.val).toBe(10);
    expect(lst.length).toBe(1);

    expect(lst.shift()).toBe(10);
    expect(lst.head).toBe(null);
    expect(lst.tail).toBe(null);
    expect(lst.length).toBe(0);
  });
});

describe("getAt", function() {
  it("gets val at index", function() {
    let lst = new LinkedList([5, 10, 15, 20]);

    expect(lst.getAt(0)).toBe(5);
    expect(lst.getAt(1)).toBe(10);
    expect(lst.getAt(2)).toBe(15);
    expect(lst.getAt(3)).toBe(20);
  });

  it("throws an error when getAt index is out of range", function () {
    let lst = new LinkedList([5]);

    expect(() => lst.getAt(-1)).toThrow(Error);
    expect(() => lst.getAt(1)).toThrow(Error);

    lst.pop();
    expect(() => lst.getAt(0)).toThrow(Error);
  });
});

describe("setAt", function() {
  it("sets val at index", function() {
    let lst = new LinkedList([5, 10]);

    expect(lst.setAt(0, 1));
    expect(lst.head.val).toBe(1);
    expect(lst.head.next.val).toBe(10);
    expect(lst.tail.val).toBe(10);
    expect(lst.length).toBe(2);

    expect(lst.setAt(1, 2));
    expect(lst.head.val).toBe(1);
    expect(lst.head.next.val).toBe(2);
    expect(lst.tail.val).toBe(2);
    expect(lst.length).toBe(2);
  });

  it("throws an error when setAt index is out of range", function () {
    let lst = new LinkedList([5]);

    expect(() => lst.setAt(-1, 10)).toThrow(Error);
    expect(() => lst.setAt(1, 10)).toThrow(Error);
  });
});

describe("insertAt", function() {
  it("inserts node and adjusts nearby nodes", function() {
    let lst = new LinkedList([5, 15]);

    lst.insertAt(1, 10);
    expect(lst.head.val).toBe(5);
    expect(lst.head.next.val).toBe(10);
    expect(lst.head.next.next.val).toBe(15);
    expect(lst.tail.val).toBe(15);
    expect(lst.length).toBe(3);

    lst.insertAt(0, 1);
    expect(lst.head.val).toBe(1);
    expect(lst.tail.val).toBe(15);
    expect(lst.length).toBe(4);

    lst.insertAt(4, 20);
    expect(lst.head.val).toBe(1);
    expect(lst.tail.val).toBe(20);
    expect(lst.length).toBe(5);
  });

  it("inserts into empty list", function() {
    let lst = new LinkedList();

    lst.insertAt(0, 5);
    expect(lst.length).toBe(1);
    expect(lst.head.val).toBe(5);
    expect(lst.tail.val).toBe(5);
  });

  it("throws an error when insertAt index is out of range", function () {
    let lst = new LinkedList([5]);

    expect(() => lst.insertAt(-1, 0)).toThrow(Error);
    expect(() => lst.insertAt(2, 0)).toThrow(Error);
  });
});

describe("removeAt", function() {
  it("removes items from list", function() {
    let lst = new LinkedList([5, 10, 15, 20]);

    expect(lst.length).toBe(4);
    expect(lst.removeAt(2)).toBe(15);
    expect(lst.length).toBe(3);

    expect(lst.removeAt(0)).toBe(5);
    expect(lst.length).toBe(2);

    expect(lst.removeAt(1)).toBe(20);
    expect(lst.length).toBe(1);
  });

  it("removes from 1-item list", function() {
    let lst = new LinkedList(["a"]);

    lst.removeAt(0);
    expect(lst.length).toBe(0);
    expect(lst.head).toBe(null);
    expect(lst.tail).toBe(null);
  });

  it("throws an error when removeAt index is out of range", function () {
    let lst = new LinkedList([5]);

    expect(() => lst.removeAt(-1)).toThrow(Error);
    expect(() => lst.removeAt(1)).toThrow(Error);
  });
});

describe("average", function() {
  it("calculates the average of items in a list", function() {
    let lst = new LinkedList([2, 3, 1, 1, 7, 6, 9]);
    expect(lst.average()).toBeCloseTo(4.1429, 4);
  });

  it("returns 0 for empty lists", function() {
    let lst = new LinkedList();
    expect(lst.average()).toBe(0);
  });
});

describe("reverseInPlace", function() {
  it("reverses a list of 3 in place", function() {
    let lst = new LinkedList([1,2,3]);
    lst.reverseInPlace();
    expect(lst.head.val).toBe(3);
    expect(lst.head.next.val).toBe(2);
    expect(lst.head.next.next.val).toBe(1);
    expect(lst.tail.val).toBe(1);
    expect(lst.tail.next).toBe(null);
  });

  it("reverses a list of 2 in place", function() {
    let lst = new LinkedList([1,2]);
    lst.reverseInPlace();
    expect(lst.head.val).toBe(2);
    expect(lst.head.next.val).toBe(1);
    expect(lst.tail.val).toBe(1);
  });

  it("reverses a list of 1 in place", function() {
    let lst = new LinkedList([1]);
    lst.reverseInPlace();
    expect(lst.head.val).toBe(1);
    expect(lst.head.next).toBe(null);
    expect(lst.tail.val).toBe(1);
    expect(lst.tail.next).toBe(null);
  });
});

