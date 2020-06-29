import {
    SET_COLOR
} from "../actions/ActionTypes";

const initialState = {
    color: [0, 0, 0]
};

export default function ui(state = initialState, action) {
    if (action.type === SET_COLOR) {
        return {
            color: action.color
        }
    } else {
        return state;
    }

}