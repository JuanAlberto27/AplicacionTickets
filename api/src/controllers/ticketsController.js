const { err } = require('console');
const db = require('../database/conexion.js');

class ticketsController 
{
    constructor() {}

    ingresarTicket(req, res) 
    {
        try
        {
<<<<<<< HEAD
            const { titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaFin, notas } = req.body;
            const fechaInicio = new Date(); 

            db.query('INSERT INTO ticket (titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas) VALUES (?,?,?,?,?,?,?)',
                [titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas],
=======
            const { idTicket, titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas } = req.body;
            db.query(
                'INSERT INTO ticket (idTicket, titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas) VALUES (?,?,?,?,?,?,?,?)',
                [idTicket, titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas],
>>>>>>> 0b397f5c697988140265c499d262e5b02626c1a9
                (err, rows) => 
                {
                    if (err) 
                    {
                        return res.status(400).send(err);
                    }
                    else
                    {
                        res.status(201).json({ id: rows.insertId, msg: 'Ticket ingresado' });
                    }                    
                }
            );     
        }
        catch (err) 
        {
            res.status(500).json(err.message);            
        }
    }


    mostrarTickets(req, res) 
    {
        try 
        {
            db.query('SELECT * FROM ticket ORDER BY fechaInicio DESC', (err, rows) => 
            {
                if (err) 
                {
                    return res.status(400).json({ error: err.message });
                }
                else
                {
                    res.status(200).json({ msg: 'Tickets almacenados', tickets: rows });
                }               
            });
        }
        catch (err) 
        {
            res.status(500).json({ error: err.message });
        }
    }

    eliminarTickets(req, res) 
    {
        try 
        {
            const { idTicket } = req.body;
    
            db.query('DELETE FROM ticket WHERE idTicket = ?', [idTicket], (err, rows) => 
            {
                if (err) 
                {
                    return res.status(400).json({ error: err.message });
                }
                else if (rows.affectedRows === 0)
                {
                    return res.status(404).json({ msg: 'Ticket no encontrado' });
                }
                else
                {
                    res.status(200).json({ msg: 'Ticket eliminado' });
                }
            });
        } 
        catch (err)
        {
            res.status(500).json({ error: err.message });
        }
    }    
}

module.exports = new ticketsController();