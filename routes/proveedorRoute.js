const express= require('express');
const router= express.Router();

const controller = require('../controllers/proveedorController');

const {validarFirebase} = require('../middlewares/validatorFirebase.js');

router.get('/',[validarFirebase], controller.getAllProveedores)
router.post('/',[validarFirebase], controller.createProveedor)
router.put('/:id',[validarFirebase], controller.updateProveedor)
router.delete('/:id',[validarFirebase], controller.deleteProveedor)
router.get('/:id',[validarFirebase], controller.getProveedorById)

module.exports =router;