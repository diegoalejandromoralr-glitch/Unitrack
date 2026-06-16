const AVLTree = require('./data-structures/AVLTree');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/cursos.json');
const arbolCursos = new AVLTree();

function cargarDatos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      datos.forEach(curso => arbolCursos.insert(curso));
      console.log(`${datos.length} cursos cargados en AVLTree`);
    }
  } catch (error) {
    console.error('Error cargando cursos:', error.message);
  }
}

function guardarDatos() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(arbolCursos.inOrder().map(c => {
    const { balance, height, ...curso } = c;
    return curso;
  }), null, 2));
}

cargarDatos();

module.exports = {
  insertCurso: (data) => {
    if (arbolCursos.search(data.codigo)) {
      throw new Error(`El curso ${data.codigo} ya existe`);
    }
    arbolCursos.insert(data);
    guardarDatos();
    return data;
  },

  deleteCurso: (codigo) => {
    const curso = arbolCursos.search(codigo);
    if (!curso) return false;
    arbolCursos.delete(codigo);
    guardarDatos();
    return true;
  },

  searchCurso: (codigo) => arbolCursos.search(codigo),

  getInOrder: () => arbolCursos.inOrder(),
  getPreOrder: () => arbolCursos.preOrder(),
  getPostOrder: () => arbolCursos.postOrder(),
  getMin: () => arbolCursos.getMin(),
  getMax: () => arbolCursos.getMax(),
  getTreeHeight: () => arbolCursos.getTreeHeight(),
  getVisualStructure: () => arbolCursos.toVisualStructure()
};
