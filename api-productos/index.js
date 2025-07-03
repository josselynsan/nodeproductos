const express = require('express');
const app = express();
const { db } = require('./models');
require('dotenv').config();

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/productos', require('./routes/productoRoutes'));

db.sync().then(() => {
  app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
});
