const { body, validationResult } = require('express-validator');
const { Producto } = require('../models');


exports.validateProducto = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .custom(async (value) => {
      const existe = await Producto.findOne({ where: { nombre: value } });
      if (existe) {
        throw new Error('El nombre del producto ya existe');
      }
      return true;
    }),

  body('precio')
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser un número mayor que 0'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
