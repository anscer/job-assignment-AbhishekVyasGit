import { Router } from 'express';
import { createState, getStates, updateState, deleteState } from '../controllers/stateController';
import { isAuthenticated } from '../middlewares/auth'; 

const router = Router();

router.post('/', isAuthenticated, createState);
router.get('/', getStates);
router.patch('/:id', isAuthenticated, updateState);
router.delete('/:id', isAuthenticated, deleteState);

export default router;
