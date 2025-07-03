const express = require('express');
const app = express();
const productoRoutes = require('./routes/productoRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/productos', productoRoutes);

// manejo global de errores
app.use(errorHandler);

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
