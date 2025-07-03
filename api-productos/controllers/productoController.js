const { Producto } = require('../models');

exports.getAll = async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
};

exports.getOne = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  res.json(producto);
};

exports.create = async (req, res) => {
  const producto = await Producto.create(req.body);
  res.json(producto);
};

exports.update = async (req, res) => {
  await Producto.update(req.body, { where: { id: req.params.id } });
  res.json({ msg: 'Producto actualizado' });
};

exports.delete = async (req, res) => {
  await Producto.destroy({ where: { id: req.params.id } });
  res.json({ msg: 'Producto eliminado' });
};
