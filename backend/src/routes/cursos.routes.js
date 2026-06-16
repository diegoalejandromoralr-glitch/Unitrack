const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursos.controller');

router.get('/',           ctrl.getInOrder);
router.get('/inorden',    ctrl.getInOrder);
router.get('/preorden',   ctrl.getPreOrder);
router.get('/postorden',  ctrl.getPostOrder);
router.get('/visual',     ctrl.getVisualStructure);
router.get('/min',        ctrl.getMin);
router.get('/max',        ctrl.getMax);
router.get('/altura',     ctrl.getTreeHeight);
router.get('/:codigo',    ctrl.searchCurso);
router.post('/',          ctrl.insertCurso);
router.delete('/:codigo', ctrl.deleteCurso);

module.exports = router;
