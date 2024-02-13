import { ProjectModel } from "@/domain/projects/load";

export const usersActions = {
  addAloneUser: (value: any) => ({
    type: 'add_alone_user',
    value
  }),
  setCurrentUser: (value: ProjectModel) => ({
    type: 'set_current_user',
    value
  }),
  remove_user: (value: any) => ({
    type: 'remove_user',
    value
  }),
  set_all_user: (value: any) => ({
    type: 'add_all_user',
    value
  })
}
