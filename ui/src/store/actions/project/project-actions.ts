import { ProjectModel } from "@/domain/projects/load";

export const projectActions = {
  addAloneProject: (value: any) => ({
    type: 'add_alone_project',
    value
  }),
  setCurrentProject: (value: ProjectModel) => ({
    type: 'set_current_project',
    value
  }),
  remove_project: (value: any) => ({
    type: 'remove_project',
    value
  }),
  set_all_projects: (value: any) => ({
    type: 'add_all_project',
    value
  })
}
