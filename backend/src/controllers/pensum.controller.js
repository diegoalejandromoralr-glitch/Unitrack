const service = require('../services/pensum.service');

const handleError = (res, error) => {
  console.error(error);
  res.status(400).json({ error: error.message });
};

module.exports = {
  getVisualStructure: (req, res) => {
    try {
      res.json(service.getVisualStructure());
    } catch (e) { handleError(res, e); }
  },

  ordenTopologico: (req, res) => {
    try {
      res.json({ data: service.ordenTopologico() });
    } catch (e) { handleError(res, e); }
  },

  detectarCiclos: (req, res) => {
    try {
      res.json(service.detectarCiclos());
    } catch (e) { handleError(res, e); }
  },

  bfsDesde: (req, res) => {
    try {
      res.json({ data: service.bfsDesde(req.params.codigo) });
    } catch (e) { handleError(res, e); }
  },

  dfsDesde: (req, res) => {
    try {
      res.json({ data: service.dfsDesde(req.params.codigo) });
    } catch (e) { handleError(res, e); }
  },

  getPrerequisitos: (req, res) => {
    try {
      res.json(service.getPrerequisitos(req.params.codigo));
    } catch (e) { handleError(res, e); }
  },

  caminoCorto: (req, res) => {
    try {
      const path = service.caminoCorto(req.params.from, req.params.to);
      if (!path) return res.status(404).json({ error: 'No hay camino entre los cursos' });
      res.json({ path });
    } catch (e) { handleError(res, e); }
  },

  addCurso: (req, res) => {
    try {
      const nuevo = service.addCurso(req.body);
      res.status(201).json({ message: 'Curso agregado al pensum', data: nuevo });
    } catch (e) { handleError(res, e); }
  },

  removeCurso: (req, res) => {
    try {
      const removed = service.removeCurso(req.params.codigo);
      if (!removed) return res.status(404).json({ error: 'Curso no encontrado' });
      res.json({ message: 'Curso eliminado del pensum' });
    } catch (e) { handleError(res, e); }
  },

  addPrerrequisito: (req, res) => {
    try {
      const { from, to } = req.body;
      const edge = service.addPrerrequisito(from, to);
      res.status(201).json({ message: 'Prerrequisito agregado', data: edge });
    } catch (e) { handleError(res, e); }
  },

  removePrerrequisito: (req, res) => {
    try {
      const removed = service.removePrerrequisito(req.params.from, req.params.to);
      if (!removed) return res.status(404).json({ error: 'Prerrequisito no encontrado' });
      res.json({ message: 'Prerrequisito eliminado' });
    } catch (e) { handleError(res, e); }
  }
};
