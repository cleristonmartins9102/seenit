import { AnyAction } from 'redux'

const INIT = {
  currentUser: null,
  users: []
}

export const usersReducer = (state = INIT, action: AnyAction): any => {
  const { type, value } = action

  switch (type) {
    case 'add_alone_user': {
      state = {...state, users: [value,...state.users.filter(u => u.id !== value.id)]}
      break
    }
    case 'set_current_user': {
      state  = {...state, currentUser: value}
      break
    }
    case 'remove_user': {
      state = {...state, users: state.users.filter(p => p.name !== value)}
      break
    }
    case 'add_all_user': {
      state = {...state, users: value}
      break
    }
  }

  return state
}
