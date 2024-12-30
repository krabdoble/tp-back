const Pedido = require("../models/pedidoModel")
const Carrito = require("../models/carritoModel")
const Producto = require('../models/productoModel')
const Cliente = require("../models/usuarioModel")
const { response } = require("express")


const getAllPedidoItems = async (req, res = response) => {
    try {
        const pedido = await Pedido.findAll({ include: Producto, include: Cliente });
        res.json(pedido);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const createPedidoList = async (req, res = response) => {
    const { items, suma_total, fecha_entrega, clienteId } = req.body;
    try {
        
      const pedido = await Promise.all(items.map(item=>Pedido.create({
        cantidad: item.cantidad, talle: item.talle, precio_unidad: item.precio_unidad, precio_cantidad: item.precio_cantidad, suma_total: suma_total, fecha_entrega: fecha_entrega, productoId:item.productoId, clienteId: clienteId
      } 
    )));
      await Carrito.destroy({ where: {} }); 
      res.status(201).json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

}

const getPedidoById = async (req, res = response) => {
  try {
      const pedido = await Pedido.findByPk(req.params.id,{ include: Producto, include: Cliente });
      pedido ? res.json(pedido) : res.status(404).json({ error: 'Pedido no encontrado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const deletePedidoItems = async (req, res = response) => {
    try {
        const deleted = await Pedido.destroy({ where: { id: req.params.id } });
        deleted ? res.status(204).send() : res.status(404).json({ error: 'Pedido no encontrado' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {
    getAllPedidoItems,
    createPedidoList,
    getPedidoById,
    deletePedidoItems
}