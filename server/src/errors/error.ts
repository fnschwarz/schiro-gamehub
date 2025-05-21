import { ErrorCatalogKey } from './errorCatalog';

export class ServerError {
    type: ErrorCatalogKey;
    operation: string;
    extra?: Error

    constructor (type: ErrorCatalogKey, operation: string, extra?: Error) {
        this.type = type;
        this.operation = operation;
        if (extra) this.extra = extra;
    }
}
