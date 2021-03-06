let token = localStorage.getItem('token');

const initialState = {
    token: token,
    authentication: false,
    data: {}
}


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            return {...state, token: action.token}

        case 'SET_USER_AUTH':
            return {...state, authentication: action.authentication}

        case 'EXIT_USER':
            return {...state, authentication: false, data: {}, token: ''}

        case 'SET_USER_DATA':
            return {...state, data: action.data}
        default:
            return state


    }
}