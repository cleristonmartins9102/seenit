"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_schema_1 = require("./schemas/project-schema");
const create_project_path_1 = require("./paths/project/create-project-path");
const load_projects_path_1 = require("./paths/project/load-projects-path");
const update_project_path_1 = require("./paths/project/update-project-path");
const delete_project_path_1 = require("./paths/project/delete-project-path");
exports.default = {
    swagger: '3.0',
    openapi: '3.0.0',
    info: {
        title: 'Seenit Test',
        version: '0.0.01'
    },
    servers: [{
            url: '/api'
        }],
    paths: {
        '/project/create': create_project_path_1.createProjectPath,
        '/project/load': load_projects_path_1.loadProjectsPath,
        '/project/update': update_project_path_1.updateProjectPath,
        '/project/delete': delete_project_path_1.deleteProjectPath
    },
    schemas: {
        projectSchema: project_schema_1.projectSchema
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".'
            }
        }
    }
};
