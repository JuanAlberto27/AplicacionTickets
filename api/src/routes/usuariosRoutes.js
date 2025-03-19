const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/crearUsuario', usuarioController.ingresarUsuario);

module.exports = router;