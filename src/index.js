import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {SignUp, LogIn} from './components/account'

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import reducer from "./redux/reducers/reducer";
import {BrowserRouter as Router} from "react-router-dom";
import { createMemoryHistory } from 'history';

const store = createStore(reducer);
const history = createMemoryHistory()
ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
