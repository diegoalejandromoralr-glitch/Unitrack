class DirectedGraph {
  constructor() {
    this.adjacencyList = new Map();
    this.vertices = new Map();
  }

  addVertex(codigo, data) {
    if (!this.adjacencyList.has(codigo)) {
      this.adjacencyList.set(codigo, new Set());
      this.vertices.set(codigo, data);
    }
  }

  removeVertex(codigo) {
    if (!this.adjacencyList.has(codigo)) return false;
    this.adjacencyList.forEach((neighbors) => {
      neighbors.delete(codigo);
    });
    this.adjacencyList.delete(codigo);
    this.vertices.delete(codigo);
    return true;
  }

  addEdge(from, to) {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) {
      throw new Error(`Uno o ambos cursos no existen: ${from}, ${to}`);
    }
    this.adjacencyList.get(from).add(to);
  }

  removeEdge(from, to) {
    if (this.adjacencyList.has(from)) {
      this.adjacencyList.get(from).delete(to);
      return true;
    }
    return false;
  }

  bfs(startCodigo) {
    if (!this.adjacencyList.has(startCodigo)) return [];
    const visited = new Set();
    const queue = [startCodigo];
    const result = [];
    const levels = {};
    visited.add(startCodigo);
    levels[startCodigo] = 0;
    while (queue.length > 0) {
      const current = queue.shift();
      result.push({
        codigo: current,
        data: this.vertices.get(current),
        level: levels[current]
      });
      this.adjacencyList.get(current).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          levels[neighbor] = levels[current] + 1;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  dfs(startCodigo) {
    if (!this.adjacencyList.has(startCodigo)) return [];
    const visited = new Set();
    const result = [];
    const dfsHelper = (codigo, depth = 0) => {
      visited.add(codigo);
      result.push({ codigo, data: this.vertices.get(codigo), depth });
      this.adjacencyList.get(codigo).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor, depth + 1);
        }
      });
    };
    dfsHelper(startCodigo);
    return result;
  }

  hasCycle() {
    const state = new Map();
    this.adjacencyList.forEach((_, vertex) => state.set(vertex, 0));
    const dfsCheck = (vertex) => {
      state.set(vertex, 1);
      for (const neighbor of this.adjacencyList.get(vertex)) {
        if (state.get(neighbor) === 1) return true;
        if (state.get(neighbor) === 0 && dfsCheck(neighbor)) return true;
      }
      state.set(vertex, 2);
      return false;
    };
    for (const vertex of this.adjacencyList.keys()) {
      if (state.get(vertex) === 0) {
        if (dfsCheck(vertex)) return true;
      }
    }
    return false;
  }

  topologicalSort() {
    if (this.hasCycle()) {
      throw new Error('El grafo contiene ciclos. No es posible el ordenamiento topológico.');
    }
    const visited = new Set();
    const stack = [];
    const dfsTopological = (vertex) => {
      visited.add(vertex);
      this.adjacencyList.get(vertex).forEach(neighbor => {
        if (!visited.has(neighbor)) dfsTopological(neighbor);
      });
      stack.push(vertex);
    };
    this.adjacencyList.forEach((_, vertex) => {
      if (!visited.has(vertex)) dfsTopological(vertex);
    });
    return stack.reverse().map(codigo => ({
      codigo,
      data: this.vertices.get(codigo)
    }));
  }

  getPrerequisites(codigoCurso) {
    const directos = [];
    const indirectos = new Set();
    this.adjacencyList.forEach((neighbors, vertex) => {
      if (neighbors.has(codigoCurso)) {
        directos.push(vertex);
      }
    });
    const queue = [...directos];
    const visited = new Set(directos);
    while (queue.length > 0) {
      const current = queue.shift();
      this.adjacencyList.forEach((neighbors, vertex) => {
        if (neighbors.has(current) && !visited.has(vertex)) {
          visited.add(vertex);
          indirectos.add(vertex);
          queue.push(vertex);
        }
      });
    }
    return {
      directos: directos.map(c => ({ codigo: c, data: this.vertices.get(c) })),
      indirectos: [...indirectos].map(c => ({ codigo: c, data: this.vertices.get(c) }))
    };
  }

  shortestPath(from, to) {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) return null;
    const visited = new Set([from]);
    const queue = [[from]];
    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];
      if (current === to) return path;
      this.adjacencyList.get(current).forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      });
    }
    return null;
  }

  toVisualStructure() {
    const nodes = [];
    const edges = [];
    this.vertices.forEach((data, codigo) => {
      nodes.push({ id: codigo, label: codigo, data });
    });
    this.adjacencyList.forEach((neighbors, from) => {
      neighbors.forEach(to => {
        edges.push({ from, to });
      });
    });
    return { nodes, edges };
  }
}

module.exports = DirectedGraph;
