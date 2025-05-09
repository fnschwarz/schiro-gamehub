import { HASH_SECRET } from '../configs/config';
import { ErrorCatalog } from '../errors/errorCatalog';
import { Request, Response } from 'express';
import { createHmac } from 'crypto';

export const handleError = (
    errorKey: keyof typeof ErrorCatalog,
    operation: string,
    extra?: Error,
    req?: Request,
    res?: Response
) => {
    const err = ErrorCatalog[errorKey];

    operation = `@${operation}:`;

    if(!err.isOperational) {
        operation = `!!! FATAL ERROR !!! ${operation}`;
    }

    logError(err.code, `${operation} ${err.logMessage}`, req, extra);

    if (res) {
        sendError(res, err.httpStatusCode, err.clientMessage);
    }
}

const generateClientId = (ip: string, userAgent: string, secret: string): string => {
    const hash = createHmac('sha256', secret);
    hash.update(`${ip}${userAgent}`);
    return hash.digest('hex').substring(0, 10);
}

export const log = (req: Request, type: string, message: string) => {
    const date = `[${new Date().toISOString()}] `;
    type = `[${type}] `;

    // provides hashed client ip and user agent reduced to 10 characters or empty string
    const clientId = req && req.ip && req.headers['user-agent'] ? `[client ${generateClientId(req.ip, req.headers['user-agent'], HASH_SECRET)}] ` : '';

    console.log(`${date}${type}${clientId}${message}`);
}

export const logError = (type: string, message: string, req? : Request, error?: Error) => {
    const date = `[${new Date().toISOString()}] `;
    type = `[${type}] `;

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
