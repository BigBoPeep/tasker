class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BST {
  constructor(initialValues = []) {
    this.root = null;
    for (const value of initialValues) {
      this.insert(value);
    }
  }

  #compare(a, b) {
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  insert(value) {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return this;
    }

    let current = this.root;
    while (true) {
      const cmp = this.#compare(value, current.value);
      if (cmp === 0) return this;
      if (cmp < 0) {
        if (!current.left) {
          current.left = node;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return this;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;
    while (current) {
      const cmp = this.#compare(value, current.value);
      if (cmp === 0) return current;
      current = cmp < 0 ? current.left : current.right;
    }
    return null;
  }

  delete(value) {
    this.root = this.#deleteNode(this.root, value);
    return this;
  }

  #deleteNode(node, value) {
    if (!node) return null;
    const cmp = this.#compare(value, node.value);
    if (cmp < 0) {
      node.left = this.#deleteNode(node.left, value);
    } else if (cmp > 0) {
      node.right = this.#deleteNode(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let successor = node.right;
      while (successor.left) successor = successor.left;
      node.value = successor.value;
      node.right = this.#deleteNode(node.right, successor.value);
    }
    return node;
  }

  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  postOrder(node = this.root, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  getMin() {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) current = current.left;
    return current.value;
  }

  getMax() {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) current = current.right;
    return current.value;
  }

  getHeight(node = this.root) {
    if (!node) return -1;
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  contains(value) {
    return this.search(value) !== null;
  }
}
