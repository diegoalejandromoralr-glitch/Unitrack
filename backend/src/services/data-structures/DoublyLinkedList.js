class DNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insertAtBeginning(data) {
    const newNode = new DNode(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  insertAtEnd(data) {
    const newNode = new DNode(data);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  deleteByCourse(codigoCurso) {
    let current = this.head;
    while (current !== null) {
      if (current.data.codigoCurso === codigoCurso) {
        if (current.prev) current.prev.next = current.next;
        else this.head = current.next;
        if (current.next) current.next.prev = current.prev;
        else this.tail = current.prev;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  traverseForward() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  traverseBackward() {
    const result = [];
    let current = this.tail;
    while (current !== null) {
      result.push(current.data);
      current = current.prev;
    }
    return result;
  }

  search(campo, valor) {
    let current = this.head;
    const resultados = [];
    while (current !== null) {
      if (current.data[campo] === valor) {
        resultados.push(current.data);
      }
      current = current.next;
    }
    return resultados;
  }

  sortBy(campo) {
    if (!this.head || !this.head.next) return;
    let swapped;
    do {
      swapped = false;
      let current = this.head;
      while (current.next !== null) {
        if (current.data[campo] > current.next.data[campo]) {
          const temp = current.data;
          current.data = current.next.data;
          current.next.data = temp;
          swapped = true;
        }
        current = current.next;
      }
    } while (swapped);
  }

  toVisualStructure() {
    const nodes = [];
    let current = this.head;
    let index = 0;
    while (current !== null) {
      nodes.push({
        index,
        data: current.data,
        hasPrev: current.prev !== null,
        hasNext: current.next !== null
      });
      current = current.next;
      index++;
    }
    return { nodes, size: this.size };
  }
}

module.exports = DoublyLinkedList;
