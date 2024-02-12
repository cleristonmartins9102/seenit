"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoAdapter = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
class CryptoAdapter {
    async hash(password) {
        const salt = (0, crypto_1.randomBytes)(16).toString('hex');
        const scriptAsync = (0, util_1.promisify)(crypto_1.scrypt);
        const buf = await scriptAsync(password, salt, 64);
        return `${buf.toString('hex')}.${salt}`;
    }
}
exports.CryptoAdapter = CryptoAdapter;
