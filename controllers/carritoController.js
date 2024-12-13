const Carrito = require("../models/carritoModel")
const Producto = require('../models/productoModel')
const { response } = require("express")


const getAllCartItems = async (req, res = response) => {
    try {
        const carrito = await Carrito.findAll({ include: Producto });
        res.json(carrito);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const createCartList = async (req, res = response) => {
    const { cantidad, talle, precio_unidad, precio_cantidad, productoId} = req.body;
    try {

      const carrito = await Carrito.create({cantidad, talle, precio_unidad, precio_cantidad, productoId });
      res.status(201).json(carrito);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

}

const deleteCartItems = async (req, res = response) => {
    try {
        const deleted = await Carrito.destroy({ where: { id: req.params.id } });
        deleted ? res.status(204).send() : res.status(404).json({ error: 'Producto no encontrado' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {
    getAllCartItems,
    createCartList,
    deleteCartItems
}