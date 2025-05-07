import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { logError, sendError } from '../utils/utils';
import { isWhitelistedUser } from '../utils/auth.utils';

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!JWT_SECRET){
        logError('Token authentication failed: JWT_SECRET environment variable is not defined', req);
        sendError(res, 500, 'Internal Server Error: missing server configuration.'); return;
    }

    const token: string = req.cookies.token;

    if (!token) {
        sendError(res, 401, 'No authentication token found.'); return;
    }

    try {
        req.user = verify(token, JWT_SECRET);
    } catch (error) {
        sendError(res, 403, 'Invalid or expired token.'); return;
    }

    if(typeof(req.user) !== 'object'){
        logError(`Token authentication failed: invalid token payload. Expected 'JwtPayload' but received '${typeof(req.user)}'`, req);
        sendError(res, 500, 'Internal Server Error: invalid token payload.'); return;
    }
    
    if (!isWhitelistedUser(req.user.email)) {
        sendError(res, 403, 'User not whitelisted.'); return;
    }

    next();
};