"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("./paths");
const delete_user_path_1 = require("./paths/user/delete-user-path");
const load_user_path_1 = require("./paths/user/load-user-path");
const user_schema_1 = require("./schemas/user-schema");
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
        '/user/signup': paths_1.signupPath,
        '/user/update': paths_1.updateUserPath,
        '/user/load': load_user_path_1.loadUsersPath,
        '/user/delete': delete_user_path_1.deleteUserPath
    },
    schemas: {
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
