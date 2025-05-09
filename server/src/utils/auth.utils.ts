import { BACKEND_SERVER_URL, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '../configs/config';
import { logError } from './utils';
import { User } from '../models/user.model';

export const getAccessToken = async (code: string): Promise<string | undefined> => {
    const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token`, {
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
        logError('Failed to fetch token data from Twitch API', undefined, error); return undefined;
    });

    if (!tokenResponse) {
        logError(`Invalid token data response from Twitch API. Type was '${typeof(tokenResponse)}'`); return undefined;
    }

    if (!tokenResponse.ok) {
        logError(`Received error response '${tokenResponse.status}: ${tokenResponse.statusText}' from Twitch API when trying to fetch token data`); return undefined;
    }

    const responseData = await tokenResponse.json();

    // check if there is a access token in response data and if it has proper type
    if (!responseData || typeof(responseData.access_token) !== 'string') {
        logError('Invalid response structure or missing access token when trying to get access token from Twitch API'); return undefined;
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
        logError('Failed to fetch user data from Twitch API', undefined, error); return undefined;
    });

    // check for errors in fetch response
    if (!userResponse) {
        logError(`Invalid user data response from Twitch API. Type was '${typeof(userResponse)}`); return undefined;
    }

    if (!userResponse.ok) {
        logError(`Received error response '${userResponse.status}: ${userResponse.statusText}' from Twitch API when trying to fetch user data`); return undefined;
    }

    const userData = await userResponse.json();

    // check if userData has expected structure
    if (!userData || !Array.isArray(userData.data) || userData.data.length === 0) {
        logError('Invalid response structure when trying to get user data from Twitch API'); return undefined;
    }

    return userData.data[0];
}

export const isWhitelistedUser = async (email: string): Promise<boolean> => {
    const user = await User.findOne({ email: email }).catch((error) => {
        logError('Database could not be accessed', undefined, error); return undefined;
    });

    if (user) {
        return true;
    }

    return false;
}
