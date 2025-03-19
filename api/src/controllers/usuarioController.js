const { err } = require('console');
const db = require('../database/conexion.js');

class usuarioController 
{
    constructor() {}

    ingresar(req, res) 
    {
        try
        {
            const { idUsuario, nombre, apellidos, correo, tipoUsuario } = req.body;
            db.query(
                'INSERT INTO usuario (idUsuario, nombre, apellidos, correo, tipoUsuario) VALUES (null,?,?,?,?)',
                [idUsuario, nombre, apellidos, correo, tipoUsuario],
                (err, rows) => 
                {
                    if (err) 
                    {
                        return res.status(400).send(err);
                    }
                    res.status(201).json({ id: rows.insertId, msg: 'usuario ingresado' });
                }
            );     
        }
        catch (err) 
        {
            res.status(500).send(err);            
        }
    }
}

module.exports = new usuarioController();