const express = require('express');
const router = express.Router();
const archivoController = require('../controllers/archivoController');

router.post('/crearArchivo', archivoController.ingresar);

router.get('/mostrarArchivos', archivoController.mostrar);

router.get('/mostrarArchivo/:id', archivoController.mostrarUno);

router.put('/actualizarArchivo/:id', archivoController.actualizar);

router.delete('/eliminarArchivo/:id', archivoController.eliminar);


module.exports = router;