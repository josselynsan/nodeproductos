const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Producto = db.define('Producto', {
  nombre: DataTypes.STRING,
  precio: DataTypes.FLOAT
});

module.exports = Producto;
