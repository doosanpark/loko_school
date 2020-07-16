import {combineReducers} from 'redux';
import ui from './ui';
import authentication from './authentication'

const reducer = combineReducers({
    ui,
    authentication
})

export default reducer;