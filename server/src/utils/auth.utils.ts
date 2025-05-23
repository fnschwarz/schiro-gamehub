import { BACKEND_SERVER_URL, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '../configs/config';
import { AppError } from '../errors/error';
import { handleError } from './utils';
import { User } from '../models/user.model';

export const getAccessToken = async (code: string): Promise<string | AppError> => {
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
        return new AppError('NETWORK_ERROR', 'get_access_token', error);
    });

    if (tokenResponse instanceof AppError) {
        return tokenResponse;
    }

    if (!tokenResponse || !tokenResponse.ok) {
        return new AppError('UPSTREAM_SERVICE_ERROR', 'get_access_token');
    }

    const responseData = await tokenResponse.json();

    // check if there is a access token in response data and if it has proper type
    if (!responseData || typeof(responseData.access_token) !== 'string') {
        return new AppError('INVALID_RESPONSE_FORMAT', 'get_access_token');
    }

    return responseData.access_token;
}

export const getUserEmail = async (accessToken: string): Promise<string | AppError> => {
    const userResponse = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': TWITCH_CLIENT_ID
        }
    }).catch( (error) => {
        return new AppError('NETWORK_ERROR', 'get_twitch_user_email', error);
    });

    if (userResponse instanceof AppError) {
        return userResponse;
    }

    // check for errors in fetch response
    if (!userResponse || !userResponse.ok) {
        return new AppError('UPSTREAM_SERVICE_ERROR', 'get_twitch_user_email');
    }

    const userData = await userResponse.json();

    // check if userData has expected structure
    if (!userData ||
        !Array.isArray(userData.data) ||
        userData.data.length === 0 ||
        !userData.data[0].email ||
        typeof(userData.data[0].email) !== 'string'
    ) {
        return new AppError('INVALID_RESPONSE_FORMAT', 'get_twitch_user_email');
    }

    return userData.data[0].email;
}

export const isWhitelistedUser = async (email: string): Promise<boolean | AppError> => {
    const user = await User.findOne({ email: email }).catch((error) => {
        return new AppError('DATABASE_CONNECTION_ERROR', 'check_user_whitelist', error);
    });

    if (user instanceof AppError) {
        return user;
    }

    if (user) {
        return true;
    }

    return false;
}
