"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserPath = void 0;
exports.deleteUserPath = {
    delete: {
        tags: ['User'],
        summary: 'API for update an user',
        security: [
            {
                bearerAuth: []
            }
        ],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'number'
                            }
                        }
                    }
                }
            }
        },
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/userSchema'
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
