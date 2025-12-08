import { Router } from 'express';
import { getMaintenance, createMaintenance } from '../controllers/maintenance.controller';

const router = Router();

router.get('/', getMaintenance);
router.post('/', createMaintenance);

export default router;


