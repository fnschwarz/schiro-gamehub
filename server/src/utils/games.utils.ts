import { AppError } from '../errors/error';
import { handleError } from './utils';
import { Game } from '../models/game.model';

export const getGamesFromDatabase = async () => {
    const games = await Game.find({}).catch((error) => {
        return new AppError('DATABASE_CONNECTION_ERROR', 'get_games_from_database', error);
    });

    if (games instanceof AppError) {
        return games;
    }

    return games.reverse();
};

export const getGameDetails = async (gameId: number): Promise<{ name: string, steam_link: string, header_image: string} | AppError> => {
    const responseData = await fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)//asdasd
        .then(res => res.json())
        .catch((error) => {
            return new AppError('NETWORK_ERROR', 'get_game_details', error);
    });

    if (responseData instanceof AppError) {
        return responseData;
    }

    const name: string | null = responseData[gameId]?.data?.name || null;
    const steam_link: string = `https://store.steampowered.com/app/${gameId}`;
    const header_image: string | null = responseData[gameId]?.data?.header_image || null;

    if (!name || !header_image) {
        return new AppError('INVALID_RESPONSE_FORMAT', 'get_game_details');
    }

    return {
        name: name,
        steam_link: steam_link,
        header_image: header_image
    }
};

export const isSteamApp = async (gameId: number): Promise<boolean | AppError> => {
    return fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)
        .then(res => res.json())
        .then(data => data[gameId]?.success || false)
        .catch((error) => {
            return new AppError('NETWORK_ERROR', 'is_steam_app', error);
        });
};

export const isExistingGame = async (gameId: number): Promise<boolean | AppError> => {
    const game = await Game.findOne({ id: gameId }).catch( (error) => {
        return new AppError('DATABASE_CONNECTION_ERROR', 'is_existing_game', error);
    });

    if (game instanceof AppError) {
        return game;
    }

    if (game === null) {
        return false;
    }

    return true;
}

export const hasValidGameIdFormat = (gameId: number): boolean => {
    const MAX_UINT32 = 2 ** 32;
    return Number.isSafeInteger(gameId) && gameId >= 10 && gameId < MAX_UINT32;
};
