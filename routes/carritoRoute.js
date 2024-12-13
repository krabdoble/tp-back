const express= require('express');
const router= express.Router();

//const {validarFirebase} = require('../middlewares/validatorFirebase.js');

const controller = require('../controllers/carritoController');

router.get('/'/*,[validarFirebase]*/, controller.getAllCartItems)
router.post('/', controller.createCartList)
router.delete('/:id', controller.deleteCartItems)

module.exports =router;