"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectRouter = void 0;
const adapters_1 = require("../../../infra/adapters");
const middlewares_1 = require("../../middlewares");
const permission_middleware_1 = require("../../middlewares/permission-middleware");
const delete_project_controller_factory_1 = require("../../../main/factory/controller/delete-project-controller-factory");
const deleteProjectRouter = (router) => {
    const appSecurity = {
        app: {
            name: 'project',
            id: '2',
            module: [{
                    name: 'delete',
                    id: '4',
                    accepted: permission_middleware_1.Permissions.delete
                }]
        }
    };
    router.delete('/project/delete', middlewares_1.authMiddleware, (0, permission_middleware_1.permissionMiddeware)(appSecurity), (0, adapters_1.expressAdapter)((0, delete_project_controller_factory_1.deleteProjectControllerFactory)()));
};
exports.deleteProjectRouter = deleteProjectRouter;
