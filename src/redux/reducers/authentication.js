import {
    AUTH_LOGIN,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_SUCCESS,
    DECREMENT,
    INCREMENT
} from "../actions/ActionTypes";

const initialState = {
    login: {
        status: 'FAILURE'
    }
}

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                login: {
                    status: 'WAITING'
                }
            }
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    status: 'SUCCESS'
                },
                status: {
                    ...state.status,
                    isLoggedIn: true,
                    currentUser: action.username
                }
            }
        default:
            return {
                ...state,
                login: {
                    status: 'FAILURE'
                }
            };
    }
}