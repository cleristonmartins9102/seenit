"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.projectModelMock = exports.createProjectModelMock = void 0;
exports.createProjectModelMock = { name: 'any_name', description: 'any_description' };
exports.projectModelMock = { id: 1, ...exports.createProjectModelMock, description: 'any', createdBy: 'cleriston', createdAt: '2024-02-06 08:00', updatedAt: '2024-02-06 08:00' };
exports.storage = {
    projects: []
};
