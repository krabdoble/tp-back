const { dbConnection } = require("../config/dbConnection")
const { DataTypes } = require("sequelize")
const Producto = require('./productoModel');
const Cliente = require('./usuarioModel');

const Carrito = dbConnection.define("Carrito", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    talle: { type: DataTypes.STRING, allowNull: false },
    precio_unidad: { type: DataTypes.FLOAT, allowNull: false },
    precio_cantidad: { type: DataTypes.FLOAT, allowNull: false },
    productoId: { type: DataTypes.INTEGER, references: { model: Producto, key: 'id' }},
  });
  
  Carrito.belongsTo(Producto, { foreignKey: 'productoId' });
  Carrito.belongsTo(Cliente, { foreignKey: 'clienteId' });
  Producto.hasMany(Carrito, { foreignKey: 'productoId' });
  Cliente.hasMany(Carrito, { foreignKey: 'clienteId' });


  Carrito.sync({alter: true})
  .then(() => {
    console.log("Tabla Carrito creada")
  })
  .catch((error) => {
    console.log(error)
  })

 

module.exports = Carrito