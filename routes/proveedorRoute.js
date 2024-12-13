const express= require('express');
const router= express.Router();

const controller = require('../controllers/proveedorController');

//const {validarFirebase} = require('../middlewares/validatorFirebase.js');

router.get('/'/*,[validarFirebase]*/, controller.getAllProveedores)
router.post('/', controller.createProveedor)
router.put('/:id', controller.updateProveedor)
router.delete('/:id', controller.deleteProveedor)
router.get('/:id', controller.getProveedorById)

module.exports =router;