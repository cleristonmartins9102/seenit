"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRouter = void 0;
const adapters_1 = require("../../../infra/adapters");
const controller_1 = require("../../../main/factory/controller");
const middlewares_1 = require("../../../main/middlewares");
const permission_middleware_1 = require("../../../main/middlewares/permission-middleware");
const updateUserRouter = (router) => {
    const appSecurity = {
        app: {
            name: 'user',
            id: '1',
            module: [{
                    name: 'update',
                    id: '2',
                    accepted: permission_middleware_1.Permissions.update
                }]
        }
    };
    router.post('/user/update', middlewares_1.authMiddleware, (0, permission_middleware_1.permissionMiddeware)(appSecurity), (0, adapters_1.expressAdapter)((0, controller_1.updateUserControllerFactory)()));
};
exports.updateUserRouter = updateUserRouter;
