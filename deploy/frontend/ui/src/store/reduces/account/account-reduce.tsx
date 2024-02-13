const INIT = {
  idaccount: null,
  idpeople: null,
  accessToken: null,
  name: null,
  avatar: null,
  email: null,
  role: null,
  details: {
    type: null,
    vehicleType: 'car',
    status: null
  }
}

const AccountReducer = (state = INIT, action: any): any => {
  const { type, accountModel } = action
  switch (type) {
    case 'UPDATE_ACCOUNT':
    case 'SAVE_ACCOUNT': {
      return {
        ...state,
        ...accountModel
      }
    }

    case 'LOAD_CURRENT_ACCOUNT': {
      return state
    }

    case 'DELETE_CURRENT_ACCOUNT': {
      return {
        ...{}
      }
    }

    default:
      return state
  }
}

export default AccountReducer
