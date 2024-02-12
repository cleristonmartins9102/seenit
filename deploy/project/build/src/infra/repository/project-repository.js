"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const models_mock_1 = require("../../application/mocks/models-mock");
class ProjectRepository {
    create(saveProjectModel) {
        const id = models_mock_1.storage.projects.reduce((accumulate, item) => {
            if (item.id && accumulate < item.id) {
                accumulate = item.id;
            }
            return accumulate;
        }, 0);
        const user = { id: id + 1, ...saveProjectModel, createdAt: '2024-02-06 11:00', updatedAt: '2024-02-06 11:00' };
        models_mock_1.storage.projects.push(user);
        return user;
    }
    update(updateProjectModel) {
        const id = typeof updateProjectModel.id === 'string' ? parseInt(updateProjectModel.id) : updateProjectModel.id;
        const projectIdx = models_mock_1.storage.projects.findIndex(u => u.id === id);
        if (projectIdx !== -1) {
            const project = models_mock_1.storage.projects[projectIdx];
            const updatedProject = { ...project, ...updateProjectModel };
            models_mock_1.storage.projects[projectIdx] = { ...project, ...updateProjectModel };
            return updatedProject;
        }
        return false;
    }
    load() {
        return models_mock_1.storage.projects;
    }
    delete(id) {
        const handledId = typeof id === 'string' ? parseInt(id) : id;
        const projectIdx = models_mock_1.storage.projects.findIndex(u => u.id === handledId);
        if (projectIdx !== -1) {
            models_mock_1.storage.projects.splice(projectIdx, 1);
            return true;
        }
        return false;
    }
}
exports.ProjectRepository = ProjectRepository;
