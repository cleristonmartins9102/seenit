"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const create_user_model_mock_1 = require("../../../src/application/mocks/create-user-model-mock");
class UserRepository {
    create(saveUserModel) {
        const id = create_user_model_mock_1.storage.users.reduce((accumulate, item) => {
            if (item.id && accumulate < item.id) {
                accumulate = item.id;
            }
            return accumulate;
        }, 0);
        const user = { id: id + 1, ...saveUserModel, avatarUrl: 'url', createdAt: '2024-02-06 11:00', updatedAt: '2024-02-06 11:00' };
        create_user_model_mock_1.storage.users.push(user);
        return user;
    }
    update(updateUserModel) {
        const id = typeof updateUserModel.id === 'string' ? parseInt(updateUserModel.id) : updateUserModel.id;
        const userIdx = create_user_model_mock_1.storage.users.findIndex(u => u.id === id);
        if (userIdx !== -1) {
            const user = create_user_model_mock_1.storage.users[userIdx];
            const updatedUser = { ...user, ...updateUserModel };
            create_user_model_mock_1.storage.users[userIdx] = { ...user, ...updateUserModel };
            return updatedUser;
        }
        return false;
    }
    load() {
        return create_user_model_mock_1.storage.users;
    }
    delete(id) {
        const handledId = typeof id === 'string' ? parseInt(id) : id;
        const userIdx = create_user_model_mock_1.storage.users.findIndex(u => u.id === handledId);
        if (userIdx !== -1) {
            create_user_model_mock_1.storage.users.splice(userIdx, 1);
            return true;
        }
        return false;
    }
}
exports.UserRepository = UserRepository;
