import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { log, logError } from '../utils/utils';
import { User } from '../models/user.model';

export const redirectToTwitchAuth = (req: Request, res: Response) => {
    const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
    const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL;

    if (!TWITCH_CLIENT_ID || !BACKEND_SERVER_URL) {
        logError('Authorization redirect failed: environment variable(s) not defined');
        res.status(500).json({ status: 500, message: 'Internal Server Error: missing server configuration.' }); return;
    }

    const params = new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        redirect_uri: `${BACKEND_SERVER_URL}/auth/twitch/callback`,
        response_type: 'code',
        scope: 'user:read:email'
    });

    const AUTH_URL = `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
    res.redirect(AUTH_URL);
};

export const handleTwitchAuth = async (req: Request, res: Response) => {
    const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
    const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
    const FRONTEND_SERVER_URL = process.env.FRONTEND_SERVER_URL;
    const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL;
    const JWT_SECRET = process.env.JWT_SECRET;
    const NODE_ENV = process.env.NODE_ENV;

    // check if env variables are defined
    if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET || !FRONTEND_SERVER_URL || !BACKEND_SERVER_URL || !JWT_SECRET || !NODE_ENV) {
        logError('Token creation failed: environment variable(s) not defined');
        res.status(500).json({ status: 500, message: 'Internal Server Error: missing server configuration.' }); return;
    }

    const { code } = req.query;

    // check if Twitch API sent an auth code for token post request
    if (!code) {
        logError('Token creation failed: missing authorization code');
        res.status(400).json({ status: 400, message: 'Missing authorization code.' }); return;
    }

    // use code to get access token
    const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: TWITCH_CLIENT_ID,
            client_secret: TWITCH_CLIENT_SECRET,
            code: code.toString(),
            grant_type: 'authorization_code',
            redirect_uri: `${BACKEND_SERVER_URL}/auth/twitch/callback`
        }),
    }).catch( (error) => {
        logError('Token creation failed: error during Twitch token fetch', error);
        return undefined;
    });

    // check for errors in fetch response
    if (!tokenResponse) {
        res.status(500).json({ status: 500, message: 'Internal Server Error: failed to fetch Twitch token.' }); return;
    }

    if (!tokenResponse.ok) {
        logError(`Token creation failed: received error response status '${tokenResponse.status}: ${tokenResponse.statusText}' when trying to fetch token`);
        res.status(502).json({ status: 502, message: 'Failed to fetch Twitch token.' }); return;
    }
    
    const responseData = await tokenResponse.json();

    // check if there is a access token in response data and if it has proper type
    if (!responseData || typeof(responseData.access_token) !== 'string') {
        logError('Token creation failed: invalid response structure or missing access token');
        res.status(500).json({ status: 500, message: 'Internal Server Error: invalid token response.' }); return;
    }

    const { access_token } = responseData;

    // use access token to receive twitch user details (id, email)
    const userResponse = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Client-Id': TWITCH_CLIENT_ID
        }
    }).catch( (error) => {
        logError('Token creation failed: error fetching user details from Twitch using access token', error);
        return undefined;
    });

    // check for errors in fetch response
    if (!userResponse) {
        res.status(500).json({ status: 500, message: 'Internal Server Error: failed to fetch Twitch user.' }); return;
    }

    if (!userResponse.ok) {
        logError(`Token creation failed: received error response status '${userResponse.status}: ${userResponse.statusText}' when trying to fetch user details`);
        res.status(502).json({ status: 502, message: 'Failed to fetch Twitch user.' }); return;
    }

    const userData = await userResponse.json();

    // check if userData has expected structure
    if (!userData || !Array.isArray(userData.data) || userData.data.length === 0) {
        logError('Token creation failed: invalid response structure or missing user data');
        res.status(500).json({ status: 500, message: 'Internal Server Error: invalid user response.' }); return;
    }

    const user = userData.data[0];

    // check if user is whitelisted
    const isAuthorizedUser = await User.findOne({ email: user.email }).catch((error) => { 
        logError('Token creation failed: database cannot be accessed', error);
        return undefined;
    });

    if(isAuthorizedUser === undefined){
        res.status(500).json({ status: 500, message: 'Internal Server Error: database could not be accessed.' }); return;
    }

    if (isAuthorizedUser === null) {
        logError('Token creation failed: unauthorized email');
        res.status(401).json({ status: 401, message: 'Unauthorized email.' }); return;
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

    log('login', 'User logged in successfully');
    res.redirect(FRONTEND_SERVER_URL);
};

export const clearUserToken = (req: Request, res: Response) => {
    const FRONTEND_SERVER_URL = process.env.FRONTEND_SERVER_URL;
    const NODE_ENV = process.env.NODE_ENV;

    if(!FRONTEND_SERVER_URL || !NODE_ENV){
        logError('Clearing token failed: environment variable(s) not defined');
        res.status(500).json({ status: 500, message: 'Internal Server Error: missing server configuration.' }); return;
    }

    if (!req.cookies.token) {
        res.status(400).json({ status: 400, message: 'No token found.' }); return;
    }

    res.clearCookie('token', {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'lax'
    });

    log('logout', 'User logged out successfully');
    res.redirect(FRONTEND_SERVER_URL);
};

export const sendStatusOK = (req: Request, res: Response) => {
    res.status(200).json({ status: 200, message: 'OK.' }); return;
}