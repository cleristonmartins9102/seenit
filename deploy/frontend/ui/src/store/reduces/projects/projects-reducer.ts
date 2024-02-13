import { AnyAction } from 'redux'

const INIT = {
  currentProject: null,
  projects: []
}

export const projectsReducer = (state = INIT, action: AnyAction): any => {
  const { type, value } = action

  switch (type) {
    case 'add_alone_project': {
      state = {...state, projects: [value,...state.projects]}
      break
    }
    case 'set_current_project': {
      state.currentProject = value
      break
    }
    case 'remove_project': {
      state = {...state, projects: state.projects.filter(p => p.name !== value)}
      break
    }
    case 'add_all_project': {
      state = {...state, projects: value}
      break
    }
  }

  return state
}
