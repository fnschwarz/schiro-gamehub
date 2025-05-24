import { Router } from 'express';
import { redirectToTwitchAuth,
        handleTwitchAuth,
        clearUserToken,
        sendStatusOK }
from '../handlers/auth.handler';
import { catchAppError } from '../middlewares/error';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/', authenticateToken, catchAppError(sendStatusOK));
router.get('/twitch', catchAppError(redirectToTwitchAuth));
router.get('/twitch/callback', catchAppError(handleTwitchAuth));
router.get('/logout', catchAppError(clearUserToken));

export default router;
