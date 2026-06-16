const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/estudiantes.controller');

router.get('/',                    ctrl.getAllEstudiantes);
router.get('/visual',              ctrl.getEstructuraVisual);
router.get('/invertir',            ctrl.invertirLista);
router.get('/:carnet/historial/backward', ctrl.getHistorialBackward);
router.get('/:carnet/historial',   ctrl.getHistorial);
router.put('/:carnet/historial/sort/:campo', ctrl.sortHistorial);
router.post('/:carnet/historial',  ctrl.addInscripcion);
router.delete('/:carnet/historial/:curso', ctrl.deleteInscripcion);
router.get('/:carnet',             ctrl.getEstudianteByCarnet);
router.post('/',                   ctrl.insertEstudiante);
router.delete('/:carnet',          ctrl.deleteEstudiante);

module.exports = router;
