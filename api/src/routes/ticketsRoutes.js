const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

router.post('/crearTicket', ticketsController.ingresarTicket);

router.get('/mostrarTickets', ticketsController.mostrarTickets);

// Ruta para insertar un ticket de prueba
router.post('/insertarPrueba', (req, res) =>
{
    const ticketPrueba = 
    {
        titulo: 'Ticket de prueba',
        descripcion: 'Ticket de prueba para verificar que el sistema funciona.',
        tipoIncidencia: 'Incidencia de software',
        estadoTrabajo: 'Bugs',
        fechaFin: '2025-03-22',
        notas: 'Sin notas adicionales'
    };
    ticketsController.ingresarTicket({ body: ticketPrueba }, res);
});

module.exports = router;
