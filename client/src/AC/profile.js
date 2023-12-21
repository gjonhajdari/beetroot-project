import axios from 'axios';
import C from '../constants';
import {setErrors} from './errors'
import {userLogout} from "./auth";
// import { push } from 'connected-react-router';

export const getCurrentProfile = () => dispatch => {
    dispatch({
        type: C.GET_CURRENT_PROFILE + C.START_LOAD
    })
    axios.get('/api/profile')
        .then(({data}) => {
            console.log(data, " -> DATA")
            dispatch({
                type: C.GET_CURRENT_PROFILE + C.FINISH_LOAD,
                payload: data
            })

        })
        .catch( ({response}) => dispatch(setErrors(response.data)))
}


export const clearCurrentProfile = () => ({
    type: C.CLEAR_PROFILE
})


export const createProfile  = (profileData, history) => dispatch => {
    dispatch({
        type: C.CREATE_PROFILE + C.START_LOAD
    })
    axios.post('/api/profile', profileData)
        .then( res => {
            console.log(res, "-> Profile Data")
            dispatch({
                type: C.CREATE_PROFILE + C.FINISH_LOAD
            })
            history.push('/dashboard')
        })
        .catch(err => dispatch({
            type: C.GET_ERRORS,
            payload: err.response.data
        }))
}


export const deleteAccount = () => dispatch => {
    if(!window.confirm('Are you sure ? ')) {
        return;
    }
    dispatch({
        type: C.DELETE_ACCOUNT + C.START_LOAD
     })
    axios.delete('/api/profile')
        .then(res => {
            dispatch({
                type: C.USER_LOGIN + C.FINISH_LOAD,
                payload: {}
            })
            dispatch(userLogout())
        })
        .catch( ({response}) => dispatch(setErrors(response.data)))
}

export const addExperience = (dataExp, history) => dispatch => {
    dispatch({
        type: C.ADD_EXPERIENCE + C.START_LOAD
    })
    axios.post('/api/profile/experience', dataExp)
        .then(res => {
            console.log(dataExp, " -> Data of Experience")
            console.log(res, " -> RESPONSE")
            dispatch({
                type: C.ADD_EXPERIENCE + C.FINISH_LOAD
            });
            history.push('/dashboard');
        })
        .catch( err => dispatch(setErrors(err.response.data)))
}

export const addEducation = (dataExp, history) => dispatch => {
    dispatch({
        type: C.ADD_EXPERIENCE + C.START_LOAD
    })
    axios.post('/api/profile/education', dataExp)
        .then(res => {
            console.log(dataExp, "-> Data of Education")
            console.log(res, "-> Response Data of Education")
            dispatch({
                type: C.ADD_EXPERIENCE + C.FINISH_LOAD
            });
            history.push('/dashboard');
        })
        .catch( err => dispatch(setErrors(err.response.data)))
}


export const deleteExperience = (experience_id) => dispatch => {
    if(!window.confirm('Are you sure ? ')) {
        return;
    }

    axios.delete(`/api/profile/experience/${experience_id}`)
        .then(res => {
            console.log(experience_id, " -> experience_id")
            console.log(res)
        })
        .catch( ({response}) => dispatch(setErrors(response.data)))
}


export const deleteEducation = (education_id) => dispatch => {
    if(!window.confirm('Are you sure ? ')) {
        return;
    }

    axios.delete(`/api/profile/education/${education_id}`)
        .then(res => {
            console.log(res)
        })
        .catch( ({response}) => dispatch(setErrors(response.data)))
}
