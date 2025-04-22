import { Game } from "../models/game.model";

export const getGames = () => {
    return Game.find({})
        .then(games => games.reverse())
        .catch((error) => {
            console.error(`[${new Date().toISOString()}] [error] Failed to fetch game entries from database // `, error);
            return [];  
        });
};

export const getGameName = (gameId: number) => {
    return fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${gameId}`)
        .then(response => response.json())
        .then(data => data[gameId]?.data?.name || null)
        .catch((error) => {
            console.error(`[${new Date().toISOString()}] [error] Failed to fetch game name of ID ${gameId} from Steam API // `, error);
            return null;  
        });
};

export const isGameIdValid = (gameId: number) => {
    return fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${gameId}`)
        .then(response => response.json())
        .then(data => data[gameId]?.success || false)
        .catch((error) => {
            console.error(`[${new Date().toISOString()}] [error] Failed to validate ID ${gameId} from Steam API // `, error);
            return false;  
        });
};