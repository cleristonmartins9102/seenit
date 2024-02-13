const INIT = {
  error: '',
  warn: ''
}

type ActionType = {
  type: string
  error: string
  warn: string
}

const applicationMessagesInteractionReducer = (state = INIT, action: ActionType): any => {
  switch (action.type) {
    case 'SET_ERROR': return { ...state, error: action.error }

    case 'SET_WARN': return { ...state, warn: action.warn }
    default: return state

    case 'RESET': return { ...state, warn: null }
  }
}

export default applicationMessagesInteractionReducer
