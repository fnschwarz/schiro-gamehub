import { Router } from 'express';
import { redirectToTwitchAuthorization, 
        handleTwitchAuthorizationCallback, 
        clearUserToken, 
        sendStatusOK } 
from '../handlers/auth.handler';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/', authenticate, sendStatusOK);
router.get('/twitch', redirectToTwitchAuthorization);
router.get('/twitch/callback', handleTwitchAuthorizationCallback);
router.get('/logout', clearUserToken);

export default router;