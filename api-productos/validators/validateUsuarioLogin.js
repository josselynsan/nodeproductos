const { body, validationResult } = require('express-validator');

exports.validateUsuarioLogin = [
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email no tiene un formato válido'),    

  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),


  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
