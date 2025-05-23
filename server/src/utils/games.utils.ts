import { AppError } from '../errors/error';
import { Game } from '../models/game.model';

export const getGamesFromDatabase = async () => {
    const games = await Game.find({}).catch((error) => {
        throw new AppError('DATABASE_CONNECTION_ERROR', 'get_games_from_database', error);
    });

    return games.reverse();
};

export const getGameDetails = async (gameId: number): Promise<{ name: string, steam_link: string, header_image: string}> => {
    const responseData = await fetch(`https://store.steampowered.com/api/appdetails?appids=${gameId}`)//asdasd
        .then(res => res.json())
        .catch((error) => {
            throw new AppError('NETWORK_ERROR', 'get_game_details', error);
    });

    const name: string | null = responseData[gameId]?.data?.name || null;
    const steam_link: string = `https://store.steampowered.com/app/${gameId}`;
    const header_image: string | null = responseData[gameId]?.data?.header_image || null;

    if (!name || !header_image) {
        throw new AppError('INVALID_RESPONSE_FORMAT', 'get_game_details');
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
        .then((data) => { return data[gameId]?.success || false })
        .catch((error) => {
            if (error instanceof TypeError) {
                throw new AppError('INVALID_GAME_ID_FORMAT', 'is_steam_app');
            }

            throw new AppError('NETWORK_ERROR', 'is_steam_app', error);
        });
};

export const isExistingGame = async (gameId: number): Promise<boolean> => {
    const game = await Game.findOne({ id: gameId }).catch( (error) => {
        throw new AppError('DATABASE_CONNECTION_ERROR', 'is_existing_game', error);
    });

    /**
     * When no document with the given id is found (i.e. game is not on the list)
     * mongoose returns null and the functions returns false
     */
    if (game === null) {
        return false;
    }

    return true;
}

export const hasValidGameIdFormat = (gameId: number): boolean => {
    const MAX_UINT32 = 2 ** 32;
    return Number.isSafeInteger(gameId) && gameId >= 10 && gameId < MAX_UINT32;
};
