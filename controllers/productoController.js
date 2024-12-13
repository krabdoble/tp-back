const Producto = require("../models/productoModel")
const Proveedor = require("../models/proveedorModel")
const { response } = require("express")


const getAllProductos = async (req, res = response) => {
    try {
        const productos = await Producto.findAll({ include: Proveedor });
        res.json(productos);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const createProducto = async (req, res = response) => {
  const { nombre, nombre_comercial, talle, precio_venta, proveedor, precio_compra/*, proveedorId*/} = req.body;
  const imagen = req.file ? `../uploads/${req.file.filename}` : null;

    try {

      const producto = await Producto.create({ nombre, nombre_comercial, talle, precio_venta, proveedor, precio_compra, imagen/*, proveedorId */});
      res.status(201).json(producto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

}

const getProductoById = async (req, res = response) => {
    try {
        const producto = await Producto.findByPk(req.params.id,{ include: Proveedor });
        producto ? res.json(producto) : res.status(404).json({ error: 'Producto no encontrado' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const updateProducto = async (req, res = response) => {
  const {nombre, nombre_comercial, talle, precio_venta, proveedor, precio_compra } = req.body;
  const imagen = req.file ? `../uploads/${req.file.filename}` : null;
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
        producto.nombre = nombre;
        producto.nombre_comercial = nombre_comercial;
        producto.talle = talle;
        producto.precio_venta = precio_venta;
        producto.proveedor = proveedor;
        producto.precio_compra = precio_compra;
        producto.imagen = imagen;
        await producto.save();
        res.json(producto);
    } else res.status(404).json({ error: 'Producto no encontrado' });
} catch (error) {
    res.status(500).json({ error: 'Error actualizando producto' });
}
  
}

const deleteProducto = async (req, res = response) => {
    try {
      const deleted = await Producto.destroy({ where: { id: req.params.id } });
        deleted ? res.status(204).send() : res.status(404).json({ error: 'Producto no encontrado' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {
    getAllProductos,
    createProducto,
    getProductoById,
    updateProducto, 
    deleteProducto
}