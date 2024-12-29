const express= require('express');
const router= express.Router();
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/productoController');

const {validarFirebase} = require('../middlewares/validatorFirebase.js');




const dikstorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
   
    filename: (req, file, cb) => {
        cb(null, Date.now() + 'productoPat' + file.originalname); 
    }
});

const fileUpload = multer({ storage: dikstorage }).single('imagen');

router.get('/',[validarFirebase], controller.getAllProductos)
router.post('/',[validarFirebase], fileUpload, controller.createProducto)
router.put('/:id',[validarFirebase],fileUpload, controller.updateProducto)
router.delete('/:id',[validarFirebase], controller.deleteProducto)
router.get('/:id',[validarFirebase], controller.getProductoById)

module.exports =router;