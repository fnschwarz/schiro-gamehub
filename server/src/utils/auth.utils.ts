import { BACKEND_SERVER_URL, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '../configs/config';
import { handleError } from './utils';
import { User } from '../models/user.model';

export const getAccessToken = async (code: string): Promise<string | undefined> => {
    const tokenResponse = await fetch(`https://id.titch.tv/oauth2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: TWITCH_CLIENT_ID,
            client_secret: TWITCH_CLIENT_SECRET,
            code: code.toString(),
            grant_type: 'authorization_code',
            redirect_uri: `${BACKEND_SERVER_URL}/api/auth/twitch/callback`
        }),
    }).catch( (error) => {
        handleError('NETWORK_ERROR', 'get_access_token', error); return undefined;
    });

    if (!tokenResponse || !tokenResponse.ok) {
        handleError('UPSTREAM_SERVICE_ERROR', 'get_access_token'); return undefined;
    }

    const responseData = await tokenResponse.json();

    // check if there is a access token in response data and if it has proper type
    if (!responseData || typeof(responseData.access_token) !== 'string') {
        handleError('INVALID_RESPONSE_FORMAT', 'get_access_token'); return undefined;
    }

    return responseData.access_token;
}

export const getUserData = async (accessToken: string) => {
    const userResponse = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': TWITCH_CLIENT_ID
        }
    }).catch( (error) => {
        handleError('NETWORK_ERROR', 'get_twitch_user', error); return undefined;
    });

    // check for errors in fetch response
    if (!userResponse || !userResponse.ok) {
        handleError('UPSTREAM_SERVICE_ERROR', 'get_twitch_user'); return undefined;
    }

    const userData = await userResponse.json();

    // check if userData has expected structure
    if (!userData || !Array.isArray(userData.data) || userData.data.length === 0) {
        handleError('INVALID_RESPONSE_FORMAT', 'get_twitch_user'); return undefined;
    }

    return userData.data[0];
}

export const isWhitelistedUser = async (email: string): Promise<boolean> => {
    const user = await User.findOne({ email: email }).catch((error) => {
        handleError('DATABASE_CONNECTION_ERROR', 'check_user_whitelist', error); return undefined;
    });

    if (user) {
        return true;
    }

    return false;
}
