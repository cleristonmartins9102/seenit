"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autorizeMiddeware = void 0;
const errors_1 = require("../../application/errors");
const decrypter_1 = require("@seenit-common/decrypter");
const autorizeMiddeware = async (req) => {
    if (!req.headers?.authorization) {
        return new errors_1.UnauthorizedError();
    }
    else {
        const decryptor = new decrypter_1.DecrypterAdapter();
        try {
            const autorizationSplited = req.headers.authorization.split(' ');
            let token = '';
            if (autorizationSplited.length > 0) {
                token = autorizationSplited[1];
            }
            const decryptedToken = await decryptor.decrypt(token, 1440);
            return decryptedToken;
        }
        catch (error) {
            console.log(error);
            return new errors_1.UnauthorizedError();
        }
    }
};
exports.autorizeMiddeware = autorizeMiddeware;
