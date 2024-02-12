"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieMiddlewareFactory = void 0;
const cookie_adapter_1 = require("../../infra/adapters/cookie-adapter");
const cookie_middleware_1 = require("./cookie-middleware");
const cookieMiddlewareFactory = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    return (0, cookie_middleware_1.cookieMiddleware)(cookie_adapter_1.CookieAdapter);
};
exports.cookieMiddlewareFactory = cookieMiddlewareFactory;
