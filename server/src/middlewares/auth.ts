import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { logError } from '../utils/utils';
import { User } from '../models/user.model';

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET){
        logError('Token authentication failed: JWT_SECRET environment variable is not defined', req);
        res.status(500).json({ status: 500, message: 'Internal Server Error: missing server configuration.' }); return;
    }

    const token: string = req.cookies.token;

    if (!token) {
        res.status(401).json({ status: 401, message: 'No authentication token found.'}); return;
    }

    try {
        req.user = verify(token, JWT_SECRET);
    } catch (error) {
        res.status(403).json({ status: 403, message: 'Invalid or expired token.' }); return;
    }

    if(typeof(req.user) !== 'object'){
        logError(`Token authentication failed: invalid token payload. Expected 'JwtPayload' but received '${typeof(req.user)}'`, req);
        res.status(500).json({ status: 500, message: 'Internal Server Error: invalid token payload.' }); return;
    }
    
    const isAuthorizedUser = await User.findOne({ email: req.user.email }).catch((error) => { 
        logError('Token authentication failed: database cannot be accessed', req, error);
        return undefined;
    });

    if(isAuthorizedUser === undefined){
        res.status(500).json({ status: 500, message: 'Internal Server Error: database could not be accessed.' }); return;
    }

    if (isAuthorizedUser === null) {
        logError('Token authentication failed: unauthorized email', req);
        res.status(401).json({ status: 401, message: 'Unauthorized email.' }); return;
    }

    next();
};