const db = require('../database/conexion.js');

class ticketsController 
{
    constructor() 
    {}

    ingresarTicket(req, res) 
    {
        try 
        {
            const { titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaFin, notas, archivo } = req.body;
            const fechaInicio = new Date();

            db.query(
                'INSERT INTO ticket (titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas) VALUES (?,?,?,?,?,?,?)',
                [titulo, descripcion, tipoIncidencia, estadoTrabajo, fechaInicio, fechaFin, notas],
                (err, rows) => 
                {
                    if (err) 
                    {
                        console.error('Error al insertar el ticket:', err);
                        return res.status(400).json({ error: 'No se pudo insertar el ticket', detalle: err.message });
                    }

                    const idTicket = rows.insertId;

                    // Si no viene archivo, solo responder
                    if (!archivo) 
                    {
                        return res.status(201).json({ id: idTicket, msg: 'Ticket ingresado sin archivo' });
                    }

                    const { nombreArchivo, urlArchivo, tipoArchivo } = archivo;

                    db.query(
                        'INSERT INTO archivo (idTicket, nombreArchivo, urlArchivo, tipoArchivo) VALUES (?,?,?,?)',
                        [idTicket, nombreArchivo, urlArchivo, tipoArchivo],
                        (errArchivo, rowsArchivo) => 
                        {
                            if (errArchivo) 
                            {
                                console.error('Error al insertar el archivo:', errArchivo);
                                return res.status(400).json({
                                    msg: 'Ticket creado pero fallo el archivo',
                                    id: idTicket,
                                    error: errArchivo.message
                                });
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
            console.error('Error inesperado al ingresar el ticket:', err);
            res.status(500).json({ error: 'Error inesperado', detalle: err.message });
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
                    console.error('Error al mostrar los tickets:', err);
                    return res.status(400).json({ error: 'No se pudieron obtener los tickets', detalle: err.message });
                }
                res.status(200).json({ msg: 'Tickets almacenados', tickets: rows });
            });
        } 
        catch (err) 
        {
            console.error('Error inesperado al mostrar tickets:', err);
            res.status(500).json({ error: 'Error inesperado', detalle: err.message });
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
                    console.error('Error al eliminar el ticket:', err);
                    return res.status(400).json({ error: 'No se pudo eliminar el ticket', detalle: err.message });
                }
                if (rows.affectedRows === 0) 
                {
                    return res.status(404).json({ msg: 'Ticket no encontrado' });
                }
                res.status(200).json({ msg: 'Ticket eliminado correctamente' });
            });
        } 
        catch (err) 
        {
            console.error('Error inesperado al eliminar el ticket:', err);
            res.status(500).json({ error: 'Error inesperado', detalle: err.message });
        }
    }
}

module.exports = new ticketsController();
