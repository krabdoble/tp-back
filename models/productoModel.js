const { dbConnection } = require("../config/dbConnection")
const { DataTypes } = require("sequelize")
const Proveedor = require('./proveedorModel');

const Producto = dbConnection.define("Producto", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    nombre_comercial: { type: DataTypes.STRING, allowNull: false },
    talle: { type: DataTypes.STRING, allowNull: false },
    precio_venta: { type: DataTypes.FLOAT, allowNull: false },
    proveedor: { type: DataTypes.STRING, allowNull: false },
    precio_compra: { type: DataTypes.FLOAT, allowNull: false },
    imagen: { type: DataTypes.STRING },
    
});

Producto.belongsTo(Proveedor, { foreignKey: 'proveedor' });
Proveedor.hasMany(Producto, { foreignKey: 'proveedor' });

Producto.sync({alter: true})
  .then(() => {
    console.log("Tabla Producto creada")
  })
  .catch((error) => {
    console.log(error)
  })

 

module.exports = Producto