const service = require('../services/cursos.service');

const handleError = (res, error) => {
  console.error(error);
  res.status(400).json({ error: error.message });
};

module.exports = {
  getInOrder: (req, res) => {
    try {
      const cursos = service.getInOrder();
      res.json({ data: cursos, total: cursos.length });
    } catch (e) { handleError(res, e); }
  },

  getPreOrder: (req, res) => {
    try {
      res.json({ data: service.getPreOrder() });
    } catch (e) { handleError(res, e); }
  },

  getPostOrder: (req, res) => {
    try {
      res.json({ data: service.getPostOrder() });
    } catch (e) { handleError(res, e); }
  },

  getVisualStructure: (req, res) => {
    try {
      res.json(service.getVisualStructure());
    } catch (e) { handleError(res, e); }
  },

  getMin: (req, res) => {
    try {
      const min = service.getMin();
      if (!min) return res.status(404).json({ error: 'Árbol vacío' });
      res.json({ data: min });
    } catch (e) { handleError(res, e); }
  },

  getMax: (req, res) => {
    try {
      const max = service.getMax();
      if (!max) return res.status(404).json({ error: 'Árbol vacío' });
      res.json({ data: max });
    } catch (e) { handleError(res, e); }
  },

  getTreeHeight: (req, res) => {
    try {
      res.json({ height: service.getTreeHeight() });
    } catch (e) { handleError(res, e); }
  },

  searchCurso: (req, res) => {
    try {
      const curso = service.searchCurso(req.params.codigo);
      if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
      res.json({ data: curso });
    } catch (e) { handleError(res, e); }
  },

  insertCurso: (req, res) => {
    try {
      const nuevo = service.insertCurso(req.body);
      res.status(201).json({ message: 'Curso insertado', data: nuevo });
    } catch (e) { handleError(res, e); }
  },

  deleteCurso: (req, res) => {
    try {
      const eliminado = service.deleteCurso(req.params.codigo);
      if (!eliminado) return res.status(404).json({ error: 'Curso no encontrado' });
      res.json({ message: 'Curso eliminado' });
    } catch (e) { handleError(res, e); }
  }
};
