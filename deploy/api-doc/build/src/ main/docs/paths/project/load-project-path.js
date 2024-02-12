"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProjectsPath = void 0;
exports.loadProjectsPath = {
    get: {
        tags: ['Project'],
        summary: 'API for load projects',
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
                                $ref: '#/schemas/projectSchema'
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
