"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.projectModelMock = exports.createProjectModelMock = exports.userModelMock = exports.createUserModelMock = void 0;
exports.createUserModelMock = { firstName: 'any_name', surname: 'any_surname', email: 'mark@gmail.com', password: 'any_password', permissions: ['CRUD'] };
exports.userModelMock = { id: 1, ...exports.createUserModelMock };
exports.createProjectModelMock = { name: 'any_name', description: 'any_description' };
exports.projectModelMock = { id: 1, ...exports.createProjectModelMock, description: 'any', createdBy: { surname: 'any', firstName: 'any', email: 'any' }, createdAt: '2024-02-06 08:00', updatedAt: '2024-02-06 08:00' };
exports.storage = {
    projects: []
};
