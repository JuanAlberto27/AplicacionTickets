import { pool } from '../database/conexion';
import { Request, Response } from 'express';
import { usuario } from '../models/usuario';

class usuarioController 
{
    constructor() 
    {}

  

    ingresarUsuario = async (req: Request, res: Response): Promise<void> => 
    {
        try 
        {
            const newUsuario: usuario = req.body;
            const [result] = await pool.promise().query('INSERT INTO usuario SET ?', [newUsuario]);
            res.status(201).json({message: 'Usuario creado', id: result.insertId});
            return;
        } 
        catch (error) 
        {
            console.error('Ha ocurrido un error al crear el usuario: ',error);
            res.status(500).json({message: 'Error al crear el usuario'});
        }
    }

    mostrarUsuario = async (req: Request, res: Response): Promise<void> => 
    { 
        try 
        { 
            const [rows] = await pool.promise().query('SELECT * FROM usuario');
            res.json(rows);
        }
        catch (error) 
        {
            console.error('Ha ocurrido un error al obtener los usuario: ', error);
            res.status(500).json({ message: 'Error al obtener los usuario' });
        }
    };

    modificarUsuario = async (req: Request, res: Response): Promise<void> => 
    {
        try 
        {
            const { id } = req.params;
            const updatedUsuario: usuario = req.body;
            await pool.promise().query('UPDATE usuario SET ? WHERE idUsuario = ?', [updatedUsuario, id]);
            res.json({ message: 'Usuario actualizado' });
        } 
        catch (error) 
        {
            console.error('Ha ocurrido un error al actualizar el usuario: ', error);
            res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
    };

    deleteUsuario = async (req: Request, res: Response): Promise<void> => 
    {
        try 
        {
            const { id } = req.params;
            await pool.promise().query('DELETE FROM usuario WHERE idUsuario = ?', [id]);
            res.json({ message: 'Usuario eliminado' });
        } 
        catch (error) 
        {
            console.error('Ha ocurrido un error al eliminar el usuario: ', error);
            res.status(500).json({ message: 'Error al eliminar el usuario' });
        }
    };
}

module.exports = new usuarioController();
