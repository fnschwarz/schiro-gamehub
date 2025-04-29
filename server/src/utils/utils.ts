import { Game } from '../models/game.model';

export const log = (type: string, message: string) => {
    const date = new Date().toISOString();
    console.log(`[${date}] [${type}] ${message}`);
}

export const logError = (message: string, error?: Error) => {
    const date = new Date().toISOString();
    const errorMessage = error ? ` // ${error}` : '';
    console.error(`[${date}] [error] ${message}${errorMessage}`);
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