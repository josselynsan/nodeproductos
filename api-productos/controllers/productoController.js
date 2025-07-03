const { Producto, db } = require('../models');
const logger = require('../utils/logger');

class ProductoController {
  async getAll(req, res, next) {
    try {
      const productos = await Producto.findAll();
      return res.status(200).json(productos);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req, res, next) {
    try {
      const producto = await Producto.findByPk(req.params.id);
      if (!producto) {
            logger.info(`Producto ${req.params.id} no encontrado`);
            await t.rollback();  // no hay nada que confirmar
            return res.status(404).json({ msg: 'Producto no encontrado' });
      }
      return res.status(200).json(producto);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    const t = await db.transaction();
    try {
      const producto = await Producto.create(req.body, { transaction: t });
      await t.commit();

      logger.info(`Producto creado: ${JSON.stringify(producto.toJSON())}`);
      res.status(201).json(producto);
    } catch (err) {
      if (!t.finished) await t.rollback();
      next(err);
    }
  }

  async update(req, res, next) {
    const t = await db.transaction();
    try {
      const [updated] = await Producto.update(req.body, {
        where: { id: req.params.id },
        transaction: t
      });

      if (updated === 0) {

            logger.info(`Producto ${req.params.id} no encontrado`);
            await t.rollback();  // no hay nada que confirmar
            return res.status(404).json({ msg: 'Producto no encontrado' });

      }

      await t.commit();
      logger.info(`Producto ${req.params.id} actualizado`);
      return res.status(200).json({ msg: 'Producto actualizado' });
    } catch (err) {
      if (!t.finished) await t.rollback();
      next(err);
    }
  }

  async delete(req, res, next) {
    const t = await db.transaction();
    try {
      const deleted = await Producto.destroy({
        where: { id: req.params.id },
        transaction: t
      });

      if (deleted === 0) {
            logger.info(`Producto ${req.params.id} no encontrado`);
            await t.rollback();  // no hay nada que confirmar
            return res.status(404).json({ msg: 'Producto no encontrado' });
      }

      await t.commit();
      logger.info(`Producto ${req.params.id} eliminado`);
      return res.status(200).json({ msg: 'Producto eliminado' });
    } catch (err) {
      if (!t.finished) await t.rollback();
      next(err);
    }
  }
}

module.exports = new ProductoController();
