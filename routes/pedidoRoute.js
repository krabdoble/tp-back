const express= require('express');
const router= express.Router();

const controller = require('../controllers/pedidoController');

//const {validarFirebase} = require('../middlewares/validatorFirebase.js');

router.get('/'/*,[validarFirebase]*/, controller.getAllPedidoItems)
router.post('/', controller.createPedidoList)
router.delete('/:id', controller.deletePedidoItems)
router.get('/:id', controller.getPedidoById)

module.exports =router;