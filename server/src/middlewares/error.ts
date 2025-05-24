import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppError } from '../errors/error';
import { handleError } from '../utils/utils';

export const catchAppError = (handler: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            if(error instanceof AppError) {
                handleError(error.errorKey, error.operation, error.extra, req, res);
            } else {
                throw error;
            }
        }
    }
}
