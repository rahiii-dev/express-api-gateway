export class ApplicationError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends ApplicationError {
    constructor(message: string) {
        super(400, message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class UnauthorizedError extends ApplicationError {
    constructor(message: string) {
        super(401, message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ForbiddenError extends ApplicationError {
    constructor(message: string) {
        super(403, message);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message: string) {
        super(404, message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class MissingFieldError extends BadRequestError {
    constructor(fieldName: string) {
        super(`${fieldName} is required`);
        Object.setPrototypeOf(this, MissingFieldError.prototype);
    }
}

export class InternalError extends ApplicationError {
    constructor(message: string) {
        super(500, message);
        Object.setPrototypeOf(this, InternalError.prototype);
    }
}

export class InvalidIdError extends BadRequestError {
    constructor(message = "Inavild Id") {
        super(message);
        Object.setPrototypeOf(this, InvalidIdError.prototype);
    }
}


