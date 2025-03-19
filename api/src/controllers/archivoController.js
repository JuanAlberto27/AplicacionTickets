const { err } = require('console');
const db = require('../database/conexion.js');

class archivoController 
{
    constructor() {}
    
    ingresar(req, res) 
    {
        try
        {
            const { idTicket, nombreArchivo, urlArchivo, tipoArchivo } = req.body;
            db.query(
                'INSERT INTO archivo (idTicket, nombreArchivo, urlArchivo, tipoArchivo) VALUES (?,?,?,?)',
                [idTicket, nombreArchivo, urlArchivo, tipoArchivo],
                (err, rows) => 
                {
                    if (err) 
                    {
                        return res.status(400).send(err);
                    }
                    res.status(201).json({ id: rows.insertId, msg: 'Archivo ingresado' });
                }
            );     
        }
        catch (err) 
        {
            res.status(500).json(err.message);            
        }
    }
}

module.exports = new archivoController();