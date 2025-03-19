const mysql = require ('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'aplicaciontickets'
    }
);

db.connect((err) => 
{
    if(err)
    {
        throw err;
    }
    console.log('Base de datos conectada')
});

module.exports = db;