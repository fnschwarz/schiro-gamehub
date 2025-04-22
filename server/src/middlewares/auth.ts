import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export const authenticate = async (req: any, res: any, next: any) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET || ''); // TODO: throw error when env var undefined

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