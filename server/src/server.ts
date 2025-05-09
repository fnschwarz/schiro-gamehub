import { checkEnv, NODE_ENV, FRONTEND_SERVER_URL, BACKEND_SERVER_PORT, MONGODB_URI, SESSION_SECRET } from './configs/config';
import { log, logError } from './utils/utils';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AuthRouter from './routes/auth.routes';
import GamesRouter from './routes/games.routes';

// check if all env variables are set
checkEnv();

// check if given port is valid
const port = parseInt(BACKEND_SERVER_PORT, 10);
if (isNaN(port) || port < 1 || port > 65535) {
    logError('Server start failed: BACKEND_SERVER_PORT must be valid port number (1-65535)`');
    process.exit(1);
}

// create express server
const server = express();

// allows 100 requests per minute per ip
const limiter = rateLimit({
    windowMs: 1000 * 60,
    limit: 100,
    message: {
        success: false,
        message: 'Too Many Requests. Please try again later.'
    },
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

// set options to avoid cors errors
const corsOptions = {
    origin: [`${FRONTEND_SERVER_URL}`],
    credentials: true
};

// session for state verification
const sessionHandler = session({
    secret: SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        dbName: 'SchiroGameHub',
        ttl: 15 * 60
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 15
    }
});

// add custom session data fields
declare module 'express-session' {
    interface SessionData {
        state?: string
    }
}

// setup middlewares
server.use(limiter);
server.use(cors(corsOptions));
server.use(sessionHandler);
server.use(express.json());
server.use(cookieParser());

// setup server routes
server.use('/api/auth', AuthRouter);
server.use('/api/games', GamesRouter);


// server start logic
(async () => {
    // connect to database
    try {
        await mongoose.connect(MONGODB_URI, { dbName: 'SchiroGameHub' });
    } catch (error) {
        logError('Server start failed: could not connect to database', undefined, error as Error);
        process.exit(1);
    }

    log('database_connect', 'Successfully connected to database');
})();

server.listen(BACKEND_SERVER_PORT, () => {
    log('server_start', `Server running on port ${BACKEND_SERVER_PORT}...`);
});
