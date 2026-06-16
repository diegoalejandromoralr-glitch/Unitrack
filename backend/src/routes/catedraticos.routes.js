const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/catedraticos.controller');

router.get('/',           ctrl.getAll);
router.get('/stats',      ctrl.getStats);
router.get('/visual',     ctrl.getVisualStructure);
router.post('/config',    ctrl.cambiarConfiguracion);
router.get('/:codigo',    ctrl.searchCatedratico);
router.post('/',          ctrl.insertCatedratico);
router.put('/:codigo',    ctrl.updateCatedratico);
router.delete('/:codigo', ctrl.deleteCatedratico);

module.exports = router;
