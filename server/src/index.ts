require('dotenv').config();
const express = require("express");
const server = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = {
    origin: [`${process.env.FRONTEND_SERVER_DOMAIN}`],
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());

// MONGOOSE MODELS

const App = mongoose.model('App', {
    id: Number,
    name: String
}, 'apps');

const User = mongoose.model('User', {
    email: String
}, 'users');

// DATABASE

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DATABASE_NAME });
        console.log('[SERVER START] Successfully connected to the database');
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to connect to the database:', error);
    }
};

// UTILS

const fetchSteamAppName = async (appId: number) => {
    try {
        const response = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const data = await response.json();
        return data[appId]?.data?.name || null;
    } catch (error) {
        console.error('[ERROR] Failed to fetch app name from Steam API:', error);
        return null;
    }
};

const isSteamAppValid = async (appId: number) => {
    try {
        const response = await fetch(`${process.env.STEAM_BASE_URL}/api/appdetails?appids=${appId}`);
        const data = await response.json();
        return data[appId]?.success || false;
    } catch (error) {
        console.error('[ERROR] Failed to validate app ID with Steam API:', error);
        return false;
    }
};

const getAllAppsFromDatabase = async () => {
    try {
        const apps = await App.find({});
        return apps.reverse();
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to fetch apps from the database:', error);
        return [];
    }
};

//MIDDLEWARE

const authenticateToken = async (req: any, res: any, next: any) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        const isAuthorizedUser = await User.findOne({ email: req.user.email });
        if (!isAuthorizedUser) {
            console.log(`[TOKEN AUTH FAILED] Unauthorized email: ${req.user.email}`);
            return res.status(401).send('Unauthorized');
        }

        next();
    } catch (error) {
        console.error('[ERROR] Failed to verify user token:', error);
        return res.status(403).send('Forbidden');
    }
};

// AUTH

const redirectToTwitchAuthorization = (req: any, res: any) => {
    try {
        const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.BACKEND_SERVER_DOMAIN}/auth/twitch/callback&response_type=code&scope=user:read:email`;
        res.redirect(authUrl);
    } catch (error) {
        console.error('[ERROR] Failed to redirect to Twitch authorization:', error);
    }
};

const handleTwitchAuthorizationCallback = async (req: any, res: any) => {
    try {
        const { code } = req.query;

        const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID || '',
                client_secret: process.env.TWITCH_CLIENT_SECRET || '',
                code: code?.toString() || '',
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.BACKEND_SERVER_DOMAIN}/auth/twitch/callback`,
            }),
        });

        const tokenData = await tokenResponse.json();
        const { access_token } = tokenData;

        const userResponse = await fetch('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID || ''
            }
        });

        const userData = await userResponse.json();
        const user = userData.data[0];

        const isAuthorizedUser = await User.findOne({ email: user.email });
        if (!isAuthorizedUser) {
            console.log(`[FAILED LOGIN] Unauthorized email: ${user.email}`);
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

        console.log(`[LOGIN] User logged in: ${user.email}`);
        res.redirect(`${process.env.FRONTEND_SERVER_DOMAIN}`);
    } catch (error) {
        console.error('[ERROR] Failed to handle Twitch authorization callback:', error);
    }
};

const clearUserToken = (req: any, res: any) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.log('[FAILED LOGOUT] No token found in cookies');
            return res.status(404).send('Not Found');
        }

        res.clearCookie('token');

        console.log('[LOGOUT] User logged out successfully');
        res.redirect(`${process.env.FRONTEND_SERVER_DOMAIN}`);
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to clear user token:', error);
    }
};

const sendStatusOK = (req: any, res: any) => {
    res.status(200).send('OK');
}

// API

const registerAppApiEndpoint = async (appId: number, appName: string) => {
    try {
        server.get(`/api/apps/${appId}`, async (req: any, res: any) => {
            const appDetails = {
                id: appId,
                name: appName,
                link: `${process.env.STEAM_BASE_URL}/app/${appId}`,
                header: `${process.env.STEAM_HEADER_URL}/steam/apps/${appId}/header.jpg`
            };

            res.json(appDetails);
        });
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to register app API endpoint:', error);
    }
};

const addAppToDatabase = async (req: any, res: any) => {
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

        const newApp = new App({ id: appId, name: appName });
        await newApp.save();
        registerAppApiEndpoint(appId, appName);

        console.log(`[ADD] App added: ID ${appId}`);
        res.status(201).send('Created');
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to add app to database:', error);
    }
};

const removeAppFromDatabase = async (req: any, res: any) => {
    try {
        const appId = req.body.id;

        if (isNaN(appId) || appId <= 0 || appId > Math.pow(2, 32) - 1) {
            console.log(`[ERROR] Invalid app ID format: '${appId}'`);
            res.status(400).send('Bad Request');
            return;
        }

        const deletedApp = await App.findOneAndDelete({ id: appId });

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

const initializeServer = async () => {
    try {
        const appsInDatabase = await getAllAppsFromDatabase();

        server.get('/api/apps', async (req: any, res: any) => {
            const apps = await getAllAppsFromDatabase();
            const appIds = apps.map((app: any) => app.id);
            res.json({ apps: appIds });
        });

        for (const app of appsInDatabase) {
            registerAppApiEndpoint(app.id, app.name);
        }

        server.get('/login', redirectToTwitchAuthorization);
        server.get('/auth/twitch/callback', handleTwitchAuthorizationCallback);
        server.get('/api/authenticate', authenticateToken, sendStatusOK);
        server.get('/logout', clearUserToken);
        server.post('/api/apps/add', authenticateToken, addAppToDatabase);
        server.post('/api/apps/remove', authenticateToken, removeAppFromDatabase);
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to initialize server:', error);
    }
};

(async () => {
    try {
        await connectToDatabase();
        await initializeServer();
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to start server:', error);
    }
})();

server.listen(process.env.BACKEND_SERVER_PORT, () => {
    console.log(`[SERVER START] Server running on port ${process.env.BACKEND_SERVER_PORT}...`);
});