import { Router } from 'express';
import { getAllGameIds,
        getGame, 
        addGameToDatabase,
        removeGameFromDatabase }
from '../handlers/games.handler';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/api/apps', getAllGameIds);
router.get('/api/apps/:id', getGame);
router.post('/api/apps/add', authenticate, addGameToDatabase);
router.post('/api/apps/remove', authenticate, removeGameFromDatabase);

export default router;