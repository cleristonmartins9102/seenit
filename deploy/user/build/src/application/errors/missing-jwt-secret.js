"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingJWTSecret = void 0;
class MissingJWTSecret extends Error {
    constructor() {
        super('missing jwt secret');
        this.name = 'MissingJwtSecret';
    }
}
exports.MissingJWTSecret = MissingJWTSecret;
