require('dotenv').config()
const express = require("express");
const server = express();
const jwt = require('jsonwebtoken');
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

const UsersModel = mongoose.model('UsersModel', {
    email: String
}, 'users');

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

const getSteamAppName = async(appId) => {
    try {
        const receivedData = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const receivedDataToJSON = await receivedData.json();
        
        return receivedDataToJSON[appId].data.name;
    } catch (error) {
        console.error('[ERROR] Error getting app name -', error);
        return null;
    }
}

const checkSteamAppExists = async(appId) => {
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

// USER AUTHORIZATION

const redirectToTwitchAuth = (req, res) => {
    try {
        const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.BACKEND_SERVER_DOMAIN}/auth/twitch/callback&response_type=code&scope=user:read:email`;
        res.redirect(authUrl);
    } catch (error) {
        console.error('[ERROR] Error redirecting to Twitch authorization -', error);
    }
}

const handleTwitchAuthCallback = async (req, res) => {
    try {
        const { code } = req.query;

        const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.BACKEND_SERVER_DOMAIN}/auth/twitch/callback`,
            }),
        });
        
        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;

        const userResponse = await fetch('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID
            }
        });
    
        const userData = await userResponse.json();
        const user = userData.data[0];

        // Check if users email is valid
        const checkPermission = await UsersModel.findOne({ email: user.email });
        if(!checkPermission){
            console.log(`[FAILED LOGIN] ${user.email} is not whitelisted`)
            res.redirect(`${process.env.FRONTEND_SERVER_DOMAIN}`);
            return;
        }

        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });
        
        console.log(`[LOGIN] ${user.email} successfully logged in`)
        res.redirect(`${process.env.FRONTEND_SERVER_DOMAIN}`);
    } catch (error) {
        console.error('[ERROR] Error handling Twitch authorization callback -', error);
    }
}

// API

const registerAppEndpoint = async (appId, appName) => {
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
        console.error('[CRITICAL ERROR] Error registering app API endpoint -', error);
    }
}

const addAppToList = async (req, res) => {
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
        if(!await checkSteamAppExists(appId)){
            console.log(`[ERROR] Error creating list item. App (ID ${appId}) doesn't exist`);
            res.status(404).send('Not Found');
            return;
        }
        
        // Check for errors when fetching app name from Steam API
        const appName = await getSteamAppName(appId);
        if(appName === null){
            console.log(`[ERROR] Error creating list item. App (ID ${appId}) couldn't be registered due to error getting app name`);
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
        registerAppEndpoint(appId, appName);

        console.log(`[ADD] App (ID ${appId}) successfully added`);
        res.status(201).send('Created');
    } catch (error) {
        console.error('[CRITICAL ERROR] Error creating list item -', error);
    }
}

const removeAppFromList = async (req, res) => {
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
        
        console.log(`[REMOVE] App (ID ${appId}) successfully removed`);
        res.status(200).send('OK');
    } catch (error) {
        console.error('[CRITICAL ERROR] Error deleting list item -', error);
    }
}

const setupServer = async () => {
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
            registerAppEndpoint(app.id, app.name);
        }

        server.get('/auth/twitch', (req, res) => {
            redirectToTwitchAuth(req, res);
        });

        server.get('/auth/twitch/callback', async (req, res) => {
            handleTwitchAuthCallback(req, res);
        });

        server.post('/api/apps/add', async (req, res) => {
            addAppToList(req, res);
        });

        server.post('/api/apps/remove', async (req, res) => {
            removeAppFromList(req, res);
        });
    } catch (error) {
        console.error('[CRITICAL ERROR] Error initializing api endpoints -', error);
    }
}

(async () => {
    try {
        connectToDatabase();
        setupServer();
    } catch (error) {
        console.error('[CRITICAL ERROR] Error when starting server -', error);
    }
}) ();

server.listen(process.env.BACKEND_SERVER_PORT, () => console.log(`[SERVER START] Server running on port ${process.env.BACKEND_SERVER_PORT}...`));