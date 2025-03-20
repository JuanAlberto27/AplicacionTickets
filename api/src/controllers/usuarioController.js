const db = require('../database/conexion.js');

class usuarioController 
{
    constructor() 
    {}

    ingresarUsuario(req, res) 
    {
        try
        {
            const { nombre, apellidos, correo, tipoUsuario } = req.body;

            db.query(
                'INSERT INTO usuario (nombre, apellidos, correo, tipoUsuario) VALUES (?,?,?,?)',
                [nombre, apellidos, correo, tipoUsuario],
                (err, rows) => 
                {
                    if (err) 
                    {
                        console.error('Error al insertar el usuario:', err); // Log del error en consola
                        return res.status(400).json({ error: 'No se pudo insertar el usuario', detalle: err.message });
                    }
                    res.status(201).json({ id: rows.insertId, msg: 'Usuario ingresado correctamente' });
                }
            );
        } 
        catch (err) 
        {
            console.error('Error inesperado al ingresar el usuario:', err);
            res.status(500).json({ error: 'Error inesperado', detalle: err.message });
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
                    console.error('Error al mostrar los usuarios:', err);
                    return res.status(400).json({ error: 'No se pudieron obtener los usuarios', detalle: err.message });
                }
                res.status(200).json({ msg: 'Usuarios almacenados', usuarios: rows });
            });
        } 
        catch (err) 
        {
            console.error('Error inesperado al mostrar usuarios:', err);
            res.status(500).json({ error: 'Error inesperado', detalle: err.message });
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
                    console.error('Error al eliminar el usuario:', err);
                    return res.status(400).json({ error: 'No se pudo eliminar el usuario', detalle: err.message });
                }
                if (rows.affectedRows === 0) 
                {
                    return res.status(404).json({ msg: 'Usuario no encontrado' });
                }
                res.status(200).json({ msg: 'Usuario eliminado correctamente' });
            });
        } 
        catch (err) 
        {
            console.error('Error inesperado al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error inesperado', detalle: err.message });
        }
    }
}

module.exports = new usuarioController();
