import { Router } from 'express';
import { redirectToTwitchAuthorization, 
        handleTwitchAuthorizationCallback, 
        clearUserToken, 
        sendStatusOK } 
from '../handlers/auth.handler';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/login', redirectToTwitchAuthorization);
router.get('/auth/twitch/callback', handleTwitchAuthorizationCallback);
router.get('/api/authenticate', authenticate, sendStatusOK);
router.get('/logout', clearUserToken);

export default router;