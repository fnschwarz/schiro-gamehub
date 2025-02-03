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
    apps: Array
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

const fetchAppIdsFromDatabase = async () => {
    try {
        const apps = (await AppsModel.findById(process.env.APPS_DOC_ID)).apps;
        return apps;
    } catch (error) {
        console.error('CRITICAL: Error fetching app IDs from database', error);
        return [];
    }
}

// API

const registerNewAppApiEndpoint = async (id) => {
    try {
        server.get(`/api/apps/${id}`, async (req, res) => {
            let appJSON = new Object();
            appJSON.id = id;
            appJSON.name = await fetchAppName(id);
            appJSON.link = `${process.env.STEAM_BASE_URL}/app/${id}`;
            appJSON.header = `${process.env.STEAM_HEADER_URL}/steam/apps/${id}/header.jpg`;
        
            res.json(appJSON);
        });   
    } catch (error) {
        console.error('CRITICAL: Error registering new app', error);
    }
}

const initializeApiEndpoints = async () => {
    try {
        // Initial fetch
        let appIdsInDatabase = await fetchAppIdsFromDatabase();

        server.get(`/api/apps`, async(req, res) => {
            appIdsInDatabase = await fetchAppIdsFromDatabase();
            res.json({ apps: appIdsInDatabase });
        });
        
        // Create API endpoints for all apps inside saved in database
        for(let i = 0; i < appIdsInDatabase.length; i++){
            registerNewAppApiEndpoint(appIdsInDatabase[i]);
        }

        server.post('/api/apps', async (req, res) => {
            /**
             *  IMPORTANT: Check if user has permission and is logged in
             *  otherwise it is possible for unauthorized users to access 
             *  database
             */

            // FUNC: Check if requested appId has valid number format
            if(isNaN(req.body.appId) || req.body.appId > 9999999 || req.body.appId <= 0){
                console.log(`ERROR: Invalid number`)
                res.send(JSON.stringify("ERROR"));
                return;
            }

            // FUNC: Check if app exists in steam database
            if(!await fetchAppExistence(req.body.appId)){
                console.log(`ERROR: App ${req.body.appId} doesn't exist`)
                res.send(JSON.stringify("ERROR"));
                return;
            }

            // Add new app to database apps list
            const appsDoc = await AppsModel.findById(process.env.APPS_DOC_ID);
            const updatedAppsList = [req.body.appId].concat(appsDoc.apps);
            
            console.log('SUCCESS: New app', req.body.appId, 'registered');

            // UPDATE DATABASE AND REGISTER API ACCESS
            await AppsModel.findByIdAndUpdate(process.env.APPS_DOC_ID, { $set: { apps: updatedAppsList } });
            registerNewAppApiEndpoint(req.body.appId);

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

server.listen(8080, () => console.log("Server running on port 8080..."));