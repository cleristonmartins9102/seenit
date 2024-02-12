"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageAdapter = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
class FileStorageAdapter {
    async save(baseImage) {
        const localPath = './public/images/';
        const filename = `${baseImage.fileName}-${(0, uuid_1.v4)()}.${baseImage.extension}`;
        // Check that if directory is present or not.
        if (!fs_1.default.existsSync(`${localPath}`)) {
            fs_1.default.mkdirSync(`${localPath}`);
        }
        if (!fs_1.default.existsSync(localPath)) {
            fs_1.default.mkdirSync(localPath);
        }
        fs_1.default.writeFileSync(localPath + filename, baseImage.base64, { encoding: 'base64' });
        return { filename, url: `http://127.0.0.1:3000/images/${filename}` };
    }
}
exports.FileStorageAdapter = FileStorageAdapter;
