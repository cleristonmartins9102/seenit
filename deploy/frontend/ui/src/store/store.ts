import { createStore } from 'redux'
import { rootReducers } from './reduces/root-reducers'

export const store = createStore(rootReducers)
