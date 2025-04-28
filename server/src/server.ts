require('dotenv').config();
const express = require('express');
const server = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

import AuthRouter from './routes/auth.routes';
import GamesRouter from './routes/games.routes';

const corsOptions = {
    origin: [`${process.env.FRONTEND_SERVER_DOMAIN}`],
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(cookieParser());

server.use('/auth', AuthRouter);
server.use('/api/games', GamesRouter);

// DATABASE

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DATABASE_NAME });
        console.log('[SERVER START] Successfully connected to the database');
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to connect to the database:', error);
    }
};

(async () => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error('[CRITICAL ERROR] Failed to start server:', error);
    }
})();

server.listen(process.env.BACKEND_SERVER_PORT, () => {
    console.log(`[SERVER START] Server running on port ${process.env.BACKEND_SERVER_PORT}...`);
});