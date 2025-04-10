require('dotenv').config()
const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = {
    origin: [`${process.env.FRONTEND_SERVER_DOMAIN}`],
}

server.use(cors(corsOptions));
server.use(express.json());

// MONGOOSE MODEL

const AppsModel = mongoose.model('AppsModel', {
    id : Number,
    name : String
}, 'apps');

// DATABASE CONNECTION

const connectToDatabase = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DATABASE_NAME });
        console.log('[SERVER START] Connected to DB...');
    } catch (error) {
        console.error('[CRITICAL ERROR] Error connecting to database -', error);
    }
}

// UTILS

const fetchAppName = async(appId) => {
    try {
        const receivedData = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const receivedDataToJSON = await receivedData.json();
        
        return receivedDataToJSON[appId].data.name;
    } catch (error) {
        console.error('[ERROR] Error fetching app name -', error);
        return null;
    }
}

const fetchAppExistence = async(appId) => {
    try {
        const receivedData = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const receivedDataToJSON = await receivedData.json();
        
        return receivedDataToJSON[appId].success;
    } catch (error) {
        console.error('[ERROR] Error verifying app existence', error);
        return false;
    }
}

const fetchAppsFromDatabase = async () => {
    try {
        const apps = await AppsModel.find({});
        return apps.reverse();
    } catch (error) {
        console.error('[CRITICAL ERROR] Error fetching app IDs from database -', error);
        return [];
    }
}

// API

const registerNewAppApiEndpoint = async (appId, appName) => {
    try {
        server.get(`/api/apps/${appId}`, async (req, res) => {
            let appJSON = new Object();
            appJSON.id = appId;
            appJSON.name = appName;
            appJSON.link = `${process.env.STEAM_BASE_URL}/app/${appId}`;
            appJSON.header = `${process.env.STEAM_HEADER_URL}/steam/apps/${appId}/header.jpg`;
        
            res.json(appJSON);
        });   
    } catch (error) {
        console.error('[CRITICAL ERROR] Error registering new app API endpoint -', error);
    }
}

const createNewApp = async (req, res) => {
    try {
        /*  TODO: CHECK USER PERMISSION
            TO ENSURE THAT NO UNAUTHORIZED
            CLIENT CAN ACCESS THE DATABASE
        */

        const appId = req.body.id;

        // Check if requested appId has valid number format
        if(isNaN(appId) || appId <= 0 || appId > Math.pow(2, 32) - 1){
            console.log(`[ERROR] Error creating list item. Invalid number format '${appId}'`);
            res.status(400).send('Bad Request');
            return;
        }

        // Check if app exists in steam database
        if(!await fetchAppExistence(appId)){
            console.log(`[ERROR] Error creating list item. App (ID ${appId}) doesn't exist`);
            res.status(404).send('Not Found');
            return;
        }
        
        // Check for errors when fetching app name from Steam API
        const appName = await fetchAppName(appId);
        if(appName === null){
            console.log(`[ERROR] Error creating list item. App (ID ${appId}) couldn't be registered due to error when fetching app name`);
            res.status(503).send('Service Unavailable');
            return;
        }

        // New document for database
        const newApp = new AppsModel({
            id: appId,
            name: appName
        })

        // Update database and register API endpoint
        await newApp.save();
        registerNewAppApiEndpoint(appId, appName);

        console.log(`[CREATE] App (ID ${appId}) successfully created`);
        res.status(201).send('Created');
    } catch (error) {
        console.error('[CRITICAL ERROR] Error creating new app -', error);
    }
}

const deleteExistingApp = async (req, res) => {
    try {
        /*  TODO: CHECK USER PERMISSION
        TO ENSURE THAT NO UNAUTHORIZED
        CLIENT CAN ACCESS THE DATABASE
        */

        const appId = req.body.id;

        // Check if requested appId has valid number format
        if(isNaN(appId) || appId <= 0 || appId > Math.pow(2, 32) - 1){
            console.log(`[ERROR] Error deleting list item. Invalid number format '${appId}'`);
            res.status(400).send('Bad Request');
            return;
        }

        const deletedApp = await AppsModel.findOneAndDelete({ id: appId });

        if (!deletedApp) {
            console.log(`[ERROR] Error deleting list item. App (ID ${appId}) not found`);
            res.status(404).send('Not Found');
            return;
        }
        
        console.log(`[DELETE] App (ID ${appId}) successfully deleted`);
        res.status(200).send('OK');
    } catch (error) {
        console.error('[CRITICAL ERROR] Error deleting existing app -', error);
    }
}

const initializeApiEndpoints = async () => {
    try {
        // Initial fetch
        let appsInDatabase = await fetchAppsFromDatabase();

        server.get(`/api/apps`, async(req, res) => {
            appsInDatabase = await fetchAppsFromDatabase();

            allAppIds = []

            for (const app of appsInDatabase) {
                allAppIds.push(app.id);
            }

            res.json({ apps: allAppIds });
        });
        
        // Create API endpoints for all apps inside saved in database
        for(const app of appsInDatabase){
            registerNewAppApiEndpoint(app.id, app.name);
        }

        server.get('/auth/twitch', (req, res) => {
            const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.FRONTEND_SERVER_DOMAIN}/auth/twitch/callback&response_type=code&scope=user:read:email`;
            res.redirect(authUrl);
        });

        server.get('/auth/twitch/callback', (req, res) => {
            
        });

        server.post('/api/apps/create', async (req, res) => {
            createNewApp(req, res);
        });

        server.post('/api/apps/delete', async (req, res) => {
            deleteExistingApp(req, res);
        });
    } catch (error) {
        console.error('[CRITICAL ERROR] Error initializing api endpoints -', error);
    }
}

(async () => {
    try {
        connectToDatabase();
        initializeApiEndpoints();
    } catch (error) {
        console.error('[CRITICAL ERROR] Error when starting server -', error);
    }
}) ();

server.listen(process.env.BACKEND_SERVER_PORT, () => console.log(`[SERVER START] Server running on port ${process.env.BACKEND_SERVER_PORT}...`));