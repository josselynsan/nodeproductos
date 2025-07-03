const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`)
  ),
    transports: [
        new transports.File({ filename: path.join(__dirname, '../logs/info.log'), level: 'info' }),
        new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
        new transports.Console()
    ]
});

module.exports = logger;
