const service = require('../services/estudiantes.service');

const handleError = (res, error) => {
  console.error(error);
  res.status(400).json({ error: error.message });
};

module.exports = {
  getAllEstudiantes: (req, res) => {
    try {
      const estudiantes = service.getAllEstudiantes();
      res.json({ data: estudiantes, total: estudiantes.length });
    } catch (e) { handleError(res, e); }
  },

  getEstudianteByCarnet: (req, res) => {
    try {
      const est = service.getEstudianteByCarnet(req.params.carnet);
      if (!est) return res.status(404).json({ error: 'Estudiante no encontrado' });
      res.json({ data: est });
    } catch (e) { handleError(res, e); }
  },

  insertEstudiante: (req, res) => {
    try {
      const { posicion, ...estudianteData } = req.body;
      const nuevo = service.insertEstudiante(estudianteData, posicion);
      res.status(201).json({ message: 'Estudiante insertado', data: nuevo });
    } catch (e) { handleError(res, e); }
  },

  deleteEstudiante: (req, res) => {
    try {
      const eliminado = service.deleteEstudiante(req.params.carnet);
      if (!eliminado) return res.status(404).json({ error: 'Estudiante no encontrado' });
      res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (e) { handleError(res, e); }
  },

  invertirLista: (req, res) => {
    try {
      const lista = service.invertirLista();
      res.json({ message: 'Lista invertida', data: lista });
    } catch (e) { handleError(res, e); }
  },

  getEstructuraVisual: (req, res) => {
    try {
      res.json(service.getEstructuraVisual());
    } catch (e) { handleError(res, e); }
  },

  getHistorial: (req, res) => {
    try {
      const historial = service.getHistorial(req.params.carnet);
      if (!historial) return res.status(404).json({ error: 'Estudiante no encontrado' });
      res.json(historial);
    } catch (e) { handleError(res, e); }
  },

  getHistorialBackward: (req, res) => {
    try {
      res.json({ data: service.getHistorialBackward(req.params.carnet) });
    } catch (e) { handleError(res, e); }
  },

  addInscripcion: (req, res) => {
    try {
      const { posicion, ...inscripcionData } = req.body;
      const nueva = service.addInscripcion(req.params.carnet, inscripcionData, posicion);
      res.status(201).json({ message: 'Inscripción agregada', data: nueva });
    } catch (e) { handleError(res, e); }
  },

  deleteInscripcion: (req, res) => {
    try {
      const eliminado = service.deleteInscripcion(req.params.carnet, req.params.curso);
      if (!eliminado) return res.status(404).json({ error: 'Inscripción no encontrada' });
      res.json({ message: 'Inscripción eliminada' });
    } catch (e) { handleError(res, e); }
  },

  sortHistorial: (req, res) => {
    try {
      const sorted = service.sortHistorial(req.params.carnet, req.params.campo);
      res.json({ data: sorted });
    } catch (e) { handleError(res, e); }
  }
};
