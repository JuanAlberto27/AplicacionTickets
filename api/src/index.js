const express = require('express');
const app = express();
const ticketsRoutes = require('./routes/ticketsRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const archivosRoutes = require('./routes/archivosRoutes');
app.use(express.json());

// Rutas
app.use('/tickets', ticketsRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/archivos', archivosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
