"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.created = exports.ok = exports.serverError = exports.badRequest = void 0;
const badRequest = (error) => ({ statusCode: 400, body: { error: error.message } });
exports.badRequest = badRequest;
const serverError = (error) => ({ statusCode: 500, body: { error: error.message } });
exports.serverError = serverError;
const ok = (body) => ({ statusCode: 200, body });
exports.ok = ok;
const created = (body) => ({ statusCode: 201, body });
exports.created = created;
