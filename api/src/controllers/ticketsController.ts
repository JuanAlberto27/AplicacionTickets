import { pool } from '../database/conexion';
import { Request, Response } from 'express';
import { tickets } from '../models/ticket';
import { archivo } from '../models/archivo';

class TicketsController 
{
    constructor() {}

    ingresarTicket = async (req: Request, res: Response): Promise<void> => 
    {
        try 
        {
            const { archivo: archivoData, ...ticketData } = req.body;

            // Insertar ticket
            const [result] = await pool.promise().query('INSERT INTO ticket SET ?', [ticketData]);
            const idTicket = result.insertId;

            // Si no hay archivo, responder directamente
            if (!archivoData) 
            {
                res.status(201).json({ message: 'Ticket creado sin archivo', idTicket });
                return;
            }

            // Insertar archivo relacionado
            const newArchivo: archivo = 
            {
                ...archivoData,
                idTicket: idTicket
            };

            const [archivoResult]: any = await pool.promise().query('INSERT INTO archivo SET ?', [newArchivo]);

            res.status(201).json({
                message: 'Ticket y archivo creados',
                idTicket,
                idArchivo: archivoResult.insertId
            });

            return;

        } 
        catch (error) 
        {
            console.error('Error al ingresar el ticket o archivo: ', error);
            res.status(500).json({ message: 'Error interno al crear ticket' });
        }
    };

    mostrarTickets = async (req: Request, res: Response): Promise<void> => 
    { 
        try 
        { 
            const [rows] = await pool.promise().query('SELECT * FROM ticket');
            res.json(rows);
        }
        catch (error) 
        {
            console.error('Ha ocurrido un error al obtener los tickets: ', error);
            res.status(500).json({ message: 'Error al obtener los tickets' });
        }
    };

    modificarTicket = async (req: Request, res: Response): Promise<void> => 
    {
        try 
        {
            const { id } = req.params;
            const updatedTicket: tickets = req.body;
            await pool.promise().query('UPDATE ticket SET ? WHERE idTicket = ?', [updatedTicket, id]);
            res.json({ message: 'Ticket actualizado' });
        } 
        catch (error) 
        {
            console.error('Ha ocurrido un error al actualizar el ticket: ', error);
            res.status(500).json({ message: 'Error al actualizar el ticket' });
        }
    };
    
    deleteTicket = async (req: Request, res: Response): Promise<void> => 
    {
        try 
        {
            const { id } = req.params;
            await pool.promise().query('DELETE FROM ticket WHERE idTicket = ?', [id]);
            res.json({ message: 'Ticket eliminado' });
        } 
        catch (error) 
        {
            console.error('Ha ocurrido un error al eliminar el ticket: ', error);
            res.status(500).json({ message: 'Error al eliminar el ticket' });
        }
    };
}

export default new TicketsController();
