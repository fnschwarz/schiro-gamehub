import { Router } from 'express';
import { getGames,
        getGame, 
        addGameToDatabase,
        removeGameFromDatabase }
from '../handlers/games.handler';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/', getGames);
router.get('/:id', getGame);
router.post('/add', authenticate, addGameToDatabase);
router.post('/remove', authenticate, removeGameFromDatabase);

export default router;