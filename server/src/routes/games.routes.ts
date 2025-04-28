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
router.post('/', authenticateToken, addGameToDatabase);
router.delete('/', authenticateToken, removeGameFromDatabase);

export default router;