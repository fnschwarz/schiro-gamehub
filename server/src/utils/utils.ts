import { HASH_SECRET } from '../configs/config';
import { ErrorCatalog } from '../errors/errorCatalog';
import { Request, Response } from 'express';
import { createHmac } from 'crypto';

export const handleError = (
    errorKey: keyof typeof ErrorCatalog,
    extra?: Error,
    req?: Request,
    res?: Response
) => {
    const err = ErrorCatalog[errorKey];

    logError(err.log_message, req, extra);

    if (res) {
        sendError(res, err.status_code, err.response_message);
    }
}

const generateClientId = (ip: string, userAgent: string, secret: string): string => {
    const hash = createHmac('sha256', secret);
    hash.update(`${ip}${userAgent}`);
    return hash.digest('hex').substring(0, 10);
}

export const log = (type: string, message: string, req?: Request) => {
    const date = `[${new Date().toISOString()}] `;
    type = `[${type}] `;

    // provides hashed client ip and user agent reduced to 10 characters or empty string
    const clientId = req && req.ip && req.headers['user-agent'] ? `[client ${generateClientId(req.ip, req.headers['user-agent'], HASH_SECRET)}] ` : '';

    console.log(`${date}${type}${clientId}${message}`);
}

export const logError = (message: string, req? : Request, error?: Error) => {
    const date = `[${new Date().toISOString()}] `;
    const type = '[error] ';

    // provides hashed client ip and user agent reduced to 10 characters or empty string
    const clientId = req && req.ip && req.headers['user-agent'] ? `[client ${generateClientId(req.ip, req.headers['user-agent'], HASH_SECRET)}] ` : '';

    // provides error message or empty string
    const errorMessage = error ? ` // ${error}` : '';

    console.error(`${date}${type}${clientId}${message}${errorMessage}`);
};

export const sendSuccess = (res: Response, statusCode: number, message: string) => {
    res.status(statusCode).json({
        success: true,
        message: message
    });
}

export const sendError = (res: Response, statusCode: number, message: string) => {
    res.status(statusCode).json({
        success: false,
        message: message
    });
}
