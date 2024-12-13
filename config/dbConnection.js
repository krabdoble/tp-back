require('dotenv').config();
const { Sequelize } = require('sequelize');



const dbConnection = new Sequelize(process.env.MYSQL_URL, {
    dialect: "mysql",
    logging: false,
    pool: {
        max: 5,          // Máximo de conexiones en el pool
        min: 0,          // Mínimo de conexiones
        acquire: 30000,  // Tiempo máximo para adquirir una conexión (ms)
        idle: 10000,     // Tiempo máximo de inactividad antes de liberar una conexión
      },
      dialectOptions: {
        connectTimeout: 10000, // Tiempo de espera para conectar (ms)
      },
    
});

dbConnection
  .authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));




module.exports = {dbConnection}
