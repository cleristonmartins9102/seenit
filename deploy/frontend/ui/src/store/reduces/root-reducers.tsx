import { combineReducers } from 'redux'
import defaultSettings from './config/default-settings-reducer'
import account from './account/account-reduce'
import applicationMessagesInteractionReducer from './utils/messages-interation-reducer'
import predicates from './services/predicate/predicate-reduce'
import { projectsReducer as projects } from './projects/projects-reducer'
import { usersReducer as users} from "./projects/users-reducer"
/**
 * Merge of redurers
 */

export const rootReducers = combineReducers({ defaultSettings, account, applicationMessagesInteractionReducer, predicates, projects, users })
