require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = {
    origin: [`${process.env.FRONTEND_SERVER_DOMAIN}`],
}

app.use(cors(corsOptions));
app.use(express.json());

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
        console.error('WARNING: Error fetching game name', error);
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
        console.error('CRITICAL: Error fetching game IDs from database', error);
        return [];
    }
}

// API

const registerNewAppApiEndpoint = async (id) => {
    try {
        app.get(`/api/games/${id}`, async (req, res) => {
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
        let appIdsInDatabase = await fetchAppIdsFromDatabase(); // TODO: better solution for this crap

        app.get(`/api/games`, async(req, res) => {
            //  NOTE: document in database could change but the appIdsInDatabase array wont be updated automatically.
            //  The solution is to make a database query a second time inside the GET api request definition of '/games'
            //  so that the presented json in the API will always be up to date -> better solution needed
            
            appIdsInDatabase = await fetchAppIdsFromDatabase();
            res.json({ apps: appIdsInDatabase });
        });
        
        // create API access page for all app ids inside database array
        for(let i = 0; i < appIdsInDatabase.length; i++){
            registerNewAppApiEndpoint(appIdsInDatabase[i]);
        }

        app.post('/api/games/post', async (req, res) => {
            /**
             *  IMPORTANT: Check if user has permission and is logged in
             *  otherwise it is possible for unauthorized users to access 
             *  database
             */

            // FUNC: Check if requested appId has valid number format -> NaN or 8-digit number leads to ERROR respond
            if(isNaN(req.body.appId) || req.body.appId === null || req.body.appId > 9999999 || req.body.appId < 0){
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

            // add new app to database app list
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

app.listen(8080, () => console.log("Server running on port 8080..."));