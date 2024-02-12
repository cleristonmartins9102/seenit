"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUsersRouter = void 0;
const adapters_1 = require("../../../infra/adapters");
const load_user_controller_factory_1 = require("../../../main/factory/controller/load-user-controller-factory");
const middlewares_1 = require("../../../main/middlewares");
const permission_middleware_1 = require("../../../main/middlewares/permission-middleware");
const loadUsersRouter = (router) => {
    const appSecurity = {
        app: {
            name: 'user',
            id: '1',
            module: [{
                    name: 'load',
                    id: '1',
                    accepted: permission_middleware_1.Permissions.read
                }]
        }
    };
    router.get('/user/load', middlewares_1.authMiddleware, (0, permission_middleware_1.permissionMiddeware)(appSecurity), (0, adapters_1.expressAdapter)((0, load_user_controller_factory_1.loadUserControllerFactory)()));
};
exports.loadUsersRouter = loadUsersRouter;
