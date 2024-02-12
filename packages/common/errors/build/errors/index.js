"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.BadRequestError = exports.RequiredParameterError = void 0;
class CustomError extends Error {
}
class RequiredParameterError extends CustomError {
    constructor(paramName) {
        super(`Required param ${paramName}`);
        this.code = 400;
        this.name = 'RequiredParameterError';
    }
}
exports.RequiredParameterError = RequiredParameterError;
class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.code = 400;
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends CustomError {
    constructor() {
        super('Unauthorized');
        this.code = 401;
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
