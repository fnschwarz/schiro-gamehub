import { Router } from 'express';
import { redirectToTwitchAuth, 
        handleTwitchAuth, 
        clearUserToken, 
        sendStatusOK } 
from '../handlers/auth.handler';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateToken, sendStatusOK);
router.get('/twitch', redirectToTwitchAuth);
router.get('/twitch/callback', handleTwitchAuth);
router.get('/logout', clearUserToken);

export default router;