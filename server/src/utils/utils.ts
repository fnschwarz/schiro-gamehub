import { Game } from "../models/game.model";

export const fetchSteamAppName = async (appId: number) => {
    try {
        const response = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const data = await response.json();
        return data[appId]?.data?.name || null;
    } catch (error) {
        console.error('[ERROR] Failed to fetch app name from Steam API:', error);
        return null;
    }
};

export const isSteamAppValid = async (appId: number) => {
    try {
        const response = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const data = await response.json();
        return data[appId]?.success || false;
    } catch (error) {
        console.error('[ERROR] Failed to validate app ID with Steam API:', error);
        return false;
    }
};

export const getAllAppsFromDatabase = async () => {
    try {
        const apps = await Game.find({});
        return apps.reverse();
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to fetch apps from the database:', error);
        return [];
    }
};