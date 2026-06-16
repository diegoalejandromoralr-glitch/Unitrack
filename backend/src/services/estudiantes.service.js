const LinkedList = require('./data-structures/LinkedList');
const DoublyLinkedList = require('./data-structures/DoublyLinkedList');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/estudiantes.json');
const listaEstudiantes = new LinkedList();
const historiales = {};

function cargarDatos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const datos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      datos.forEach(est => {
        const { historial, ...estData } = est;
        listaEstudiantes.insertAtEnd(estData);
        historiales[est.carnet] = new DoublyLinkedList();
        if (historial) {
          historial.forEach(insc => historiales[est.carnet].insertAtEnd(insc));
        }
      });
      console.log(`${listaEstudiantes.getSize()} estudiantes cargados desde JSON`);
    }
  } catch (error) {
    console.error('Error cargando datos de estudiantes:', error.message);
  }
}

function guardarDatos() {
  const estudiantes = listaEstudiantes.toArray().map(est => ({
    ...est,
    historial: historiales[est.carnet] ? historiales[est.carnet].traverseForward() : []
  }));
  fs.writeFileSync(DATA_FILE, JSON.stringify(estudiantes, null, 2));
}

cargarDatos();

module.exports = {
  getAllEstudiantes: () => listaEstudiantes.toArray(),

  getEstudianteByCarnet: (carnet) => {
    const resultado = listaEstudiantes.searchByCarnet(carnet);
    return resultado.found ? resultado.data : null;
  },

  insertEstudiante: (data, posicion = 'end') => {
    const existe = listaEstudiantes.searchByCarnet(data.carnet);
    if (existe.found) throw new Error(`El carnet ${data.carnet} ya existe`);
    if (posicion === 'beginning') listaEstudiantes.insertAtBeginning(data);
    else if (typeof posicion === 'number') listaEstudiantes.insertAtPosition(data, posicion);
    else listaEstudiantes.insertAtEnd(data);
    historiales[data.carnet] = new DoublyLinkedList();
    guardarDatos();
    return data;
  },

  deleteEstudiante: (carnet) => {
    const eliminado = listaEstudiantes.deleteByCarnet(carnet);
    if (eliminado) {
      delete historiales[carnet];
      guardarDatos();
    }
    return eliminado;
  },

  invertirLista: () => {
    listaEstudiantes.reverse();
    guardarDatos();
    return listaEstudiantes.toArray();
  },

  getEstructuraVisual: () => listaEstudiantes.toVisualStructure(),

  getHistorial: (carnet) => {
    if (!historiales[carnet]) return null;
    return historiales[carnet].toVisualStructure();
  },

  addInscripcion: (carnet, inscripcion, posicion = 'end') => {
    if (!historiales[carnet]) throw new Error(`Estudiante ${carnet} no encontrado`);
    if (posicion === 'beginning') historiales[carnet].insertAtBeginning(inscripcion);
    else historiales[carnet].insertAtEnd(inscripcion);
    guardarDatos();
    return inscripcion;
  },

  deleteInscripcion: (carnet, codigoCurso) => {
    if (!historiales[carnet]) throw new Error(`Estudiante ${carnet} no encontrado`);
    const eliminado = historiales[carnet].deleteByCourse(codigoCurso);
    if (eliminado) guardarDatos();
    return eliminado;
  },

  getHistorialForward: (carnet) => {
    if (!historiales[carnet]) return [];
    return historiales[carnet].traverseForward();
  },

  getHistorialBackward: (carnet) => {
    if (!historiales[carnet]) return [];
    return historiales[carnet].traverseBackward();
  },

  sortHistorial: (carnet, campo) => {
    if (!historiales[carnet]) throw new Error(`Estudiante ${carnet} no encontrado`);
    historiales[carnet].sortBy(campo);
    guardarDatos();
    return historiales[carnet].traverseForward();
  }
};
