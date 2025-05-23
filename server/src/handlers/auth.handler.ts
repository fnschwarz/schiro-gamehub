import { NODE_ENV, FRONTEND_SERVER_URL, BACKEND_SERVER_URL, TWITCH_CLIENT_ID, JWT_SECRET } from '../configs/config';
import { AppError } from '../errors/error';
import { handleError, log, sendSuccess } from '../utils/utils';
import { getAccessToken, getUserEmail, isWhitelistedUser } from '../utils/auth.utils';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export const redirectToTwitchAuth = (req: Request, res: Response) => {
    // create a session state to verify that oauth process was initiated by server
    req.session.state = randomUUID();

    const params = new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        redirect_uri: `${BACKEND_SERVER_URL}/api/auth/twitch/callback`,
        response_type: 'code',
        scope: 'user:read:email',
        state: req.session.state
    });

    const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
    res.redirect(AUTH_URL);
};

export const handleTwitchAuth = async (req: Request, res: Response) => {
    const { code, state } = req.query;

    // check if delivered state parameter exists and is the same as the session state
    if (!req.session.state || state !== req.session.state) {
        handleError('STATE_MISMATCH', 'login', undefined, req, res); return;
    }

    // check if Twitch API sent an auth code for token post request
    if (!code || typeof(code) !== 'string') {
        handleError('MISSING_AUTH_CODE', 'login', undefined, req, res); return;
    }

    // use code to get access token
    const accessToken = await getAccessToken(code);

    if (accessToken instanceof AppError) {
        handleError(accessToken.errorKey, accessToken.operation, accessToken.extra, req, res); return;
    }

    // use access token to get user data
    const email = await getUserEmail(accessToken);

    if (email instanceof AppError) {
        handleError(email.errorKey, email.operation, email.extra, req, res); return;
    }

    // check if user has whitelisted email address
    const isWhitelisted = await isWhitelistedUser(email);

    if (isWhitelisted instanceof AppError) {
        handleError(isWhitelisted.errorKey, isWhitelisted.operation, isWhitelisted.extra, req, res); return;
    }

    if (!isWhitelisted) {
        res.redirect(`${FRONTEND_SERVER_URL}/access-denied`); return;
    }

    // create a new token containing email and id of user
    const token = sign(
        { email: email },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    // save cookie in cookie storage
    res.cookie('token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production', // https when in production, http when in development
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    // delete session state to guarantee one time usage
    delete req.session.state;

    log('login', 'User logged in successfully', req);
    res.redirect(FRONTEND_SERVER_URL);
};

export const clearUserToken = (req: Request, res: Response) => {
    if (!req.cookies.token) {
        res.redirect(FRONTEND_SERVER_URL); return;
    }

    res.clearCookie('token', {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'lax'
    });

    log('logout', 'User logged out successfully', req);
    res.redirect(FRONTEND_SERVER_URL);
};

export const sendStatusOK = (req: Request, res: Response) => {
    sendSuccess(res, 200, 'OK.');
}
