"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExistsError = exports.EmailError = void 0;
class EmailError extends Error {
    constructor(email) {
        super(`Email format no match ${email}`);
        this.name = 'EmailError';
    }
}
exports.EmailError = EmailError;
class EmailAlreadyExistsError extends Error {
    constructor(email) {
        super(`Email already exists ${email}`);
        this.name = 'EmailAlreadyExists';
    }
}
exports.EmailAlreadyExistsError = EmailAlreadyExistsError;
