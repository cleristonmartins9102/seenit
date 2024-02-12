"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionMiddeware = exports.Permissions = void 0;
const errors_1 = require("../../application/errors");
var Permissions;
(function (Permissions) {
    Permissions["create"] = "C";
    Permissions["read"] = "R";
    Permissions["update"] = "U";
    Permissions["delete"] = "D";
})(Permissions || (exports.Permissions = Permissions = {}));
/**
 * Function for check if the user has permisson on each app and their modules
 * @param appSecurity
 * @returns RequestHandler
 */
const permissionMiddeware = (appSecurity) => {
    return (req, res, next) => {
        const appId = appSecurity.app.id;
        const moduleId = appSecurity.app.module[0].id;
        const accepted = appSecurity.app.module[0].accepted;
        const userPermissions = req.locals.currentUser.permissions;
        let hasAppPermission = false;
        let hasModulePermission = false;
        for (const currentApp of userPermissions) {
            if (currentApp?.app?.id === appId) {
                hasAppPermission = true;
                for (const currentModule of currentApp.app.module) {
                    if (currentModule.id === moduleId && currentModule.accepted === accepted) {
                        hasModulePermission = true;
                    }
                }
            }
        }
        if (!hasAppPermission || !hasModulePermission) {
            res.status(401).json(new errors_1.UnauthorizedError());
        }
        else {
            next();
        }
    };
};
exports.permissionMiddeware = permissionMiddeware;
