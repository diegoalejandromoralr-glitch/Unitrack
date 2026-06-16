const DirectedGraph = require('./data-structures/DirectedGraph');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/pensum.json');
const grafoPensum = new DirectedGraph();

function cargarDatos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      datos.vertices.forEach(v => grafoPensum.addVertex(v.codigo, v));
      datos.edges.forEach(e => grafoPensum.addEdge(e.from, e.to));
      console.log(`${datos.vertices.length} cursos cargados en grafo de pensum`);
    }
  } catch (error) {
    console.error('Error cargando pensum:', error.message);
  }
}

function guardarDatos() {
  const visual = grafoPensum.toVisualStructure();
  const data = {
    vertices: visual.nodes.map(n => ({ codigo: n.id, ...n.data })),
    edges: visual.edges
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

cargarDatos();

module.exports = {
  addCurso: (data) => {
    if (grafoPensum.vertices.has(data.codigo)) {
      throw new Error(`El curso ${data.codigo} ya existe en el pensum`);
    }
    grafoPensum.addVertex(data.codigo, data);
    guardarDatos();
    return data;
  },

  removeCurso: (codigo) => {
    const removed = grafoPensum.removeVertex(codigo);
    if (removed) guardarDatos();
    return removed;
  },

  addPrerrequisito: (from, to) => {
    grafoPensum.addEdge(from, to);
    guardarDatos();
    return { from, to };
  },

  removePrerrequisito: (from, to) => {
    const removed = grafoPensum.removeEdge(from, to);
    if (removed) guardarDatos();
    return removed;
  },

  bfsDesde: (codigo) => grafoPensum.bfs(codigo),
  dfsDesde: (codigo) => grafoPensum.dfs(codigo),
  detectarCiclos: () => ({ hasCycle: grafoPensum.hasCycle() }),
  ordenTopologico: () => grafoPensum.topologicalSort(),
  getPrerequisitos: (codigo) => grafoPensum.getPrerequisites(codigo),
  caminoCorto: (from, to) => grafoPensum.shortestPath(from, to),
  getVisualStructure: () => grafoPensum.toVisualStructure()
};
