import dotenv from 'dotenv';
dotenv.config();

const requireEnv = (name: string): string => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is missing`);
    }

    return value;
}

// requireEnv will throw error if any env variable is undefined
export const checkEnv = () => {
    requireEnv('NODE_ENV');
    requireEnv('LOG_OPERATIONAL');
    requireEnv('TEST_ENV_USERNAME');
    requireEnv('TEST_ENV_PASSWORD');
    requireEnv('FRONTEND_SERVER_URL');
    requireEnv('BACKEND_SERVER_URL');
    requireEnv('BACKEND_SERVER_PORT');
    requireEnv('MONGODB_URI');
    requireEnv('TWITCH_CLIENT_ID');
    requireEnv('TWITCH_CLIENT_SECRET');
    requireEnv('JWT_SECRET');
    requireEnv('HASH_SECRET');
    requireEnv('SESSION_SECRET');
}

// export env variables
export const NODE_ENV = requireEnv('NODE_ENV');
export const LOG_OPERATIONAL = requireEnv('LOG_OPERATIONAL') === 'true' ? true : false;
export const TEST_ENV_USERNAME = requireEnv('TEST_ENV_USERNAME');
export const TEST_ENV_PASSWORD = requireEnv('TEST_ENV_PASSWORD');
export const FRONTEND_SERVER_URL = requireEnv('FRONTEND_SERVER_URL');
export const BACKEND_SERVER_URL = requireEnv('BACKEND_SERVER_URL');
export const BACKEND_SERVER_PORT = requireEnv('BACKEND_SERVER_PORT');
export const MONGODB_URI = requireEnv('MONGODB_URI');
export const TWITCH_CLIENT_ID = requireEnv('TWITCH_CLIENT_ID');
export const TWITCH_CLIENT_SECRET = requireEnv('TWITCH_CLIENT_SECRET');
export const JWT_SECRET = requireEnv('JWT_SECRET');
export const HASH_SECRET = requireEnv('HASH_SECRET');
export const SESSION_SECRET = requireEnv('SESSION_SECRET');

