const { Sequelize } = require('sequelize');
require('dotenv').config();


const dbConnection = new Sequelize(process.env.MYSQL_URL, {
    dialect: "mysql",
    logging: false,
});

dbConnection
  .authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));


//MYSQL_URL=mysql://root:jcdGeyqiuAimYQxwmPcejVCiwcxQUuai@mysql.railway.internal:3306/railway


//mysql://root:''@containers-us-west-xx.railway.app:3306/proyecto-final


module.exports = {dbConnection}
