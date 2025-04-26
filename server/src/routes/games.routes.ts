import { Router } from 'express';
import { getGames,
        getGame, 
        addGameToDatabase,
        removeGameFromDatabase }
from '../handlers/games.handler';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/api/games', getGames);
router.get('/api/games/:id', getGame);
router.post('/api/apps/add', authenticate, addGameToDatabase);
router.post('/api/apps/remove', authenticate, removeGameFromDatabase);

export default router;