import { ErrorCatalogKey } from './errorCatalog';

export class AppError {
    errorKey: ErrorCatalogKey;
    operation: string;
    extra?: Error

    constructor (errorKey: ErrorCatalogKey, operation: string, extra?: Error) {
        this.errorKey = errorKey;
        this.operation = operation;
        if (extra) this.extra = extra;
    }
}
