const { Producto, db } = require('../models');
const fs = require('fs');
const path = require('path');

exports.getAll = async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
};

exports.getOne = async (req, res) => {
  try {

        const producto = await Producto.findByPk(req.params.id);
        
        if (producto === 0) {
            const log = `[${new Date().toISOString()}] Producto no encontrado: ${req.params.id}\n`;
            fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);

            await t.rollback();  // no hay nada que confirmar
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        return res.status(200).json(producto);

  } catch (error) {

        const log = `[${new Date().toISOString()}] Error al buscar el producto: ${error.message}\n${error.stack}\n`;
        fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);    

        console.error(error);
        res.status(500).json({ msg: 'Error al buscar el producto', error: error.message });
  }

};


exports.create = async (req, res) => {
  const t = await db.transaction(); // inicia la transacción

  try {
        const producto = await Producto.create(req.body, { transaction: t });

        const log = [
                    `[${new Date().toISOString()}] Se creó un producto:`,
                    JSON.stringify(producto.toJSON(), null, 2),
                    '\n'
                ].join('\n');
        fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);    

        await t.commit();
        return res.status(200).json(producto);

  } catch (error) {
        // si algo falla
        await t.rollback();
        const log = `[${new Date().toISOString()}] Error al crear producto: ${error.message}\n${error.stack}\n`;
        fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);    
        console.error(error);
        res.status(500).json({ msg: 'Error al crear producto', error: error.message });
  }
};


exports.update = async (req, res) => {
  const t = await db.transaction();

  try {
        const [updated] = await Producto.update(req.body, {
                                            where: { id: req.params.id },
                                            transaction: t
                                        });

        if (updated === 0) {
            const log = [
                `[${new Date().toISOString()}] Producto no encontrado: ${req.params.id}\n`,
                    JSON.stringify(req.body, null, 2),
                    '\n'
                ].join('\n');
            fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);    

            await t.rollback();  // no hay nada que confirmar
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        await t.commit();
            const log = [
                `[${new Date().toISOString()}] Producto actualizado: ${req.params.id}\n`,
                    JSON.stringify(req.body, null, 2),
                    '\n'
                ].join('\n');
            fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);    

            return res.status(200).json({ msg: 'Producto actualizado' });

  } catch (error) {
        if (!t.finished) await t.rollback();

        const log = `[${new Date().toISOString()}] Error al actualizar producto: ${error.message}\n${error.stack}\n`;
        fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);    

        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar', error: error.message });
  }
};


exports.delete = async (req, res) => {
  const t = await db.transaction();

  try {
        const deleted = await Producto.destroy({
                                        where: { id: req.params.id },
                                        transaction: t
                                    });

        if (deleted === 0) {
            const log = `[${new Date().toISOString()}] Producto no encontrado: ${req.params.id}\n`;
            fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);

            await t.rollback();  // no hay nada que confirmar
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        await t.commit();
            const log = `[${new Date().toISOString()}] Producto eliminado correctamente: ${req.params.id}\n`;
            fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);    
        return res.status(200).json({ msg: 'Producto eliminado correctamente' });

  } catch (error) {
        if (!t.finished) await t.rollback();

        const log = `[${new Date().toISOString()}] Error al eliminar producto: ${error.message}\n${error.stack}\n`;
        fs.appendFileSync(path.join(__dirname, '../logs/error.log'), log);    

        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar', error: error.message });
  }
};
