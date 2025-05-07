import { Request, Response } from 'express';
import { log, logError } from '../utils/utils';
import { getGamesFromDatabase, getGameName, isSteamApp, hasValidGameIdFormat } from '../utils/games.utils'; 
import { Game } from '../models/game.model';

export const getGames = async (req: Request, res: Response) => {
    const gameDocuments = await getGamesFromDatabase();

    const games = gameDocuments.map((game) => ({
        id: game.id,
        name: game.name,
        link: `https://store.steampowered.com/app/${game.id}`,
        header: `https://steamcdn-a.akamaihd.net/steam/apps/${game.id}/header.jpg`,
    }));
    
    res.json(games);
};

export const getGame = async (req: Request, res: Response) => {
    const gameId = parseInt(req?.params?.id, 10);

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        logError(`Failed fetching game details: invalid game id format '${req?.params?.id}'`, req);
        res.status(400).json({ status: 400, message: 'Invalid game id format. Please provide a valid game id.' }); return;
    }

    // Get game details through database
    const game = await Game.findOne({ id: gameId }).catch(() => { return null });
    if (!game) {
        logError(`Failed fetching game details: game (ID ${gameId}) does not exist in database`, req);
        res.status(404).json({ status: 404, message: 'Game does not exist in database.' }); return;
    }

    res.status(200).json({
        id: game.id,
        name: game.name,
        link: `https://store.steampowered.com/app/${game.id}`,
        header: `https://steamcdn-a.akamaihd.net/steam/apps/${game.id}/header.jpg`
    });
}

export const addGameToDatabase = async (req: Request, res: Response) => {
    const gameId = parseInt(req.body.id, 10);

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        logError(`Failed adding game to database: invalid game id format '${gameId}'`, req);
        res.status(400).json({ status: 400, message: 'Invalid game id format. Please provide a valid game id.' }); return;
    }

    // Check if game is a Steam app
    if (!await isSteamApp(gameId)) {
        logError(`Failed adding game to database: provided game id '${gameId}' does not refer to an existing Steam app`, req);
        res.status(404).json({ status: 404, message: 'Game is not a Steam app. Please provide a valid game id.' }); return;
    }

    // Get game name through Steam API
    const gameName = await getGameName(gameId);
    if (!gameName) {
        logError(`Failed adding game to database: game name couldn't be fetched due to Steam API not responding`, req);
        res.status(503).json({ status: 503, message: 'Steam API not responding.' }); return;
    }

    // Save game details (id, name) in database
    const newGame = new Game({ id: gameId, name: gameName });
    await newGame.save().catch((error) => {
        logError(`Failed adding game to database: couldn't save new game document in database`, req, error);
        res.status(502).json({ status: 502, message: 'Database not responding.' }); return;
    });

    log('database_add', `${gameName} (ID ${gameId}) successfully added to database`, req);
    res.status(200).json({ status: 200, message: 'Game added.' });
};

export const removeGameFromDatabase = async (req: Request, res: Response) => {
    const gameId = parseInt(req.body.id, 10);

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        logError(`Failed removing game from database: invalid game id format '${gameId}'`, req);
        res.status(400).json({ status: 400, message: 'Invalid game id format. Please provide a valid game id.' }); return;
    }

    const gameToDelete = await Game.findOneAndDelete({ id: gameId }).catch(() => { return null });

    // Check if game has entry in database
    if (!gameToDelete) {
        logError(`Failed removing game from database: Game '${gameId}' not found`, req);
        res.status(404).json({ status: 404, message: 'Game not found.' }); return;
    }

    log('database_remove', `${gameToDelete.name || 'Game'} (ID ${gameId}) successfully removed from database`, req);
    res.status(200).json({ status: 200, message: 'Game removed.' });
};