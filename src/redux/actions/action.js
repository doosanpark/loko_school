import * as types from './ActionTypes';

import {
    INCREMENT,
    DECREMENT,
    SET_COLOR
} from "./ActionTypes";

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVITY: 'SHOW_ACTIVITY'
}

export function increment() {
    return {
        type: types.INCREMENT
    }
}


export function decrement() {
    return {
        type: types.DECREMENT
    }
}


export function setColor(color) {
    return {
        type: types.SET_COLOR,
        color: color
    }
}