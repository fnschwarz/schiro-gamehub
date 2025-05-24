import { TEST_ENV_USERNAME, TEST_ENV_PASSWORD } from '../configs/config';
import { Request, Response, NextFunction } from 'express';

export const checkHttpAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(401).set('WWW-Authenticate', 'Basic realm="test server"').send('401 Unauthorized'); return;
    }

    /**
     * Decodes the credentials from Base64 to UTF-8 and saves
     * username and password in two different variables. This allows
     * server to check whether the credentials are valid or not.
     */
    const decodedCredentials = Buffer.from(authHeader.replace('Basic', '').trim(), 'base64').toString('utf-8');
    const [username, password] = decodedCredentials.split(':');

    if (username !== TEST_ENV_USERNAME || password !== TEST_ENV_PASSWORD) {
        res.status(401).set('WWW-Authenticate', 'Basic realm="test server"').send('401 Unauthorized'); return;
    }

    next();
}
