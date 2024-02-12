"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolverAdapter = void 0;
const http_1 = require("../../../src/application/contracts/http");
const _1 = require("./");
const errors_1 = require("@seenit-common/errors/build/errors");
const resolverAdapter = (req, url) => __awaiter(void 0, void 0, void 0, function* () {
    const { headers } = req;
    const resp = yield (0, _1.axiosAdapter)({ method: http_1.HttpMethod.get, headers: { authorization: headers.authorization }, url });
    switch (resp.statusCode) {
        case 200:
        case 201: return resp.body;
        case 400: throw new errors_1.BadRequestError(resp.body);
        case 401: throw new errors_1.UnauthorizedError();
    }
});
exports.resolverAdapter = resolverAdapter;
