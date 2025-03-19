const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/crearUsuario', usuarioController.ingresar);

module.exports = router;