const { dbConnection } = require("../config/dbConnection")
const { DataTypes } = require("sequelize")
const Producto = require('./productoModel');
const Cliente = require('./usuarioModel');

const Pedido = dbConnection.define("Pedido", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    talle: { type: DataTypes.STRING, allowNull: false },
    precio_unidad: { type: DataTypes.FLOAT, allowNull: false },
    precio_cantidad: { type: DataTypes.FLOAT, allowNull: false },
    suma_total: { type: DataTypes.FLOAT, allowNull: false },
    fecha_entrega: { type: DataTypes.DATE, allowNull: false },
    productoId: { type: DataTypes.INTEGER,  references: { model: Producto, key: 'id' }},
});

Pedido.belongsTo(Producto, { foreignKey: 'productoId' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });
Producto.hasMany(Pedido, { foreignKey: 'productoId' });
Cliente.hasMany(Pedido, { foreignKey: 'clienteId' });

Pedido.sync({alter: true})
  .then(() => {
    console.log("Tabla Pedido creada")
  })
  .catch((error) => {
    console.log(error)
  })

 

module.exports = Pedido