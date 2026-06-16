function hashDivision(key, size) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % size;
}

function hashDJB2(key, size) {
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) + hash) + key.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash) % size;
}

class HashTable {
  constructor(size = 10, hashFunc = 'division', collisionMethod = 'chaining') {
    this.size = size;
    this.hashFunc = hashFunc;
    this.collisionMethod = collisionMethod;
    this.collisions = 0;
    this.count = 0;
    this.LOAD_FACTOR_THRESHOLD = 0.75;
    if (collisionMethod === 'chaining') {
      this.buckets = Array.from({ length: size }, () => []);
    } else {
      this.buckets = new Array(size).fill(null);
    }
  }

  _hash(key) {
    if (this.hashFunc === 'djb2') return hashDJB2(key, this.size);
    return hashDivision(key, this.size);
  }

  getLoadFactor() {
    return this.count / this.size;
  }

  insert(key, data) {
    if (this.getLoadFactor() >= this.LOAD_FACTOR_THRESHOLD) {
      this._rehash();
    }
    const index = this._hash(key);
    if (this.collisionMethod === 'chaining') {
      const bucket = this.buckets[index];
      const existingIndex = bucket.findIndex(item => item.key === key);
      if (existingIndex !== -1) {
        bucket[existingIndex].data = data;
      } else {
        if (bucket.length > 0) this.collisions++;
        bucket.push({ key, data });
        this.count++;
      }
    } else {
      let i = index;
      let attempts = 0;
      while (this.buckets[i] !== null && this.buckets[i] !== 'DELETED' && attempts < this.size) {
        if (this.buckets[i].key === key) {
          this.buckets[i].data = data;
          return;
        }
        this.collisions++;
        i = (i + 1) % this.size;
        attempts++;
      }
      this.buckets[i] = { key, data };
      this.count++;
    }
  }

  search(key) {
    const index = this._hash(key);
    if (this.collisionMethod === 'chaining') {
      const item = this.buckets[index].find(item => item.key === key);
      return item ? item.data : null;
    }
    let i = index;
    let attempts = 0;
    while (this.buckets[i] !== null && attempts < this.size) {
      if (this.buckets[i] !== 'DELETED' && this.buckets[i].key === key) {
        return this.buckets[i].data;
      }
      i = (i + 1) % this.size;
      attempts++;
    }
    return null;
  }

  delete(key) {
    const index = this._hash(key);
    if (this.collisionMethod === 'chaining') {
      const bucket = this.buckets[index];
      const i = bucket.findIndex(item => item.key === key);
      if (i !== -1) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
      return false;
    }
    let i = index;
    let attempts = 0;
    while (this.buckets[i] !== null && attempts < this.size) {
      if (this.buckets[i] !== 'DELETED' && this.buckets[i].key === key) {
        this.buckets[i] = 'DELETED';
        this.count--;
        return true;
      }
      i = (i + 1) % this.size;
      attempts++;
    }
    return false;
  }

  _rehash() {
    const nuevoTamano = this.size * 2;
    const tablaVieja = this.buckets;
    this.size = nuevoTamano;
    this.count = 0;
    this.collisions = 0;
    if (this.collisionMethod === 'chaining') {
      this.buckets = Array.from({ length: nuevoTamano }, () => []);
      tablaVieja.forEach(bucket => bucket.forEach(item => this.insert(item.key, item.data)));
    } else {
      this.buckets = new Array(nuevoTamano).fill(null);
      tablaVieja.forEach(slot => {
        if (slot && slot !== 'DELETED') this.insert(slot.key, slot.data);
      });
    }
  }

  getStats() {
    return {
      size: this.size,
      count: this.count,
      loadFactor: this.getLoadFactor().toFixed(2),
      collisions: this.collisions,
      hashFunc: this.hashFunc,
      collisionMethod: this.collisionMethod
    };
  }

  toVisualStructure() {
    const buckets = this.buckets.map((bucket, index) => {
      if (this.collisionMethod === 'chaining') {
        return { index, items: bucket, type: 'chain' };
      }
      return {
        index,
        item: bucket,
        status: bucket === null ? 'empty' : bucket === 'DELETED' ? 'deleted' : 'occupied'
      };
    });
    return { buckets, stats: this.getStats() };
  }

  getAll() {
    const result = [];
    if (this.collisionMethod === 'chaining') {
      this.buckets.forEach(bucket => bucket.forEach(item => result.push(item.data)));
    } else {
      this.buckets.forEach(slot => {
        if (slot && slot !== 'DELETED') result.push(slot.data);
      });
    }
    return result;
  }
}

module.exports = { HashTable, hashDivision, hashDJB2 };
