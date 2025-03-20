const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

router.post('/crearTicket', ticketsController.ingresarTicket);

router.get('/mostrarTickets', ticketsController.mostrarTickets);

module.exports = router;
