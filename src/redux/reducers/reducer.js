import {combineReducers} from 'redux';
import counter from './counter';
import ui from './ui';
import authentication from './authentication'

const reducer = combineReducers({
    counter,
    ui,
    authentication
})

export default reducer;