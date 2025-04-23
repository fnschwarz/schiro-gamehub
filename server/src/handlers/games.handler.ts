import { Request, Response } from 'express';
import { logError, getGames, getGameName, isGameIdValid, hasValidGameIdFormat } from "../utils/utils";
import { Game } from "../models/game.model";

export const getAllGameIds = async (req: Request, res: Response) => {
    const games = await getGames();
    const gameIds = games.map((game) => game.id);
    res.json({ apps: gameIds }); // TODO: change to 'games' instead of 'apps'
};

export const getGame = async (req: Request, res: Response) => {
    const gameId = parseInt(req?.params?.id, 10); // TODO: validate with express-validator to prevent injections

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        logError(`Failed fetching game details: invalid game id format '${req?.params?.id}'`);
        res.status(400).json({ status: 400, message: 'Invalid game id format. Please provide a valid game id.' }); return;
    }

    // Get game details through database
    const game = await Game.findOne({ id: gameId }).catch(() => { return null });
    if (!game) {
        logError(`Failed fetching game details: game does not exist in database`);
        res.status(404).json({ status: 404, message: 'Game does not exist in database.' }); return;
    }

    res.status(200).json({
        id: game.id,
        name: game.name,
        link: `${process.env.STEAM_BASE_URL}/app/${game.id}`,
        header: `${process.env.STEAM_HEADER_URL}/steam/apps/${game.id}/header.jpg`
    });
}

export const addGameToDatabase = async (req: Request, res: Response) => {
    const gameId = parseInt(req.body.id, 10); // TODO: validate with express-validator to prevent injections

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        logError(`Failed adding game to database: invalid game id format '${gameId}'`);
        res.status(400).json({ status: 400, message: 'Invalid game id format. Please provide a valid game id.' }); return;
    }

    // Check if game is a Steam app
    if (!await isGameIdValid(gameId)) {
        logError(`Failed adding game to database: provided game id '${gameId}' does not refer to an existing Steam app`);
        res.status(404).json({ status: 404, message: 'Game is not a Steam app. Please provide a valid game id.' }); return;
    }

    // Get game name through Steam API
    const gameName = await getGameName(gameId);
    if (!gameName) {
        logError(`Failed adding game to database: game name couldn't be fetched due to Steam API not responding`);
        res.status(503).json({ status: 503, message: 'Steam API not responding.' }); return;
    }

    // Save game details (id, name) in database
    const newGame = new Game({ id: gameId, name: gameName });
    await newGame.save().catch((error) => {
        logError(`Failed adding game to database: couldn't save new game document in database`, error);
        res.status(502).json({ status: 502, message: 'Database not responding.' }); return;
    });

    console.log(`[ADD] App added: ID ${gameId}`); // TODO: replace with custom log function
    res.status(201).send('Created'); // TODO: better respond message
};

export const removeGameFromDatabase = async (req: Request, res: Response) => {
    const gameId = parseInt(req.body.id, 10); // TODO: validate with express-validator to prevent injections

    // Check if game id has proper format
    if (!hasValidGameIdFormat(gameId)) {
        logError(`Failed removing game from database: invalid game id format '${gameId}'`);
        res.status(400).json({ status: 400, message: 'Invalid game id format. Please provide a valid game id.' }); return;
    }

    const gameToDelete = await Game.findOneAndDelete({ id: gameId }).catch(() => { return null });

    // Check if game has entry in database
    if (!gameToDelete) {
        logError(`Failed removing game from database: Game '${gameId}' not found`);
        res.status(404).json({ status: 404, message: 'Game not found.' }); return;
    }

    console.log(`[REMOVE] App removed: ID ${gameId}`); // TODO: replace with custom log function
    res.status(200).send('OK'); // TODO: better respond message
};