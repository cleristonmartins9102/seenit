"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectRouter = void 0;
const adapters_1 = require("../../../infra/adapters");
const middlewares_1 = require("../../middlewares");
const permission_middleware_1 = require("../../middlewares/permission-middleware");
const update_project_controller_factory_1 = require("../../../main/factory/controller/update-project-controller-factory");
const updateProjectRouter = (router) => {
    const appSecurity = {
        app: {
            name: 'project',
            id: '2',
            module: [{
                    name: 'update',
                    id: '3',
                    accepted: permission_middleware_1.Permissions.update
                }]
        }
    };
    router.post('/project/update', middlewares_1.authMiddleware, (0, permission_middleware_1.permissionMiddeware)(appSecurity), (0, adapters_1.expressAdapter)((0, update_project_controller_factory_1.updateProjectControllerFactory)()));
};
exports.updateProjectRouter = updateProjectRouter;
