import { loadProjectsDef } from './load-projects-defs'
import { loadUserDef } from './load-users-defs'

export const typeDefs = [loadUserDef, loadProjectsDef]
