"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const errors_1 = require("../../../src/application/errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtAdapter {
    async encrypt(data) {
        if (!process.env?.SECRET)
            throw new errors_1.MissingJWTSecret();
        const expectedDate = new Date().toJSON();
        return jsonwebtoken_1.default.sign({ ...data, expectedDate }, process.env.SECRET);
    }
}
exports.JwtAdapter = JwtAdapter;
