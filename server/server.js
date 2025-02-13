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
        console.log('Connected to DB.');
    } catch (error) {
        console.error('CRITICAL: Error connecting to the database', error);
    }
}

// UTILS

const fetchAppName = async(appId) => {
    try {
        const receivedData = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const receivedDataToJSON = await receivedData.json();
        
        return receivedDataToJSON[appId].data.name;
    } catch (error) {
        console.error('WARNING: Error fetching app name', error);
        return null;
    }
}

const fetchAppExistence = async(appId) => {
    try {
        const receivedData = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const receivedDataToJSON = await receivedData.json();
        
        return receivedDataToJSON[appId].success;
    } catch (error) {
        console.error('WARNING: Error verifying app existence', error);
        return false;
    }
}

const fetchAppsFromDatabase = async () => {
    try {
        const apps = await AppsModel.find({});
        return apps.reverse();
    } catch (error) {
        console.error('CRITICAL: Error fetching app IDs from database', error);
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
        console.error('CRITICAL: Error registering new app', error);
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

        server.post('/api/apps', async (req, res) => {
            /**
             *  IMPORTANT: Check if user has permission and is logged in
             *  otherwise it is possible for unauthorized users to access 
             *  database
             */

            const appId = req.body.id;

            // Check if requested appId has valid number format
            if(isNaN(appId) || appId > 9999999 || appId <= 0){
                console.log(`ERROR: Invalid number`);
                res.send(JSON.stringify("ERROR"));
                return;
            }

            // Check if app exists in steam database
            if(!await fetchAppExistence(appId)){
                console.log(`ERROR: App ${appId} doesn't exist`);
                res.send(JSON.stringify("ERROR"));
                return;
            }

            const appName = await fetchAppName(appId);
            
            // Check for errors when fetching app name from Steam API
            if(appName === null){
                console.log(`ERROR: App ${appId} couldn't be registered due to error when fetching app name`);
                res.send(JSON.stringify("ERROR"));
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

            console.log('SUCCESS: New app', appId, 'registered');
            res.send(JSON.stringify("SUCCESS"));
        });
    } catch (error) {
        console.error('CRITICAL: Error initializing api endpoints', error);
    }
}

(async () => {
    try {
        connectToDatabase();
        initializeApiEndpoints();
    } catch (error) {
        console.error('CRITICAL: Error', error);
    }
}) ();

server.listen(process.env.BACKEND_SERVER_PORT, () => console.log(`Server running on port ${process.env.BACKEND_SERVER_PORT}...`));