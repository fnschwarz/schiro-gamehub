import { Request } from 'express';
import { createHmac } from 'crypto';
import { Game } from '../models/game.model';

const generateClientId = (ip: string, userAgent: string, secret: string): string => {
    const hash = createHmac('sha256', secret);
    hash.update(`${ip}${userAgent}`);
    return hash.digest('hex').substring(0, 10);
}

export const log = (type: string, message: string, req?: Request) => {
    const HASH_SECRET = process.env.HASH_SECRET;

    if(!HASH_SECRET){
        console.log('Logging failed: HASH_SECRET environment variable is not defined.'); return;
    }

    const date = `[${new Date().toISOString()}] `;
    type = `[${type}] `;

    // provides hashed client ip and user agent reduced to 10 characters or empty string
    const clientId = req && req.ip && req.headers['user-agent'] ? `[client ${generateClientId(req.ip, req.headers['user-agent'], HASH_SECRET)}] ` : '';
    
    console.log(`${date}${type}${clientId}${message}`);
}

export const logError = (message: string, req? : Request, error?: Error) => {
    const HASH_SECRET = process.env.HASH_SECRET;

    if(!HASH_SECRET){
        console.log('Logging failed: HASH_SECRET environment variable is not defined.'); return;
    }

    const date = `[${new Date().toISOString()}] `;
    const type = '[error] ';
    
    // provides hashed client ip and user agent reduced to 10 characters or empty string
    const clientId = req && req.ip && req.headers['user-agent'] ? `[client ${generateClientId(req.ip, req.headers['user-agent'], HASH_SECRET)}] ` : '';
    
    // provides error message or empty string
    const errorMessage = error ? ` // ${error}` : '';

    console.error(`${date}${type}${clientId}${message}${errorMessage}`);
};

export const getGamesFromDatabase = () => {
    return Game.find({})
        .then(games => games.reverse())
        .catch((error) => {
            logError('Failed to fetch game entries from database', error);
            return [];
        });
};

export const getGameName = (gameId: number): Promise<string> => {
    return fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${gameId}`)
        .then(response => response.json())
        .then(data => data[gameId]?.data?.name || null)
        .catch((error) => {
            logError(`Failed to fetch game name of game id '${gameId}' from Steam API`, error);
            return null;
        });
};

export const isSteamApp = (gameId: number): Promise<boolean> => {
    return fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${gameId}`)
        .then(response => response.json())
        .then(data => data[gameId]?.success || false)
        .catch((error) => {
            logError(`Failed to verify game id '${gameId}' from Steam API`, error);
            return false;
        });
};

export const hasValidGameIdFormat = (gameId: number): boolean => {
    const MAX_UINT32 = 2 ** 32;
    return Number.isSafeInteger(gameId) && gameId >= 10 && gameId < MAX_UINT32;
};