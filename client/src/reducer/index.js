import {combineReducers} from 'redux'
import auth from './auth'
import errors from './errors';
import login from './login';
import userProfile from './userProfile';

export default combineReducers({
    auth,
    errors,
    login,
    userProfile
})