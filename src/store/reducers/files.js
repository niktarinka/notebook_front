const initialState = {
}

// export function pageReducer(state = initialState) {
//   return state
// }

export function filesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_YEAR':
      return { ...state, year: action.payload }

    default:
      return state
  }
}