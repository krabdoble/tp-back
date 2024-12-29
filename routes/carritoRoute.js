const express= require('express');
const router= express.Router();

const {validarFirebase} = require('../middlewares/validatorFirebase.js');

const controller = require('../controllers/carritoController');

router.get('/',[validarFirebase], controller.getAllCartItems)
router.post('/',[validarFirebase], controller.createCartList)
router.delete('/:id',[validarFirebase], controller.deleteCartItems)

module.exports =router;