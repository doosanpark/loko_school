import axios from 'axios';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT
} from "./ActionTypes";

export function loginRequest(username, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        return axios.post('/account/login', {username, password})
            .then((response) => {
                dispatch(loginSuccess(username));
            }).catch((error) => {
                dispatch(loginFailure());
            })
    }
}

export function login() {
    return {
        type: AUTH_LOGIN
    }
}

export function loginSuccess(userName, email, auth) {


    return {
        type: AUTH_LOGIN_SUCCESS,
        userName,
        email,
        auth
    }
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}


export function logOut() {
    return {
        type: AUTH_LOGOUT
    };
}