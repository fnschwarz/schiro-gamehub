import { Router } from 'express';
import { getAllGameIds,
        getGame, 
        addAppToDatabase,
        removeAppFromDatabase }
from '../handlers/games.handler';
import { authenticate } from '../middlewares/auth';

const router = Router();


router.get('/api/apps', getAllGameIds);
router.get('/api/apps/:id', getGame);
router.post('/api/apps/add', authenticate, addAppToDatabase);
router.post('/api/apps/remove', authenticate, removeAppFromDatabase);

export default router;