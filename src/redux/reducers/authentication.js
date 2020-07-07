import {
    AUTH_LOGIN,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT
} from "../actions/ActionTypes";

const initialState = {
    login: {
        status: 'FAILURE'
    },
    status: {
        isLoggedIn: false,
        currentUser: "",
        auth: "",

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
                    //스토리지에는 id, pass로 저장
                    ...state.status,
                    isLoggedIn: true,
                    currentUser: action.userName,
                    email: action.email,
                    auth: action.auth
                }
            }
         case AUTH_LOGOUT:
            return {
                login: {
                    status: 'FAILURE'
                }
            };
            default:
            return {
                login: {
                    status: 'FAILURE'
                }
            };
    }
}