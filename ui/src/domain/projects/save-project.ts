import { ProjectModel } from "./load";

export type SaveProject = (project: ProjectModel) => Promise<ProjectModel>
