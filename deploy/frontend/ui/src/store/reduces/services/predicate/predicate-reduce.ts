const INIT = {
  allPredicates: [],
  predicateOfTypePackage: []
}

const predicateReducer = (state = INIT, action: any): any => {
  const { allPredicates, predicateOfTypePackage } = action
  switch (action.type) {
    case 'SET_ALL_PREDICATE':
      return {
        ...state,
        allPredicates
      }
    default:
      return {
        ...state,
        predicateOfTypePackage
      }
  }
}

export default predicateReducer
