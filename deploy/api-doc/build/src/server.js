"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = require("swagger-ui-express");
const express_1 = __importDefault(require("express"));
const docs_1 = require("./ main/docs");
const app = (0, express_1.default)();
app.use('/api-docs', swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(docs_1.swageerConfig));
app.listen(5052, () => console.log('Running on 5052'));
