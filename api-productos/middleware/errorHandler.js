const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(`${err.message}\n${err.stack}`);
  res.status(err.status || 500).json({ error: err.message });
};
