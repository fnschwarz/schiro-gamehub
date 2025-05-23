import { AppError } from '../errors/error';
import { handleError, log, sendSuccess } from '../utils/utils';
import { getGamesFromDatabase, getGameDetails, isSteamApp, isExistingGame, hasValidGameIdFormat } from '../utils/games.utils';
import { Game } from '../models/game.model';
import { Request, Response } from 'express';

export const getGames = async (req: Request, res: Response) => {
    const gameDocuments = await getGamesFromDatabase();

    if (gameDocuments instanceof AppError) {
        handleError(gameDocuments.errorKey, gameDocuments.operation, gameDocuments.extra, req, res); return;
    }

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
    const isSteamAppRes = await isSteamApp(gameId);
    if (isSteamAppRes instanceof AppError) {
        handleError(isSteamAppRes.errorKey, isSteamAppRes.operation, isSteamAppRes.extra, req, res); return;
    }

    if (isSteamAppRes === false) {
        handleError('GAME_NOT_A_STEAM_APP', 'add_game', undefined, req, res); return;
    }

    // check if game is a duplicate
    const isExistingGameRes = await isExistingGame(gameId);
    if (isExistingGameRes instanceof AppError) {
        handleError(isExistingGameRes.errorKey, isExistingGameRes.operation, isExistingGameRes.extra, req, res); return;
    }

    if (isExistingGameRes) {
        handleError('GAME_ALREADY_EXISTS', 'add_game', undefined, req, res); return;
    }

    // Get game name through Steam API
    const gameDetails = await getGameDetails(gameId);
    if (gameDetails instanceof AppError) {
        handleError(gameDetails.errorKey, gameDetails.operation, gameDetails.extra, req, res); return;
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
