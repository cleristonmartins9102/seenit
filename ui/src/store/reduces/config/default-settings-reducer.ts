const INIT = {
  currentCountry: '',
  userLogged: ''
}

const defaultSettingsReducer = (state = INIT, action: any): any => {
  switch (action.type) {
    case 'UPDATE_CURRENT_COUNTRY':
      return {
        ...state,
        currentCountry: action.value
      }
    default:
      break
  }
  return state
}

export default defaultSettingsReducer
