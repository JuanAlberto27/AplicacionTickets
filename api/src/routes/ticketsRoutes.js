const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

router.post('/crearTicket', ticketsController.ingresarTicket);

router.get('/mostrarTickets', ticketsController.mostrarTickets);

<<<<<<< HEAD
router.delete('/eliminarTickets', ticketsController.eliminarTickets);

=======
>>>>>>> c6a34937eab0e0f34639a8d04a454db95fc39629
module.exports = router;
