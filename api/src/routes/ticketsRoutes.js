const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

router.post('/crearTicket', ticketsController.ingresar);

module.exports = router;
