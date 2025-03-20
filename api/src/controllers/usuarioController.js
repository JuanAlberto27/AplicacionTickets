const { err } = require('console');
const db = require('../database/conexion.js');

class usuarioController 
{
    constructor() {}

    ingresarUsuario(req, res) 
    {
        try
        {
            const {nombre, apellidos, correo, tipoUsuario} = req.body;
            db.query(
                'INSERT INTO usuario (nombre, apellidos, correo, tipoUsuario) VALUES (?,?,?,?)',
                [nombre, apellidos, correo, tipoUsuario],
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

    mostrarUsuario(req, res) 
    {
        try 
        {
            db.query('SELECT * FROM usuario', (err, rows) => 
            {
                if (err) 
                {
                    return res.status(400).json({ error: err.message });
                }
                res.status(200).json({msg: 'Usuarios almacenados', tickets: rows });
            });
        }
        catch (err) 
        {
            res.status(500).json({ error: err.message });
        }
    }

    eliminarUsuario(req, res) 
    {
        try 
        {
            const { idUsuario } = req.body;
    
            db.query('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario], (err, rows) => 
            {
                if (err) 
                {
                    return res.status(400).json({ error: err.message });
                }
                else if (rows.affectedRows === 0)
                {
                    return res.status(404).json({ msg: 'Usuario no encontrado' });
                }
                else
                {
                    res.status(200).json({ msg: 'Usuario eliminado' });
                }
            });
        } 
        catch (err)
        {
            res.status(500).json({ error: err.message });
        }
    } 
}

module.exports = new usuarioController();