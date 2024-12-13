const { Sequelize } = require('sequelize');
require('dotenv').config();


const dbConnection = new Sequelize(process.env.MYSQL_URL,process.env.MYSQL_DATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
});




module.exports = {dbConnection}
