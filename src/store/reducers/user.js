const initialState = {
    token: ''
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return {...state, token: action.token}
        default:
            return state
    }
}