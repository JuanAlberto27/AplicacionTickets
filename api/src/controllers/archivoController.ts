import { Request, Response } from 'express';
import { archivo } from '../models/archivo';

const pool = require('../database/conexion.js');

export const getArchivos = async (req: Request, res: Response): Promise<void> => { 
    try { 
        const [rows] = await pool.query('SELECT * FROM archivo');
        return res.json(rows);
    }catch (error) {
        console.error('Ha ocurrido un error al obtener los Archivos: ',error);
        res.status(500).json({message: 'Error al obtener los archivos'});
    }
};

export const getArchivoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const [rows] = await pool.query('SELECT * FROM archivo WHERE id = ?', [id]);
        if (rows.length < 0) {
            res.status(404).json({message: 'Archivo no encontrado'});
            return;
        }
        res.json(rows[0]);
        return;
    } catch (error) {
        console.error('Ha ocurrido un error al obtener el Archivo: ',error);
        res.status(500).json({message: 'Error al obtener el archivo'});
    }
};

export const createArchivo = async (req: Request, res: Response): Promise<void> => {
    try {
        const newArchivo: archivo = req.body;
        const [result] = await pool.promise().query('INSERT INTO archivo SET ?', [newArchivo]);
        res.status(201).json({message: 'Archivo creado', id: result.insertId});
        return;
    } catch (error) {
        console.error('Ha ocurrido un error al crear el Archivo: ',error);
        res.status(500).json({message: 'Error al crear el archivo'});
    }
};

export const updateArchivo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        const updatedArchivo: archivo = req.body;
        await pool.query('UPDATE archivo SET ? WHERE id = ?', [updatedArchivo, id]);
        res.json({message: 'Archivo actualizado'});
        return;
    } catch (error) {
        console.error('Ha ocurrido un error al actualizar el Archivo: ',error);
        res.status(500).json({message: 'Error al actualizar el archivo'});
    }
};

export const deleteArchivo = async (req: Request, res: Response): Promise<void> => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM archivo WHERE id = ?', [id]);
        res.json({message: 'Archivo eliminado'});
        return;
    } catch (error) {
        console.error('Ha ocurrido un error al eliminar el Archivo: ',error);
        res.status(500).json({message: 'Error al eliminar el archivo'});
    }
};