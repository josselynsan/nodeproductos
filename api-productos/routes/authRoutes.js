const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUsuarioRegister } = require('../validators/validateUsuarioRegister');
const { validateUsuarioLogin } = require('../validators/validateUsuarioLogin');

router.post('/register', validateUsuarioRegister, authController.register);
router.post('/login', validateUsuarioLogin, authController.login);

module.exports = router;
