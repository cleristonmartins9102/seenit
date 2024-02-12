"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const autorize_middleware_1 = require("./autorize-middleware");
const errors_1 = require("../../application/errors");
const authMiddleware = async (req, res, next) => {
    const autorization = await (0, autorize_middleware_1.autorizeMiddeware)(req);
    if (autorization instanceof errors_1.UnauthorizedError) {
        res.status(401).json({ error: autorization });
    }
    else {
        req.locals = { ...req.locals, currentUser: autorization };
        next();
    }
};
exports.authMiddleware = authMiddleware;
