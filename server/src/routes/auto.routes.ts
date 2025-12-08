import { Router } from 'express';
import { getAutos, getAutoById, createAuto } from '../controllers/auto.controller';

const router = Router();

router.get('/', getAutos);
router.get('/:id', getAutoById);
router.post('/', createAuto);

export default router;
