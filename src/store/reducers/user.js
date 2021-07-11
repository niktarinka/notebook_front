const initialState = {
    token: '',
    authentication: false,
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return {...state, token: action.token}

        case 'SET_USER_AUTH':
            return {...state, authentication: action.authentication}
        default:
            return state



    }
}