"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredParameterError = void 0;
class RequiredParameterError extends Error {
    constructor(paramName) {
        super(`Required param ${paramName}`);
        this.name = 'RequiredParameterError';
    }
}
exports.RequiredParameterError = RequiredParameterError;
