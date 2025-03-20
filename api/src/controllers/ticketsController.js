const { err } = require('console');
const db = require('../database/conexion.js');

class ticketsController 
{
    constructor() {}

    ingresarTicket(req, res) 
    {
        try 
        {
            const { titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaFin, notas, archivo } = req.body;
            const fechaInicio = new Date();

            // 1. Primero insertar el ticket
            db.query(
                'INSERT INTO ticket (titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas) VALUES (?,?,?,?,?,?,?)',
                [titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas],
                (err, rows) => 
                {
                    if (err)
                    {
                        return res.status(400).send(err);
                    }

                    const idTicket = rows.insertId;

                    // 2. Si no viene archivo, solo responder
                    if (!archivo) 
                    {
                        return res.status(201).json({ id: idTicket, msg: 'Ticket ingresado sin archivo' });
                    }

                    // 3. Si viene archivo, guardarlo
                    const { nombreArchivo, urlArchivo, tipoArchivo } = archivo;

                    db.query(
                        'INSERT INTO archivo (idTicket, nombreArchivo, urlArchivo, tipoArchivo) VALUES (?,?,?,?)',
                        [idTicket, nombreArchivo, urlArchivo, tipoArchivo],
                        (errArchivo, rowsArchivo) => 
                        {
                            if (errArchivo) 
                            {
                                return res.status(400).json({ msg: 'Ticket creado pero fallo el archivo', id: idTicket, error: errArchivo.message });
                            }

                            res.status(201).json({
                                id: idTicket,
                                archivoId: rowsArchivo.insertId,
                                msg: 'Ticket y archivo ingresados correctamente'
                            });
                        }
                    );
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