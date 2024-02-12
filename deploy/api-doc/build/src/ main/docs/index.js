"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swageerConfig = void 0;
const create_project_path_1 = require("./paths/project/create-project-path");
const load_project_path_1 = require("./paths/project/load-project-path");
const update_project_path_1 = require("./paths/project/update-project-path");
const delete_project_path_1 = require("./paths/project/delete-project-path");
const project_schema_1 = require("./schemas/project-schema");
const signup_path_1 = require("./paths/user/signup-path");
const update_user_path_1 = require("./paths/user/update-user-path");
const load_user_path_1 = require("./paths/user/load-user-path");
const delete_user_path_1 = require("./paths/user/delete-user-path");
const user_schema_1 = require("./schemas/user-schema");
exports.swageerConfig = {
    swagger: '3.0',
    openapi: '3.0.0',
    info: {
        title: 'Seenit Test',
        version: '0.0.1',
        // description: `### Through this HERE you will have access to the features available in our REST. Below we have a list of features available by security level.<br/>
        //  * Signup new user`
    },
    servers: [{
            url: 'http://127.0.0.1:5050/api',
        }],
    paths: {
        '/user/signup': signup_path_1.signupPath,
        '/user/update': update_user_path_1.updateUserPath,
        '/user/load': load_user_path_1.loadUsersPath,
        '/user/delete': delete_user_path_1.deleteUserPath,
        '/project/create': create_project_path_1.createProjectPath,
        '/project/load': load_project_path_1.loadProjectsPath,
        '/project/update': update_project_path_1.updateProjectPath,
        '/project/delete': delete_project_path_1.deleteProjectPath
    },
    schemas: {
        projectSchema: project_schema_1.projectSchema,
        userSchema: user_schema_1.userSchema
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
