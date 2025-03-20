const mysql = require ('mysql2');
require('dotenv').config();

// Crear la conexión a la base de datos
const pool = mysql.createPool(
    {
        host: 'localhost',
        port: 3306,
        user:  'root',
        password: 'root',  
        database: 'aplicaciontickets',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error al conectar a la base de datos', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('La conexión con la base de datos fue cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('La base de datos tiene muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('La conexión fue rechazada');
        }
        return;
    }
    console.log('Conexión a la base de datos exitosa');
    connection.release();
});



module.exports = pool;
module.exports.promise = pool.promise();