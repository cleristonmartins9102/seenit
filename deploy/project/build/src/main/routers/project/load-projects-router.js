"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProjectRouter = void 0;
const adapters_1 = require("../../../infra/adapters");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const permission_middleware_1 = require("../../middlewares/permission-middleware");
const load_projects_controller_factory_1 = require("../../../main/factory/controller/load-projects-controller-factory");
const loadProjectRouter = (router) => {
    const appSecurity = {
        app: {
            name: 'project',
            id: '2',
            module: [{
                    name: 'load',
                    id: '2',
                    accepted: permission_middleware_1.Permissions.read
                }]
        }
    };
    router.get('/project/load', auth_middleware_1.authMiddleware, (0, permission_middleware_1.permissionMiddeware)(appSecurity), (0, adapters_1.expressAdapter)((0, load_projects_controller_factory_1.loadProjectsControllerFactory)()));
};
exports.loadProjectRouter = loadProjectRouter;
