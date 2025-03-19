const { error } = require('console');
const db = require('../database/conexion.js');

class TicketsController 
{
    constructor() {}

    ingresar(req,res)
    {
        try 
        {
            db.query('INSERT INTO tickets (idTicket, asunto, titulo, descripcion,tipoIncidencia,estadoTrabajo,fechaInicio,fechaFin,notas)VALUES(?,?,?,?,?,?,?,?,?);',

                [idTicket, asunto, titulo, descripcion,tipoIncidencia,estadoTrabajo,fechaInicio,fechaFin,notas],(err, rows) => 
                {
                    if (error) 
                    {
                        res.status(400).send(error)
                    } 
                    else 
                    {
                        res.status(201).json(rows);
                    }
                });
        } 
        catch (error) 
        {
            res.status(500).send(error);            
        }
        res.json({ msg: 'Ingresa tickets desde clase' });
    }

}