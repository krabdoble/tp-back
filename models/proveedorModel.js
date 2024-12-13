const { dbConnection } = require("../config/dbConnection")
const { DataTypes } = require("sequelize")

const Proveedor = dbConnection.define("Proveedor", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    cuit: { type: DataTypes.STRING, allowNull: false },
  
})


Proveedor.sync({alter: true})
  .then(() => {
    console.log("Tabla Proveedor creada")
  })
  .catch((error) => {
    console.log(error)
  })

 

module.exports = Proveedor