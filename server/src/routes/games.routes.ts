import { Router } from 'express';
import { getGames,
        getGame, 
        addGameToDatabase,
        removeGameFromDatabase }
from '../handlers/games.handler';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/', getGames);
router.get('/:id', getGame);
router.post('/add', authenticateToken, addGameToDatabase);
router.post('/remove', authenticateToken, removeGameFromDatabase);

export default router;