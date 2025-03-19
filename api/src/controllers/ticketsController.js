const { err } = require('console');
const db = require('../database/conexion.js');

class ticketsController 
{
    constructor() {}

    ingresar(req, res) 
    {
        try
        {
            const { idTicket, asunto, titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas } = req.body;
            db.query(
                'INSERT INTO ticket (idTicket, asunto, titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas) VALUES (?,?,?,?,?,?,?,?,?)',
                [idTicket, asunto, titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas],
                (err, rows) => 
                {
                    if (err) 
                    {
                        return res.status(400).send(err);
                    }
                    res.status(201).json({ id: rows.insertId, msg: 'Ticket ingresado' });
                }
            );     
        }
        catch (err) 
        {
            res.status(500).json(err.message);            
        }
    }
}

module.exports = new ticketsController();