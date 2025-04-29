require('dotenv').config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRouter from './routes/auth.routes';
import GamesRouter from './routes/games.routes';
import { log, logError } from './utils/utils';

const BACKEND_SERVER_URL = process.env.BACKEND_SERVER_URL;
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME;

if (!BACKEND_SERVER_URL || !BACKEND_SERVER_PORT || !MONGODB_URI || !MONGODB_DATABASE_NAME) {
    logError('Server start failed: environment variable(s) not defined');
    process.exit(1);
}

const port = parseInt(BACKEND_SERVER_PORT, 10);
if (isNaN(port) || port < 1 || port > 65535) {
    logError('Server start failed: BACKEND_SERVER_PORT must be valid port number (1-65535)`');
    process.exit(1);
}

const server = express();

const corsOptions = {
    origin: [`${BACKEND_SERVER_URL}`]
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(cookieParser());

server.use('/auth', AuthRouter);
server.use('/api/games', GamesRouter);

(async () => {
    // connect to database
    try {
        await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DATABASE_NAME });
    } catch (error) {
        logError('Server start failed: could not connect to database', undefined, error as Error);
        process.exit(1);
    }

    log('database_connect', 'Successfully connected to database');
})();

server.listen(BACKEND_SERVER_PORT, () => {
    log('server_start', `Server running on port ${BACKEND_SERVER_PORT}...`);
});