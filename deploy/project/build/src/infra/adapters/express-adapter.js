"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAdapter = void 0;
const expressAdapter = (controller) => {
    return async (req, res, next) => {
        const { body, locals } = req;
        const controllerResponse = await controller.handle({ body, currentUser: locals?.currentUser });
        res.status(controllerResponse.statusCode).json(controllerResponse.body);
    };
};
exports.expressAdapter = expressAdapter;
