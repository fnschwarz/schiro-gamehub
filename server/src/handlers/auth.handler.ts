import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { log, logError, sendSuccess, sendError } from '../utils/utils';
import { getAccessToken, getUserData, isWhitelistedUser } from '../utils/auth.utils';

export const redirectToTwitchAuth = (req: Request, res: Response) => {
    const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
    const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL;

    if (!TWITCH_CLIENT_ID || !BACKEND_SERVER_URL) {
        logError('Authorization redirect failed: environment variable(s) not defined', req);
        sendError(res, 500, 'Internal Server Error: missing server configuration.'); return;
    }

    const params = new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        redirect_uri: `${BACKEND_SERVER_URL}/api/auth/twitch/callback`,
        response_type: 'code',
        scope: 'user:read:email'
    });

    const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
    res.redirect(AUTH_URL);
};

export const handleTwitchAuth = async (req: Request, res: Response) => {
    const FRONTEND_SERVER_URL = process.env.FRONTEND_SERVER_URL;
    const JWT_SECRET = process.env.JWT_SECRET;
    const NODE_ENV = process.env.NODE_ENV;

    // check if env variables are defined
    if (!FRONTEND_SERVER_URL || !JWT_SECRET || !NODE_ENV) {
        logError('Token creation failed: environment variable(s) not defined', req);
        sendError(res, 500, 'Internal Server Error: missing server configuration.'); return;
    }

    const { code } = req.query;

    // check if Twitch API sent an auth code for token post request
    if (!code || typeof(code) !== 'string') {
        logError('Token creation failed: missing authorization code', req);
        sendError(res, 400, 'Missing authorization code.'); return;
    }

    // use code to get access token
    const accessToken = await getAccessToken(code);

    if (!accessToken) {
        sendError(res, 500, 'Internal Server Error: failed to fetch access token from Twitch API.'); return;
    }

    // use access token to get user data
    const user = await getUserData(accessToken);

    if (!user || !user.email || typeof(user.email) !== 'string' || !user.id) {
        sendError(res, 500, 'Internal Server Error: failed to fetch user from Twitch API.'); return;
    }

    // check if user has whitelisted email address
    if (!await isWhitelistedUser(user.email)) {
        sendError(res, 403, 'User not whitelisted.'); return;
    }

    // create a new token containing email and id of user
    const token = sign(
        { email: user.email, id: user.id },
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

    log('login', 'User logged in successfully', req);
    res.redirect(FRONTEND_SERVER_URL);
};

export const clearUserToken = (req: Request, res: Response) => {
    const FRONTEND_SERVER_URL = process.env.FRONTEND_SERVER_URL;
    const NODE_ENV = process.env.NODE_ENV;

    if(!FRONTEND_SERVER_URL || !NODE_ENV){
        logError('Clearing token failed: environment variable(s) not defined', req);
        sendError(res, 500, 'Internal Server Error: missing server configuration.'); return;
    }

    if (!req.cookies.token) {
        sendError(res, 400, 'No token found.'); return;
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