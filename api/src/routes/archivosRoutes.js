const express = require('express');
const router = express.Router();
const archivoController = require('../controllers/archivoController');

router.post('/crearArchivo', archivoController.ingresar);

module.exports = router;