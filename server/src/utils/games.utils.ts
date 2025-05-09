import { handleError } from './utils';
import { Game } from '../models/game.model';

export const getGamesFromDatabase = async () => {
    const games = await Game.find({}).catch((error) => {
        handleError('DATABASE_CONNECTION_ERROR', 'get_games_from_database', error);
        return [];
    })

    return games.reverse();
};

export const getGameDetails = async (gameId: number): Promise<{ name: string, steam_link: string, header_image: string} | null> => {
    const responseData = await fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)
        .then(res => res.json())
        .catch((error) => {
            handleError('NETWORK_ERROR', 'get_game_details', error);
            return null;
    });

    if (!responseData) {
        handleError('UPSTREAM_SERVICE_ERROR', 'get_game_details');
        return null;
    }

    const name: string | null = responseData[gameId]?.data?.name || null;
    const steam_link: string = `https://store.steampowered.com/app/${gameId}`;
    const header_image: string | null = responseData[gameId]?.data?.header_image || null;

    if (!name || !header_image) {
        handleError('INVALID_RESPONSE_FORMAT', 'get_game_details');
        return null;
    }

    return {
        name: name,
        steam_link: steam_link,
        header_image: header_image
    }
};

export const isSteamApp = async (gameId: number): Promise<boolean> => {
    return fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)
        .then(res => res.json())
        .then(data => data[gameId]?.success || false)
        .catch((error) => {
            handleError('NETWORK_ERROR', 'is_steam_app', error);
            return false;
        });
};

export const hasValidGameIdFormat = (gameId: number): boolean => {
    const MAX_UINT32 = 2 ** 32;
    return Number.isSafeInteger(gameId) && gameId >= 10 && gameId < MAX_UINT32;
};
