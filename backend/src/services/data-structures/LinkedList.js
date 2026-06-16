class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAtBeginning(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  insertAtEnd(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  insertAtPosition(data, index) {
    if (index < 0 || index > this.size) {
      throw new Error(`Índice ${index} fuera de rango. Tamaño actual: ${this.size}`);
    }
    if (index === 0) {
      this.insertAtBeginning(data);
      return;
    }
    const newNode = new Node(data);
    let current = this.head;
    let contador = 0;
    while (contador < index - 1) {
      current = current.next;
      contador++;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  deleteByCarnet(carnet) {
    if (!this.head) return false;
    if (this.head.data.carnet === carnet) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    let current = this.head;
    while (current.next !== null) {
      if (current.next.data.carnet === carnet) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  searchByCarnet(carnet) {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.data.carnet === carnet) {
        return { found: true, data: current.data, index };
      }
      current = current.next;
      index++;
    }
    return { found: false, data: null, index: -1 };
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  getSize() {
    return this.size;
  }

  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;
    while (current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }

  toVisualStructure() {
    const nodes = [];
    let current = this.head;
    let index = 0;
    while (current !== null) {
      nodes.push({
        index,
        data: current.data,
        hasNext: current.next !== null
      });
      current = current.next;
      index++;
    }
    return { nodes, size: this.size };
  }
}

module.exports = LinkedList;
