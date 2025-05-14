export const ErrorCatalog = {
    INVALID_SERVER_PORT: {
        code: 'INVALID_SERVER_PORT',
        httpStatusCode: 500,
        clientMessage: 'Internal Server Error.',
        logMessage: 'Invalid server port',
        isOperational: false
    },
    NETWORK_ERROR: {
        code: 'NETWORK_ERROR',
        httpStatusCode: 503,
        clientMessage: 'Service temporarily unavailable. Please try again later.',
        logMessage: 'Network error during fetch request to external service',
        isOperational: false
    },
    UPSTREAM_SERVICE_ERROR: {
        code: 'UPSTREAM_SERVICE_ERROR',
        httpStatusCode: 502,
        clientMessage: 'External service returned an error.',
        logMessage: 'Received non-2xx HTTP status code from upstream service',
        isOperational: false
    },
    INVALID_RESPONSE_FORMAT: {
        code: 'INVALID_RESPONSE_FORMAT',
        httpStatusCode: 502,
        clientMessage: 'External service returned an invalid response.',
        logMessage: 'Response from external service had incorrect structure',
        isOperational: false
    },
    DATABASE_CONNECTION_ERROR: {
        code: 'DATABASE_CONNECTION_ERROR',
        httpStatusCode: 500,
        clientMessage: 'Internal Server Error: Unable to access the database.',
        logMessage: 'Could not establish a connection to the database or query failed',
        isOperational: false
    },

    // AUTH

    STATE_MISMATCH: {
        code: 'STATE_MISMATCH',
        httpStatusCode: 400,
        clientMessage: 'Invalid session state.',
        logMessage: 'Received a state that does not match with given session state',
        isOperational: true
    },
    MISSING_AUTH_CODE: {
        code: 'MISSING_AUTH_CODE',
        httpStatusCode: 400,
        clientMessage: 'Missing authorization code.',
        logMessage: 'Did not receive required authorization code in request query',
        isOperational: true
    },
    ACCESS_TOKEN_EXCHANGE_ERROR: {
        code: 'ACCESS_TOKEN_EXCHANGE_ERROR',
        httpStatusCode: 502,
        clientMessage: 'Unable to retrieve access token from Twitch.',
        logMessage: 'Twitch did not return valid access token',
        isOperational: true
    },
    USER_DATA_EXCHANGE_ERROR: {
        code: 'USER_DATA_EXCHANGE_ERROR',
        httpStatusCode: 502,
        clientMessage: 'Unable to retrieve user data from Twitch.',
        logMessage: 'Twitch did not return valid twitch user data',
        isOperational: true
    },
    NOT_WHITELISTED: {
        code: 'NOT_WHITELISTED',
        httpStatusCode: 403,
        clientMessage: 'Access denied: not whitelisted.',
        logMessage: 'User tried logging in without being on whitelist',
        isOperational: true
    },
    INVALID_TOKEN: {
        code: 'INVALID_TOKEN',
        httpStatusCode: 403,
        clientMessage: 'Invalid or expired token.',
        logMessage: 'User attempted an authenticated action with providing a invalid or expired token',
        isOperational: true
    },
    INVALID_TOKEN_PAYLOAD: {
        code: 'INVALID_TOKEN_PAYLOAD',
        httpStatusCode: 500,
        clientMessage: 'Internal Server Error: invalid token payload.',
        logMessage: 'Invalid token payload.',
        isOperational: true
    },

    // GAMES

    INVALID_GAME_ID_FORMAT: {
        code: 'INVALID_GAME_ID_FORMAT',
        httpStatusCode: 400,
        clientMessage: 'Invalid game id format. Please provide a valid game id.',
        logMessage: 'Got request with invalid game id format',
        isOperational: true
    },
    GAME_NOT_IN_DATABASE: {
        code: 'GAME_NOT_IN_DATABASE',
        httpStatusCode: 404,
        clientMessage: 'Game does not exist in database.',
        logMessage: 'Got request with game id that does not exist in database',
        isOperational: true
    },
    GAME_ALREADY_EXISTS: {
        code: 'GAME_ALREADY_EXISTS',
        httpStatusCode: 409,
        clientMessage: 'Game already exists.',
        logMessage: 'Got request with game id that already exists in database',
        isOperational: true
    },
    GAME_NOT_A_STEAM_APP: {
        code: 'GAME_NOT_A_STEAM_APP',
        httpStatusCode: 404,
        clientMessage: 'Game not found. Please provide a valid game id.',
        logMessage: 'Got request with game id that does not refer to a steam app',
        isOperational: true
    },
    STEAM_APP_VALIDATION_ERROR: {
        code: 'STEAM_APP_VALIDATION_ERROR',
        httpStatusCode: 502,
        clientMessage: 'Steam not responding.',
        logMessage: 'Game could not be validated due to Steam not responding',
        isOperational: true
    },
    FETCH_GAME_DETAILS_ERROR: {
        code: 'FETCH_GAME_DETAILS_ERROR',
        httpStatusCode: 502,
        clientMessage: 'Steam not responding.',
        logMessage: 'Game details could not be fetched due to Steam not responding',
        isOperational: true
    }
}
