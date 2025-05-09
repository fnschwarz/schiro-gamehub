import { JWT_SECRET } from '../configs/config';
import { handleError} from '../utils/utils';
import { isWhitelistedUser } from '../utils/auth.utils';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token: string = req.cookies.token;

    if (!token) {
        return;
    }

    try {
        req.user = verify(token, JWT_SECRET);
    } catch (error) {
        handleError('INVALID_TOKEN', 'authenticate_token', error as Error, req, res); return;
    }

    if(typeof(req.user) !== 'object'){
        handleError('INVALID_TOKEN_PAYLOAD', 'authenticate_token', undefined, req, res); return;
    }

    if (!await isWhitelistedUser(req.user.email)) {
        handleError('NOT_WHITELISTED', 'authenticate_token', undefined, req, res); return;
    }

    next();
};
