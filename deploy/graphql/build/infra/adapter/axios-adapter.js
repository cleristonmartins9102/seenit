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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
const axiosAdapter = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const response = { statusCode: 200, body: null };
    try {
        const httpResponse = yield (0, axios_1.default)({ method: param.method, headers: typeof param.headers !== 'undefined' ? param === null || param === void 0 ? void 0 : param.headers : {}, url: param.url, data: param.data });
        response.statusCode = httpResponse.status;
        response.body = httpResponse.data;
    }
    catch (error) {
        response.statusCode = error.response.status;
        response.body = error.response.data;
    }
    return response;
});
exports.axiosAdapter = axiosAdapter;
