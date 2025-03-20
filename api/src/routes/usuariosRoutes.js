const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/crearUsuario', usuarioController.ingresarUsuario);

router.get('/mostrarUsuario', usuarioController.mostrarUsuario);

router.delete('/eliminarUsuario', usuarioController.eliminarUsuario);

module.exports = router;