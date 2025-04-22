import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const redirectToTwitchAuthorization = (req: any, res: any) => {
    try {
        const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.BACKEND_SERVER_DOMAIN}/auth/twitch/callback&response_type=code&scope=user:read:email`;
        res.redirect(authUrl);
    } catch (error) {
        console.error('[ERROR] Failed to redirect to Twitch authorization:', error);
    }
};

export const handleTwitchAuthorizationCallback = async (req: any, res: any) => {
    try {
        const { code } = req.query;

        const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID || '',
                client_secret: process.env.TWITCH_CLIENT_SECRET || '',
                code: code?.toString() || '',
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.BACKEND_SERVER_DOMAIN}/auth/twitch/callback`,
            }),
        });

        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;

        const userResponse = await fetch('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID || ''
            }
        });

        const userData = await userResponse.json();
        const user = userData.data[0];

        const isAuthorizedUser = await User.findOne({ email: user.email });
        if (!isAuthorizedUser) {
            console.log(`[FAILED LOGIN] Unauthorized email: ${user.email}`);
            res.redirect(`${process.env.FRONTEND_SERVER_DOMAIN}`);
            return;
        }

        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.JWT_SECRET || '', // TODO: throw error if undefined
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        console.log(`[LOGIN] User logged in: ${user.email}`);
        res.redirect(`${process.env.FRONTEND_SERVER_DOMAIN}`);
    } catch (error) {
        console.error('[ERROR] Failed to handle Twitch authorization callback:', error);
    }
};

export const clearUserToken = (req: any, res: any) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.log('[FAILED LOGOUT] No token found in cookies');
            return res.status(404).send('Not Found');
        }

        res.clearCookie('token');

        console.log('[LOGOUT] User logged out successfully');
        res.redirect(`${process.env.FRONTEND_SERVER_DOMAIN}`);
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to clear user token:', error);
    }
};

export const sendStatusOK = (req: any, res: any) => {
    res.status(200).send('OK');
}