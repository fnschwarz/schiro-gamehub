import { fetchSteamAppName, isSteamAppValid, getAllAppsFromDatabase } from "../utils/utils";
import { Game } from "../models/game.model";

export const getAllGameIds = async (req: any, res: any) => {
    try {
        const apps = await getAllAppsFromDatabase();
        const appIds = apps.map((app: any) => app.id);
        res.json({ apps: appIds });
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to get all game ids:', error);
    }
};

export const getGame = async (req: any, res: any) => {
    try {
        const appId: number = req.params.id;
        const app = await Game.findOne({ id: appId });

        if(!app) return res.status(404);

        const appDetails = {
            id: app.id,
            name: app.name,
            link: `${process.env.STEAM_BASE_URL}/app/${app.id}`,
            header: `${process.env.STEAM_HEADER_URL}/steam/apps/${app.id}/header.jpg`
        }

        res.status(200).json(appDetails);
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to register app API endpoint:', error);
    }
}

export const addAppToDatabase = async (req: any, res: any) => {
    try {
        const appId = req.body.id;

        if (isNaN(appId) || appId <= 0 || appId > Math.pow(2, 32) - 1) {
            console.log(`[ERROR] Invalid app ID format: '${appId}'`);
            res.status(400).send('Bad Request');
            return;
        }

        if (!await isSteamAppValid(appId)) {
            console.log(`[ERROR] App ID ${appId} does not exist on Steam`);
            res.status(404).send('Not Found');
            return;
        }

        const appName = await fetchSteamAppName(appId);
        if (!appName) {
            console.log(`[ERROR] Failed to fetch app name for ID ${appId}`);
            res.status(503).send('Service Unavailable');
            return;
        }

        const newApp = new Game({ id: appId, name: appName });
        await newApp.save();
        //registerAppApiEndpoint(appId, appName);

        console.log(`[ADD] App added: ID ${appId}`);
        res.status(201).send('Created');
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to add app to database:', error);
    }
};

export const removeAppFromDatabase = async (req: any, res: any) => {
    try {
        const appId = req.body.id;

        if (isNaN(appId) || appId <= 0 || appId > Math.pow(2, 32) - 1) {
            console.log(`[ERROR] Invalid app ID format: '${appId}'`);
            res.status(400).send('Bad Request');
            return;
        }

        const deletedApp = await Game.findOneAndDelete({ id: appId });

        if (!deletedApp) {
            console.log(`[ERROR] App not found: ID ${appId}`);
            res.status(404).send('Not Found');
            return;
        }

        console.log(`[REMOVE] App removed: ID ${appId}`);
        res.status(200).send('OK');
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to remove app from database:', error);
    }
};