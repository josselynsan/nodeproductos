const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({ nombre, email, password: hash });
  res.json(usuario);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) return res.status(400).json({ msg: 'Usuario no existe' });
  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) return res.status(400).json({ msg: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
