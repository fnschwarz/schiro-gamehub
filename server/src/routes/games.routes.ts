import { Router } from 'express';
import { getGames,
        getGame,
        addGameToDatabase,
        removeGameFromDatabase }
from '../handlers/games.handler';
import { catchAppError } from '../middlewares/error';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/', catchAppError(getGames));
router.get('/:id', catchAppError(getGame));
router.post('/', authenticateToken, catchAppError(addGameToDatabase));
router.delete('/', authenticateToken, catchAppError(removeGameFromDatabase));

export default router;
