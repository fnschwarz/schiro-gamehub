import { logError } from './utils';
import { Game } from '../models/game.model';

export const getGamesFromDatabase = async () => {
    const games = await Game.find({}).catch((error) => {
        logError('Failed to fetch game entries from database', error);
        return [];
    })
    
    return games.reverse();
};

export const getGameName = async (gameId: number): Promise<string | null> => {
    return fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)
        .then(res => res.json())
        .then(data => data[gameId]?.data?.name || null)
        .catch((error) => {
            logError(`Failed to fetch game name of game id '${gameId}' from Steam API`, undefined, error);
            return null;
        });
};

export const isSteamApp = async (gameId: number): Promise<boolean> => {
    return fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)
        .then(res => res.json())
        .then(data => data[gameId]?.success || false)
        .catch((error) => {
            logError(`Failed to verify game id '${gameId}' from Steam API`, undefined, error);
            return false;
        });
};

export const hasValidGameIdFormat = (gameId: number): boolean => {
    const MAX_UINT32 = 2 ** 32;
    return Number.isSafeInteger(gameId) && gameId >= 10 && gameId < MAX_UINT32;
};