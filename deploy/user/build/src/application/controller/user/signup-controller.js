"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupController = void 0;
const http_returns_1 = require("../../helpers/http-returns");
const permission_middleware_1 = require("../../../main/middlewares/permission-middleware");
class SignupController {
    constructor(validator, userRepository, cryptorAdapter, jwtAdapter, fileStorageAdapter) {
        this.validator = validator;
        this.userRepository = userRepository;
        this.cryptorAdapter = cryptorAdapter;
        this.jwtAdapter = jwtAdapter;
        this.fileStorageAdapter = fileStorageAdapter;
    }
    async handle(input) {
        try {
            const { body, locals } = input;
            const error = this.validator.validate(body);
            if (error)
                return (0, http_returns_1.badRequest)(error);
            const hashedPassword = await this.cryptorAdapter.hash(body.password);
            const defaultPermissions = [
                {
                    app: {
                        name: 'user',
                        id: '1',
                        module: [
                            {
                                name: 'load',
                                id: '1',
                                accepted: permission_middleware_1.Permissions.read
                            },
                            {
                                name: 'update',
                                id: '2',
                                accepted: permission_middleware_1.Permissions.update
                            },
                            {
                                name: 'delete',
                                id: '3',
                                accepted: permission_middleware_1.Permissions.delete
                            }
                        ]
                    }
                },
                {
                    app: {
                        name: 'project',
                        id: '2',
                        module: [
                            {
                                name: 'create',
                                id: '1',
                                accepted: permission_middleware_1.Permissions.create
                            },
                            {
                                name: 'load',
                                id: '2',
                                accepted: permission_middleware_1.Permissions.read
                            },
                            {
                                name: 'update',
                                id: '3',
                                accepted: permission_middleware_1.Permissions.update
                            },
                            {
                                name: 'delete',
                                id: '4',
                                accepted: permission_middleware_1.Permissions.delete
                            }
                        ]
                    }
                }
            ];
            const user = this.userRepository.create({ ...body, password: hashedPassword, permissions: defaultPermissions });
            const token = await this.jwtAdapter.encrypt({ id: user.id, firstName: body.firstName, surname: body.surname, email: body.email, permissions: defaultPermissions });
            const refreshToken = await this.jwtAdapter.encrypt({ id: user.id, firstName: body.firstName, surname: body.surname, email: body.email, permissions: defaultPermissions });
            this.userRepository.update({ id: user.id, token, refresh_token: refreshToken });
            if (locals?.cookieConfig) {
                locals.cookieConfig.set({ sessionName: 'token', value: token });
                locals.cookieConfig.set({ sessionName: 'refresh_token', value: refreshToken });
            }
            const fileResponse = { url: '' };
            try {
                fileResponse.url = (await this.fileStorageAdapter.save(body.avatar)).url;
            }
            catch (error) {
            }
            const { avatar, password, ...bodyWithoutPasswordAvatar } = body;
            return (0, http_returns_1.created)({ ...bodyWithoutPasswordAvatar, avatarUrl: fileResponse.url ?? null, token, refresh_token: refreshToken, permissions: body.permissions });
        }
        catch (error) {
            if (error instanceof Error) {
                return (0, http_returns_1.serverError)(error);
            }
            return (0, http_returns_1.serverError)(new Error());
        }
    }
}
exports.SignupController = SignupController;
