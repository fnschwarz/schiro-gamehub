import { BACKEND_SERVER_URL, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '../configs/config';
import { AppError } from '../errors/error';
import { User } from '../models/user.model';

/**
 * Exchanges an authorization code for an access token using the Twitch OAuth2 API.
 *
 * @param code - Authorization code received from Twitch after user login.
 * @returns Promise that resolves to the OAuth access token string.
 */
export const getAccessToken = async (code: string): Promise<string> => {
    /**
     * Response received from Twitch OAuth2 API containing access token,
     * expiration time, refresh token, scopes and token type.
     */
    const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            /**
             * You have to register an Twitch application at
             * [Twitch Developer Console](https://dev.twitch.tv/console).
             *
             * You can find a detailed documentation about getting Twitch OAuth Access
             * Token [here](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
             */

            /**
             * Your app’s registered client ID.
             */
            client_id: TWITCH_CLIENT_ID,
            /**
             * Your app’s registered client secret.
             */
            client_secret: TWITCH_CLIENT_SECRET,
            /**
             * The code that the `/authorize` response returned in the code query parameter.
             */
            code: code.toString(),
            /**
             * Must be set to `authorization_code`.
             */
            grant_type: 'authorization_code',
            /**
             * Your app’s registered redirect URI.
             */
            redirect_uri: `${BACKEND_SERVER_URL}/api/auth/twitch/callback`
        }),
    }).catch( (error) => {
        throw new AppError('NETWORK_ERROR', 'get_access_token', error);
    });

    if (!tokenResponse || !tokenResponse.ok) {
        throw new AppError('UPSTREAM_SERVICE_ERROR', 'get_access_token');
    }

    /**
     * JSON containing parsed Twitch OAuth2 API response.
     */
    const responseData = await tokenResponse.json();

    if (!responseData || typeof(responseData.access_token) !== 'string') {
        throw new AppError('INVALID_RESPONSE_FORMAT', 'get_access_token');
    }

    return responseData.access_token;
}

/**
 * Exchanges an access token for the users email address using the Twitch OAuth2 API.
 *
 * @param accessToken Access token received from Twitch after authorization code exchange.
 * @returns Promise that resolves to the Twitch users email.
 */
export const getUserEmail = async (accessToken: string): Promise<string> => {
    const userResponse = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Client-Id': TWITCH_CLIENT_ID
        }
    }).catch( (error) => {
        throw new AppError('NETWORK_ERROR', 'get_twitch_user_email', error);
    });

    // check for errors in fetch response
    if (!userResponse || !userResponse.ok) {
        throw new AppError('UPSTREAM_SERVICE_ERROR', 'get_twitch_user_email');
    }

    const userData = await userResponse.json();

    // check if userData has expected structure
    if (!userData ||
        !Array.isArray(userData.data) ||
        userData.data.length === 0 ||
        !userData.data[0].email ||
        typeof(userData.data[0].email) !== 'string'
    ) {
        throw new AppError('INVALID_RESPONSE_FORMAT', 'get_twitch_user_email');
    }

    return userData.data[0].email;
}

/**
 * Checks if the given email address is whitelisted.
 *
 * @param email - Email address you want to check the whitelist status of.
 * @returns `true` if a document containing the given email address exists in the database, `false` otherwise.
 */
export const isWhitelistedUser = async (email: string): Promise<boolean> => {
    const user = await User.findOne({ email: email }).catch((error) => {
        throw new AppError('DATABASE_CONNECTION_ERROR', 'check_user_whitelist', error);
    });

    if (user) {
        return true;
    }

    return false;
}
