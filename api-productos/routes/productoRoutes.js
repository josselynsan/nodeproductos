const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateProducto } = require('../validators/validateProducto');

router.get('/', authMiddleware, productoController.getAll);
router.get('/:id', authMiddleware, productoController.getOne);
router.post('/', authMiddleware, validateProducto, productoController.create);
router.put('/:id', authMiddleware, productoController.update);
router.delete('/:id', authMiddleware, productoController.delete);

module.exports = router;
