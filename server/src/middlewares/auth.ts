import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { logError } from '../utils/utils';
import { User } from '../models/user.model';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET;

    if(!secret){
        logError('Token authentication failed: JWT_SECRET environment variable is not defined');
        res.status(500).json({ status: 500, message: 'Internal Server Error: missing server configuration.' }); return;
    }

    const token: string = req.cookies.token;

    if (!token) {
        res.status(401).json({ status: 401, message: 'No authentication token found.'}); return;
    }

    try {
        req.body.user = verify(token, secret);
    } catch (error) {
        res.status(403).json({ status: 403, message: 'Invalid or expired token.' }); return;
    }
    
    const isAuthorizedUser = await User.findOne({ email: req.body.user.email }).catch((error) => { 
        logError('Token authentication failed: database cannot be accessed', error);
        return undefined;
    });

    if(isAuthorizedUser === undefined){
        res.status(500).json({ status: 500, message: 'Internal Server Error: database could not be accessed.' }); return;
    }

    if (isAuthorizedUser === null) {
        logError('Token authentication failed: unauthorized email');
        res.status(401).json({ status: 401, message: 'Unauthorized email.' }); return;
    }

    next();
};