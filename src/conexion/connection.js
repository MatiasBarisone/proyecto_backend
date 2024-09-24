// Cargar dotenv para gestionar variables de entorno
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Cargar variables de entorno desde el archivo .env
const { DBUSER, PASSWORD, HOST, DATABASE } = process.env;

// Crear una nueva instancia de Sequelize con las variables de entorno
const sequelize = new Sequelize(DATABASE, DBUSER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
});

// Exportar la instancia de Sequelize
module.exports = { sequelize };
