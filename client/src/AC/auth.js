import axios from 'axios'
import jwt_decode from 'jwt-decode'
import C from '../constants'
import setAuthToken from '../utils/setAuthToken'
import {clearCurrentProfile} from './profile';


export const setCurrentUser = user => ({
    type: C.USER_LOGIN + C.FINISH_LOAD,
    payload: user
})

export const userLogin = dataUser => dispatch => {
    dispatch({
        type: C.USER_LOGIN + C.START_LOAD
    })
    axios.post('/api/users/login', dataUser)
        .then(({data}) => {
            console.log(data, ': DATA')
           const {token} = data;
           localStorage.setItem('jwtToken', token)
           setAuthToken(token)
           const user = jwt_decode(token)
           dispatch(setCurrentUser(user))
        })
        .catch(err => {
            dispatch({
                type: C.GET_ERRORS,
                payload: err.response.data
            })
        })
}


export const userRegister = (dataUser, history) => dispatch => {
   dispatch({
       type: C.USER_REGISTER + C.START_LOAD
   })

   axios.post('/api/users/register', dataUser)
       .then(res => {
           dispatch({
               type: C.USER_REGISTER + C.FINISH_LOAD
           });
           history.push('/login');
       })

       .catch(err => dispatch({
           type: C.GET_ERRORS,
           payload: err.response.data
       }))
}


export const userLogout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}));
    dispatch(clearCurrentProfile());
}