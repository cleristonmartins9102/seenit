"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.userModelMock = exports.createUserModelMock = void 0;
const permission_middleware_1 = require("../../main/middlewares/permission-middleware");
const defaultPermissions = [
    {
        app: {
            name: 'user',
            id: '1',
            module: [
                {
                    name: 'load',
                    id: '1',
                    accepted: permission_middleware_1.Permissions.read
                },
                {
                    name: 'update',
                    id: '2',
                    accepted: permission_middleware_1.Permissions.update
                },
                {
                    name: 'delete',
                    id: '3',
                    accepted: permission_middleware_1.Permissions.delete
                }
            ]
        }
    },
    {
        app: {
            name: 'project',
            id: '2',
            module: [
                {
                    name: 'create',
                    id: '1',
                    accepted: permission_middleware_1.Permissions.create
                },
                {
                    name: 'load',
                    id: '2',
                    accepted: permission_middleware_1.Permissions.read
                },
                {
                    name: 'update',
                    id: '3',
                    accepted: permission_middleware_1.Permissions.update
                },
                {
                    name: 'delete',
                    id: '4',
                    accepted: permission_middleware_1.Permissions.delete
                }
            ]
        }
    }
];
exports.createUserModelMock = { firstName: 'any_name', avatar: { fileName: 'any_file_name', extension: 'jpg', base64: 'any_base64' }, surname: 'any_surname', email: 'mark@gmail.com', password: 'any_password' };
exports.userModelMock = { id: 1, ...exports.createUserModelMock, permissions: defaultPermissions, avatarUrl: 'any_url', token: 'token', refresh_token: 'refresh_token', createdAt: '2024-02-06 08:00', updatedAt: '2024-02-06 08:00' };
exports.storage = {
    users: []
};
