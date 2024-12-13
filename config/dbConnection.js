const { Sequelize } = require('sequelize');
require('dotenv').config();


const dbConnection = new Sequelize(process.env.MYSQL_URL, {
    dialect: "mysql",
    logging: false,
});




module.exports = {dbConnection}
