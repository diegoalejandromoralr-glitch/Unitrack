const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pensum.controller');

router.get('/',                              ctrl.getVisualStructure);
router.get('/visual',                        ctrl.getVisualStructure);
router.get('/topological-sort',              ctrl.ordenTopologico);
router.get('/detect-cycles',                 ctrl.detectarCiclos);
router.get('/bfs/:codigo',                   ctrl.bfsDesde);
router.get('/dfs/:codigo',                   ctrl.dfsDesde);
router.get('/path/:from/:to',                ctrl.caminoCorto);
router.get('/:codigo/prerequisites',         ctrl.getPrerequisitos);
router.post('/cursos',                       ctrl.addCurso);
router.delete('/cursos/:codigo',             ctrl.removeCurso);
router.post('/prerrequisito',                ctrl.addPrerrequisito);
router.delete('/prerrequisito/:from/:to',    ctrl.removePrerrequisito);

module.exports = router;
