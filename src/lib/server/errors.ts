/**
 * Error type when a resource that does not exist is requested.
 */
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

/**
 * Error type when an unexpected server error occurs.
 */
export class InternalError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InternalError";
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}