"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUsersPath = void 0;
exports.loadUsersPath = {
    get: {
        tags: ['User'],
        summary: 'API for load users',
        security: [
            {
                bearerAuth: []
            }
        ],
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/schemas/userSchema'
                            }
                        }
                    }
                }
            },
            401: {
                description: 'Fail',
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                error: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            },
            500: {
                description: 'Server Error',
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                error: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
