import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import Root from './components/common/Root';
import configureStore from './configureStore'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from "./AC/auth";

const store = configureStore();

if(localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token)
    const user = jwt_decode(token)
    store.dispatch(setCurrentUser(user))

    const currTime = Date.now() / 1000;
    if(user.exp < currTime) {
        setAuthToken(false)
        store.dispatch(setCurrentUser({}))
    }
}




ReactDOM.render(
    <Router>
        <Root store={store}/>
    </Router>
    , document.getElementById('root'));
