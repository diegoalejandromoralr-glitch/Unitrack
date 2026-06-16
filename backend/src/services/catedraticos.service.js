const { HashTable } = require('./data-structures/HashTable');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/catedraticos.json');
let tablaCatedraticos = new HashTable(10, 'division', 'chaining');

function cargarDatos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      datos.forEach(cat => tablaCatedraticos.insert(cat.codigo, cat));
      console.log(`${datos.length} catedráticos cargados en HashTable`);
    }
  } catch (error) {
    console.error('Error cargando catedráticos:', error.message);
  }
}

function guardarDatos() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tablaCatedraticos.getAll(), null, 2));
}

cargarDatos();

module.exports = {
  getAllCatedraticos: () => tablaCatedraticos.getAll(),

  insertCatedratico: (data) => {
    if (tablaCatedraticos.search(data.codigo)) {
      throw new Error(`El catedrático ${data.codigo} ya existe`);
    }
    tablaCatedraticos.insert(data.codigo, data);
    guardarDatos();
    return data;
  },

  searchCatedratico: (codigo) => tablaCatedraticos.search(codigo),

  deleteCatedratico: (codigo) => {
    const eliminado = tablaCatedraticos.delete(codigo);
    if (eliminado) guardarDatos();
    return eliminado;
  },

  updateCatedratico: (codigo, data) => {
    if (!tablaCatedraticos.search(codigo)) {
      throw new Error(`Catedrático ${codigo} no encontrado`);
    }
    const updated = { ...tablaCatedraticos.search(codigo), ...data, codigo };
    tablaCatedraticos.insert(codigo, updated);
    guardarDatos();
    return updated;
  },

  getStats: () => tablaCatedraticos.getStats(),
  getVisualStructure: () => tablaCatedraticos.toVisualStructure(),

  cambiarConfiguracion: (hashFunc, collisionMethod) => {
    const datos = tablaCatedraticos.getAll();
    tablaCatedraticos = new HashTable(10, hashFunc || 'division', collisionMethod || 'chaining');
    datos.forEach(cat => tablaCatedraticos.insert(cat.codigo, cat));
    return tablaCatedraticos.getStats();
  }
};
