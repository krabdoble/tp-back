const { dbConnection } = require("../config/dbConnection")
const { DataTypes } = require("sequelize")

const Cliente = dbConnection.define("Cliente", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    imagen: { type: DataTypes.STRING },
  
})


Cliente.sync({alter: true})
  .then(() => {
    console.log("Tabla Cliente creada")
  })
  .catch((error) => {
    console.log(error)
  })

 

module.exports = Cliente