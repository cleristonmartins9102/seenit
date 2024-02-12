import { createProject, deleteProjectResolver, loadProjectsResolver, updateProjectsResolver } from './projects/project-resolver'
import { createUser, deleteUsersResolver, loadUsersResolver, updateUsersResolver } from './user/resolvers'

export default [createUser, loadUsersResolver, updateUsersResolver, deleteUsersResolver, createProject, loadProjectsResolver, updateProjectsResolver, deleteProjectResolver]
