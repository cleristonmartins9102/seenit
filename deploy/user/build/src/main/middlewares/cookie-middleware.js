"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieMiddleware = void 0;
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookieMiddleware = (cookieAdapter) => {
    return (req, res, next) => {
        const fakeNext = () => { };
        (0, cookie_session_1.default)({ secure: false, signed: false })(req, res, fakeNext);
        if (cookieAdapter.build) {
            req.locals = { ...req.locals, cookieConfig: cookieAdapter.build(req.session, req.sessionOptions) };
        }
        next();
    };
};
exports.cookieMiddleware = cookieMiddleware;
