import { ProjectModel } from "./load";

export type UpdateProject = (project: ProjectModel) => Promise<boolean>