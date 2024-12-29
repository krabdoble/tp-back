const express= require('express');
const router= express.Router();

const controller = require('../controllers/pedidoController');

const {validarFirebase} = require('../middlewares/validatorFirebase.js');

router.get('/',[validarFirebase], controller.getAllPedidoItems)
router.post('/',[validarFirebase], controller.createPedidoList)
router.delete('/:id',[validarFirebase], controller.deletePedidoItems)
router.get('/:id',[validarFirebase], controller.getPedidoById)

module.exports =router;