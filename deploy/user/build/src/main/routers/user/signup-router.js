"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const adapters_1 = require("../../../infra/adapters");
const signup_controller_factory_1 = require("../../factory/controller/signup-controller-factory");
const cookie_middleware_factory_1 = require("../../middlewares/cookie-middleware-factory");
const signupRouter = (router) => {
    router.put('/user/signup', (0, cookie_middleware_factory_1.cookieMiddlewareFactory)(), (0, adapters_1.expressAdapter)((0, signup_controller_factory_1.signupControllerFactory)()));
};
exports.signupRouter = signupRouter;
