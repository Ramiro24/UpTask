const { Sequelize } = require('sequelize');

const db = new Sequelize('uptasknode', 'root', 'Sillon24', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306',
  operatorsAliases: false,
  define: {
      timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
});
module.exports = db;