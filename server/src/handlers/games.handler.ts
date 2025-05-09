import { handleError, log, sendSuccess } from '../utils/utils';
import { getGamesFromDatabase, getGameDetails, isSteamApp, hasValidGameIdFormat } from '../utils/games.utils';
import { Game } from '../models/game.model';
import { Request, Response } from 'express';

export const getGames = async (req: Request, res: Response) => {
    const gameDocuments = await getGamesFromDatabase();

    const games = gameDocuments.map((game) => ({
        id: game.id,
        name: game.name,
        steam_link: game.steam_link,
        header_image: game.header_image
    }));

    res.status(200).json({
        success: true,
        data: games
    });
};

export const getGame = async (req: Request, res: Response) => {
    const gameId = parseInt(req?.params?.id, 10);

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        handleError('INVALID_GAME_ID_FORMAT', 'get_game', undefined, req, res); return;
    }

    // Get game details through database
    const game = await Game.findOne({ id: gameId }).catch( (error) => {
        handleError('DATABASE_CONNECTION_ERROR', 'get_game', error, req, res);
        return undefined;
    });

    if (game === undefined) {
        return;
    }

    if (game === null) {
        handleError('GAME_NOT_IN_DATABASE', 'get_game', undefined, req, res); return;
    }

    res.status(200).json({
        success: true,
        data: {
            id: game.id,
            name: game.name,
            steam_link: game.steam_link,
            header_image: game.header_image
        }
    });
}

export const addGameToDatabase = async (req: Request, res: Response) => {
    const gameId = parseInt(req.body.id, 10);

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        handleError('INVALID_GAME_ID_FORMAT', 'add_game', undefined, req, res); return;
    }

    // Check if game is a Steam app
    if (!await isSteamApp(gameId)) {
        handleError('GAME_NOT_A_STEAM_APP', 'add_game', undefined, req, res); return;
    }

    // Get game name through Steam API
    const gameDetails = await getGameDetails(gameId);
    if (!gameDetails) {
        handleError('FETCH_GAME_DETAILS_ERROR', 'add_game', undefined, req, res); return;
    }

    // Save game details (id, name) in database
    const newGame = new Game({ id: gameId, name: gameDetails.name, steam_link: gameDetails.steam_link, header_image: gameDetails.header_image });
    try {
        await newGame.save();
    } catch (error) {
        handleError('DATABASE_CONNECTION_ERROR', 'add_game', error as Error, req, res); return;
    }

    log('add_game', `${gameDetails.name} (ID ${gameId}) successfully added to database`, req);
    sendSuccess(res, 200, 'Game added.');
};

export const removeGameFromDatabase = async (req: Request, res: Response) => {
    const gameId = parseInt(req.body.id, 10);

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        handleError('INVALID_GAME_ID_FORMAT', 'remove_game', undefined, req, res); return;
    }

    const gameToDelete = await Game.findOneAndDelete({ id: gameId }).catch( (error) => {
        handleError('DATABASE_CONNECTION_ERROR', 'get_game', error, req, res);
        return undefined;
    });

    if (gameToDelete === undefined) {
        return;
    }

    // Check if game has entry in database
    if (gameToDelete === null) {
        handleError('GAME_NOT_IN_DATABASE', 'remove_game', undefined, req, res); return;
    }

    log('remove_game', `${gameToDelete.name || 'Game'} (ID ${gameId}) successfully removed from database`, req);
    sendSuccess(res, 200, 'Game removed.');
};
