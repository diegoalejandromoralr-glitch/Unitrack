class AVLNode {
  constructor(data) {
    this.data = data;
    this.key = data.codigo;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  updateHeight(node) {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rotateRight(y) {
    const x = y.left;
    const B = x.right;
    x.right = y;
    y.left = B;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const B = y.left;
    y.left = x;
    x.right = B;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  insert(data) {
    this.root = this._insert(this.root, data);
  }

  _insert(node, data) {
    if (!node) return new AVLNode(data);
    if (data.codigo < node.key) {
      node.left = this._insert(node.left, data);
    } else if (data.codigo > node.key) {
      node.right = this._insert(node.right, data);
    } else {
      node.data = data;
      return node;
    }
    this.updateHeight(node);
    return this._rebalance(node, data.codigo);
  }

  _rebalance(node, key) {
    const balance = this.getBalance(node);
    if (balance > 1 && key < node.left.key) {
      return this.rotateRight(node);
    }
    if (balance < -1 && key > node.right.key) {
      return this.rotateLeft(node);
    }
    if (balance > 1 && key > node.left.key) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }
    if (balance < -1 && key < node.right.key) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }
    return node;
  }

  search(codigo) {
    return this._search(this.root, codigo);
  }

  _search(node, codigo) {
    if (!node) return null;
    if (codigo === node.key) return node.data;
    if (codigo < node.key) return this._search(node.left, codigo);
    return this._search(node.right, codigo);
  }

  delete(codigo) {
    this.root = this._delete(this.root, codigo);
  }

  _delete(node, codigo) {
    if (!node) return null;
    if (codigo < node.key) {
      node.left = this._delete(node.left, codigo);
    } else if (codigo > node.key) {
      node.right = this._delete(node.right, codigo);
    } else {
      if (!node.left || !node.right) {
        node = node.left || node.right;
      } else {
        const sucesor = this._getMin(node.right);
        node.key = sucesor.key;
        node.data = sucesor.data;
        node.right = this._delete(node.right, sucesor.key);
      }
    }
    if (!node) return null;
    this.updateHeight(node);
    return this._rebalance(node, node.key);
  }

  inOrder() {
    const result = [];
    this._inOrder(this.root, result);
    return result;
  }

  _inOrder(node, result) {
    if (!node) return;
    this._inOrder(node.left, result);
    result.push({ ...node.data, balance: this.getBalance(node), height: node.height });
    this._inOrder(node.right, result);
  }

  preOrder() {
    const result = [];
    this._preOrder(this.root, result);
    return result;
  }

  _preOrder(node, result) {
    if (!node) return;
    result.push(node.data);
    this._preOrder(node.left, result);
    this._preOrder(node.right, result);
  }

  postOrder() {
    const result = [];
    this._postOrder(this.root, result);
    return result;
  }

  _postOrder(node, result) {
    if (!node) return;
    this._postOrder(node.left, result);
    this._postOrder(node.right, result);
    result.push(node.data);
  }

  _getMin(node) {
    return node.left ? this._getMin(node.left) : node;
  }

  getMin() {
    return this.root ? this._getMin(this.root).data : null;
  }

  getMax() {
    let node = this.root;
    while (node && node.right) node = node.right;
    return node ? node.data : null;
  }

  getTreeHeight() {
    return this.getHeight(this.root);
  }

  toVisualStructure() {
    return this._nodeToJSON(this.root);
  }

  _nodeToJSON(node) {
    if (!node) return null;
    return {
      name: node.key,
      data: node.data,
      balance: this.getBalance(node),
      height: node.height,
      children: [
        this._nodeToJSON(node.left),
        this._nodeToJSON(node.right)
      ].filter(Boolean)
    };
  }
}

module.exports = AVLTree;
