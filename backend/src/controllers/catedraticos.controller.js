const service = require('../services/catedraticos.service');

const handleError = (res, error) => {
  console.error(error);
  res.status(400).json({ error: error.message });
};

module.exports = {
  getAll: (req, res) => {
    try {
      const catedraticos = service.getAllCatedraticos();
      res.json({ data: catedraticos, total: catedraticos.length });
    } catch (e) { handleError(res, e); }
  },

  getStats: (req, res) => {
    try {
      res.json(service.getStats());
    } catch (e) { handleError(res, e); }
  },

  getVisualStructure: (req, res) => {
    try {
      res.json(service.getVisualStructure());
    } catch (e) { handleError(res, e); }
  },

  searchCatedratico: (req, res) => {
    try {
      const cat = service.searchCatedratico(req.params.codigo);
      if (!cat) return res.status(404).json({ error: 'Catedrático no encontrado' });
      res.json({ data: cat });
    } catch (e) { handleError(res, e); }
  },

  insertCatedratico: (req, res) => {
    try {
      const nuevo = service.insertCatedratico(req.body);
      res.status(201).json({ message: 'Catedrático insertado', data: nuevo });
    } catch (e) { handleError(res, e); }
  },

  updateCatedratico: (req, res) => {
    try {
      const updated = service.updateCatedratico(req.params.codigo, req.body);
      res.json({ message: 'Catedrático actualizado', data: updated });
    } catch (e) { handleError(res, e); }
  },

  deleteCatedratico: (req, res) => {
    try {
      const eliminado = service.deleteCatedratico(req.params.codigo);
      if (!eliminado) return res.status(404).json({ error: 'Catedrático no encontrado' });
      res.json({ message: 'Catedrático eliminado' });
    } catch (e) { handleError(res, e); }
  },

  cambiarConfiguracion: (req, res) => {
    try {
      const { hashFunc, collisionMethod } = req.body;
      const stats = service.cambiarConfiguracion(hashFunc, collisionMethod);
      res.json({ message: 'Configuración actualizada', stats });
    } catch (e) { handleError(res, e); }
  }
};
