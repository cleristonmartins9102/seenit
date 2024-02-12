"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectRouter = void 0;
const adapters_1 = require("../../../infra/adapters");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const permission_middleware_1 = require("../../middlewares/permission-middleware");
const create_project_controller_factory_1 = require("../../../main/factory/controller/create-project-controller-factory");
const createProjectRouter = (router) => {
    const appSecurity = {
        app: {
            name: 'project',
            id: '2',
            module: [{
                    name: 'create',
                    id: '1',
                    accepted: permission_middleware_1.Permissions.create
                }]
        }
    };
    router.put('/project/create', auth_middleware_1.authMiddleware, (0, permission_middleware_1.permissionMiddeware)(appSecurity), (0, adapters_1.expressAdapter)((0, create_project_controller_factory_1.createProjectControllerFactory)()));
};
exports.createProjectRouter = createProjectRouter;
