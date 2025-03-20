import { Router } from 'express';

import 
{ 
    mostrarTicket, 
    ingresarTicket, 
    modificarTicket, 
    eliminarTicket 
} from '../controllers/ticketsController';

const router = Router();

router.get('/', mostrarTicket);
router.post('/', ingresarTicket);
router.put('/:id', modificarTicket);
router.delete('/:id', eliminarTicket);

export default router;