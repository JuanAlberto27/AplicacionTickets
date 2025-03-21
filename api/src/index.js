import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import ticketsRoutes from './routes/ticketsRoutes';
import archivosRoutes from './routes/archivosRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import path from 'path';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tickets', ticketsRoutes);
app.use('/archivos', archivosRoutes);
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => 
{
    res.json({ message: 'Bienvenido a la API de Tickets',
                endpoints: [{tickets:
                {
                    base: '/tickets',
                    oparations:[
                        {method: 'POST', path: '/ingresarTicket', description: 'Crea un ticket'},
                        {method: 'GET', path: '/mostrarTicket', description: 'Muestra todos los tickets'},
                        {method: 'PUT', path: '/modificarTicket/:id', description: 'Actualiza un ticket por su id'},
                        {method: 'DELETE', path: '/eliminarTicket/:id', description: 'Elimina un ticket por su id'}
                    ]
                },
                usuario:
                {
                    base: '/usuarios',
                    oparations:[
                        {method: 'POST', path: '/ingresarUsuario', description: 'Crea un usuario'},
                        {method: 'GET', path: '/mostrarUsuarios', description: 'Muestra todos los usuarios'},
                        {method: 'PUT', path: '/modificarUsuario/:id', description: 'Actualiza un usuario por su id'},
                        {method: 'DELETE', path: '/eliminarUsuario/:id', description: 'Elimina un usuario por su id'}
                    ]
                },
            }
        ]
    })
});

app.use((req , res , next) => 
{
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;

