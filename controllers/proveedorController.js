const Proveedor = require("../models/proveedorModel")
const { response } = require("express")


const getAllProveedores = async (req, res = response) => {
    try {
        const proveedor = await Proveedor.findAll()
        res.json(proveedor)
    } catch (error) {
        console.log(error)
    }
}

const createProveedor = async (req, res = response) => {

    try {
        const proveedor = new  Proveedor(req.body)
        await proveedor.save()
        res.json(proveedor)
    } catch(error) {
        console.log(error)
    }

}

const getProveedorById = async (req, res = response) => {
    try {
        const proveedor = await Proveedor.findByPk(req.params.id);
        proveedor ? res.json(proveedor) : res.status(404).json({ error: 'Proveedor no encontrado' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const updateProveedor = async (req, res = response) => {
    try {
        const { id } = req.params
        const proveedor = await Proveedor.findByPk(id)
        proveedor.nombre = req.body.nombre
        proveedor.cuit = req.body.cuit
        await proveedor.save()
        res.json(proveedor)
    } catch (error) {
        console.log(error)
    }
}

const deleteProveedor = async (req, res = response) => {
    try {
        const { id } = req.params
        const proveedor = await Proveedor.findByPk(id)
        await proveedor.destroy()
        res.json({msg: "Proveedor eliminado"})
    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    getAllProveedores,
    createProveedor,
    updateProveedor,
    getProveedorById,
    deleteProveedor
}