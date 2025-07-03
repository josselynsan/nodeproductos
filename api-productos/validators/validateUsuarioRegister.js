const { body, validationResult } = require('express-validator');
const { Usuario } = require('../models');


exports.validateUsuarioRegister = [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .custom(async (value) => {
      const existe = await Usuario.findOne({ where: { nombre: value } });
      if (existe) {
        throw new Error('El nombre del usuario ya existe');
      }
      return true;
    }),
  body('email')
    .isString()
    .withMessage('El email debe ser una cadena')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email no tiene un formato válido')    
    .custom(async (value) => {
      const existe = await Usuario.findOne({ where: { email: value } });
      if (existe) {
        throw new Error('El email ya existe');
      }
      return true;
    }),

  body('password')
    .isString()
    .withMessage('La contraseña debe ser una cadena')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),    


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
