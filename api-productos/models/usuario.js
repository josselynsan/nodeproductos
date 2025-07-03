const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Usuario = db.define('Usuario', {
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
});

module.exports = Usuario;
