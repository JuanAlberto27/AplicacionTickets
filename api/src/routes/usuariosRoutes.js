import { Router } from 'express';

import 
{
    mostrarUsuario, 
    ingresarUsuario, 
    modificarUsuario, 
    eliminarUsuario
} from '../controllers/usuarioController';

const router = Router();

router.get('/', mostrarUsuario);
router.post('/', ingresarUsuario);
router.put('/:id', modificarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;