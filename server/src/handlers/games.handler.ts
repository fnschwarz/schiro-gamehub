import { Request, Response } from 'express';
import { log, logError, sendSuccess, sendError } from '../utils/utils';
import { getGamesFromDatabase, getGameDetails, isSteamApp, hasValidGameIdFormat } from '../utils/games.utils'; 
import { Game } from '../models/game.model';

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
        logError(`Failed fetching game details: invalid game id format '${req?.params?.id}'`, req);
        sendError(res, 400, 'Invalid game id format. Please provide a valid game id.'); return;
    }

    // Get game details through database
    const game = await Game.findOne({ id: gameId }).catch(() => { return null });
    if (!game) {
        logError(`Failed fetching game details: game (ID ${gameId}) does not exist in database`, req);
        sendError(res, 404, 'Game does not exist in database.'); return;
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
        logError(`Failed adding game to database: invalid game id format '${gameId}'`, req);
        sendError(res, 400, 'Invalid game id format. Please provide a valid game id.'); return;
    }

    // Check if game is a Steam app
    if (!await isSteamApp(gameId)) {
        logError(`Failed adding game to database: provided game id '${gameId}' does not refer to an existing Steam app`, req);
        sendError(res, 404, 'Game not found. Please provide a valid game id.'); return;
    }

    // Get game name through Steam API
    const gameDetails = await getGameDetails(gameId);
    if (!gameDetails) {
        logError('Failed adding game to database: game details could not be fetched due to Steam API not responding.', req);
        sendError(res, 503, 'Steam API not responding.'); return;
    }

    // Save game details (id, name) in database
    const newGame = new Game({ id: gameId, name: gameDetails.name, steam_link: gameDetails.steam_link, header_image: gameDetails.header_image });
    try {
        await newGame.save();
    } catch (error) {
        logError(`Failed adding game to database: couldn't save new game document in database`, req, error as Error);
        sendError(res, 502, 'Database not responding.'); return;
    }

    log('database_add', `${gameDetails.name} (ID ${gameId}) successfully added to database`, req);
    sendSuccess(res, 200, 'Game added.');
};

export const removeGameFromDatabase = async (req: Request, res: Response) => {
    const gameId = parseInt(req.body.id, 10);

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        logError(`Failed removing game from database: invalid game id format '${gameId}'`, req);
        sendError(res, 400, 'Invalid game id format. Please provide a valid game id.'); return;
    }

    const gameToDelete = await Game.findOneAndDelete({ id: gameId }).catch(() => { return null });

    // Check if game has entry in database
    if (!gameToDelete) {
        logError(`Failed removing game from database: Game '${gameId}' not found`, req);
        sendError(res, 404, 'Game not found.'); return;
    }

    log('database_remove', `${gameToDelete.name || 'Game'} (ID ${gameId}) successfully removed from database`, req);
    sendSuccess(res, 200, 'Game removed.');
};