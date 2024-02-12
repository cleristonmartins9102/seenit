import base from './base'
import { createUserQuery, deleteUserQuery, loadUserQuery, updateUserQuery } from './user/defs'
import { createProjectQuery, deleteProjectQuery, loadProjectQuery, updateProjectQuery } from './project/project-defs'

export default [base, createUserQuery, loadUserQuery, updateUserQuery, deleteUserQuery, createProjectQuery, loadProjectQuery, updateProjectQuery, deleteProjectQuery]
